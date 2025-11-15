export interface DailyMetric {
  date: string;
  dayName: string;
  conversations: number;
  appointments: number;
}

export interface Lead {
  id: string;
  name: string;
  score: number;
  grade: 'A' | 'B' | 'C' | 'D';
  platform: 'messenger' | 'instagram';
}


export interface ApiResponse {
  total_conversations: number;
  appointments_booked: number;
  hot_leads: {
    total: number;
    percentage: string;
  };
  platform_distribution: {
    instagram: {
      count: number;
      percentage: string;
      appointments: number;
      conversion_rate: string;
    };
    messenger: {
      count: number;
      percentage: string;
      appointments: number;
      conversion_rate: string;
    };
    other?: {
      count: number;
      percentage: string;
      appointments?: number;
      conversion_rate?: string;
    };
  };
  lead_distribution: {
    grade_a: {
      count: number;
      percentage: string;
      range: string;
    };
    grade_b: {
      count: number;
      percentage: string;
      range: string;
    };
    grade_c: {
      count: number;
      percentage: string;
      range: string;
    };
    grade_d: {
      count: number;
      percentage: string;
      range: string;
    };
  };
  average_response_time_minutes: string;
  average_response_time_formatted: string;
  response_time_data_points: number;
  timestamp: string;
  daily_metrics: DailyMetric[];
}

export interface DashboardData {
  totalConversations: number;
  appointmentsBooked: number;
  hotLeads: number;
  avgResponseTime: string;
  leadDistribution: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  platformData: {
    messenger?: {
      conversations: number;
      appointments: number;
      conversionRate: number;
    };
    instagram?: {
      conversations: number;
      appointments: number;
      conversionRate: number;
    };
  };
  dailyMetrics: DailyMetric[];
  leads: Lead[];
}