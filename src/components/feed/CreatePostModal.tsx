"use client";

import React, { useState } from "react";
import {
  X,
  Plus,
  Image as ImageIcon,
  Tag,
  Shield,
  MapPin,
  Check,
  Sparkles,
  Layers,
  Upload
} from "lucide-react";
import { PostItem, UserProfile } from "@/types";
import { useToast } from "@/components/ui/Toast";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onAddPost: (newPost: PostItem) => void;
}

export function CreatePostModal({
  isOpen,
  onClose,
  profile,
  onAddPost,
}: CreatePostModalProps) {
  const { showToast } = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Energy Storage · Healthcare");
  const [status, setStatus] = useState<"Open" | "Exploring" | "In Validation">("Open");
  const [location, setLocation] = useState("Delft, Netherlands · Global Commons");

  // Selected preset image or custom URL
  const sampleImages = [
    {
      name: "Thermal Finite Element Model",
      url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&auto=format&fit=crop&q=80",
    },
    {
      name: "Tidal Submerged Turbine Array",
      url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1000&auto=format&fit=crop&q=80",
    },
    {
      name: "Nanotech Silicon Surface AFM",
      url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&auto=format&fit=crop&q=80",
    },
    {
      name: "Bio-Composite Microstructure SEM",
      url: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=1000&auto=format&fit=crop&q=80",
    },
    {
      name: "Cryogenic Phase Change Matrix",
      url: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=1000&auto=format&fit=crop&q=80",
    },
    {
      name: "Autonomous Sensor Array",
      url: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=1000&auto=format&fit=crop&q=80",
    },
  ];

  const [selectedImage, setSelectedImage] = useState(sampleImages[0].url);
  const [imageCaption, setImageCaption] = useState(sampleImages[0].name);

  // Constraints
  const [constraints, setConstraints] = useState([
    { label: "Target Duration", value: "72 Hours" },
    { label: "Max Unit Cost", value: "< $35" },
    { label: "Ambient Temp", value: "-10°C to +48°C" },
  ]);
  const [newConstraintLabel, setNewConstraintLabel] = useState("");
  const [newConstraintValue, setNewConstraintValue] = useState("");

  // Skills
  const [skills, setSkills] = useState(["#ThermalDynamics", "#PhaseChangeMaterials"]);
  const [skillInput, setSkillInput] = useState("");

  if (!isOpen) return null;

  const handleAddConstraint = () => {
    if (newConstraintLabel.trim() && newConstraintValue.trim()) {
      setConstraints((prev) => [
        ...prev,
        { label: newConstraintLabel.trim(), value: newConstraintValue.trim() },
      ]);
      setNewConstraintLabel("");
      setNewConstraintValue("");
    }
  };

  const handleRemoveConstraint = (index: number) => {
    setConstraints((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      const formatted = skillInput.trim().startsWith("#")
        ? skillInput.trim()
        : `#${skillInput.trim()}`;
      if (!skills.includes(formatted)) {
        setSkills((prev) => [...prev, formatted]);
      }
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      showToast("Please enter a problem title and description", "error");
      return;
    }

    const newPost: PostItem = {
      id: `post-${Date.now()}`,
      author: {
        name: profile.name,
        handle: profile.handle,
        role: profile.role,
        institution: profile.institution,
        avatar: profile.avatar,
        verified: true,
      },
      timestamp: "Just now",
      category,
      status,
      title: title.trim(),
      description: description.trim(),
      image: selectedImage,
      imageCaption: imageCaption || "Technical schematic submitted with verification parameters.",
      skills: skills.length > 0 ? skills : ["#OpenResearch"],
      constraints: constraints.length > 0 ? constraints : [{ label: "Target Scope", value: "Open Spec" }],
      cdevMatch: {
        score: Math.floor(Math.random() * 20) + 78,
        reference: "Historical CDEV Library Candidate",
        targetId: "cdev",
      },
      likesCount: 1,
      isLiked: true,
      isSaved: false,
      commentsCount: 0,
      comments: [],
      location,
    };

    onAddPost(newPost);
    showToast("Problem post published to the social network!", "success");
    onClose();

    // Reset form
    setTitle("");
    setDescription("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-700 flex items-center justify-center font-bold">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Create Problem Post</h2>
              <p className="text-xs text-slate-500">Publish to the scientific commons</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Author preview */}
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-xs font-bold text-slate-900">{profile.name}</p>
              <p className="text-[11px] text-slate-500">
                Publishing as verified lead investigator
              </p>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Problem Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Passive Cold-Chain Vacuum Buffer for Vaccines in High Ambient Heat"
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
            />
          </div>

          {/* Category & Status Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:border-teal-500 outline-none"
              >
                <option value="Energy Storage · Healthcare">Energy Storage · Healthcare</option>
                <option value="Marine · Robotics">Marine · Robotics</option>
                <option value="Semiconductors · Clean Chem">Semiconductors · Clean Chem</option>
                <option value="Materials · Agriculture">Materials · Agriculture</option>
                <option value="Distributed Systems · AI">Distributed Systems · AI</option>
                <option value="Biomedical Hardware">Biomedical Hardware</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Initial Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:border-teal-500 outline-none"
              >
                <option value="Open">Open for Collaboration</option>
                <option value="Exploring">Exploring Historical Lineage</option>
                <option value="In Validation">In Proof Validation</option>
              </select>
            </div>
          </div>

          {/* Problem Description */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Problem Description & Methodology *
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the operational challenge, physical constraints, boundary conditions, and what kind of historical solution or domain evidence you seek..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Image / Attachment Selection */}
          <div>
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-teal-600" />
              <span>Technical Visual / Diagram</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {sampleImages.map((img, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedImage(img.url);
                    setImageCaption(img.name);
                  }}
                  className={`relative rounded-xl overflow-hidden aspect-video cursor-pointer border-2 transition ${
                    selectedImage === img.url
                      ? "border-teal-600 ring-2 ring-teal-500/20"
                      : "border-slate-200 hover:border-slate-400"
                  }`}
                >
                  <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                  {selectedImage === img.url && (
                    <div className="absolute inset-0 bg-teal-600/30 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              Selected: <strong className="text-slate-700">{imageCaption}</strong>
            </p>
          </div>

          {/* Constraints Specification */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-teal-600" />
                <span>Specify Hard Constraints</span>
              </label>
              <span className="text-[11px] text-slate-500">Target metrics</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {constraints.map((c, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 shadow-2xs"
                >
                  <strong className="text-slate-600">{c.label}:</strong> {c.value}
                  <button
                    type="button"
                    onClick={() => handleRemoveConstraint(idx)}
                    className="text-slate-400 hover:text-red-600 ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder="Label (e.g. Unit Cost)"
                value={newConstraintLabel}
                onChange={(e) => setNewConstraintLabel(e.target.value)}
                className="w-1/3 text-xs p-2 rounded-lg border border-slate-200 bg-white"
              />
              <input
                type="text"
                placeholder="Value (e.g. < $50)"
                value={newConstraintValue}
                onChange={(e) => setNewConstraintValue(e.target.value)}
                className="flex-1 text-xs p-2 rounded-lg border border-slate-200 bg-white"
              />
              <button
                type="button"
                onClick={handleAddConstraint}
                className="px-3 py-2 bg-slate-800 text-white rounded-lg text-xs font-medium hover:bg-slate-700 transition"
              >
                Add
              </button>
            </div>
          </div>

          {/* Required Skills / Tags */}
          <div>
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1.5">
              <Tag className="w-3.5 h-3.5 text-teal-600" />
              <span>Required Skills / Disciplines</span>
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 text-xs font-medium"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add tag (e.g. #Microfluidics, #ThermalDynamics)"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-medium transition"
              >
                Add Tag
              </button>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>Location / Laboratory</span>
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Delft, Netherlands · Global Field Sites"
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Persists immediately in your local workspace.
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm"
              >
                Publish Problem Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

