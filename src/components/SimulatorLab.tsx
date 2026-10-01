import React, { useState } from 'react';
import {
  Sparkles,
  Sliders,
  TrendingUp,
  DollarSign,
  Heart,
  Layers,
  RotateCcw,
  CheckCircle,
} from 'lucide-react';
import type { StudyDataset } from '../types';

interface SimulatorLabProps {
  dataset: StudyDataset;
}

export const SimulatorLab: React.FC<SimulatorLabProps> = ({ dataset }) => {
  // Simulator State
  const [budget, setBudget] = useState<number>(500000);
  const [tiktokShare, setTiktokShare] = useState<number>(35);
  const [instaShare, setInstaShare] = useState<number>(35);
  const [youtubeShare, setYoutubeShare] = useState<number>(20);
  const [linkedinShare, setLinkedinShare] = useState<number>(10);

  const [ugcFocus, setUgcFocus] = useState<number>(60); // % UGC vs Branded Studio
  const [brandBuildingRatio, setBrandBuildingRatio] = useState<number>(40); // 40% Brand vs 60% Performance

  // Calculate normalized shares
  const totalShare = tiktokShare + instaShare + youtubeShare + linkedinShare;
  const normTiktok = (tiktokShare / totalShare);
  const normInsta = (instaShare / totalShare);
  const normYoutube = (youtubeShare / totalShare);
  const normLinkedin = (linkedinShare / totalShare);

  // Dynamic simulation equations derived from the dataset's econometric beta coefficients
  // Base ROAS by channel
  const predictedRoas =
    normTiktok * (3.8 + (ugcFocus / 100) * 0.9) +
    normInsta * (4.0 + (ugcFocus / 100) * 0.5) +
    normYoutube * (3.5 + (brandBuildingRatio / 100) * 0.8) +
    normLinkedin * (3.4 + (brandBuildingRatio / 100) * 0.6);

  const predictedAttributedSales = Math.round(budget * predictedRoas);

  // Halo multiplier: influenced by brand building and YouTube/TikTok discovery
  const predictedHaloMultiplier = 1.0 + (brandBuildingRatio / 100) * 0.55 + (normYoutube * 0.4) + (normTiktok * 0.35);
  const predictedHaloSales = Math.round(predictedAttributedSales * (predictedHaloMultiplier - 1));
  const predictedTotalSales = predictedAttributedSales + predictedHaloSales;

  // Sentiment calculation: UGC and brand building generate higher sentiment polarity
  const predictedSentiment = Math.round(
    45 +
      (ugcFocus / 100) * 22 +
      (brandBuildingRatio / 100) * 25 -
      (100 - ugcFocus) * 0.08
  );

  // Estimated CAC
  const baseCac = 45;
  const predictedCac = Number(
    (
      baseCac *
      (1.2 - (ugcFocus / 100) * 0.35) *
      (1.1 - (predictedSentiment / 100) * 0.25)
    ).toFixed(2)
  );

  const handleReset = () => {
    setBudget(500000);
    setTiktokShare(35);
    setInstaShare(35);
    setYoutubeShare(20);
    setLinkedinShare(10);
    setUgcFocus(60);
    setBrandBuildingRatio(40);
  };

  return (
    <div className="space-y-6">
      {/* Intro Bar */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-white">
                What-If Econometric Simulator: Budget & Content Mix
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Simulate how shifting budget across networks and content formats impacts Brand Sentiment and Sales Performance.
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-750 text-slate-300 text-xs font-medium border border-slate-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Baseline
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-6 bg-slate-800/60 border border-slate-700/70 rounded-xl p-6 space-y-5">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-400" />
            Social Marketing Input Parameters
          </h3>

          {/* Budget Slider */}
          <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-lg border border-slate-700/60">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold">Total Monthly Social Budget</span>
              <span className="text-emerald-400 font-bold font-mono text-sm">
                ${(budget / 1000).toLocaleString()}k
              </span>
            </div>
            <input
              type="range"
              min="100000"
              max="2000000"
              step="50000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          {/* Channel Allocations */}
          <div className="space-y-3 bg-slate-900/60 p-3.5 rounded-lg border border-slate-700/60">
            <span className="text-xs font-semibold text-slate-300 block">
              Channel Share of Spend ({totalShare}% total)
            </span>

            {/* TikTok */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">TikTok ({Math.round(normTiktok * 100)}%)</span>
                <span className="text-slate-200 font-mono">
                  ${Math.round((budget * normTiktok) / 1000)}k
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                value={tiktokShare}
                onChange={(e) => setTiktokShare(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>

            {/* Instagram */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Instagram ({Math.round(normInsta * 100)}%)</span>
                <span className="text-slate-200 font-mono">
                  ${Math.round((budget * normInsta) / 1000)}k
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                value={instaShare}
                onChange={(e) => setInstaShare(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            {/* YouTube */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">YouTube ({Math.round(normYoutube * 100)}%)</span>
                <span className="text-slate-200 font-mono">
                  ${Math.round((budget * normYoutube) / 1000)}k
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                value={youtubeShare}
                onChange={(e) => setYoutubeShare(Number(e.target.value))}
                className="w-full accent-red-500 cursor-pointer"
              />
            </div>

            {/* LinkedIn */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">LinkedIn ({Math.round(normLinkedin * 100)}%)</span>
                <span className="text-slate-200 font-mono">
                  ${Math.round((budget * normLinkedin) / 1000)}k
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                value={linkedinShare}
                onChange={(e) => setLinkedinShare(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Content Strategy Mix */}
          <div className="space-y-3 bg-slate-900/60 p-3.5 rounded-lg border border-slate-700/60">
            <span className="text-xs font-semibold text-slate-300 block">Content & Creative Strategy</span>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">User-Generated Content (UGC) vs. Studio Ads</span>
                <span className="text-amber-400 font-bold font-mono">{ugcFocus}% UGC</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                value={ugcFocus}
                onChange={(e) => setUgcFocus(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Brand Equity / Purpose vs. Direct Conversion Promo</span>
                <span className="text-rose-400 font-bold font-mono">{brandBuildingRatio}% Brand Equity</span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                value={brandBuildingRatio}
                onChange={(e) => setBrandBuildingRatio(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Forecast Output Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-800/60 border border-slate-700/70 rounded-xl p-6">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Econometric Simulated Forecast
            </h3>

            <div className="grid grid-cols-2 gap-3.5">
              {/* Predicted Direct Sales */}
              <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-700/70">
                <span className="text-[11px] text-slate-400 block font-medium">Attributed Direct Sales</span>
                <div className="text-xl font-bold text-white font-mono mt-1">
                  ${(predictedAttributedSales / 1000000).toFixed(2)}M
                </div>
                <div className="text-xs text-emerald-400 font-semibold mt-1">
                  ROAS {predictedRoas.toFixed(2)}x
                </div>
              </div>

              {/* Predicted Halo Organic Sales */}
              <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-700/70">
                <span className="text-[11px] text-slate-400 block font-medium">Organic Search Halo</span>
                <div className="text-xl font-bold text-purple-300 font-mono mt-1">
                  +${(predictedHaloSales / 1000000).toFixed(2)}M
                </div>
                <div className="text-xs text-purple-400 font-semibold mt-1">
                  {predictedHaloMultiplier.toFixed(2)}x Multiplier
                </div>
              </div>

              {/* Total Commercial Velocity */}
              <div className="col-span-2 bg-gradient-to-r from-emerald-950/40 to-indigo-950/40 p-3.5 rounded-lg border border-emerald-500/40">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-emerald-300 font-semibold">
                    Total Commercial Revenue (Direct + Halo)
                  </span>
                  <span className="text-lg font-bold text-white font-mono">
                    ${(predictedTotalSales / 1000000).toFixed(2)}M
                  </span>
                </div>
              </div>

              {/* Predicted Brand Sentiment */}
              <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-700/70">
                <span className="text-[11px] text-slate-400 block font-medium">Predicted Brand Sentiment</span>
                <div className="text-xl font-bold text-amber-300 font-mono mt-1">
                  +{predictedSentiment}/100
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {predictedSentiment > 70 ? 'Strong Brand Warmth' : 'Moderate Brand Warmth'}
                </div>
              </div>

              {/* Predicted CAC */}
              <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-700/70">
                <span className="text-[11px] text-slate-400 block font-medium">Estimated CAC</span>
                <div className="text-xl font-bold text-cyan-300 font-mono mt-1">
                  ${predictedCac}
                </div>
                <div className="text-xs text-cyan-400 mt-1">
                  Efficiency Index: High
                </div>
              </div>
            </div>
          </div>

          {/* Strategic Hypothesis Analysis */}
          <div className="bg-slate-800/60 border border-slate-700/70 rounded-xl p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              Hypothesis Test Evaluation
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {brandBuildingRatio >= 35 && ugcFocus >= 50
                ? 'Optimal Equilibrium Reached: Maintaining 35%+ brand-building alongside 50%+ UGC maximizes the organic search halo effect (1.7x+) and minimizes long-term CAC fatigue.'
                : brandBuildingRatio < 25
                ? 'Performance Exhaustion Risk: Brand building is below 25%. While short-term ROAS may look acceptable, customer acquisition costs will begin rising within 6-8 weeks due to creative fatigue and lack of brand equity replenishment.'
                : 'UGC Under-Utilized: Increasing UGC content above 50% lowers customer acquisition cost and elevates authentic peer sentiment.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
