import {
  BarChart3,
  GraduationCap,
  TrendingUp,
  Users,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatCard } from "@/components/ui/StatCard";
import { analytics } from "@/lib/data";

function BarChart({
  data,
  labelKey,
  valueKey,
  color = "bg-indigo-500",
}: {
  data: Record<string, string | number>[];
  labelKey: string;
  valueKey: string;
  color?: string;
}) {
  const max = Math.max(...data.map((d) => Number(d[valueKey])));

  return (
    <div className="space-y-3">
      {data.map((item) => {
        const value = Number(item[valueKey]);
        const pct = max > 0 ? (value / max) * 100 : 0;
        return (
          <div key={String(item[labelKey])}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700">{String(item[labelKey])}</span>
              <span className="text-slate-500">{value.toLocaleString()}</span>
            </div>
            <ProgressBar value={pct} color={color} />
          </div>
        );
      })}
    </div>
  );
}

function DualLineChart({
  data,
}: {
  data: { month: string; students: number; faculty: number }[];
}) {
  const maxStudents = Math.max(...data.map((d) => d.students));
  const maxFaculty = Math.max(...data.map((d) => d.faculty));

  return (
    <div className="flex h-48 items-end justify-between gap-2">
      {data.map((item) => (
        <div key={item.month} className="flex flex-1 flex-col items-center gap-1">
          <div className="flex w-full items-end justify-center gap-1" style={{ height: "160px" }}>
            <div
              className="w-3 rounded-t bg-indigo-500 sm:w-4"
              style={{ height: `${(item.students / maxStudents) * 100}%` }}
              title={`Students: ${item.students}`}
            />
            <div
              className="w-3 rounded-t bg-violet-400 sm:w-4"
              style={{ height: `${(item.faculty / maxFaculty) * 100}%` }}
              title={`Faculty: ${item.faculty}`}
            />
          </div>
          <span className="text-[10px] font-medium text-slate-500 sm:text-xs">
            {item.month}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const latestEnrollment = analytics.enrollmentTrend.at(-1);
  const latestPlacement = analytics.placementStats.at(-1);
  const placementRate = latestPlacement
    ? Math.round((latestPlacement.placed / latestPlacement.total) * 100)
    : 0;

  return (
    <div>
      <PageHeader
        title="Analytics Dashboard"
        description="Campus-wide insights, trends, and performance metrics."
        actions={
          <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100">
            <option>Last 6 months</option>
            <option>Last year</option>
            <option>All time</option>
          </select>
        }
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Enrollment"
          value={latestEnrollment?.students.toLocaleString() ?? "—"}
          change="+1.6% growth"
          trend="up"
          icon={GraduationCap}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
        />
        <StatCard
          title="Faculty Count"
          value={latestEnrollment?.faculty ?? "—"}
          change="+5 this semester"
          trend="up"
          icon={Users}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Placement Rate"
          value={`${placementRate}%`}
          change="2026 batch"
          trend="up"
          icon={TrendingUp}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <StatCard
          title="Avg. Attendance"
          value="90%"
          change="+2% vs last year"
          trend="up"
          icon={BarChart3}
          iconColor="text-violet-600"
          iconBg="bg-violet-50"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Enrollment Trend</h3>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-indigo-500" />
                Students
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-violet-400" />
                Faculty
              </span>
            </div>
          </div>
          <DualLineChart data={analytics.enrollmentTrend} />
        </Card>

        <Card>
          <h3 className="mb-6 text-lg font-semibold text-slate-900">
            Attendance by Department
          </h3>
          <BarChart
            data={analytics.attendanceOverview}
            labelKey="department"
            valueKey="rate"
            color="bg-emerald-500"
          />
        </Card>

        <Card>
          <h3 className="mb-6 text-lg font-semibold text-slate-900">
            Placement Statistics
          </h3>
          <div className="space-y-4">
            {analytics.placementStats.map((stat) => {
              const rate = Math.round((stat.placed / stat.total) * 100);
              return (
                <div key={stat.year}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{stat.year}</span>
                    <span className="text-slate-500">
                      {stat.placed}/{stat.total} ({rate}%)
                    </span>
                  </div>
                  <ProgressBar value={rate} color="bg-indigo-500" />
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <h3 className="mb-6 text-lg font-semibold text-slate-900">
            Event Participation
          </h3>
          <BarChart
            data={analytics.eventParticipation}
            labelKey="event"
            valueKey="participants"
            color="bg-violet-500"
          />
        </Card>
      </div>

      <Card className="mt-6">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Key Insights</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Peak Enrollment",
              value: "June 2026",
              detail: "4,520 students registered",
            },
            {
              title: "Top Department",
              value: "Mathematics",
              detail: "94% average attendance",
            },
            {
              title: "Best Placement Year",
              value: "2025",
              detail: "89.5% placement rate",
            },
            {
              title: "Most Popular Event",
              value: "Sports Day",
              detail: "680 participants",
            },
          ].map((insight) => (
            <div
              key={insight.title}
              className="rounded-lg border border-slate-100 bg-slate-50/50 p-4"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                {insight.title}
              </p>
              <p className="mt-1 text-lg font-bold text-slate-900">{insight.value}</p>
              <p className="mt-1 text-xs text-slate-500">{insight.detail}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
