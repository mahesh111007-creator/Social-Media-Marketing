import React from 'react';
import type { User } from 'firebase/auth';
import {
  Presentation,
  BookOpen,
  Sparkles,
  LogOut,
  ChevronDown,
  Building2,
  TrendingUp,
} from 'lucide-react';
import type { StudyDataset } from '../types';

interface HeaderProps {
  user: User | null;
  datasets: StudyDataset[];
  selectedDataset: StudyDataset;
  onSelectDataset: (dataset: StudyDataset) => void;
  onSignIn: () => void;
  onSignOut: () => void;
  onOpenExportModal: () => void;
  isSigningIn: boolean;
  activeTab: 'overview' | 'econometrics' | 'brand' | 'sales' | 'simulator' | 'verbatims';
  setActiveTab: (tab: 'overview' | 'econometrics' | 'brand' | 'sales' | 'simulator' | 'verbatims') => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  datasets,
  selectedDataset,
  onSelectDataset,
  onSignIn,
  onSignOut,
  onOpenExportModal,
  isSigningIn,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/95 sticky top-0 z-40 backdrop-blur">
      {/* Top Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white tracking-tight">SocialImpact</h1>
                <span className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-md bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  Research Lab
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Empirical Study: Impact of Social Media on Brand Image & Sales Performance
              </p>
            </div>
          </div>

          {/* Right Action Bar: Case Study Switcher, Export Slides, Google Auth */}
          <div className="flex items-center flex-wrap gap-2.5">
            {/* Case Study Dropdown */}
            <div className="relative group">
              <label htmlFor="case-study-select" className="sr-only">Select Research Study</label>
              <div className="flex items-center gap-2 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-200 cursor-pointer transition">
                <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                <span className="truncate max-w-[170px] sm:max-w-[210px]">
                  {selectedDataset.title.split(':')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <select
                id="case-study-select"
                aria-label="Select Research Study Dataset"
                value={selectedDataset.id}
                onChange={(e) => {
                  const found = datasets.find((d) => d.id === e.target.value);
                  if (found) onSelectDataset(found);
                }}
                className="absolute inset-0 opacity-0 cursor-pointer w-full"
              >
                {datasets.map((d) => (
                  <option key={d.id} value={d.id} className="bg-slate-900 text-white">
                    {d.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Google Slides Export Button */}
            <button
              onClick={onOpenExportModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-sm transition active:scale-95"
              title="Export complete study deck to Google Slides"
            >
              <Presentation className="w-4 h-4 text-amber-400" />
              <span>Export to Google Slides</span>
            </button>

            {/* Google Sign-in or User Profile */}
            {user ? (
              <div className="flex items-center gap-2.5 bg-slate-800/90 border border-slate-700/80 rounded-lg pl-2 pr-3 py-1">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'Google User'}
                    className="w-6 h-6 rounded-full border border-indigo-400/50"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold">
                    {user.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                <div className="flex flex-col text-left">
                  <span className="text-xs font-medium text-slate-200 truncate max-w-[110px]">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Slides Linked
                  </span>
                </div>
                <button
                  onClick={onSignOut}
                  title="Sign out of Google"
                  className="ml-1 text-slate-400 hover:text-rose-400 transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="gsi-material-button shadow-md"
                onClick={onSignIn}
                disabled={isSigningIn}
              >
                <div className="gsi-material-button-state"></div>
                <div className="gsi-material-button-content-wrapper">
                  <div className="gsi-material-button-icon">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      style={{ display: 'block' }}
                    >
                      <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                      ></path>
                      <path
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                      ></path>
                      <path
                        fill="#FBBC05"
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                      ></path>
                      <path
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                      ></path>
                      <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
                  </div>
                  <span className="gsi-material-button-contents">
                    {isSigningIn ? 'Connecting...' : 'Sign in with Google'}
                  </span>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 mt-4 overflow-x-auto no-scrollbar border-t border-slate-800/80 pt-2.5">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Executive Synthesis
          </button>
          <button
            onClick={() => setActiveTab('econometrics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'econometrics'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Econometric & Lag Models
          </button>
          <button
            onClick={() => setActiveTab('brand')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'brand'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-400"></span>
            Brand Image & Sentiment
          </button>
          <button
            onClick={() => setActiveTab('sales')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'sales'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Sales Attribution & Channels
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            What-If Allocation Lab
          </button>
          <button
            onClick={() => setActiveTab('verbatims')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'verbatims'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            Voice of Consumer (VOC)
          </button>
        </div>
      </div>
    </header>
  );
};
