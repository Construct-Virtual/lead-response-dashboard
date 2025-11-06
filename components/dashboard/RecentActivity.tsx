import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Instagram, Calendar, Star } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "appointment",
    platform: "messenger",
    message: "New appointment booked with John Smith",
    time: "2 minutes ago",
    grade: "A",
  },
  {
    id: 2,
    type: "hot-lead",
    platform: "instagram",
    message: "Hot lead identified: Sarah Johnson",
    time: "15 minutes ago",
    grade: "A",
  },
  {
    id: 3,
    type: "conversation",
    platform: "messenger",
    message: "Conversation started with Mike Davis",
    time: "32 minutes ago",
    grade: "B",
  },
  {
    id: 4,
    type: "appointment",
    platform: "instagram",
    message: "Follow-up scheduled with Emma Wilson",
    time: "1 hour ago",
    grade: "B",
  },
  {
    id: 5,
    type: "conversation",
    platform: "messenger",
    message: "New inquiry from James Brown",
    time: "2 hours ago",
    grade: "C",
  },
];

const gradeColors = {
  A: "danger",
  B: "warning",
  C: "accent",
  D: "muted",
};

export function RecentActivity() {
  return (
    <Card className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <Badge variant="outline" className="text-xs">Live</Badge>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <div className="p-2 rounded-lg bg-background/50">
              {activity.type === "appointment" ? (
                <Calendar className="h-4 w-4 text-success" />
              ) : activity.type === "hot-lead" ? (
                <Star className="h-4 w-4 text-danger" />
              ) : activity.platform === "messenger" ? (
                <MessageCircle className="h-4 w-4 text-accent" />
              ) : (
                <Instagram className="h-4 w-4 text-warning" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{activity.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
            <Badge 
              variant="outline" 
              className={`text-xs bg-${gradeColors[activity.grade as keyof typeof gradeColors]}/10`}
            >
              Grade {activity.grade}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
