import React from 'react';
import {
  CheckCircle2,
  TrendingUp,
  Award,
  ArrowRight,
  Presentation,
  Shield,
  Lightbulb,
  FileSpreadsheet,
} from 'lucide-react';
import type { StudyDataset } from '../types';

interface OverviewViewProps {
  dataset: StudyDataset;
  onOpenExportModal: () => void;
  onSwitchTab: (tab: 'econometrics' | 'brand' | 'sales' | 'simulator') => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  dataset,
  onOpenExportModal,
  onSwitchTab,
}) => {
  return (
    <div className="space-y-6">
      {/* Hero Study Abstract Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-900/40 p-6 md:p-8 shadow-xl overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-4">
            <Award className="w-3.5 h-3.5" />
            Empirical Research Publication & Whitepaper
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {dataset.title}
          </h2>
          <p className="mt-2 text-sm md:text-base text-slate-300 leading-relaxed">
            {dataset.subtitle}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
              <span className="text-indigo-400 font-semibold">Scope:</span> {dataset.sampleSize}
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
              <span className="text-emerald-400 font-semibold">Time Horizon:</span> {dataset.timeframe}
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
              <span className="text-amber-400 font-semibold">Target Sector:</span> {dataset.industry}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenExportModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition active:scale-95 cursor-pointer"
            >
              <Presentation className="w-4 h-4 text-slate-950" />
              Generate Google Slides Deck
            </button>
            <button
              onClick={() => onSwitchTab('econometrics')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-200 font-semibold text-xs transition border border-slate-700"
            >
              <span>Explore Econometric Regression</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Two-Column Core Insights & Causal Framework */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Theoretical & Causal Framework */}
        <div className="lg:col-span-7 bg-slate-800/60 border border-slate-700/70 rounded-xl p-6 space-y-5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">The Dual-Engine Impact Model</h3>
              <p className="text-xs text-slate-400">
                How Social Marketing simultaneously accelerates immediate conversion & builds brand equity
              </p>
            </div>
          </div>

          {/* Model Diagram Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-700/80 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                  Step 1: Input Engine
                </span>
                <h4 className="text-sm font-semibold text-white mt-1">Social Marketing Stimuli</h4>
                <p className="text-xs text-slate-400 mt-1 leading-snug">
                  Creator UGC, interactive TikToks, executive thought leadership, and targeted micro-campaigns.
                </p>
              </div>
              <div className="mt-3 text-[11px] font-medium text-slate-300 bg-indigo-950/50 p-1.5 rounded border border-indigo-900/40">
                Key metric: Engagement & Reach
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900/80 border border-rose-900/50 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                  Step 2: Mediating Engine
                </span>
                <h4 className="text-sm font-semibold text-white mt-1">Brand Image Perception</h4>
                <p className="text-xs text-slate-400 mt-1 leading-snug">
                  Consumer trust, affinity, perceived quality, and social proof buffer.
                </p>
              </div>
              <div className="mt-3 text-[11px] font-medium text-rose-300 bg-rose-950/50 p-1.5 rounded border border-rose-900/40">
                Beta = +0.74 (p &lt; 0.001)
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900/80 border border-emerald-900/50 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Step 3: Commercial Engine
                </span>
                <h4 className="text-sm font-semibold text-white mt-1">Sales Velocity & LTV</h4>
                <p className="text-xs text-slate-400 mt-1 leading-snug">
                  Direct attributed conversions + 1.74x organic search halo & higher repeat purchase rate.
                </p>
              </div>
              <div className="mt-3 text-[11px] font-medium text-emerald-300 bg-emerald-950/50 p-1.5 rounded border border-emerald-900/40">
                ROAS {dataset.keyStats.blendedRoas}x blended
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Empirical Abstract & Methodology
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {dataset.executiveSummary}
            </p>
          </div>
        </div>

        {/* Right Column: Strategic Recommendations */}
        <div className="lg:col-span-5 bg-slate-800/60 border border-slate-700/70 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Actionable Findings</h3>
                <p className="text-xs text-slate-400">Evidence-based imperatives for marketing leaders</p>
              </div>
            </div>

            <div className="space-y-3">
              {dataset.recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/70 border border-slate-700/60"
                >
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-xs text-slate-300 leading-snug">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between">
            <span className="text-xs text-slate-400">Includes in-depth Google Slides export</span>
            <button
              onClick={onOpenExportModal}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition"
            >
              Export slides now <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Snapshot Previews for Brand Dimensions & Channel Allocation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Brand Dimensions Snapshot */}
        <div className="bg-slate-800/60 border border-slate-700/70 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-rose-400" />
              Brand Perception Dimensions (Pre vs Post)
            </h3>
            <button
              onClick={() => onSwitchTab('brand')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
            >
              View deep-dive →
            </button>
          </div>

          <div className="space-y-3">
            {dataset.brandDimensions.slice(0, 4).map((dim, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">{dim.dimension}</span>
                  <span className="text-emerald-400 font-bold">
                    +{dim.delta} pts ({dim.current}/100)
                  </span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden flex">
                  <div
                    className="bg-slate-600 h-full"
                    style={{ width: `${dim.baseline}%` }}
                    title={`Baseline: ${dim.baseline}`}
                  ></div>
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full"
                    style={{ width: `${dim.delta}%` }}
                    title={`Gain: +${dim.delta}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Channel Sales Snapshot */}
        <div className="bg-slate-800/60 border border-slate-700/70 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              Channel Sales & Efficiency Snapshot
            </h3>
            <button
              onClick={() => onSwitchTab('sales')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
            >
              View attribution →
            </button>
          </div>

          <div className="space-y-2.5">
            {dataset.channels.map((ch) => (
              <div
                key={ch.id}
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-700/40 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                  <span className="font-semibold text-white">{ch.name}</span>
                  <span className="text-slate-400 text-[11px]">({ch.shareOfSpend}% spend)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-300">ROAS: <strong className="text-emerald-400">{ch.roas}x</strong></span>
                  <span className="text-slate-400">CAC: <strong>${ch.cac.toFixed(0)}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
