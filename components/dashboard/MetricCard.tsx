import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  variant?: "success" | "accent" | "warning" | "danger";
}

export function MetricCard({ title, value, change, icon, variant = "accent" }: MetricCardProps) {
  const isPositive = change !== undefined && change >= 0;
  
  const variantClasses = {
    success: "gradient-success",
    accent: "gradient-accent",
    warning: "gradient-warning",
    danger: "gradient-danger",
  };

  return (
    <Card className="glass-card overflow-hidden group hover:border-primary/50 transition-all duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            "p-3 rounded-xl transition-transform duration-300 group-hover:scale-110",
            variantClasses[variant]
          )}>
            {icon}
          </div>
          {/* {change !== undefined && (
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              isPositive ? "text-success" : "text-danger"
            )}>
              {isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>{Math.abs(change)}%</span>
            </div>
          )} */}
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold metric-glow">{value}</p>
        </div>
      </div>
    </Card>
  );
}
