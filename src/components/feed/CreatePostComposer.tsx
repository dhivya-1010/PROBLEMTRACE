"use client";

import React from "react";
import { Image as ImageIcon, Shield, Tag, MapPin, PlusCircle } from "lucide-react";
import { UserProfile } from "@/types";

interface CreatePostComposerProps {
  profile: UserProfile;
  onClick: () => void;
}

export function CreatePostComposer({ profile, onClick }: CreatePostComposerProps) {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs mb-6 transition-all hover:border-slate-300">
      <div className="flex items-center gap-3">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 shrink-0"
        />
        <button
          onClick={onClick}
          className="flex-1 text-left px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 text-xs sm:text-sm font-medium border border-slate-200/80 transition"
        >
          Share a technical problem, constraint, or breakthrough...
        </button>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-1 flex-wrap">
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={onClick}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition"
          >
            <ImageIcon className="w-4 h-4 text-teal-600" />
            <span className="hidden sm:inline">Diagram / Spec</span>
          </button>
          <button
            onClick={onClick}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition"
          >
            <Shield className="w-4 h-4 text-sky-600" />
            <span className="hidden sm:inline">Constraints</span>
          </button>
          <button
            onClick={onClick}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition"
          >
            <Tag className="w-4 h-4 text-teal-600" />
            <span className="hidden sm:inline">Skills Required</span>
          </button>
          <button
            onClick={onClick}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition"
          >
            <MapPin className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Lab / Field</span>
          </button>
        </div>

        <button
          onClick={onClick}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition"
        >
          <PlusCircle className="w-3.5 h-3.5 text-teal-400" />
          <span>Post Brief</span>
        </button>
      </div>
    </div>
  );
}

