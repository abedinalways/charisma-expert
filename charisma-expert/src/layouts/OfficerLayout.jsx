import { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutGrid,
  FileText,
  Clock,
  FileSearch,
  UserPlus,
  History,
  User,
  CreditCard,
  LogOut,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  GraduationCap,
  Bell,
  Lock,
  Scale
} from 'lucide-react';
import logoImg from '../assets/logo01.png';

export default function OfficerLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isCreateOpen, setIsCreateOpen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    if (path !== '/dashboard' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const getInitials = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
    }
    if (user?.full_name) {
      const parts = user.full_name.trim().split(/\s+/);
      if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      return parts[0].slice(0, 2).toUpperCase();
    }
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return 'EB';
  };

  const officerName = user?.full_name?.trim()
    || (user?.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : '')
    || (user?.email ? user.email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Edward Brown');

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-[270px] bg-[#0c1322] text-gray-300 flex flex-col shrink-0 fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
        {/* Logo Area */}
        <div className="h-20 flex items-center justify-between px-5 border-b border-gray-800/80 bg-[#090e1a]">
          <Link to="/dashboard" className="flex items-center gap-3">
            <img src={logoImg} alt="KLYVOREK logo" className="h-10 w-10 rounded-full object-cover shrink-0 ring-1 ring-white/10" />
            <div className="leading-tight">
              <span className="text-white font-black text-base tracking-[0.14em] block">KLYVOREK</span>
              <span className="text-[8.5px] text-gray-400 font-semibold tracking-[0.06em] uppercase block">Where Law Enforcement Work</span>
              <span className="text-[7.5px] text-blue-400/90 font-medium tracking-[0.08em] uppercase block">Becomes Documentation</span>
            </div>
          </Link>
          <button className="lg:hidden text-gray-400 hover:text-white p-1" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <Link 
            to="/dashboard" 
            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
              isActive('/dashboard') ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'text-gray-300 hover:bg-gray-800/60 hover:text-white'
            }`}
          >
            <LayoutGrid size={18} className="mr-3 shrink-0" />
            Dashboard
          </Link>

          {/* Create Document Section */}
          <div className="pt-1">
            <button 
              onClick={() => setIsCreateOpen(!isCreateOpen)}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-xl text-gray-300 hover:bg-gray-800/60 hover:text-white transition-colors"
            >
              <div className="flex items-center">
                <FileText size={18} className="mr-3 shrink-0 text-gray-400" />
                Create Document
              </div>
              {isCreateOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            {isCreateOpen && (
              <div className="mt-1 ml-4 pl-3 border-l border-gray-800 space-y-1">
                <Link
                  to="/dashboard/create/incident-report"
                  className={`flex items-center px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                    isActive('/dashboard/create/incident-report') ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
                  }`}
                >
                  <Clock size={14} className="mr-2.5" />
                  Incident Report
                </Link>
                <Link
                  to="/dashboard/create/search-warrant"
                  className={`flex items-center px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                    isActive('/dashboard/create/search-warrant') ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
                  }`}
                >
                  <FileSearch size={14} className="mr-2.5" />
                  Search Warrant
                </Link>
                <Link
                  to="/dashboard/create/arrest-warrant"
                  className={`flex items-center px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                    isActive('/dashboard/create/arrest-warrant') ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
                  }`}
                >
                  <Scale size={14} className="mr-2.5" />
                  Arrest Warrant
                </Link>
              </div>
            )}
          </div>

          <Link 
            to="/dashboard/history" 
            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
              isActive('/dashboard/history') ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'text-gray-300 hover:bg-gray-800/60 hover:text-white'
            }`}
          >
            <History size={18} className={`mr-3 shrink-0 ${isActive('/dashboard/history') ? 'text-white' : 'text-gray-400'}`} />
            Document History
          </Link>

          <Link 
            to="/dashboard/profile" 
            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
              isActive('/dashboard/profile') ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'text-gray-300 hover:bg-gray-800/60 hover:text-white'
            }`}
          >
            <User size={18} className={`mr-3 shrink-0 ${isActive('/dashboard/profile') ? 'text-white' : 'text-gray-400'}`} />
            Profile Settings
          </Link>

          <Link 
            to="/dashboard/billing" 
            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
              isActive('/dashboard/billing') ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'text-gray-300 hover:bg-gray-800/60 hover:text-white'
            }`}
          >
            <CreditCard size={18} className={`mr-3 shrink-0 ${isActive('/dashboard/billing') ? 'text-white' : 'text-gray-400'}`} />
            Manage Billing
          </Link>

          <Link 
            to="/institute" 
            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
              isActive('/institute') ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'text-gray-300 hover:bg-gray-800/60 hover:text-white'
            }`}
          >
            <GraduationCap size={18} className={`mr-3 shrink-0 ${isActive('/institute') ? 'text-white' : 'text-gray-400'}`} />
            KLYVOREK Institute
          </Link>
        </nav>

        {/* Sign out bottom button */}
        <div className="p-4 border-t border-gray-800/80 mt-auto bg-[#090e1a]/60">
          <button 
            onClick={handleLogout}
            className="flex items-center text-sm font-medium text-gray-400 hover:text-rose-400 transition-colors w-full px-3 py-2 rounded-lg hover:bg-rose-500/10"
          >
            <Lock size={16} className="mr-3" />
            Secure Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200/80 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0 z-10 shadow-xs">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 lg:hidden"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
            <div className="lg:hidden flex items-center gap-2.5">
              <img src={logoImg} alt="KLYVOREK" className="h-8 w-8 rounded-full object-cover" />
              <span className="font-extrabold text-navy-900 text-sm tracking-widest">KLYVOREK</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            {/* System Secure badge */}
            <div className="hidden sm:flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200/70">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[11px] font-semibold text-emerald-800">System Secure</span>
            </div>

            {/* Notification Bell */}
            <button 
              className="relative p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
              title="Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
            </button>

            {/* User Pill from Client Screenshot */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-navy-900 to-blue-800 text-white flex items-center justify-center font-bold text-xs shadow-sm ring-2 ring-blue-100">
                {getInitials()}
              </div>
              <div className="hidden md:block leading-tight text-left">
                <p className="text-xs font-bold text-gray-900 truncate max-w-[160px]">
                  {officerName}
                </p>
                <p className="text-[10px] text-gray-500 font-medium">
                  {user?.rank || 'Law Enforcement Officer'}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
