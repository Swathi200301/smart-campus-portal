"use client";

import { useEffect, useState } from "react";

import {
  Briefcase,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  Users,
} from "lucide-react";
import { Badge, getStatusBadgeVariant } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { dashboardStats, leaves, placements } from "@/lib/data";
import type { LeaveRequest, Placement } from "@/types";

export default function AdminDashboard() {
  const stats = dashboardStats.admin;
  const [studentCount, setStudentCount] = useState(0);
  const [facultyCount, setFacultyCount] = useState(0);
  const [pendingLeaves, setPendingLeaves] = useState(0);
  const leaveColumns = [
    { key: "applicantName", header: "Name" },
    { key: "role", header: "Role" },
    { key: "type", header: "Leave Type" },
    {
      key: "status",
      header: "Status",
      render: (item: LeaveRequest) => (
        <Badge variant={getStatusBadgeVariant(item.status)}>{item.status}</Badge>
      ),
    },
  ];
  useEffect(() => {
    const students = JSON.parse(
      localStorage.getItem("students") || "[]"
    );
  
    const faculty = JSON.parse(
      localStorage.getItem("faculty") || "[]"
    );
  
    const leavesData = JSON.parse(
      localStorage.getItem("leaves") || "[]"
    );
  
    setStudentCount(students.length);
    setFacultyCount(faculty.length);
  
    setPendingLeaves(
      leavesData.filter(
        (leave: any) => leave.status === "pending"
      ).length
    );
  }, []);
  const placementColumns = [
    { key: "company", header: "Company" },
    { key: "role", header: "Position" },
    { key: "applicants", header: "Applicants" },
    {
      key: "status",
      header: "Status",
      render: (item: Placement) => (
        <Badge variant={getStatusBadgeVariant(item.status)}>{item.status}</Badge>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        description="Campus-wide overview and management controls."
        actions={
          <button
            type="button"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
          >
            Generate Report
          </button>
        }
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Total Students"
          value={studentCount}
          change="+70 this month"
          trend="up"
          icon={GraduationCap}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
        />
        <StatCard
          title="Total Faculty"
          value={facultyCount}
          change="+5 hired"
          trend="up"
          icon={Users}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Active Events"
          value={stats.activeEvents}
          icon={CalendarDays}
          iconColor="text-violet-600"
          iconBg="bg-violet-50"
        />
        <StatCard
          title="Open Placements"
          value={stats.openPlacements}
          icon={Briefcase}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <StatCard
          title="Pending Leaves"
          value={pendingLeaves}
          icon={ClipboardList}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
        />
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Departments", value: "12", color: "from-indigo-500 to-indigo-600" },
          { label: "Hostels", value: "8", color: "from-violet-500 to-violet-600" },
          { label: "Labs", value: "24", color: "from-blue-500 to-blue-600" },
          { label: "Library Books", value: "45K", color: "from-emerald-500 to-emerald-600" },
        ].map((item) => (
          <div
            key={item.label}
            className={`rounded-xl bg-gradient-to-br ${item.color} p-5 text-white shadow-lg`}
          >
            <p className="text-sm font-medium text-white/80">{item.label}</p>
            <p className="mt-1 text-3xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Recent Leave Requests</h3>
          <DataTable
            columns={leaveColumns}
            data={leaves.slice(0, 5)}
            keyExtractor={(item) => item.id}
          />
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Placement Drives</h3>
          <DataTable
            columns={placementColumns}
            data={placements.slice(0, 5)}
            keyExtractor={(item) => item.id}
          />
        </div>
      </div>

      <Card className="mt-6">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">System Activity</h3>
        <div className="space-y-3">
          {[
            { action: "New student registration", user: "Emma Wilson", time: "2 min ago" },
            { action: "Leave approved", user: "Dr. Sarah Mitchell", time: "15 min ago" },
            { action: "Event created", user: "Admin", time: "1 hour ago" },
            { action: "Placement drive updated", user: "Admin", time: "3 hours ago" },
          ].map((activity) => (
            <div
              key={activity.action}
              className="flex items-center justify-between rounded-lg border border-slate-100 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                <p className="text-xs text-slate-500">by {activity.user}</p>
              </div>
              <span className="text-xs text-slate-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
