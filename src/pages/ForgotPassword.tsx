import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { authApi, ApiError } from '../api';
import { AuthShell, Button, Field } from '../components/ui';
import SEOHead from '../components/SEOHead';

/**
 * Password reset — contact, code, new password.
 *
 * Login has always linked to /forgot-password, but no route was ever declared
 * for it and there is no catch-all, so the link rendered a blank page. Anyone
 * who forgot their password had no way back into their account.
 *
 * Mirrors the mobile flow (ForgotPassword → ForgotPasswordOTP → ResetPassword)
 * and the three-step shape of Register, collapsed into one screen's state.
 */
type Step = 'contact' | 'reset';

export default function ForgotPassword() {
  const [step, setStep] = useState<Step>('contact');
  const [contact, setContact] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const guard = async (fn: () => Promise<void>) => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      await fn();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const submitContact = (e: React.FormEvent) => {
    e.preventDefault();
    void guard(async () => {
      await authApi.initiateResetPassword(contact.trim());
      setStep('reset');
    });
  };

  const submitReset = (e: React.FormEvent) => {
    e.preventDefault();
    void guard(async () => {
      await authApi.resetPassword(contact.trim(), code, password);
      navigate('/login', { replace: true });
    });
  };

  const errorNode = error ? (
    <p role="alert" className="mt-5 whitespace-pre-line text-sm text-danger">
      {error}
    </p>
  ) : null;

  if (step === 'contact') {
    return (
      <>
        <SEOHead title="Reset your password — Vaultiva" />
        <form onSubmit={submitContact} className="contents">
          <AuthShell
            title="Forgot Password"
            subtitle="Enter the email or phone number on your account and we'll send you a code."
            footer={
              <>
                <Button type="submit" loading={loading} disabled={!contact.trim()}>
                  Send code
                </Button>
                <Link to="/login" className="mt-3 block">
                  <Button type="button" variant="outline">
                    Back to sign in
                  </Button>
                </Link>
              </>
            }
          >
            <Field
              label="Email or phone"
              name="contact"
              autoComplete="username"
              placeholder="Enter your email or phone number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            {errorNode}
          </AuthShell>
        </form>
      </>
    );
  }

  return (
    <>
      <SEOHead title="Choose a new password — Vaultiva" />
      <form onSubmit={submitReset} className="contents">
        <AuthShell
          title="New password"
          subtitle={`Enter the code sent to ${contact} and choose a new password.`}
          footer={
            <Button
              type="submit"
              loading={loading}
              disabled={code.length < 6 || password.length < 8}
            >
              Reset password
            </Button>
          }
        >
          <Field
            label="Verification code"
            name="code"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
          />

          <Field
            label="New password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="At least 8 characters"
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

          <button
            type="button"
            className="text-[16px] text-primary"
            onClick={() =>
              void guard(async () => {
                await authApi.initiateResetPassword(contact.trim());
              })
            }
          >
            Re-send code
          </button>

          {errorNode}
        </AuthShell>
      </form>
    </>
  );
}
