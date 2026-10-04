import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const faqs = [
  {
    id: 1,
    question: 'What is KLYVOREK?',
    answer:
      'KLYVOREK is an emerging AI-assisted documentation platform built for law enforcement. During its current evaluation phase, it demonstrates how structured, fictional case facts can be organized into incident-report narratives and search- and arrest-warrant application drafts. KLYVOREK assists with documentation; it does not replace investigation, professional judgment, supervision, prosecution, legal review, or judicial determination. Do not enter live CJI and active case information during the evaluation phase.',
  },
  {
    id: 2,
    question: 'How does KLYVOREK help law enforcement personnel?',
    answer:
      'KLYVOREK helps authorized users practice and evaluate structured documentation workflows. Users supply fictional or properly de-identified facts during evaluation, and KLYVOREK organizes that information into a clearer draft for review. It is not currently offered as a production system for submitting live case information into official records.',
  },
  {
    id: 3,
    question: 'Can KLYVOREK invent or change facts in a report?',
    answer:
      'It should not, and users should never assume that any AI-generated draft is automatically accurate. KLYVOREK is designed to work from information supplied by the user, not to create facts, evidence, observations, statements, charges, or probable cause. Because AI systems can produce errors, every generated document must be carefully reviewed against the original supplied facts.',
  },
  {
    id: 4,
    question: 'Does the officer remain responsible for the final report?',
    answer:
      'Yes. KLYVOREK produces a draft based on user-provided information. Authorized personnel must review the document, verify the facts, make necessary corrections, and determine whether any output is suitable for further use. KLYVOREK does not replace officer judgment, supervisory review, prosecutor review, judicial review, or agency policy. During the current evaluation stage, outputs are not for official operational filing.',
  },
  {
    id: 5,
    question: 'What training is required to use KLYVOREK?',
    answer:
      'KLYVOREK is designed to be straightforward and require minimal technical training. A user does not need to understand prompt engineering or become an AI expert. Agencies should still provide appropriate training regarding their own policies, authorized use, information security, legal requirements, and review procedures. Completing KLYVOREK training does not authorize users to enter live CJI. Operational use requires separate agency authorization, security review, applicable CJIS approval, and documented deployment controls.',
  },
  {
    id: 6,
    question: 'Is KLYVOREK CJIS compliant?',
    answer:
      'Not at this stage. KLYVOREK includes foundational safeguards such as role-based access, audit logging, secure authentication, and production HTTPS. It is currently intended for controlled evaluation using fictional or properly de-identified information, not live Criminal Justice Information (CJI). Operational deployment will require additional security controls, an independent assessment, documented compliance measures, and approval under the participating agency’s applicable state and federal CJIS requirements.',
  },
  {
    id: 7,
    question: 'How is information used during a KLYVOREK evaluation?',
    answer:
      'During evaluation, users should submit only fictional or properly de-identified information—not live case data or CJI. KLYVOREK does not intentionally use submitted facts to train publicly available general-purpose AI models. Data handling still depends on configured inference and storage providers, so administrators should review those provider terms and retention controls.',
  },
  {
    id: 8,
    question: 'How accurate are the generated legal documents?',
    answer:
      'Generated content is a draft for evaluation and review, not a legal determination or official record. Users must verify every fact, citation, required element, and signature. Outputs from the current evaluation stage are not authorized for operational filing, charging, or judicial submission.',
  },
  {
    id: 9,
    question: "Does KLYVOREK replace an officer's RMS or agency records system?",
    answer:
      "No. KLYVOREK is an AI-assisted documentation evaluation tool. It helps prepare and structure drafts for authorized review. The agency's approved records, case-management, warrant, and filing procedures remain controlling for any official use.",
  },
  {
    id: 10,
    question: 'What happens if a user hits their monthly document save limit?',
    answer:
      "When a plan's generation limit is reached, new generations pause until the monthly reset or a plan upgrade. Existing documents remain available according to the user's plan and account status.",
  },
  {
    id: 11,
    question: 'Can an agency cancel its subscription, and what happens to its data?',
    answer:
      'An agency should be able to cancel its KLYVOREK subscription according to the terms of its plan. After cancellation, account access ends according to the subscription terms. KLYVOREK handles retained or deleted account data according to its Privacy Policy and applicable data-retention requirements. Evaluation drafts are not official agency records unless the agency separately designates them as such.',
  },
  {
    id: 12,
    question: 'Can we integrate this with our existing RMS (Records Management System)?',
    answer:
      'KLYVOREK does not currently provide direct RMS integration. Agencies interested in future integration may contact us to discuss requirements and supported export formats after completion of applicable compliance and deployment reviews.',
  },
]

function FAQItem({ faq }) {
  const [open, setOpen] = useState(faq.id === 1)

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors"
        aria-expanded={open}
        id={`faq-btn-${faq.id}`}
      >
        <span className="font-semibold text-gray-900 pr-8">{faq.question}</span>
        {open ? (
          <ChevronUp size={18} className="text-gray-500 shrink-0" />
        ) : (
          <ChevronDown size={18} className="text-gray-500 shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-5 bg-white">
          <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="pt-16 pb-8 bg-white text-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Answers about evaluation use, officer responsibility, AI-assisted drafting, CJIS/CJI limits, security, billing, and agency review.
        </p>
      </section>

      <section className="py-10 bg-white flex-1">
        <div className="w-full max-w-2xl mx-auto px-6 lg:px-10 xl:px-16 space-y-4">
          {faqs.map((faq) => (
            <FAQItem key={faq.id} faq={faq} />
          ))}
        </div>
      </section>

      <div className="text-center py-12 bg-white">
        <p className="text-gray-500 mb-2">Have more questions about evaluation use or compliance?</p>
        <Link to="/pricing" className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
          View Evaluation Options →
        </Link>
      </div>

      <Footer />
    </div>
  )
}
