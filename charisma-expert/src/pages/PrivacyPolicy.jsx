import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const sections = [
  ['1. Information We Collect', <><p>KLYVOREK may process account information such as name, agency, professional email address, credentials, subscription information, role, and permissions. It may also process IP addresses, device and browser information, login activity, security events, system activity, and audit logs.</p><p>Authorized users may submit documentation facts and narratives during training exercises. <span className="font-semibold text-gray-900">Users must submit only fictional scenarios or properly de-identified information—not live Criminal Justice Information (CJI), real case files, or other restricted operational data.</span></p></>],
  ['2. How Information Is Used', <p>Information is processed to provide requested documentation training services, generate AI-assisted practice drafts, maintain and authenticate accounts, provide support, detect unauthorized access, maintain audit records, improve reliability, and meet contractual or legal obligations. Services are offered as an educational documentation training platform, not as a certified production system for live CJI processing.</p>],
  ['3. AI Processing', <><p>KLYVOREK uses artificial intelligence to organize and structure user-provided information into drafts for human review and learning.</p><p className="font-semibold text-gray-900">The user provides the facts. AI assists with structure. The professional controls review of every draft. Training outputs are not official records.</p><p>AI-generated content may contain errors, omissions, unsupported inferences, or inaccurate language. Users must independently review all content and must not rely on it for operational filing, charging, or judicial submission.</p></>],
  ['4. Criminal Justice Information and Sensitive Data', <><p className="font-semibold text-gray-900">KLYVOREK is a training platform and is not intended for live CJI.</p><p>Users and agencies must not submit live Criminal Justice Information, CHRI, NCIC information, personally identifiable case information, active investigative information, or unredacted police records into the platform. Use fictional scenarios or properly de-identified information only.</p></>],
  ['5. Safeguards and Access Controls', <p>Foundational safeguards include secure authentication, role-based access, encryption in transit (production HTTPS), security logging, audit trails, monitoring, and administrative controls. Specific controls vary by deployment. No information system can guarantee absolute security.</p>],
  ['6. AI Model Training', <p>Unless expressly authorized in a separate written agreement, KLYVOREK does not intentionally use submitted reports, narratives, or warrant scenario facts to train publicly available general-purpose AI models.</p>],
  ['7. Retention and Records', <p>Information is retained only as reasonably necessary to provide training services, maintain security and auditability, resolve disputes, satisfy contracts, or comply with the law. Training drafts are not agency official records.</p>],
  ['8. Disclosure', <p>KLYVOREK does not sell law enforcement information. Information may be disclosed to provide contracted infrastructure, protect system security, investigate misuse, comply with valid legal processes, protect the rights, property, or safety of KLYVOREK and our users, or complete a lawful business transaction, subject to confidentiality protections.</p>],
  ['9. Ownership and Control', <p>Between KLYVOREK and a subscribing user or agency, the customer retains rights in submitted scenario information. KLYVOREK receives only the limited rights reasonably necessary to provide the training services.</p>],
  ['10. Cookies and Analytics', <p>The public website may use cookies or similar technologies for essential functionality, security, analytics, and performance.</p>],
  ['11. Privacy Requests and Children', <p>Requests about records should generally be directed to KLYVOREK support. KLYVOREK is a professional law enforcement training service and is not intended for children.</p>],
  ['12. Changes and Contact', <p>Policy Updates: Material changes will be reflected in this policy. Questions about this policy may be sent to <a className="text-blue-600 underline" href="mailto:info@klyvorek.com">info@klyvorek.com</a>.</p>],
]

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50 py-16">
        <article className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm px-6 sm:px-10 py-10">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Legal</p>
          <h1 className="text-4xl font-bold text-gray-900 mt-2">KLYVOREK Privacy Policy</h1>
          <p className="text-sm text-gray-500 mt-3">Effective August 11, 2026 · Updated for documentation training platform</p>
          <p className="mt-8 text-gray-600 leading-relaxed">
            American Academy of Advanced Thinking, LLC, doing business as KLYVOREK, provides an AI-assisted documentation training platform for law enforcement professionals using fictional or properly de-identified scenario information. This policy explains how information is collected, used, stored, disclosed, and protected. KLYVOREK is not CJIS compliant and is not intended for live Criminal Justice Information (CJI).
          </p>
          <div className="mt-10 space-y-9">
            {sections.map(([title, body]) => (
              <section key={title}>
                <h2 className="text-xl font-bold text-gray-900 mb-3">{title}</h2>
                <div className="space-y-3 text-gray-600 leading-relaxed">{body}</div>
              </section>
            ))}
          </div>
          <div className="mt-10 pt-6 border-t text-sm text-gray-500">
            KLYVOREK · American Academy of Advanced Thinking, LLC · Metro Atlanta, Georgia 30106 ·{' '}
            <a className="text-blue-600 underline" href="mailto:info@klyvorek.com">
              info@klyvorek.com
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
