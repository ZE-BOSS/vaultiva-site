import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Gate for the signed-in areas of the app.
 *
 * Layout previously rendered the same routes whether or not anyone was signed
 * in — it only hid the bottom navigation. So /dashboard, /wallets, /bills and
 * the rest were reachable by typing the URL, and rendered a shell whose API
 * calls all failed with 401. On a financial product that is worse than useless:
 * it looks like an account page.
 *
 * The attempted location is remembered so the user lands where they were going
 * after signing in, rather than being dumped on the dashboard.
 */
export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, initialising } = useAuth();
  const location = useLocation();

  // The session is restored from localStorage asynchronously. Redirecting
  // before that finishes would bounce a signed-in user to the login page on
  // every refresh.
  if (initialising) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"
          role="status"
          aria-label="Loading"
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
