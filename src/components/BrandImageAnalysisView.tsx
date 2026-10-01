import React from 'react';
import {
  Shield,
  Heart,
  MessageSquare,
  ThumbsUp,
  AlertTriangle,
  Award,
} from 'lucide-react';
import type { StudyDataset } from '../types';

interface BrandImageAnalysisViewProps {
  dataset: StudyDataset;
}

export const BrandImageAnalysisView: React.FC<BrandImageAnalysisViewProps> = ({ dataset }) => {
  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-5">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
            <Heart className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-lg font-bold text-white">Brand Image & Sentiment Dimensions</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Evaluating the structural shift in consumer brand perception across five validated psychological pillars.
            </p>
          </div>
        </div>
      </div>

      {/* Brand Dimensions Deep-Dive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dataset.brandDimensions.map((dim, idx) => (
          <div
            key={idx}
            className="bg-slate-800/60 border border-slate-700/70 rounded-xl p-5 flex flex-col justify-between hover:border-slate-600 transition"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
                  Pillar {idx + 1}
                </span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900/60">
                  {dim.significance}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-1.5">{dim.dimension}</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">{dim.description}</p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-700/60">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-400">Baseline vs. Current</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 line-through">{dim.baseline}</span>
                  <span className="text-white font-bold text-sm">{dim.current}/100</span>
                  <span className="text-emerald-400 font-bold">+{dim.delta} pts</span>
                </div>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden flex">
                <div
                  className="bg-slate-600 h-full"
                  style={{ width: `${dim.baseline}%` }}
                ></div>
                <div
                  className="bg-gradient-to-r from-rose-500 to-amber-400 h-full"
                  style={{ width: `${dim.delta}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}

        {/* Brand Crisis Resilience Card */}
        <div className="bg-gradient-to-br from-slate-800/90 via-slate-900 to-indigo-950/60 border border-indigo-500/30 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
              <Shield className="w-4 h-4" />
              The "Buffer Hypothesis"
            </div>
            <h3 className="text-base font-bold text-white mt-1.5">
              Crisis & Negative Virality Buffer
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Brands with strong active social communities suffered <strong>68% less churn</strong> during negative PR episodes. The organic community acts as an active defensive advocate army that reframes issues before sales impact occurs.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-indigo-900/50 flex items-center justify-between text-xs text-indigo-300">
            <span>Community Defense Ratio</span>
            <strong className="text-white font-mono text-sm">4.3 : 1 Counter-comments</strong>
          </div>
        </div>
      </div>

      {/* Sentiment Polarity Distribution Across Channels */}
      <div className="bg-slate-800/60 border border-slate-700/70 rounded-xl p-6">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
          <MessageSquare className="w-4 h-4 text-amber-400" />
          Channel Sentiment Distribution & Public Polarity
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Comparing the ratio of Positive, Neutral, and Critical public commentary generated across each channel.
        </p>

        <div className="space-y-4">
          {dataset.channels.map((channel) => {
            // Calibrate sentiment shares based on channel score
            const pos = Math.min(88, Math.max(45, Math.round(channel.sentimentScore * 0.7 + 25)));
            const neg = Math.max(5, Math.min(25, Math.round((100 - channel.sentimentScore) * 0.3)));
            const neu = 100 - pos - neg;

            return (
              <div key={channel.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{channel.name}</span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      (Net Score: +{channel.sentimentScore})
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="text-emerald-400 font-semibold">{pos}% Positive</span>
                    <span className="text-slate-400">{neu}% Neutral</span>
                    <span className="text-rose-400">{neg}% Negative</span>
                  </div>
                </div>

                {/* Stacked polarity bar */}
                <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden flex">
                  <div
                    className="bg-emerald-500 h-full"
                    style={{ width: `${pos}%` }}
                    title={`Positive: ${pos}%`}
                  ></div>
                  <div
                    className="bg-slate-600 h-full"
                    style={{ width: `${neu}%` }}
                    title={`Neutral: ${neu}%`}
                  ></div>
                  <div
                    className="bg-rose-500 h-full"
                    style={{ width: `${neg}%` }}
                    title={`Negative: ${neg}%`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Positive Sentiment (Admiration, Recommending)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-slate-600"></span> Neutral (Informational, Tagging)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500"></span> Negative (Friction, Price critique)
          </span>
        </div>
      </div>
    </div>
  );
};
