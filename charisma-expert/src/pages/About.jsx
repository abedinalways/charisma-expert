import { Shield, Target, BookOpen, Users, Award, Compass, CheckCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const corePrinciples = [
  {
    title: 'Simple to Use',
    desc: 'Clean interfaces designed for officers to quickly input scenario facts without complicated prompts.',
  },
  {
    title: 'Practical to Train With',
    desc: 'Anchored directly in realistic training fact patterns created for incident reports and warrant drafting.',
  },
  {
    title: 'Affordable to Deploy',
    desc: 'Accessible self-paced practice tools that fit agencies of any size, from single officers to full squads.',
  },
]

function AboutHero() {
  return (
    <section className="relative py-24 bg-navy-800 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/70 to-navy-800/90" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
          Building Stronger Law Enforcement Documentation Through Practice
        </h1>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
          KLYVOREK is a law enforcement documentation training platform that uses fictional scenarios to help learners practice incident reports, search warrants, and arrest warrants through self-paced exercises and AI assistance.
        </p>
      </div>
    </section>
  )
}

function VisionSection() {
  return (
    <section className="py-20 bg-white">
      <div className="w-full max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-tag text-blue-600 mb-2 font-semibold uppercase tracking-wider text-sm">Our Purpose</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-base">
              <p>
                We believe strong law enforcement documentation begins with strong training.
              </p>
              <p>
                KLYVOREK gives recruits, new officers, investigators, and experienced personnel more opportunities to practice incident reports, search warrants, and arrest warrants using realistic fictional scenarios.
              </p>
              <p>
                Through self-paced exercises and AI assistance, officers can strengthen core documentation skills while keeping the writing, judgment, and revisions in human hands.
              </p>
              <p>
                FTOs and instructors may monitor progress when appropriate, but the learner remains at the center of the process.
              </p>
            </div>

            <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl">
              <p className="font-semibold text-navy-800 text-sm">
                The officer provides the facts. KLYVOREK builds the draft. The officer reviews, refines, and improves it.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {corePrinciples.map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl p-6 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="text-blue-600 shrink-0" size={20} />
                  <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-600 pl-8 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StorySection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <p className="section-tag text-blue-600 mb-2 font-semibold uppercase tracking-wider text-sm">About KLYVOREK</p>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Built From a Problem Seen in the Real World</h2>

        <div className="space-y-6 text-gray-600 leading-relaxed bg-white border border-gray-200 rounded-3xl p-8 sm:p-12 shadow-sm">
          <p className="text-lg font-medium text-gray-800 italic border-l-4 border-blue-600 pl-4 py-1">
            &ldquo;Some of the best officers can explain an incident clearly, confidently, and in detail. Then you read the report.&rdquo;
          </p>

          <p>
            The facts may be incomplete. The sequence may be unclear. Important observations may be buried or missing.
          </p>

          <p>
            That gap between good police work and good documentation is what Sergeant Edward Brown saw repeatedly while serving with a Metro Atlanta, Georgia, law enforcement agency.
          </p>

          <p>
            As a police sergeant and investigator, Brown reviewed reports written by officers and dispatchers and saw how weak documentation could create unnecessary questions later.
          </p>

          <p>
            A police report is more than paperwork. It becomes part of the legal record and may be reviewed by supervisors, prosecutors, attorneys, judges, juries, and the public.
          </p>

          <p>
            Report writing is a professional skill, and like any skill, it improves through practice, repetition, and feedback.
          </p>

          <p className="font-semibold text-gray-900">
            That led to a simple question: What if law enforcement professionals had a place to practice documentation before those skills were tested in a real case?
          </p>

          <p>
            Brown partnered with an experienced AI and web development team to create KLYVOREK, a self-paced law enforcement documentation training platform.
          </p>

          <p>
            KLYVOREK allows learners to work through realistic fictional scenarios, provide the facts, generate an initial draft with AI assistance, and then review, refine, and improve the document.
          </p>

          <p>
            Training scenarios and fact patterns are available through the <strong>KLYVOREK Institute</strong>, a separate educational resource created to support practical law enforcement documentation training. The Institute provides a growing library of fictional exercises for use with the KLYVOREK platform.
          </p>

          <p>
            Field Training Officers and instructors may also monitor progress when appropriate to support recruits, new officers, probationary personnel, and others receiving additional development.
          </p>

          <div className="pt-6 border-t border-gray-100">
            <p className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Three Core Principles</p>
            <p className="text-blue-600 font-bold text-base">
              Simple to Use. Practical to Train With. Affordable to Deploy.
            </p>
            <p className="text-gray-500 text-sm mt-3">
              The officer provides the facts. KLYVOREK builds the draft. The officer reviews, refines, and improves it.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <AboutHero />
      <VisionSection />
      <StorySection />
      <Footer />
    </div>
  )
}
