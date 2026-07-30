"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Copy, Check, MapPin } from "lucide-react";
import confetti from "canvas-confetti";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { useToast } from "./ToastSystem";
import Section from "./ui/Section";
import Heading from "./ui/Heading";
import Card from "./ui/Card";
import Button from "./ui/Button";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.contact.email);
    setCopied(true);
    showToast("Email address copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      showToast("Transmission sent successfully! Kausik will reply shortly.", "success");

      // Trigger Confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1000);
  };

  return (
    <Section id="contact" withGlow={true}>
      <Heading
        badge="INITIATE COLLABORATION"
        badgeIcon={<Mail className="w-3.5 h-3.5" />}
        title="Let's Build Something"
        gradientText="Extraordinary"
        subtitle="Available for high-impact AI engineering, full-stack architecture, and 3D web development."
        align="center"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Contact & Social Cards */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 space-y-6"
        >
          {/* Email Card */}
          <Card hoverGlow={true}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <Mail className="w-6 h-6" />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyEmail}
                icon={copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              >
                {copied ? "Copied!" : "Copy Email"}
              </Button>
            </div>

            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Direct Email</h3>
            <p className="text-sm sm:text-base font-bold text-white font-mono">{PORTFOLIO_DATA.personal.contact.email}</p>
          </Card>

          {/* Location & Status */}
          <Card hoverGlow={true}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase">Location</h4>
                <p className="text-sm font-bold text-white">{PORTFOLIO_DATA.personal.contact.location}</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Open to Remote & On-site opportunities in AI/ML, Full-Stack Development, and Frontend Engineering worldwide.
            </p>
          </Card>

          {/* Social Links */}
          <div className="grid grid-cols-2 gap-4">
            <a
              href={PORTFOLIO_DATA.personal.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="p-5 flex items-center gap-3 group hover:border-indigo-400/50" hoverGlow={false}>
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-300 group-hover:text-white">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block">GitHub</span>
                  <span className="text-xs font-bold text-white group-hover:text-indigo-300">@kausikhussain</span>
                </div>
              </Card>
            </a>

            <a
              href={PORTFOLIO_DATA.personal.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="p-5 flex items-center gap-3 group hover:border-indigo-400/50" hoverGlow={false}>
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-blue-400 group-hover:text-blue-300">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block">LinkedIn</span>
                  <span className="text-xs font-bold text-white group-hover:text-indigo-300">Sk Kausik Hussain</span>
                </div>
              </Card>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Interactive Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7"
        >
          <Card className="p-8 sm:p-10" hoverGlow={false}>
            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Transmission Received!</h3>
                <p className="text-slate-400 text-sm max-w-md mb-6">
                  Thank you for reaching out. I have received your message and will respond within 24 hours.
                </p>
                <Button variant="secondary" size="sm" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Vance"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Engineering Role / Project Inquiry"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your vision or opportunity..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  variant="primary"
                  size="lg"
                  fullWidth={true}
                  icon={<Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                >
                  {submitting ? "SENDING MESSAGE..." : "TRANSMIT MESSAGE"}
                </Button>
              </form>
            )}
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}
