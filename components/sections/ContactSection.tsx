"use client";

/**
 * Contact Section
 * Posts to /api/contact. Success and error states are announced to
 * assistive tech via a polite live region.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import {
  fadeInUp,
  fadeInRight,
  staggerContainer,
  defaultViewport,
} from "@/lib/animations";
import { Send, Mail, Phone, MapPin } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !json.ok) {
        throw new Error(json?.error ?? "request_failed");
      }
      setStatus("success");
      setFormData({ fullName: "", email: "", phone: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "unknown_error");
    }
  };

  const disabled = status === "sending" || status === "success";

  return (
    <section id="contact" className="section bg-background">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-[var(--color-accent)] rounded-full" aria-hidden="true" />
                <span className="text-sm tracking-widest uppercase text-[var(--color-text-secondary)]">
                  Get in Touch
                </span>
              </div>
              <h2 className="mb-6">Ready to bring your vision to life?</h2>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-md">
                Contact us to discuss your project and learn how VADO can
                transform your ideas into reality.
              </p>
            </motion.div>

            <motion.form
              variants={fadeInUp}
              onSubmit={handleSubmit}
              noValidate
              className="space-y-6"
            >
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                  Full Name <span aria-hidden="true">*</span>
                  <span className="sr-only">required</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="w-full px-4 py-3 bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border)] focus:border-[var(--color-accent)] focus:ring-0 outline-none transition-colors duration-200"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                  Email Address <span aria-hidden="true">*</span>
                  <span className="sr-only">required</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3 bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border)] focus:border-[var(--color-accent)] focus:ring-0 outline-none transition-colors duration-200"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  className="w-full px-4 py-3 bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border)] focus:border-[var(--color-accent)] focus:ring-0 outline-none transition-colors duration-200"
                  placeholder="+966 XXX XXX XXX"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                  Message <span aria-hidden="true">*</span>
                  <span className="sr-only">required</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border)] focus:border-[var(--color-accent)] focus:ring-0 outline-none transition-colors duration-200 resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={disabled}
                aria-busy={status === "sending"}
                className={`inline-flex items-center gap-3 px-8 py-4 min-h-[var(--touch-target)] text-sm tracking-widest uppercase transition-all duration-300 ${
                  status === "success"
                    ? "bg-[var(--color-success)] text-[var(--color-success-foreground)]"
                    : "bg-[var(--color-accent)] text-[var(--color-background)] hover:opacity-90 disabled:opacity-60"
                }`}
              >
                {status === "success"
                  ? "Message Sent"
                  : status === "sending"
                  ? "Sending…"
                  : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" aria-hidden="true" />
                    </>
                  )}
              </button>

              {/* Live region for status announcements */}
              <p
                role="status"
                aria-live="polite"
                className="text-sm text-[var(--color-text-muted)] mt-4 min-h-5"
              >
                {status === "success" &&
                  "Thanks — your message has been received. We respond within 24–48 hours."}
                {status === "error" &&
                  `We couldn’t send your message (${errorMsg ?? "unknown error"}). Please try again or email info@vado.sa.`}
                {status === "idle" && "We typically respond within 24–48 hours."}
                {status === "sending" && "Sending your message…"}
              </p>
            </motion.form>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInRight}
            className="lg:pt-24"
          >
            <div className="bg-[var(--color-surface)] p-8 md:p-12">
              <h3 className="text-2xl font-light mb-8">Contact Information</h3>

              <address className="not-italic space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 mt-1 text-[var(--color-text-secondary)]" aria-hidden="true" />
                  <div>
                    <p className="text-sm text-[var(--color-text-muted)] mb-1">Email</p>
                    <a href="mailto:info@vado.sa" className="text-lg underline-hover">
                      info@vado.sa
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 mt-1 text-[var(--color-text-secondary)]" aria-hidden="true" />
                  <div>
                    <p className="text-sm text-[var(--color-text-muted)] mb-1">Phone</p>
                    <a href="tel:+966542900447" className="text-lg underline-hover">
                      +966 542 900 447
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 mt-1 text-[var(--color-text-secondary)]" aria-hidden="true" />
                  <div>
                    <p className="text-sm text-[var(--color-text-muted)] mb-1">Headquarters</p>
                    <p className="text-lg text-[var(--color-text-primary)]">
                      Al Fardan Tower — Office 401, Al Khobar, Saudi Arabia
                    </p>
                  </div>
                </div>
              </address>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
