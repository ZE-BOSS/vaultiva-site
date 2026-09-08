/**
 * Typed endpoint surface, shared verbatim with the mobile app
 * (`vaultiva-mobile/src/api/index.ts`). Both clients target the same backend, so
 * the two files are kept identical apart from this note — change them together.
 */

import { api } from './client';

export * from './client';

// ── Types ────────────────────────────────────────────────────────────────────

export type KycStatus = 'pending' | 'rejected' | 'approved' | 'not_started';

export interface User {
  id: string;
  email?: string;
  phone?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  accountNumber?: string;
  bank?: string;
  accountName?: string;
  address?: string;
  dateOfBirth?: string;
  bvn?: string;
  nin?: string;
  role: 'user' | 'admin' | 'super_admin';
  isActive: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  kycStatus: KycStatus;
  lastLoginAt?: string;
  createdAt: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export type WalletType = 'main' | 'escrow' | 'split_bill' | 'bill_payment' | 'others';

export interface Wallet {
  id: string;
  userId: string;
  type: WalletType;
  name: string;
  balance: string | number;
  currency: string;
  /**
   * The real bank account behind the wallet, opened at Xpress. Absent until KYC
   * supplies a BVN and date of birth — screens that show it must handle that,
   * not substitute a placeholder.
   */
  accountNumber?: string;
  accountName?: string;
  bankName?: string;
  bankCode?: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  walletId: string;
  type: string;
  status: string;
  amount: string | number;
  currency: string;
  reference: string;
  description?: string;
  createdAt: string;
}

export interface Transfer {
  id: string;
  amount: string | number;
  status: string;
  recipientAccountNumber?: string;
  recipientBankCode?: string;
  recipientName?: string;
  narration?: string;
  createdAt: string;
}

export interface Escrow {
  id: string;
  title: string;
  description?: string;
  amount: string | number;
  status: string;
  createdAt: string;
}

export interface BillSplit {
  id: string;
  name: string;
  totalAmount: string | number;
  status: string;
  participants?: BillSplitParticipant[];
  createdAt: string;
}

export interface BillSplitParticipant {
  id: string;
  userId?: string;
  name?: string;
  amount: string | number;
  hasPaid: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export interface Biller {
  biller_code: string;
  biller_name: string;
  name?: string;
  amount?: number;
  item_code?: string;
}

export interface SpendingInsight {
  id: string;
  category: string;
  amount: string | number;
  period: string;
  isRead: boolean;
  createdAt: string;
}

export interface RewardSummary {
  totalPoints: number;
  redeemedPoints: number;
  availablePoints: number;
}


// ── Request payloads ─────────────────────────────────────────────────────────
// These mirror the backend DTOs exactly. They were previously typed as
// `Record<string, unknown>`, which let the screens send field names the API
// rejects (`walletId`, `recipientAccountNumber`, `name`, ...) with no compiler
// warning — every create call failed validation at runtime.

export type EscrowType = 'one_time' | 'recurring';
export type EscrowMode = 'single' | 'group';
export type EscrowParticipantRole = 'payer' | 'payee' | 'arbitrator';

export interface CreateEscrowPayload {
  title: string;
  description: string;
  /** Minimum 100. */
  amount: number;
  type: EscrowType;
  mode: EscrowMode;
  /** ISO 8601 date string. */
  releaseDate: string;
  participants: Array<{
    userId: string;
    role: EscrowParticipantRole;
    contributionAmount?: number;
  }>;
  conditions?: unknown;
  metadata?: unknown;
}

export type SplitType = 'one_to_many' | 'many_to_one';
export type SplitFrequency = 'one_time' | 'recurring';
export type SplitParticipantRole = 'sender' | 'receiver';

export interface CreateBillSplitPayload {
  title: string;
  description: string;
  /** Minimum 100. */
  totalAmount: number;
  type: SplitType;
  frequency: SplitFrequency;
  /** Wallet the split settles into — required by the backend. */
  walletId: string;
  participants: Array<{
    userId: string;
    walletId: string;
    role: SplitParticipantRole;
    amount: number;
  }>;
  nextExecutionDate?: string;
  schedule?: unknown;
  metadata?: unknown;
}

export type TransferKind = 'wallet_to_wallet' | 'wallet_to_bank' | 'bank_to_wallet';

export interface CreateTransferPayload {
  /** Minimum 100. */
  amount: number;
  type: TransferKind;
  description: string;
  sourceWalletId?: string;
  destinationWalletId?: string;
  /** Free-form; for a bank payout this carries the account number and bank code. */
  sourceDetails: Record<string, unknown>;
  destinationDetails: Record<string, unknown>;
  metadata?: unknown;
}

export interface BillPaymentPayload {
  /** Biller category, e.g. "airtime". */
  type: string;
  amount: number;
  /** Meter number, phone number, smartcard number, ... */
  customer: string;
  biller_code?: string;
  item_code?: string;
  country?: string;
  walletId: string;
  recurring?: boolean;
  duration?: number;
}

// ── Auth ─────────────────────────────────────────────────────────────────────

/**
 * `delivered` says whether the code actually left the building. The endpoints
 * used to answer "Verification code sent" no matter what, so a provider failure
 * looked exactly like a code still in flight — the user waited for something
 * that was never coming.
 */
export interface CodeIssued {
  message: string;
  contact: string;
  delivered?: boolean;
}

// ── KYC (identity document submission) ──────────────────────────────────────

/**
 * There is no automated verification vendor wired up — a submission is stored
 * and reviewed by an admin later. `status` starts and stays 'pending' until
 * that review happens.
 */
export type KycDocumentType = 'nin_slip' | 'drivers_license' | 'voters_card' | 'passport';
export type KycSubmissionStatus = 'pending' | 'approved' | 'rejected';

export interface KycSubmission {
  id: string;
  documentType: KycDocumentType;
  status: KycSubmissionStatus;
  reviewNote: string | null;
  createdAt: string;
}

export const kycApi = {
  /** frontImage / backImage are base64 (no data: URI prefix). */
  submit: (body: { documentType: KycDocumentType; frontImage: string; backImage?: string }) =>
    api.post<{ status: KycSubmissionStatus; submittedAt: string }>('/kyc/submit', body),

  status: () =>
    api.get<{ kycStatus: KycStatus; submission: KycSubmission | null }>('/kyc/status'),
};

export const authApi = {
  register: (body: { email?: string; phone?: string }) =>
    api.post<CodeIssued>('/auth/register', body, { anonymous: true }),

  resendCode: (body: { email?: string; phone?: string }) =>
    api.post<CodeIssued>('/auth/resend-code', body, { anonymous: true }),

  verifyCode: (contact: string, code: string) =>
    api.post<{ verified: boolean; userId: string; contact: string }>(
      '/auth/verify-code',
      { contact, code },
      { anonymous: true },
    ),

  completeProfile: (contact: string, data: Record<string, unknown>) =>
    api.post<LoginResponse>('/auth/complete-profile', { contact, data }, { anonymous: true }),

  login: (identifier: string, password: string) =>
    api.post<LoginResponse>('/auth/login', { identifier, password }, { anonymous: true }),

  /**
   * Deliberately does NOT report delivery. This endpoint must not reveal whether
   * an account exists, and `delivered: false` would do exactly that — a provider
   * outage is global, so a false here would mean "that address is registered".
   */
  initiateResetPassword: (identifier: string) =>
    api.post<{ message: string }>('/auth/initiate-reset-password', { identifier }, { anonymous: true }),

  resetPassword: (identifier: string, code: string, newPassword: string) =>
    api.post<{ message: string }>(
      '/auth/reset-password',
      { identifier, code, newPassword },
      { anonymous: true },
    ),

  updatePassword: (userId: string, newPassword: string) =>
    api.post<{ message: string }>('/auth/update-password', { userId, newPassword }),

  setPin: (userId: string, pin: string) => api.post<{ message: string }>('/auth/set-pin', { userId, pin }),
  verifyPin: (userId: string, pin: string) => api.post<{ valid: boolean }>('/auth/verify-pin', { userId, pin }),
  initiateResetPin: (identifier: string) =>
    api.post<{ message: string }>('/auth/initiate-reset-pin', { identifier }),
  resetPin: (identifier: string, code: string, pin: string) =>
    api.post<{ message: string }>('/auth/reset-pin', { identifier, code, pin }),

  onboardingStatus: (userId: string) =>
    api.post<{ steps: Record<string, boolean>; complete: boolean; kycStatus: KycStatus }>(
      '/auth/onboarding-status',
      { userId },
    ),

  verifyToken: (token: string) =>
    api.post<{ valid: boolean; user: User }>('/auth/verify-token', { token }, { anonymous: true }),
};

// ── Users ────────────────────────────────────────────────────────────────────

export const usersApi = {
  profile: () => api.get<User>('/users/profile'),
  updateProfile: (data: Partial<User>) => api.patch<User>('/users/profile', data),
};

// ── Wallet ───────────────────────────────────────────────────────────────────

export const walletApi = {
  list: () => api.get<Wallet[]>('/wallet'),
  get: (id: string) => api.get<Wallet>(`/wallet/${id}`),
  create: (body: { type: WalletType; name: string; customerId: string; currency?: string }) =>
    api.post<Wallet>('/wallet', body),
  transactions: () => api.get<Transaction[]>('/wallet/transactions'),
  withdraw: (body: { walletId: string; amount: number; accountNumber: string; bankCode: string }) =>
    api.post<Transaction>('/wallet/withdraw', body),
};

// ── Transfers ────────────────────────────────────────────────────────────────

export const transfersApi = {
  list: () => api.get<Transfer[]>('/transfers'),
  create: (body: CreateTransferPayload) => api.post<Transfer>('/transfers', body),
  scheduled: () => api.get<Transfer[]>('/transfers/scheduled'),
  schedule: (body: CreateTransferPayload & { scheduledAt: string }) =>
    api.post<Transfer>('/transfers/scheduled', body),
  pauseScheduled: (id: string) => api.patch<Transfer>(`/transfers/scheduled/${id}/pause`),
  resumeScheduled: (id: string) => api.patch<Transfer>(`/transfers/scheduled/${id}/resume`),
  cancelScheduled: (id: string) => api.delete<void>(`/transfers/scheduled/${id}`),
  bankDowntimes: () => api.get<unknown[]>('/transfers/bank-downtimes'),
};

// ── Bills ────────────────────────────────────────────────────────────────────

export const billsApi = {
  categories: () => api.get<Biller[]>('/bills'),
  byCategory: (category: string) => api.get<Biller[]>(`/bills/${category}`),
  plans: (code: string) => api.get<Biller[]>(`/bills/plans/${code}`),
  pay: (body: BillPaymentPayload) => api.post<Transaction>('/bills', body),
  recurringList: (type: string) => api.get<unknown[]>(`/bills/recurring/list/${type}`),
  pauseRecurring: (id: string) => api.get<unknown>(`/bills/recurring/pause/${id}`),
  resumeRecurring: (id: string) => api.get<unknown>(`/bills/recurring/resume/${id}`),
  cancelRecurring: (id: string) => api.get<unknown>(`/bills/recurring/cancel/${id}`),
};

// ── Escrow ───────────────────────────────────────────────────────────────────

export const escrowApi = {
  list: () => api.get<Escrow[]>('/escrow'),
  get: (id: string) => api.get<Escrow>(`/escrow/${id}`),
  create: (body: CreateEscrowPayload) => api.post<Escrow>('/escrow', body),
  update: (id: string, body: Record<string, unknown>) => api.patch<Escrow>(`/escrow/${id}`, body),
  fund: (id: string, body?: Record<string, unknown>) => api.post<Escrow>(`/escrow/${id}/fund`, body),
  release: (id: string, body?: Record<string, unknown>) => api.post<Escrow>(`/escrow/${id}/release`, body),
  dispute: (id: string, body?: Record<string, unknown>) => api.post<Escrow>(`/escrow/${id}/dispute`, body),
  accept: (id: string, body?: Record<string, unknown>) => api.post<Escrow>(`/escrow/${id}/accept`, body),
  remove: (id: string) => api.delete<void>(`/escrow/${id}`),
};

// ── Bill splitting ───────────────────────────────────────────────────────────

export const billSplitApi = {
  list: () => api.get<BillSplit[]>('/bill-splitting'),
  get: (id: string) => api.get<BillSplit>(`/bill-splitting/${id}`),
  create: (body: CreateBillSplitPayload) => api.post<BillSplit>('/bill-splitting', body),
  execute: (id: string) => api.post<BillSplit>(`/bill-splitting/${id}/execute`),
  accept: (id: string) => api.post<BillSplit>(`/bill-splitting/${id}/accept`),
  remove: (id: string) => api.delete<void>(`/bill-splitting/${id}`),
};

// ── Notifications ────────────────────────────────────────────────────────────

export const notificationsApi = {
  list: () => api.get<Notification[]>('/notifications'),
  unreadCount: () => api.get<number>('/notifications/unread-count'),
  markRead: (id: string) => api.patch<Notification>(`/notifications/${id}/read`),
  markAllRead: () => api.patch<void>('/notifications/mark-all-read'),
  remove: (id: string) => api.delete<void>(`/notifications/${id}`),
};

// ── Rewards / insights / ledger ──────────────────────────────────────────────

export const rewardsApi = {
  list: () => api.get<unknown[]>('/rewards'),
  summary: () => api.get<RewardSummary>('/rewards/summary'),
  redeem: (id: string) => api.post<unknown>(`/rewards/${id}/redeem`),
};

export const insightsApi = {
  generate: () => api.post<unknown>('/ai-insights/generate'),
  insights: () => api.get<SpendingInsight[]>('/ai-insights/insights'),
  recommendations: () => api.get<unknown[]>('/ai-insights/recommendations'),
  markInsightRead: (id: string) => api.patch<unknown>(`/ai-insights/insights/${id}/read`),
};

export const ledgerApi = {
  entries: () => api.get<unknown[]>('/ledger/entries'),
  balance: () => api.get<{ balance: string | number }>('/ledger/balance'),
};

export const healthApi = {
  check: () => api.get<{ status: string }>('/health', { anonymous: true }),
};

/** Display name for a user, whichever profile fields are populated. */
export function displayName(user: { firstName?: string; lastName?: string; email?: string; phone?: string } | null | undefined) {
  if (!user) return '';
  const full = [user.firstName, user.lastName].filter(Boolean).join(' ').trim();
  return full || user.email || user.phone || '';
}

/** Two-letter fallback avatar, used where the design shows a photo. */
export function initials(user: { firstName?: string; lastName?: string; email?: string } | null | undefined) {
  if (!user) return '';
  const a = user.firstName?.[0] ?? user.email?.[0] ?? '';
  const b = user.lastName?.[0] ?? '';
  return (a + b).toUpperCase();
}

/**
 * Money arrives as a Postgres numeric, which node-postgres surfaces as a string
 * to avoid float rounding. Coerce at the edge rather than typing balances as
 * `number` and lying about the wire format.
 */
export function toAmount(value: string | number | null | undefined): number {
  const n = typeof value === 'string' ? Number(value) : (value ?? 0);
  return Number.isFinite(n) ? n : 0;
}
