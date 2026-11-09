"use client";

import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  CheckCircle2,
  Sparkles,
  MapPin,
  Send,
  MoreHorizontal,
  ArrowRight,
  Shield,
  Layers,
  ChevronDown
} from "lucide-react";
import { PostItem } from "@/types";
import { useToast } from "@/components/ui/Toast";

interface PostCardProps {
  post: PostItem;
  onExpressInterest: (post: PostItem) => void;
  onNavigateAction: (view: string) => void;
  onToggleSave: (postId: string) => void;
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
}

export function PostCard({
  post,
  onExpressInterest,
  onNavigateAction,
  onToggleSave,
  onToggleLike,
  onAddComment,
}: PostCardProps) {
  const { showToast } = useToast();
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLikedAnimation, setIsLikedAnimation] = useState(false);

  const handleLike = () => {
    setIsLikedAnimation(true);
    setTimeout(() => setIsLikedAnimation(false), 400);
    onToggleLike(post.id);
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`https://problemtrace.org/problem/${post.id}`);
    }
    showToast("Problem link copied to clipboard!", "success");
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddComment(post.id, commentInput.trim());
    setCommentInput("");
    setShowComments(true);
    showToast("Comment published", "info");
  };

  const statusColors = {
    Open: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Exploring: "bg-sky-50 text-sky-700 border-sky-200",
    "In Validation": "bg-amber-50 text-amber-700 border-amber-200",
    Solved: "bg-teal-50 text-teal-800 border-teal-300 font-semibold",
  };

  return (
    <article className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all overflow-hidden mb-6">
      {/* Post Header */}
      <div className="p-4 sm:p-5 pb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-100"
            />
            {post.author.verified && (
              <div className="absolute -bottom-0.5 -right-0.5 bg-teal-600 text-white p-0.5 rounded-full ring-2 ring-white">
                <CheckCircle2 className="w-2.5 h-2.5 stroke-[3]" />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sm font-bold text-slate-900 hover:text-teal-700 cursor-pointer transition">
                {post.author.name}
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500 font-medium">
                {post.author.handle}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 line-clamp-1">
              {post.author.role} · {post.author.institution}
            </p>
            <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
              <span>{post.timestamp}</span>
              {post.location && (
                <>
                  <span>·</span>
                  <span className="flex items-center gap-0.5 text-slate-500">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {post.location}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-full border ${
              statusColors[post.status] || "bg-slate-50 text-slate-700 border-slate-200"
            }`}
          >
            {post.status}
          </span>
          <button
            onClick={() => showToast("Options menu opened", "info")}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category & Title */}
      <div className="px-4 sm:px-5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50/80 px-2 py-0.5 rounded-md inline-block mb-1.5">
          {post.category}
        </span>
        <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {post.title}
        </h2>
        <div className="text-sm text-slate-700 mt-2 leading-relaxed">
          <p className={isExpanded ? "" : "line-clamp-3"}>{post.description}</p>
          {post.description.length > 180 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-semibold text-teal-600 hover:text-teal-700 mt-1 inline-block"
            >
              {isExpanded ? "Show less" : "...read more"}
            </button>
          )}
        </div>
      </div>

      {/* Technical Media / Diagram */}
      {post.image && (
        <div className="mt-3.5 relative bg-slate-950 overflow-hidden group">
          <img
            src={post.image}
            alt={post.title}
            className="w-full max-h-[460px] object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          />
          {post.imageCaption && (
            <div className="p-2.5 bg-slate-900/90 backdrop-blur-xs border-t border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
              <span className="line-clamp-1 italic">{post.imageCaption}</span>
              <span className="text-[10px] uppercase font-bold text-teal-400 tracking-wider shrink-0 pl-3">
                Verifiable Spec
              </span>
            </div>
          )}
        </div>
      )}

      {/* Constraints Grid */}
      {post.constraints && post.constraints.length > 0 && (
        <div className="px-4 sm:px-5 mt-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
            <Shield className="w-3.5 h-3.5 text-teal-600" />
            <span>Target Constraints</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {post.constraints.map((c, idx) => (
              <div
                key={idx}
                className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 text-center"
              >
                <span className="text-[10px] text-slate-500 block uppercase font-medium">
                  {c.label}
                </span>
                <span className="text-xs font-bold text-slate-800 block mt-0.5 truncate">
                  {c.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CDEV Match Alert Banner */}
      {post.cdevMatch && (
        <div className="mx-4 sm:mx-5 mt-3 p-3 rounded-xl bg-slate-900 text-white flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-teal-300">
                  {post.cdevMatch.score}% CDEV Match Found
                </span>
              </div>
              <p className="text-[11px] text-slate-300 truncate">
                Prior Art: {post.cdevMatch.reference}
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateAction("cdev")}
            className="px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shrink-0 transition flex items-center gap-1"
          >
            <span>Review Diff</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Required Skills Tags */}
      {post.skills && post.skills.length > 0 && (
        <div className="px-4 sm:px-5 mt-3 flex flex-wrap gap-1.5">
          {post.skills.map((skill, i) => (
            <span
              key={i}
              className="text-[11px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md cursor-pointer transition"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Social Actions Bar */}
      <div className="px-4 sm:px-5 py-3.5 mt-2 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Like */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-xs font-semibold transition ${
              post.isLiked
                ? "text-rose-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Heart
              className={`w-5 h-5 transition-transform ${
                post.isLiked ? "fill-rose-600 stroke-rose-600 scale-110" : ""
              } ${isLikedAnimation ? "scale-125" : ""}`}
            />
            <span>{post.likesCount}</span>
          </button>

          {/* Comment */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{post.commentsCount + post.comments.length}</span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="text-slate-600 hover:text-slate-900 transition"
            title="Share Problem Brief"
          >
            <Share2 className="w-5 h-5" />
          </button>

          {/* Bookmark */}
          <button
            onClick={() => onToggleSave(post.id)}
            className={`transition ${
              post.isSaved
                ? "text-teal-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
            title="Save for Later"
          >
            <Bookmark
              className={`w-5 h-5 ${
                post.isSaved ? "fill-teal-600 stroke-teal-600" : ""
              }`}
            />
          </button>
        </div>

        {/* Express Interest Primary CTA */}
        <button
          onClick={() => onExpressInterest(post)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-[#1e3a5f] text-white text-xs font-bold shadow-sm transition hover:shadow"
        >
          <span>Express Interest</span>
          <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
        </button>
      </div>

      {/* Expandable Comments Drawer */}
      {showComments && (
        <div className="px-4 sm:px-5 py-4 bg-slate-50/70 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Technical Feedback ({post.comments.length})</span>
            <button
              onClick={() => setShowComments(false)}
              className="text-slate-400 hover:text-slate-600 text-[11px]"
            >
              Hide comments
            </button>
          </div>

          {/* Existing comments list */}
          <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
            {post.comments.length === 0 ? (
              <p className="text-xs text-slate-400 py-2 italic text-center">
                No technical reviews yet. Be the first researcher to contribute.
              </p>
            ) : (
              post.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={comment.avatar}
                        alt={comment.author}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <div>
                        <span className="font-bold text-slate-800">
                          {comment.author}
                        </span>
                        <span className="text-[10px] text-slate-400 ml-1.5">
                          {comment.role}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-slate-700 mt-1.5 leading-relaxed pl-8">
                    {comment.text}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Add Comment Input */}
          <form onSubmit={handleCommentSubmit} className="flex gap-2 pt-1">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Add technical hypothesis, prior art reference, or question..."
              className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-teal-500"
            />
            <button
              type="submit"
              disabled={!commentInput.trim()}
              className="px-3 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition"
            >
              <Send className="w-3.5 h-3.5 text-teal-400" />
              <span>Post</span>
            </button>
          </form>
        </div>
      )}
    </article>
  );
}

