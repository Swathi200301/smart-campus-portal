"use client";
import { useEffect, useState } from "react";
import { CalendarDays, CheckCircle, Clock, XCircle } from "lucide-react";
import { Badge, getStatusBadgeVariant } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { leaves } from "@/lib/data";
import type { LeaveRequest } from "@/types";

export default function LeavePage() {
  const [leaveData, setLeaveData] =
  useState<LeaveRequest[]>(leaves);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [reason, setReason] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
useEffect(() => {
  const saved = localStorage.getItem("leaves");

  if (saved) {
    setLeaveData(
      JSON.parse(saved) as LeaveRequest[]
    );
  }
}, []);
const updateStatus = (
  id: string,
  status: "approved" | "rejected"
) => {
  console.log("Clicked:", id, status);

  const updated: LeaveRequest[] = leaveData.map((leave) =>
    leave.id === id ? { ...leave, status } : leave
  );

  setLeaveData(updated);
  localStorage.setItem("leaves", JSON.stringify(updated));
};
const handleSubmit = () => {
  const newLeave: LeaveRequest = {
    id: `LV${Date.now()}`,
    applicantName: name,
    role: "student",
    type: type,
    reason: reason,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    status: "pending",
  };

  const updated: LeaveRequest[] = [
    ...leaveData,
    newLeave,
  ];

  setLeaveData(updated);
  localStorage.setItem("leaves", JSON.stringify(updated));
  

  setName("");
  setType("");
  setReason("");
  setShowForm(false);
};
const pending = leaveData.filter(
  (l) => l.status === "pending"
).length;

const approved = leaveData.filter(
  (l) => l.status === "approved"
).length;

const rejected = leaveData.filter(
  (l) => l.status === "rejected"
).length;
const filteredLeaves: LeaveRequest[] =
  leaveData.filter(
  (leave) =>
    leave.applicantName
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    leave.type
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    leave.status
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
);
const columns: any[] = [
    { key: "id", header: "Request ID" },
    { key: "applicantName", header: "Applicant" },
    {
      key: "role",
      header: "Role",
      render: (item: LeaveRequest) => (
        <Badge variant="info">
          {item.role}
        </Badge>
      ),
    },
    { key: "type", header: "Leave Type" },
    { key: "startDate", header: "Start Date" },
    { key: "endDate", header: "End Date" },
    {
      
        key: "status",
        header: "Status",
        render: (item: LeaveRequest) => (
          <Badge variant={getStatusBadgeVariant(item.status)}>
            {item.status}
          </Badge>
        ),
      },
    {
      key: "actions",
      header: "Actions",
      render: (item: LeaveRequest) =>
        item.status === "pending" ? (
          <div className="flex gap-2">
            <button
  type="button"
  onClick={() => updateStatus(item.id, "approved")}
  className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-100"
>
  Approve
</button>
<button
  type="button"
  onClick={() => updateStatus(item.id, "rejected")}
  className="rounded-md bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700 hover:bg-red-100"
>
  Reject
</button>
          </div>
        ) : (
          <span className="text-xs text-slate-400">—</span>
        ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Leave Management"
        description="Review and manage leave requests from students and faculty."
        actions={
          <button
  onClick={() => setShowForm(true)}
  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
>
  Apply for Leave
</button>
        }
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Requests"
          value={leaveData.length}
          icon={CalendarDays}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
        />
        <StatCard
          title="Pending"
          value={pending}
          icon={Clock}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
        />
        <StatCard
          title="Approved"
          value={approved}
          icon={CheckCircle}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <StatCard
          title="Rejected"
          value={rejected}
          icon={XCircle}
          iconColor="text-red-600"
          iconBg="bg-red-50"
        />
      </div>

      <div className="mb-6 grid gap-6 lg:grid-cols-3">
      {leaveData
  .filter((l) => l.status === "pending")
          .slice(0, 3)
          .map((leave) => (
            <Card key={leave.id} hover>
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <p className="font-medium text-slate-900">{leave.applicantName}</p>
                  <p className="text-xs text-slate-500">{leave.type}</p>
                </div>
                <Badge variant="warning">pending</Badge>
              </div>
              <p className="mb-3 text-sm text-slate-600">{leave.reason}</p>
              <p className="text-xs text-slate-400">
                {leave.startDate} → {leave.endDate}
              </p>
              <div className="mt-4 flex gap-2">
              <button
  type="button"
  onClick={() => updateStatus(leave.id, "approved")}
  className="flex-1 rounded-lg bg-emerald-600 py-2 text-xs font-medium text-white hover:bg-emerald-700"
>
  Approve
</button>
<button
  type="button"
  onClick={() => updateStatus(leave.id, "rejected")}
  className="flex-1 rounded-lg border border-slate-200 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
>
  Reject
</button>
              </div>
            </Card>
          ))}
      </div>
      {showForm && (
  <Card className="mb-6 p-6">
    <h2 className="mb-4 text-xl font-semibold">
      New Leave Request
    </h2>

    <input
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="Applicant Name"
  className="mb-2 w-full border p-2 rounded"
/>

<input
  value={type}
  onChange={(e) => setType(e.target.value)}
  placeholder="Leave Type"
  className="mb-2 w-full border p-2 rounded"
/>

<textarea
  value={reason}
  onChange={(e) => setReason(e.target.value)}
  placeholder="Reason"
  className="mb-2 w-full border p-2 rounded"
/>

<button
  onClick={handleSubmit}
  className="bg-green-600 text-white px-4 py-2 rounded"
>
  Submit
</button>
  </Card>
)}
<input
  type="text"
  placeholder="Search by name, type or status..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="mb-4 w-full rounded-lg border border-slate-300 p-2"
/>
      <h3 className="mb-4 text-lg font-semibold text-slate-900">All Leave Requests</h3>
      <DataTable
  columns={columns}
  data={filteredLeaves}
  keyExtractor={(item) => item.id}
/>
    </div>
  );
}
