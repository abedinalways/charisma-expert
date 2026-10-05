import { useEffect, useState } from 'react'
import { AlertCircle, Check, CreditCard, Loader2, X } from 'lucide-react'
import { cancelSubscription, getSubscriptionStatus, listPlans } from '../../api/subscriptions'
import { createCheckout } from '../../api/payments'
import { formatLimit } from '../../utils/format'

export default function ManageBilling() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [subscription, setSubscription] = useState(null)
  const [checkoutLoadingFor, setCheckoutLoadingFor] = useState(null)
  const [billingPeriod, setBillingPeriod] = useState('monthly')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    refreshBilling()
  }, [])

  const refreshBilling = async () => {
    setLoading(true)
    setError('')
    const [plansResult, subResult] = await Promise.allSettled([listPlans(), getSubscriptionStatus()])

    if (plansResult.status === 'fulfilled') {
      setPlans(Array.isArray(plansResult.value.data) ? plansResult.value.data : [])
    } else {
      setError('Unable to load available plans. Please refresh or contact support.')
    }

    if (subResult.status === 'fulfilled') {
      setSubscription(subResult.value.data)
    }
    setLoading(false)
  }

  const handleCheckout = async (plan) => {
    setMessage('')
    setError('')
    setCheckoutLoadingFor(plan.id)
    try {
      if (plan.name === 'free') {
        const { data } = await cancelSubscription()
        setMessage(data.message || 'Your subscription cancellation has been scheduled.')
        const { data: refreshed } = await getSubscriptionStatus()
        setSubscription(refreshed)
        return
      }

      const { data } = await createCheckout(plan.name, billingPeriod)
      if (data.checkout_url) {
        window.location.href = data.checkout_url
      } else if (data.subscription) {
        setSubscription(data.subscription)
        setMessage(data.message || `Successfully changed plan to ${plan.display_name}.`)
      }
    } catch (err) {
      setError(err?.response?.data?.error?.detail || 'Unable to update your subscription.')
    } finally {
      setCheckoutLoadingFor(null)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    )
  }

  let currentPlan = subscription?.plan
  if (!currentPlan && plans.length > 0) {
    currentPlan = [...plans].sort((a, b) => parseFloat(a.price_monthly) - parseFloat(b.price_monthly))[0]
  }

  const trialEndsAt = subscription?.trial_end ? new Date(subscription.trial_end) : null
  const trialDaysRemaining = trialEndsAt
    ? Math.max(0, Math.ceil((trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0
  const isEvaluation = currentPlan?.name === 'free' && subscription?.status === 'trialing'
  const isExpired = subscription?.status === 'expired'

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight font-sans">Manage Billing</h1>
        <p className="text-gray-500 text-sm sm:text-base mt-1.5">View your current usage and manage your subscription plan.</p>
      </div>

      {message && <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 font-medium">{message}</div>}
      {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-medium">{error}</div>}

      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-xs">
            <CreditCard size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Current Plan</p>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">{currentPlan?.display_name || 'Free Evaluation'}</h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {isEvaluation
                ? 'Try KLYVOREK free for up to 3 document generations. No credit card required.'
                : isExpired
                ? 'Free evaluation expired - choose a paid plan to continue'
                : currentPlan?.name === 'free'
                ? 'Free evaluation'
                : `Billed ${subscription?.billing_period || 'monthly'} - renews automatically`}
            </p>
          </div>
        </div>

        {subscription?.cancel_at_period_end && (
          <div className="bg-amber-50 text-amber-800 px-4 py-3 rounded-xl border border-amber-200 flex items-start gap-3 max-w-md">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <p className="font-semibold">Subscription Canceling</p>
              <p>Your subscription will not renew and will end on {new Date(subscription.current_period_end).toLocaleDateString()}.</p>
            </div>
          </div>
        )}
      </div>

      <div className="pt-2">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight font-sans">Available Plans</h2>
          <div className="inline-flex w-fit rounded-xl border border-gray-200 bg-gray-50 p-1">
            {['monthly', 'yearly'].map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => setBillingPeriod(period)}
                className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-all ${
                  billingPeriod === period ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {period === 'yearly' ? 'Annual - 2 months free' : 'Monthly'}
              </button>
            ))}
          </div>
        </div>

        {plans.length === 0 ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">No active billing plans are configured.</p>
                <p className="mt-1 text-sm text-amber-800">
                  Ask an administrator to run the plan seed task or activate plans in the admin panel.
                </p>
                <button
                  type="button"
                  onClick={refreshBilling}
                  className="mt-4 rounded-lg border border-amber-300 bg-white px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-100"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan, idx) => {
              const isCurrentPlan = currentPlan?.id === plan.id
              const isPopular = plan.name === 'standard'
              const isProcessing = checkoutLoadingFor === plan.id
              const isFree = plan.name === 'free'
              const price = billingPeriod === 'yearly' ? plan.price_yearly : plan.price_monthly
              const disableFreeAction = isFree && currentPlan?.name === 'free'
              const isLastCard = idx === 2

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl border-2 p-6 sm:p-7 xl:p-8 flex flex-col bg-white ${
                    isLastCard ? 'md:col-span-2 md:max-w-md md:mx-auto md:w-full xl:col-span-1 xl:max-w-none' : ''
                  } ${
                    isCurrentPlan
                      ? 'border-blue-600 shadow-md ring-1 ring-blue-600'
                      : isPopular
                      ? 'border-gray-900 shadow-xl z-10'
                      : 'border-gray-200 shadow-sm'
                  }`}
                >
                  {isPopular && !isCurrentPlan && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="bg-gray-900 text-white text-xs font-semibold px-3.5 py-1 rounded-full whitespace-nowrap shadow-sm">
                        Most Popular
                      </span>
                    </div>
                  )}
                  {isCurrentPlan && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="bg-blue-600 text-white text-xs font-semibold px-3.5 py-1 rounded-full whitespace-nowrap shadow-sm">
                        Current Plan
                      </span>
                    </div>
                  )}

                  <div className="mb-5 sm:mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1.5">{plan.display_name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 min-h-[38px] leading-relaxed">
                      {plan.description || 'Access essential law enforcement tools.'}
                    </p>
                  </div>

                  <div className="mb-6 sm:mb-8 flex items-baseline flex-wrap gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight shrink-0">
                      ${isFree ? '0' : price}
                    </span>
                    {!isFree && (
                      <span className="text-gray-500 text-sm font-medium">
                        {billingPeriod === 'yearly' ? '/yr' : '/mo'}
                      </span>
                    )}
                  </div>

                  <ul className="space-y-2.5 mb-7 flex-1">
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                      <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>Incident Reports</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                      <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>
                        {isFree ? '3 Total Generations During Evaluation' : `${formatLimit(plan.document_limit)} Incident Reports / Month`}
                      </span>
                    </li>
                    {isFree ? (
                      <>
                        <li className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                          <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span>No Credit Card</span>
                        </li>
                        <li className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                          <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span>Search Warrants</span>
                        </li>
                        <li className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                          <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span>Arrest Warrants</span>
                        </li>
                        <li className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                          <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span>PDF + Editable DOCX Export</span>
                        </li>
                      </>
                    ) : (
                      <>
                        {(plan.can_search_warrant || plan.can_arrest_warrant) && (
                          <li className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                            <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                            <span>{formatLimit(plan.warrant_document_limit)} Warrants / Month</span>
                          </li>
                        )}
                        <li className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                          <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span>Search Warrants</span>
                        </li>
                        <li className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                          <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span>Arrest Warrants</span>
                        </li>
                        <li className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                          <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span>PDF + Editable DOCX Export</span>
                        </li>
                      </>
                    )}
                  </ul>

                  <button
                    disabled={isCurrentPlan || isProcessing || disableFreeAction}
                    onClick={() => handleCheckout(plan)}
                    className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                      isCurrentPlan
                        ? 'bg-blue-50 text-blue-700 cursor-default'
                        : isPopular
                        ? 'bg-gray-900 text-white hover:bg-gray-800'
                        : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isCurrentPlan
                      ? 'Current Plan'
                      : isProcessing
                      ? 'Processing...'
                      : isFree && currentPlan?.name !== 'free'
                      ? 'Cancel Renewal'
                      : isFree
                      ? 'Evaluation Unavailable'
                      : 'Choose ' + plan.display_name}
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
