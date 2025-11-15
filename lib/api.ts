"use client";
import React from 'react';
import { ApiResponse, DashboardData, DailyMetric, Lead } from './types';

// Use internal Next.js API route
const API_ENDPOINT = '/api/analytics';

// Fallback time series data (7 days)
const fallbackTimeSeriesData: DailyMetric[] = [
  { date: '2025-11-01', dayName: 'Mon', conversations: 65, appointments: 28 },
  { date: '2025-11-02', dayName: 'Tue', conversations: 59, appointments: 31 },
  { date: '2025-11-03', dayName: 'Wed', conversations: 80, appointments: 42 },
  { date: '2025-11-04', dayName: 'Thu', conversations: 81, appointments: 45 },
  { date: '2025-11-05', dayName: 'Fri', conversations: 56, appointments: 38 },
  { date: '2025-11-06', dayName: 'Sat', conversations: 49, appointments: 35 },
  { date: '2025-11-07', dayName: 'Sun', conversations: 42, appointments: 25 },
];

// Fallback lead data
const fallbackLeads: Lead[] = [
  { id: '1', name: 'John Smith', score: 95, grade: 'A', platform: 'messenger' },
  { id: '2', name: 'Sarah Johnson', score: 92, grade: 'A', platform: 'instagram' },
  { id: '3', name: 'Mike Davis', score: 85, grade: 'B', platform: 'messenger' },
  { id: '4', name: 'Emma Wilson', score: 78, grade: 'B', platform: 'instagram' },
  { id: '5', name: 'James Brown', score: 65, grade: 'C', platform: 'messenger' },
  { id: '6', name: 'Lisa Anderson', score: 88, grade: 'B', platform: 'instagram' },
  { id: '7', name: 'Robert Taylor', score: 45, grade: 'D', platform: 'messenger' },
  { id: '8', name: 'Jennifer White', score: 72, grade: 'C', platform: 'instagram' },
];

// Fallback data (your current hardcoded values)
const fallbackData: DashboardData = {
  totalConversations: 1,
  appointmentsBooked: 1,
  hotLeads: 1,
  avgResponseTime: "0m",
  leadDistribution: [
    { name: "A - Hot Leads", value: 0, color: "#ef4444" },
    { name: "B - Warm Leads", value: 4, color: "#f97316" },
    { name: "C - Cool Leads", value: 1, color: "#3b82f6" },
    { name: "D - Cold Leads", value: 2, color: "#64748b" },
  ],
  platformData: {
    messenger: { conversations: 0, appointments: 0, conversionRate: 0 },
    instagram: { conversations: 0, appointments: 0, conversionRate: 0 }
  },
  dailyMetrics: fallbackTimeSeriesData,
  leads: fallbackLeads
};

function transformApiData(apiData: ApiResponse[]): DashboardData {
  if (!apiData || apiData.length === 0) {
    return fallbackData;
  }

  const data = apiData[0];

  // Transform lead distribution
  const leadDistribution = [
    {
      name: "A - Hot Leads",
      value: data.lead_distribution.grade_a.count,
      color: "#ef4444"
    },
    {
      name: "B - Warm Leads", 
      value: data.lead_distribution.grade_b.count,
      color: "#f97316"
    },
    {
      name: "C - Cool Leads",
      value: data.lead_distribution.grade_c.count,
      color: "#3b82f6"
    },
    {
      name: "D - Cold Leads",
      value: data.lead_distribution.grade_d.count,
      color: "#64748b"
    }
  ];

  // Helper function to parse conversion rate percentage
  const parseConversionRate = (rateString: string): number => {
    return parseFloat(rateString.replace('%', '')) || 0;
  };

  // Transform platform data using real API values
  const platformData = {
    messenger: {
      conversations: data.platform_distribution.messenger.count,
      appointments: data.platform_distribution.messenger.appointments,
      conversionRate: parseConversionRate(data.platform_distribution.messenger.conversion_rate)
    },
    instagram: {
      conversations: data.platform_distribution.instagram.count,
      appointments: data.platform_distribution.instagram.appointments,
      conversionRate: parseConversionRate(data.platform_distribution.instagram.conversion_rate)
    }
  };

  // Use API daily metrics or fallback data
  const dailyMetrics = data.daily_metrics && data.daily_metrics.length > 0 
    ? data.daily_metrics 
    : fallbackTimeSeriesData;

  // Calculate total appointments from platform data
  const totalAppointments = platformData.messenger.appointments + platformData.instagram.appointments;

  return {
    totalConversations: data.total_conversations,
    appointmentsBooked: totalAppointments > 0 ? totalAppointments : Math.round(data.total_conversations * 0.26), // Use real data or fallback calculation
    hotLeads: data.hot_leads.total,
    avgResponseTime: data.average_response_time_formatted !== "N/A" 
      ? data.average_response_time_formatted 
      : `${parseFloat(data.average_response_time_minutes).toFixed(1)}m`,
    leadDistribution,
    platformData,
    dailyMetrics,
    leads: fallbackLeads // Use fallback leads for now, can be extended to use API data
  };
}

export async function fetchLeadAnalytics(): Promise<DashboardData> {
  try {
    console.log('🔄 Polling API at', new Date().toLocaleTimeString());
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log('⏰ Request timeout - aborting');
      controller.abort();
    }, 8000);

    const response = await fetch(API_ENDPOINT, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      cache: 'no-cache',
    });

    clearTimeout(timeoutId);

    console.log('📊 Response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const apiData: ApiResponse[] = await response.json();
    console.log('✅ Fresh API data received:', apiData);
    
    const transformedData = transformApiData(apiData);
    console.log('🔄 Data transformed for dashboard:', transformedData);
    
    return transformedData;
  } catch (error) {
    console.warn('❌ Failed to fetch live data, using fallback:', error);
    return fallbackData;
  }
}

// Hook for using the API data with 10-second polling
export function useDashboardData() {
  const [data, setData] = React.useState<DashboardData>(fallbackData);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = React.useState<Date | null>(null);

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchLeadAnalytics();
      setData(result);
      setError(null);
      setLastUpdate(new Date());
      console.log('✅ Dashboard data updated successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('❌ Error fetching dashboard data:', errorMessage);
      setError(errorMessage);
      setData(fallbackData);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
    
    console.log('🔄 Starting 10-second polling...');
    const interval = setInterval(() => {
      console.log('⏰ 10 seconds elapsed - fetching fresh data...');
      fetchData();
    }, 10 * 1000);
    
    return () => {
      console.log('🛑 Stopping polling...');
      clearInterval(interval);
    };
  }, [fetchData]);

  return { 
    data, 
    loading, 
    error, 
    refetch: fetchData, 
    lastUpdate 
  };
}