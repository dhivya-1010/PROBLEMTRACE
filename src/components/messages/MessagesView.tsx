"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Search,
  Send,
  Phone,
  Video,
  Info,
  CheckCheck,
  Paperclip
} from "lucide-react";
import { UserProfile } from "@/types";
import { useToast } from "@/components/ui/Toast";

interface MessagesViewProps {
  profile: UserProfile;
}

export function MessagesView({ profile }: MessagesViewProps) {
  const { showToast } = useToast();

  const [activeContactId, setActiveContactId] = useState("c1");
  const [inputText, setInputText] = useState("");

  const contacts = [
    {
      id: "c1",
      name: "Dr. Elena Rostova",
      handle: "@elena_chem",
      role: "Materials Physicist @ ETH",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      online: true,
      lastMsg: "Calorimetry run #94 is ready for verification.",
      time: "11:22 AM",
    },
    {
      id: "c2",
      name: "Alex Rivera",
      handle: "@arivera_marine",
      role: "Ocean Systems Engineer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      online: false,
      lastMsg: "Let's review the hydrophone frequency spectra tomorrow.",
      time: "Yesterday",
    },
    {
      id: "c3",
      name: "Marcus Vance",
      handle: "@m_vance",
      role: "Thermal Systems Architect",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      online: true,
      lastMsg: "HDPE ultrasonic seam burst model uploaded to repo.",
      time: "Oct 29",
    },
  ];

  const [conversations, setConversations] = useState<Record<string, { id: string; sender: string; text: string; time: string; isMe: boolean }[]>>({
    c1: [
      {
        id: "1",
        sender: "Dr. Elena Rostova",
        text: "Hi Dhivya! We finished synthesising the coconut mono-ester batch at ETH Zurich.",
        time: "10:45 AM",
        isMe: false,
      },
      {
        id: "2",
        sender: "Dr. Dhivya Raman",
        text: "Terrific news Elena! Did the differential scanning calorimetry show the expected 4.2°C melting plateau?",
        time: "11:02 AM",
        isMe: true,
      },
      {
        id: "3",
        sender: "Dr. Elena Rostova",
        text: "Yes, exactly 4.2°C with latent heat enthalpy at 214.2 kJ/kg. The trace file is in the project room for PO-01 sign-off.",
        time: "11:22 AM",
        isMe: false,
      },
    ],
    c2: [
      {
        id: "1",
        sender: "Alex Rivera",
        text: "Hey Dhivya, saw your paper on the passive thermal buffer. Could we adapt that phase-change logic to protect marine electronics?",
        time: "Yesterday",
        isMe: false,
      },
    ],
    c3: [
      {
        id: "1",
        sender: "Marcus Vance",
        text: "Uploaded the finite element mesh for the seam weld. Ready when you are.",
        time: "Oct 29",
        isMe: false,
      },
    ],
  });

  const activeContact = contacts.find((c) => c.id === activeContactId) || contacts[0];
  const activeMessages = conversations[activeContactId] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setConversations((prev) => ({
      ...prev,
      [activeContactId]: [
        ...(prev[activeContactId] || []),
        {
          id: `${Date.now()}`,
          sender: profile.name,
          text: inputText.trim(),
          time: "Just now",
          isMe: true,
        },
      ],
    }));
    setInputText("");
    showToast(`Message sent to ${activeContact.name}`, "info");
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden h-[680px] flex flex-col md:flex-row">
      {/* Left Contact List (1/3) */}
      <div className="w-full md:w-80 border-r border-slate-200 flex flex-col h-full bg-slate-50/50">
        <div className="p-4 border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-slate-900">Direct Messages</h2>
            <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
              Peer Network
            </span>
          </div>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search researchers..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {contacts.map((contact) => {
            const isSelected = contact.id === activeContactId;
            return (
              <div
                key={contact.id}
                onClick={() => setActiveContactId(contact.id)}
                className={`p-3.5 flex items-start gap-3 cursor-pointer transition ${
                  isSelected ? "bg-white border-l-4 border-l-teal-600" : "hover:bg-slate-100/70"
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {contact.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {contact.name}
                    </p>
                    <span className="text-[10px] text-slate-400">{contact.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">{contact.role}</p>
                  <p className="text-[11px] text-slate-600 truncate mt-0.5 font-medium">
                    {contact.lastMsg}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Chat Thread (2/3) */}
      <div className="flex-1 flex flex-col h-full bg-white">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={activeContact.avatar}
              alt={activeContact.name}
              className="w-9 h-9 rounded-full object-cover"
            />
            <div>
              <p className="text-xs font-bold text-slate-900">{activeContact.name}</p>
              <p className="text-[11px] text-slate-500">{activeContact.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <button
              onClick={() => showToast("Simulated voice connection", "info")}
              className="p-2 hover:bg-slate-50 rounded-lg text-slate-600 transition"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              onClick={() => showToast("Simulated video conference room", "info")}
              className="p-2 hover:bg-slate-50 rounded-lg text-slate-600 transition"
            >
              <Video className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/40">
          {activeMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.isMe ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.isMe
                    ? "bg-slate-900 text-white rounded-br-xs"
                    : "bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-2xs"
                }`}
              >
                <p>{msg.text}</p>
              </div>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400 px-1">
                <span>{msg.time}</span>
                {msg.isMe && <CheckCheck className="w-3 h-3 text-teal-600" />}
              </div>
            </div>
          ))}
        </div>

        {/* Composer */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 flex gap-2">
          <button
            type="button"
            onClick={() => showToast("Attach document/spec to message", "info")}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 transition"
          >
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Message ${activeContact.name}...`}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1 disabled:opacity-50 transition"
          >
            <Send className="w-3.5 h-3.5 text-teal-400" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}

