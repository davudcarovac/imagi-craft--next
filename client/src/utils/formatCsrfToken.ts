// Poboljšana funkcija za čitanje CSRF tokena
export function formatCsrfToken() {
  if (typeof window === "undefined") return "";

  // Pročitaj sve kolačiće
  const cookieString = document.cookie;
  console.log("Svi kolačići:", cookieString); // Debug

  // Pronađi CSRF token
  const cookie = cookieString
    .split("; ")
    .find((row) => row.trim().startsWith("XSRF-TOKEN="));

  if (!cookie) {
    console.error("CSRF token nije pronađen u kolačićima");
    return "";
  }

  return cookie.split("=")[1];
}
