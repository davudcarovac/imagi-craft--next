export const formatCsrfToken = () => {
  const cookieString = document.cookie;
  const cookies = cookieString.split("; ");
  const csrfCookie = cookies.find((cookie) => cookie.startsWith("XSRF-TOKEN="));
  return csrfCookie ? csrfCookie.split("=")[1] : null;
};
