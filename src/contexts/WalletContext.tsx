import React, { createContext, useContext, useState, useEffect } from 'react';

interface Wallet {
  id: string;
  name: string;
  type: 'personal' | 'group' | 'business' | 'escrow';
  balance: number;
  currency: string;
  color: string;
  icon: string;
}

interface Transaction {
  id: string;
  walletId: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: Date;
  category: string;
  status: 'completed' | 'pending' | 'failed';
}

interface WalletContextType {
  wallets: Wallet[];
  transactions: Transaction[];
  addWallet: (wallet: Omit<Wallet, 'id'>) => void;
  updateWallet: (id: string, updates: Partial<Wallet>) => void;
  deleteWallet: (id: string) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  getTotalBalance: () => number;
  getWalletById: (id: string) => Wallet | undefined;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallets, setWallets] = useState<Wallet[]>([
    {
      id: '1',
      name: 'Personal Wallet',
      type: 'personal',
      balance: 15586000.03,
      currency: 'NGN',
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      icon: 'wallet'
    },
    {
      id: '2',
      name: 'Group Wallet',
      type: 'group',
      balance: 850000.00,
      currency: 'NGN',
      color: 'bg-gradient-to-r from-green-500 to-emerald-500',
      icon: 'users'
    },
    {
      id: '3',
      name: 'Business Wallet',
      type: 'business',
      balance: 2500000.00,
      currency: 'NGN',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      icon: 'briefcase'
    },
    // {
    //   id: '4',
    //   name: 'Escrow Wallet',
    //   type: 'escrow',
    //   balance: 1200000.00,
    //   currency: 'NGN',
    //   color: 'bg-gradient-to-r from-orange-500 to-red-500',
    //   icon: 'shield'
    // }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      walletId: '1',
      type: 'debit',
      amount: 5000,
      description: 'Airtime Purchase - MTN',
      date: new Date('2024-01-15'),
      category: 'Bills',
      status: 'completed'
    },
    {
      id: '2',
      walletId: '1',
      type: 'debit',
      amount: 15000,
      description: 'Internet Bundle - Glo',
      date: new Date('2024-01-14'),
      category: 'Bills',
      status: 'completed'
    },
    {
      id: '3',
      walletId: '2',
      type: 'credit',
      amount: 25000,
      description: 'Bill Split - Restaurant',
      date: new Date('2024-01-13'),
      category: 'Split',
      status: 'completed'
    },
    {
      id: '4',
      walletId: '4',
      type: 'credit',
      amount: 100000,
      description: 'Laptop Purchase Escrow',
      date: new Date('2024-01-12'),
      category: 'Escrow',
      status: 'pending'
    }
  ]);

  const addWallet = (wallet: Omit<Wallet, 'id'>) => {
    const newWallet = {
      ...wallet,
      id: Date.now().toString()
    };
    setWallets(prev => [...prev, newWallet]);
  };

  const updateWallet = (id: string, updates: Partial<Wallet>) => {
    setWallets(prev => prev.map(wallet => 
      wallet.id === id ? { ...wallet, ...updates } : wallet
    ));
  };

  const deleteWallet = (id: string) => {
    setWallets(prev => prev.filter(wallet => wallet.id !== id));
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString()
    };
    setTransactions(prev => [newTransaction, ...prev]);
    
    // Update wallet balance
    updateWallet(transaction.walletId, {
      balance: wallets.find(w => w.id === transaction.walletId)!.balance + 
        (transaction.type === 'credit' ? transaction.amount : -transaction.amount)
    });
  };

  const getTotalBalance = () => {
    return wallets.reduce((total, wallet) => total + wallet.balance, 0);
  };

  const getWalletById = (id: string) => {
    return wallets.find(wallet => wallet.id === id);
  };

  return (
    <WalletContext.Provider value={{
      wallets,
      transactions,
      addWallet,
      updateWallet,
      deleteWallet,
      addTransaction,
      getTotalBalance,
      getWalletById
    }}>
      {children}
    </WalletContext.Provider>
  );
};