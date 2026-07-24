/**
 * Web3Forms submit helper
 * =======================
 * One shared client-side submit for every VADO form (client enquiry, careers,
 * suppliers). All submissions post to Web3Forms with the single public access
 * key and land in the same inbox (info@vado.sa); the `subject` is what
 * distinguishes them once they arrive, including which language edition the
 * visitor was reading.
 *
 * Failure messages are passed IN rather than hardcoded here, because this
 * module is language-neutral: the caller supplies the strings from whichever
 * dictionary is active. Web3Forms' own `data.message` is English-only, so it is
 * used as a diagnostic fallback only when the caller has nothing better.
 *
 * The access key is a public client-side key by design, so exposing it in the
 * browser bundle is expected.
 */

export interface Web3FormsResult {
  success: boolean;
  message: string;
}

/** Localized copy for the two ways a submit can fail. */
export interface Web3FormsMessages {
  /** The service accepted the request but rejected the submission. */
  genericError: string;
  /** The request never reached the service (offline, blocked, timeout). */
  networkError: string;
}

export async function submitToWeb3Forms(
  form: HTMLFormElement,
  subject: string,
  messages: Web3FormsMessages
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
      message: messages.genericError,
    };
  } catch {
    return {
      success: false,
      message: messages.networkError,
    };
  }
}
