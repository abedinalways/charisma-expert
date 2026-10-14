import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { listDocuments } from '../../api/documents';
import { getSubscriptionStatus } from '../../api/subscriptions';
import { 
  FileText, 
  Search, 
  Scale, 
  Clock, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Crown,
  BarChart3,
  BookOpen,
  Zap,
  MoreHorizontal,
  Loader2,
  FileCheck2
} from 'lucide-react';

const DOC_TYPE_LABELS = {
  incident_report: 'Incident Report',
  search_warrant: 'Search Warrant',
  arrest_warrant: 'Arrest Warrant',
};

export default function OfficerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [recentDocs, setRecentDocs] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [docsLoading, setDocsLoading] = useState(true);
  const [subLoading, setSubLoading] = useState(true);

  useEffect(() => {
    // Fetch recent documents (first 5)
    listDocuments({ page: 1, page_size: 5 })
      .then(({ data }) => {
        const results = data.results || data || [];
        setRecentDocs(Array.isArray(results) ? results.slice(0, 5) : []);
      })
      .catch(() => {})
      .finally(() => setDocsLoading(false));

    // Fetch subscription status
    getSubscriptionStatus()
      .then(({ data }) => setSubscription(data))
      .catch(() => {})
      .finally(() => setSubLoading(false));
  }, []);

  const getStatusBadge = (status) => {
    const s = (status || 'draft').toLowerCase();
    switch (s) {
      case 'completed':
      case 'saved':
        return <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[11px] font-semibold rounded-md">Completed</span>;
      case 'in_review':
      case 'review':
        return <span className="px-2.5 py-0.5 bg-sky-50 text-sky-700 border border-sky-200/80 text-[11px] font-semibold rounded-md">In Review</span>;
      case 'failed':
        return <span className="px-2.5 py-0.5 bg-rose-50 text-rose-700 border border-rose-200/80 text-[11px] font-semibold rounded-md">Failed</span>;
      default:
        return <span className="px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200/80 text-[11px] font-semibold rounded-md">Draft</span>;
    }
  };

  // Subscription calculations
  const planName = subscription?.plan?.display_name || user?.subscription?.plan_display || 'Free Evaluation';
  const isEvaluationPlan = (subscription?.plan?.name || user?.subscription?.plan || 'free') === 'free';
  const docsUsed = subscription?.documents_generated_this_month ?? user?.subscription?.documents_generated_this_month ?? 0;
  const docsLimit = subscription?.plan
    ? subscription.plan.document_limit
    : (user?.subscription?.document_limit ?? 3);

  const searchWarrantsUsed = subscription?.search_warrants_generated_this_month ?? 0;
  const arrestWarrantsUsed = subscription?.arrest_warrants_generated_this_month ?? 0;
  const warrantsUsed = subscription?.warrants_generated_this_month ?? (searchWarrantsUsed + arrestWarrantsUsed);

  const totalUsed = docsUsed + warrantsUsed;
  const totalLimit = docsLimit ?? 3;
  const progressPct = totalLimit > 0 ? Math.min((totalUsed / totalLimit) * 100, 100) : 0;

  // Clean officer display name
  const displayName = user?.full_name?.trim() 
    || (user?.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : '')
    || (user?.email ? user.email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Officer');

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* ── 1. Welcome Banner Card (matching Client Screenshot) ── */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200/90 shadow-xs relative overflow-hidden flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        {/* Subtle mountain contour watermark in background */}
        <div className="absolute right-0 top-0 bottom-0 w-2/5 pointer-events-none opacity-[0.04] hidden md:block">
          <svg className="w-full h-full object-cover" viewBox="0 0 400 150" fill="none" preserveAspectRatio="none">
            <path d="M0 150L60 90L130 130L220 50L300 110L360 70L400 150H0Z" fill="currentColor" className="text-navy-900" />
            <path d="M120 150L180 80L250 120L320 60L400 120V150H120Z" fill="currentColor" className="text-blue-900" />
          </svg>
        </div>

        <div className="relative z-10 max-w-2xl">
          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest block mb-1">
            KLYVOREK OFFICER PORTAL
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Welcome, {displayName}
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1.5 leading-relaxed">
            Select a module below to begin drafting secure documentation.
          </p>
        </div>

        {/* Right side quota / plan widget */}
        <div className="relative z-10 bg-[#f8fafc] rounded-2xl p-4 sm:p-5 border border-gray-200/90 shrink-0 w-full xl:w-[420px] shadow-xs">
          {subLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="animate-spin text-gray-400" size={20} />
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0">
                    <BarChart3 size={17} />
                  </div>
                  <div className="min-w-0 leading-tight">
                    <span className="text-[11px] text-gray-500 block">Current Plan:</span>
                    <span className="text-sm font-bold text-gray-900 truncate block">{planName}</span>
                  </div>
                </div>

                {isEvaluationPlan && (
                  <button 
                    onClick={() => navigate('/pricing')}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl shadow-xs transition-all hover:shadow"
                  >
                    <Crown size={14} />
                    Upgrade to Plus
                  </button>
                )}
              </div>

              {/* Progress bar */}
              <div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[11px] text-gray-500 mt-1.5 font-medium">
                  <span>{totalUsed}/{totalLimit} Total Documents Generated</span>
                  <span>{isEvaluationPlan ? 'Evaluation Limit' : 'Monthly Quota'}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── 2. Need a Scenario? Banner (matching Client Screenshot) ── */}
      <div className="bg-gradient-to-r from-blue-50/90 via-sky-50/60 to-indigo-50/40 rounded-2xl p-6 sm:p-7 border border-blue-200/90 shadow-xs relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Subtle institute column motif */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-48 h-24 pointer-events-none opacity-[0.05] hidden lg:block">
          <svg className="w-full h-full" viewBox="0 0 200 100" fill="none">
            <rect x="20" y="20" width="16" height="70" rx="2" fill="currentColor" className="text-navy-900" />
            <rect x="60" y="20" width="16" height="70" rx="2" fill="currentColor" className="text-navy-900" />
            <rect x="100" y="20" width="16" height="70" rx="2" fill="currentColor" className="text-navy-900" />
            <rect x="140" y="20" width="16" height="70" rx="2" fill="currentColor" className="text-navy-900" />
            <path d="M10 20L100 5L190 20H10Z" fill="currentColor" className="text-navy-900" />
          </svg>
        </div>

        <div className="relative z-10 flex items-start sm:items-center gap-4 sm:gap-5 max-w-3xl">
          <div className="w-14 h-14 rounded-2xl bg-blue-100/90 border border-blue-200/80 flex items-center justify-center text-blue-600 shrink-0 shadow-xs">
            <BookOpen size={28} />
          </div>
          <div>
            <span className="text-[11px] font-bold text-blue-700 uppercase tracking-widest bg-blue-100/80 px-2.5 py-0.5 rounded-md mb-1.5 inline-block">
              KLYVOREK INSTITUTE
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Need a Scenario?</h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-1 leading-relaxed">
              Choose a fictional scenario and fact pattern from the KLYVOREK Institute, then return here to complete the assigned Incident Report, Search Warrant, or Arrest Warrant exercise.
            </p>
          </div>
        </div>

        <div className="relative z-10 shrink-0 flex flex-col items-start md:items-end gap-1.5 w-full md:w-auto">
          <a
            href="https://klyvorekinstitute.com/scenarios-2/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-sm transition-all hover:shadow hover:-translate-y-0.5 w-full sm:w-auto"
          >
            Choose a Scenario <ExternalLink size={15} />
          </a>
          <span className="text-[10px] font-bold text-gray-400 tracking-[0.16em] uppercase text-center w-full md:text-right">
            PRACTICE | IMPROVE | BUILD CONFIDENCE
          </span>
        </div>
      </div>

      {/* ── 3. Document Generation Modules (matching Client Screenshot) ── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Document Generation Modules
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Generate professional, consistent, and legally sound documentation using structured workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Incident Reports */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-xs">
                <FileText size={22} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Incident Reports</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6">
                Generate comprehensive, structured incident narratives from raw field notes and facts.
              </p>
            </div>
            <Link
              to="/dashboard/create/incident-report"
              className="text-blue-600 hover:text-blue-700 font-semibold text-xs sm:text-sm inline-flex items-center gap-1.5 pt-2"
            >
              Launch Module <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Card 2: Search Warrants */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-xs">
                <Search size={22} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Search Warrants</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6">
                Structure a search warrant application draft for authorized legal and supervisory review.
              </p>
            </div>
            <Link
              to="/dashboard/create/search-warrant"
              className="text-blue-600 hover:text-blue-700 font-semibold text-xs sm:text-sm inline-flex items-center gap-1.5 pt-2"
            >
              Launch Module <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Card 3: Arrest Warrants */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all group flex flex-col justify-between md:col-span-2 lg:col-span-1">
            <div>
              <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-xs">
                <Scale size={22} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Arrest Warrants</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6">
                Create detailed arrest warrant applications based on suspect and case entity data.
              </p>
            </div>
            <Link
              to="/dashboard/create/arrest-warrant"
              className="text-blue-600 hover:text-blue-700 font-semibold text-xs sm:text-sm inline-flex items-center gap-1.5 pt-2"
            >
              Launch Module <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. Bottom Grid: Recent Documents & Quick Actions (matching Client Screenshot) ── */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left: Recent Documents Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <FileCheck2 className="text-blue-600" size={20} />
              <h3 className="font-bold text-gray-900 text-base sm:text-lg">Recent Documents</h3>
            </div>
            <Link 
              to="/dashboard/history" 
              className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="flex-1 overflow-x-auto">
            {docsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="animate-spin text-gray-400" size={24} />
              </div>
            ) : recentDocs.length === 0 ? (
              <div className="text-center py-12 px-4">
                <Clock className="mx-auto text-gray-300 mb-2" size={32} />
                <p className="text-sm font-medium text-gray-600">No documents drafted yet</p>
                <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                  Launch any module above to start practicing your police documentation drafts.
                </p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 bg-[#fbfcfd] text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    <th className="py-3 px-5 sm:px-6">Title</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4 hidden sm:table-cell">Last Modified</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                  {recentDocs.map((doc) => {
                    const titleText = doc.title || (doc.case_number ? `Case #${doc.case_number}` : `Draft #${doc.id}`);
                    const dateFormatted = doc.updated_at || doc.created_at
                      ? new Date(doc.updated_at || doc.created_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
                      : 'Recently';

                    return (
                      <tr 
                        key={doc.id}
                        onClick={() => navigate(`/dashboard/document/${doc.id}`)}
                        className="hover:bg-blue-50/40 transition-colors cursor-pointer"
                      >
                        <td className="py-3.5 px-5 sm:px-6 font-semibold text-gray-900 truncate max-w-[200px]">
                          {titleText}
                        </td>
                        <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded-md bg-gray-100 text-[11px] font-medium text-gray-700">
                            {DOC_TYPE_LABELS[doc.doc_type] || doc.doc_type || 'Document'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-500 whitespace-nowrap hidden sm:table-cell text-xs">
                          {dateFormatted}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {getStatusBadge(doc.status)}
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap text-gray-400 hover:text-gray-600">
                          <MoreHorizontal size={16} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-gray-100">
              <Zap className="text-amber-500 fill-amber-500" size={18} />
              <h3 className="font-bold text-gray-900 text-base sm:text-lg">Quick Actions</h3>
            </div>

            <div className="space-y-2.5">
              <Link
                to="/dashboard/create/incident-report"
                className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/40 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <FileText size={16} />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    Create New Incident Report
                  </span>
                </div>
                <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                to="/dashboard/create/search-warrant"
                className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/40 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Search size={16} />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    Create New Search Warrant
                  </span>
                </div>
                <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                to="/dashboard/create/arrest-warrant"
                className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/40 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Scale size={16} />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    Create New Arrest Warrant
                  </span>
                </div>
                <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                to="/dashboard/history"
                className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/40 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 text-gray-600 flex items-center justify-center shrink-0">
                    <Clock size={16} />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    View Document History
                  </span>
                </div>
                <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
