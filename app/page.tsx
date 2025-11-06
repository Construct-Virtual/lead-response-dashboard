"use client";

import { DashboardHeader } from "@/components/dashboard/Header";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ConversationTimeline } from "@/components/dashboard/ConversationTimeline";
import { LeadQualityChart } from "@/components/dashboard/LeadQualityChart";
import { PlatformComparison } from "@/components/dashboard/PlatformComparison";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { MessageCircle, Calendar, Star, Clock, RefreshCw, AlertCircle } from "lucide-react";
import { useDashboardData } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Home() {
  const { data, loading, error, refetch, lastUpdate } = useDashboardData();

  // Calculate percentage changes (you can implement proper historical comparison later)
  const getChangePercentage = (current: number, previous: number = current * 0.9) => {
    return ((current - previous) / previous * 100);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <DashboardHeader />
          <div className="flex items-center gap-2">
            {error && (
              <Alert className="w-auto">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Using offline data - API unavailable
                </AlertDescription>
              </Alert>
            )}
            {lastUpdate && (
              <span className="text-xs text-muted-foreground">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </span>
            )}
            <Button
              onClick={refetch}
              disabled={loading}
              variant="outline"
              size="sm"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Loading...' : 'Refresh'}
            </Button>
          </div>
        </div>
        
        {/* Hero Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            title="Total Conversations"
            value={data.totalConversations}
            change={getChangePercentage(data.totalConversations)}
            icon={<MessageCircle className="h-6 w-6" />}
            variant="accent"
          />
          <MetricCard
            title="Appointments Booked"
            value={data.appointmentsBooked}
            change={getChangePercentage(data.appointmentsBooked)}
            icon={<Calendar className="h-6 w-6" />}
            variant="success"
          />
          <MetricCard
            title="Hot Leads (A-Grade)"
            value={data.hotLeads}
            change={getChangePercentage(data.hotLeads)}
            icon={<Star className="h-6 w-6" />}
            variant="danger"
          />
          <MetricCard
            title="Avg Response Time"
            value={data.avgResponseTime}
            change={-5.1}
            icon={<Clock className="h-6 w-6" />}
            variant="warning"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ConversationTimeline data={data.dailyMetrics} />
          <LeadQualityChart data={data.leadDistribution} />
        </div>

        {/* Platform & Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PlatformComparison data={data.platformData} />
          {/* <RecentActivity /> */}
        </div>
      </div>
    </div>
  );
}