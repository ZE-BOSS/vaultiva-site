import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, AlertTriangle, Mail } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-8">
      <SEOHead 
        title="Vaultiva Terms of Use and Privacy Policy"
        description="Read Vaultiva's terms of use and privacy policy. Understand your rights and responsibilities when using our fintech services."
        url="https://vaultivas.com/terms-and-conditions"
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Vaultiva Terms of Use and Privacy Policy
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Your agreement with Vaultiva and how we protect your privacy
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Terms of Use Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">TERMS OF USE</h2>
            </div>
            
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
              <p className="text-blue-800 dark:text-blue-200">
                <strong>Effective Date:</strong> [Insert Date]
              </p>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
              <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Your Agreement</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  By registering or using Vaultivas, you agree to comply with these Terms, our Privacy Policy, and all applicable laws.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">User Eligibility</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  You must be at least 18 years old and legally able to enter into contracts.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Services Provided</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Vaultivas enables users to:
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Pay bills
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Use smart escrow services
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Transfer money
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Split bills
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Schedule auto-payments
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Earn rewards
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Manage wallets
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Account Security</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  You are responsible for all actions taken via your account.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Fees & Charges</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Applicable transaction fees are shown before payment.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                  Prohibited Use
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  No illegal, fraudulent, or unauthorized use allowed.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Limitation of Liability</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Vaultivas is not liable for losses from third-party providers or misuse.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Termination</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We may suspend or terminate accounts violating these terms.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Updates</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We may update these terms and will notify users.
                </p>
              </section>

              <section className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-3 flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact
                </h3>
                <p className="text-blue-800 dark:text-blue-200">
                  Email: <a href="mailto:vaultivatech@gmail.com" className="text-blue-600 hover:text-blue-700">vaultivatech@gmail.com</a>
                </p>
              </section>
            </div>
          </motion.div>

          {/* Privacy Policy Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">PRIVACY POLICY</h2>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
              <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Information We Collect</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Personal details, transaction history, device info, biometric data.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">How We Use Data</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  To process transactions, personalize experience, enhance security, and meet legal requirements.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Data Sharing</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We do not sell your data. We may share it with regulators, partners, and analytics services.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Data Protection</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Your information is encrypted and securely stored.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Your Choices</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  You can manage, update, or delete your data anytime.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Cookies & Tracking</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Used to improve user experience.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Changes to Policy</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We may update this Privacy Policy and inform users.
                </p>
              </section>

              <section className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
                <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-3 flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact
                </h3>
                <p className="text-green-800 dark:text-green-200">
                  Email: <a href="mailto:privacy@vaultivas.com" className="text-green-600 hover:text-green-700">privacy@vaultivas.com</a>
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;