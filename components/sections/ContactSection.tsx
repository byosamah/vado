"use client";

/**
 * Contact Section Component
 * =========================
 * Contact form section for VADO with form fields and contact information.
 *
 * Features:
 * - Full Name, Email, Phone (optional), Message fields
 * - Form validation
 * - Response time note
 * - Contact info sidebar
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, defaultViewport } from "@/lib/animations";
import { Send, Mail, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to an API
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ fullName: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  return (
    <section id="contact" className="section bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainer}
          >
            {/* Section Header */}
            <motion.div variants={fadeInUp} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-black rounded-full" />
                <span className="text-sm tracking-widest uppercase text-gray-600">
                  Get in Touch
                </span>
              </div>
              <h2 className="mb-6">
                Ready to bring your
                <br />
                vision to life?
              </h2>
              <p className="text-lg text-gray-600 max-w-md">
                Contact us to discuss your project and learn how VADO can
                transform your ideas into reality.
              </p>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              variants={fadeInUp}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Full Name */}
              <div>
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
              <div>
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
              <div>
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
              <div>
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
                type="submit"
                disabled={isSubmitted}
                className={`
                  inline-flex items-center gap-3
                  px-8 py-4
                  text-sm tracking-widest uppercase
                  transition-all duration-300
                  ${
                    isSubmitted
                      ? "bg-green-600 text-white"
                      : "bg-black text-white hover:bg-gray-800"
                  }
                `}
              >
                {isSubmitted ? (
                  "Message Sent!"
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Response Time Note */}
              <p className="text-sm text-gray-500 mt-4">
                We typically respond within 24-48 hours.
              </p>
            </motion.form>
          </motion.div>

          {/* Right Column - Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInRight}
            className="lg:pt-24"
          >
            <div className="bg-gray-50 p-8 md:p-12">
              <h3 className="text-2xl font-light mb-8">Contact Information</h3>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 mt-1 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <a
                      href="mailto:info@vado.sa"
                      className="text-lg hover:text-gray-600 transition-colors"
                    >
                      info@vado.sa
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 mt-1 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <a
                      href="tel:+966542900447"
                      className="text-lg hover:text-gray-600 transition-colors"
                    >
                      +966 542 900 447
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
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

              {/* Established */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Established 1994 • Al Khobar, Saudi Arabia
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
