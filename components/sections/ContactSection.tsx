"use client";

/**
 * Contact Section Component
 * =========================
 * Contact form section for VADO with form fields and contact information.
 *
 * Animation (GSAP):
 * - Root <section> registers useReveals(root) which drives all scroll reveals.
 * - Left header: "Get in Touch" subtitle rises in (data-reveal); the h2 does a
 *   SplitText masked line reveal (data-headline, its <br> splitting the lines);
 *   the intro paragraph rises in (data-reveal).
 * - Form fields (Full Name, Email, Phone, Message) and the submit button each
 *   carry data-reveal so they stagger in as the form scrolls into view.
 * - Right contact-info card slides in from the right (data-reveal="right");
 *   its inner rows (email/phone/address) carry data-reveal to stagger.
 * - Reduced motion leaves every element fully visible (handled by useReveals).
 *
 * Features:
 * - Full Name, Email, Phone (optional), Message fields
 * - Form validation
 * - Response time note
 * - Contact info sidebar
 */

import { useRef, useState } from "react";
import Link from "next/link";
import { useReveals } from "@/lib/gsap/reveals";
import { Send, Mail, Phone, MapPin, Briefcase, Package, ArrowRight } from "lucide-react";

export default function ContactSection() {
  // Root ref for scroll-triggered reveals
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  // Submission lifecycle: idle → submitting → success | error
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission — posts to Web3Forms, which relays the message to
  // info@vado.sa. The visitor's email is used as reply-to, so replies from the
  // inbox go straight back to them.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    // Serialize the form (this also picks up the hidden botcheck honeypot) and
    // attach the Web3Forms fields. The access key is a public client-side key
    // by design, so exposing it in the browser bundle is expected.
    const payload = new FormData(e.currentTarget);
    payload.append(
      "access_key",
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? ""
    );
    payload.append("subject", "New enquiry from the VADO website");
    payload.append("from_name", "VADO Website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setFormData({ fullName: "", email: "", phone: "", message: "" });
        // Return the button to its resting state after a few seconds.
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMessage(
          data.message || "Something went wrong. Please try again."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Couldn't reach the mail service. Please try again, or email us directly at info@vado.sa."
      );
    }
  };

  return (
    <section ref={root} id="contact" className="section bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Form */}
          <div>
            {/* Section Header */}
            <div className="mb-12">
              <div data-reveal className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-black rounded-full" />
                <span className="text-sm tracking-widest uppercase text-gray-600">
                  Get in Touch
                </span>
              </div>
              <h2 data-headline className="mb-10">
                Ready to bring your
                <br />
                vision to life?
              </h2>
              <p data-reveal className="text-lg text-gray-600 max-w-md">
                Contact us to discuss your project and learn how VADO can
                transform your ideas into reality.
              </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot — invisible to humans; bots that tick it get rejected */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {/* Full Name */}
              <div data-reveal>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="
                    w-full px-4 py-3
                    border border-gray-300
                    focus:border-black focus:ring-0
                    transition-colors duration-200
                    outline-none
                  "
                  placeholder="Your full name"
                />
              </div>

              {/* Email */}
              <div data-reveal>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="
                    w-full px-4 py-3
                    border border-gray-300
                    focus:border-black focus:ring-0
                    transition-colors duration-200
                    outline-none
                  "
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone (Optional) */}
              <div data-reveal>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="
                    w-full px-4 py-3
                    border border-gray-300
                    focus:border-black focus:ring-0
                    transition-colors duration-200
                    outline-none
                  "
                  placeholder="+966 XXX XXX XXX"
                />
              </div>

              {/* Message */}
              <div data-reveal>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="
                    w-full px-4 py-3
                    border border-gray-300
                    focus:border-black focus:ring-0
                    transition-colors duration-200
                    outline-none
                    resize-none
                  "
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Submit Button */}
              <button
                data-reveal
                type="submit"
                disabled={status === "submitting" || status === "success"}
                className={`
                  inline-flex items-center gap-3
                  px-8 py-4
                  text-sm tracking-widest uppercase
                  transition-all duration-300
                  disabled:cursor-not-allowed
                  ${
                    status === "success"
                      ? "bg-green-600 text-white"
                      : "bg-black text-white hover:bg-gray-800"
                  }
                `}
              >
                {status === "submitting" && "Sending..."}
                {status === "success" && "Message Sent!"}
                {(status === "idle" || status === "error") && (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Feedback — success / error / resting response-time note */}
              {status === "success" && (
                <p role="status" className="text-sm text-green-700 mt-4">
                  Thanks, your message is on its way. We&apos;ll be in touch
                  within 24-48 hours.
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="text-sm text-red-600 mt-4">
                  {errorMessage}
                </p>
              )}
              {(status === "idle" || status === "submitting") && (
                <p className="text-sm text-gray-500 mt-4">
                  We typically respond within 24-48 hours.
                </p>
              )}
            </form>
          </div>

          {/* Right Column - Contact Info */}
          <div data-reveal="right" className="lg:pt-24">
            <div className="bg-gray-50 p-8 md:p-12">
              <h3 className="mb-8">Contact Information</h3>

              <div className="space-y-6">
                {/* Email */}
                <div data-reveal className="flex items-start gap-4">
                  <Mail className="w-5 h-5 mt-1 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <a
                      href="mailto:info@vado.sa"
                      className="text-lg inline-block py-2 -my-2 hover:text-gray-600 transition-colors"
                    >
                      info@vado.sa
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div data-reveal className="flex items-start gap-4">
                  <Phone className="w-5 h-5 mt-1 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <a
                      href="tel:+966542900447"
                      className="text-lg inline-block py-2 -my-2 hover:text-gray-600 transition-colors"
                    >
                      +966 542 900 447
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div data-reveal className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 mt-1 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Headquarters</p>
                    <p className="text-lg">
                      Al Fardan Tower – Office 401
                      <br />
                      Al Khobar, Saudi Arabia
                    </p>
                  </div>
                </div>
              </div>

              {/* Careers & Suppliers — route non-client audiences to their
                  own forms so this one stays for project enquiries */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-6">
                  The form on the left is for project enquiries. If you are here
                  for something else:
                </p>
                <div className="space-y-5">
                  <div data-reveal className="flex items-start gap-4">
                    <Briefcase className="w-5 h-5 mt-1 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Careers</p>
                      <Link
                        href="/careers"
                        className="text-lg inline-flex items-center gap-2 py-2 -my-2 hover:text-gray-600 transition-colors"
                      >
                        Submit your CV
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                  <div data-reveal className="flex items-start gap-4">
                    <Package className="w-5 h-5 mt-1 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Suppliers</p>
                      <Link
                        href="/suppliers"
                        className="text-lg inline-flex items-center gap-2 py-2 -my-2 hover:text-gray-600 transition-colors"
                      >
                        Register as a supplier
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Established */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Established 1994 • Al Khobar, Saudi Arabia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
