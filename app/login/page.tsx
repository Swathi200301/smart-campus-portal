"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { branding } from "@/lib/branding";

const demoAccounts = [
  { role: "Student", email: "swathi.c@cambridgeiot.edu", redirect: "/student" },
  { role: "Faculty", email: "s.mitchell@campus.edu", redirect: "/faculty" },
  { role: "Admin", email: "admin@campus.edu", redirect: "/admin" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const account = demoAccounts.find((a) => a.email === email);
    router.push(account?.redirect ?? "/student");
  };

  const quickLogin = (redirect: string) => {
    router.push(redirect);
  };

  return (
    <div className="relative flex min-h-screen bg-background">
      <div className="absolute right-4 top-4 z-10 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>

      <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-teal-800 via-teal-900 to-slate-900 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-white" />
          <div className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-white" />
        </div>

        <div className="relative flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm ring-1 ring-white/20">
            <span className="text-sm font-bold text-white">{branding.logoInitials}</span>
          </div>
          <div>
            <p className="text-lg font-bold text-white">{branding.collegeName}</p>
            <p className="text-sm text-teal-200">{branding.systemName}</p>
          </div>
        </div>

        <div className="relative space-y-6">
          <h1 className="text-4xl font-bold leading-tight text-white xl:text-5xl">
            {branding.tagline}
          </h1>
          <p className="max-w-md text-lg text-teal-100">
            Attendance, leave, events, placements, and analytics — streamlined
            for students, faculty, and administrators at CIT.
          </p>
          <div className="flex gap-8 pt-4">
            <div>
              <p className="text-3xl font-bold text-white">4,520+</p>
              <p className="text-sm text-teal-200">Students</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">295</p>
              <p className="text-sm text-teal-200">Faculty</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">87%</p>
              <p className="text-sm text-teal-200">Placement Rate</p>
            </div>
          </div>
        </div>

        <p className="relative text-sm text-teal-300/80">
          © 2026 {branding.collegeName}. Est. {branding.established}
        </p>
      </div>

      <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600">
              <span className="text-xs font-bold text-white">{branding.logoInitials}</span>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{branding.collegeShort}</p>
              <p className="text-xs text-muted">{branding.systemName}</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
          <p className="mt-2 text-sm text-muted">
            Sign in to {branding.collegeShort} portal
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@cambridgeiot.edu"
                  className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-900"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-900"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted">
                <input
                  type="checkbox"
                  className="rounded border-border text-teal-600 focus:ring-teal-500"
                />
                Remember me
              </label>
              <Link
                href="#"
                className="text-sm font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-teal-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition-colors hover:bg-teal-700"
            >
              Sign in
            </button>
          </form>

          <div className="mt-8">
            <p className="mb-3 text-center text-xs font-medium uppercase tracking-wider text-muted">
              Quick demo access
            </p>
            <div className="grid grid-cols-3 gap-2">
              {demoAccounts.map((account) => (
                <button
                  key={account.role}
                  type="button"
                  onClick={() => quickLogin(account.redirect)}
                  className="rounded-lg border border-border bg-card px-3 py-2.5 text-xs font-medium text-foreground transition-colors hover:border-teal-300 hover:bg-teal-50 dark:hover:bg-teal-950/50"
                >
                  {account.role}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
