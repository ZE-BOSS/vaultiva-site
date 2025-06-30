import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Eye, 
  EyeOff, 
  Edit, 
  Trash2, 
  ArrowUpRight, 
  ArrowDownRight,
  Wallet,
  Users,
  Briefcase,
  Shield
} from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

const Wallets: React.FC = () => {
  const { wallets, transactions, addWallet, updateWallet, deleteWallet } = useWallet();
  const [showBalances, setShowBalances] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getWalletIcon = (type: string) => {
    switch (type) {
      case 'personal': return Wallet;
      case 'group': return Users;
      case 'business': return Briefcase;
      case 'escrow': return Shield;
      default: return Wallet;
    }
  };

  const getWalletTransactions = (walletId: string) => {
    return transactions.filter(t => t.walletId === walletId).slice(0, 3);
  };

  const AddWalletModal = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState<'personal' | 'group' | 'business' | 'escrow'>('personal');
    const [color, setColor] = useState('bg-gradient-to-r from-blue-500 to-cyan-500');

    const colors = [
      'bg-gradient-to-r from-blue-500 to-cyan-500',
      'bg-gradient-to-r from-green-500 to-emerald-500',
      'bg-gradient-to-r from-purple-500 to-pink-500',
      'bg-gradient-to-r from-orange-500 to-red-500',
      'bg-gradient-to-r from-indigo-500 to-purple-500',
      'bg-gradient-to-r from-pink-500 to-rose-500'
    ];

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      addWallet({
        name,
        type,
        balance: 0,
        currency: 'NGN',
        color,
        icon: type
      });
      setShowAddModal(false);
      setName('');
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Add New Wallet
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Wallet Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Enter wallet name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Wallet Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="personal">Personal</option>
                <option value="group">Group</option>
                <option value="business">Business</option>
                <option value="escrow">Escrow</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Color Theme
              </label>
              <div className="grid grid-cols-3 gap-3">
                {colors.map((colorClass, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setColor(colorClass)}
                    className={`w-full h-12 ${colorClass} rounded-lg ${
                      color === colorClass ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-3 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                Create Wallet
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Wallets
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your multiple wallets and track transactions
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowBalances(!showBalances)}
              className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {showBalances ? (
                <EyeOff className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              ) : (
                <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              )}
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {showBalances ? 'Hide' : 'Show'} Balances
              </span>
            </button>
            
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Add Wallet</span>
            </button>
          </div>
        </motion.div>

        {/* Wallets Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {wallets.map((wallet, index) => {
            const Icon = getWalletIcon(wallet.type);
            const walletTransactions = getWalletTransactions(wallet.id);
            
            return (
              <motion.div
                key={wallet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                {/* Wallet Header */}
                <div className={`${wallet.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{wallet.name}</h3>
                          <p className="text-white/80 text-sm capitalize">{wallet.type}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-1 hover:bg-white/20 rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 hover:bg-white/20 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-white/80 text-sm">Balance</p>
                      <p className="text-2xl font-bold">
                        {showBalances ? formatCurrency(wallet.balance) : '****'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Recent Activity
                    </h4>
                    <button
                      onClick={() => setSelectedWallet(selectedWallet === wallet.id ? null : wallet.id)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      {selectedWallet === wallet.id ? 'Show Less' : 'View All'}
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {walletTransactions.length > 0 ? (
                      walletTransactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              transaction.type === 'credit' 
                                ? 'bg-green-100 dark:bg-green-900' 
                                : 'bg-red-100 dark:bg-red-900'
                            }`}>
                              {transaction.type === 'credit' ? (
                                <ArrowDownRight className="w-4 h-4 text-green-600 dark:text-green-400" />
                              ) : (
                                <ArrowUpRight className="w-4 h-4 text-red-600 dark:text-red-400" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {transaction.description}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {transaction.date.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-sm font-semibold ${
                              transaction.type === 'credit' 
                                ? 'text-green-600 dark:text-green-400' 
                                : 'text-red-600 dark:text-red-400'
                            }`}>
                              {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          No transactions yet
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Add Wallet Modal */}
        {showAddModal && <AddWalletModal />}
      </div>
    </div>
  );
};

export default Wallets;