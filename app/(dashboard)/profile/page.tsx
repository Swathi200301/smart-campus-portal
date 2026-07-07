"use client";
import { useEffect, useState } from "react";
import {
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Megaphone,
  Phone,
  User,
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
  recentActivity,
} from "@/lib/data";

export default function ProfilePage() {
  const [student, setStudent] = useState(currentStudent);
const [attendance, setAttendance] = useState(
  dashboardStats.student.attendanceRate
);
const [cgpa, setCgpa] = useState(8);
  dashboardStats.student.cgpa
const [pendingAssignments, setPendingAssignments] = useState(
  dashboardStats.student.pendingAssignments
);

const [courseList, setCourseList] = useState(courses);
const [eventList, setEventList] = useState(events);
const [announcementList, setAnnouncementList] =
  useState(announcements);

const [currentTime, setCurrentTime] =
  useState(new Date());

useEffect(() => {

  const profile =
    JSON.parse(localStorage.getItem("student") || "null");

  const attendanceData =
    JSON.parse(localStorage.getItem("attendance") || "[]");

  const coursesData =
    JSON.parse(localStorage.getItem("courses") || "[]");

  const eventsData =
    JSON.parse(localStorage.getItem("events") || "[]");

  const announcementsData =
    JSON.parse(localStorage.getItem("announcements") || "[]");

  const assignments =
    JSON.parse(localStorage.getItem("assignments") || "[]");

  if(profile){

    setStudent(profile);

    if(profile.cgpa){
      setCgpa(profile.cgpa);
    }

  }

  if(attendanceData.length){

    const present =
      attendanceData.filter(
        (a:any)=>a.status==="present"
      ).length;

    setAttendance(
      Math.round(
        (present/attendanceData.length)*100
      )
    );

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

  const timer=setInterval(()=>{

    setCurrentTime(new Date());

  },1000);

  return ()=>clearInterval(timer);

},[]);

const upcomingEvents =
eventList.filter(
(e:any)=>e.status==="upcoming"
);

  const profileFields = [
    { label: "Student ID", value: currentStudent.studentId, icon: User },
    { label: "Email", value: currentStudent.email, icon: Mail },
    { label: "Phone", value: currentStudent.phone, icon: Phone },
    { label: "College", value: currentStudent.college, icon: Building2 },
    { label: "Branch", value: currentStudent.branch, icon: BookOpen },
  
  ];

  return (
    <div>
      <PageHeader
        title="My Profile"
        description="View and manage your academic profile at Cambridge Institute of Technology."
        actions={
          <button
          onClick={()=>{
            const name=prompt("Enter Name",student.name);
        
            if(name){
        
              const updated={
                ...student,
                name,
              };
        
              setStudent(updated);
        
              localStorage.setItem(
                "student",
                JSON.stringify(updated)
              );
        
              alert("Profile Updated");
            }
          }}
          className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
        >
          Edit Profile
        </button>
        }
      />
<p className="mb-5 text-sm text-slate-500">
  {currentTime.toLocaleString()}
</p>
      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-teal-800 text-3xl font-bold text-white shadow-lg">
              {student.avatar}
            </div>
            <h2 className="mt-4 text-xl font-bold text-foreground">{student.name}</h2>
            <p className="text-sm text-muted">{student.branch}</p>
            <p className="mt-1 text-xs text-muted">{student.semester}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Badge variant="info">{branding.collegeShort}</Badge>
              <Badge variant="success">Active Student</Badge>
            </div>
          </div>
          <div className="mt-6 space-y-3 border-t border-border pt-6">
            {profileFields.map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.label} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400" />
                  <div>
                    <p className="text-xs text-muted">{field.label}</p>
                    <p className="text-sm font-medium text-foreground">{field.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="space-y-6 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Attendance"
              value={`${attendance}%`}
              icon={CheckCircle2}
              iconColor="text-emerald-600 dark:text-emerald-400"
              iconBg="bg-emerald-50 dark:bg-emerald-950/50"
            />
            <StatCard
              title="CGPA"
              value={cgpa}
              icon={CheckCircle2}
              iconColor="text-teal-600 dark:text-teal-400"
              iconBg="bg-teal-50 dark:bg-teal-950/50"
            />
            <StatCard
              title="Courses"
              value={courseList.length}
              icon={BookOpen}
              iconColor="text-violet-600 dark:text-violet-400"
              iconBg="bg-violet-50 dark:bg-violet-950/50"
            />
            <StatCard
              title="Pending Work"
              value={pendingAssignments}
              icon={Clock}
              iconColor="text-amber-600 dark:text-amber-400"
              iconBg="bg-amber-50 dark:bg-amber-950/50"
            />
          </div>

          <Card>
  <h3 className="mb-4 text-lg font-semibold text-foreground">
    Academic Progress
  </h3>

  <div className="space-y-4">
    {courseList.map((course: any) => (
      <div key={course.id}>
        <div className="mb-1 flex justify-between text-sm">
          <span className="font-medium text-foreground">
            {course.name}
          </span>

          <span className="text-muted">
            {course.progress}%
          </span>
        </div>

        <ProgressBar value={course.progress} />
      </div>
    ))}
  </div>
</Card>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentActivity limit={recentActivity.length} showViewAll={false} />

        <Card>
          <div className="mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            <h3 className="text-lg font-semibold text-foreground">Registered Events</h3>
          </div>
          <div className="space-y-3">
          {upcomingEvents.map((event:any)=>(
              <div
                key={event.id}
                className="rounded-lg border border-border p-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <p className="text-sm font-medium text-foreground">{event.title}</p>
                <p className="mt-1 text-xs text-muted">
                  {event.date} · {event.location}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-6">
        <div className="mb-4 flex items-center gap-2">
          <Megaphone className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <h3 className="text-lg font-semibold text-foreground">College Announcements</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {announcementList.slice(0,4).map((ann) => (
            <div
              key={ann.id}
              className="rounded-lg border border-border p-4"
            >
              <p className="text-sm font-medium text-foreground">{ann.title}</p>
              <p className="mt-1 text-xs text-muted">{ann.message}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
