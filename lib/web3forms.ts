/**
 * Web3Forms submit helper
 * =======================
 * One shared client-side submit for every VADO form (client enquiry, careers,
 * suppliers). All submissions post to Web3Forms with the single public access
 * key and land in the same inbox (info@vado.sa); the `subject` is what
 * distinguishes them once they arrive.
 *
 * The access key is a public client-side key by design, so exposing it in the
 * browser bundle is expected.
 */

export interface Web3FormsResult {
  success: boolean;
  message: string;
}

export async function submitToWeb3Forms(
  form: HTMLFormElement,
  subject: string
): Promise<Web3FormsResult> {
  // Serialize the form synchronously (this also captures the hidden botcheck
  // honeypot) before any await, so the element reference stays valid.
  const payload = new FormData(form);
  payload.append(
    "access_key",
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? ""
  );
  payload.append("subject", subject);
  payload.append("from_name", "VADO Website");

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: payload,
    });
    const data = await res.json();

    if (data.success) {
      return { success: true, message: data.message ?? "" };
    }
    return {
      success: false,
      message: data.message || "Something went wrong. Please try again.",
    };
  } catch {
    return {
      success: false,
      message: "Couldn't reach the mail service. Please try again.",
    };
  }
}
