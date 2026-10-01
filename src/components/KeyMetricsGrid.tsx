import React from 'react';
import {
  TrendingUp,
  DollarSign,
  HeartHandshake,
  ShieldCheck,
  Zap,
  Layers,
} from 'lucide-react';
import type { StudyDataset } from '../types';

interface KeyMetricsGridProps {
  dataset: StudyDataset;
}

export const KeyMetricsGrid: React.FC<KeyMetricsGridProps> = ({ dataset }) => {
  const { keyStats, correlationCoefficients } = dataset;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
      {/* 1. Attributed Sales */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 relative overflow-hidden group hover:border-indigo-500/50 transition">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-400">Total Attributed Sales</span>
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold text-white tracking-tight">
          ${(keyStats.totalAttributedSales / 1000000).toFixed(2)}M
        </div>
        <div className="mt-2 flex items-center text-xs text-emerald-400 font-medium">
          <TrendingUp className="w-3.5 h-3.5 mr-1" />
          <span>ROAS {keyStats.blendedRoas.toFixed(1)}x Blended</span>
        </div>
      </div>

      {/* 2. Brand Favorability & Sentiment */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 relative overflow-hidden group hover:border-indigo-500/50 transition">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-400">Net Brand Sentiment</span>
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
            <HeartHandshake className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold text-white tracking-tight">
          +{keyStats.sentimentLiftPoints}{' '}
          <span className="text-sm font-normal text-slate-400">pts</span>
        </div>
        <div className="mt-2 flex items-center text-xs text-indigo-300 font-medium">
          <span>+{keyStats.brandFavorabilityLift}% Favorability Lift</span>
        </div>
      </div>

      {/* 3. Econometric Correlation */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 relative overflow-hidden group hover:border-indigo-500/50 transition">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-400">Sentiment → Sales Correl.</span>
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
            <Zap className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold text-amber-300 tracking-tight">
          r = {correlationCoefficients.sentimentToSales.toFixed(2)}
        </div>
        <div className="mt-2 text-xs text-slate-400 font-medium">
          <span className="text-amber-400 font-semibold">p &lt; 0.001</span> (Empirical link)
        </div>
      </div>

      {/* 4. Brand Equity Mediation */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 relative overflow-hidden group hover:border-indigo-500/50 transition">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-400">Brand Equity → LTV</span>
          <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold text-white tracking-tight">
          r = {correlationCoefficients.brandEquityToLTV.toFixed(2)}
        </div>
        <div className="mt-2 text-xs text-slate-300">
          <span className="text-rose-400 font-semibold">44.2%</span> mediation in retention
        </div>
      </div>

      {/* 5. Customer Acquisition Cost */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 relative overflow-hidden group hover:border-indigo-500/50 transition">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-400">Blended CAC</span>
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold text-white tracking-tight">
          ${keyStats.blendedCac.toFixed(2)}
        </div>
        <div className="mt-2 text-xs text-cyan-300 font-medium">
          <span>-28% reduction via UGC</span>
        </div>
      </div>

      {/* 6. Halo Effect Multiplier */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 relative overflow-hidden group hover:border-indigo-500/50 transition">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-400">Organic Halo Lift</span>
          <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
            <Layers className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold text-purple-300 tracking-tight">
          1.74x
        </div>
        <div className="mt-2 text-xs text-slate-400">
          +$0.74 organic per $1 ad spend
        </div>
      </div>
    </div>
  );
};
