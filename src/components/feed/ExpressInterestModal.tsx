"use client";

import React, { useState } from "react";
import { X, Send, Sparkles, CheckCircle2, ShieldCheck, Microscope } from "lucide-react";
import { PostItem } from "@/types";
import { useToast } from "@/components/ui/Toast";

interface ExpressInterestModalProps {
  post: PostItem | null;
  onClose: () => void;
}

export function ExpressInterestModal({ post, onClose }: ExpressInterestModalProps) {
  const { showToast } = useToast();
  const [selectedOfferings, setSelectedOfferings] = useState<string[]>([]);
  const [proposalText, setProposalText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!post) return null;

  const offerings = [
    "Laboratory & Thermal Test Chamber",
    "Finite Element Modeling & CAD",
    "Field Deployment / Clinical Site Access",
    "Formal Proof & Verification Review",
    "Material Supply & Composite Blending",
    "Patent & Prior Art Lineage Cross-check",
  ];

  const toggleOffering = (item: string) => {
    setSelectedOfferings((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      showToast(
        `Collaboration interest sent to ${post.author.name}! A private project channel was initiated.`,
        "success"
      );
      onClose();
      setSubmitted(false);
      setSelectedOfferings([]);
      setProposalText("");
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-slate-900">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-700 flex items-center justify-center font-bold">
              <Microscope className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Express Interest</h2>
              <p className="text-xs text-slate-500">Collaborate on this problem</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] uppercase font-bold tracking-wider text-teal-700 block">
              Target Challenge
            </span>
            <p className="text-xs font-semibold text-slate-900 mt-0.5 line-clamp-1">
              {post.title}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-5 h-5 rounded-full object-cover"
              />
              <span className="text-xs text-slate-600">
                Led by <strong className="text-slate-800">{post.author.name}</strong> ({post.author.institution})
              </span>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">
              What capabilities or evidence can you contribute?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {offerings.map((item) => {
                const isSelected = selectedOfferings.includes(item);
                return (
                  <button
                    type="button"
                    key={item}
                    onClick={() => toggleOffering(item)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-medium transition flex items-center justify-between ${
                      isSelected
                        ? "bg-teal-50 border-teal-500 text-teal-900 font-semibold"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>{item}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 ml-1.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Preliminary Proposal / Note
            </label>
            <textarea
              required
              rows={3}
              value={proposalText}
              onChange={(e) => setProposalText(e.target.value)}
              placeholder="Outline your methodology, lab availability, or relevant historical solution experience..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              Verified CDEV handshake protocol
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitted}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition shadow-sm"
              >
                <Send className="w-3.5 h-3.5 text-teal-400" />
                <span>{submitted ? "Sending..." : "Submit Collaboration Request"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

