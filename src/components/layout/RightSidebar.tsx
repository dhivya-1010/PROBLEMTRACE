"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Award,
  Users2,
  Sparkles,
  ExternalLink,
  Check,
  Compass,
  ArrowRight
} from "lucide-react";
import {
  mockBuilders,
  mockTrending,
  mockRecommendedSolutions
} from "@/data/mockData";
import { BuilderItem, UserProfile } from "@/types";
import { useToast } from "@/components/ui/Toast";

interface RightSidebarProps {
  profile: UserProfile;
  setActiveView: (view: string) => void;
  onSelectTag?: (tag: string) => void;
}

export function RightSidebar({ profile, setActiveView, onSelectTag }: RightSidebarProps) {
  const { showToast } = useToast();
  const [builders, setBuilders] = useState<BuilderItem[]>(mockBuilders);

  const toggleFollow = (id: string, name: string) => {
    setBuilders((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          const nextState = !b.isFollowing;
          showToast(
            nextState ? `You are now following ${name}` : `Unfollowed ${name}`,
            "info"
          );
          return { ...b, isFollowing: nextState };
        }
        return b;
      })
    );
  };

  const communities = [
    { name: "CleanEnergy Hardware", members: "4.2k researchers", tag: "Energy" },
    { name: "Marine & Robotics Commons", members: "1.8k engineers", tag: "Robotics" },
    { name: "Semiconductor Decarbonization", members: "950 specialists", tag: "Semiconductors" },
    { name: "Bio-Composite Packaging", members: "2.6k material scientists", tag: "Materials" },
  ];

  return (
    <aside className="hidden xl:block w-80 2xl:w-88 pl-6 py-6 space-y-6 select-none">
      {/* Current User Quick Snapshot */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div
          onClick={() => setActiveView("profile")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-teal-500/30 group-hover:ring-teal-500 transition"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition">
                {profile.name}
              </span>
            </div>
            <span className="text-xs text-slate-500 block">{profile.handle}</span>
          </div>
        </div>
        <button
          onClick={() => setActiveView("profile")}
          className="text-xs font-semibold text-teal-600 hover:text-teal-700 transition"
        >
          View Profile
        </button>
      </div>

      {/* Suggested Builders */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-slate-700">
            <Users2 className="w-4 h-4 text-teal-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Suggested Builders
            </h3>
          </div>
          <button
            onClick={() => setActiveView("explore")}
            className="text-xs font-medium text-slate-500 hover:text-slate-800 transition"
          >
            See All
          </button>
        </div>

        <div className="space-y-3">
          {builders.map((builder) => (
            <div
              key={builder.id}
              className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-white transition border border-transparent hover:border-slate-200"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={builder.avatar}
                  alt={builder.name}
                  className="w-9 h-9 rounded-full object-cover shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-900 truncate">
                    {builder.name}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    {builder.domain}
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleFollow(builder.id, builder.name)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg shrink-0 transition ${
                  builder.isFollowing
                    ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    : "bg-slate-900 text-white hover:bg-slate-800 shadow-sm"
                }`}
              >
                {builder.isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Problems */}
      <div className="pt-2 border-t border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-teal-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Trending Problems
            </h3>
          </div>
          <button
            onClick={() => setActiveView("problems")}
            className="text-xs font-medium text-slate-500 hover:text-slate-800 transition"
          >
            Explore
          </button>
        </div>

        <div className="space-y-2.5">
          {mockTrending.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => {
                if (onSelectTag) onSelectTag(item.tag);
                setActiveView("problems");
              }}
              className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-teal-500/40 cursor-pointer transition shadow-2xs group"
            >
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-semibold text-teal-700">{item.tag}</span>
                <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                  #{idx + 1} Trending
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-800 mt-1 line-clamp-1 group-hover:text-teal-700 transition">
                {item.title}
              </p>
              <div className="mt-1.5 flex items-center justify-between text-[11px]">
                <span className="text-teal-600 font-medium">{item.matches}</span>
                <span className="text-slate-400">{item.postsCount} posts</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Solutions */}
      <div className="pt-2 border-t border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              CDEV Recommended
            </h3>
          </div>
          <button
            onClick={() => setActiveView("cdev")}
            className="text-xs font-semibold text-teal-600 hover:text-teal-700 transition"
          >
            Analysis →
          </button>
        </div>

        <div className="space-y-2.5">
          {mockRecommendedSolutions.map((sol) => (
            <div
              key={sol.id}
              onClick={() => setActiveView("cdev")}
              className="p-3 rounded-xl bg-slate-900 text-white cursor-pointer hover:bg-slate-800 transition shadow-sm group"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-teal-400 font-bold">{sol.matchScore}% Match</span>
                <span className="text-slate-400">{sol.year}</span>
              </div>
              <p className="text-xs font-semibold text-slate-100 mt-1 line-clamp-1 group-hover:text-teal-300 transition">
                {sol.title}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">{sol.domain}</p>
              <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                <span>{sol.proofCount} Validated Proofs</span>
                <span className="text-teal-300 font-medium flex items-center gap-1">
                  Inspect <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Communities */}
      <div className="pt-2 border-t border-slate-200">
        <div className="flex items-center gap-1.5 mb-3">
          <Compass className="w-4 h-4 text-teal-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Active Communities
          </h3>
        </div>

        <div className="space-y-2">
          {communities.map((comm) => (
            <div
              key={comm.name}
              onClick={() => {
                if (onSelectTag) onSelectTag(comm.tag);
                showToast(`Filtered feed by #${comm.tag}`, "info");
              }}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-white cursor-pointer transition border border-transparent hover:border-slate-200"
            >
              <div>
                <p className="text-xs font-semibold text-slate-800 hover:text-teal-700 transition">
                  {comm.name}
                </p>
                <p className="text-[11px] text-slate-500">{comm.members}</p>
              </div>
              <span className="text-xs font-medium text-teal-600">Join</span>
            </div>
          ))}
        </div>
      </div>

      {/* Micro Footer */}
      <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-400 leading-relaxed">
        <p>© 2026 PROBLEMTRACE · Every Problem Has a History.</p>
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-[11px] text-slate-500">
          <span className="hover:text-slate-800 cursor-pointer">CDEV Protocol</span>
          <span>·</span>
          <span className="hover:text-slate-800 cursor-pointer">Verification Standards</span>
          <span>·</span>
          <span className="hover:text-slate-800 cursor-pointer">Patent Lineage</span>
          <span>·</span>
          <span className="hover:text-slate-800 cursor-pointer">Open Research</span>
        </div>
      </div>
    </aside>
  );
}

