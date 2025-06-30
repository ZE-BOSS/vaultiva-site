import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Plus, 
  Clock, 
  CheckCircle, 
  XCircle,
  Eye,
  MessageSquare,
  Upload,
  Download
} from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

interface EscrowTransaction {
  id: string;
  title: string;
  description: string;
  amount: number;
  buyer: string;
  seller: string;
  status: 'pending' | 'funded' | 'delivered' | 'completed' | 'disputed' | 'cancelled';
  createdAt: Date;
  milestones: Milestone[];
  messages: Message[];
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  status: 'pending' | 'completed';
  completedAt?: Date;
}

interface Message {
  id: string;
  sender: string;
  message: string;
  timestamp: Date;
  type: 'message' | 'system';
}

const Escrow: React.FC = () => {
  const { wallets, addTransaction } = useWallet();
  const [activeTab, setActiveTab] = useState<'create' | 'active' | 'history'>('create');
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  
  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [sellerEmail, setSellerEmail] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');

  const [escrowTransactions, setEscrowTransactions] = useState<EscrowTransaction[]>([
    {
      id: '1',
      title: 'Laptop Purchase',
      description: 'MacBook Pro 16" M2 - Brand new, sealed box',
      amount: 1200000,
      buyer: 'You',
      seller: 'TechStore Lagos',
      status: 'funded',
      createdAt: new Date('2024-01-12'),
      milestones: [
        {
          id: '1',
          title: 'Payment Confirmation',
          description: 'Buyer funds escrow account',
          amount: 1200000,
          status: 'completed',
          completedAt: new Date('2024-01-12')
        },
        {
          id: '2',
          title: 'Item Delivery',
          description: 'Seller ships the laptop',
          amount: 0,
          status: 'pending'
        }
      ],
      messages: [
        {
          id: '1',
          sender: 'system',
          message: 'Escrow transaction created and funded',
          timestamp: new Date('2024-01-12'),
          type: 'system'
        },
        {
          id: '2',
          sender: 'TechStore Lagos',
          message: 'Thank you for your purchase. We will ship the laptop within 24 hours.',
          timestamp: new Date('2024-01-12'),
          type: 'message'
        }
      ]
    },
    {
      id: '2',
      title: 'Freelance Web Design',
      description: 'Complete website redesign for e-commerce store',
      amount: 350000,
      buyer: 'StartupCorp',
      seller: 'You',
      status: 'completed',
      createdAt: new Date('2024-01-05'),
      milestones: [
        {
          id: '1',
          title: 'Initial Design',
          description: 'Wireframes and mockups',
          amount: 175000,
          status: 'completed',
          completedAt: new Date('2024-01-08')
        },
        {
          id: '2',
          title: 'Development & Launch',
          description: 'Full website development and deployment',
          amount: 175000,
          status: 'completed',
          completedAt: new Date('2024-01-15')
        }
      ],
      messages: []
    }
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
      case 'funded': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400';
      case 'delivered': return 'text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-400';
      case 'disputed': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400';
      case 'cancelled': return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-400';
      default: return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'disputed': 
      case 'cancelled': return XCircle;
      default: return Clock;
    }
  };

  const createEscrow = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !amount || !sellerEmail || !selectedWallet) return;

    const newEscrow: EscrowTransaction = {
      id: Date.now().toString(),
      title,
      description,
      amount: parseFloat(amount),
      buyer: 'You',
      seller: sellerEmail,
      status: 'funded',
      createdAt: new Date(),
      milestones: [
        {
          id: '1',
          title: 'Payment Confirmation',
          description: 'Buyer funds escrow account',
          amount: parseFloat(amount),
          status: 'completed',
          completedAt: new Date()
        },
        {
          id: '2',
          title: 'Delivery Confirmation',
          description: 'Seller delivers goods/services',
          amount: 0,
          status: 'pending'
        }
      ],
      messages: [
        {
          id: '1',
          sender: 'system',
          message: 'Escrow transaction created and funded',
          timestamp: new Date(),
          type: 'system'
        }
      ]
    };

    setEscrowTransactions([newEscrow, ...escrowTransactions]);

    // Add transaction to wallet
    addTransaction({
      walletId: selectedWallet,
      type: 'debit',
      amount: parseFloat(amount),
      description: `Escrow - ${title}`,
      date: new Date(),
      category: 'Escrow',
      status: 'completed'
    });

    // Reset form
    setTitle('');
    setDescription('');
    setAmount('');
    setSellerEmail('');
    setSelectedWallet('');
    
    alert('Escrow transaction created successfully!');
  };

  const CreateEscrowForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create Escrow Transaction
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Secure your transaction with smart escrow protection
          </p>
        </div>
      </div>

      <form onSubmit={createEscrow} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Transaction Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="e.g., Laptop Purchase, Freelance Project"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Describe what you're buying or selling..."
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Enter amount"
              min="1000"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Seller Email
            </label>
            <input
              type="email"
              value={sellerEmail}
              onChange={(e) => setSellerEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="seller@example.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Payment Wallet
          </label>
          <select
            value={selectedWallet}
            onChange={(e) => setSelectedWallet(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            required
          >
            <option value="">Select wallet</option>
            {wallets.map((wallet) => (
              <option key={wallet.id} value={wallet.id}>
                {wallet.name} - {formatCurrency(wallet.balance)}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/50 rounded-lg p-4">
          <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
            How Escrow Works:
          </h4>
          <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
            <li>• Your payment is held securely in escrow</li>
            <li>• Seller is notified and delivers goods/services</li>
            <li>• You confirm receipt and release payment</li>
            <li>• Dispute resolution available if needed</li>
          </ul>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center justify-center space-x-2"
        >
          <Shield className="w-5 h-5" />
          <span>Create Escrow Transaction</span>
        </button>
      </form>
    </motion.div>
  );

  const TransactionList = ({ transactions, showAll = false }: { transactions: EscrowTransaction[], showAll?: boolean }) => (
    <div className="space-y-4">
      {transactions.map((transaction, index) => {
        const StatusIcon = getStatusIcon(transaction.status);
        
        return (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {transaction.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {transaction.buyer} ↔ {transaction.seller}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(transaction.amount)}
                </p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {transaction.status}
                </span>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {transaction.description}
            </p>

            <div className="space-y-2 mb-4">
              {transaction.milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    milestone.status === 'completed'
                      ? 'bg-green-50 dark:bg-green-900/50'
                      : 'bg-gray-50 dark:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {milestone.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Clock className="w-5 h-5 text-yellow-600" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {milestone.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  {milestone.amount > 0 && (
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(milestone.amount)}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Created {transaction.createdAt.toLocaleDateString()}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedTransaction(selectedTransaction === transaction.id ? null : transaction.id)}
                  className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
                >
                  <Eye className="w-4 h-4" />
                  <span>Details</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                  <MessageSquare className="w-4 h-4" />
                  <span>Messages ({transaction.messages.length})</span>
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  const activeTransactions = escrowTransactions.filter(t => ['pending', 'funded', 'delivered'].includes(t.status));
  const completedTransactions = escrowTransactions.filter(t => ['completed', 'cancelled', 'disputed'].includes(t.status));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Escrow Transactions
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Secure your transactions with smart escrow protection
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-8">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-colors ${
              activeTab === 'create'
                ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Create Escrow</span>
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-colors ${
              activeTab === 'active'
                ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span className="font-medium">Active ({activeTransactions.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-colors ${
              activeTab === 'history'
                ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">History</span>
          </button>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'create' && <CreateEscrowForm />}
          {activeTab === 'active' && <TransactionList transactions={activeTransactions} />}
          {activeTab === 'history' && <TransactionList transactions={completedTransactions} />}
        </div>
      </div>
    </div>
  );
};

export default Escrow;