import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

/**
 * Catch-all for unknown URLs.
 *
 * Without one, React Router matched nothing and rendered an empty document —
 * a mistyped or stale link produced a white screen with no way back. That is
 * also what /forgot-password did before it had a route.
 */
export default function NotFound() {
  return (
    <>
      <SEOHead title="Page not found — Vaultiva" description="This page does not exist." />
      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="text-sm font-semibold tracking-widest text-primary">404</p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
          We can&rsquo;t find that page
        </h1>
        <p className="mt-3 max-w-md text-gray-600 dark:text-gray-400">
          The link may be out of date, or the page may have moved.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="rounded-full bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary/90"
          >
            Back to home
          </Link>
          <Link
            to="/login"
            className="rounded-full border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Sign in
          </Link>
        </div>
      </main>
    </>
  );
}
