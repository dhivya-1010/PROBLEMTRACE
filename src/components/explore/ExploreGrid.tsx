"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Sparkles,
  ShieldCheck,
  ArrowUpRight,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  Layers,
  MapPin
} from "lucide-react";
import { PostItem } from "@/types";
import { PostDetailModal } from "./PostDetailModal";
import { useToast } from "@/components/ui/Toast";

interface ExploreGridProps {
  posts: PostItem[];
  onExpressInterest: (post: PostItem) => void;
  onNavigateAction: (view: string) => void;
  onToggleLike: (postId: string) => void;
  onToggleSave: (postId: string) => void;
  onAddComment: (postId: string, comment: string) => void;
}

interface ExploreCardProps {
  post: PostItem;
  onSelectPost: (post: PostItem) => void;
  onExpressInterest: (post: PostItem) => void;
  onNavigateAction: (view: string) => void;
  onToggleLike: (postId: string) => void;
  onToggleSave: (postId: string) => void;
}

function ExploreCard({
  post,
  onSelectPost,
  onExpressInterest,
  onNavigateAction,
  onToggleLike,
  onToggleSave,
}: ExploreCardProps) {
  const { showToast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLikedAnimation, setIsLikedAnimation] = useState(false);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLikedAnimation(true);
    setTimeout(() => setIsLikedAnimation(false), 350);
    onToggleLike(post.id);
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSave(post.id);
    showToast(post.isSaved ? "Removed from saved items" : "Problem saved to bookmarks", "info");
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`https://problemtrace.org/problem/${post.id}`);
    }
    showToast("Problem brief link copied to clipboard", "success");
  };

  const statusColors = {
    Open: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Exploring: "bg-sky-50 text-sky-700 border-sky-200",
    "In Validation": "bg-amber-50 text-amber-700 border-amber-200",
    Solved: "bg-teal-50 text-teal-800 border-teal-300 font-semibold",
  };

  return (
    <article className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col">
      {/* 1. Technical Media / Image Header with Instagram-style Hover Overlay */}
      <div
        onClick={() => onSelectPost(post)}
        className="relative w-full aspect-16/10 bg-slate-950 overflow-hidden group/img cursor-pointer shrink-0"
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
          <span className="text-[10px] uppercase font-bold tracking-wider text-teal-300 bg-slate-900/85 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-teal-500/30">
            {post.category}
          </span>
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border backdrop-blur-xs ${
              statusColors[post.status] || "bg-slate-900/80 text-white border-slate-700"
            }`}
          >
            {post.status}
          </span>
        </div>

        {/* CDEV Match Badge on Bottom Left of Image */}
        {post.cdevMatch && (
          <div className="absolute bottom-2.5 left-3 z-10 pointer-events-none inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-900/85 backdrop-blur-xs text-teal-300 border border-teal-500/30 text-[11px] font-bold">
            <Sparkles className="w-3 h-3 text-teal-400" />
            <span>{post.cdevMatch.score}% CDEV Match</span>
          </div>
        )}

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-3 text-white p-4 text-center z-20">
          <div className="flex items-center gap-5 text-sm font-bold">
            <div className="flex items-center gap-1.5">
              <Heart className={`w-4 h-4 ${post.isLiked ? "fill-teal-400 text-teal-400" : "fill-white text-white"}`} />
              <span>{post.likesCount}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 fill-white text-white" />
              <span>{post.commentsCount + post.comments.length}</span>
            </div>
          </div>
          <span className="text-xs text-teal-300 flex items-center gap-1 font-semibold mt-1 bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs">
            Inspect Full Specification <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* 2. Card Content Area (Natural independent height based on content) */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Author & Institution */}
        <div className="flex items-center gap-2.5">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-slate-900 truncate">
                {post.author.name}
              </span>
              {post.author.verified && (
                <CheckCircle2 className="w-3 h-3 text-teal-600 shrink-0" />
              )}
            </div>
            <p className="text-[11px] text-slate-500 truncate leading-tight">
              {post.author.institution}
            </p>
          </div>
          <span className="text-[10px] text-slate-400 shrink-0">
            {post.timestamp}
          </span>
        </div>

        {/* Problem Title */}
        <h3
          onClick={() => onSelectPost(post)}
          className="text-sm sm:text-base font-bold text-slate-900 mt-2.5 leading-snug hover:text-teal-700 cursor-pointer transition"
        >
          {post.title}
        </h3>

        {/* Problem Description (Natural height: clamped when collapsed, full when expanded) */}
        <p className={`text-xs text-slate-600 mt-2 leading-relaxed ${isExpanded ? "" : "line-clamp-2"}`}>
          {post.description}
        </p>

        {/* Skills Tag Pills */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {(isExpanded ? post.skills : post.skills.slice(0, 3)).map((skill, idx) => (
            <span
              key={idx}
              className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md"
            >
              {skill}
            </span>
          ))}
          {!isExpanded && post.skills.length > 3 && (
            <span className="text-[10px] text-slate-400 font-semibold px-1 py-0.5">
              +{post.skills.length - 3} more
            </span>
          )}
        </div>

        {/* 3. Smooth Dynamic Card Expansion (Only this card expands) */}
        <div className={`masonry-accordion ${isExpanded ? "masonry-accordion-open mt-3.5" : "masonry-accordion-closed mt-0"}`}>
          <div className="masonry-accordion-inner space-y-3">
            {/* Physical Constraints Table */}
            {post.constraints && post.constraints.length > 0 && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Layers className="w-3 h-3 text-teal-600" />
                    Physical Constraints & Targets
                  </span>
                </div>
                <div className="space-y-1.5">
                  {post.constraints.map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-[11px] bg-white px-2.5 py-1.5 rounded-lg border border-slate-200/70"
                    >
                      <span className="text-slate-600 font-medium truncate pr-2">{c.label}</span>
                      <span className="font-semibold text-slate-900 shrink-0">{c.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Metadata in Expanded View */}
            <div className="text-[11px] text-slate-500 space-y-1 bg-teal-50/50 p-2.5 rounded-xl border border-teal-100/70">
              {post.cdevMatch && (
                <div className="flex items-center justify-between">
                  <span className="text-teal-900 font-medium">Prior Art Reference:</span>
                  <span className="font-bold text-teal-800">{post.cdevMatch.reference}</span>
                </div>
              )}
              {post.location && (
                <div className="flex items-center gap-1 text-slate-500">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{post.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4. Card Expansion Toggle Button */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3.5 w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-teal-50/70 border border-slate-200/80 text-xs font-semibold text-slate-700 hover:text-teal-800 flex items-center justify-between transition-colors"
        >
          <span>{isExpanded ? "Collapse specification" : "Expand specification & constraints"}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-teal-600 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* 5. Card Footer Actions */}
      <div className="p-3 px-4 sm:px-5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Like Button */}
          <button
            onClick={handleLikeClick}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold transition ${
              post.isLiked
                ? "text-rose-600 bg-rose-50"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Heart
              className={`w-4 h-4 transition-transform ${
                isLikedAnimation ? "scale-125" : ""
              } ${post.isLiked ? "fill-rose-500 text-rose-500" : ""}`}
            />
            <span>{post.likesCount}</span>
          </button>

          {/* Comment Button */}
          <button
            onClick={() => onSelectPost(post)}
            className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{post.commentsCount + post.comments.length}</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={handleSaveClick}
            className={`p-1.5 rounded-lg transition ${
              post.isSaved
                ? "text-teal-600 bg-teal-50"
                : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Bookmark className={`w-4 h-4 ${post.isSaved ? "fill-teal-600" : ""}`} />
          </button>

          {/* Share Button */}
          <button
            onClick={handleShareClick}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Collaborate / Express Interest Action */}
        <button
          onClick={() => onExpressInterest(post)}
          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-[#1a365d] active:scale-95 text-white text-xs font-semibold flex items-center gap-1 shadow-2xs transition"
        >
          <span>Collaborate</span>
          <ArrowRight className="w-3 h-3 text-teal-400" />
        </button>
      </div>
    </article>
  );
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

  // Responsive Masonry column count: 1 on mobile, 2 on tablet, 3 on desktop
  const [columnCount, setColumnCount] = useState(3);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setColumnCount(1);
      } else if (width < 1024) {
        setColumnCount(2);
      } else {
        setColumnCount(3);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

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

  // Distribute filtered posts across columns in logical reading order
  const columns = useMemo(() => {
    const cols: PostItem[][] = Array.from({ length: columnCount }, () => []);
    filteredPosts.forEach((post, index) => {
      cols[index % columnCount].push(post);
    });
    return cols;
  }, [filteredPosts, columnCount]);

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
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-teal-500 transition"
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

      {/* Responsive Masonry Grid (CSS Grid with independent masonry columns) */}
      <div
        className={`grid gap-6 items-start ${
          columnCount === 1
            ? "grid-cols-1"
            : columnCount === 2
            ? "grid-cols-2"
            : "grid-cols-3"
        }`}
      >
        {columns.map((colPosts, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-6 min-w-0">
            {colPosts.map((post) => (
              <ExploreCard
                key={post.id}
                post={post}
                onSelectPost={setSelectedPost}
                onExpressInterest={onExpressInterest}
                onNavigateAction={onNavigateAction}
                onToggleLike={onToggleLike}
                onToggleSave={onToggleSave}
              />
            ))}
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
