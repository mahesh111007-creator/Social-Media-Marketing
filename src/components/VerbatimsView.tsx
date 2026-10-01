import React, { useState } from 'react';
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Filter,
  CheckCircle,
  Share2,
} from 'lucide-react';
import type { StudyDataset } from '../types';

interface VerbatimsViewProps {
  dataset: StudyDataset;
}

export const VerbatimsView: React.FC<VerbatimsViewProps> = ({ dataset }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Quality', 'Customer Support', 'Brand Values', 'Pricing'];

  const filteredVerbatims =
    selectedCategory === 'All'
      ? dataset.verbatims
      : dataset.verbatims.filter((v) => v.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <MessageSquare className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-white">
                Voice of Consumer (VOC): Qualitative Sentiment & Purchase Intent
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Analyzing empirical customer quotes across social networks and their measurable transmission into purchase decisions.
              </p>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-lg border border-slate-700 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md transition ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Verbatim Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredVerbatims.map((item) => (
          <div
            key={item.id}
            className="bg-slate-800/60 border border-slate-700/70 rounded-xl p-5 flex flex-col justify-between hover:border-slate-600 transition"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {item.channel}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Category: <strong className="text-slate-200">{item.category}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {item.sentiment === 'positive' ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900/60">
                      <ThumbsUp className="w-3 h-3" /> +{item.sentimentScore}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-900/60">
                      <ThumbsDown className="w-3 h-3" /> {item.sentimentScore}
                    </span>
                  )}
                </div>
              </div>

              <blockquote className="text-sm text-slate-200 font-serif italic leading-relaxed">
                {item.text}
              </blockquote>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1">
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                {item.engagementCount.toLocaleString()} public interactions
              </span>
              <span className="text-slate-300 font-medium">
                Purchase Intent Impact:{' '}
                <strong className="text-emerald-400 font-mono">+{item.impactOnPurchaseIntent}%</strong>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
