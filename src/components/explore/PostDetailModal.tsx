"use client";

import React, { useState } from "react";
import {
  X,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  CheckCircle2,
  Sparkles,
  MapPin,
  Send,
  ArrowRight,
  Shield
} from "lucide-react";
import { PostItem } from "@/types";
import { useToast } from "@/components/ui/Toast";

interface PostDetailModalProps {
  post: PostItem | null;
  onClose: () => void;
  onExpressInterest: (post: PostItem) => void;
  onNavigateAction: (view: string) => void;
  onToggleLike: (postId: string) => void;
  onToggleSave: (postId: string) => void;
  onAddComment: (postId: string, comment: string) => void;
}

export function PostDetailModal({
  post,
  onClose,
  onExpressInterest,
  onNavigateAction,
  onToggleLike,
  onToggleSave,
  onAddComment,
}: PostDetailModalProps) {
  const { showToast } = useToast();
  const [commentInput, setCommentInput] = useState("");

  if (!post) return null;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddComment(post.id, commentInput.trim());
    setCommentInput("");
    showToast("Comment submitted", "info");
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`https://problemtrace.org/problem/${post.id}`);
    }
    showToast("Link copied to clipboard", "success");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-5xl h-[88vh] max-h-[780px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-200">
        {/* Left: Image / Technical Diagram Panel */}
        <div className="w-full md:w-3/5 bg-slate-950 flex flex-col justify-center relative overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          {post.imageCaption && (
            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent text-[11px] text-slate-300">
              {post.imageCaption}
            </div>
          )}
        </div>

        {/* Right: Instagram-style interactive details & conversation stream */}
        <div className="w-full md:w-2/5 flex flex-col h-full bg-white border-t md:border-t-0 md:border-l border-slate-200">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
              />
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">
                  {post.author.name}
                </p>
                <p className="text-[11px] text-slate-500">{post.author.handle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable details and comments */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Title & Desc */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                {post.category}
              </span>
              <h2 className="text-sm font-bold text-slate-900 mt-1.5 leading-snug">
                {post.title}
              </h2>
              <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                {post.description}
              </p>
            </div>

            {/* Constraints */}
            {post.constraints && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1.5 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-teal-600" /> Hard Constraints
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {post.constraints.map((c, i) => (
                    <div key={i} className="text-[11px]">
                      <span className="text-slate-500 font-medium">{c.label}: </span>
                      <strong className="text-slate-800">{c.value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CDEV Match */}
            {post.cdevMatch && (
              <div className="p-2.5 rounded-xl bg-slate-900 text-white flex items-center justify-between text-xs">
                <div>
                  <span className="text-teal-400 font-bold block">
                    {post.cdevMatch.score}% CDEV Match
                  </span>
                  <span className="text-[10px] text-slate-300 truncate block">
                    {post.cdevMatch.reference}
                  </span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateAction("cdev");
                  }}
                  className="px-2.5 py-1 rounded bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-[11px] transition"
                >
                  Analyze
                </button>
              </div>
            )}

            {/* Comments List */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <span className="text-xs font-bold text-slate-700 block">
                Technical Comments ({post.comments.length})
              </span>
              {post.comments.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No comments yet.</p>
              ) : (
                post.comments.map((c) => (
                  <div key={c.id} className="text-xs space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">{c.author}</span>
                      <span className="text-[10px] text-slate-400">{c.timestamp}</span>
                    </div>
                    <p className="text-slate-600">{c.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Bottom Actions & Composer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onToggleLike(post.id)}
                  className={`flex items-center gap-1 text-xs font-semibold ${
                    post.isLiked ? "text-rose-600" : "text-slate-600"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      post.isLiked ? "fill-rose-600 stroke-rose-600" : ""
                    }`}
                  />
                  <span>{post.likesCount}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="text-slate-600 hover:text-slate-900"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onToggleSave(post.id)}
                  className={`${
                    post.isSaved ? "text-teal-600" : "text-slate-600"
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 ${
                      post.isSaved ? "fill-teal-600 stroke-teal-600" : ""
                    }`}
                  />
                </button>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onExpressInterest(post);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center gap-1"
              >
                <span>Express Interest</span>
                <ArrowRight className="w-3 h-3 text-teal-400" />
              </button>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="flex gap-2">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Add technical hypothesis..."
                className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-teal-500"
              />
              <button
                type="submit"
                disabled={!commentInput.trim()}
                className="px-3 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5 text-teal-400" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

