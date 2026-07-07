export type UserRole = "student" | "faculty" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department: string;
}

export interface StatMetric {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  course: string;
  date: string;
  status: "present" | "absent" | "late";
  faculty: string;
}

export interface LeaveRequest {
  id: string;
  applicantName: string;
  role: UserRole;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
}

export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  attendees: number;
  status: "upcoming" | "ongoing" | "completed";
}

export interface Placement {
  id: string;
  company: string;
  role: string;
  package: string;
  location: string;
  deadline: string;
  eligibility: string;
  status: "open" | "closed" | "upcoming";
  applicants: number;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  instructor: string;
  schedule: string;
  progress: number;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
  priority: "low" | "medium" | "high";
}

export interface AnalyticsData {
  enrollmentTrend: { month: string; students: number; faculty: number }[];
  attendanceOverview: { department: string; rate: number }[];
  placementStats: { year: string; placed: number; total: number }[];
  eventParticipation: { event: string; participants: number }[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "info" | "success" | "warning" | "alert";
  read: boolean;
  link?: string;
}

export interface RecentActivity {
  id: string;
  action: string;
  detail: string;
  time: string;
  icon: "attendance" | "assignment" | "event" | "placement" | "leave" | "grade";
}

export interface PlacementAnalytics {
  applicantsByCompany: { company: string; applicants: number }[];
  statusDistribution: { status: string; count: number }[];
  monthlyApplications: { month: string; applications: number; offers: number }[];
  packageRanges: { range: string; count: number }[];
}
