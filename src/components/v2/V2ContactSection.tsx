'use client';

import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { FaGithub, FaLinkedin, FaFilePdf } from 'react-icons/fa6';

export function V2ContactSection() {
  const [copied, setCopied] = useState(false);
  const [selectedRoleType, setSelectedRoleType] = useState('SWE Internship');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

  const email = 'patrickkurtv@gmail.com';
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    if (!accessKey) {
      setErrorMessage('Contact form is temporarily unavailable. Please click the email button above.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          company: formData.company || 'Not specified',
          subject: `Portfolio Inquiry [${selectedRoleType}]: ${formData.name}`,
          message: formData.message,
          from_name: `${formData.name} via Portfolio`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(result.message || 'Something went wrong. Please try again or email directly.');
      }
    } catch {
      setErrorMessage('Network error. Please check your connection or email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-14 md:py-28 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto text-[#0a122a]">
      {/* Warm peach/coral radial glow aura */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(800px,100vw)] h-[500px] pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(closest-side, rgba(255, 122, 69, 0.12), transparent)',
        }}
      />

      <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest mb-3 md:mb-4">
        <span>(09) — CONTACT &amp; HIRING</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Direct Intent, Email & Engineering Competencies */}
        <div className="lg:col-span-5">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-light tracking-tight text-[#0a122a] mb-4 md:mb-6">
            Let&apos;s start a <em className="font-serif-italic text-blue-600 font-normal">conversation.</em>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed mb-6 md:mb-8">
            Whether you&apos;re hiring for an internship, open developer role, or want to discuss an engineering challenge, my inbox is open.
          </p>

          {/* Email Box with One-Click Copy + Direct Mailto */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5 md:mb-8">
            <div className="inline-flex items-center gap-2 p-1 pl-4 rounded-full border border-black/10 bg-slate-50 shadow-sm max-w-full">
              <span className="text-xs sm:text-sm font-mono text-[#0a122a] truncate">{email}</span>
              <button
                type="button"
                onClick={handleCopy}
                className={`min-h-[40px] px-4 rounded-full text-xs font-mono transition-all cursor-pointer shrink-0 ${
                  copied
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-[#0a122a] text-white hover:bg-blue-600'
                }`}
              >
                {copied ? 'Copied! ✓' : 'Copy'}
              </button>
            </div>
            <a
              href={`mailto:${email}`}
              className="lg:hidden min-h-[42px] px-4 rounded-full bg-blue-600 text-white text-xs font-mono inline-flex items-center gap-1.5 shadow-sm"
            >
              <span>Email App</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Social Profiles & Resume Access (>= 44px touch targets) */}
          <div className="flex flex-wrap items-center gap-2 mb-2 lg:mb-10 text-xs font-mono">
            <a
              href="https://github.com/temqest"
              target="_blank"
              rel="noreferrer"
              className="min-h-[42px] px-3 rounded-full border border-black/10 bg-white text-slate-700 hover:text-black inline-flex items-center gap-1.5"
            >
              <FaGithub className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://www.linkedin.com/in/patrick-villamer-15267b36a"
              target="_blank"
              rel="noreferrer"
              className="min-h-[42px] px-3 rounded-full border border-black/10 bg-white text-slate-700 hover:text-black inline-flex items-center gap-1.5"
            >
              <FaLinkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="/Patrick_Kurt_Villamer_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="min-h-[42px] px-3 rounded-full border border-blue-200 bg-blue-50/70 text-blue-700 hover:text-blue-900 inline-flex items-center gap-1.5 font-medium"
            >
              <FaFilePdf className="w-3.5 h-3.5" />
              <span>CV PDF</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          {/* Competencies shown on Desktop lg+ only (keeps mobile form immediately reachable) */}
          <div className="hidden lg:block">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">
              Core Technical Competencies
            </h3>
            <ul className="space-y-2 text-sm font-normal text-slate-700">
              {[
                'Offline-first synchronization & local SQLite outboxes',
                'Strict full-stack TypeScript & Next.js 16 App Router',
                'Relational database architecture & Row-Level Security',
                'Defensive error boundaries & resilient API contracts',
                'Autonomous AI pair-engineering & telemetry workflows',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold shrink-0">↗</span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Hiring Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="p-5 sm:p-8 md:p-12 rounded-3xl border border-black/10 bg-white shadow-2xl relative">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-6 pb-4 border-b border-black/5">
              <span>GET IN TOUCH</span>
              <span className="text-emerald-600">REPLY WITHIN ~24H</span>
            </div>

            {submitted ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-2xl font-bold mb-4">
                  ✓
                </div>
                <h3 className="text-2xl font-semibold text-[#0a122a] mb-2">Message received.</h3>
                <p className="text-sm text-slate-600 mb-6 max-w-sm mx-auto">
                  Thank you for reaching out! I check my inbox daily and will get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', company: '', message: '' });
                  }}
                  className="px-6 py-2 rounded-full border border-black/15 text-xs font-mono uppercase text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Role / Opportunity Selector */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-500 block mb-3">
                    Regarding
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['SWE Internship', 'Junior Developer', 'Backend / Systems', 'Technical Chat'].map(
                      (roleType) => (
                        <button
                          key={roleType}
                          type="button"
                          onClick={() => setSelectedRoleType(roleType)}
                          className={`min-h-[40px] px-3.5 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                            selectedRoleType === roleType
                              ? 'bg-[#0a122a] text-white font-medium shadow-sm'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {roleType}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Name & Email Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-500 block mb-1">
                      Your name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-blue-600 focus:outline-none text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-500 block mb-1">
                      Your email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-blue-600 focus:outline-none text-sm transition-colors"
                    />
                  </div>
                </div>

                {/* Company / Team Name */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-500 block mb-1">
                    Company or team (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Engineering Team, Startup, or Research Lab"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-blue-600 focus:outline-none text-sm transition-colors"
                  />
                </div>

                {/* Opportunity Details */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-500 block mb-1">
                    Opportunity or inquiry details
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell me about your team, tech stack, or the role you are looking to fill..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-blue-600 focus:outline-none text-sm transition-colors resize-none"
                  />
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-mono text-rose-700">
                    {errorMessage}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-2xl text-white font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/25 ${
                    isSubmitting
                      ? 'bg-slate-400 cursor-not-allowed'
                      : 'bg-[#ff7a45] hover:bg-[#ff6426] active:scale-[0.99]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <span>→</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
