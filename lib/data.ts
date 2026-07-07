import type {
  AnalyticsData,
  Announcement,
  AttendanceRecord,
  CampusEvent,
  Course,
  LeaveRequest,
  Notification,
  Placement,
  PlacementAnalytics,
  RecentActivity,
  User,
} from "@/types";

import analyticsData from "@/data/analytics.json";
import announcementsData from "@/data/announcements.json";
import attendanceData from "@/data/attendance.json";
import coursesData from "@/data/courses.json";
import eventsData from "@/data/events.json";
import leavesData from "@/data/leaves.json";
import notificationsData from "@/data/notifications.json";
import placementAnalyticsData from "@/data/placement-analytics.json";
import placementsData from "@/data/placements.json";
import recentActivityData from "@/data/recent-activity.json";
import usersData from "@/data/users.json";

export const users = usersData as User[];
export const attendance = attendanceData as AttendanceRecord[];
export const leaves = leavesData as LeaveRequest[];
export const events = eventsData as CampusEvent[];
export const placements = placementsData as Placement[];
export const courses = coursesData as Course[];
export const announcements = announcementsData as Announcement[];
export const analytics = analyticsData as AnalyticsData;
export const notifications = notificationsData as Notification[];
export const recentActivity = recentActivityData as RecentActivity[];
export const placementAnalytics = placementAnalyticsData as PlacementAnalytics;

export const currentStudent = {
  name: "Swathi C",
  email: "swathi.c@cambridgeiot.edu",
  avatar: "SC",
  college: "Cambridge Institute of Technology",
  branch: "Computer Science Engineering (IoT)",
  semester: "6th Semester",
  studentId: "CIT21CS089",
  phone: "+91 98765 43210",
  enrollmentYear: "2021",
  hostel: "Block B, Room 214",
};

export const dashboardStats = {
  student: {
    attendanceRate: 92,
    coursesEnrolled: 6,
    pendingAssignments: 2,
    upcomingEvents: 3,
    cgpa: 7.6,
  },
  faculty: {
    classesToday: 3,
    totalStudents: 156,
    pendingReviews: 12,
    leaveRequests: 5,
    avgAttendance: 91,
  },
  admin: {
    totalStudents: 4520,
    totalFaculty: 295,
    activeEvents: 3,
    openPlacements: 4,
    pendingLeaves: 7,
  },
};
