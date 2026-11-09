"use client";

import React, { useState } from "react";
import { X, Check, Upload, User, Globe, MapPin, Tag } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { UserProfile } from "@/types";
import { useToast } from "@/components/ui/Toast";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSaveProfile: (updated: UserProfile) => void;
}

export function EditProfileModal({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}: EditProfileModalProps) {
  const { showToast } = useToast();

  const [name, setName] = useState(profile.name);
  const [handle, setHandle] = useState(profile.handle);
  const [role, setRole] = useState(profile.role);
  const [institution, setInstitution] = useState(profile.institution);
  const [bio, setBio] = useState(profile.bio);
  const [location, setLocation] = useState(profile.location);
  const [github, setGithub] = useState(profile.github);
  const [linkedin, setLinkedin] = useState(profile.linkedin);
  const [skillsText, setSkillsText] = useState(profile.skills.join(", "));
  const [avatar, setAvatar] = useState(profile.avatar);

  if (!isOpen) return null;

  const sampleAvatars = [
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=240&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=240&auto=format&fit=crop&q=80",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedSkills = skillsText
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const updated: UserProfile = {
      ...profile,
      name: name.trim(),
      handle: handle.trim().startsWith("@") ? handle.trim() : `@${handle.trim()}`,
      role: role.trim(),
      institution: institution.trim(),
      bio: bio.trim(),
      location: location.trim(),
      github: github.trim(),
      linkedin: linkedin.trim(),
      skills: parsedSkills.length > 0 ? parsedSkills : profile.skills,
      avatar,
    };

    onSaveProfile(updated);
    showToast("Profile updated and saved to local storage!", "success");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-teal-600" />
            <h2 className="text-sm font-bold text-slate-900">Edit Researcher Profile</h2>
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
          {/* Avatar selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">
              Profile Photo
            </label>
            <div className="flex items-center gap-4">
              <img
                src={avatar}
                alt="Selected avatar"
                className="w-16 h-16 rounded-full object-cover ring-2 ring-teal-500 shadow-sm shrink-0"
              />
              <div className="flex gap-2">
                {sampleAvatars.map((av, idx) => (
                  <img
                    key={idx}
                    src={av}
                    alt={`Option ${idx}`}
                    onClick={() => setAvatar(av)}
                    className={`w-10 h-10 rounded-full object-cover cursor-pointer border-2 transition ${
                      avatar === av ? "border-teal-600 scale-105" : "border-slate-200 opacity-60 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Name & Handle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Username Handle</label>
              <input
                type="text"
                required
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
              />
            </div>
          </div>

          {/* Role & Institution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Title / Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Institution / Org</label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-teal-500 outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
            />
          </div>

          {/* Skills (Comma separated) */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Skills & Disciplines (Comma separated)
            </label>
            <input
              type="text"
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              placeholder="e.g. Thermal Dynamics, Phase Change, ISO-13485"
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
            />
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1">
                <GithubIcon className="w-3.5 h-3.5 text-slate-700" /> GitHub URL / handle
              </label>
              <input
                type="text"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1">
                <LinkedinIcon className="w-3.5 h-3.5 text-blue-600" /> LinkedIn URL / handle
              </label>
              <input
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
