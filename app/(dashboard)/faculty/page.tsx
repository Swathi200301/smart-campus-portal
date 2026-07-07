"use client";
import { useEffect, useState } from "react";

import {
  BookOpen,
  ClipboardCheck,
  FileText,
  Users,
  Clock,
} from "lucide-react";
import { Badge, getStatusBadgeVariant } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import {
  attendance,
  dashboardStats,
  leaves,
} from "@/lib/data";
import type { AttendanceRecord, LeaveRequest } from "@/types";

export default function FacultyDashboard() {
  const [classesToday, setClassesToday] = useState(0);
const [totalStudents, setTotalStudents] = useState(0);
const [pendingReviews, setPendingReviews] = useState(0);
const [avgAttendance, setAvgAttendance] = useState(0);

const [myClasses, setMyClasses] = useState(attendance);
const [pendingLeaves, setPendingLeaves] = useState(leaves);

const [currentTime, setCurrentTime] = useState(new Date());

  const attendanceColumns = [
    { key: "studentName", header: "Student" },
    { key: "course", header: "Course" },
    { key: "date", header: "Date" },
    {
      key: "status",
      header: "Status",
      render: (item: AttendanceRecord) => (
        <Badge variant={getStatusBadgeVariant(item.status)}>{item.status}</Badge>
      ),
    },
  ];

  const leaveColumns = [
    { key: "applicantName", header: "Applicant" },
    { key: "type", header: "Type" },
    { key: "startDate", header: "From" },
    { key: "endDate", header: "To" },
    {
      key: "status",
      header: "Status",
      render: (item: LeaveRequest) => (
        <Badge variant={getStatusBadgeVariant(item.status)}>{item.status}</Badge>
      ),
    },
  ];
  useEffect(() => {

    const attendanceData =
      JSON.parse(localStorage.getItem("attendance") || "[]");
  
    const students =
      JSON.parse(localStorage.getItem("students") || "[]");
  
    const leavesData =
      JSON.parse(localStorage.getItem("leaves") || "[]");
  
    if (attendanceData.length) {
  
      setMyClasses(
        attendanceData
          .filter((a:any)=>a.faculty==="Dr. Sarah Mitchell")
          .slice(0,5)
      );
  
      setClassesToday(attendanceData.length);
  
      const present =
        attendanceData.filter(
          (a:any)=>a.status==="present"
        ).length;
  
      setAvgAttendance(
        Math.round((present/attendanceData.length)*100)
      );
  
    } else {
  
      setMyClasses(
        attendance.filter(
          (a)=>a.faculty==="Dr. Sarah Mitchell"
        ).slice(0,5)
      );
  
      setClassesToday(
        dashboardStats.faculty.classesToday
      );
  
      setAvgAttendance(
        dashboardStats.faculty.avgAttendance
      );
    }
  
    setTotalStudents(students.length);
  
    if(leavesData.length){
  
      const pending =
        leavesData.filter(
          (l:any)=>l.status==="pending"
        );
  
      setPendingLeaves(
        pending.slice(0,4)
      );
  
      setPendingReviews(pending.length);
  
    } else {
  
      setPendingLeaves(
        leaves.filter(
          (l)=>l.status==="pending"
        ).slice(0,4)
      );
  
      setPendingReviews(
        dashboardStats.faculty.pendingReviews
      );
  
    }
  
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    },1000);
  
    return ()=>clearInterval(timer);
  
  },[]);
  return (
    <div>
      <PageHeader
        title="Faculty Dashboard"
        description="Manage your classes, attendance, and student requests."
        actions={
          <button
type="button"
onClick={() => alert("Attendance Marked Successfully")}
className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
>
Mark Attendance
</button>
        }
      />
<p className="mb-5 text-sm text-slate-500">
  {currentTime.toLocaleString()}
</p>
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Classes Today"
          value={classesToday}
          icon={BookOpen}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
        />
        <StatCard
          title="Total Students"
          value={totalStudents}
          change="+12 this semester"
          trend="up"
          icon={Users}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Pending Reviews"
          value={pendingReviews}
          icon={FileText}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
        />
        <StatCard
          title="Avg. Attendance"
          value={`${avgAttendance}%`}
          change="+3% improvement"
          trend="up"
          icon={ClipboardCheck}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Recent Attendance</h3>
          <DataTable
            columns={attendanceColumns}
            data={myClasses}
            keyExtractor={(item) => item.id}
          />
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Leave Requests to Review</h3>
          <DataTable
            columns={leaveColumns}
            data={pendingLeaves}
            keyExtractor={(item) => item.id}
          />
        </div>
      </div>

      <Card className="mt-6">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Today&apos;s Schedule</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { time: "10:00 AM", course: "Data Structures", room: "CS-201", students: 45 },
            { time: "01:00 PM", course: "Database Systems", room: "CS-105", students: 38 },
            { time: "03:30 PM", course: "Office Hours", room: "Faculty Block", students: 0 },
          ].map((slot) => (
            <div
              key={slot.time}
              className="rounded-lg border border-indigo-100 bg-indigo-50/50 p-4"
            >
              <p className="text-sm font-semibold text-indigo-700">{slot.time}</p>
              <p className="mt-1 font-medium text-slate-900">{slot.course}</p>
              <p className="text-xs text-slate-500">{slot.room}</p>
              {slot.students > 0 && (
                <p className="mt-2 text-xs text-slate-400">{slot.students} students</p>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
