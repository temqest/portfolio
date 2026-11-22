"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { OWN_APPS } from "@/lib/constants";

export function AppsSection() {
  const [activeAppId, setActiveAppId] = useState("kickoff-value");

  return (
    <section
      id="apps"
      className="relative w-full bg-[#0a0a0a] text-white px-6 md:px-24 py-28 select-none overflow-hidden border-t border-white/10"
    >
      <div className="w-full max-w-7xl mx-auto space-y-12">
        {/* Section Kicker */}
        <div className="flex items-center justify-between text-xs font-mono tracking-widest uppercase text-white/40 border-b border-white/10 pb-4">
          <span>(04) NOW BUI*1*#]</span>
          <span>Products of my own</span>
        </div>

        <h2
          className="font-bold tracking-tight text-white leading-tight"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
          }}
        >
          Apps of my own
        </h2>

        {/* Interactive Expanding Bento Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-h-[420px]">
          {OWN_APPS.map((app) => {
            const isExpanded = app.id === activeAppId;
            return (
              <div
                key={app.id}
                onClick={() => setActiveAppId(app.id)}
                className={`transition-all duration-500 rounded-3xl p-8 flex flex-col justify-between cursor-pointer border relative overflow-hidden ${
                  isExpanded
                    ? "lg:col-span-8 bg-[#5b5fe0] text-white border-transparent shadow-2xl"
                    : "lg:col-span-2 bg-[#141414] hover:bg-[#1a1a1a] text-white/70 border-white/10"
                }`}
              >
                {/* Background Stipple Grain */}
                {isExpanded && (
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none bg-stipple-sand"
                    aria-hidden="true"
                  />
                )}

                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-4">
                    <span className={isExpanded ? "text-white/60" : "text-white/40"}>
                      {app.number}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-mono ${
                        isExpanded
                          ? "bg-white/20 text-white"
                          : "bg-white/5 text-white/40"
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>

                  {isExpanded ? (
                    <>
                      <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
                        {app.name}
                      </h3>
                      <p className="text-lg text-white/90 font-medium mb-4 max-w-lg leading-relaxed">
                        {app.tagline}
                      </p>
                      <p className="text-sm text-white/75 font-mono max-w-md leading-relaxed">
                        {app.description}
                      </p>
                    </>
                  ) : (
                    <div className="[writing-mode:vertical-lr] rotate-180 text-xl font-bold tracking-tight text-white/80 py-8">
                      {app.name}
                    </div>
                  )}
                </div>

                {isExpanded && (
                  <div className="pt-8 border-t border-white/20 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {app.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-black/20 text-white/90"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href={app.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 bg-white text-black px-4 py-2 rounded-full text-xs font-mono font-bold hover:bg-white/90 transition-colors shadow-md"
                    >
                      <span>Visit site</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
