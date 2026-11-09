"use client";

import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import { StoryItem } from "@/types";

interface StoryViewerModalProps {
  story: StoryItem | null;
  onClose: () => void;
  onNavigateAction: (view: string) => void;
}

export function StoryViewerModal({
  story,
  onClose,
  onNavigateAction,
}: StoryViewerModalProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setCurrentSlideIndex(0);
    setProgress(0);
  }, [story]);

  // Auto progression
  useEffect(() => {
    if (!story) return;
    const interval = 80;
    const totalDuration = 6000;
    const increment = (interval / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentSlideIndex < story.slides.length - 1) {
            setCurrentSlideIndex((c) => c + 1);
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [story, currentSlideIndex, onClose]);

  if (!story) return null;

  const currentSlide = story.slides[currentSlideIndex] || story.slides[0];

  const handleNext = () => {
    if (currentSlideIndex < story.slides.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
      setProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md h-[90vh] max-h-[780px] bg-slate-950 rounded-2xl overflow-hidden shadow-2xl flex flex-col text-white border border-slate-800">
        {/* Story Progress Bars */}
        <div className="absolute top-3 inset-x-3 z-30 flex gap-1.5">
          {story.slides.map((_, idx) => (
            <div
              key={idx}
              className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-white transition-all ease-linear"
                style={{
                  width:
                    idx < currentSlideIndex
                      ? "100%"
                      : idx === currentSlideIndex
                      ? `${progress}%`
                      : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Story Header */}
        <div className="absolute top-6 inset-x-4 z-30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={story.avatar}
              alt={story.title}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-teal-400"
            />
            <div>
              <p className="text-xs font-bold leading-tight flex items-center gap-1.5">
                {story.title}
                <span className="text-[10px] bg-teal-500/80 px-1.5 py-0.2 rounded-full font-medium">
                  {story.badge}
                </span>
              </p>
              <p className="text-[11px] text-slate-300">{story.category}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Background */}
        <div className="relative flex-1 w-full h-full">
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/50" />

          {/* Navigation Tap Zones */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-16 bottom-28 w-1/3 z-20 opacity-0 hover:opacity-100 flex items-center pl-3 transition text-white/70"
          >
            <span className="p-2 rounded-full bg-black/40 backdrop-blur">
              <ChevronLeft className="w-5 h-5" />
            </span>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-16 bottom-28 w-1/3 z-20 opacity-0 hover:opacity-100 flex items-center justify-end pr-3 transition text-white/70"
          >
            <span className="p-2 rounded-full bg-black/40 backdrop-blur">
              <ChevronRight className="w-5 h-5" />
            </span>
          </button>

          {/* Slide Content Overlay */}
          <div className="absolute bottom-4 inset-x-4 z-30 space-y-3">
            {currentSlide.stat && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-950/80 border border-teal-500/40 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-bold text-teal-300">
                  {currentSlide.stat}
                </span>
                {currentSlide.statLabel && (
                  <span className="text-[11px] text-slate-300 border-l border-teal-700/50 pl-2">
                    {currentSlide.statLabel}
                  </span>
                )}
              </div>
            )}

            <div>
              <p className="text-xs uppercase tracking-wider text-teal-400 font-semibold">
                {currentSlide.subtitle}
              </p>
              <h2 className="text-xl font-bold text-white mt-0.5 leading-snug">
                {currentSlide.title}
              </h2>
              <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                {currentSlide.description}
              </p>
            </div>

            {currentSlide.actionLabel && currentSlide.actionView && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateAction(currentSlide.actionView!);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition"
              >
                <span>{currentSlide.actionLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

