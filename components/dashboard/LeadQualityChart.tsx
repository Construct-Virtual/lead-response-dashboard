"use client";
import { Card } from "@/components/ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface LeadQualityChartProps {
  data?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

const defaultData = [
  { name: "A - Hot Leads", value: 28, color: "#ef4444" },
  { name: "B - Warm Leads", value: 45, color: "#f97316" },
  { name: "C - Cool Leads", value: 62, color: "#3b82f6" },
  { name: "D - Cold Leads", value: 35, color: "#64748b" },
];

export function LeadQualityChart({ data = defaultData }: LeadQualityChartProps) {
  return (
    <Card className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-6">Lead Quality Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
              color: "hsl(var(--card-foreground))",
            }}
          />
          <Legend 
            wrapperStyle={{
              color: "hsl(var(--foreground))"
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}

