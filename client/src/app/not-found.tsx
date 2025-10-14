// app/not-found.js
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <h2 className="text-2xl mt-4">Page not found</h2>
      <p className="mt-4">Page you are looking for does not exist</p>
      <a href="/" className="mt-6 px-4 py-2 bg-[#1aac83] text-white rounded">
        Back to home
      </a>
    </div>
  );
}
