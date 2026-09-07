import React, { useMemo, useState } from 'react';
import { Plus, ArrowUp, Palette, Bell, RefreshCw } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import { toAmount, type Wallet, type WalletType } from '../api';
import { Button, Field } from '../components/ui';
import SEOHead from '../components/SEOHead';
import walletCard from '../assets/art/wallet-card.webp';

/**
 * Mirrors the mobile Wallets screen (`vaultiva-mobile/assets/images/Wallet.jpg`):
 * the gradient wallet card with the balance drawn over it, a masked account
 * pill, "Create new" / "Transfer" pills, then the recent transaction list.
 *
 * The card artwork is the same asset the mobile app uses, extracted from the
 * reference with its baked-in text removed.
 */
const WALLET_TYPES: { value: WalletType; label: string }[] = [
  { value: 'main', label: 'Main' },
  { value: 'escrow', label: 'Escrow' },
  { value: 'split_bill', label: 'Split bill' },
  { value: 'bill_payment', label: 'Bill payment' },
  { value: 'others', label: 'Other' },
];

function naira(value: string | number | undefined) {
  return toAmount(value).toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function maskAccount(accountNumber?: string) {
  if (!accountNumber || accountNumber.length < 6) return accountNumber ?? '';
  return `${accountNumber.slice(0, 3)}****${accountNumber.slice(-3)}`;
}

export default function Wallets() {
  const { wallets, transactions, loading, error, refresh, createWallet } = useWallet();

  const [activeId, setActiveId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<WalletType>('others');
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const active: Wallet | undefined = useMemo(
    () => wallets.find((w) => w.id === activeId) ?? wallets.find((w) => w.type === 'main') ?? wallets[0],
    [wallets, activeId],
  );

  const walletTransactions = useMemo(
    () => (active ? transactions.filter((t) => t.walletId === active.id) : transactions),
    [transactions, active],
  );

  const [whole, cents] = naira(active?.balance).split('.');

  const submitCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setFormError(null);
    try {
      await createWallet({ name: newName.trim(), type: newType });
      setNewName('');
      setCreating(false);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Could not create that wallet.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead title="Wallets — Vaultiva" description="Your Vaultiva wallets and balances." />

      <div className="mx-auto w-full max-w-2xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-ink dark:text-white">Wallets</h1>
          <button
            onClick={() => void refresh()}
            className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-primary"
            aria-label="Refresh wallets"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {error ? (
          <p role="alert" className="mb-6 rounded-card bg-danger/10 p-4 text-sm text-danger">
            {error}
          </p>
        ) : null}

        {/* ── Wallet card ─────────────────────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-card" style={{ aspectRatio: '354 / 214' }}>
          <img src={walletCard} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />

          <div className="relative flex h-full flex-col px-6 py-4 text-white">
            <div className="text-right leading-tight">
              <div className="text-2xl font-extrabold tracking-wide">
                {(active?.type ?? 'main').replace('_', ' ').toUpperCase()}
              </div>
              <div className="text-base font-medium tracking-wide">WALLET</div>
            </div>

            <div className="mt-auto">
              <p className="text-lg">Current Balance</p>
              <div className="flex items-center justify-between">
                <p className="text-4xl font-medium">
                  ₦{whole}
                  <span className="text-2xl">.{cents}</span>
                </p>
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-white/60"
                  aria-hidden="true"
                >
                  <Plus size={28} strokeWidth={1.6} className="text-white/85" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {active?.accountNumber ? (
          <p className="mx-auto mt-4 w-fit rounded-pill bg-[#EDEFF5] px-5 py-1.5 text-[15px] text-ink-strong">
            {maskAccount(active.accountNumber)}
          </p>
        ) : null}

        {/* ── Actions ─────────────────────────────────────────────────────── */}
        <div className="mt-4 flex gap-4">
          <button
            onClick={() => setCreating((v) => !v)}
            className="flex h-9 flex-1 items-center justify-between rounded-pill bg-white pl-4 pr-1 shadow-pill"
          >
            <span className="text-sm font-medium text-ink-strong">Create new</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-[9px] border-2 border-primary-400 bg-primary-50">
              <Palette size={16} className="text-primary" />
            </span>
          </button>

          <a
            href="/bills"
            className="flex h-9 flex-1 items-center justify-between rounded-pill bg-white pl-4 pr-1 shadow-pill"
          >
            <span className="text-sm font-medium text-ink-strong">Transfer</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-[9px] border-2 border-primary-400 bg-primary-50">
              <ArrowUp size={16} className="text-primary" />
            </span>
          </a>
        </div>

        {creating ? (
          <form onSubmit={submitCreate} className="mt-6 rounded-card bg-white p-5 shadow-card">
            <Field
              label="Wallet Name"
              name="walletName"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              error={formError ?? undefined}
            />
            <label htmlFor="walletType" className="mb-2 block text-[16px] text-ink">
              Type
            </label>
            <select
              id="walletType"
              value={newType}
              onChange={(e) => setNewType(e.target.value as WalletType)}
              className="mb-6 h-field w-full rounded-input bg-surface-input px-4 text-[16px] text-ink outline-none"
            >
              {WALLET_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <Button type="submit" loading={submitting} disabled={!newName.trim()}>
              Create wallet
            </Button>
          </form>
        ) : null}

        {/* ── Wallet switcher ─────────────────────────────────────────────── */}
        {wallets.length > 1 ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {wallets.map((w) => (
              <button
                key={w.id}
                onClick={() => setActiveId(w.id)}
                aria-pressed={active?.id === w.id}
                className={`rounded-pill px-4 py-1.5 text-sm ${
                  active?.id === w.id
                    ? 'bg-primary text-white'
                    : 'bg-surface text-ink-strong hover:bg-primary-100'
                }`}
              >
                {w.name}
              </button>
            ))}
          </div>
        ) : null}

        {/* ── Transactions ────────────────────────────────────────────────── */}
        <h2 className="mt-8 text-xl font-medium text-ink dark:text-white">Recent Transaction</h2>

        {loading ? (
          <p className="mt-6 text-sm text-ink-muted">Loading…</p>
        ) : !walletTransactions.length ? (
          <p className="mt-6 text-sm text-ink-muted">No transactions yet.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {walletTransactions.map((t) => {
              const amount = toAmount(t.amount);
              const credit = amount >= 0;
              return (
                <li
                  key={t.id}
                  className="flex h-16 items-center gap-3 rounded-card bg-[#F5F6FA] px-4"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-primary-100">
                    <Bell size={17} className="text-primary" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-base font-semibold text-ink">
                      {t.description ?? t.type}
                    </span>
                    <span className="block text-[13px] text-ink-muted">
                      {new Date(t.createdAt).toLocaleString('en-NG', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </span>
                  <span className="text-[17px] font-semibold text-ink">
                    {credit ? '+' : '-'}
                    {naira(Math.abs(amount)).split('.')[0]}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
