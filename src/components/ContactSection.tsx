"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check, MapPin, ArrowRight, ExternalLink, Send } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { useToast } from "./ToastSystem";

const ease = [0.16, 1, 0.3, 1] as const;

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const { showToast } = useToast();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.contact.email);
    setCopied(true);
    showToast("Email address copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2200);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Direct mailto fallback or clean message acknowledgment
    const mailtoUrl = `mailto:${PORTFOLIO_DATA.personal.contact.email}?subject=${encodeURIComponent(
      formData.subject || `Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;

    window.open(mailtoUrl, "_blank");
    setSent(true);
    showToast("Opening your default mail client...", "success");
  };

  return (
    <section id="contact" className="py-24 sm:py-32 border-t border-main">
      <div className="section-container">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 chip mb-4">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "var(--c-blue)" }}
            />
            <span>05 / CONNECT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-heading">
            Let's build something lasting.
          </h2>
          <p className="text-sub text-base sm:text-lg mt-3">
            Open for software engineering roles, hackathon collaborations, and high-impact digital ventures.
          </p>
        </div>

        {/* 2-Column Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Authentic Channels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Primary Email Card */}
            <div className="rounded-2xl p-6 sm:p-7 card-base">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div
                  className="p-2.5 rounded-xl border border-faint text-link"
                  style={{ backgroundColor: "var(--c-surface-raised)" }}
                >
                  <Mail className="w-5 h-5" />
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-main text-sub hover:text-heading transition-colors cursor-pointer"
                  style={{ backgroundColor: "var(--c-surface-raised)" }}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>

              <span className="text-xs font-mono text-dim uppercase tracking-wider block mb-1">
                Primary Contact Email
              </span>
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.contact.email}`}
                className="text-base sm:text-lg font-mono font-semibold text-heading hover:text-link transition-colors block mb-4"
              >
                {PORTFOLIO_DATA.personal.contact.email}
              </a>

              <a
                href={`mailto:${PORTFOLIO_DATA.personal.contact.email}`}
                className="inline-flex items-center gap-2 text-xs font-semibold text-link hover:underline"
              >
                Launch mail client
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Location & Status Card */}
            <div className="rounded-2xl p-6 card-base">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-4 h-4 text-link" />
                <span className="text-xs font-mono uppercase tracking-wider text-dim">
                  Location & Availability
                </span>
              </div>
              <p className="text-sm font-semibold text-heading mb-1">
                {PORTFOLIO_DATA.personal.contact.location}
              </p>
              <p className="text-xs text-sub leading-relaxed">
                Available for remote roles worldwide, on-site internships, and collaborative software projects.
              </p>
            </div>

            {/* Social Network Cards */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={PORTFOLIO_DATA.personal.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl card-base block hover:border-[var(--c-text-2)] transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <GithubIcon className="w-4 h-4 text-heading" />
                  <ExternalLink className="w-3.5 h-3.5 text-dim" />
                </div>
                <span className="text-[11px] font-mono text-dim block">GitHub</span>
                <span className="text-xs font-semibold text-heading truncate block">
                  @kausikhussain
                </span>
              </a>

              <a
                href={PORTFOLIO_DATA.personal.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl card-base block hover:border-[var(--c-text-2)] transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <LinkedinIcon className="w-4 h-4 text-link" />
                  <ExternalLink className="w-3.5 h-3.5 text-dim" />
                </div>
                <span className="text-[11px] font-mono text-dim block">LinkedIn</span>
                <span className="text-xs font-semibold text-heading truncate block">
                  Sk Kausik Hussain
                </span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Clean Direct Message Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl p-6 sm:p-8 card-base">
              <h3 className="text-xl font-display font-bold text-heading mb-2">
                Send a direct dispatch
              </h3>
              <p className="text-xs text-sub mb-6">
                Fill out the message details below to initiate contact directly.
              </p>

              {sent ? (
                <div className="py-8 text-center">
                  <div
                    className="w-12 h-12 rounded-full mx-auto flex items-center justify-center text-emerald-500 mb-4 border border-faint"
                    style={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                  >
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-heading mb-1">
                    Dispatch Prepared
                  </h4>
                  <p className="text-xs text-sub max-w-sm mx-auto mb-6">
                    If your mail client didn&apos;t open automatically, you can always reach me directly at{" "}
                    <span className="font-mono text-heading">{PORTFOLIO_DATA.personal.contact.email}</span>.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold border border-main text-sub hover:text-heading cursor-pointer"
                  >
                    Compose Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-dim block mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Elena Rostova"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-main text-heading text-sm focus:outline-none transition-colors"
                        style={{ backgroundColor: "var(--c-surface-raised)" }}
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-dim block mb-1.5">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="elena@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-main text-heading text-sm focus:outline-none transition-colors"
                        style={{ backgroundColor: "var(--c-surface-raised)" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-dim block mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Engineering Role / Project Opportunity"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-main text-heading text-sm focus:outline-none transition-colors"
                      style={{ backgroundColor: "var(--c-surface-raised)" }}
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-dim block mb-1.5">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about the problem, vision, or role..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-main text-heading text-sm focus:outline-none transition-colors resize-none"
                      style={{ backgroundColor: "var(--c-surface-raised)" }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200"
                    style={{
                      backgroundColor: "var(--c-text)",
                      color: "var(--c-bg)",
                    }}
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
