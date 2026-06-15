import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-black-100 flex flex-col">
      {/* Nav */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-5xl mx-auto w-full">
        <span className="text-xl font-bold">📑 Bookmarks</span>
        <div className="flex gap-3">
          <Link href="/login" className="px-4 py-2 text-sm font-medium hover:underline">
            Log in
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 text-sm font-medium bg-skyblue text-black rounded-lg hover:bg-gray-800 transition"
          >
            Sign up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          Save what matters.<br />Share what you want.
        </h1>
        <p className="text-lg text-gray-600 max-w-md mb-8">
          A simple place to keep your favorite links — private by default,
          public when you choose. Get your own shareable profile.
        </p>

        <div className="flex gap-4 mb-16">
          <Link
            href="/signup"
            className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Get started — it&apos;s free
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Log in
          </Link>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="text-2xl mb-2">🔒</div>
            <h3 className="font-semibold mb-1">Private by default</h3>
            <p className="text-sm text-gray-600">
              Your bookmarks stay yours unless you choose to share them.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="text-2xl mb-2">🔗</div>
            <h3 className="font-semibold mb-1">Custom profile</h3>
            <p className="text-sm text-gray-600">
              Claim your handle and share a public page of your picks.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold mb-1">Fast & simple</h3>
            <p className="text-sm text-gray-600">
              Add, edit, and organize links in seconds. No clutter.
            </p>
          </div>
        </div>
      </main>

      <footer className="text-center text-sm text-gray-400 py-6">
        Built with Next.js & Supabase
      </footer>
    </div>
  )
}