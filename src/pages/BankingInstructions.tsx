import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Building2, 
  Clock, 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  Copy,
  Download,
  Upload,
  ArrowRight,
  Info,
  DollarSign,
  Smartphone,
  Globe
} from 'lucide-react';

const BankingInstructions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [selectedBank, setSelectedBank] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const bankDetails = {
    accountName: 'Vaultivas Technologies Limited',
    accountNumber: '0123456789',
    bankName: 'First Bank of Nigeria',
    sortCode: '011-152-003',
    swiftCode: 'FBNGNGLA'
  };

  const supportedBanks = [
    { name: 'First Bank of Nigeria', code: 'FBN', transferTime: '5-10 minutes', fee: '₦25' },
    { name: 'Guaranty Trust Bank', code: 'GTB', transferTime: '5-10 minutes', fee: '₦25' },
    { name: 'United Bank for Africa', code: 'UBA', transferTime: '5-10 minutes', fee: '₦25' },
    { name: 'Access Bank', code: 'ACCESS', transferTime: '5-10 minutes', fee: '₦25' },
    { name: 'Zenith Bank', code: 'ZENITH', transferTime: '5-10 minutes', fee: '₦25' },
    { name: 'Fidelity Bank', code: 'FIDELITY', transferTime: '5-10 minutes', fee: '₦25' },
    { name: 'Sterling Bank', code: 'STERLING', transferTime: '5-10 minutes', fee: '₦25' },
    { name: 'Stanbic IBTC Bank', code: 'STANBIC', transferTime: '5-10 minutes', fee: '₦25' }
  ];

  const transferMethods = [
    {
      icon: Smartphone,
      title: 'Mobile Banking',
      description: 'Use your bank\'s mobile app for instant transfers',
      steps: [
        'Open your bank\'s mobile app',
        'Select "Transfer" or "Send Money"',
        'Enter our account details',
        'Add your Vaultivas username as reference',
        'Confirm and send'
      ]
    },
    {
      icon: Globe,
      title: 'Internet Banking',
      description: 'Transfer via your bank\'s website',
      steps: [
        'Log into your internet banking',
        'Navigate to transfers section',
        'Add Vaultivas as a beneficiary',
        'Enter transfer amount',
        'Use your username as reference'
      ]
    },
    {
      icon: Building2,
      title: 'Bank Branch',
      description: 'Visit any branch for assisted transfers',
      steps: [
        'Visit your nearest bank branch',
        'Fill out a transfer form',
        'Provide our account details',
        'Include your Vaultivas username',
        'Get transfer receipt'
      ]
    },
    {
      icon: CreditCard,
      title: 'ATM Transfer',
      description: 'Use ATM for quick transfers',
      steps: [
        'Insert your card at any ATM',
        'Select "Transfer" option',
        'Choose "To Other Banks"',
        'Enter our account details',
        'Complete the transaction'
      ]
    }
  ];

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const DepositInstructions = () => (
    <div className="space-y-8">
      {/* Bank Account Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <Building2 className="w-6 h-6 mr-3 text-blue-600" />
          Bank Account Details
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-4">
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
          </div>
          
          <div className="space-y-4">
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
            
            <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">SWIFT Code</p>
                <p className="font-semibold text-gray-900 dark:text-white font-mono">{bankDetails.swiftCode}</p>
              </div>
              <button
                onClick={() => copyToClipboard(bankDetails.swiftCode, 'swiftCode')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedField === 'swiftCode' ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-500" />
                )}
              </button>
            </div>
            
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
              <div className="flex items-start space-x-2">
                <Info className="w-4 h-4 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Important</p>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300">
                    Always include your Vaultivas username in the transfer reference
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Step-by-Step Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Step-by-Step Deposit Guide
        </h3>
        
        <div className="space-y-4">
          {[
            {
              step: 1,
              title: 'Initiate Transfer',
              description: 'Log into your bank account or visit a branch to start the transfer process.'
            },
            {
              step: 2,
              title: 'Enter Account Details',
              description: 'Use the bank account details provided above. Double-check all information.'
            },
            {
              step: 3,
              title: 'Add Reference',
              description: 'Include your Vaultivas username in the transfer reference or narration field.'
            },
            {
              step: 4,
              title: 'Confirm Transfer',
              description: 'Review all details and confirm the transfer. Save your transaction receipt.'
            },
            {
              step: 5,
              title: 'Wait for Confirmation',
              description: 'Your wallet will be credited within 5-30 minutes. You\'ll receive a notification.'
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                {item.step}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Transfer Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Transfer Methods
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {transferMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{method.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{method.description}</p>
                  </div>
                </div>
                
                <ul className="space-y-1">
                  {method.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                      <span className="w-4 h-4 text-blue-600 mr-2 mt-0.5">•</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );

  const WithdrawInstructions = () => (
    <div className="space-y-8">
      {/* Withdrawal Process */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <Download className="w-6 h-6 mr-3 text-green-600" />
          Withdrawal Process
        </h3>
        
        <div className="space-y-4">
          {[
            {
              step: 1,
              title: 'Verify Your Account',
              description: 'Ensure your account is fully verified with valid ID and bank details.',
              icon: Shield
            },
            {
              step: 2,
              title: 'Check Minimum Balance',
              description: 'Minimum withdrawal amount is ₦1,000. Ensure sufficient balance.',
              icon: DollarSign
            },
            {
              step: 3,
              title: 'Request Withdrawal',
              description: 'Go to your wallet and click "Withdraw". Enter amount and bank details.',
              icon: CreditCard
            },
            {
              step: 4,
              title: 'Confirm Transaction',
              description: 'Review details and confirm. You may need to enter your transaction PIN.',
              icon: CheckCircle
            },
            {
              step: 5,
              title: 'Processing Time',
              description: 'Withdrawals are processed within 1-24 hours on business days.',
              icon: Clock
            }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Step {item.step}: {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Withdrawal Limits & Fees */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h4 className="font-bold text-gray-900 dark:text-white mb-4">Withdrawal Limits</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Minimum</span>
              <span className="font-semibold text-gray-900 dark:text-white">₦1,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Daily Limit</span>
              <span className="font-semibold text-gray-900 dark:text-white">₦500,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Monthly Limit</span>
              <span className="font-semibold text-gray-900 dark:text-white">₦5,000,000</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h4 className="font-bold text-gray-900 dark:text-white mb-4">Withdrawal Fees</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">₦1,000 - ₦10,000</span>
              <span className="font-semibold text-gray-900 dark:text-white">₦50</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">₦10,001 - ₦100,000</span>
              <span className="font-semibold text-gray-900 dark:text-white">₦100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Above ₦100,000</span>
              <span className="font-semibold text-gray-900 dark:text-white">₦200</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Important Notes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-700"
      >
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">Important Notes</h4>
            <ul className="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
              <li>• Withdrawals are processed only on business days (Monday - Friday)</li>
              <li>• Bank details must match your verified account information</li>
              <li>• Processing may take longer during holidays or high volume periods</li>
              <li>• Failed withdrawals will be reversed to your wallet within 24 hours</li>
              <li>• Contact support if your withdrawal is delayed beyond 24 hours</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Banking Instructions
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Complete guide for deposits and withdrawals. Follow these instructions for secure and fast transactions.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-8">
          <button
            onClick={() => setActiveTab('deposit')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300 ${
              activeTab === 'deposit'
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Upload className="w-5 h-5" />
            <span className="font-medium">Deposit Funds</span>
          </button>
          <button
            onClick={() => setActiveTab('withdraw')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300 ${
              activeTab === 'withdraw'
                ? 'bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Download className="w-5 h-5" />
            <span className="font-medium">Withdraw Funds</span>
          </button>
        </div>

        {/* Content */}
        {activeTab === 'deposit' ? <DepositInstructions /> : <WithdrawInstructions />}

        {/* Supported Banks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Supported Banks & Processing Times
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {supportedBanks.map((bank, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{bank.name}</h4>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Transfer Time:</span>
                    <span className="text-gray-900 dark:text-white">{bank.transferTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Fee:</span>
                    <span className="text-gray-900 dark:text-white">{bank.fee}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Support Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white text-center"
        >
          <h3 className="text-xl font-bold mb-2">Need Help?</h3>
          <p className="mb-4 opacity-90">
            Our support team is available 24/7 to assist with your transactions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@vaultivas.com"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>support@vaultivas.com</span>
            </a>
            <a
              href="tel:+2347002067"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors"
            >
              <Smartphone className="w-4 h-4" />
              <span>+234 700 2067</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BankingInstructions;