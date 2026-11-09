"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  MapPin,
  Settings,
  Grid,
  Bookmark,
  FolderGit2,
  Target,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Edit3
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { UserProfile, PostItem } from "@/types";
import { EditProfileModal } from "./EditProfileModal";

interface ProfileViewProps {
  profile: UserProfile;
  posts: PostItem[];
  onSaveProfile: (updated: UserProfile) => void;
  onSelectPost: (post: PostItem) => void;
  onNavigateAction: (view: string) => void;
}

export function ProfileView({
  profile,
  posts,
  onSaveProfile,
  onSelectPost,
  onNavigateAction,
}: ProfileViewProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"posts" | "projects" | "showcases" | "saved">("posts");

  const myPosts = posts.filter(
    (p) => p.author.handle === profile.handle || p.author.name === profile.name
  );
  const savedPosts = posts.filter((p) => p.isSaved);

  const projectsData = [
    {
      title: "Low-Cost Thermal Storage for Off-Grid Clinics",
      domain: "Healthcare Cold-Chains",
      progress: 68,
      members: 4,
      status: "Active Lab Phase",
      milestone: "Ultrasonic HDPE pouch leak test",
    },
    {
      title: "Sensorless Cavitation Detection on Tidal Turbines",
      domain: "Marine Energy",
      progress: 42,
      members: 6,
      status: "Validation Review",
      milestone: "Orkney frequency spectrogram data",
    },
    {
      title: "Bio-Composite Fresh Produce Barrier",
      domain: "Circular Materials",
      progress: 95,
      members: 5,
      status: "Showcase Published",
      milestone: "28-day soil biodegradation certified",
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar with ring */}
          <div className="relative group shrink-0">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-teal-500 via-sky-500 to-slate-900 shadow-md">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full rounded-full object-cover bg-white"
              />
            </div>
            <button
              onClick={() => setIsEditOpen(true)}
              className="absolute bottom-1 right-1 p-2 rounded-full bg-slate-900 text-white shadow hover:bg-slate-800 transition"
              title="Edit Profile"
            >
              <Edit3 className="w-4 h-4 text-teal-400" />
            </button>
          </div>

          {/* Details */}
          <div className="flex-1 text-center sm:text-left space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {profile.name}
                  </h1>
                  <CheckCircle2 className="w-5 h-5 text-teal-600 fill-teal-50" />
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                  {profile.handle} · <span className="text-teal-700">{profile.role}</span>
                </p>
                <p className="text-xs text-slate-600 font-medium">
                  {profile.institution}
                </p>
              </div>

              {/* Edit button */}
              <button
                onClick={() => setIsEditOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs shadow-2xs transition self-center sm:self-auto"
              >
                <Settings className="w-3.5 h-3.5 text-slate-500" />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* Metrics Counter */}
            <div className="flex items-center justify-center sm:justify-start gap-6 sm:gap-8 py-2 text-xs border-y border-slate-100">
              <div>
                <span className="font-bold text-slate-900 text-sm block">
                  {profile.problemsCount}
                </span>
                <span className="text-slate-500">Problems</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm block">
                  {profile.projectsCount}
                </span>
                <span className="text-slate-500">Projects</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm block">
                  {profile.solutionsCount}
                </span>
                <span className="text-slate-500">Solutions</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm block">
                  {profile.followersCount.toLocaleString()}
                </span>
                <span className="text-slate-500">Followers</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm block">
                  {profile.followingCount}
                </span>
                <span className="text-slate-500">Following</span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl">
              {profile.bio}
            </p>

            {/* Location & External Links */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-600 pt-1">
              {profile.location && (
                <span className="flex items-center gap-1 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-teal-600" />
                  {profile.location}
                </span>
              )}
              {profile.github && (
                <a
                  href={`https://${profile.github.replace("https://", "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 font-medium text-slate-700 hover:text-slate-900 hover:underline"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  {profile.github}
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={`https://${profile.linkedin.replace("https://", "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 font-medium text-blue-700 hover:text-blue-900 hover:underline"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  {profile.linkedin}
                </a>
              )}
            </div>

            {/* Skills */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-2">
              {profile.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium"
                >
                  #{skill.replace("#", "")}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
        <button
          onClick={() => setActiveTab("posts")}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 transition ${
            activeTab === "posts"
              ? "border-slate-900 text-slate-900"
              : "border-transparent hover:text-slate-800"
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Problem Briefs ({myPosts.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("projects")}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 transition ${
            activeTab === "projects"
              ? "border-slate-900 text-slate-900"
              : "border-transparent hover:text-slate-800"
          }`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span>Active Projects ({projectsData.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 transition ${
            activeTab === "saved"
              ? "border-slate-900 text-slate-900"
              : "border-transparent hover:text-slate-800"
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved ({savedPosts.length})</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "posts" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-sm cursor-pointer transition group"
            >
              <div className="aspect-video relative overflow-hidden bg-slate-950">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] font-bold text-white">
                  {post.status}
                </span>
              </div>
              <div className="p-4">
                <span className="text-[10px] uppercase font-bold text-teal-700 block mb-1">
                  {post.category}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-teal-700 transition">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {post.description}
                </p>
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>{post.likesCount} likes</span>
                  <span>{post.comments.length} comments</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "projects" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projectsData.map((proj, i) => (
            <div
              key={i}
              onClick={() => onNavigateAction("projects")}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-teal-500/40 cursor-pointer transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] mb-2">
                  <span className="text-teal-700 font-semibold">{proj.domain}</span>
                  <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 font-bold">
                    {proj.status}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2">
                  Next Milestone: <strong className="text-slate-700">{proj.milestone}</strong>
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                  <span className="text-slate-500">Verification Progress</span>
                  <span className="font-bold text-teal-700">{proj.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-600 rounded-full"
                    style={{ width: `${proj.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "saved" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-sm cursor-pointer transition group"
            >
              <div className="aspect-video relative overflow-hidden bg-slate-950">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-4">
                <span className="text-[10px] uppercase font-bold text-teal-700 block mb-1">
                  {post.category}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-teal-700 transition">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {post.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        profile={profile}
        onSaveProfile={onSaveProfile}
      />
    </div>
  );
}
