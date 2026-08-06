interface SiteverifyResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
}

interface VerifyResult {
  success: boolean;
  errorCodes?: string[];
}

/**
 * Canonical server-side Turnstile verification.
 * POSTs to challenges.cloudflare.com directly — never trust a token
 * without this round trip, and never call siteverify from the browser.
 */
export async function verifyTurnstileToken(
  token: string,
  secret: string,
  remoteIp?: string,
): Promise<VerifyResult> {
  if (!token) {
    return { success: false, errorCodes: ["missing-input-response"] };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      },
    );

    if (!res.ok) {
      return { success: false, errorCodes: [`siteverify-http-${res.status}`] };
    }

    const data = (await res.json()) as SiteverifyResponse;

    return {
      success: data.success === true,
      errorCodes: data["error-codes"],
    };
  } catch {
    // Network error, timeout, or malformed JSON — fail closed.
    return { success: false, errorCodes: ["siteverify-network-error"] };
  }
}