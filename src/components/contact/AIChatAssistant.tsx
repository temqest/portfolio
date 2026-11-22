"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Clock } from "lucide-react";
import { AI_SUGGESTIONS, AI_RESPONSES } from "@/lib/constants";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
}

export function AIChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "assistant",
      text: "Hi! Ask me about your project, my work or how I work.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const sastDate = new Date(utc + 3600000 * 2);
      const hours = sastDate.getHours().toString().padStart(2, "0");
      const minutes = sastDate.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isTyping) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `u-${prev.length}-${query.slice(0, 8)}`,
        sender: "user",
        text: query,
      },
    ]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      let matchedResponse = "";

      for (const [key, answer] of Object.entries(AI_RESPONSES)) {
        if (lowerQuery.includes(key) || key.includes(lowerQuery)) {
          matchedResponse = answer;
          break;
        }
      }

      if (!matchedResponse) {
        if (lowerQuery.includes("price") || lowerQuery.includes("rate") || lowerQuery.includes("cost")) {
          matchedResponse = AI_RESPONSES["how do you price a project?"];
        } else if (lowerQuery.includes("speed") || lowerQuery.includes("performance") || lowerQuery.includes("slow")) {
          matchedResponse = AI_RESPONSES["can you speed up my existing store?"];
        } else if (lowerQuery.includes("shopify") || lowerQuery.includes("headless") || lowerQuery.includes("hydrogen")) {
          matchedResponse = AI_RESPONSES["what kind of shopify work do you take on?"];
        } else {
          matchedResponse = `Thanks for asking about "${query}". I'm available for custom Shopify Plus themes, complex integrations, and store performance turnarounds. Drop me a note at me@inacionakiti.com or ask about my typical timeline, pricing, or past case studies!`;
        }
      }

      const assistantId = `a-${query.slice(0, 8)}`;
      setMessages((prev) => [...prev, { id: assistantId, sender: "assistant", text: "" }]);

      let charIdx = 0;
      const interval = setInterval(() => {
        charIdx += 4;
        const currentSlice = matchedResponse.slice(0, charIdx);
        setMessages((prev) =>
          prev.map((msg) => (msg.id === assistantId ? { ...msg, text: currentSlice } : msg))
        );

        if (charIdx >= matchedResponse.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 25);
    }, 450);
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-5 space-y-6">
        <div className="flex items-center justify-between text-xs font-mono tracking-widest uppercase text-black/50">
          <span>(08) CONTACT</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#5b5fe0]" />
            <span>Cape Town, SAST ({currentTime || "14:08"} UTC+2)</span>
          </span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#0a0a0a] leading-[1.05]">
          Ask me anything.
        </h2>

        <p className="text-base sm:text-lg text-black/70 leading-relaxed">
          An AI assistant I built and briefed on how I work answers straight away, and every chat comes
          to me, with your approximate location and how you found the site. Prefer a person?{" "}
          <a
            href="mailto:me@inacionakiti.com"
            className="text-black font-semibold underline underline-offset-4 decoration-[#5b5fe0] hover:text-[#5b5fe0] transition-colors"
          >
            Email me
          </a>{" "}
          and I&apos;ll reply within 24 hours.
        </p>

        <div className="inline-flex items-center gap-2 border border-black/10 bg-black/[0.04] px-3.5 py-1.5 rounded-full text-xs font-mono text-black/60">
          <span className="w-2 h-2 rounded-full bg-[#5b5fe0] animate-pulse" />
          <span>Built with Next.js, Cloudflare function and Gemini</span>
        </div>

        <div className="pt-4 border-t border-black/10 space-y-2 text-sm text-black/70 font-mono">
          <div>
            <span className="text-black/40">Direct:</span>{" "}
            <a href="mailto:me@inacionakiti.com" className="text-black font-medium hover:underline">
              me@inacionakiti.com
            </a>
          </div>
          <div>
            <span className="text-black/40">Phone:</span>{" "}
            <span className="text-black font-medium">+27 611 591 857</span>
          </div>
          <div>
            <span className="text-black/40">Location:</span>{" "}
            <span className="text-black font-medium">Cape Town (SA) & London (UK)</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 bg-white/70 backdrop-blur-xl border border-black/10 rounded-3xl p-6 shadow-xl flex flex-col h-[520px]">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 no-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {msg.sender === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-black text-white shrink-0 flex items-center justify-center text-xs font-bold font-mono overflow-hidden shadow-sm">
                  <div className="w-full h-full bg-gradient-to-br from-[#5b5fe0] to-black flex items-center justify-center">
                    IN
                  </div>
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-[#0a0a0a] text-white rounded-tr-none font-medium"
                    : "bg-white border border-black/8 text-[#0a0a0a] shadow-sm rounded-tl-none"
                }`}
              >
                {msg.text || (
                  <span className="inline-flex items-center gap-1 text-black/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-black/40 animate-ping" />
                    <span>Typing...</span>
                  </span>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs font-mono text-black/40 pl-11">
              <Sparkles className="w-3.5 h-3.5 text-[#5b5fe0] animate-spin" />
              <span>Inacio AI is formulating response...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        <div className="pt-3 pb-2 flex flex-wrap gap-1.5">
          {AI_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSendMessage(suggestion)}
              disabled={isTyping}
              className="text-xs bg-black/[0.04] hover:bg-[#5b5fe0]/10 hover:text-[#5b5fe0] border border-black/8 hover:border-[#5b5fe0]/30 text-black/75 px-3 py-1.5 rounded-full transition-colors cursor-pointer text-left disabled:opacity-50"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="pt-2 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a project, Shopify Plus, or pricing..."
            disabled={isTyping}
            className="flex-1 bg-white border border-black/15 focus:border-[#5b5fe0] focus:ring-1 focus:ring-[#5b5fe0] rounded-full px-4 py-2.5 text-sm text-black placeholder:text-black/40 outline-none transition-all shadow-sm"
          />

          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 rounded-full bg-[#0a0a0a] hover:bg-[#5b5fe0] disabled:bg-black/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-md"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
