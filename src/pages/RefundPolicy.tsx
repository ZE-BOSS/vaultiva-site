import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Clock, Shield, AlertTriangle, Mail, Phone } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const RefundPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-8">
      <SEOHead 
        title="Vaultiva Refund Policy"
        description="Learn about Vaultiva's refund policy for bill payments, escrow transactions, and wallet funding. Understand your refund rights and process."
        url="https://vaultivas.com/refund-policy"
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
              <RefreshCw className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Vaultiva Refund Policy
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Transparent refund terms for all your transactions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8"
        >
          <div className="mb-8 p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-700">
            <p className="text-orange-800 dark:text-orange-200">
              <strong>Effective Date:</strong> July 16, 2025
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                At Vaultiva Technology Limited ("Vaultiva"), we prioritize user trust and transparency in all financial operations. This Refund Policy outlines the terms under which users may request refunds for transactions completed via our platform, including bill payments, escrow services, and wallet-related transactions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                  <RefreshCw className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                Bill Payment Refunds
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
                  <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-4">Eligible Conditions:</h3>
                  <ul className="space-y-2 text-blue-800 dark:text-blue-200">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Duplicate transaction (billed twice for the same service).
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Failed payment (wallet debited, service not delivered).
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Overpayment (amount debited exceeds the billed amount).
                    </li>
                  </ul>
                </div>
                
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700">
                  <h3 className="text-lg font-bold text-green-900 dark:text-green-100 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Processing Timeline:
                  </h3>
                  <p className="text-green-800 dark:text-green-200">
                    Refunds will be processed within 3–7 business days after confirmation from service providers.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                  <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                Escrow Transactions
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-700">
                  <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100 mb-4">Eligible Conditions:</h3>
                  <ul className="space-y-2 text-purple-800 dark:text-purple-200">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Dispute resolution rules mandate refund.
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Counterparty cancels agreement before fund release.
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Vaultiva confirms non-fulfillment of conditions.
                    </li>
                  </ul>
                </div>
                
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700">
                  <h3 className="text-lg font-bold text-green-900 dark:text-green-100 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Processing Timeline:
                  </h3>
                  <p className="text-green-800 dark:text-green-200">
                    Refunds processed within 5–10 business days depending on resolution outcome.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-3">
                  <RefreshCw className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                Wallet & Funding Refunds
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-700">
                  <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-100 mb-4">Eligible Conditions:</h3>
                  <ul className="space-y-2 text-indigo-800 dark:text-indigo-200">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Wallet funded but balance not updated.
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Erroneous user deposit.
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Unauthorized funding reported within 24 hours.
                    </li>
                  </ul>
                </div>
                
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700">
                  <h3 className="text-lg font-bold text-green-900 dark:text-green-100 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Processing Timeline:
                  </h3>
                  <p className="text-green-800 dark:text-green-200">
                    3–5 business days after verification.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Refund Method</h2>
              <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <p className="text-gray-700 dark:text-gray-300">
                  Refunds will be made to the original payment method: bank account, card, or Vaultiva wallet credit (if preferred by user).
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 text-red-600" />
                Non-Refundable Transactions
              </h2>
              <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-700">
                <ul className="space-y-2 text-red-800 dark:text-red-200">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Fully confirmed or rendered services.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Airtime, internet, or TV recharges.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Digital or crypto assets.
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">How to Request a Refund</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
                  <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-4">Contact us via:</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <a href="mailto:vaultivatech@gmail.com" className="text-blue-600 hover:text-blue-700">
                        vaultivatech@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">💬</span>
                      </div>
                      <span className="text-blue-800 dark:text-blue-200">In-app Chat: Settings → Help → Refund Request</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700">
                  <h3 className="text-lg font-bold text-green-900 dark:text-green-100 mb-4">Include:</h3>
                  <ul className="space-y-2 text-green-800 dark:text-green-200">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Transaction ID
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Date
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Amount
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Reason
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 text-yellow-600" />
                Fraud or Abuse
              </h2>
              <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-700">
                <p className="text-yellow-800 dark:text-yellow-200">
                  Vaultiva reserves the right to decline any refund request that appears fraudulent or abusive.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Signed,</h2>
                <p className="text-xl">Management</p>
                <p className="text-lg opacity-90">Vaultiva Technology Limited</p>
              </div>
              
              <div className="border-t border-white/20 pt-6">
                <h3 className="text-lg font-bold mb-4">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5" />
                      <a href="mailto:vaultivatech@gmail.com" className="text-orange-200 hover:text-white">
                        vaultivatech@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-orange-100">
                      <strong>Address:</strong> 10A, Balogun Street, Lekki-Epe Express Way
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RefundPolicy;