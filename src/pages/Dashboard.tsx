import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Wallet, 
  CreditCard, 
  Users, 
  Shield, 
  TrendingUp, 
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  EyeOff,
  DollarSign,
  Send,
  Download,
  Bell,
  X,
  Check,
  AlertTriangle,
  Info,
  Zap,
  Building2,
  Clock,
  Copy,
  CheckCircle
} from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';

const Dashboard: React.FC = () => {
  const { wallets, transactions, getTotalBalance, addTransaction } = useWallet();
  const { user } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotifications();
  const [showBalance, setShowBalance] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  const recentTransactions = transactions.slice(0, 5);
  const totalBalance = getTotalBalance();

  // Bank details for deposits
  const bankDetails = {
    accountName: 'Vaultivas Technologies Limited',
    accountNumber: '0123456789',
    bankName: 'First Bank of Nigeria',
    sortCode: '011-152-003'
  };

  const quickActions = [
    {
      icon: CreditCard,
      title: 'Pay Bills',
      description: 'Airtime, Data, TV & More',
      color: 'from-blue-500 to-cyan-500',
      link: '/bills'
    },
    {
      icon: Users,
      title: 'Split Bills',
      description: 'Share expenses with friends',
      color: 'from-green-500 to-emerald-500',
      link: '/split'
    },
    {
      icon: Shield,
      title: 'Escrow',
      description: 'Secure transactions',
      color: 'from-purple-500 to-pink-500',
      link: '/escrow'
    },
    {
      icon: TrendingUp,
      title: 'AI Insights',
      description: 'Spending analytics',
      color: 'from-orange-500 to-red-500',
      link: '/insights'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDeposit = async () => {
    if (!depositAmount || !selectedWallet) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    addTransaction({
      walletId: selectedWallet,
      type: 'credit',
      amount: parseFloat(depositAmount),
      description: 'Bank Transfer Deposit',
      date: new Date(),
      category: 'Deposit',
      status: 'completed'
    });

    setDepositAmount('');
    setSelectedWallet('');
    setShowDepositModal(false);
    setIsLoading(false);
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || !selectedWallet) return;
    
    const wallet = wallets.find(w => w.id === selectedWallet);
    if (!wallet || wallet.balance < parseFloat(withdrawAmount)) {
      alert('Insufficient balance');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    addTransaction({
      walletId: selectedWallet,
      type: 'debit',
      amount: parseFloat(withdrawAmount),
      description: 'Bank Transfer Withdrawal',
      date: new Date(),
      category: 'Withdrawal',
      status: 'pending'
    });

    setWithdrawAmount('');
    setSelectedWallet('');
    setShowWithdrawModal(false);
    setIsLoading(false);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'transaction': return DollarSign;
      case 'account': return Wallet;
      case 'security': return Shield;
      case 'system': return Info;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'high') return 'text-red-600 bg-red-100 dark:bg-red-900/50';
    if (type === 'transaction') return 'text-green-600 bg-green-100 dark:bg-green-900/50';
    if (type === 'security') return 'text-orange-600 bg-orange-100 dark:bg-orange-900/50';
    return 'text-blue-600 bg-blue-100 dark:bg-blue-900/50';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back, {user?.name?.split(' ')[0]}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Here's what's happening with your money today.
              </p>
            </div>
            
            {/* Notifications Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(true)}
              className="relative p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300"
            >
              <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              {unreadCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold"
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </motion.span>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white mb-8 overflow-hidden"
        >
          {/* Glassmorphism Background */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          
          {/* Animated Background Elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-2">Total Balance</p>
                <div className="flex items-center space-x-3">
                  <motion.h2 
                    key={showBalance ? 'visible' : 'hidden'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold"
                  >
                    {showBalance ? formatCurrency(totalBalance) : '••••••••'}
                  </motion.h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowBalance(!showBalance)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {showBalance ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-blue-100 text-sm font-medium mb-2">Active Wallets</p>
                <p className="text-3xl font-bold">{wallets.length}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDepositModal(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Deposit</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowWithdrawModal(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300"
              >
                <Send className="w-4 h-4" />
                <span className="text-sm font-medium">Withdraw</span>
              </motion.button>
              
              <Link
                to="/wallets"
                className="flex items-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300"
              >
                <Wallet className="w-4 h-4" />
                <span className="text-sm font-medium">Manage Wallets</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link
                  key={index}
                  to={action.link}
                  className="group"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group-hover:border-blue-200 dark:group-hover:border-blue-700"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {action.description}
                    </p>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Recent Transactions
                  </h2>
                  <Link
                    to="/wallets"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    View All
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentTransactions.map((transaction, index) => (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === 'credit' 
                              ? 'bg-green-100 dark:bg-green-900' 
                              : 'bg-red-100 dark:bg-red-900'
                          }`}
                        >
                          {transaction.type === 'credit' ? (
                            <ArrowDownRight className="w-5 h-5 text-green-600 dark:text-green-400" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5 text-red-600 dark:text-red-400" />
                          )}
                        </motion.div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {transaction.description}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {transaction.date.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.type === 'credit' 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </p>
                        <p className={`text-xs ${
                          transaction.status === 'completed' 
                            ? 'text-green-600 dark:text-green-400' 
                            : transaction.status === 'pending'
                            ? 'text-yellow-600 dark:text-yellow-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {transaction.status}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Wallets Overview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Wallets
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {wallets.map((wallet, index) => (
                    <motion.div
                      key={wallet.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${wallet.color} rounded-lg flex items-center justify-center shadow-lg`}>
                          <Wallet className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {wallet.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                            {wallet.type}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {showBalance ? formatCurrency(wallet.balance) : '••••'}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Link
                  to="/wallets"
                  className="block w-full mt-4 text-center py-3 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                >
                  Manage All Wallets
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Modals */}
        <AnimatePresence>
          {/* Enhanced Deposit Modal with Banking Instructions */}
          {showDepositModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowDepositModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Building2 className="w-6 h-6 mr-3 text-blue-600" />
                    Deposit Funds via Bank Transfer
                  </h3>
                  
                  {/* Bank Account Details */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-6">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                      Transfer to this account:
                    </h4>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Account Name</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{bankDetails.accountName}</p>
                          </div>
                          <button
                            onClick={() => copyToClipboard(bankDetails.accountName, 'accountName')}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            {copiedField === 'accountName' ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-500" />
                            )}
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Account Number</p>
                            <p className="font-semibold text-gray-900 dark:text-white font-mono">{bankDetails.accountNumber}</p>
                          </div>
                          <button
                            onClick={() => copyToClipboard(bankDetails.accountNumber, 'accountNumber')}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            {copiedField === 'accountNumber' ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-500" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Bank Name</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{bankDetails.bankName}</p>
                          </div>
                          <button
                            onClick={() => copyToClipboard(bankDetails.bankName, 'bankName')}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            {copiedField === 'bankName' ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-500" />
                            )}
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Sort Code</p>
                            <p className="font-semibold text-gray-900 dark:text-white font-mono">{bankDetails.sortCode}</p>
                          </div>
                          <button
                            onClick={() => copyToClipboard(bankDetails.sortCode, 'sortCode')}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            {copiedField === 'sortCode' ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-500" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Important Instructions:</h5>
                        <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                          <li>• Use your Vaultivas username as the transfer reference</li>
                          <li>• Transfers are processed within 5-30 minutes</li>
                          <li>• Minimum deposit amount is ₦500</li>
                          <li>• Keep your transfer receipt for reference</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Processing Time */}
                  <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Processing Time</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">5-30 minutes for most banks</p>
                    </div>
                  </div>

                  {/* Wallet Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Select Wallet to Credit
                    </label>
                    <select
                      value={selectedWallet}
                      onChange={(e) => setSelectedWallet(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Choose wallet</option>
                      {wallets.map((wallet) => (
                        <option key={wallet.id} value={wallet.id}>
                          {wallet.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowDepositModal(false)}
                      className="flex-1 px-4 py-3 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Close
                    </button>
                    <Link
                      to="/banking-instructions"
                      className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-center"
                    >
                      View Full Instructions
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Enhanced Withdraw Modal */}
          {showWithdrawModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowWithdrawModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Send className="w-6 h-6 mr-3 text-green-600" />
                  Withdraw Funds
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Select Wallet
                    </label>
                    <select
                      value={selectedWallet}
                      onChange={(e) => setSelectedWallet(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Choose wallet</option>
                      {wallets.map((wallet) => (
                        <option key={wallet.id} value={wallet.id}>
                          {wallet.name} - {formatCurrency(wallet.balance)}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Amount
                    </label>
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Enter amount"
                      min="1000"
                      max={selectedWallet ? wallets.find(w => w.id === selectedWallet)?.balance : undefined}
                    />
                  </div>
                  
                  {selectedWallet && (
                    <div className="bg-blue-50 dark:bg-blue-900/50 rounded-lg p-3">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Available balance: {formatCurrency(wallets.find(w => w.id === selectedWallet)?.balance || 0)}
                      </p>
                    </div>
                  )}

                  {/* Withdrawal Info */}
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <Info className="w-4 h-4 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Withdrawal Info</p>
                        <ul className="text-xs text-yellow-700 dark:text-yellow-300 mt-1 space-y-1">
                          <li>• Minimum withdrawal: ₦1,000</li>
                          <li>• Processing time: 1-24 hours</li>
                          <li>• Fee: ₦50 - ₦200 (based on amount)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={() => setShowWithdrawModal(false)}
                    className="flex-1 px-4 py-3 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleWithdraw}
                    disabled={!withdrawAmount || !selectedWallet || isLoading}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:from-red-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Withdraw</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Notifications Panel */}
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowNotifications(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 300 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md h-[600px] flex flex-col"
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Notifications
                    </h3>
                    <div className="flex items-center space-x-2">
                      {unreadCount > 0 && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={markAllAsRead}
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Mark all read
                        </motion.button>
                      )}
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-3">
                    {notifications.map((notification, index) => {
                      const Icon = getNotificationIcon(notification.type);
                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                            notification.read 
                              ? 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600' 
                              : 'bg-blue-50 dark:bg-blue-900/50 border-blue-200 dark:border-blue-700'
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${getNotificationColor(notification.type, notification.priority)}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="font-medium text-gray-900 dark:text-white text-sm">
                                  {notification.title}
                                </p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notification.id);
                                  }}
                                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                                >
                                  <X className="w-3 h-3 text-gray-400" />
                                </button>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                                {notification.timestamp.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                  
                  {notifications.length === 0 && (
                    <div className="text-center py-12">
                      <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">
                        No notifications yet
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;