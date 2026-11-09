"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Users,
  Target,
  FileCheck2,
  AlertTriangle,
  TrendingUp,
  Check,
  X,
  ChevronDown,
  Layers
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { useToast } from "@/components/ui/Toast";

const platformAnalytics = [
  { month: "Jun", submissions: 42, verifications: 18 },
  { month: "Jul", submissions: 58, verifications: 26 },
  { month: "Aug", submissions: 74, verifications: 39 },
  { month: "Sep", submissions: 91, verifications: 52 },
  { month: "Oct", submissions: 118, verifications: 68 },
  { month: "Nov", submissions: 142, verifications: 84 },
];

export function AdminView() {
  const { showToast } = useToast();

  const [users, setUsers] = useState([
    { id: "u1", name: "Dr. Dhivya Raman", handle: "@dhivya_research", role: "Principal Fellow", status: "Active", reports: 0 },
    { id: "u2", name: "Dr. Elena Rostova", handle: "@elena_chem", role: "Materials Physicist", status: "Active", reports: 0 },
    { id: "u3", name: "Alex Rivera", handle: "@arivera_marine", role: "Marine Engineer", status: "Active", reports: 0 },
    { id: "u4", name: "Marcus Vance", handle: "@m_vance", role: "CAE Architect", status: "Active", reports: 0 },
    { id: "u5", name: "Spam Bot 481", handle: "@cryptobot_lab", role: "Unverified", status: "Flagged", reports: 4 },
  ]);

  const [pendingProblems, setPendingProblems] = useState([
    {
      id: "p-mod-1",
      title: "Subsurface Aquifer Salinity Inversion",
      submittedBy: "Dr. Kenji Sato",
      category: "Hydro-geology",
      matchScore: "88%",
      status: "Under Review",
    },
    {
      id: "p-mod-2",
      title: "Piezoelectric Energy Harvesting on High-Speed Rail",
      submittedBy: "Sarah Lin",
      category: "Infrastructure",
      matchScore: "76%",
      status: "Under Review",
    },
  ]);

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const next = u.status === "Active" ? "Suspended" : "Active";
          showToast(`User ${u.handle} marked as ${next}`, "info");
          return { ...u, status: next };
        }
        return u;
      })
    );
  };

  const handleApproveProblem = (id: string) => {
    setPendingProblems((prev) => prev.filter((p) => p.id !== id));
    showToast(`Problem ${id} approved for public commons indexing`, "success");
  };

  const handleRejectProblem = (id: string) => {
    setPendingProblems((prev) => prev.filter((p) => p.id !== id));
    showToast(`Problem ${id} returned to author for constraint clarification`, "info");
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block">
            Governance & Platform Health
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Admin Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Monitor scientific commons throughput, moderate new problem submissions, and verify peer credentials.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
            Platform Status: 100% Healthy
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Researchers", value: "3,840", icon: Users, change: "+14% this month" },
          { label: "Submitted Problems", value: "1,248", icon: Target, change: "+32 this week" },
          { label: "Validated Proofs", value: "842", icon: FileCheck2, change: "96% pass rate" },
          { label: "CDEV Prior Art Matches", value: "4,190", icon: ShieldCheck, change: "Avg 84% fidelity" },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">{kpi.label}</span>
                <Icon className="w-4 h-4 text-teal-600" />
              </div>
              <p className="text-2xl font-bold text-slate-900 mt-2">{kpi.value}</p>
              <p className="text-[11px] text-teal-700 font-semibold mt-1">{kpi.change}</p>
            </div>
          );
        })}
      </div>

      {/* Analytics Chart */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Platform Verification Velocity
            </h3>
            <p className="text-xs text-slate-500">
              Monthly Problem Submissions vs Completed Proof Validations
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500">Last 6 Months</span>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={platformAnalytics}>
              <defs>
                <linearGradient id="subGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0f172a" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0f172a" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="verGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
              <Area type="monotone" dataKey="submissions" stroke="#0f172a" strokeWidth={2} fill="url(#subGrad)" name="Submissions" />
              <Area type="monotone" dataKey="verifications" stroke="#0d9488" strokeWidth={2} fill="url(#verGrad)" name="Validated Proofs" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Moderation Queue & User Governance Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Moderation Queue */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">
              Problem Moderation Intake
            </h3>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
              {pendingProblems.length} Pending
            </span>
          </div>

          <div className="space-y-3">
            {pendingProblems.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-4 text-center">
                All submitted problems reviewed.
              </p>
            ) : (
              pendingProblems.map((prob) => (
                <div
                  key={prob.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-teal-700 uppercase">
                      {prob.category}
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      CDEV: {prob.matchScore}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{prob.title}</h4>
                  <p className="text-[11px] text-slate-500">Author: {prob.submittedBy}</p>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200/60">
                    <button
                      onClick={() => handleRejectProblem(prob.id)}
                      className="px-3 py-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold"
                    >
                      Clarify
                    </button>
                    <button
                      onClick={() => handleApproveProblem(prob.id)}
                      className="px-3 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-2xs"
                    >
                      Approve Brief
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* User Governance */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">
              Researcher Accounts & Access
            </h3>
            <span className="text-xs text-slate-500">Toggle account status</span>
          </div>

          <div className="space-y-2.5">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-200 text-xs"
              >
                <div>
                  <p className="font-bold text-slate-900">{user.name}</p>
                  <p className="text-[11px] text-slate-500">{user.handle} · {user.role}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      user.status === "Active"
                        ? "bg-emerald-50 text-emerald-800"
                        : "bg-rose-50 text-rose-800"
                    }`}
                  >
                    {user.status}
                  </span>
                  <button
                    onClick={() => toggleUserStatus(user.id)}
                    className="px-2.5 py-1 rounded-lg border border-slate-200 text-[11px] font-medium text-slate-700 hover:bg-slate-50 transition"
                  >
                    {user.status === "Active" ? "Suspend" : "Activate"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

