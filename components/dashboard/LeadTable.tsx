"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MessageCircle, Instagram } from "lucide-react";
import { Lead } from "@/lib/types";

interface LeadTableProps {
  leads: Lead[];
}

const gradeColors = {
  A: "bg-red-500/10 text-red-500 border-red-500/20",
  B: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  C: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  D: "bg-slate-500/10 text-slate-500 border-slate-500/20",
};

const platformIcons = {
  messenger: MessageCircle,
  instagram: Instagram,
};

export function LeadTable({ leads }: LeadTableProps) {
  return (
    <Card className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Lead Overview</h3>
        <Badge variant="outline" className="text-xs">
          {leads.length} Leads
        </Badge>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lead Name</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Platform</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">
                  No leads found
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead) => {
                const PlatformIcon = platformIcons[lead.platform];
                return (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{lead.score}</span>
                        <Badge
                          variant="outline"
                          className={`text-xs ${gradeColors[lead.grade]}`}
                        >
                          Grade {lead.grade}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <PlatformIcon className="h-4 w-4" />
                        <span className="capitalize">{lead.platform}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
