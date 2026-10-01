import React, { useState } from 'react';
import type { User } from 'firebase/auth';
import {
  X,
  Presentation,
  CheckCircle,
  ExternalLink,
  Loader2,
  AlertCircle,
  Sparkles,
  Layers,
  FileText,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { StudyDataset } from '../types';
import { exportStudyToGoogleSlides, type CreateSlidesResult } from '../services/slidesService';

interface SlidesExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  dataset: StudyDataset;
  user: User | null;
  onSignIn: () => void;
  isSigningIn: boolean;
}

export const SlidesExportModal: React.FC<SlidesExportModalProps> = ({
  isOpen,
  onClose,
  dataset,
  user,
  onSignIn,
  isSigningIn,
}) => {
  const [customTitle, setCustomTitle] = useState<string>(
    `${dataset.title.split(':')[0]} - Executive Presentation`
  );
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportResult, setExportResult] = useState<CreateSlidesResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activePreviewSlide, setActivePreviewSlide] = useState<number>(0);

  if (!isOpen) return null;

  const handleExport = async () => {
    setIsExporting(true);
    setErrorMessage(null);
    try {
      const result = await exportStudyToGoogleSlides(dataset, customTitle);
      setExportResult(result);
      // Trigger festive celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      console.error('Export error:', err);
      setErrorMessage(
        err?.message || 'Failed to export presentation. Please ensure Google Slides permission is enabled.'
      );
    } finally {
      setIsExporting(false);
    }
  };

  const slidePreviews = [
    {
      num: 1,
      name: 'Title & Cover',
      desc: 'Research study title, sector categorization, sample size, and date stamp.',
    },
    {
      num: 2,
      name: 'Executive Summary',
      desc: 'Correlation coefficients, OLS regression beta, total attributed revenue, blended ROAS.',
    },
    {
      num: 3,
      name: 'Brand Dimensions',
      desc: '5 psychometric perception pillars (Trust, Warmth, Social Advocacy, Quality, Crisis Buffer).',
    },
    {
      num: 4,
      name: 'Channel Sales Matrix',
      desc: 'Channel comparison (TikTok, Instagram, YouTube, LinkedIn, X) with CAC and search halo.',
    },
    {
      num: 5,
      name: 'Strategic Roadmap',
      desc: '4 actionable CMO directives for social flighting, UGC prioritization, and brand equity.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Presentation className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Export Executive Study to Google Slides
              </h3>
              <p className="text-xs text-slate-400">
                Google Workspace Integration • Creates a ready-to-present 5-slide deck
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Success State */}
          {exportResult ? (
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Presentation Created Successfully!</h4>
                <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
                  Your 5-slide executive presentation titled{' '}
                  <strong className="text-emerald-300 font-medium">"{exportResult.title}"</strong> has been generated and saved to your Google Drive account.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={exportResult.presentationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in Google Slides
                </a>
                <button
                  onClick={() => setExportResult(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
                >
                  Export Another Variation
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Mandatory User Confirmation Notice */}
              <div className="bg-indigo-950/40 border border-indigo-900/50 rounded-xl p-4 text-xs text-slate-300 leading-relaxed">
                <div className="flex items-center gap-2 text-indigo-300 font-semibold mb-1">
                  <Sparkles className="w-4 h-4" />
                  Workspace Confirmation & Permissions
                </div>
                This action will create a new presentation file in your Google Drive and format 5 executive study slides using the Google Slides API, with permission from your account.
              </div>

              {/* Title input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Presentation Title in Google Slides
                </label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                  placeholder="Enter presentation title..."
                />
              </div>

              {/* Deck Structure & Slide Previews */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-300 block">
                  Included Slides (5 Slides Total)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {slidePreviews.map((slide, idx) => (
                    <button
                      key={slide.num}
                      type="button"
                      onClick={() => setActivePreviewSlide(idx)}
                      className={`p-2.5 rounded-lg text-left transition border ${
                        activePreviewSlide === idx
                          ? 'bg-indigo-950/60 border-indigo-500 text-white'
                          : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-indigo-400 block font-bold">
                        Slide 0{slide.num}
                      </span>
                      <span className="text-xs font-semibold block truncate mt-0.5">
                        {slide.name}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Selected Slide Detail */}
                <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3 text-xs text-slate-300 flex items-center justify-between">
                  <div>
                    <strong className="text-white">Slide 0{slidePreviews[activePreviewSlide].num}: </strong>
                    <span>{slidePreviews[activePreviewSlide].desc}</span>
                  </div>
                </div>
              </div>

              {/* Error Notice */}
              {errorMessage && (
                <div className="bg-rose-950/50 border border-rose-800/60 rounded-xl p-4 text-xs text-rose-300 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Export Failed</strong>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        {!exportResult && (
          <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-400">
              {user ? (
                <span>Signed in as <strong className="text-slate-200">{user.email}</strong></span>
              ) : (
                <span>Sign in required to create presentation</span>
              )}
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={onClose}
                disabled={isExporting}
                className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-400 hover:text-white transition"
              >
                Cancel
              </button>

              {user ? (
                <button
                  onClick={handleExport}
                  disabled={isExporting}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating Slides...</span>
                    </>
                  ) : (
                    <>
                      <Presentation className="w-4 h-4" />
                      <span>Confirm Export to Google Slides</span>
                    </>
                  )}
                </button>
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
                      {isSigningIn ? 'Connecting...' : 'Sign in with Google to Export'}
                    </span>
                  </div>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
