/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { STUDY_DATASETS } from './data/studyDatasets';
import type { StudyDataset } from './types';
import { initAuth, googleSignIn, logout } from './services/firebase';
import { Header } from './components/Header';
import { KeyMetricsGrid } from './components/KeyMetricsGrid';
import { OverviewView } from './components/OverviewView';
import { EconometricsView } from './components/EconometricsView';
import { BrandImageAnalysisView } from './components/BrandImageAnalysisView';
import { SalesPerformanceView } from './components/SalesPerformanceView';
import { SimulatorLab } from './components/SimulatorLab';
import { VerbatimsView } from './components/VerbatimsView';
import { SlidesExportModal } from './components/SlidesExportModal';

export default function App() {
  const [datasets] = useState<StudyDataset[]>(STUDY_DATASETS);
  const [selectedDataset, setSelectedDataset] = useState<StudyDataset>(STUDY_DATASETS[0]);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'econometrics' | 'brand' | 'sales' | 'simulator' | 'verbatims'
  >('overview');

  // Firebase Google Auth State (strictly in-memory token management)
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  // Initialize Auth state listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
      },
      () => {
        setUser(null);
        setToken(null);
      }
    );
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
      }
    } catch (err) {
      console.error('Sign-in error:', err);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      setUser(null);
      setToken(null);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation & Auth Bar */}
      <Header
        user={user}
        datasets={datasets}
        selectedDataset={selectedDataset}
        onSelectDataset={setSelectedDataset}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        isSigningIn={isSigningIn}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Study Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Executive KPI Summary Grid (Always Visible) */}
        <KeyMetricsGrid dataset={selectedDataset} />

        {/* Tab Content View */}
        <div className="pt-2">
          {activeTab === 'overview' && (
            <OverviewView
              dataset={selectedDataset}
              onOpenExportModal={() => setIsExportModalOpen(true)}
              onSwitchTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'econometrics' && (
            <EconometricsView dataset={selectedDataset} />
          )}

          {activeTab === 'brand' && (
            <BrandImageAnalysisView dataset={selectedDataset} />
          )}

          {activeTab === 'sales' && (
            <SalesPerformanceView dataset={selectedDataset} />
          )}

          {activeTab === 'simulator' && (
            <SimulatorLab dataset={selectedDataset} />
          )}

          {activeTab === 'verbatims' && (
            <VerbatimsView dataset={selectedDataset} />
          )}
        </div>
      </main>

      {/* Google Slides Export Modal */}
      <SlidesExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        dataset={selectedDataset}
        user={user}
        onSignIn={handleSignIn}
        isSigningIn={isSigningIn}
      />

      {/* Academic Citation & Institutional Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-6 mt-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-semibold text-slate-300">SocialImpact Research Lab</span> • Longitudinal Study on Social Media Marketing, Brand Equity Mediation & Commercial Revenue
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>OLS Regression (R² = 0.742)</span>
            <span>•</span>
            <span>Google Workspace Verified</span>
            <span>•</span>
            <span>Google Slides REST API v1</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
