"use client";

import React from "react";
import {
  Network,
  Home,
  Compass,
  Target,
  FlaskConical,
  GitBranch,
  FolderGit2,
  FileCheck2,
  BookOpen,
  MessageSquare,
  Bell,
  Bookmark,
  User,
  ShieldCheck,
  PlusSquare,
  Sparkles,
  Settings
} from "lucide-react";
import { UserProfile } from "@/types";

interface LeftSidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  openCreateModal: () => void;
  profile: UserProfile;
  unreadCount?: number;
  unreadMessages?: number;
}

export function LeftSidebar({
  activeView,
  setActiveView,
  openCreateModal,
  profile,
  unreadCount = 3,
  unreadMessages = 2,
}: LeftSidebarProps) {
  const primaryNav = [
    { id: "home", label: "Home", icon: Home },
    { id: "explore", label: "Explore", icon: Compass },
    { id: "problems", label: "Problems", icon: Target },
    { id: "projects", label: "My Projects", icon: FolderGit2 },
    { id: "messages", label: "Messages", icon: MessageSquare, badge: unreadMessages },
    { id: "notifications", label: "Notifications", icon: Bell, badge: unreadCount },
    { id: "saved", label: "Saved", icon: Bookmark },
    { id: "profile", label: "Profile", icon: User },
  ];

  const analysisTools = [
    { id: "cdev", label: "CDEV Analysis", icon: FlaskConical },
    { id: "solutions", label: "Solution Lineage", icon: GitBranch },
    { id: "evidence", label: "Evidence Validation", icon: FileCheck2 },
    { id: "showcase", label: "Public Showcase", icon: BookOpen },
    { id: "admin", label: "Admin Console", icon: ShieldCheck },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex flex-col w-64 lg:w-72 bg-white border-r border-slate-200 px-4 py-5 overflow-y-auto select-none">
      {/* Brand Header */}
      <div
        onClick={() => setActiveView("home")}
        className="flex items-center gap-2.5 px-3 py-2 cursor-pointer group"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-900 to-[#1e3a5f] flex items-center justify-center text-teal-400 shadow-sm group-hover:scale-105 transition-transform">
          <Network className="w-5 h-5" />
        </div>
        <div>
          <span className="text-base font-bold tracking-[0.16em] text-slate-900 block leading-tight">
            PROBLEMTRACE
          </span>
          <span className="text-[10px] font-medium text-teal-700 tracking-wider uppercase block">
            Verifiable Solutions
          </span>
        </div>
      </div>

      {/* Create Post Button */}
      <div className="mt-6 px-1">
        <button
          onClick={openCreateModal}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-[#1a365d] text-white font-semibold text-sm shadow-sm hover:shadow transition-all group"
        >
          <PlusSquare className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
          <span>Create Post</span>
        </button>
      </div>

      {/* Main Nav Items */}
      <nav className="mt-6 space-y-1">
        {primaryNav.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-slate-100 text-slate-900 font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? "text-teal-600" : "text-slate-500"
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && item.badge > 0 ? (
                <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-teal-500 text-white leading-none">
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      {/* Core Research Engines */}
      <div className="mt-6 pt-5 border-t border-slate-100">
        <div className="px-3.5 mb-2 flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Engine & Verification
          </span>
          <Sparkles className="w-3 h-3 text-teal-500" />
        </div>
        <div className="space-y-1">
          {analysisTools.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-teal-50 text-teal-900 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-teal-700" : "text-slate-500"
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* User Mini Profile Footer */}
      <div className="mt-auto pt-4 border-t border-slate-100">
        <div
          onClick={() => setActiveView("profile")}
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition"
        >
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-500/30"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">
              {profile.name}
            </p>
            <p className="text-xs text-slate-500 truncate">{profile.handle}</p>
          </div>
          <Settings className="w-4 h-4 text-slate-400 hover:text-slate-600 transition" />
        </div>
      </div>
    </aside>
  );
}

