/**
 * Careers Page
 * ============
 * A dedicated page for job applicants to submit their CV, kept separate from
 * the homepage contact form (which is for project enquiries / potential
 * clients). Server component: the only interactive part is the <LeadForm>
 * client island. Applicants share their CV as a link (Drive / Dropbox /
 * LinkedIn) rather than a file upload.
 */

import { Metadata } from "next";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LeadForm, { LeadFormField } from "@/components/forms/LeadForm";
import { CAREERS_EMAIL } from "@/lib/site";

// The layout template appends " | VADO", so the title stays bare here.
export const metadata: Metadata = {
  title: "Careers — Submit Your CV",
  description:
    "Join VADO, an architecture and engineering consultancy in Al Khobar, Saudi Arabia. Submit your CV and portfolio to be considered for current and future roles.",
  alternates: {
    canonical: "/careers",
  },
};

const CAREERS_FIELDS: LeadFormField[] = [
  { name: "fullName", label: "Full Name", type: "text", required: true, placeholder: "Your full name" },
  { name: "email", label: "Email Address", type: "email", required: true, placeholder: "your@email.com" },
  { name: "phone", label: "Phone Number", type: "tel", placeholder: "+966 XXX XXX XXX" },
  { name: "role", label: "Role of Interest", type: "text", placeholder: "e.g. Architect, Structural Engineer, BIM" },
  {
    name: "cv_link",
    label: "Link to your CV or portfolio",
    type: "url",
    required: true,
    placeholder: "Google Drive, Dropbox, or LinkedIn link",
  },
  { name: "message", label: "Short note", type: "textarea", placeholder: "Anything you'd like us to know (optional)" },
];

export default function CareersPage() {
  return (
    <>
      <Header forceSolid />

      <main className="pt-24">
        {/* Intro — same .section/.container structure as the other subpage
            intros so they all share one responsive rhythm */}
        <section className="section">
          <div className="container">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-black rounded-full" />
                <span className="text-sm tracking-widest uppercase text-gray-600">
                  Careers
                </span>
              </div>

              <h1>Join the VADO team</h1>

              <p className="text-lg leading-relaxed text-gray-600 mt-10 max-w-2xl">
                We are always glad to meet architects, engineers, and project
                professionals who care about the craft. Share your CV and
                portfolio below and we will keep you in mind for current and
                upcoming roles.
              </p>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="border-t border-gray-200">
          <div className="container py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Guidance */}
              <div className="lg:col-span-5">
                <h2 className="mb-6">How it works</h2>
                <p className="text-base leading-relaxed text-gray-600 mb-6">
                  Add a link to your CV or portfolio (a Google Drive, Dropbox, or
                  LinkedIn link works well). Tell us the kind of role you are
                  looking for, and we will reach out if there is a fit.
                </p>
                <p className="text-sm text-gray-500">
                  Prefer email? Write to us at{" "}
                  <a
                    href={`mailto:${CAREERS_EMAIL}`}
                    className="underline hover:text-black transition-colors"
                  >
                    {CAREERS_EMAIL}
                  </a>
                  .
                </p>
              </div>

              {/* Form */}
              <div className="lg:col-span-7">
                <LeadForm
                  fields={CAREERS_FIELDS}
                  subject="New CV submission — VADO Careers"
                  submitLabel="Submit Application"
                  successText="Thanks, your application is on its way. We'll be in touch if there's a fit."
                  fallbackEmail={CAREERS_EMAIL}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
