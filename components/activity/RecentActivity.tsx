import Link from "next/link";
import {
  Award,
  Briefcase,
  Calendar,
  ClipboardCheck,
  FileText,
  UserMinus,
} from "lucide-react";
import { recentActivity } from "@/lib/data";
import type { RecentActivity as ActivityItem } from "@/types";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const iconMap = {
  attendance: ClipboardCheck,
  assignment: FileText,
  event: Calendar,
  placement: Briefcase,
  leave: UserMinus,
  grade: Award,
};

const iconColors = {
  attendance: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
  assignment: "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
  event: "bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400",
  placement: "bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400",
  leave: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  grade: "bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400",
};

interface RecentActivityProps {
  limit?: number;
  showViewAll?: boolean;
}

export function RecentActivity({ limit, showViewAll = true }: RecentActivityProps) {
  const items = limit ? recentActivity.slice(0, limit) : recentActivity;

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        {showViewAll && (
          <Link
            href="/profile"
            className="text-xs font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400"
          >
            View all
          </Link>
        )}
      </div>
      <div className="relative space-y-0">
        {items.map((item, index) => (
          <ActivityRow key={item.id} item={item} isLast={index === items.length - 1} />
        ))}
      </div>
    </Card>
  );
}

function ActivityRow({ item, isLast }: { item: ActivityItem; isLast: boolean }) {
  const Icon = iconMap[item.icon];
  const colorClass = iconColors[item.icon];

  return (
    <div className="relative flex gap-4 pb-6 last:pb-0">
      {!isLast && (
        <span className="absolute left-5 top-10 h-[calc(100%-1.5rem)] w-px bg-border" />
      )}
      <div
        className={cn(
          "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
          colorClass
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1 pt-1">
        <p className="text-sm font-medium text-foreground">{item.action}</p>
        <p className="mt-0.5 text-sm text-muted">{item.detail}</p>
        <p className="mt-1 text-xs text-muted/70">{item.time}</p>
      </div>
    </div>
  );
}
