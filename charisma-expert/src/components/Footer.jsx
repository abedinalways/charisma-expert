import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'
import logoImg from '../assets/logo01.png'

const footerLinks = {
  Platform: [
    { label: 'Pricing & Plans', to: '/pricing' },
    { label: 'Officer Dashboard', to: '/login' },
  ],
  Resources: [
    { label: 'KLYVOREK Institute', to: '/institute' },
    { label: 'Blog & News', to: '/blog' },
    { label: 'FAQ', to: '/faq' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Terms of Service', to: '/terms-of-service' },
  ],
}

export default function Footer() {

  return (
    <footer className="bg-[#111625] text-gray-300 font-sans pt-16 pb-8 border-t border-gray-800">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-12 lg:col-span-5 space-y-4 max-w-xl">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src={logoImg} alt="KLYVOREK logo" className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover shrink-0" />
              <span className="text-lg sm:text-xl font-bold text-white tracking-[0.16em]">KLYVOREK</span>
            </Link>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              KLYVOREK is a self-paced law enforcement documentation training platform for practicing incident reports, search warrants, and arrest warrants through realistic fictional scenarios and AI assistance.
            </p>
          </div>

          {/* Link columns: Platform, Resources, Company */}
          <div className="md:col-span-12 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-4">Platform</h4>
              <ul className="space-y-2.5">
                {footerLinks.Platform.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-xs sm:text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-2.5">
                {footerLinks.Resources.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-xs sm:text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2.5">
                {footerLinks.Company.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-xs sm:text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-xs text-gray-400">
            © 2027 KLYVOREK. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Shield size={14} strokeWidth={1.5} className="shrink-0 text-blue-400" />
            <span>Foundational Access Controls &amp; Activity Logging</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
