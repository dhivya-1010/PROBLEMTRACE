"use client";

import React, { useState } from "react";
import {
  Settings,
  User,
  Bell,
  ShieldCheck,
  Eye,
  Sliders,
  Save,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Lock,
  Globe
} from "lucide-react";
import { UserProfile } from "@/types";
import { useToast } from "@/components/ui/Toast";

interface SettingsViewProps {
  profile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
  onNavigateAction: (view: string) => void;
}

export function SettingsView({
  profile,
  onSaveProfile,
  onNavigateAction,
}: SettingsViewProps) {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<"account" | "notifications" | "verification" | "display">("account");

  // Account form
  const [name, setName] = useState(profile.name);
  const [handle, setHandle] = useState(profile.handle);
  const [bio, setBio] = useState(profile.bio);
  const [avatar, setAvatar] = useState(profile.avatar);

  // Notification toggles
  const [notifCdev, setNotifCdev] = useState(true);
  const [notifEvidence, setNotifEvidence] = useState(true);
  const [notifMilestones, setNotifMilestones] = useState(true);
  const [notifMessages, setNotifMessages] = useState(true);

  // Verification toggles
  const [publicProofObligations, setPublicProofObligations] = useState(true);
  const [autoCheckLineage, setAutoCheckLineage] = useState(true);
  const [anonymizeDrafts, setAnonymizeDrafts] = useState(false);

  // Display toggles
  const [compactCards, setCompactCards] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      ...profile,
      name,
      handle,
      bio,
      avatar,
    });
    showToast("Settings updated successfully", "success");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-teal-400 flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Platform Settings</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure your account preferences, notification alerts, and research verification parameters.
          </p>
        </div>
        <button
          onClick={() => onNavigateAction("profile")}
          className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
        >
          View Profile
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: "account", label: "Account & Profile", icon: User },
          { id: "notifications", label: "Notifications", icon: Bell },
          { id: "verification", label: "CDEV & Verification", icon: ShieldCheck },
          { id: "display", label: "Display & Accessibility", icon: Sliders },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${isActive
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab: Account & Profile */}
      {activeTab === "account" && (
        <form onSubmit={handleSaveAccount} className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-5">
          <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
            <img
              src={avatar}
              alt={name}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-teal-500/30"
            />
            <div>
              <h3 className="text-sm font-bold text-slate-900">{name}</h3>
              <p className="text-xs text-slate-500">{handle}</p>
              <button
                type="button"
                onClick={() => {
                  const seed = Math.floor(Math.random() * 1000);
                  setAvatar(`https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80&seed=${seed}`);
                }}
                className="mt-2 text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                Change avatar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Username Handle
              </label>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                required
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Bio & Research Focus
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition resize-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-[#1a365d] text-white text-xs font-semibold shadow-xs transition"
            >
              <Save className="w-4 h-4 text-teal-400" />
              Save Account Settings
            </button>
          </div>
        </form>
      )}

      {/* Tab: Notifications */}
      {activeTab === "notifications" && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 mb-2">Notification Preferences</h3>

          {[
            {
              title: "CDEV Compatibility Matches",
              desc: "Get notified when the CDEV engine discovers high-confidence historical solutions for your problems.",
              state: notifCdev,
              setter: setNotifCdev,
            },
            {
              title: "Proof Obligation Reviews",
              desc: "Alerts when peer reviewers endorse or request revisions on submitted evidence artifacts.",
              state: notifEvidence,
              setter: setNotifEvidence,
            },
            {
              title: "Project Milestones & Tasks",
              desc: "Updates when teammates complete milestones or assign tasks in active project workspaces.",
              state: notifMilestones,
              setter: setNotifMilestones,
            },
            {
              title: "Direct Messages & Inquiries",
              desc: "Immediate alerts when builders express interest or message your research profile.",
              state: notifMessages,
              setter: setNotifMessages,
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start justify-between p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition">
              <div className="pr-4">
                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  item.setter(!item.state);
                  showToast("Notification preference updated", "info");
                }}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${item.state ? "bg-teal-600" : "bg-slate-200"
                  }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${item.state ? "translate-x-5" : "translate-x-0"
                    }`}
                />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Verification */}
      {activeTab === "verification" && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <h3 className="text-sm font-bold text-slate-900">CDEV & Verification Policy</h3>
          </div>

          {[
            {
              title: "Public Proof Obligation Disclosure",
              desc: "Allow peer researchers to inspect mathematical guarantees and empirical benchmark traces.",
              state: publicProofObligations,
              setter: setPublicProofObligations,
            },
            {
              title: "Automated Lineage Verification",
              desc: "Automatically register parent and child DAG relationships when adapting historical solutions.",
              state: autoCheckLineage,
              setter: setAutoCheckLineage,
            },
            {
              title: "Anonymize Draft Problem Submissions",
              desc: "Hide author identity during the initial constraint formulation and proof extraction phase.",
              state: anonymizeDrafts,
              setter: setAnonymizeDrafts,
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start justify-between p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition">
              <div className="pr-4">
                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  item.setter(!item.state);
                  showToast("Verification parameter updated", "info");
                }}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${item.state ? "bg-teal-600" : "bg-slate-200"
                  }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${item.state ? "translate-x-5" : "translate-x-0"
                    }`}
                />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Display & Accessibility */}
      {activeTab === "display" && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 mb-2">Interface & Accessibility</h3>

          {[
            {
              title: "Compact Post Briefs",
              desc: "Display feed items with condensed metrics and smaller attachment previews.",
              state: compactCards,
              setter: setCompactCards,
            },
            {
              title: "Respect Reduced Motion",
              desc: "Disable sidebar expand transitions and modal scale animations.",
              state: reducedMotion,
              setter: setReducedMotion,
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start justify-between p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition">
              <div className="pr-4">
                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  item.setter(!item.state);
                  showToast("Accessibility preference updated", "info");
                }}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${item.state ? "bg-teal-600" : "bg-slate-200"
                  }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${item.state ? "translate-x-5" : "translate-x-0"
                    }`}
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

