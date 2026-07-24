/**
 * Suppliers Page
 * ==============
 * A dedicated page for suppliers and vendors to register their company, kept
 * separate from the homepage contact form (which is for project enquiries /
 * potential clients). Server component: the only interactive part is the
 * <LeadForm> client island.
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LeadForm, { LeadFormField } from "@/components/forms/LeadForm";
import { buildAlternates } from "@/lib/seo";
import { SUPPLIERS_EMAIL } from "@/lib/site";
import { LOCALES, isLocale } from "@/lib/i18n/config";
import { getDictionary, type Dictionary } from "@/lib/i18n/get-dictionary";

const PATH = "/suppliers";

/** Field config built from the active dictionary, so labels follow the locale. */
function supplierFields(dict: Dictionary): LeadFormField[] {
  const copy = dict.pages.suppliers;
  return [
    {
      name: "company",
      label: copy.companyLabel,
      type: "text",
      required: true,
      placeholder: copy.companyPlaceholder,
    },
    {
      name: "contactPerson",
      label: copy.contactPersonLabel,
      type: "text",
      required: true,
      placeholder: copy.contactPersonPlaceholder,
    },
    {
      name: "email",
      label: dict.forms.email,
      type: "email",
      required: true,
      placeholder: copy.supplierEmailPlaceholder,
      ltr: true,
    },
    {
      name: "phone",
      label: dict.forms.phone,
      type: "tel",
      placeholder: dict.forms.phonePlaceholder,
      ltr: true,
    },
    {
      name: "category",
      label: copy.categoryLabel,
      type: "text",
      required: true,
      placeholder: copy.categoryPlaceholder,
    },
    {
      name: "website",
      label: copy.websiteLabel,
      type: "url",
      placeholder: copy.websitePlaceholder,
      ltr: true,
    },
    {
      name: "message",
      label: copy.aboutLabel,
      type: "textarea",
      placeholder: copy.aboutPlaceholder,
    },
  ];
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const dict = getDictionary(lang);

  return {
    title: dict.pages.suppliers.metaTitle,
    description: dict.pages.suppliers.metaDescription,
    alternates: buildAlternates(lang, PATH),
  };
}

export default async function SuppliersPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const copy = dict.pages.suppliers;

  return (
    <>
      <Header
        lang={lang}
        nav={dict.nav}
        langSwitcher={dict.langSwitcher}
        forceSolid
      />

      <main id="main" className="pt-24">
        {/* Intro — same .section/.container structure as the other subpage
            intros so they all share one responsive rhythm */}
        <section className="section">
          <div className="container">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-black rounded-full" />
                <span className="text-sm tracking-widest uppercase text-gray-600">
                  {copy.kicker}
                </span>
              </div>

              <h1>{copy.heading}</h1>

              <p className="text-lg leading-relaxed text-gray-600 mt-10 max-w-2xl">
                {copy.intro}
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
                <h2 className="mb-6">{copy.howItWorksHeading}</h2>
                <p className="text-base leading-relaxed text-gray-600 mb-6">
                  {copy.howItWorksBody}
                </p>
                <p className="text-sm text-gray-500">
                  {copy.preferEmail}{" "}
                  <a
                    href={`mailto:${SUPPLIERS_EMAIL}`}
                    className="underline hover:text-black transition-colors"
                    dir="ltr"
                  >
                    {SUPPLIERS_EMAIL}
                  </a>
                  .
                </p>
              </div>

              {/* Form */}
              <div className="lg:col-span-7">
                <LeadForm
                  fields={supplierFields(dict)}
                  subject={copy.emailSubject}
                  submitLabel={copy.submitLabel}
                  successText={copy.successText}
                  fallbackEmail={SUPPLIERS_EMAIL}
                  forms={dict.forms}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer
        lang={lang}
        brandName={dict.brand.shortName}
        footer={dict.footer}
        nav={dict.nav}
      />
    </>
  );
}
