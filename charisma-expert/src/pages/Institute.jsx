import { Link } from 'react-router-dom'
import { ExternalLink, ArrowRight, BookOpen, FileCheck, CheckCircle2, Shield, Search, FileText } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const instituteModules = [
  {
    icon: <FileText size={24} className="text-blue-600" />,
    title: 'Incident Reports',
    desc: 'Structured scenario fact patterns for practicing clear chronological incident documentation.',
  },
  {
    icon: <Search size={24} className="text-yellow-600" />,
    title: 'Search Warrants',
    desc: 'Investigative scenarios covering locations, items to seize, and probable cause nexus.',
  },
  {
    icon: <BookOpen size={24} className="text-teal-600" />,
    title: 'Arrest Warrants',
    desc: 'Fact patterns detailing offenses, defendant identifiers, and statutory elements.',
  },
]

const steps = [
  {
    number: '1',
    title: 'Choose a Scenario',
    description: 'Select a training exercise from the KLYVOREK Training Library.',
    actionUrl: 'https://klyvorekinstitute.com',
    actionLabel: 'Connect to KLYVOREK Training Library',
  },
  {
    number: '2',
    title: 'Review the Facts',
    description: 'Read the scenario and supporting fact pattern carefully before drafting.',
  },
  {
    number: '3',
    title: 'Use KLYVOREK',
    description: 'Visit KLYVOREK.com, register, and navigate to the Officer Page.',
    internalLink: '/signup',
    internalLabel: 'Go to Officer Page',
  },
  {
    number: '4',
    title: 'Complete the Exercise',
    description: 'Enter the requested facts. KLYVOREK formulates the initial draft.',
  },
  {
    number: '5',
    title: 'Review and Improve',
    description: 'Compare the draft with the scenario and make any necessary corrections or refinements.',
    bullets: [
      'The officer provides the facts.',
      'KLYVOREK builds the draft.',
      'The officer reviews, refines, and improves it.',
    ],
  },
]

function InstituteHero() {
  return (
    <section className="relative py-20 bg-navy-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 to-navy-800/95" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <span className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
          Educational Partner Resource
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
          KLYVOREK Institute
        </h1>
        <p className="text-2xl text-blue-200 font-semibold mb-6">
          Practice Before the Real Report.
        </p>
        <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
          The KLYVOREK Institute provides fictional scenarios and fact patterns for law enforcement documentation training.
        </p>
        <a
          href="https://klyvorekinstitute.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg transition-all"
        >
          Explore Training Library <ExternalLink size={18} />
        </a>
      </div>
    </section>
  )
}

function PracticeAreas() {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Learners use Institute scenarios with the KLYVOREK platform to practice:
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {instituteModules.map((item, idx) => (
            <div key={idx} className="border border-gray-200 rounded-2xl p-6 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-4 shadow-sm">
                {item.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-2">Step-by-Step Training</p>
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
        </div>

        <div className="space-y-6">
          {steps.map((step) => (
            <div key={step.number} className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 flex items-start gap-6 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-navy-800 text-white flex items-center justify-center font-bold text-lg shrink-0">
                {step.number}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-3">{step.description}</p>
                {step.bullets && (
                  <ul className="mb-4 space-y-1.5 text-sm text-gray-700 bg-gray-50/80 rounded-xl p-3.5 border border-gray-100">
                    {step.bullets.map((b, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                        <span className="font-medium">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {step.actionUrl && (
                  <a
                    href={step.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-semibold text-sm"
                  >
                    {step.actionLabel} <ExternalLink size={14} />
                  </a>
                )}
                {step.internalLink && (
                  <Link
                    to={step.internalLink}
                    className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-semibold text-sm"
                  >
                    {step.internalLabel} <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white border border-blue-200 rounded-2xl p-8 shadow-sm">
          <h4 className="font-bold text-gray-900 text-base mb-4 uppercase tracking-wider text-center">
            The Training Philosophy
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-blue-50/60 rounded-xl">
              <p className="font-bold text-navy-800 text-sm">1. Officer Provides Facts</p>
              <p className="text-xs text-gray-600 mt-1">Grounding everything in the scenario.</p>
            </div>
            <div className="p-4 bg-blue-50/60 rounded-xl">
              <p className="font-bold text-navy-800 text-sm">2. KLYVOREK Builds Draft</p>
              <p className="text-xs text-gray-600 mt-1">AI structures narrative and fields.</p>
            </div>
            <div className="p-4 bg-blue-50/60 rounded-xl">
              <p className="font-bold text-navy-800 text-sm">3. Officer Refines & Improves</p>
              <p className="text-xs text-gray-600 mt-1">Human judgment remains in control.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function InstituteCta() {
  return (
    <section className="py-16 bg-navy-800 text-center text-white px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Start Training</h2>
        <p className="text-blue-200 text-base sm:text-lg mb-8 max-w-xl mx-auto">
          Choose a scenario from the KLYVOREK Training Library.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://klyvorekinstitute.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg transition-colors"
          >
            Go to KLYVOREK Training Library <ExternalLink size={18} />
          </a>
          <Link
            to="/signup"
            className="border border-white/40 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors"
          >
            Register on KLYVOREK
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function Institute() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <InstituteHero />
      <PracticeAreas />
      <HowItWorks />
      <InstituteCta />
      <Footer />
    </div>
  )
}
