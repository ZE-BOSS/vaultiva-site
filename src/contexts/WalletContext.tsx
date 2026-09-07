import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { walletApi, ApiError, type Wallet, type Transaction, type WalletType } from '../api';
import { useAuth } from './AuthContext';

interface WalletContextType {
  wallets: Wallet[];
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  createWallet: (input: { name: string; type: WalletType }) => Promise<void>;
  getTotalBalance: () => number;
  getWalletById: (id: string) => Wallet | undefined;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used within a WalletProvider');
  return ctx;
};

/**
 * Live wallet data.
 *
 * This previously held a hard-coded array of four wallets and a list of invented
 * transactions in component state, with add/update/delete mutating that array
 * only. It now reads from the backend and reflects real balances.
 */
export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!isAuthenticated) {
      setWallets([]);
      setTransactions([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Transactions must not fail the whole load if only that endpoint errors.
      const [w, t] = await Promise.allSettled([walletApi.list(), walletApi.transactions()]);
      if (w.status === 'fulfilled') setWallets(w.value ?? []);
      else throw w.reason;
      if (t.status === 'fulfilled') setTransactions(t.value ?? []);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not load your wallets.');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const createWallet = useCallback(
    async ({ name, type }: { name: string; type: WalletType }) => {
      if (!user) throw new Error('You must be signed in to create a wallet.');
      await walletApi.create({ name, type, customerId: user.id, currency: 'NGN' });
      await refresh();
    },
    [user, refresh],
  );

  const getTotalBalance = useCallback(
    () => wallets.reduce((sum, w) => sum + Number(w.balance ?? 0), 0),
    [wallets],
  );

  const getWalletById = useCallback(
    (id: string) => wallets.find((w) => w.id === id),
    [wallets],
  );

  const value = useMemo<WalletContextType>(
    () => ({
      wallets,
      transactions,
      loading,
      error,
      refresh,
      createWallet,
      getTotalBalance,
      getWalletById,
    }),
    [wallets, transactions, loading, error, refresh, createWallet, getTotalBalance, getWalletById],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};
