/**
 * Suppliers Page
 * ==============
 * A dedicated page for suppliers and vendors to register their company, kept
 * separate from the homepage contact form (which is for project enquiries /
 * potential clients). Server component: the only interactive part is the
 * <LeadForm> client island.
 */

import { Metadata } from "next";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LeadForm, { LeadFormField } from "@/components/forms/LeadForm";
import { SUPPLIERS_EMAIL } from "@/lib/site";

// The layout template appends " | VADO", so the title stays bare here.
export const metadata: Metadata = {
  title: "Suppliers — Register Your Company",
  description:
    "Suppliers and vendors: register your company with VADO, an architecture and engineering consultancy in Al Khobar, Saudi Arabia, to be considered for our projects.",
  alternates: {
    canonical: "/suppliers",
  },
};

const SUPPLIER_FIELDS: LeadFormField[] = [
  { name: "company", label: "Company Name", type: "text", required: true, placeholder: "Your company name" },
  { name: "contactPerson", label: "Contact Person", type: "text", required: true, placeholder: "Full name" },
  { name: "email", label: "Email Address", type: "email", required: true, placeholder: "company@email.com" },
  { name: "phone", label: "Phone Number", type: "tel", placeholder: "+966 XXX XXX XXX" },
  {
    name: "category",
    label: "What you supply",
    type: "text",
    required: true,
    placeholder: "Products or services you provide",
  },
  { name: "website", label: "Website", type: "url", placeholder: "https://" },
  { name: "message", label: "About your company", type: "textarea", placeholder: "Tell us about your company (optional)" },
];

export default function SuppliersPage() {
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
                  Suppliers
                </span>
              </div>

              <h1>Become a VADO supplier</h1>

              <p className="text-lg leading-relaxed text-gray-600 mt-10 max-w-2xl">
                We work with reliable suppliers and vendors across materials,
                products, and specialist services. Register your company below and
                our team will add you to our list for relevant projects.
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
                  Share your company details and what you supply. We keep this on
                  file and reach out when there is a project that matches what you
                  offer.
                </p>
                <p className="text-sm text-gray-500">
                  Prefer email? Write to us at{" "}
                  <a
                    href={`mailto:${SUPPLIERS_EMAIL}`}
                    className="underline hover:text-black transition-colors"
                  >
                    {SUPPLIERS_EMAIL}
                  </a>
                  .
                </p>
              </div>

              {/* Form */}
              <div className="lg:col-span-7">
                <LeadForm
                  fields={SUPPLIER_FIELDS}
                  subject="New supplier enquiry — VADO"
                  submitLabel="Register as a Supplier"
                  successText="Thanks, your details are on their way. We'll review and reach out for a fit."
                  fallbackEmail={SUPPLIERS_EMAIL}
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
