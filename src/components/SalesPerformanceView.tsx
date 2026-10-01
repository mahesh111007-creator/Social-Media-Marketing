import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Layers,
  Sparkles,
  PieChart,
  HelpCircle,
} from 'lucide-react';
import type { StudyDataset, ChannelMetric } from '../types';

interface SalesPerformanceViewProps {
  dataset: StudyDataset;
}

export const SalesPerformanceView: React.FC<SalesPerformanceViewProps> = ({ dataset }) => {
  const [selectedChannel, setSelectedChannel] = useState<ChannelMetric>(dataset.channels[0]);
  const [attributionModel, setAttributionModel] = useState<'lastClick' | 'dataDriven' | 'firstClick'>('dataDriven');

  const totalSpend = dataset.keyStats.totalSpend;
  const totalSales = dataset.keyStats.totalAttributedSales;

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <DollarSign className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-bold text-white">
                Sales Attribution & Multi-Channel Commercial Matrix
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Evaluating Return on Ad Spend (ROAS), Customer Acquisition Cost (CAC), and Organic Search Halo multipliers across social networks.
            </p>
          </div>

          {/* Attribution Model Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-lg border border-slate-700 text-xs">
            <span className="text-[11px] text-slate-400 px-2 font-medium">Model:</span>
            <button
              onClick={() => setAttributionModel('lastClick')}
              className={`px-2.5 py-1 rounded-md transition ${
                attributionModel === 'lastClick'
                  ? 'bg-slate-700 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Last-Touch
            </button>
            <button
              onClick={() => setAttributionModel('dataDriven')}
              className={`px-2.5 py-1 rounded-md transition ${
                attributionModel === 'dataDriven'
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Data-Driven Multi-Touch (MTA)
            </button>
            <button
              onClick={() => setAttributionModel('firstClick')}
              className={`px-2.5 py-1 rounded-md transition ${
                attributionModel === 'firstClick'
                  ? 'bg-slate-700 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              First-Touch
            </button>
          </div>
        </div>
      </div>

      {/* Attribution Warning Notice if Last-Touch */}
      {attributionModel === 'lastClick' && (
        <div className="bg-amber-950/40 border border-amber-800/50 rounded-lg p-3 text-xs text-amber-300 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>
            <strong>Methodology Note:</strong> Last-touch attribution undercounts top-of-funnel social media discovery by up to <strong>54%</strong> because users frequently discover products on TikTok/Instagram and subsequently convert via Direct URL or Branded Google Search.
          </span>
        </div>
      )}

      {/* Detailed Channel Performance Table */}
      <div className="bg-slate-800/60 border border-slate-700/70 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-slate-700/70 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <PieChart className="w-4 h-4 text-emerald-400" />
            Social Channel ROI & Attributed Sales Breakdown
          </h3>
          <span className="text-xs text-slate-400">Click a row to inspect creative playbooks</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/80 text-slate-400 font-semibold border-b border-slate-700">
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Share of Spend</th>
                <th className="py-3 px-4">Total Spend</th>
                <th className="py-3 px-4">Attributed Sales</th>
                <th className="py-3 px-4">ROAS</th>
                <th className="py-3 px-4">CAC</th>
                <th className="py-3 px-4">Engagement</th>
                <th className="py-3 px-4">Organic Halo Multiplier</th>
                <th className="py-3 px-4">Sentiment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60">
              {dataset.channels.map((ch) => {
                const isSelected = selectedChannel.id === ch.id;

                // Adjust reported sales based on attribution model
                let displayedSales = ch.attributedSales;
                let displayedRoas = ch.roas;
                if (attributionModel === 'lastClick') {
                  displayedSales = ch.attributedSales * 0.65;
                  displayedRoas = Number((ch.roas * 0.65).toFixed(1));
                } else if (attributionModel === 'firstClick') {
                  displayedSales = ch.attributedSales * 1.15;
                  displayedRoas = Number((ch.roas * 1.15).toFixed(1));
                }

                return (
                  <tr
                    key={ch.id}
                    onClick={() => setSelectedChannel(ch)}
                    className={`cursor-pointer transition hover:bg-slate-700/40 ${
                      isSelected ? 'bg-indigo-950/40 border-l-4 border-indigo-500' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                      {ch.name}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-mono">{ch.shareOfSpend}%</td>
                    <td className="py-3.5 px-4 text-slate-300 font-mono">${(ch.spend / 1000).toFixed(0)}k</td>
                    <td className="py-3.5 px-4 font-bold text-white font-mono">
                      ${(displayedSales / 1000).toFixed(0)}k
                    </td>
                    <td className="py-3.5 px-4 font-bold text-emerald-400 font-mono">
                      {displayedRoas}x
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-mono">${ch.cac.toFixed(2)}</td>
                    <td className="py-3.5 px-4 text-slate-300 font-mono">{ch.engagementRate}%</td>
                    <td className="py-3.5 px-4 text-purple-300 font-mono font-semibold">
                      +{((ch.haloFactor - 1) * 100).toFixed(0)}% ({ch.haloFactor}x)
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-900/60 font-semibold font-mono">
                        +{ch.sentimentScore}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Channel Deep Dive Card */}
      <div className="bg-gradient-to-r from-slate-800/80 via-slate-850 to-slate-800/80 border border-indigo-500/30 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
          <div>
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              Selected Channel Strategy
            </span>
            <h3 className="text-xl font-bold text-white mt-1">
              {selectedChannel.name} Creative Engine & Conversion Dynamics
            </h3>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300">
              Audience: <strong className="text-white">{selectedChannel.primaryAudience}</strong>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <div className="bg-slate-900/70 rounded-lg p-4 border border-slate-700/60">
            <span className="text-xs text-slate-400 font-medium">Optimal Content Format</span>
            <p className="text-sm font-semibold text-white mt-1 leading-snug">
              {selectedChannel.bestContentType}
            </p>
          </div>

          <div className="bg-slate-900/70 rounded-lg p-4 border border-slate-700/60">
            <span className="text-xs text-slate-400 font-medium">The Search Halo Mechanism</span>
            <p className="text-xs text-slate-300 mt-1 leading-snug">
              Every $1,000 spent on {selectedChannel.name} stimulated an estimated{' '}
              <strong className="text-emerald-400 font-mono">
                ${((selectedChannel.haloFactor - 1) * 1000).toFixed(0)}
              </strong>{' '}
              in incremental organic Google branded search transactions.
            </p>
          </div>

          <div className="bg-slate-900/70 rounded-lg p-4 border border-slate-700/60">
            <span className="text-xs text-slate-400 font-medium">Customer Acquisition Efficiency</span>
            <p className="text-xs text-slate-300 mt-1 leading-snug">
              CAC of <strong className="text-white font-mono">${selectedChannel.cac.toFixed(2)}</strong> represents a{' '}
              <strong className="text-emerald-400 font-mono">
                {(100 - (selectedChannel.cac / 65) * 100).toFixed(0)}%
              </strong>{' '}
              advantage over standard search display benchmarks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
