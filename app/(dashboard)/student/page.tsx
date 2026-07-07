"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Megaphone,
} from "lucide-react";
import { RecentActivity } from "@/components/activity/RecentActivity";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatCard } from "@/components/ui/StatCard";
import { branding } from "@/lib/branding";
import {
  announcements,
  courses,
  currentStudent,
  dashboardStats,
  events,
} from "@/lib/data";


  export default function StudentDashboard() {
    const [attendanceRate, setAttendanceRate] = useState(0);
    const [courseList, setCourseList] = useState(courses);
    const [eventList, setEventList] = useState(events);
    const [announcementList, setAnnouncementList] = useState(announcements);
    const [cgpa, setCgpa] = useState(8);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [pendingAssignments, setPendingAssignments] = useState(0);
    useEffect(() => {

      const attendance =
        JSON.parse(localStorage.getItem("attendance") || "[]");
    
      const coursesData =
        JSON.parse(localStorage.getItem("courses") || "[]");
    
      const eventsData =
        JSON.parse(localStorage.getItem("events") || "[]");
    
      const assignments =
        JSON.parse(localStorage.getItem("assignments") || "[]");
    
      const announcementsData =
        JSON.parse(localStorage.getItem("announcements") || "[]");
    
      if (attendance.length) {
    
        const present = attendance.filter(
          (a:any)=>a.status==="present"
        ).length;
    
        setAttendanceRate(
          Math.round((present/attendance.length)*100)
        );
      }
      else{
        setAttendanceRate(dashboardStats.student.attendanceRate);
      }
    
      if(coursesData.length){
        setCourseList(coursesData);
      }
    
      if(eventsData.length){
        setEventList(eventsData);
      }
    
      if(announcementsData.length){
        setAnnouncementList(announcementsData);
      }
    
      if(assignments.length){
        setPendingAssignments(
          assignments.filter(
            (a:any)=>!a.completed
          ).length
        );
      }
      else{
        setPendingAssignments(
          dashboardStats.student.pendingAssignments
        );
      }
    
      const timer=setInterval(()=>{
        setCurrentTime(new Date());
      },1000);
    
      return ()=>clearInterval(timer);
    
    },[]);
    const upcomingEvents = eventList.filter(
      (e: any) => e.status === "upcoming"
    );
  return (
    <div>
      <PageHeader
  title="Student Dashboard"
  description={`Welcome back, ${currentStudent.name.split(" ")[0]}! Here's your academic overview.`}
/>

<p className="mb-5 text-sm text-slate-500">
  {currentTime.toLocaleString()}
</p>

      <Card className="mb-8 overflow-hidden border-0 bg-gradient-to-r from-teal-700 via-teal-800 to-slate-900 p-0 text-white">
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-teal-200/80">
              {branding.collegeName}
            </p>
            <p className="mt-1 text-sm font-medium text-teal-100">Logged in as</p>
            <h2 className="mt-1 text-2xl font-bold">{currentStudent.name}</h2>
            <p className="mt-1 text-sm text-teal-100/80">{currentStudent.branch}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium ring-1 ring-white/25">
              {currentStudent.semester}
            </span>
            <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-medium text-amber-200 ring-1 ring-amber-400/30">
            CGPA {cgpa}
            </span>
          </div>
        </div>
      </Card>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Attendance Rate"
          value={`${attendanceRate}%`}
          change="Above 75% requirement"
          trend="up"
          icon={CheckCircle2}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-emerald-50 dark:bg-emerald-950/50"
        />
        <StatCard
          title="Courses Enrolled"
          value={courseList.length}
          icon={BookOpen}
        />
        <StatCard
          title="Pending Assignments"
          value={pendingAssignments}
          change="Due this week"
          trend="neutral"
          icon={Clock}
          iconColor="text-amber-600 dark:text-amber-400"
          iconBg="bg-amber-50 dark:bg-amber-950/50"
        />
        <StatCard
          title="Current CGPA"
          value={cgpa}
          change="6th semester standing"
          trend="neutral"
          icon={CheckCircle2}
          iconColor="text-violet-600 dark:text-violet-400"
          iconBg="bg-violet-50 dark:bg-violet-950/50"
        />
      </div>

      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h3 className="mb-4 text-lg font-semibold text-foreground">My Courses</h3>
          <div className="space-y-4">
          {courseList.map((course: any) => (
  <div
    key={course.id}
    className="rounded-lg border border-border bg-slate-50/50 p-4 dark:bg-slate-800/30"
  >
    <div className="mb-2 flex items-start justify-between">
      <div>
        <p className="font-medium text-foreground">
          {course.name}
        </p>

        <p className="text-xs text-muted">
          {course.code} · {course.instructor}
        </p>
      </div>

      <Badge variant="info">
        {course.credits} credits
      </Badge>
    </div>

    <div className="mt-3 flex items-center gap-3">
      <ProgressBar
        value={course.progress}
        className="flex-1"
      />

      <span className="text-xs font-medium text-muted">
        {course.progress}%
      </span>
    </div>

    <p className="mt-2 text-xs text-muted/70">
  {course.schedule}
</p>
</div>
))}
</div>
</Card>

        <div className="space-y-6">
          <RecentActivity limit={4} />

          <Card>
            <div className="mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              <h3 className="text-lg font-semibold text-foreground">Upcoming Events</h3>
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="rounded-lg border border-border p-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <p className="text-sm font-medium text-foreground">{event.title}</p>
                  <p className="mt-1 text-xs text-muted">
                    {event.date} · {event.time}
                  </p>
                  <p className="mt-1 text-xs text-muted/70">{event.location}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="mb-4 flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <h3 className="text-lg font-semibold text-foreground">Announcements</h3>
            </div>
            <div className="space-y-3">
            {announcementList.slice(0,3).map((ann:any)=>(
                <div
                  key={ann.id}
                  className="border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-foreground">{ann.title}</p>
                    <Badge
                      variant={
                        ann.priority === "high"
                          ? "danger"
                          : ann.priority === "medium"
                            ? "warning"
                            : "default"
                      }
                    >
                      {ann.priority}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted">{ann.message}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
