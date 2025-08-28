

export default function HomePage() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-2">Welcome 👋</h2>
      <p className="text-gray-700 mb-4">
        This is a public page. Visit <code>/login</code> to sign in with Google,
        or try <code>/dashboard</code> to see a protected page.
      </p>
      <a
        href="/login"
        className="inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Continue to Login
      </a>
    </section>
  );
}
