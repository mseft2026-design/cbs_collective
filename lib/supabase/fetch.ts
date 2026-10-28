/**
 * Resilient fetch wrapper for Supabase clients.
 * When Supabase is paused, deleted, or network is unreachable (e.g. getaddrinfo ENOTFOUND),
 * Node's native fetch() throws a low-level network exception which @supabase/auth-js surfaces
 * as noisy `AuthRetryableFetchError: fetch failed` spam in the console.
 *
 * This wrapper intercepts unreachable network/DNS errors and returns clean HTTP responses:
 * - 400 with `session_not_found` for auth endpoints: cleanly marks user as unauthenticated without infinite retry loops
 * - 503 Service Unavailable for database / storage endpoints: triggers local fallbacks smoothly
 */
export async function safeFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  try {
    return await fetch(input, init);
  } catch (err: any) {
    const urlStr =
      typeof input === "string"
        ? input
        : input instanceof URL
        ? input.toString()
        : (input as Request)?.url || "";

    if (urlStr.includes("/auth/v1")) {
      return new Response(
        JSON.stringify({
          error: "session_not_found",
          message: "Auth service unreachable",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Database service unreachable",
        details: err?.cause?.code || err?.message || "fetch failed",
      }),
      {
        status: 503,
        statusText: "Service Unavailable",
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
