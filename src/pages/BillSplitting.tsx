import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Trash2, 
  Share2, 
  Copy,
  CheckCircle,
  Clock,
} from 'lucide-react';

interface SplitBill {
  id: string;
  title: string;
  totalAmount: number;
  participants: Participant[];
  createdAt: Date;
  status: 'active' | 'completed' | 'cancelled';
  createdBy: string;
}

interface Participant {
  id: string;
  name: string;
  email: string;
  amount: number;
  paid: boolean;
  avatar?: string;
}

const BillSplitting: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'history'>('create');
  const [billTitle, setBillTitle] = useState('');
  const [totalAmount, setTotalAmount] = useState<string>('');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [newParticipant, setNewParticipant] = useState({ name: '', email: '' });
  const [splitBills, setSplitBills] = useState<SplitBill[]>([
    {
      id: '1',
      title: 'Restaurant Bill - Downtown',
      totalAmount: 45000,
      participants: [
        { id: '1', name: 'John Doe', email: 'john@example.com', amount: 15000, paid: true },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', amount: 15000, paid: true },
        { id: '3', name: 'Mike Johnson', email: 'mike@example.com', amount: 15000, paid: false }
      ],
      createdAt: new Date('2024-01-10'),
      status: 'active',
      createdBy: 'You'
    },
    {
      id: '2',
      title: 'Netflix Subscription',
      totalAmount: 3600,
      participants: [
        { id: '1', name: 'Sarah Wilson', email: 'sarah@example.com', amount: 1200, paid: true },
        { id: '2', name: 'Tom Brown', email: 'tom@example.com', amount: 1200, paid: true },
        { id: '3', name: 'Lisa Davis', email: 'lisa@example.com', amount: 1200, paid: true }
      ],
      createdAt: new Date('2024-01-05'),
      status: 'completed',
      createdBy: 'Sarah Wilson'
    }
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const addParticipant = () => {
    if (!newParticipant.name || !newParticipant.email) return;
    
    const participant: Participant = {
      id: Date.now().toString(),
      name: newParticipant.name,
      email: newParticipant.email,
      amount: 0,
      paid: false
    };
    
    setParticipants([...participants, participant]);
    setNewParticipant({ name: '', email: '' });
  };

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  const splitEqually = () => {
    if (!totalAmount || participants.length === 0) return;
    
    const amount = parseFloat(totalAmount);
    const splitAmount = Math.round((amount / participants.length) * 100) / 100;
    
    setParticipants(participants.map(p => ({ ...p, amount: splitAmount })));
  };

  const createSplitBill = () => {
    if (!billTitle || !totalAmount || participants.length === 0) return;
    
    const newBill: SplitBill = {
      id: Date.now().toString(),
      title: billTitle,
      totalAmount: parseFloat(totalAmount),
      participants: participants,
      createdAt: new Date(),
      status: 'active',
      createdBy: 'You'
    };
    
    setSplitBills([newBill, ...splitBills]);
    
    // Reset form
    setBillTitle('');
    setTotalAmount('');
    setParticipants([]);
    
    // Show success message
    alert('Bill split created successfully!');
  };

  const markAsPaid = (billId: string, participantId: string) => {
    setSplitBills(splitBills.map(bill => {
      if (bill.id === billId) {
        return {
          ...bill,
          participants: bill.participants.map(p => 
            p.id === participantId ? { ...p, paid: true } : p
          )
        };
      }
      return bill;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
      case 'cancelled': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400';
      default: return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400';
    }
  };

  const CreateBillForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Create New Split Bill
      </h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bill Title
          </label>
          <input
            type="text"
            value={billTitle}
            onChange={(e) => setBillTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="e.g., Restaurant Bill, Netflix Subscription"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Total Amount
          </label>
          <input
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Enter total amount"
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Participants
            </label>
            {participants.length > 0 && (
              <button
                onClick={splitEqually}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Split Equally
              </button>
            )}
          </div>
          
          <div className="space-y-3 mb-4">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {participant.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {participant.email}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    value={participant.amount}
                    onChange={(e) => {
                      const amount = parseFloat(e.target.value) || 0;
                      setParticipants(participants.map(p => 
                        p.id === participant.id ? { ...p, amount } : p
                      ));
                    }}
                    className="w-24 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-600 dark:text-white"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                  <button
                    onClick={() => removeParticipant(participant.id)}
                    className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex space-x-3">
            <input
              type="text"
              value={newParticipant.name}
              onChange={(e) => setNewParticipant({ ...newParticipant, name: e.target.value })}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Participant name"
            />
            <input
              type="email"
              value={newParticipant.email}
              onChange={(e) => setNewParticipant({ ...newParticipant, email: e.target.value })}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Email address"
            />
            <button
              onClick={addParticipant}
              className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {participants.length > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/50 rounded-lg p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-700 dark:text-blue-300">Total Split:</span>
              <span className="font-semibold text-blue-900 dark:text-blue-100">
                {formatCurrency(participants.reduce((sum, p) => sum + p.amount, 0))}
              </span>
            </div>
            {totalAmount && (
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-blue-700 dark:text-blue-300">Remaining:</span>
                <span className={`font-semibold ${
                  parseFloat(totalAmount) - participants.reduce((sum, p) => sum + p.amount, 0) === 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {formatCurrency(parseFloat(totalAmount) - participants.reduce((sum, p) => sum + p.amount, 0))}
                </span>
              </div>
            )}
          </div>
        )}

        <button
          onClick={createSplitBill}
          disabled={!billTitle || !totalAmount || participants.length === 0}
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
        >
          <Share2 className="w-5 h-5" />
          <span>Create Split Bill</span>
        </button>
      </div>
    </motion.div>
  );

  const BillHistory = () => (
    <div className="space-y-6">
      {splitBills.map((bill, index) => (
        <motion.div
          key={bill.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {bill.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Created by {bill.createdBy} on {bill.createdAt.toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(bill.totalAmount)}
              </p>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(bill.status)}`}>
                {bill.status}
              </span>
            </div>
          </div>
          
          <div className="space-y-3">
            {bill.participants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {participant.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {participant.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {participant.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(participant.amount)}
                    </p>
                    <div className="flex items-center space-x-1">
                      {participant.paid ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-xs text-green-600">Paid</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4 text-yellow-600" />
                          <span className="text-xs text-yellow-600">Pending</span>
                        </>
                      )}
                    </div>
                  </div>
                  {!participant.paid && bill.status === 'active' && (
                    <button
                      onClick={() => markAsPaid(bill.id, participant.id)}
                      className="px-3 py-1 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Mark Paid
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Progress: {bill.participants.filter(p => p.paid).length} of {bill.participants.length} paid
              </span>
              <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                <Copy className="w-4 h-4" />
                <span>Share Link</span>
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Split Bills
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Split expenses with friends and family easily
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-8">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-colors ${
              activeTab === 'create'
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Create Split</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-colors ${
              activeTab === 'history'
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="font-medium">Split History</span>
          </button>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'create' ? <CreateBillForm /> : <BillHistory />}
        </div>
      </div>
    </div>
  );
};

export default BillSplitting;