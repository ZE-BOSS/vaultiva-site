import React from 'react';

/**
 * Web counterparts of the mobile shared components
 * (`vaultiva-mobile/src/components/*`), built on the tokens in
 * tailwind.config.js so both apps render the same controls:
 *   - the primary action is a full pill, not a rounded rectangle
 *   - text inputs are a flat #F5F6F8 fill with no border
 */

type ButtonVariant = 'primary' | 'outline' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  loading = false,
  fullWidth = true,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base =
    'h-control rounded-pill inline-flex items-center justify-center gap-2 text-[17px] font-semibold ' +
    'transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ' +
    'focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const styles: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-white hover:bg-primary-pressed',
    outline: 'border border-primary text-primary font-normal hover:bg-primary-50',
    ghost: 'text-primary font-normal hover:bg-primary-50',
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`${base} ${styles[variant]} ${fullWidth ? 'w-full' : 'px-6'} ${className}`}
    >
      {loading ? (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      ) : null}
      {children}
    </button>
  );
}

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  rightSlot?: React.ReactNode;
}

export function Field({ label, error, rightSlot, className = '', id, ...props }: FieldProps) {
  const inputId = id ?? props.name ?? label?.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className="mb-6">
      {label ? (
        <label htmlFor={inputId} className="mb-2 block text-[16px] text-ink">
          {label}
        </label>
      ) : null}

      <div
        className={`flex h-field items-center rounded-input bg-surface-input px-4 ${
          error ? 'ring-1 ring-danger' : ''
        }`}
      >
        <input
          {...props}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`w-full bg-transparent text-[16px] text-ink outline-none placeholder:text-ink-muted ${className}`}
        />
        {rightSlot}
      </div>

      {error ? (
        <p id={`${inputId}-error`} role="alert" className="mt-1 text-xs text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** The vertical page gradient every screen sits on. */
export function PageBackground({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-page-gradient bg-surface-page">{children}</div>;
}

/** Centred column used by the auth pages. */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <PageBackground>
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 py-10">
        <h1 className="mt-4 text-[32px] font-bold leading-tight text-ink">{title}</h1>
        {subtitle ? <p className="mt-2 text-[17px] leading-6 text-ink-muted">{subtitle}</p> : null}

        <div className="mt-8 flex-1">{children}</div>

        {footer ? <div className="pt-4">{footer}</div> : null}
      </div>
    </PageBackground>
  );
}
