"use client";

/**
 * LeadForm
 * ========
 * A reusable, config-driven contact form used by the careers and suppliers
 * pages. Fields are passed in as data, so each page describes its own inputs
 * while sharing one submit lifecycle, one honeypot, and one set of styles
 * (matching the homepage ContactSection). Submissions go through the shared
 * Web3Forms helper; the `subject` tags where they came from.
 *
 * The component holds no copy of its own. Labels, placeholders, button text,
 * and status messages all arrive as props from the calling page's dictionary,
 * so it renders correctly in any language with no changes here.
 */

import { useState } from "react";
import { Send } from "lucide-react";
import { submitToWeb3Forms } from "@/lib/web3forms";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export interface LeadFormField {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "url" | "textarea";
  required?: boolean;
  placeholder?: string;
  /**
   * Force left-to-right entry regardless of page direction. Set on fields whose
   * value is inherently Latin (email, phone, URL) so the caret and any leading
   * "+" or "https://" behave correctly on an Arabic page.
   */
  ltr?: boolean;
}

interface LeadFormProps {
  fields: LeadFormField[];
  /** Web3Forms subject line — how this form is identified in the inbox. */
  subject: string;
  submitLabel: string;
  successText: string;
  /** Displayed in the error state so people have another way to reach us. */
  fallbackEmail: string;
  /** Shared form strings (status messages, required marker) for this locale. */
  forms: Dictionary["forms"];
}

type Status = "idle" | "submitting" | "success" | "error";

export default function LeadForm({
  fields,
  subject,
  submitLabel,
  successText,
  fallbackEmail,
  forms,
}: LeadFormProps) {
  // A blank value per configured field, keyed by field name.
  const emptyValues = () =>
    Object.fromEntries(fields.map((f) => [f.name, ""])) as Record<string, string>;

  const [values, setValues] = useState<Record<string, string>>(emptyValues);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

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
      setValues(emptyValues());
      // Return to the resting state after a few seconds.
      setTimeout(() => setStatus("idle"), 6000);
    } else {
      setStatus("error");
      setErrorMessage(result.message);
    }
  };

  const fieldClasses =
    "w-full px-4 py-3 border border-gray-300 focus:border-black focus:ring-0 transition-colors duration-200 outline-none";

  return (
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

      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {field.label}
            {field.required && forms.requiredMark}
          </label>
          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              value={values[field.name]}
              onChange={handleChange}
              required={field.required}
              rows={5}
              placeholder={field.placeholder}
              className={`${fieldClasses} resize-none`}
            />
          ) : (
            <input
              type={field.type ?? "text"}
              id={field.name}
              name={field.name}
              value={values[field.name]}
              onChange={handleChange}
              required={field.required}
              placeholder={field.placeholder}
              dir={field.ltr ? "ltr" : undefined}
              className={fieldClasses}
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={status === "submitting" || status === "success"}
        className={`inline-flex items-center gap-3 px-8 py-4 text-sm tracking-widest uppercase transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed ${
          status === "success"
            ? "bg-green-600 text-white"
            : "bg-black text-white hover:bg-gray-800"
        }`}
      >
        {status === "submitting" && forms.sending}
        {status === "success" && forms.sentShort}
        {(status === "idle" || status === "error") && (
          <>
            {submitLabel}
            <Send className="w-4 h-4 rtl:-scale-x-100" />
          </>
        )}
      </button>

      {/* Feedback — success / error / resting response-time note */}
      {status === "success" && (
        <p role="status" className="text-sm text-green-700 mt-4">
          {successText}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="text-sm text-red-600 mt-4">
          {errorMessage} {forms.orEmailUs}{" "}
          <a href={`mailto:${fallbackEmail}`} className="underline" dir="ltr">
            {fallbackEmail}
          </a>
          .
        </p>
      )}
      {(status === "idle" || status === "submitting") && (
        <p className="text-sm text-gray-500 mt-4">{forms.responseNote}</p>
      )}
    </form>
  );
}
