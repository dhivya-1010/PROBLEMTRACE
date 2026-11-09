"use client";

import React, { useState } from "react";
import {
  FlaskConical,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  XCircle,
  FileCheck2,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  ChevronRight
} from "lucide-react";
import { mockCdevConstraints, mockProofObligations } from "@/data/mockData";
import { ConstraintComparison, ProofObligation } from "@/types";
import { useToast } from "@/components/ui/Toast";

export function CdevView({ onNavigateAction }: { onNavigateAction: (v: string) => void }) {
  const { showToast } = useToast();
  const [filterType, setFilterType] = useState<string>("All");
  const [proofs, setProofs] = useState<ProofObligation[]>(mockProofObligations);

  const filteredConstraints = mockCdevConstraints.filter(
    (c) => filterType === "All" || c.type === filterType
  );

  const toggleProofStatus = (id: string) => {
    setProofs((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const next =
            p.status === "Verified"
              ? "In Review"
              : p.status === "In Review"
              ? "Pending Evidence"
              : "Verified";
          showToast(`Updated obligation ${id} status to "${next}"`, "info");
          return { ...p, status: next };
        }
        return p;
      })
    );
  };

  const getStatusBadge = (type: ConstraintComparison["type"]) => {
    switch (type) {
      case "Compatible":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Compatible
          </span>
        );
      case "Conflicting":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3 h-3 text-rose-600" /> Conflicting
          </span>
        );
      case "Missing":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3 h-3 text-amber-600" /> Missing Gap
          </span>
        );
      case "Unknown":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">
            <HelpCircle className="w-3 h-3 text-sky-600" /> Needs Input
          </span>
        );
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block">
            Constraint-Driven Evolution & Verification
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            CDEV Technical Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Mathematical and empirical cross-comparison between source historical prior art and target operational requirements.
          </p>
        </div>

        <button
          onClick={() => onNavigateAction("solutions")}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-sm transition"
        >
          <span>Open Solution Lineage Graph</span>
          <ArrowRight className="w-4 h-4 text-teal-400" />
        </button>
      </div>

      {/* Target vs Source Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Source Card */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Source Prior Art (Historical Solution)
          </span>
          <h3 className="text-sm font-bold text-slate-900 mt-2">
            Delft Aerospace Phase-Change Packaging
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Delft Technical University & ESA · Published 2019
          </p>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>Primary Core: Aluminum PCM</span>
            <span className="font-semibold text-slate-800">48h Hold</span>
          </div>
        </div>

        {/* Target Card */}
        <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-200/80 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block">
            Target Challenge
          </span>
          <h3 className="text-sm font-bold text-slate-900 mt-2">
            Low-Cost Thermal Storage for Off-Grid Clinics
          </h3>
          <p className="text-xs text-teal-800 mt-1">
            Submitted by Dr. Dhivya Raman · Target Budget: $45
          </p>
          <div className="mt-4 pt-3 border-t border-teal-200/60 flex items-center justify-between text-xs text-teal-900">
            <span>Primary Core: Bio-Wax Matrix</span>
            <span className="font-bold">72h Hold</span>
          </div>
        </div>

        {/* Compatibility Score */}
        <div className="p-5 rounded-2xl bg-slate-900 text-white shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              CDEV Compatibility Index
            </span>
            <Sparkles className="w-4 h-4 text-teal-400" />
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-white">78%</span>
              <span className="text-xs font-semibold text-teal-400">
                High Adaptation Feasibility
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              7 of 9 physical constraints satisfy relaxation tolerances.
            </p>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-teal-400 rounded-full" style={{ width: "78%" }} />
          </div>
        </div>
      </div>

      {/* Constraint Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        {/* Table Filter Tabs */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Constraint Differential Analysis
            </h2>
            <p className="text-xs text-slate-500">
              Direct specification alignment and delta assessment
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {["All", "Compatible", "Conflicting", "Missing", "Unknown"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterType(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  filterType === tab
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-xs">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-5 py-3 font-bold">Physical Constraint</th>
                <th className="px-5 py-3 font-bold">Historical Source (Delft 2019)</th>
                <th className="px-5 py-3 font-bold">Target Specification</th>
                <th className="px-5 py-3 font-bold">Assessment</th>
                <th className="px-5 py-3 font-bold">Engineering Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredConstraints.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/70 transition">
                  <td className="px-5 py-4 font-bold text-slate-900">{c.name}</td>
                  <td className="px-5 py-4 text-slate-600">{c.sourceValue}</td>
                  <td className="px-5 py-4 text-slate-900 font-medium">{c.targetValue}</td>
                  <td className="px-5 py-4">{getStatusBadge(c.type)}</td>
                  <td className="px-5 py-4 text-slate-500 max-w-xs">{c.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generated Proof Obligations & Adaptation Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Proof Obligations */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-teal-600" />
              <h2 className="text-sm font-bold text-slate-900">
                Generated Proof Obligations
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-400">
              Click badge to toggle status
            </span>
          </div>

          <div className="space-y-3">
            {proofs.map((po) => (
              <div
                key={po.id}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition space-y-2 bg-slate-50/50"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    {po.id}: {po.title}
                  </span>
                  <button
                    onClick={() => toggleProofStatus(po.id)}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border transition ${
                      po.status === "Verified"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                        : po.status === "In Review"
                        ? "bg-sky-50 text-sky-800 border-sky-300"
                        : "bg-amber-50 text-amber-800 border-amber-300"
                    }`}
                  >
                    {po.status}
                  </button>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {po.statement}
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                  <span>Assigned: <strong>{po.assignedTo}</strong></span>
                  {po.testScore && (
                    <span className="font-semibold text-teal-700">{po.testScore}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Adaptation Recommendations */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <h2 className="text-sm font-bold text-slate-900">
                Adaptation Recommendations
              </h2>
            </div>
            <span className="text-xs font-semibold text-teal-700">3 Recommendations</span>
          </div>

          <div className="space-y-3">
            {[
              {
                title: "Encapsulation Shell Substitution",
                rec: "Replace milled aerospace aluminum 6061 with ultrasonic-welded recycled HDPE pouch to satisfy the $45 unit cost limit without compromising hermetic seal.",
                confidence: "High (92%)",
                impact: "Reduces cost by 64%",
              },
              {
                title: "Latent Enthalpy Augmentation",
                rec: "Formulate a bio-wax eutectic matrix using coconut oil mono-esters to boost latent heat plateau to 214 kJ/kg at 4.2°C melting phase.",
                confidence: "Verified in Lab",
                impact: "Increases hold time to 74.2 hours",
              },
              {
                title: "Drop Attenuation Packaging",
                rec: "Incorporate molded agricultural mycelium corner buffers to absorb 2-meter dirt drop impact required by WHO PQS E004.",
                confidence: "In Progress",
                impact: "Avoids synthetic polyurethane foam",
              },
            ].map((r, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">{r.title}</h4>
                  <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                    {r.confidence}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{r.rec}</p>
                <div className="text-[11px] text-teal-800 font-medium">
                  {r.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

