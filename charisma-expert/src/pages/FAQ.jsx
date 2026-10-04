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
      'KLYVOREK is a self-paced law enforcement documentation training platform using fictional scenarios and AI assistance.',
  },
  {
    id: 2,
    question: 'What is the KLYVOREK Institute?',
    answer:
      "The KLYVOREK Institute is a separate educational resource that provides fictional scenarios and fact patterns designed for use with KLYVOREK's documentation training platform.",
  },
  {
    id: 3,
    question: 'Where do I get training scenarios?',
    answer:
      'Visit the KLYVOREK Institute to select or download a training scenario, then use the scenario facts to complete the appropriate exercise on the KLYVOREK Officer Page.',
  },
  {
    id: 4,
    question: 'What training is required to use KLYVOREK?',
    answer:
      'KLYVOREK is designed to be straightforward and requires minimal technical training. Officers do not need to understand prompt engineering or become an AI expert. Agencies should still provide appropriate training regarding their own policies, authorized use, information security, legal requirements, and review procedures.',
  },
  {
    id: 5,
    question: 'What can I practice?',
    answer:
      'Incident reports, search warrant applications, and arrest warrant applications.',
  },
  {
    id: 6,
    question: 'Does KLYVOREK write the document for me?',
    answer:
      'KLYVOREK formulates an initial draft from the facts you provide. You are responsible for reviewing, correcting, refining, and confirming that the document accurately reflects the training scenario.',
  },
  {
    id: 7,
    question: 'Can I use KLYVOREK independently?',
    answer:
      'Yes. KLYVOREK is designed for self-paced, self-directed practice.',
  },
  {
    id: 8,
    question: 'Can FTOs and instructors monitor training?',
    answer:
      'Yes. Authorized FTOs and instructors can assign scenarios and monitor officer progress.',
  },
  {
    id: 9,
    question: 'Are KLYVOREK scenarios based on real cases?',
    answer:
      "KLYVOREK's standard training library uses fictional scenarios created for documentation practice based on real events.",
  },
  {
    id: 10,
    question: 'Can KLYVOREK be used for additional or remedial training?',
    answer:
      'Yes. KLYVOREK can provide targeted practice in specific documentation skills while the agency or instructor retains responsibility for the training process.',
  },
  {
    id: 11,
    question: 'Does KLYVOREK determine probable cause?',
    answer:
      'No. KLYVOREK provides documentation training and assistance. Authorized professionals make probable cause determinations.',
  },
  {
    id: 12,
    question: 'What happens if a user hits their monthly document save limit?',
    answer:
      "When a plan's generation limit is reached, new generations pause until the monthly reset or a plan upgrade. Existing documents remain available according to the user's plan and account status.",
  },
  {
    id: 13,
    question: 'Can an agency cancel its subscription, and what happens to its data?',
    answer:
      'Officers and agencies can cancel their KLYVOREK subscription according to the terms of their plan. After cancellation, account access ends according to the subscription terms.',
  },
]

function FAQItem({ faq }) {
  const [open, setOpen] = useState(faq.id === 1)

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors"
        aria-expanded={open}
        id={`faq-btn-${faq.id}`}
      >
        <span className="font-semibold text-gray-900 pr-8 text-base">{faq.question}</span>
        {open ? (
          <ChevronUp size={18} className="text-gray-500 shrink-0" />
        ) : (
          <ChevronDown size={18} className="text-gray-500 shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-6 pt-1 text-gray-600 text-sm leading-relaxed border-t border-gray-100 bg-gray-50/40">
          {faq.answer}
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <section className="py-16 text-center px-4 bg-white border-b border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h1>
        <p className="text-gray-500 max-w-xl mx-auto text-base">
          Find answers regarding KLYVOREK documentation training, scenario practice, and platform capabilities.
        </p>
      </section>

      <section className="py-16 flex-1">
        <div className="max-w-4xl mx-auto px-6 space-y-4">
          {faqs.map((faq) => (
            <FAQItem key={faq.id} faq={faq} />
          ))}
        </div>
      </section>

      <section className="py-12 bg-white border-t border-gray-200 text-center px-4">
        <p className="text-gray-600 mb-2">Have a question that is not covered here?</p>
        <Link to="/contact" className="font-semibold text-blue-600 hover:text-blue-700">
          Contact our team at info@klyvorek.com
        </Link>
      </section>

      <Footer />
    </div>
  )
}
