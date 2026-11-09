"use client";

import React, { useState } from "react";
import {
  FolderGit2,
  Users,
  MessageSquare,
  CheckCircle2,
  Clock,
  Upload,
  FileText,
  Send,
  Plus,
  Paperclip,
  Activity,
  Layers,
  ArrowRight
} from "lucide-react";
import { UserProfile } from "@/types";
import { useToast } from "@/components/ui/Toast";

interface ProjectsViewProps {
  profile: UserProfile;
  onNavigateAction: (v: string) => void;
}

export function ProjectsView({ profile, onNavigateAction }: ProjectsViewProps) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<"overview" | "chat" | "tasks" | "files" | "evidence">("overview");

  // Chat State
  const [chatMessages, setChatMessages] = useState([
    {
      id: "m1",
      author: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      text: "The finite element simulation for the ultrasonic HDPE pouch seam holds up to 105 kPa cyclic barometric load. No signs of micro-rupture.",
      timestamp: "10:14 AM",
    },
    {
      id: "m2",
      author: "Dr. Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      text: "Calorimetry DSC results for the second batch of coconut ester bio-wax just came out of the ETH chamber: 214.2 kJ/kg latent heat at 4.2°C melting phase!",
      timestamp: "11:22 AM",
    },
    {
      id: "m3",
      author: "Dr. Dhivya Raman",
      avatar: profile.avatar,
      text: "Outstanding work Elena. That satisfies Proof Obligation PO-01. I am attaching the DSC trace to the evidence validation suite now.",
      timestamp: "11:30 AM",
    },
  ]);
  const [inputMsg, setInputMsg] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        author: profile.name,
        avatar: profile.avatar,
        text: inputMsg.trim(),
        timestamp: "Just now",
      },
    ]);
    setInputMsg("");
    showToast("Message sent to project collaborators", "info");
  };

  // Files State with Demo Upload
  const [files, setFiles] = useState([
    { name: "dsc_trace_batch_02_eutectic.pdf", size: "2.4 MB", author: "Dr. Elena Rostova", date: "Today" },
    { name: "hdpe_ultrasonic_weld_stress_model.step", size: "18.1 MB", author: "Marcus Vance", date: "Yesterday" },
    { name: "who_pqs_drop_testing_matrix_e004.xlsx", size: "480 KB", author: "Amara Diallo", date: "3 days ago" },
  ]);

  const handleDemoUpload = () => {
    const sampleFiles = [
      "chamber_temperature_logger_run_4.csv",
      "accelerometer_shock_profile_dirt_drop.pdf",
      "chemical_safety_msds_biowax_blend.pdf",
    ];
    const picked = sampleFiles[Math.floor(Math.random() * sampleFiles.length)];
    setFiles((prev) => [
      { name: picked, size: "3.2 MB", author: profile.name, date: "Just now" },
      ...prev,
    ]);
    showToast(`Uploaded ${picked} to Project Repository`, "success");
  };

  // Tasks State
  const [tasks, setTasks] = useState([
    { id: "t1", title: "Synthesize 5kg coconut ester eutectic matrix", assignee: "Dr. Elena Rostova", status: "Done" },
    { id: "t2", title: "Conduct ultrasonic pouch pressure burst test", assignee: "Marcus Vance", status: "Done" },
    { id: "t3", title: "Calibrate 72-hour chamber thermocouple grid", assignee: "Dr. Dhivya Raman", status: "In Progress" },
    { id: "t4", title: "Perform 2-meter dirt drop tower tests (WHO PQS E004)", assignee: "Amara Diallo", status: "Pending" },
  ]);

  const toggleTaskStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const next = t.status === "Done" ? "In Progress" : t.status === "In Progress" ? "Pending" : "Done";
          return { ...t, status: next };
        }
        return t;
      })
    );
    showToast("Task status updated", "info");
  };

  return (
    <div className="w-full space-y-6">
      {/* Project Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                Active Research Room
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500 font-medium">Room #PR-2026-08</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
              Low-Cost Thermal Storage for Off-Grid Clinics
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Collaborative multidisciplinary adaptation of Delft 2019 aerospace phase-change thermal pack for rural health centers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateAction("cdev")}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
            >
              CDEV Diff
            </button>
            <button
              onClick={() => onNavigateAction("evidence")}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
              <span>Evidence Dossier</span>
            </button>
          </div>
        </div>

        {/* Room Navigation Tabs */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
          {[
            { id: "overview", label: "Overview & Milestones", icon: FolderGit2 },
            { id: "chat", label: "Live Room Chat", icon: MessageSquare, badge: chatMessages.length },
            { id: "tasks", label: "Tasks & Verification", icon: CheckCircle2, badge: tasks.length },
            { id: "files", label: "Files & Telemetry", icon: FileText, badge: files.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition whitespace-nowrap ${
                  isActive
                    ? "bg-slate-900 text-white shadow-2xs font-bold"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive ? "bg-teal-400 text-slate-950 font-bold" : "bg-white text-slate-600"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab: Overview */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Milestones & Progress */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">
                  Verification Roadmap
                </h3>
                <span className="text-xs font-bold text-teal-700">74% Complete</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-teal-600 rounded-full" style={{ width: "74%" }} />
              </div>

              <div className="space-y-3 pt-2">
                {[
                  { title: "Milestone 1: Eutectic Bio-Wax DSC Analysis", status: "Verified", date: "Oct 28" },
                  { title: "Milestone 2: Hermetic Ultrasonic Seam Integrity", status: "Verified", date: "Nov 02" },
                  { title: "Milestone 3: 72h Continuous Thermal Chamber Hold", status: "Underway", date: "Nov 08" },
                  { title: "Milestone 4: WHO PQS Field Protocol Sign-off", status: "Scheduled", date: "Nov 19" },
                ].map((m, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          m.status === "Verified"
                            ? "bg-emerald-100 text-emerald-800"
                            : m.status === "Underway"
                            ? "bg-teal-100 text-teal-800"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{m.title}</p>
                        <p className="text-[11px] text-slate-400">Target Date: {m.date}</p>
                      </div>
                    </div>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                        m.status === "Verified"
                          ? "bg-emerald-50 text-emerald-700"
                          : m.status === "Underway"
                          ? "bg-teal-50 text-teal-700 animate-pulse"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Timeline Activity */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-teal-600" />
                <span>Project Activity Timeline</span>
              </h3>
              <div className="space-y-3 pt-2 text-xs">
                {[
                  { text: "Dr. Elena Rostova uploaded DSC trace run #94", time: "2 hours ago" },
                  { text: "Marcus Vance marked task 'Conduct ultrasonic pouch pressure' as completed", time: "4 hours ago" },
                  { text: "WHO PQS Protocol reviewer accepted Proof Obligation PO-02", time: "Yesterday" },
                  { text: "Amara Diallo scheduled Senegal clinical testbed deployment", time: "2 days ago" },
                ].map((act, i) => (
                  <div key={i} className="flex items-start gap-2.5 pb-2.5 border-b border-slate-100 last:border-none">
                    <span className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                    <div className="flex-1">
                      <p className="text-slate-800">{act.text}</p>
                      <span className="text-[10px] text-slate-400">{act.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Collaborator Team Sidebar */}
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-teal-600" />
                  <span>Research Team (4)</span>
                </h3>
                <span className="text-xs font-semibold text-teal-700">All Active</span>
              </div>

              <div className="space-y-3">
                {[
                  {
                    name: "Dr. Dhivya Raman",
                    role: "Lead Hardware Architect",
                    org: "Delft Center for Verifiable Eng.",
                    avatar: profile.avatar,
                  },
                  {
                    name: "Dr. Elena Rostova",
                    role: "Materials Physicist",
                    org: "ETH Zurich",
                    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
                  },
                  {
                    name: "Marcus Vance",
                    role: "Thermal CAE Engineer",
                    org: "MIT Energy Lab",
                    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
                  },
                  {
                    name: "Amara Diallo",
                    role: "Field Cold-Chain Specialist",
                    org: "Dakar Health Alliance",
                    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80",
                  },
                ].map((member, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 truncate">{member.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{member.role} · {member.org}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Chat */}
      {activeTab === "chat" && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden h-[540px] flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-teal-600" />
              <span className="text-xs font-bold text-slate-900">
                Technical Discussion Stream
              </span>
            </div>
            <span className="text-[11px] text-teal-700 font-medium">
              4 Collaborators Connected
            </span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3 text-xs">
                <img
                  src={msg.avatar}
                  alt={msg.author}
                  className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-slate-200"
                />
                <div className="flex-1 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">{msg.author}</span>
                    <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 flex gap-2">
            <button
              type="button"
              onClick={handleDemoUpload}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 transition"
              title="Attach Telemetry File"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Write a message to team members or paste equation..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
            />
            <button
              type="submit"
              disabled={!inputMsg.trim()}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Send className="w-3.5 h-3.5 text-teal-400" />
              <span>Send</span>
            </button>
          </form>
        </div>
      )}

      {/* Tab: Tasks */}
      {activeTab === "tasks" && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Action Items & Proof Deliverables
              </h3>
              <p className="text-xs text-slate-500">
                Click task status badge to advance verification state
              </p>
            </div>
            <button
              onClick={() => showToast("Added new verification task", "info")}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Task</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition bg-slate-50/50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400">{task.id}</span>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{task.title}</p>
                    <p className="text-[11px] text-slate-500">Assigned: {task.assignee}</p>
                  </div>
                </div>

                <button
                  onClick={() => toggleTaskStatus(task.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold border transition ${
                    task.status === "Done"
                      ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                      : task.status === "In Progress"
                      ? "bg-teal-50 text-teal-800 border-teal-300"
                      : "bg-slate-100 text-slate-700 border-slate-300"
                  }`}
                >
                  {task.status}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Files */}
      {activeTab === "files" && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Repository & Telemetry Data
              </h3>
              <p className="text-xs text-slate-500">
                Uploaded logs, CAD models, and test certificates
              </p>
            </div>
            <button
              onClick={handleDemoUpload}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-2xs transition"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Telemetry File</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {files.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-white hover:border-teal-500/40 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{file.name}</p>
                    <p className="text-[11px] text-slate-500">
                      {file.size} · Uploaded by {file.author} ({file.date})
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => showToast(`Downloading ${file.name}`, "info")}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

