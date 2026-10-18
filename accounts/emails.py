import logging

from django.conf import settings
from django.core.mail import send_mail

from .models import EmailOTP
from .otp import generate_otp

logger = logging.getLogger(__name__)


def _ttl():
    return getattr(settings, 'OTP_TTL_MINUTES', 10)


def send_verification_email(user):
    """Generate and email a numeric verification code."""
    code = generate_otp(user, EmailOTP.Purpose.EMAIL_VERIFICATION)
    try:
        send_mail(
            subject='Your verification code',
            message=(
                f"Hello,\n\n"
                f"Your email verification code is: {code}\n\n"
                f"It expires in {_ttl()} minutes. Enter it in the app to activate "
                f"your account.\n\n"
                f"If you did not create an account, you can ignore this email."
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False,
        )
        logger.info("Verification code sent to %s", user.email)
    except Exception as e:
        logger.error("Failed to send verification email to %s: %s", user.email, str(e))
    return code


def send_password_reset_email(user):
    """Generate and email a numeric password-reset code."""
    code = generate_otp(user, EmailOTP.Purpose.PASSWORD_RESET)
    try:
        send_mail(
            subject='Your password reset code',
            message=(
                f"Hello,\n\n"
                f"Your password reset code is: {code}\n\n"
                f"It expires in {_ttl()} minutes. Enter it in the app to set a new "
                f"password.\n\n"
                f"If you did not request this, you can safely ignore this email."
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False,
        )
        logger.info("Password reset code sent to %s", user.email)
    except Exception as e:
        logger.error("Failed to send password reset email to %s: %s", user.email, str(e))
    return code
