"use client";

import React from "react";
import {
  BookOpen,
  Award,
  ShieldCheck,
  CheckCircle2,
  Users,
  Sparkles,
  ArrowRight,
  TrendingDown,
  FileCheck2,
  AlertTriangle
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";

const chamberTelemetryData = [
  { hour: "0h", internal: 2.2, ambient: 48.0 },
  { hour: "12h", internal: 2.9, ambient: 48.5 },
  { hour: "24h", internal: 3.4, ambient: 47.8 },
  { hour: "36h", internal: 3.9, ambient: 48.2 },
  { hour: "48h", internal: 4.5, ambient: 48.0 },
  { hour: "60h", internal: 5.2, ambient: 48.4 },
  { hour: "72h", internal: 5.9, ambient: 48.1 },
  { hour: "74h", internal: 6.4, ambient: 48.0 },
  { hour: "78h", internal: 8.8, ambient: 48.0 }, // PCM fully melted after 74h
];

export function ShowcaseView({ onNavigateAction }: { onNavigateAction: (v: string) => void }) {
  return (
    <div className="w-full space-y-8">
      {/* Hero Showcase Card */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white p-8 sm:p-12 shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80"
            alt="Thermal testbed"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4 text-teal-400" />
            <span>Showcase Case Study · Validated Solution</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Off-Grid Clinic Vaccine Cold Vault
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            How a collaborative team adapted 2019 aerospace phase-change thermal shielding into an affordable $32 passive vaccine vault preserving life-saving biologicals for 74+ continuous hours in desert environments.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>WHO PQS Verified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>74.2h Hold @ 48°C Ambient</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>$32.40 Unit Cost Cap</span>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Case Study Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content (2 cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Section: Original Problem & Operational Context */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 font-bold flex items-center justify-center text-xs">
                01
              </span>
              <span>The Operational Challenge</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Vaccines must be strictly preserved between 2.0°C and 8.0°C. In sub-Saharan off-grid clinics, electrical power grid failures occur on average 4 days per month. Unreliable diesel generators and high solar battery failure rates in 45°C ambient heat result in over 30% wastage of essential biologicals.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Ambient Temp</span>
                <strong className="text-xs sm:text-sm text-slate-900 block mt-0.5">48°C Dry Bulb</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Hold Target</span>
                <strong className="text-xs sm:text-sm text-slate-900 block mt-0.5">72 Hours</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Active Power</span>
                <strong className="text-xs sm:text-sm text-teal-700 block mt-0.5">0 Watts</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Max Cost</span>
                <strong className="text-xs sm:text-sm text-slate-900 block mt-0.5">&lt; $45 USD</strong>
              </div>
            </div>
          </div>

          {/* Section: The Adaptation Journey */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 font-bold flex items-center justify-center text-xs">
                02
              </span>
              <span>The Adaptation Journey (CDEV Lineage)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              In 2019, the European Space Agency and Delft Tech designed an aluminum phase-change pack for orbital biological cargo. While it achieved 48h hold, the unit cost was $180 due to aerospace-grade CNC aluminum shells.
            </p>
            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start gap-3 text-xs">
                <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-900">Step 1: Bio-Wax Matrix Formulation:</strong>
                  <p className="text-slate-600 mt-0.5">
                    Replaced synthetic paraffin with a coconut oil mono-ester eutectic blend, boosting latent heat to 214 kJ/kg at 4.2°C melting phase.
                  </p>
                </div>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start gap-3 text-xs">
                <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-900">Step 2: Ultrasonic Hermetic Welding:</strong>
                  <p className="text-slate-600 mt-0.5">
                    Substituted aluminum with recycled high-density polyethylene pouches sealed with ultrasonic seams, dropping container cost to $32.40.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Empirical Validation Telemetry */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 font-bold flex items-center justify-center text-xs">
                  03
                </span>
                <span>72h Chamber Telemetry Data</span>
              </h2>
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                WHO PQS Certified
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Internal vaccine chamber temperature (teal line) remains strictly between 2°C and 8°C under 48°C constant ambient torture test.
            </p>

            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chamberTelemetryData}>
                  <defs>
                    <linearGradient id="internalGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} />
                  <YAxis domain={[0, 10]} stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      color: "#fff",
                      borderRadius: "12px",
                      fontSize: "12px",
                      border: "none",
                    }}
                  />
                  <ReferenceLine y={8.0} stroke="#ef4444" strokeDasharray="3 3" label={{ value: "Max 8°C Limit", fill: "#ef4444", fontSize: 10 }} />
                  <ReferenceLine y={2.0} stroke="#3b82f6" strokeDasharray="3 3" label={{ value: "Min 2°C Limit", fill: "#3b82f6", fontSize: 10 }} />
                  <Area
                    type="monotone"
                    dataKey="internal"
                    stroke="#0d9488"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#internalGrad)"
                    name="Internal Temp (°C)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Section: Known Limitations */}
          <div className="bg-amber-50/60 rounded-2xl border border-amber-200/80 p-6 space-y-2">
            <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Transparent Limitations & Next Steps</span>
            </h3>
            <p className="text-xs text-amber-800 leading-relaxed">
              • Re-freezing the bio-wax core requires access to a standard household freezer (-15°C) for at least 14 hours prior to field transit.
            </p>
            <p className="text-xs text-amber-800 leading-relaxed">
              • If ambient temperatures exceed 52°C continuously, hold time degrades to 64 hours.
            </p>
          </div>
        </div>

        {/* Sidebar Dossier (1 col) */}
        <div className="space-y-6">
          {/* Key Authors Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-600" />
              <span>Authors & Contributors</span>
            </h3>
            <div className="space-y-3">
              {[
                { name: "Dr. Dhivya Raman", role: "Principal Investigator · Delft" },
                { name: "Dr. Elena Rostova", role: "Materials Synthesis · ETH Zurich" },
                { name: "Marcus Vance", role: "Thermal Modeling · MIT" },
                { name: "Amara Diallo", role: "Field Validation · Dakar Health" },
              ].map((c, i) => (
                <div key={i} className="text-xs border-b border-slate-100 pb-2.5 last:border-none">
                  <span className="font-bold text-slate-900 block">{c.name}</span>
                  <span className="text-slate-500">{c.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prior Art Lineage Link */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-2xs space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 block">
              Prior Art Lineage
            </span>
            <h3 className="text-base font-bold leading-snug">
              Delft Aerospace PCM Pack (2019)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Trace how this breakthrough was adapted directly through CDEV constraint relaxation and proof obligations.
            </p>
            <button
              onClick={() => onNavigateAction("solutions")}
              className="w-full py-2.5 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-1.5"
            >
              <span>Explore Full Lineage Tree</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

