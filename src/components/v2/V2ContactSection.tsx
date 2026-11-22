'use client';

import React, { useState } from 'react';

export function V2ContactSection() {
  const [copied, setCopied] = useState(false);
  const [selectedService, setSelectedService] = useState('Website');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const email = 'patrickkurtv@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-28 px-6 md:px-12 max-w-6xl mx-auto text-[#0a122a]">
      {/* Warm peach/coral radial glow aura */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(closest-side, rgba(255, 122, 69, 0.12), transparent)',
        }}
      />

      <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">
        <span>(07) — CONTACT</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Headline, Direct Email & Offerings */}
        <div className="lg:col-span-5">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight text-[#0a122a] mb-6">
            Let&apos;s build <em className="font-serif-italic text-blue-600 font-normal">something.</em>
          </h2>

          <p className="text-base text-slate-600 font-light leading-relaxed mb-8">
            Tell me what you need. I reply within 24 hours with questions, a rough plan and a timeline.
          </p>

          {/* Email Box with One-Click Copy */}
          <div className="inline-flex items-center gap-2 p-1.5 pl-4 rounded-full border border-black/10 bg-slate-50 mb-12 shadow-sm">
            <span className="text-xs sm:text-sm font-mono text-[#0a122a]">{email}</span>
            <button
              type="button"
              onClick={handleCopy}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'bg-[#0a122a] text-white hover:bg-blue-600'
              }`}
            >
              {copied ? 'Copied! ✓' : 'Copy'}
            </button>
          </div>

          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">
              What I offer
            </h3>
            <ul className="space-y-2.5 text-sm font-normal text-slate-700">
              {['React & Next.js development', 'Responsive UI / UX Design', 'Full-stack integration', 'API & Database architecture', 'Smooth motion & physics'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">↗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Inquiry Form with Service Chips */}
        <div className="lg:col-span-7">
          <div className="p-8 md:p-12 rounded-3xl border border-black/10 bg-white shadow-2xl relative">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-6 pb-4 border-b border-black/5">
              <span>NEW INQUIRY</span>
              <span className="text-emerald-600">REPLY IN ~24H</span>
            </div>

            {submitted ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-2xl font-bold mb-4">
                  ✓
                </div>
                <h3 className="text-2xl font-semibold text-[#0a122a] mb-2">Message sent.</h3>
                <p className="text-sm text-slate-600 mb-6">
                  Thanks for reaching out! I will review your project details and get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="px-6 py-2 rounded-full border border-black/15 text-xs font-mono uppercase text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Selector Chips */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-500 block mb-3">
                    I need help with
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Website', 'Web system', 'Landing page', 'UI design', 'Something else'].map(
                      (service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => setSelectedService(service)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                            selectedService === service
                              ? 'bg-[#0a122a] text-white font-medium shadow-sm'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {service}
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

                {/* Message */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-500 block mb-1">
                    Project details (goal, timeline, features)
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your project, timeline and what you're looking to build..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-blue-600 focus:outline-none text-sm transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#ff7a45] text-white font-medium text-sm hover:bg-[#ff6426] shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Send message</span>
                  <span>→</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
