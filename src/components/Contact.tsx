import React, { useState } from 'react';
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactFormValues, FormErrors } from '../types/portfolio';
import { validateContactForm } from '../utils/validation';
import { AnalyticsEvents } from '../utils/firebaseAnalytics';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormValues>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [lastSentMailto, setLastSentMailto] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const mailto = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
    )}`;
    setLastSentMailto(mailto);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        AnalyticsEvents.trackContactFormSubmitted(true);
      }
    } catch (err) {
      console.warn('API contact recording fallback:', err);
    }

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-24 border-t border-slate-200 dark:border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-semibold">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Let's Build Something Great Together.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed text-pretty">
            Have an opportunity, project idea, or collaboration in mind? I'd love to connect and discuss how we can create something meaningful.
          </p>
        </div>

        {/* 2-Column Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info (col-span-5) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="theme-card-surface p-6 rounded-2xl space-y-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Contact Information
              </h3>

              <div className="space-y-4">
                {/* Email (Clickable mailto) */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">Direct Email</span>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-sm font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-cyan-50 dark:bg-indigo-950/80 border border-cyan-200 dark:border-indigo-800/60 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">Location</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {PERSONAL_INFO.location}
                    </span>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">LinkedIn Profile</span>
                    <a
                      href={PERSONAL_INFO.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      linkedin.com/in/shubham-bansal-600099424
                    </a>
                  </div>
                </div>

                {/* GitHub */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-indigo-950/80 border border-slate-300 dark:border-indigo-800/60 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">GitHub Profile</span>
                    <a
                      href={PERSONAL_INFO.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      github.com/SHUBHAMBANSAL58
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Note on opportunities */}
            <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <span className="font-semibold text-slate-900 dark:text-slate-200 block mb-1">Open to Opportunities</span>
              Currently seeking Software Engineering Internships, Full Stack Development roles, and collaborative open-source projects.
            </div>
          </div>

          {/* Right Column: Functional Contact Form (col-span-7) */}
          <div className="theme-card-surface lg:col-span-7 p-6 sm:p-8 rounded-2xl backdrop-blur-sm">
            {submitSuccess && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-sm flex items-start gap-3 animate-in fade-in duration-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-2 flex-1">
                  <div>
                    <p className="font-semibold">Message recorded & sent!</p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400/90 mt-0.5">
                      Thank you for reaching out. A message draft was generated for {PERSONAL_INFO.email}.
                    </p>
                  </div>
                  {lastSentMailto && (
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <a
                        href={lastSentMailto}
                        className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-medium rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white transition-colors border border-emerald-600/60 shadow-xs"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Launch Mail Client</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setSubmitSuccess(false)}
                        className="text-xs text-emerald-700 dark:text-emerald-300/70 hover:text-emerald-900 dark:hover:text-white px-2 py-1 transition-colors cursor-pointer"
                      >
                        Send another note
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Your Name <span className="text-indigo-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Johnson"
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-950/80 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                      errors.name ? 'border-rose-500/80 focus:ring-rose-500' : 'border-slate-300 dark:border-slate-800 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-rose-500 dark:text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Your Email <span className="text-indigo-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex@company.com"
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-950/80 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                      errors.email ? 'border-rose-500/80 focus:ring-rose-500' : 'border-slate-300 dark:border-slate-800 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-500 dark:text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Subject <span className="text-indigo-500">*</span>
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Internship Inquiry / Project Collaboration"
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-950/80 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.subject ? 'border-rose-500/80 focus:ring-rose-500' : 'border-slate-300 dark:border-slate-800 focus:ring-indigo-500'
                  }`}
                />
                {errors.subject && (
                  <p className="text-[11px] text-rose-500 dark:text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Message <span className="text-indigo-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your project, internship opportunity, or question..."
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-950/80 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 transition-all resize-y ${
                    errors.message ? 'border-rose-500/80 focus:ring-rose-500' : 'border-slate-300 dark:border-slate-800 focus:ring-indigo-500'
                  }`}
                />
                {errors.message && (
                  <p className="text-[11px] text-rose-500 dark:text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 rounded-lg shadow-lg shadow-indigo-600/25 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
