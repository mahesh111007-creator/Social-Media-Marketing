export interface ChannelMetric {
  id: string;
  name: string;
  shareOfSpend: number; // percentage
  spend: number; // in USD
  impressions: number;
  engagementRate: number; // %
  sentimentScore: number; // -100 to +100
  brandEquityLift: number; // %
  attributedSales: number; // in USD
  roas: number; // Return on Ad Spend (e.g. 4.2x)
  cac: number; // Customer Acquisition Cost
  haloFactor: number; // Indirect organic sales lift multiplier (1.0 - 2.5x)
  primaryAudience: string;
  bestContentType: string;
}

export interface TimeSeriesPoint {
  week: string;
  socialSpend: number;
  impressions: number;
  sentimentIndex: number; // -100 to 100
  brandPerceptionScore: number; // 0 to 100
  attributedSales: number; // USD
  organicSalesHalo: number; // USD
  totalSales: number;
}

export interface BrandImageDimension {
  dimension: string;
  baseline: number; // 0-100
  current: number;
  delta: number;
  significance: 'p < 0.001' | 'p < 0.01' | 'p < 0.05';
  description: string;
}

export interface CustomerVerbatim {
  id: string;
  channel: string;
  text: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  sentimentScore: number;
  category: 'Quality' | 'Customer Support' | 'Brand Values' | 'Pricing' | 'Aesthetics';
  impactOnPurchaseIntent: number; // %
  engagementCount: number;
}

export interface StudyDataset {
  id: string;
  title: string;
  subtitle: string;
  industry: string;
  timeframe: string;
  sampleSize: string;
  executiveSummary: string;
  correlationCoefficients: {
    sentimentToSales: number; // e.g. 0.72
    engagementToBrandEquity: number; // e.g. 0.65
    brandEquityToLTV: number; // e.g. 0.81
    spendToSalesElasticity: number; // e.g. 0.38
  };
  keyStats: {
    totalSpend: number;
    totalAttributedSales: number;
    blendedRoas: number;
    blendedCac: number;
    sentimentLiftPoints: number;
    brandFavorabilityLift: number;
  };
  timeSeries: TimeSeriesPoint[];
  channels: ChannelMetric[];
  brandDimensions: BrandImageDimension[];
  verbatims: CustomerVerbatim[];
  recommendations: string[];
}
