"use client";

import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { placementAnalytics } from "@/lib/data";

const statusColors: Record<string, string> = {
  Open: "bg-emerald-500",
  Closed: "bg-slate-400 dark:bg-slate-600",
  Upcoming: "bg-teal-500",
};

export function PlacementAnalyticsCharts() {
  const { applicantsByCompany, statusDistribution, monthlyApplications, packageRanges } =
    placementAnalytics;

  const maxApplicants = Math.max(...applicantsByCompany.map((d) => d.applicants));
  const maxMonthly = Math.max(
    ...monthlyApplications.map((d) => Math.max(d.applications, d.offers))
  );
  const totalStatus = statusDistribution.reduce((s, d) => s + d.count, 0);

  return (
    <div className="mb-8 grid gap-6 lg:grid-cols-2">
      <Card>
        <h3 className="mb-6 text-lg font-semibold text-foreground">
          Applicants by Company
        </h3>
        <div className="space-y-4">
          {applicantsByCompany.map((item) => (
            <div key={item.company}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-medium text-foreground">{item.company}</span>
                <span className="text-muted">{item.applicants}</span>
              </div>
              <ProgressBar
                value={(item.applicants / maxApplicants) * 100}
                color="bg-teal-600"
              />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="mb-6 text-lg font-semibold text-foreground">
          Drive Status Distribution
        </h3>
        <div className="mb-6 flex h-4 overflow-hidden rounded-full">
          {statusDistribution.map((item) => (
            <div
              key={item.status}
              className={statusColors[item.status] ?? "bg-slate-400"}
              style={{ width: `${(item.count / totalStatus) * 100}%` }}
              title={`${item.status}: ${item.count}`}
            />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {statusDistribution.map((item) => (
            <div
              key={item.status}
              className="rounded-lg border border-border bg-slate-50/50 p-3 text-center dark:bg-slate-800/50"
            >
              <div
                className={`mx-auto mb-2 h-3 w-3 rounded-full ${statusColors[item.status]}`}
              />
              <p className="text-2xl font-bold text-foreground">{item.count}</p>
              <p className="text-xs text-muted">{item.status}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="mb-6 text-lg font-semibold text-foreground">
          Monthly Applications vs Offers
        </h3>
        <div className="mb-4 flex gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-teal-600" />
            Applications
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-amber-500" />
            Offers
          </span>
        </div>
        <div className="flex h-48 items-end justify-between gap-2">
          {monthlyApplications.map((item) => (
            <div key={item.month} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="flex w-full items-end justify-center gap-0.5"
                style={{ height: "160px" }}
              >
                <div
                  className="w-3 rounded-t bg-teal-600 sm:w-4"
                  style={{
                    height: `${(item.applications / maxMonthly) * 100}%`,
                  }}
                  title={`Applications: ${item.applications}`}
                />
                <div
                  className="w-3 rounded-t bg-amber-500 sm:w-4"
                  style={{ height: `${(item.offers / maxMonthly) * 100}%` }}
                  title={`Offers: ${item.offers}`}
                />
              </div>
              <span className="text-[10px] font-medium text-muted sm:text-xs">
                {item.month}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="mb-6 text-lg font-semibold text-foreground">
          Package Distribution (LPA)
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {packageRanges.map((item) => {
            const maxPkg = Math.max(...packageRanges.map((p) => p.count));
            return (
              <div
                key={item.range}
                className="rounded-xl border border-border p-4"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-muted">
                  {item.range}
                </p>
                <p className="mt-2 text-2xl font-bold text-foreground">{item.count}</p>
                <ProgressBar
                  value={(item.count / maxPkg) * 100}
                  color="bg-teal-600"
                  className="mt-3"
                />
                <p className="mt-1 text-xs text-muted">students placed</p>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
