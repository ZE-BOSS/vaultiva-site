import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { authApi, ApiError } from '../api';
import { AuthShell, Button, Field } from '../components/ui';
import SEOHead from '../components/SEOHead';

/**
 * Three-step signup, the same shape as the mobile flow: contact → verification
 * code → profile and password. Registration on this backend is passwordless at
 * step one; the password is set when the profile is completed.
 */
type Step = 'contact' | 'code' | 'profile';

export default function Register() {
  const [step, setStep] = useState<Step>('contact');
  // True when the backend could not reach the email/SMS provider.
  const [undelivered, setUndelivered] = useState(false);
  const [contact, setContact] = useState('');
  const [code, setCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, completeProfile } = useAuth();
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
      const sent = await register(contact);
      setContact(sent.contact);
      setUndelivered(!sent.delivered);
      setStep('code');
    });
  };

  const submitCode = (e: React.FormEvent) => {
    e.preventDefault();
    void guard(async () => {
      await authApi.verifyCode(contact, code);
      setStep('profile');
    });
  };

  const submitProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Those passwords do not match.');
      return;
    }
    void guard(async () => {
      await completeProfile(contact, {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        ...(contact.includes('@') ? { email: contact } : { phone: contact }),
        password,
      });
      navigate('/dashboard');
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
        <SEOHead title="Create account — Vaultiva" description="Open your Vaultiva account." />
        <form onSubmit={submitContact} className="contents">
          <AuthShell
            title="Create account"
            subtitle="Enter your phone or email. we’ll send you a confirmation code"
            footer={
              <>
                <Button type="submit" loading={loading} disabled={!contact.trim()}>
                  Create account
                </Button>
                <p className="mt-3 text-[15px] leading-6 text-ink-muted">
                  By creating an account, I agree to Vaultiva{' '}
                  <span className="font-bold">Terms of Services</span> and{' '}
                  <span className="font-bold">Privacy Policy</span>
                </p>
              </>
            }
          >
            <Field
              label="Email/Phone Number"
              name="contact"
              autoComplete="email"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <Link to="/login" className="text-[17px] text-primary">
              Already have an account? Login
            </Link>
            {errorNode}
          </AuthShell>
        </form>
      </>
    );
  }

  if (step === 'code') {
    return (
      <>
        <SEOHead title="Verify your account — Vaultiva" />
        <form onSubmit={submitCode} className="contents">
          <AuthShell
            title="6-digit code"
            subtitle={
              undelivered
                ? `We could not send a code to ${contact}.`
                : `Code sent to ${contact}`
            }
            footer={
              <Button type="submit" loading={loading} disabled={code.length < 6}>
                Continue
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
            <button
              type="button"
              className="text-[16px] text-primary"
              onClick={() =>
                void guard(async () => {
                  const res = await authApi.resendCode(
                    contact.includes('@') ? { email: contact } : { phone: contact },
                  );
                  setUndelivered(res.delivered === false);
                })
              }
            >
              Re-send code
            </button>

            {undelivered ? (
              <p role="alert" className="mt-4 text-sm text-danger">
                Sending failed — this is on our side, not yours. Tap “Re-send code”
                to try again.
              </p>
            ) : null}
            {errorNode}
          </AuthShell>
        </form>
      </>
    );
  }

  return (
    <>
      <SEOHead title="Complete your profile — Vaultiva" />
      <form onSubmit={submitProfile} className="contents">
        <AuthShell
          title="Create account"
          subtitle="Fill in the following information correctly"
          footer={
            <Button
              type="submit"
              loading={loading}
              disabled={!firstName.trim() || !lastName.trim() || password.length < 8}
            >
              Continue
            </Button>
          }
        >
          <Field
            label="First Name"
            name="firstName"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Field
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Field
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
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
          <Field
            label="Confirm Password"
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          {errorNode}
        </AuthShell>
      </form>
    </>
  );
}
