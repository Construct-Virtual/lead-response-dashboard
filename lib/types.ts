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
    };
    messenger: {
      count: number;
      percentage: string;
    };
    other: {
      count: number;
      percentage: string;
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
    };
    instagram?: {
      conversations: number;
      appointments: number;
    };
  };
}