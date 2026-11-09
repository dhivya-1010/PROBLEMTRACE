"use client";

import React, { useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  useNodesState,
  useEdgesState
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  GitBranch,
  CheckCircle2,
  XCircle,
  FileCheck2,
  Clock,
  Sparkles,
  Shield,
  Layers,
  ArrowRight,
  X
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";

interface NodeDetail {
  id: string;
  title: string;
  type: string;
  status: "Verified" | "Failed" | "Historical" | "Adaptation";
  date: string;
  lead: string;
  institution: string;
  summary: string;
  evidence: string[];
  assumptions: string[];
  metrics: { label: string; value: string }[];
}

const nodeDetailsMap: Record<string, NodeDetail> = {
  p: {
    id: "p",
    title: "Thermal Storage for Remote Off-Grid Clinics",
    type: "Original Problem Brief",
    status: "Historical",
    date: "Intake 2026",
    lead: "Dr. Dhivya Raman",
    institution: "Delft Center for Verifiable Eng.",
    summary: "Need 72 hours cold-chain hold at 2°C to 8°C under 45°C ambient desert conditions without active electricity.",
    evidence: ["WHO PQS Protocol E004", "Field survey across 14 rural clinics in Chad & Mali"],
    assumptions: ["Ambient brownout frequency: 4 days/month", "No reliable generator diesel fuel"],
    metrics: [
      { label: "Target Hold Time", value: "72 Hours" },
      { label: "Unit Cost Cap", value: "$45 USD" },
    ],
  },
  s1: {
    id: "s1",
    title: "Phase-Change Packaging for Space Cargo",
    type: "Historical Prior Art (Delft 2019)",
    status: "Historical",
    date: "Published May 2019",
    lead: "Prof. Johan Van Der Beek",
    institution: "Delft Tech / ESA",
    summary: "Aviation/aerospace phase change pack using paraffin wax and CNC milled 6061-T6 aluminum shells.",
    evidence: ["ESA Technical Report SP-2019-482", "Vacuum flight qualification test run #14"],
    assumptions: ["Clean hangar environment", "Pressure range: 60 kPa to 101 kPa"],
    metrics: [
      { label: "Hold Duration", value: "48 Hours" },
      { label: "Latent Enthalpy", value: "192 kJ/kg" },
      { label: "Unit Cost", value: "$180 (Too high for rural)" },
    ],
  },
  s2: {
    id: "s2",
    title: "Failed Branch: Active Mini-Peltier Thermo-Electric",
    type: "Disqualified Attempt",
    status: "Failed",
    date: "Attempted March 2025",
    lead: "Dr. Aris Thorne",
    institution: "Nordic Clean Systems",
    summary: "FAILED: Peltier thermoelectric cooling modules required 65W solar panels and lithium buffer batteries. Battery degradation in 45°C heat exceeded 70% within 4 months, violating the zero maintenance constraint.",
    evidence: ["Accelerated thermal aging degradation log #99", "Field warranty return analysis"],
    assumptions: ["Assumed continuous 5 hours daily solar irradiance"],
    metrics: [
      { label: "Failure Root Cause", value: "Battery Capacity Fade @ 45°C" },
      { label: "Power Draw Violation", value: "+65 Watts (Required 0W)" },
    ],
  },
  a1: {
    id: "a1",
    title: "Adaptation Event: Recycled Bio-Wax & HDPE Pouch",
    type: "Constraint Adaptation",
    status: "Adaptation",
    date: "October 2026",
    lead: "Dr. Elena Rostova & Dhivya Raman",
    institution: "ETH Zurich & Delft",
    summary: "Substituted aluminum core with ultrasonic welded recycled HDPE pouch filled with organic coconut ester eutectic blend. Dropped unit cost by 74% while preserving zero-leak hermetic seal.",
    evidence: ["Calorimetry DSC Trace #94", "Helium Mass-Spec Leak Rate: 1.2e-8 mbar·L/s"],
    assumptions: ["Locally recyclable agricultural by-products"],
    metrics: [
      { label: "Unit Cost", value: "$32.40 USD (Pass)" },
      { label: "Latent Enthalpy", value: "214 kJ/kg (Pass)" },
    ],
  },
  v1: {
    id: "v1",
    title: "Validated Outcome: 74.2h Continuous Stability",
    type: "Empirical Proof",
    status: "Verified",
    date: "November 2026",
    lead: "Verified by WHO PQS Testing Laboratory",
    institution: "Independent Accredited Lab",
    summary: "Full system prototype sustained interior temperature between 2.8°C and 6.4°C for 74.2 continuous hours in a calibrated 48°C environmental chamber.",
    evidence: ["Full 72-hour chamber thermocouple CSV log", "WHO PQS Pre-qualification Certificate"],
    assumptions: ["Closed lid throughout hold cycle"],
    metrics: [
      { label: "Verified Hold Time", value: "74.2 Hours (Exceeded 72h)" },
      { label: "Vial Deceleration", value: "9.2 G on 2m drop (Pass)" },
    ],
  },
};

const initialNodes: Node[] = [
  {
    id: "p",
    position: { x: 40, y: 160 },
    data: { label: "Original Problem\nCold-Storage for Clinics" },
    style: {
      background: "#0f172a",
      color: "#ffffff",
      borderRadius: 16,
      padding: "16px 20px",
      width: 220,
      border: "2px solid #334155",
      fontSize: "13px",
      fontWeight: "bold",
      boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.2)",
    },
  },
  {
    id: "s1",
    position: { x: 340, y: 60 },
    data: { label: "Historical Solution\nDelft Space PCM (2019)" },
    style: {
      background: "#f0fdf4",
      color: "#166534",
      borderRadius: 16,
      padding: "16px 20px",
      width: 230,
      border: "2px solid #86efac",
      fontSize: "13px",
      fontWeight: "bold",
    },
  },
  {
    id: "s2",
    position: { x: 340, y: 280 },
    data: { label: "Failed Branch\nActive Peltier Solar Buffer\n[DISQUALIFIED]" },
    style: {
      background: "#fff1f2",
      color: "#9f1239",
      borderRadius: 16,
      padding: "16px 20px",
      width: 230,
      border: "2px dashed #fda4af",
      fontSize: "13px",
      fontWeight: "bold",
    },
  },
  {
    id: "a1",
    position: { x: 670, y: 60 },
    data: { label: "Adaptation Event\nRecycled Bio-Wax & HDPE" },
    style: {
      background: "#f0f9ff",
      color: "#075985",
      borderRadius: 16,
      padding: "16px 20px",
      width: 230,
      border: "2px solid #7dd3fc",
      fontSize: "13px",
      fontWeight: "bold",
    },
  },
  {
    id: "v1",
    position: { x: 990, y: 60 },
    data: { label: "Validated Outcome\n74.2h WHO-PQS Certified" },
    style: {
      background: "#042f2e",
      color: "#5eead4",
      borderRadius: 16,
      padding: "16px 20px",
      width: 230,
      border: "2px solid #14b8a6",
      fontSize: "13px",
      fontWeight: "bold",
      boxShadow: "0 10px 25px -5px rgba(20, 184, 166, 0.3)",
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1",
    source: "p",
    target: "s1",
    animated: true,
    label: "CDEV Prior Art Match (94%)",
    style: { stroke: "#14b8a6", strokeWidth: 2.5 },
  },
  {
    id: "e2",
    source: "p",
    target: "s2",
    label: "Failed Battery Life @ 45°C",
    style: { stroke: "#f43f5e", strokeWidth: 2, strokeDasharray: "4 4" },
  },
  {
    id: "e3",
    source: "s1",
    target: "a1",
    animated: true,
    label: "Shell Relaxation & Bio-Wax",
    style: { stroke: "#0ea5e9", strokeWidth: 2.5 },
  },
  {
    id: "e4",
    source: "a1",
    target: "v1",
    animated: true,
    label: "Lab Chamber Telemetry",
    style: { stroke: "#14b8a6", strokeWidth: 2.5 },
  },
];

export function LineageView({ onNavigateAction }: { onNavigateAction: (v: string) => void }) {
  const { showToast } = useToast();
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("v1");

  const selectedDetail = nodeDetailsMap[selectedNodeId] || nodeDetailsMap["v1"];

  const handleNodeClick = (_: any, node: Node) => {
    setSelectedNodeId(node.id);
    showToast(`Inspecting lineage record: ${node.id.toUpperCase()}`, "info");
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block">
            Verifiable Lineage DAG
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Solution Lineage Graph
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Trace the evolutionary tree from first principles to validated outcome, including disqualified branches and empirical adaptations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            1 Validated Path
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-rose-50 text-rose-800 border border-rose-300">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            1 Disqualified Branch
          </span>
        </div>
      </div>

      {/* Main Graph & Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* React Flow Canvas (Takes 2 columns on desktop) */}
        <div className="lg:col-span-2 h-[580px] bg-slate-50 rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden relative">
          <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs text-xs font-semibold text-slate-700 flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-teal-600" />
            <span>Interactive Graph Canvas · Click any node to inspect</span>
          </div>

          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={handleNodeClick}
            fitView
          >
            <Background color="#cbd5e1" gap={20} size={1} />
            <Controls className="bg-white border-slate-200 rounded-xl shadow-xs text-slate-700" />
            <MiniMap
              nodeColor={(n) =>
                n.id === "v1"
                  ? "#14b8a6"
                  : n.id === "s2"
                  ? "#f43f5e"
                  : n.id === "s1"
                  ? "#22c55e"
                  : "#0f172a"
              }
              className="bg-white/80 rounded-xl border border-slate-200"
            />
          </ReactFlow>
        </div>

        {/* Node Inspector Drawer */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Node Inspector
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  selectedDetail.status === "Verified"
                    ? "bg-teal-50 text-teal-800"
                    : selectedDetail.status === "Failed"
                    ? "bg-rose-50 text-rose-800"
                    : "bg-sky-50 text-sky-800"
                }`}
              >
                {selectedDetail.status}
              </span>
            </div>

            <div>
              <span className="text-xs font-semibold text-teal-700 block">
                {selectedDetail.type}
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5 leading-snug">
                {selectedDetail.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {selectedDetail.lead} · {selectedDetail.institution} ({selectedDetail.date})
              </p>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              {selectedDetail.summary}
            </p>

            {/* Key Metrics */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1.5">
                Observed Physical Metrics
              </span>
              <div className="grid grid-cols-2 gap-2">
                {selectedDetail.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  >
                    <span className="text-[10px] text-slate-500 block uppercase font-medium">
                      {m.label}
                    </span>
                    <strong className="text-slate-900 block mt-0.5 truncate">
                      {m.value}
                    </strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Evidence Attachments */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1.5">
                Attached Evidence Records
              </span>
              <div className="space-y-1.5">
                {selectedDetail.evidence.map((ev, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded-lg bg-teal-50/50 text-teal-900 text-xs font-medium border border-teal-200/50"
                  >
                    <FileCheck2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="truncate">{ev}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateAction("evidence")}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition shadow-sm mt-4"
          >
            <span>View Complete Evidence Dossier</span>
            <ArrowRight className="w-4 h-4 text-teal-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

