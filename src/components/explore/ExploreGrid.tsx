"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Heart,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Layers,
  ArrowUpRight
} from "lucide-react";
import { PostItem } from "@/types";
import { PostDetailModal } from "./PostDetailModal";

interface ExploreGridProps {
  posts: PostItem[];
  onExpressInterest: (post: PostItem) => void;
  onNavigateAction: (view: string) => void;
  onToggleLike: (postId: string) => void;
  onToggleSave: (postId: string) => void;
  onAddComment: (postId: string, comment: string) => void;
}

export function ExploreGrid({
  posts,
  onExpressInterest,
  onNavigateAction,
  onToggleLike,
  onToggleSave,
  onAddComment,
}: ExploreGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);

  const categories = [
    "All",
    "Energy Storage",
    "Marine & Robotics",
    "Semiconductors",
    "Materials & Ag",
    "Biomedical",
    "CleanTech",
  ];

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === "All" ||
        p.category.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  return (
    <div className="w-full space-y-6">
      {/* Top Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs space-y-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problems, patents, physical constraints, or skills..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 transition"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Discovery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredPosts.map((post, idx) => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className={`group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-2xs hover:shadow-md cursor-pointer transition-all duration-300 ${
              idx === 0 || idx === 3 ? "sm:col-span-2 aspect-21/9" : "aspect-square"
            }`}
          >
            {/* Image */}
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Subtle Gradient Always Visible at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

            {/* Static Card Details */}
            <div className="absolute bottom-3 inset-x-3.5 z-10 text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider text-teal-400 bg-black/40 px-2 py-0.5 rounded-md inline-block mb-1">
                {post.category}
              </span>
              <h3 className="text-sm font-bold leading-snug line-clamp-2">
                {post.title}
              </h3>
              <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-300">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  {post.author.institution}
                </span>
                <span className="bg-teal-900/60 text-teal-300 font-semibold px-2 py-0.5 rounded-md border border-teal-500/30">
                  {post.status}
                </span>
              </div>
            </div>

            {/* Instagram-style Hover Overlay with Likes & Comments */}
            <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-4 text-white p-4 text-center z-20">
              <div className="flex items-center gap-6 text-sm font-bold">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 fill-white" />
                  <span>{post.likesCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>{post.commentsCount + post.comments.length}</span>
                </div>
              </div>
              {post.cdevMatch && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{post.cdevMatch.score}% CDEV Match</span>
                </div>
              )}
              <span className="text-xs text-slate-300 flex items-center gap-1 mt-1">
                Inspect Specification <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
          <p className="text-base font-semibold text-slate-700">No matching problem briefs found</p>
          <p className="text-xs text-slate-500 mt-1">Try searching for other domain constraints or keywords</p>
        </div>
      )}

      {/* Post Detail Modal */}
      <PostDetailModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onExpressInterest={onExpressInterest}
        onNavigateAction={onNavigateAction}
        onToggleLike={onToggleLike}
        onToggleSave={onToggleSave}
        onAddComment={onAddComment}
      />
    </div>
  );
}

