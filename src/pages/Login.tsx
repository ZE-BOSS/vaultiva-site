import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ApiError } from '../api';
import { AuthShell, Button, Field } from '../components/ui';
import SEOHead from '../components/SEOHead';

/**
 * Matches the mobile sign-in screen (`vaultiva-mobile/assets/images/Sign in.png`):
 * "Welcome Back", filled fields, the forgot-password link left-aligned beneath
 * them, and the two pill actions at the bottom.
 */
export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      await login(identifier.trim(), password);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = identifier.trim().length > 0 && password.length > 0;

  return (
    <>
      <SEOHead title="Sign in — Vaultiva" description="Sign in to your Vaultiva account." />

      <form onSubmit={submit} className="contents">
        <AuthShell
          title="Welcome Back"
          subtitle="Your new password must be different from previously used passwords."
          footer={
            <>
              <Button type="submit" loading={loading} disabled={!canSubmit}>
                Continue
              </Button>
              <Link to="/register" className="mt-3 block">
                <Button type="button" variant="outline">
                  Create a new account
                </Button>
              </Link>
            </>
          }
        >
          <Field
            label="Email"
            name="identifier"
            type="email"
            autoComplete="username"
            placeholder="Enter your email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />

          <Field
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightSlot={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="pl-2 text-ink-muted"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            }
          />

          <Link to="/forgot-password" className="text-[17px] text-primary">
            Forget Password?
          </Link>

          {error ? (
            <p role="alert" className="mt-5 whitespace-pre-line text-sm text-danger">
              {error}
            </p>
          ) : null}
        </AuthShell>
      </form>
    </>
  );
}
