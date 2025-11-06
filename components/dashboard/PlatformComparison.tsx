"use client";
import { Card } from "@/components/ui/card";
import { MessageCircle, Instagram } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface PlatformData {
  messenger?: {
    conversations: number;
    appointments: number;
  };
  instagram?: {
    conversations: number;
    appointments: number;
  };
}

interface PlatformComparisonProps {
  data?: PlatformData;
}

export function PlatformComparison({ data }: PlatformComparisonProps) {
  // Calculate conversion rates
  const messengerConversionRate = data?.messenger?.conversations 
    ? Math.round((data.messenger.appointments / data.messenger.conversations) * 100)
    : 0;
  
  const instagramConversionRate = data?.instagram?.conversations 
    ? Math.round((data.instagram.appointments / data.instagram.conversations) * 100)
    : 0;

  const platforms = [
    {
      name: "Meta Messenger",
      icon: MessageCircle,
      conversations: data?.messenger?.conversations || 0,
      appointments: data?.messenger?.appointments || 0,
      conversionRate: messengerConversionRate,
      color: "accent",
    },
    {
      name: "Instagram DM",
      icon: Instagram,
      conversations: data?.instagram?.conversations || 0,
      appointments: data?.instagram?.appointments || 0,
      conversionRate: instagramConversionRate,
      color: "warning",
    },
  ];

  return (
    <Card className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-6">Platform Performance</h3>
      <div className="space-y-6">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          return (
            <div key={platform.name} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-${platform.color}/10`}>
                    <Icon className={`h-5 w-5 text-${platform.color}`} />
                  </div>
                  <div>
                    <p className="font-medium">{platform.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {platform.conversations} conversations
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{platform.appointments}</p>
                  <p className="text-xs text-muted-foreground">appointments</p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Conversion Rate</span>
                  <span className="font-medium">{platform.conversionRate}%</span>
                </div>
                <Progress value={platform.conversionRate} className="h-2" />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}