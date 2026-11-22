"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

interface GooeyMenuButtonProps {
  onStartProject?: () => void;
}

export function GooeyMenuButton({ onStartProject }: GooeyMenuButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      {/* Gooey filter wrapper */}
      <div
        className="relative flex items-center justify-end filter-goo"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Expandable "Start a project" pill */}
        <button
          onClick={onStartProject}
          className={`flex items-center gap-2 bg-[#5b5fe0] text-white px-5 py-3 rounded-full font-medium text-sm transition-all duration-300 cursor-pointer shadow-lg hover:bg-[#6c70e8] ${
            isExpanded
              ? "opacity-100 translate-x-0 mr-[-12px]"
              : "opacity-0 translate-x-12 pointer-events-none mr-[-24px]"
          }`}
        >
          <span>Start a project</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Circular Hamburger Button */}
        <button
          onClick={() => {
            setIsExpanded((prev) => !prev);
            onStartProject?.();
          }}
          className="w-12 h-12 rounded-full bg-[#5b5fe0] text-white flex items-center justify-center hover:bg-[#6c70e8] transition-colors cursor-pointer shadow-xl relative z-10"
          aria-label="Start project or toggle contact"
        >
          <div className="flex flex-col gap-1 items-center justify-center">
            <span className="w-4 h-[2px] bg-white rounded-full transition-transform" />
            <span className="w-4 h-[2px] bg-white rounded-full transition-transform" />
          </div>
        </button>
      </div>
    </div>
  );
}
