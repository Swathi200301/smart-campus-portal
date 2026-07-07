"use client";
import { useEffect, useState } from "react";
import { Calendar, CheckCircle2, Clock, UserX, XCircle } from "lucide-react";
import { Badge, getStatusBadgeVariant } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { attendance } from "@/lib/data";
import type { AttendanceRecord } from "@/types";

export default function AttendancePage() {
  const [attendanceData, setAttendanceData] = useState(attendance);
  const [showForm, setShowForm] = useState(false);
const [studentName, setStudentName] = useState("");
const [course, setCourse] = useState("");
const [faculty, setFaculty] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
useEffect(() => {
  const saved = localStorage.getItem("attendance");

  if (saved) {
    setAttendanceData(JSON.parse(saved));
  }
}, []);

const present = attendanceData.filter(
  (a) => a.status === "present"
).length;
const absent = attendanceData.filter(
  (a) => a.status === "absent"
).length;

const late = attendanceData.filter(
  (a) => a.status === "late"
).length;

const total = attendanceData.length;
  const rate = Math.round((present / total) * 100);
  const updateAttendance = (
    id: string,
    status: "present" | "absent"
  ) => {
    const updated = attendanceData.map((student) =>
      student.id === id
        ? { ...student, status }
        : student
    );
  
    setAttendanceData(updated);
  
    localStorage.setItem(
      "attendance",
      JSON.stringify(updated)
    );
  };
  const handleAddStudent = () => {
    const newStudent = {
      id: `STU${Date.now()}`,
      studentId: `STU${Math.floor(Math.random() * 1000)}`,
      studentName,
      course,
      faculty,
      date: new Date().toISOString().split("T")[0],
      status: "present",
    };
  
    const updated = [...attendanceData, newStudent];
  
    setAttendanceData(updated);
  
    localStorage.setItem(
      "attendance",
      JSON.stringify(updated)
    );
  
    setStudentName("");
    setCourse("");
    setFaculty("");
    setShowForm(false);
  };
  const columns = [
    
    { key: "studentId", header: "ID" },
    { key: "studentName", header: "Student Name" },
    { key: "course", header: "Course" },
    { key: "date", header: "Date" },
    { key: "faculty", header: "Faculty" },
  
    {
      key: "status",
      header: "Status",
      render: (item: AttendanceRecord) => (
        <Badge variant={getStatusBadgeVariant(item.status)}>
          {item.status}
        </Badge>
      ),
    },
  
    {
      key: "actions",
      header: "Actions",
  
      render: (item: AttendanceRecord) => (
        <div className="flex gap-2">
          <button
            onClick={() =>
              updateAttendance(item.id, "present")
            }
            className="rounded bg-green-600 px-3 py-1 text-white"
          >
            Present
          </button>
  
          <button
            onClick={() =>
              updateAttendance(item.id, "absent")
            }
            className="rounded bg-red-600 px-3 py-1 text-white"
          >
            Absent
          </button>
        </div>
      ),
    },
  ];
  const filteredAttendance = attendanceData.filter(
    (student) =>
      student.studentName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <PageHeader
        title="Attendance Management"
        description="Track and manage student attendance across all courses."
        actions={
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Export CSV
            </button>
            <button
  type="button"
  onClick={() => setShowForm(true)}
  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
>
  Add Student
</button>
          </div>
        }
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Attendance Rate"
          value={`${rate}%`}
          change="This week"
          trend="up"
          icon={CheckCircle2}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <StatCard
          title="Present"
          value={present}
          icon={UserX}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
        />
        <StatCard
          title="Absent"
          value={absent}
          icon={XCircle}
          iconColor="text-red-600"
          iconBg="bg-red-50"
        />
        <StatCard
          title="Late Arrivals"
          value={late}
          icon={Clock}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
        />
      </div>

      <Card className="mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-400" />
            <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100">
              <option>All Dates</option>
              <option>2026-06-20</option>
              <option>2026-06-19</option>
              <option>2026-06-18</option>
            </select>
          </div>
          <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100">
            <option>All Courses</option>
            <option>Data Structures</option>
            <option>Machine Learning</option>
            <option>Database Systems</option>
          </select>
          <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100">
            <option>All Status</option>
            <option>Present</option>
            <option>Absent</option>
            <option>Late</option>
          </select>
        </div>
      </Card>
      <input
  type="text"
  placeholder="Search Student..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="mb-4 w-full rounded-lg border border-slate-300 p-2"
/>
{showForm && (
  <Card className="mb-6 p-6">
    <h2 className="mb-4 text-xl font-semibold">
      Add Student
    </h2>

    <input
      value={studentName}
      onChange={(e) => setStudentName(e.target.value)}
      placeholder="Student Name"
      className="mb-2 w-full border p-2 rounded"
    />

    <input
      value={course}
      onChange={(e) => setCourse(e.target.value)}
      placeholder="Course"
      className="mb-2 w-full border p-2 rounded"
    />

    <input
      value={faculty}
      onChange={(e) => setFaculty(e.target.value)}
      placeholder="Faculty"
      className="mb-2 w-full border p-2 rounded"
    />

    <button
      onClick={handleAddStudent}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Add Student
    </button>
  </Card>
)}
      <DataTable
        columns={columns}
        data={filteredAttendance}
        keyExtractor={(item) => item.id}
      />
    </div>
  );
}
