"use client";

import React, { useState } from "react";
import {
  FileCheck2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Download,
  MessageSquare,
  ShieldCheck,
  Send,
  Eye,
  ArrowRight
} from "lucide-react";
import { mockProofObligations } from "@/data/mockData";
import { ProofObligation } from "@/types";
import { useToast } from "@/components/ui/Toast";

export function EvidenceView({ onNavigateAction }: { onNavigateAction: (v: string) => void }) {
  const { showToast } = useToast();
  const [proofs, setProofs] = useState<ProofObligation[]>(mockProofObligations);
  const [selectedProof, setSelectedProof] = useState<ProofObligation>(mockProofObligations[0]);
  const [reviewerComment, setReviewerComment] = useState("");
  const [comments, setComments] = useState<Record<string, string[]>>({
    "PO-01": [
      "ETH Zurich Calibrated Chamber certified latent enthalpy of 214.2 kJ/kg. Exceeds target constraint by 2%.",
      "Thermal baseline curve is monotonic between 2°C and 8°C. Approved by Dr. Marcus Vance.",
    ],
    "PO-02": [
      "Thermal flux sensors verified vacuum panel k-value <= 0.0162 W/(m·K) across full 72-hour test run.",
    ],
    "PO-03": [
      "Awaiting secondary signatory from Dakar Health Alliance on ultrasonic seam degradation.",
    ],
  });

  const handleApprove = (id: string) => {
    setProofs((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Verified" } : p))
    );
    showToast(`Proof obligation ${id} marked as Approved & Verified!`, "success");
  };

  const handleRequestRevision = (id: string) => {
    setProofs((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "In Review" } : p))
    );
    showToast(`Revision requested for ${id}`, "info");
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerComment.trim()) return;

    setComments((prev) => ({
      ...prev,
      [selectedProof.id]: [
        ...(prev[selectedProof.id] || []),
        reviewerComment.trim(),
      ],
    }));
    setReviewerComment("");
    showToast("Reviewer comment added to evidence log", "info");
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block">
            Verifiable Evidence Layer
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Evidence Validation Dossier
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Independent peer review and empirical validation of mathematical and physical proof obligations.
          </p>
        </div>

        <button
          onClick={() => onNavigateAction("showcase")}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition shadow-sm"
        >
          <span>View Public Case Showcase</span>
          <ArrowRight className="w-4 h-4 text-teal-400" />
        </button>
      </div>

      {/* Main Split Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List of Obligations (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Obligation Registry ({proofs.length})
            </h3>
            <div className="space-y-2">
              {proofs.map((po) => {
                const isSelected = selectedProof.id === po.id;
                return (
                  <div
                    key={po.id}
                    onClick={() => setSelectedProof(po)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200/80 text-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">
                        {po.id}: {po.title}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          po.status === "Verified"
                            ? isSelected
                              ? "bg-emerald-400 text-slate-950"
                              : "bg-emerald-100 text-emerald-800"
                            : po.status === "In Review"
                            ? isSelected
                              ? "bg-teal-400 text-slate-950"
                              : "bg-teal-100 text-teal-800"
                            : isSelected
                            ? "bg-amber-400 text-slate-950"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {po.status}
                      </span>
                    </div>
                    <p
                      className={`text-xs line-clamp-2 ${
                        isSelected ? "text-slate-300" : "text-slate-500"
                      }`}
                    >
                      {po.statement}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Detail Dossier (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-6">
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                {selectedProof.id} · Specification
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                {selectedProof.title}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Investigator Assigned: <strong>{selectedProof.assignedTo}</strong>
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleRequestRevision(selectedProof.id)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
              >
                Request Revision
              </button>
              <button
                onClick={() => handleApprove(selectedProof.id)}
                className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition flex items-center gap-1 shadow-sm"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Approve Evidence</span>
              </button>
            </div>
          </div>

          {/* Full Proof Statement */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
              Formal Proof Obligation Statement
            </span>
            <p className="text-xs text-slate-800 leading-relaxed font-medium">
              "{selectedProof.statement}"
            </p>
          </div>

          {/* Validation Methodology */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Validation Methodology
            </h4>
            <div className="p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
              <p>• <strong>Instrument:</strong> Calibrated Differential Scanning Calorimeter (Mettler Toledo DSC 3+) & 16-channel thermocouple logger.</p>
              <p>• <strong>Chamber Conditions:</strong> 48.0°C ± 0.5°C constant dry-bulb ambient, 15% relative humidity for 72 continuous hours.</p>
              <p>• <strong>Standard Baseline:</strong> WHO PQS Performance Specification E004/IN01.1.</p>
            </div>
          </div>

          {/* Evidence Attachments */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Primary Evidence Records
            </h4>
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileCheck2 className="w-5 h-5 text-teal-600" />
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    {selectedProof.evidenceFile || "dsc_telemetry_trace_po1.pdf"}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {selectedProof.evidenceType || "Calibrated Instrument Raw Trace"} · Signed by Lab Tech
                  </p>
                </div>
              </div>

              <button
                onClick={() => showToast("Downloading cryptographic evidence trace...", "info")}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Verify Data</span>
              </button>
            </div>
          </div>

          {/* Reviewer Comments & Discussion */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Peer Reviewer Sign-Off Comments
            </h4>
            <div className="space-y-2">
              {(comments[selectedProof.id] || []).map((comm, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700"
                >
                  <span className="font-bold text-slate-800 block mb-0.5">
                    Peer Reviewer #{idx + 1}
                  </span>
                  {comm}
                </div>
              ))}
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="flex gap-2 pt-2">
              <input
                type="text"
                value={reviewerComment}
                onChange={(e) => setReviewerComment(e.target.value)}
                placeholder="Submit reviewer remarks or formal objection..."
                className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-teal-500"
              />
              <button
                type="submit"
                disabled={!reviewerComment.trim()}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold disabled:opacity-50 transition"
              >
                Submit Sign-off
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

