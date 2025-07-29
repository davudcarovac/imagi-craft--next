export function formatCsrfToken(): string {
  if (typeof window === "undefined") return "";

  // Proverite različite varijante imena cookie-a
  const cookieNames = ["XSRF-TOKEN", "xsrf-token", "XSRF_TOKEN"];

  for (const name of cookieNames) {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.trim().startsWith(`${name}=`));

    if (cookie) {
      return cookie.split("=")[1];
    }
  }

  console.warn("CSRF token not found in cookies");
  return "";
}
