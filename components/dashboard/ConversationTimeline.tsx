"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DailyMetric } from '@/lib/types';

interface ConversationTimelineProps {
  data?: DailyMetric[];
}

const defaultData: DailyMetric[] = [
  { date: '2025-11-01', dayName: 'Mon', conversations: 65, appointments: 28 },
  { date: '2025-11-02', dayName: 'Tue', conversations: 59, appointments: 31 },
  { date: '2025-11-03', dayName: 'Wed', conversations: 80, appointments: 42 },
  { date: '2025-11-04', dayName: 'Thu', conversations: 81, appointments: 45 },
  { date: '2025-11-05', dayName: 'Fri', conversations: 56, appointments: 38 },
  { date: '2025-11-06', dayName: 'Sat', conversations: 49, appointments: 35 },
  { date: '2025-11-07', dayName: 'Sun', conversations: 42, appointments: 25 },
];

export function ConversationTimeline({ data = defaultData }: ConversationTimelineProps) {
  return (
    <Card className="glass-card p-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Conversation Flow (Last 7 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorConversations" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="dayName" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
                color: "hsl(var(--card-foreground))",
              }}
              labelFormatter={(value, payload) => {
                if (payload && payload[0]) {
                  const dataPoint = payload[0].payload;
                  return `${dataPoint.dayName}, ${dataPoint.date}`;
                }
                return value;
              }}
            />
            <Area
              type="monotone"
              dataKey="conversations"
              stackId="1"
              stroke="#3b82f6"
              fill="url(#colorConversations)"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="appointments"
              stackId="1"
              stroke="#10b981"
              fill="url(#colorAppointments)"
              fillOpacity={0.6}
            />
            <Legend 
              wrapperStyle={{
                color: "hsl(var(--foreground))"
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

