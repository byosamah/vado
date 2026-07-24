"use client";

/**
 * Contact Section Component
 * =========================
 * Project-enquiry form plus the firm's contact details.
 *
 * Submission goes through the shared `submitToWeb3Forms` helper rather than a
 * private copy of the fetch logic, so this form, /careers, and /suppliers all
 * share one lifecycle and one set of error strings.
 *
 * Animation (GSAP):
 * - Root <section> registers useReveals(root) which drives all scroll reveals.
 * - Header: the kicker rises in (data-reveal); the h2 does a SplitText masked
 *   line reveal (data-headline); the intro paragraph rises in (data-reveal).
 * - Form fields and the submit button each carry data-reveal so they stagger
 *   in as the form scrolls into view.
 * - The contact-info card slides in from the trailing side (data-reveal="right",
 *   which the reveal engine mirrors under RTL); its inner rows stagger.
 * - Reduced motion leaves every element fully visible (handled by useReveals).
 *
 * RTL: arrow glyphs carry `rtl:rotate-180`; the email and phone are wrapped in
 * dir="ltr" so the bidi algorithm does not move the leading "+" of the number.
 */

import { Fragment, useRef, useState } from "react";
import Link from "next/link";
import { useReveals } from "@/lib/gsap/reveals";
import { submitToWeb3Forms } from "@/lib/web3forms";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
} from "@/lib/site";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Send, Mail, Phone, MapPin, Briefcase, Package, ArrowRight } from "lucide-react";

interface ContactSectionProps {
  lang: Locale;
  contact: Dictionary["home"]["contact"];
  forms: Dictionary["forms"];
  /** Web3Forms subject line, so the inbox shows which edition the lead came from. */
  subject: string;
}

export default function ContactSection({
  lang,
  contact,
  forms,
  subject,
}: ContactSectionProps) {
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

  // Posts to Web3Forms, which relays the message to info@vado.sa. The visitor's
  // email is used as reply-to, so replies go straight back to them.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const result = await submitToWeb3Forms(e.currentTarget, subject, {
      genericError: forms.genericError,
      networkError: forms.networkError,
    });

    if (result.success) {
      setStatus("success");
      setFormData({ fullName: "", email: "", phone: "", message: "" });
      // Return the button to its resting state after a few seconds.
      setTimeout(() => setStatus("idle"), 5000);
    } else {
      setStatus("error");
      setErrorMessage(result.message);
    }
  };

  const fieldClasses =
    "w-full px-4 py-3 border border-gray-300 focus:border-black focus:ring-0 transition-colors duration-200 outline-none";

  return (
    <section ref={root} id="contact" className="section bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Form */}
          <div>
            {/* Section Header */}
            <div className="mb-12">
              <div data-reveal className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-black rounded-full" />
                <span className="text-sm tracking-widest uppercase text-gray-600">
                  {contact.kicker}
                </span>
              </div>
              {/* Fragments, not spans: a <br> nested inside a span makes that
                  span's inline box cover TWO lines, which doubles the height of
                  the SplitText mask wrapper and blows a gap open in the
                  headline. Fragments emit bare `text<br>text`. */}
              <h2 data-headline className="mb-10">
                {contact.headlineLines.map((line, index) => (
                  <Fragment key={line}>
                    {index > 0 && <br />}
                    {line}
                  </Fragment>
                ))}
              </h2>
              <p data-reveal className="text-lg text-gray-600 max-w-md">
                {contact.intro}
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
                  {forms.fullName}
                  {forms.requiredMark}
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className={fieldClasses}
                  placeholder={forms.fullNamePlaceholder}
                />
              </div>

              {/* Email */}
              <div data-reveal>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {forms.email}
                  {forms.requiredMark}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={fieldClasses}
                  placeholder={forms.emailPlaceholder}
                  dir="ltr"
                />
              </div>

              {/* Phone (Optional) */}
              <div data-reveal>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {forms.phone}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={fieldClasses}
                  placeholder={forms.phonePlaceholder}
                  dir="ltr"
                />
              </div>

              {/* Message */}
              <div data-reveal>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {forms.message}
                  {forms.requiredMark}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`${fieldClasses} resize-none`}
                  placeholder={forms.messagePlaceholder}
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
                {status === "submitting" && forms.sending}
                {status === "success" && forms.sent}
                {(status === "idle" || status === "error") && (
                  <>
                    {forms.send}
                    <Send className="w-4 h-4 rtl:-scale-x-100" />
                  </>
                )}
              </button>

              {/* Feedback — success / error / resting response-time note */}
              {status === "success" && (
                <p role="status" className="text-sm text-green-700 mt-4">
                  {forms.successNote}
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="text-sm text-red-600 mt-4">
                  {errorMessage}{" "}
                  {forms.orEmailUs}{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="underline" dir="ltr">
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              )}
              {(status === "idle" || status === "submitting") && (
                <p className="text-sm text-gray-500 mt-4">
                  {forms.responseNote}
                </p>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div data-reveal="right" className="lg:pt-24">
            <div className="bg-gray-50 p-8 md:p-12">
              <h3 className="mb-8">{contact.infoHeading}</h3>

              <div className="space-y-6">
                {/* Email */}
                <div data-reveal className="flex items-start gap-4">
                  <Mail className="w-5 h-5 mt-1 text-gray-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      {contact.emailLabel}
                    </p>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-lg inline-block py-2 -my-2 hover:text-gray-600 transition-colors"
                      dir="ltr"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div data-reveal className="flex items-start gap-4">
                  <Phone className="w-5 h-5 mt-1 text-gray-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      {contact.phoneLabel}
                    </p>
                    <a
                      href={`tel:${CONTACT_PHONE}`}
                      className="text-lg inline-block py-2 -my-2 hover:text-gray-600 transition-colors"
                      dir="ltr"
                    >
                      {CONTACT_PHONE_DISPLAY}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div data-reveal className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 mt-1 text-gray-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      {contact.addressLabel}
                    </p>
                    <p className="text-lg">
                      {contact.addressLines.map((line, index) => (
                        <Fragment key={line}>
                          {index > 0 && <br />}
                          {line}
                        </Fragment>
                      ))}
                    </p>
                  </div>
                </div>
              </div>

              {/* Careers & Suppliers — route non-client audiences to their
                  own forms so this one stays for project enquiries */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-6">
                  {contact.otherEnquiries}
                </p>
                <div className="space-y-5">
                  <div data-reveal className="flex items-start gap-4">
                    <Briefcase className="w-5 h-5 mt-1 text-gray-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        {contact.careersLabel}
                      </p>
                      <Link
                        href={localePath(lang, "/careers")}
                        className="text-lg inline-flex items-center gap-2 py-2 -my-2 hover:text-gray-600 transition-colors"
                      >
                        {contact.careersLink}
                        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                      </Link>
                    </div>
                  </div>
                  <div data-reveal className="flex items-start gap-4">
                    <Package className="w-5 h-5 mt-1 text-gray-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        {contact.suppliersLabel}
                      </p>
                      <Link
                        href={localePath(lang, "/suppliers")}
                        className="text-lg inline-flex items-center gap-2 py-2 -my-2 hover:text-gray-600 transition-colors"
                      >
                        {contact.suppliersLink}
                        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Established */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500">{contact.established}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
