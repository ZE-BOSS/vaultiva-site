import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Wifi, 
  Tv, 
  Zap, 
  Gamepad2,
  CreditCard,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

const BillPayment: React.FC = () => {
  const { wallets, addTransaction } = useWallet();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [provider, setProvider] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);

  const services = [
    {
      id: 'airtime',
      name: 'Airtime',
      icon: Smartphone,
      color: 'from-blue-500 to-cyan-500',
      description: 'Buy airtime for all networks',
      providers: ['MTN', 'Airtel', 'Glo', '9mobile']
    },
    {
      id: 'internet',
      name: 'Internet',
      icon: Wifi,
      color: 'from-green-500 to-emerald-500',
      description: 'Data bundles for all networks',
      providers: ['MTN', 'Airtel', 'Glo', '9mobile']
    },
    {
      id: 'tv',
      name: 'TV Subscription',
      icon: Tv,
      color: 'from-purple-500 to-pink-500',
      description: 'Cable TV and streaming services',
      providers: ['DStv', 'GOtv', 'Startimes', 'Showmax']
    },
    {
      id: 'electricity',
      name: 'Electricity',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      description: 'Electricity bills payment',
      providers: ['EKEDC', 'IKEDC', 'AEDC', 'PHED']
    },
    {
      id: 'betting',
      name: 'Bet Funding',
      icon: Gamepad2,
      color: 'from-indigo-500 to-purple-500',
      description: 'Fund your betting accounts',
      providers: ['Bet9ja', 'SportyBet', 'NairaBet', '1xBet']
    }
  ];

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setProvider('');
    setAmount('');
    setPhoneNumber('');
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedWallet || !amount || !provider) return;

    const service = services.find(s => s.id === selectedService);
    if (!service) return;

    // Add transaction
    addTransaction({
      walletId: selectedWallet,
      type: 'debit',
      amount: parseFloat(amount),
      description: `${service.name} - ${provider}`,
      date: new Date(),
      category: 'Bills',
      status: 'completed'
    });

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedService(null);
      setAmount('');
      setPhoneNumber('');
      setProvider('');
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const PaymentForm = () => {
    const service = services.find(s => s.id === selectedService);
    if (!service) return null;

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center`}>
            <service.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {service.name} Payment
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {service.description}
            </p>
          </div>
        </div>

        <form onSubmit={handlePayment} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Provider
            </label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Choose provider</option>
              {service.providers.map((prov) => (
                <option key={prov} value={prov}>{prov}</option>
              ))}
            </select>
          </div>

          {(selectedService === 'airtime' || selectedService === 'internet') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Enter phone number"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Enter amount"
              min="100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Payment Wallet
            </label>
            <select
              value={selectedWallet}
              onChange={(e) => setSelectedWallet(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
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

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setSelectedService(null)}
              className="flex-1 px-4 py-3 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Pay {amount && formatCurrency(parseFloat(amount))}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </motion.div>
    );
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center max-w-md mx-4"
        >
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Your payment has been processed successfully.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Pay Bills
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Pay for airtime, data, TV, electricity and more
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Services Grid */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Select Service
            </h2>
            <div className="grid gap-4">
              {services.map((service, index) => {
                const Icon = service.icon;
                const isSelected = selectedService === service.id;
                
                return (
                  <motion.button
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleServiceSelect(service.id)}
                    className={`w-full text-left p-6 rounded-2xl transition-all duration-200 ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-900/50 border-2 border-blue-500'
                        : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {service.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {service.description}
                        </p>
                      </div>
                      <ArrowRight className={`w-5 h-5 transition-colors ${
                        isSelected ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Payment Form */}
          <div>
            {selectedService ? (
              <PaymentForm />
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 text-center"
              >
                <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Select a Service
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose a service from the left to get started with your payment
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillPayment;