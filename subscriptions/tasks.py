from celery import shared_task
from django.utils import timezone

from .models import Plan, Subscription


@shared_task
def reset_monthly_usage():
    """
    Anniversary-based reset safety check for active paid subscriptions.
    Stripe webhooks handle automatic resets upon invoice.payment_succeeded
    and customer.subscription.updated. This task acts as a safety catch:
    for subscriptions whose new billing cycle has begun but usage has not yet been reset,
    it resets usage and ensures unused allowances drop off.
    """
    now = timezone.now()
    count = 0
    for sub in Subscription.objects.filter(status=Subscription.Status.ACTIVE):
        if sub.plan.name == 'free':
            continue

        if sub.stripe_subscription_id:
            # If current billing period has started and usage hasn't been reset for this period:
            if sub.current_period_start and (not sub.usage_reset_date or sub.usage_reset_date < sub.current_period_start.date()):
                sub.reset_monthly_usage()
                count += 1
        else:
            # Fallback for manual/offline active subscriptions: reset if >= 30 days since last reset
            if not sub.usage_reset_date or (now.date() - sub.usage_reset_date).days >= 30:
                sub.reset_monthly_usage()
                count += 1

    return f'Reset usage for {count} subscriptions.'


@shared_task
def expire_trials():
    """Mark expired Free Evaluations as expired instead of reactivating Free."""
    free_plan = Plan.objects.filter(name='free').first()
    if not free_plan:
        return 'No free plan configured - skipped.'

    expired = Subscription.objects.filter(
        status=Subscription.Status.TRIALING,
        plan=free_plan,
        trial_end__lt=timezone.now(),
    )
    count = 0
    for sub in expired:
        sub.status = Subscription.Status.EXPIRED
        sub.usage_reset_date = timezone.now().date()
        sub.save(update_fields=['status', 'usage_reset_date'])
        count += 1
    return f'Expired {count} free evaluation(s).'
