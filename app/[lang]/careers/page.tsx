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
import { notFound } from "next/navigation";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LeadForm, { LeadFormField } from "@/components/forms/LeadForm";
import { buildAlternates } from "@/lib/seo";
import { CAREERS_EMAIL } from "@/lib/site";
import { LOCALES, isLocale } from "@/lib/i18n/config";
import { getDictionary, type Dictionary } from "@/lib/i18n/get-dictionary";

const PATH = "/careers";

/** Field config built from the active dictionary, so labels follow the locale. */
function careersFields(dict: Dictionary): LeadFormField[] {
  const copy = dict.pages.careers;
  return [
    {
      name: "fullName",
      label: dict.forms.fullName,
      type: "text",
      required: true,
      placeholder: dict.forms.fullNamePlaceholder,
    },
    {
      name: "email",
      label: dict.forms.email,
      type: "email",
      required: true,
      placeholder: dict.forms.emailPlaceholder,
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
      name: "role",
      label: copy.roleLabel,
      type: "text",
      placeholder: copy.rolePlaceholder,
    },
    {
      name: "cv_link",
      label: copy.cvLabel,
      type: "url",
      required: true,
      placeholder: copy.cvPlaceholder,
      ltr: true,
    },
    {
      name: "message",
      label: copy.noteLabel,
      type: "textarea",
      placeholder: copy.notePlaceholder,
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
    title: dict.pages.careers.metaTitle,
    description: dict.pages.careers.metaDescription,
    alternates: buildAlternates(lang, PATH),
  };
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const copy = dict.pages.careers;

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
                    href={`mailto:${CAREERS_EMAIL}`}
                    className="underline hover:text-black transition-colors"
                    dir="ltr"
                  >
                    {CAREERS_EMAIL}
                  </a>
                  .
                </p>
              </div>

              {/* Form */}
              <div className="lg:col-span-7">
                <LeadForm
                  fields={careersFields(dict)}
                  subject={copy.emailSubject}
                  submitLabel={copy.submitLabel}
                  successText={copy.successText}
                  fallbackEmail={CAREERS_EMAIL}
                  forms={dict.forms}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} footer={dict.footer} nav={dict.nav} />
    </>
  );
}
