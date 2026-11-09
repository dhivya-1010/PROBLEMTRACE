"use client";

import React from "react";
import {
  Network,
  Home,
  Compass,
  Target,
  FolderGit2,
  MessageSquare,
  Bell,
  Bookmark,
  User,
  Settings,
  Plus,
  FlaskConical,
  GitBranch,
  FileCheck2,
  BookOpen,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { UserProfile } from "@/types";

interface LeftSidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  openCreateModal: () => void;
  profile: UserProfile;
  unreadCount?: number;
  unreadMessages?: number;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export function LeftSidebar({
  activeView,
  setActiveView,
  openCreateModal,
  profile,
  unreadCount = 3,
  unreadMessages = 2,
  isExpanded = false,
  onToggleExpand,
}: LeftSidebarProps) {
  // Primary navigation items
  const primaryNav = [
    { id: "home", label: "Home", icon: Home },
    { id: "explore", label: "Explore", icon: Compass },
    { id: "problems", label: "Problems", icon: Target },
    { id: "projects", label: "My Projects", icon: FolderGit2 },
    { id: "messages", label: "Messages", icon: MessageSquare, badge: unreadMessages },
    { id: "notifications", label: "Notifications", icon: Bell, badge: unreadCount },
    { id: "saved", label: "Saved", icon: Bookmark },
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Core problem-solving and verification engines
  const analysisTools = [
    { id: "cdev", label: "CDEV Analysis", icon: FlaskConical },
    { id: "solutions", label: "Solution Lineage", icon: GitBranch },
    { id: "evidence", label: "Evidence Validation", icon: FileCheck2 },
    { id: "showcase", label: "Public Showcase", icon: BookOpen },
    { id: "admin", label: "Admin Console", icon: ShieldCheck },
  ];

  return (
    <aside
      onClick={() => {
        if (!isExpanded && onToggleExpand) {
          onToggleExpand();
        }
      }}
      className={`group/sidebar fixed top-3 bottom-3 left-3 z-50 flex flex-col ${
        isExpanded ? "w-[244px]" : "w-[64px] hover:w-[244px]"
      } bg-[#f1f5f9]/95 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-md shadow-slate-900/5 hover:shadow-xl transition-[width,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] select-none overflow-x-hidden overflow-y-auto motion-reduce:transition-none p-2`}
      aria-label="Sidebar Navigation"
    >
      {/* 1. Brand Logo Header */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setActiveView("home");
        }}
        title="PROBLEMTRACE - Verifiable Solutions"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setActiveView("home");
          }
        }}
        className="w-full h-11 flex items-center rounded-xl hover:bg-white/80 cursor-pointer transition-all overflow-hidden focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-hidden mb-1.5 shrink-0"
      >
        <div className="w-[48px] h-11 shrink-0 flex items-center justify-center">
          <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-teal-400 shadow-2xs group-hover/sidebar:scale-105 transition-transform duration-200">
            <Network className="w-4 h-4" />
          </div>
        </div>
        <div
          className={`ml-1 min-w-0 transition-all duration-200 delay-50 overflow-hidden whitespace-nowrap ${
            isExpanded
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-2 group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-0"
          }`}
        >
          <span className="text-xs font-bold tracking-[0.14em] text-slate-900 block leading-tight">
            PROBLEMTRACE
          </span>
          <span className="text-[9px] font-semibold text-teal-700 tracking-wider uppercase block">
            Verifiable Solutions
          </span>
        </div>
      </div>

      {/* 2. Refined Centered Create (+) Button with Animation */}
      <div className="mb-2.5 w-full shrink-0 group/create">
        <button
          onClick={(e) => {
            e.stopPropagation();
            openCreateModal();
          }}
          title="Create Post"
          aria-label="Create Post"
          className="w-full h-10 flex items-center rounded-xl bg-teal-600 hover:bg-teal-500 active:scale-95 text-white font-semibold shadow-xs shadow-teal-600/25 transition-all overflow-hidden focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-hidden"
        >
          <div className="w-[48px] h-10 shrink-0 flex items-center justify-center">
            <Plus className="w-4 h-4 text-white stroke-[2.5] group-hover/create:rotate-90 transition-transform duration-300" />
          </div>
          <span
            className={`transition-all duration-200 delay-50 whitespace-nowrap overflow-hidden text-xs font-bold text-white pr-2 ${
              isExpanded
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-2 group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-0"
            }`}
          >
            Create Post
          </span>
        </button>
      </div>

      {/* 3. Primary Navigation Items */}
      <nav className="space-y-1 shrink-0" aria-label="Main Navigation">
        {primaryNav.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={(e) => {
                e.stopPropagation();
                setActiveView(item.id);
              }}
              title={item.label}
              aria-label={item.label}
              className={`w-full h-10 flex items-center rounded-xl text-xs transition-all overflow-hidden relative focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-hidden ${
                isActive
                  ? "bg-white text-slate-900 font-semibold shadow-2xs border border-slate-200/80"
                  : "text-slate-600 hover:bg-white/70 hover:text-slate-900"
              }`}
            >
              {/* Active Indicator Accent Bar */}
              {isActive && (
                <div className="absolute left-0.5 top-2 bottom-2 w-1 rounded-full bg-teal-600 transition-all duration-200" />
              )}

              {/* Centered Icon Container (Fixed 48px width) */}
              <div className="w-[48px] h-10 shrink-0 flex items-center justify-center relative">
                <Icon
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isActive ? "text-teal-600 scale-105" : "text-slate-500 group-hover/sidebar:text-slate-800"
                  }`}
                />
                {/* Collapsed notification/message dot indicator */}
                {item.badge && item.badge > 0 ? (
                  <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-teal-500 ring-2 ring-white group-hover/sidebar:hidden" />
                ) : null}
              </div>

              {/* Expanded Label & Pill Badge */}
              <div
                className={`flex-1 min-w-0 pr-2.5 flex items-center justify-between transition-all duration-200 delay-50 overflow-hidden whitespace-nowrap ${
                  isExpanded
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2 group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-0"
                }`}
              >
                <span className="truncate">{item.label}</span>
                {item.badge && item.badge > 0 ? (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-teal-500 text-white leading-none">
                    {item.badge}
                  </span>
                ) : null}
              </div>
            </button>
          );
        })}
      </nav>

      {/* 4. Research & Verification Tools Divider */}
      <div className="mt-2.5 pt-2.5 border-t border-slate-200/60 shrink-0">
        <div className="w-full h-4 flex items-center overflow-hidden mb-1">
          <div className="w-[48px] shrink-0 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-teal-600/80" />
          </div>
          <span
            className={`text-[9px] font-bold uppercase tracking-wider text-slate-400 transition-all duration-200 delay-50 whitespace-nowrap overflow-hidden ${
              isExpanded
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-2 group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-0"
            }`}
          >
            Research Tools
          </span>
        </div>

        <div className="space-y-1">
          {analysisTools.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveView(item.id);
                }}
                title={item.label}
                aria-label={item.label}
                className={`w-full h-9 flex items-center rounded-xl text-xs transition-all overflow-hidden relative focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-hidden ${
                  isActive
                    ? "bg-white text-teal-950 font-semibold shadow-2xs border border-teal-200/70"
                    : "text-slate-600 hover:bg-white/70 hover:text-slate-900"
                }`}
              >
                {isActive && (
                  <div className="absolute left-0.5 top-1.5 bottom-1.5 w-1 rounded-full bg-teal-600 transition-all duration-200" />
                )}
                <div className="w-[48px] h-9 shrink-0 flex items-center justify-center">
                  <Icon
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isActive ? "text-teal-700 scale-105" : "text-slate-500 group-hover/sidebar:text-slate-800"
                    }`}
                  />
                </div>
                <div
                  className={`flex-1 min-w-0 pr-2.5 transition-all duration-200 delay-50 overflow-hidden whitespace-nowrap ${
                    isExpanded
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2 group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-0"
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. User Mini Profile at Bottom */}
      <div className="mt-auto pt-2.5 border-t border-slate-200/60 shrink-0">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setActiveView("profile");
          }}
          title={`${profile.name} (${profile.handle})`}
          role="button"
          tabIndex={0}
          aria-label="View User Profile"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setActiveView("profile");
            }
          }}
          className="w-full h-11 flex items-center rounded-xl hover:bg-white/80 cursor-pointer transition-all overflow-hidden focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-hidden"
        >
          <div className="w-[48px] h-11 shrink-0 flex items-center justify-center">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-7 h-7 rounded-full object-cover ring-2 ring-teal-500/30 hover:ring-teal-500/60 transition"
            />
          </div>
          <div
            className={`flex-1 min-w-0 pr-2 transition-all duration-200 delay-50 overflow-hidden whitespace-nowrap ${
              isExpanded
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-2 group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-0"
            }`}
          >
            <p className="text-xs font-bold text-slate-900 truncate">
              {profile.name}
            </p>
            <p className="text-[10px] text-slate-500 truncate">{profile.handle}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
