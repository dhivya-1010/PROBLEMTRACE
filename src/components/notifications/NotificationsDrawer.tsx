"use client";

import React, { useState } from "react";
import {
  Bell,
  Heart,
  MessageCircle,
  Sparkles,
  FileCheck2,
  Check,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";

interface NotificationsDrawerProps {
  onNavigateAction: (v: string) => void;
}

export function NotificationsDrawer({ onNavigateAction }: NotificationsDrawerProps) {
  const { showToast } = useToast();
  const [filter, setFilter] = useState<"all" | "verification" | "social">("all");

  const [notifications, setNotifications] = useState([
    {
      id: "n1",
      type: "verification",
      title: "Proof Obligation PO-01 Verified",
      desc: "Dr. Elena Rostova attached DSC Trace #94 confirming 214.2 kJ/kg latent heat capacity.",
      time: "12m ago",
      read: false,
      targetView: "evidence",
    },
    {
      id: "n2",
      type: "social",
      title: "New Collaboration Proposal",
      desc: "Marcus Vance expressed interest in 'Thermal Storage for Off-Grid Clinics' offering finite element mesh modeling.",
      time: "1h ago",
      read: false,
      targetView: "projects",
    },
    {
      id: "n3",
      type: "social",
      title: "24 Researchers Liked Your Problem Brief",
      desc: "Your post 'Low-Cost Thermal Storage for Off-Grid Clinics' is trending in #CleanEnergy.",
      time: "3h ago",
      read: true,
      targetView: "home",
    },
    {
      id: "n4",
      type: "verification",
      title: "CDEV Prior Art Match Alert (94%)",
      desc: "High constraint compatibility identified with 2019 Delft Aerospace PCM Pack.",
      time: "Yesterday",
      read: true,
      targetView: "cdev",
    },
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast("All notifications marked as read", "success");
  };

  const filtered = notifications.filter((n) => {
    if (filter === "verification") return n.type === "verification";
    if (filter === "social") return n.type === "social";
    return true;
  });

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-teal-600" />
            <span>Activity & Verification Notifications</span>
          </h1>
          <p className="text-xs text-slate-500">
            Real-time peer reviews, collaboration bids, and CDEV constraint updates
          </p>
        </div>

        <button
          onClick={markAllRead}
          className="text-xs font-semibold text-teal-600 hover:text-teal-700 transition"
        >
          Mark all as read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {[
          { id: "all", label: "All Updates" },
          { id: "verification", label: "Proof & CDEV Alerts" },
          { id: "social", label: "Collaboration & Likes" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              filter === tab.id
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs divide-y divide-slate-100 overflow-hidden">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => onNavigateAction(item.targetView)}
            className={`p-4 flex items-start justify-between gap-4 cursor-pointer transition ${
              item.read ? "bg-white hover:bg-slate-50" : "bg-teal-50/40 hover:bg-teal-50/70"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  item.type === "verification"
                    ? "bg-teal-500/20 text-teal-700"
                    : "bg-rose-500/20 text-rose-700"
                }`}
              >
                {item.type === "verification" ? (
                  <FileCheck2 className="w-4 h-4" />
                ) : (
                  <Heart className="w-4 h-4" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                  {!item.read && (
                    <span className="w-2 h-2 rounded-full bg-teal-600" />
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {item.desc}
                </p>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  {item.time}
                </span>
              </div>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 self-center" />
          </div>
        ))}
      </div>
    </div>
  );
}

