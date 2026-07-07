"use client";

import { useEffect, useState } from "react";
import { Briefcase, Building2, DollarSign, MapPin } from "lucide-react";
import { PlacementAnalyticsCharts } from "@/components/placements/PlacementAnalyticsCharts";
import { Badge, getStatusBadgeVariant } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { placements } from "@/lib/data";
import type { Placement } from "@/types";

export default function PlacementsPage() {
  const [placementsData, setPlacementsData] = useState(placements);

const [showForm, setShowForm] = useState(false);

const [company, setCompany] = useState("");
const [role, setRole] = useState("");
const [packageValue, setPackageValue] = useState("");
const [location, setLocation] = useState("");
const [deadline, setDeadline] = useState("");
const [eligibility, setEligibility] = useState("");

const [search, setSearch] = useState("");

useEffect(() => {
  const saved = localStorage.getItem("placements");

  if (saved) {
    setPlacementsData(JSON.parse(saved));
  }
}, []);

const open = placementsData.filter(
  (p) => p.status === "open"
).length;

const closed = placementsData.filter(
  (p) => p.status === "closed"
).length;

const upcoming = placementsData.filter(
  (p) => p.status === "upcoming"
).length;

const totalApplicants = placementsData.reduce(
  (sum, p) => sum + p.applicants,
  0
);
const filteredPlacements = placementsData.filter((p) =>
  p.company.toLowerCase().includes(search.toLowerCase())
);

const handleCreatePlacement = () => {
  const newPlacement = {
    id: `PL${Date.now()}`,
    company,
    role,
    package: packageValue,
    location,
    deadline,
    eligibility,
    applicants: 0,
    status: "open",
  };

  const updated = [...placementsData, newPlacement];

  setPlacementsData(updated);

  localStorage.setItem(
    "placements",
    JSON.stringify(updated)
  );

  setCompany("");
  setRole("");
  setPackageValue("");
  setLocation("");
  setDeadline("");
  setEligibility("");

  setShowForm(false);
};

const deletePlacement = (id: string) => {
  const updated = placementsData.filter(
    (p) => p.id !== id
  );

  setPlacementsData(updated);

  localStorage.setItem(
    "placements",
    JSON.stringify(updated)
  );
};

  const columns = [
    { key: "company", header: "Company" },
    { key: "role", header: "Role" },
    { key: "package", header: "Package" },
    { key: "location", header: "Location" },
    { key: "deadline", header: "Deadline" },
    { key: "applicants", header: "Applicants" },
    {
      key: "status",
      header: "Status",
      render: (item: Placement) => (
        <Badge variant={getStatusBadgeVariant(item.status)}>{item.status}</Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (item: Placement) =>
        item.status === "open" ? (
          <button
            type="button"
            className="rounded-md bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700 hover:bg-teal-100 dark:bg-teal-950/50 dark:text-teal-400 dark:hover:bg-teal-950"
          >
            Apply
          </button>
        ) : (
          <span className="text-xs text-slate-400">—</span>
        ),
    },
  ];

  return (
    <div>
      <PageHeader
  title="Placement Portal"
  description="Browse job opportunities and track placement drives."
  actions={
    <button
      onClick={() => setShowForm(true)}
      className="rounded-lg bg-teal-600 px-4 py-2 text-white"
    >
      Create Placement
    </button>
  }
/>
{showForm && (
<Card className="mb-6 p-5">

<h2 className="mb-4 text-lg font-semibold">
Create Placement
</h2>

<input
value={company}
onChange={(e)=>setCompany(e.target.value)}
placeholder="Company"
className="mb-2 w-full rounded border p-2"
/>

<input
value={role}
onChange={(e)=>setRole(e.target.value)}
placeholder="Role"
className="mb-2 w-full rounded border p-2"
/>

<input
value={packageValue}
onChange={(e)=>setPackageValue(e.target.value)}
placeholder="Package"
className="mb-2 w-full rounded border p-2"
/>

<input
value={location}
onChange={(e)=>setLocation(e.target.value)}
placeholder="Location"
className="mb-2 w-full rounded border p-2"
/>

<input
type="date"
value={deadline}
onChange={(e)=>setDeadline(e.target.value)}
className="mb-2 w-full rounded border p-2"
/>

<input
value={eligibility}
onChange={(e)=>setEligibility(e.target.value)}
placeholder="Eligibility"
className="mb-4 w-full rounded border p-2"
/>

<div className="flex gap-3">

<button
onClick={handleCreatePlacement}
className="rounded bg-green-600 px-4 py-2 text-white"
>
Save
</button>

<button
onClick={()=>setShowForm(false)}
className="rounded bg-gray-600 px-4 py-2 text-white"
>
Cancel
</button>

</div>

</Card>
)}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Open Positions"
          value={open}
          icon={Briefcase}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <StatCard
          title="Upcoming Drives"
          value={upcoming}
          icon={Building2}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Closed"
          value={closed}
          icon={Briefcase}
          iconColor="text-slate-600"
          iconBg="bg-slate-100"
        />
        <StatCard
          title="Total Applicants"
          value={totalApplicants}
          icon={DollarSign}
          iconColor="text-violet-600"
          iconBg="bg-violet-50"
        />
      </div>
      <input
type="text"
placeholder="Search Company..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="mb-5 w-full rounded-lg border p-2"
/>
      <h3 className="mb-4 text-lg font-semibold text-foreground">Placement Analytics</h3>
      <PlacementAnalyticsCharts />

      <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {filteredPlacements
          .filter((p) => p.status === "open")
          .map((placement) => (
            <Card key={placement.id} hover>
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 text-lg font-bold text-white">
                  {placement.company.charAt(0)}
                </div>
                <Badge variant="success">open</Badge>
              </div>
              <h3 className="text-lg font-semibold text-foreground">{placement.company}</h3>
              <p className="text-sm text-teal-600 dark:text-teal-400">{placement.role}</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted">
                  <DollarSign className="h-4 w-4 text-muted/60" />
                  {placement.package}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <MapPin className="h-4 w-4 text-muted/60" />
                  {placement.location}
                </div>
              </div>
              <p className="mt-3 text-xs text-muted">{placement.eligibility}</p>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="text-xs text-muted/70">Deadline: {placement.deadline}</span>
                <span className="text-xs font-medium text-muted">
                  {placement.applicants} applied
                </span>
              </div>
              <button
                type="button"
                className="mt-3 w-full rounded-lg bg-teal-600 py-2 text-sm font-medium text-white hover:bg-teal-700"
              >
                Apply Now
              </button>
            </Card>
          ))}
      </div>

      <h3 className="mb-4 text-lg font-semibold text-foreground">All Placement Drives</h3>
      <DataTable
        columns={columns}
      data={filteredPlacements}
        keyExtractor={(item) => item.id}
      />
    </div>
  );
}
