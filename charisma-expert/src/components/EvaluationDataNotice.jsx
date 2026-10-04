import { AlertTriangle } from 'lucide-react'

/** Short warning shown above report/warrant entry forms (client feedback §20). */
export default function EvaluationDataNotice({ className = '' }) {
  return (
    <div
      className={`flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950 ${className}`}
      role="note"
    >
      <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-600" />
      <p>
        <span className="font-semibold">Evaluation environment</span>
        —fictional or properly de-identified information only.
      </p>
    </div>
  )
}
