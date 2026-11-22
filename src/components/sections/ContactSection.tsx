"use client";

import React from "react";
import { AIChatAssistant } from "@/components/contact/AIChatAssistant";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative w-full bg-[#eeece8] text-[#0a0a0a] px-6 md:px-24 py-28 transition-colors select-none overflow-hidden border-t border-black/10"
    >
      <div className="w-full max-w-7xl mx-auto">
        <AIChatAssistant />
      </div>
    </section>
  );
}
