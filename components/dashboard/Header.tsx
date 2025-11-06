import { Button } from "@/components/ui/button";
import { Calendar, Download, RefreshCw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          CEO Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Real-time insights into your lead generation performance
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Select defaultValue="today">
          <SelectTrigger className="w-[180px] glass-card">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" className="glass-card">
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="glass-card gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
}
