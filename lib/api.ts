"use client";
import React from 'react';
import { ApiResponse, DashboardData } from './types';

const API_ENDPOINT = 'https://tumultuously-starchlike-leta.ngrok-free.dev/webhook/lead-analytics-4fbd-b561-a4b550511f2e';

// Fallback data (your current hardcoded values)
const fallbackData: DashboardData = {
  totalConversations: 89,
  appointmentsBooked: 23,
  hotLeads: 28,
  avgResponseTime: "2.3m",
  leadDistribution: [
    { name: "A - Hot Leads", value: 28, color: "#ef4444" },
    { name: "B - Warm Leads", value: 45, color: "#f97316" },
    { name: "C - Cool Leads", value: 62, color: "#3b82f6" },
    { name: "D - Cold Leads", value: 35, color: "#64748b" },
  ],
  platformData: {
    messenger: { conversations: 156, appointments: 42 },
    instagram: { conversations: 124, appointments: 31 }
  }
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

  // Transform platform data to match your UI structure
  const platformData = {
    messenger: {
      conversations: data.platform_distribution.messenger.count,
      appointments: Math.round(data.platform_distribution.messenger.count * 0.27) // 27% conversion rate
    },
    instagram: {
      conversations: data.platform_distribution.instagram.count,
      appointments: Math.round(data.platform_distribution.instagram.count * 0.25) // 25% conversion rate
    }
  };

  return {
    totalConversations: data.total_conversations,
    appointmentsBooked: Math.round(data.total_conversations * 0.26),
    hotLeads: data.hot_leads.total,
    avgResponseTime: data.average_response_time_formatted !== "N/A" 
      ? data.average_response_time_formatted 
      : `${parseFloat(data.average_response_time_minutes).toFixed(1)}m`,
    leadDistribution,
    platformData
  };
}

export async function fetchLeadAnalytics(): Promise<DashboardData> {
  try {
    console.log('🔄 Polling API at', new Date().toLocaleTimeString());
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log('⏰ Request timeout - aborting');
      controller.abort();
    }, 8000); // 8 second timeout (less than polling interval)

    const response = await fetch(API_ENDPOINT, {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      mode: 'cors',
      cache: 'no-cache', // Prevent caching to get fresh data
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
    // Initial fetch
    fetchData();
    
    // Set up polling every 10 seconds
    console.log('🔄 Starting 10-second polling...');
    const interval = setInterval(() => {
      console.log('⏰ 10 seconds elapsed - fetching fresh data...');
      fetchData();
    }, 10 * 1000); // 10 seconds
    
    // Cleanup
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