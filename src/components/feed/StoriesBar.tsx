"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { StoryItem, UserProfile } from "@/types";
import { StoryViewerModal } from "./StoryViewerModal";

interface StoriesBarProps {
  stories: StoryItem[];
  profile: UserProfile;
  openCreateModal: () => void;
  onNavigateAction: (view: string) => void;
}

export function StoriesBar({
  stories,
  profile,
  openCreateModal,
  onNavigateAction,
}: StoriesBarProps) {
  const [activeStory, setActiveStory] = useState<StoryItem | null>(null);
  const [viewedStoryIds, setViewedStoryIds] = useState<Set<string>>(new Set());

  const handleOpenStory = (story: StoryItem) => {
    setActiveStory(story);
    setViewedStoryIds((prev) => new Set(prev).add(story.id));
  };

  return (
    <>
      <div className="w-full bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs mb-6 overflow-hidden">
        <div className="flex items-center gap-4 overflow-x-auto pb-1 scrollbar-none">
          {/* User's own "Submit Problem Brief" ring */}
          <div
            onClick={openCreateModal}
            className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0 group select-none"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full p-0.5 border-2 border-dashed border-teal-500/70 group-hover:border-teal-600 transition">
                <img
                  src={profile.avatar}
                  alt="Your story"
                  className="w-full h-full rounded-full object-cover group-hover:scale-102 transition"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-teal-600 border-2 border-white flex items-center justify-center text-white shadow-sm">
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            </div>
            <span className="text-[11px] font-semibold text-slate-700 max-w-[70px] truncate text-center">
              New Brief
            </span>
          </div>

          {/* Community Stories */}
          {stories.map((story) => {
            const isViewed = viewedStoryIds.has(story.id);
            return (
              <div
                key={story.id}
                onClick={() => handleOpenStory(story)}
                className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0 group select-none"
              >
                <div
                  className={`w-16 h-16 rounded-full p-[2.5px] transition-transform group-hover:scale-105 ${
                    isViewed
                      ? "border-2 border-slate-300"
                      : "bg-gradient-to-tr from-teal-500 via-sky-500 to-[#1e3a5f]"
                  }`}
                >
                  <div className="w-full h-full rounded-full bg-white p-[2px]">
                    <img
                      src={story.avatar}
                      alt={story.title}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                <div className="max-w-[76px] text-center">
                  <span className="text-[11px] font-medium text-slate-800 truncate block leading-tight">
                    {story.title}
                  </span>
                  <span className="text-[9px] font-bold text-teal-600 tracking-tight block">
                    {story.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Story Viewer Modal */}
      <StoryViewerModal
        story={activeStory}
        onClose={() => setActiveStory(null)}
        onNavigateAction={onNavigateAction}
      />
    </>
  );
}

