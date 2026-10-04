import { Link } from 'react-router-dom'
import { Shield, BookOpen, FileText, Search, UserCheck, CheckCircle2, Clock, Sparkles, GraduationCap } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const modules = [
  {
    icon: <FileText size={28} className="text-blue-600" />,
    iconBg: 'bg-blue-50',
    title: 'Incident Report Practice',
    description:
      'Practice writing clear, chronological incident reports using realistic fictional scenarios. KLYVOREK provides AI assistance to help strengthen documentation skills over time.',
  },
  {
    icon: <Search size={28} className="text-yellow-500" />,
    iconBg: 'bg-yellow-50',
    title: 'Search Warrant Practice',
    description:
      'Practice organizing fictional investigative facts, locations, property descriptions, and probable cause information into structured search warrant applications. KLYVOREK provides AI assistance to strengthen warrant-writing skills.',
  },
  {
    icon: <BookOpen size={28} className="text-teal-500" />,
    iconBg: 'bg-teal-50',
    title: 'Arrest Warrant Practice',
    description:
      'Practice organizing fictional offense facts, subject information, evidence, and probable cause information into structured arrest warrant applications. KLYVOREK provides AI assistance to strengthen warrant-writing skills.',
  },
]

const coachingPoints = [
  {
    icon: <Shield size={20} className="text-blue-600" />,
    title: 'Structured Practice',
    desc: 'Realistic fictional scenarios give officers a consistent way to practice incident reports, search warrants, and arrest warrants.',
  },
  {
    icon: <Sparkles size={20} className="text-blue-600" />,
    title: 'Focused Coaching',
    desc: 'KLYVOREK identifies areas such as chronology, completeness, attribution, articulation, organization, and clarity.',
  },
  {
    icon: <Clock size={20} className="text-blue-600" />,
    title: 'Self-Paced Development',
    desc: 'Learners can practice independently, repeat exercises, and work on specific documentation skills at their own pace.',
  },
  {
    icon: <UserCheck size={20} className="text-blue-600" />,
    title: 'Human Judgment by Design',
    desc: 'The officer remains responsible for the writing, revisions, and final decisions. FTOs and instructors may monitor progress when appropriate.',
  },
]

function HeroSection() {
  return (
    <section className="relative flex items-center overflow-hidden bg-gray-900" style={{ minHeight: 'calc(100vh - 64px)' }}>
      <img
        src="/assets/home.png"
        alt="Police officer using the KLYVOREK platform"
        className="absolute inset-0 w-full h-full object-cover object-[78%_18%] sm:object-[82%_20%] lg:object-[80%_top] opacity-65 sm:opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/85 via-gray-900/80 to-gray-950/90 sm:bg-gradient-to-r sm:from-gray-900/95 sm:via-gray-900/75 sm:to-transparent" />
      <div className="relative z-10 w-full px-6 lg:px-10 xl:px-16 py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl xl:max-w-5xl">
          <span className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            Self-Paced Police Documentation Training
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight">
            Practice Before the Real Report.
          </h1>
          <p className="text-gray-200 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 max-w-2xl">
            Build stronger report-writing and warrant-drafting skills through realistic, fictional scenarios, AI assistance, and self-paced practice.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Start Your Training
            </Link>
            <Link
              to="/institute"
              className="border border-white/40 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              KLYVOREK Institute
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function WorkflowsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="w-full px-6 lg:px-10 xl:px-16">
        <div className="text-center mb-14">
          <p className="section-tag text-blue-600 mb-2">Training Workflows</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            From Fictional Scenarios to Stronger Documentation
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mb-8">
            KLYVOREK gives officers realistic fictional scenarios to practice incident reports, search warrants, and arrest warrants, with AI assistance.
          </p>

          <div className="max-w-4xl mx-auto bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow text-left border-l-4 border-l-blue-600">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <GraduationCap size={26} strokeWidth={2} />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
                    KLYVOREK Institute
                  </span>
                  <h3 className="font-bold text-gray-900 text-lg sm:text-xl">
                    Practice Starts With the Scenario
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Realistic practice requires realistic facts. The <span className="font-semibold text-gray-900">KLYVOREK Institute</span> develops and houses fictional scenarios and fact patterns designed for incident report, search warrant, and arrest warrant practice.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modules.map(({ icon, iconBg, title, description }) => (
            <div key={title} className="card hover:shadow-lg transition-shadow border border-gray-200 rounded-2xl p-8 bg-white">
              <div className={`${iconBg} w-12 h-12 rounded-xl flex items-center justify-center mb-5`}>
                {icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-xl">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PrinciplesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="w-full px-6 lg:px-10 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              AI Assistance Without Replacing the{' '}
              <span className="text-blue-600">Learning Process</span>
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              KLYVOREK uses AI to support self-paced documentation practice. Officers work through fictional scenarios, write the document themselves, and receive AI assistance to improve performance over time.
            </p>
            <ul className="space-y-6">
              {coachingPoints.map(({ icon, title, desc }) => (
                <li key={title} className="flex items-start gap-4">
                  <span className="mt-1 shrink-0 p-2 bg-blue-50 rounded-lg">{icon}</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-base">{title}</p>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/assets/why_specialized_aI_matters.png"
              alt="Police officer reviewing a KLYVOREK document draft"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function DemoSection() {
  return (
    <section className="bg-slate-50 py-20 px-6" aria-labelledby="demo-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-blue-700 font-semibold uppercase tracking-wider text-sm">Fictional training demo</p>
          <h2 id="demo-heading" className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">See structured facts become a review-ready draft</h2>
          <p className="text-slate-600 mt-4">This example uses invented names and events. Learners review, correct, and confirm every draft against the training scenario.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Officer-entered facts</h3>
            <dl className="space-y-3 text-sm">
              <div><dt className="font-semibold text-gray-800">Event</dt><dd className="text-slate-600">Fictional vehicle break-in reported at 08:15.</dd></div>
              <div><dt className="font-semibold text-gray-800">Location</dt><dd className="text-slate-600">100 Example Street, Sample City.</dd></div>
              <div><dt className="font-semibold text-gray-800">Officer action</dt><dd className="text-slate-600">Photographed damage and collected a witness statement.</dd></div>
            </dl>
          </div>
          <div className="bg-slate-900 text-slate-100 rounded-2xl p-7 shadow-xl">
            <div className="flex justify-between gap-3 mb-4">
              <h3 className="font-bold">Generated incident narrative</h3>
              <span className="text-xs bg-amber-300 text-amber-950 px-2 py-1 rounded font-semibold">PRACTICE DRAFT</span>
            </div>
            <p className="text-sm leading-7 text-slate-300">
              At approximately 0815 hours, I responded to 100 Example Street regarding a reported vehicle break-in. I documented the reported damage, photographed the vehicle, and obtained a statement from the witness.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function BottomCtaSection() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#1a3880', minHeight: '420px' }}>
      <div className="flex flex-col lg:flex-row items-center relative min-h-[420px]">
        <div className="w-full lg:w-1/2 px-6 lg:px-10 xl:px-16 pt-16 pb-8 lg:py-16 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              Practice Before the Real Report.
            </h2>
            <p className="text-blue-200 text-base sm:text-lg mb-8 leading-relaxed">
              Build stronger report-writing and warrant-drafting skills through realistic, fictional scenarios and self-paced practice.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors shadow-lg"
              >
                Start Your Training
              </Link>
              <Link
                to="/pricing"
                className="border border-white/40 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                View Training Pricing
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 pointer-events-none pb-12 lg:pb-0 z-0">
          <div className="w-full px-6 lg:px-0 flex justify-center lg:block" style={{ maxWidth: '850px' }}>
            <img
              src="/assets/blue_bg_dashboard_mockup_1781562999749.png"
              alt="KLYVOREK platform dashboard on laptop and mobile"
              className="w-full h-auto object-contain transform lg:translate-x-12"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <WorkflowsSection />
      <PrinciplesSection />
      <DemoSection />
      <BottomCtaSection />
      <Footer />
    </div>
  )
}
