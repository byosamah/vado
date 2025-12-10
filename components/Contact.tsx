import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { Send } from 'lucide-react';

const Contact: React.FC = () => {
  const { setCursorState } = useCursor();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (replace with actual form service like Formspree)
    // Example with Formspree: action="https://formspree.io/f/YOUR_FORM_ID"
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact-form" className="py-24 md:py-32 px-6 md:px-12 bg-white border-t border-neutral-200">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Column - Title & Description */}
          <div className="lg:col-span-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-semibold mb-8"
            >
              Get in Touch
            </motion.h2>
            <div className="w-12 h-1 bg-black mb-8" />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-neutral-600 leading-relaxed mb-6"
            >
              Ready to bring your vision to life? Contact us to discuss your project and learn how VADO can transform your ideas into reality.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm text-neutral-500"
            >
              We typically respond within 24-48 hours.
            </motion.p>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-7 lg:col-start-6">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-widest text-neutral-500 mb-3">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setCursorState('text')}
                  onBlur={() => setCursorState('default')}
                  className="w-full bg-transparent border-b border-neutral-300 py-3 text-lg focus:border-black focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-widest text-neutral-500 mb-3">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setCursorState('text')}
                  onBlur={() => setCursorState('default')}
                  className="w-full bg-transparent border-b border-neutral-300 py-3 text-lg focus:border-black focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone Field (Optional) */}
              <div>
                <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-neutral-500 mb-3">
                  Phone Number <span className="text-neutral-400">(Optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setCursorState('text')}
                  onBlur={() => setCursorState('default')}
                  className="w-full bg-transparent border-b border-neutral-300 py-3 text-lg focus:border-black focus:outline-none transition-colors"
                  placeholder="+966 XX XXX XXXX"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-widest text-neutral-500 mb-3">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setCursorState('text')}
                  onBlur={() => setCursorState('default')}
                  className="w-full bg-transparent border-b border-neutral-300 py-3 text-lg focus:border-black focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={() => setCursorState('hover')}
                  onMouseLeave={() => setCursorState('default')}
                  className="group px-8 py-4 bg-black text-white rounded-full uppercase text-sm tracking-widest hover:bg-neutral-800 transition-all duration-300 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  <Send size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>

              {/* Success Message */}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <p className="text-green-800 text-sm">
                    Thank you for your message! We'll get back to you soon.
                  </p>
                </motion.div>
              )}
            </motion.form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
