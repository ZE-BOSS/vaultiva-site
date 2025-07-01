import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Shield, 
  Users, 
  Brain, 
  CreditCard,
  Gift,
  RefreshCw,
  Lock,
  UserCheck,
  Award
} from 'lucide-react';
import HomeIMG from '../assets/home.avif';
import SplitBills from '../assets/splitbills.avif';
import Logo from '../assets/logo.avif';
import WalletSection from '../components/WalletSection';

const Home: React.FC = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [howItWorksRef, howItWorksInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const features = [
    {
      icon: RefreshCw,
      title: 'Auto Refill',
      description: 'Never run out again. Set your bills to auto-refill and we\'ll top up your essentials automatically — no reminders needed.',
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20'
    },
    {
      icon: Shield,
      title: 'Escrow Payment',
      description: 'Protect your money with smart escrow. Funds are only released when both sides are satisfied. Peace of mind built in.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'
    },
    {
      icon: CreditCard,
      title: 'Bill Payment',
      description: 'Pay electricity, airtime, internet, and TV subscriptions in seconds — fast, secure, and always available.',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
    },
    {
      icon: Gift,
      title: 'Rewards',
      description: 'Get rewarded for paying your bills. Earn points and unlock rewards every time you top up.',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
    },
    {
      icon: Users,
      title: 'Bill Splitting',
      description: 'Split bills with friends, roommates, or family. Everyone pays their fair share without the hassle.',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20'
    },
    {
      icon: Brain,
      title: 'AI Insights',
      description: 'Know your spending habits. Get smart tips and predictions. Your money, your control.',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20'
    }
  ];

  const steps = [
    {
      icon: UserCheck,
      title: 'Sign Up',
      description: 'Create your account in minutes with secure verification and start managing your finances immediately.',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Lock,
      title: 'Pay Bills & Set Escrow',
      description: 'Pay your bills instantly or set up secure escrow transactions for safe online purchases and services.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Award,
      title: 'Relax & Earn',
      description: 'Enjoy automated payments, earn rewards, and get AI insights while we handle the rest.',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const stats = [
    { number: '500K+', label: 'Active Users' },
    { number: '₦50B+', label: 'Transactions Processed' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Customer Support' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id={'home'} ref={heroRef} className="relative pt-32 md:pt-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400/30 to-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/30 to-pink-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-4 lg:px-8 px-4 sm:px-6"
            >
              <div className="space-y-6">
                <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  SECURE YOUR{' '}
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-300 bg-clip-text text-transparent">
                    BILLS
                  </span>
                  {' '}EMPOWER YOUR
                  <span className="text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent"> WALLET</span>
                </h1>
                
                <p className="text-xl md:text-xl text-blue-100 leading-relaxed max-w-2xl">
                  Manage your bills, split costs with friends, set up auto-refills, 
                  and enjoy peace of mind with secure escrow payments
                </p>
              </div>
              
              {/* Download Buttons */}
              <div className="flex flex-row gap-4 pt-4">
                {/* App Store Button */}
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 rounded-lg shadow-md border transition-all duration-300
                            bg-white text-black border-gray-200 hover:bg-gray-100
                            dark:bg-black dark:text-white dark:border-white/20 dark:hover:bg-gray-900"
                >
                  <img
                    src="data:image/png;base64,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"
                    alt="iOS"
                    className="w-6 h-6 mr-3 dark:hidden"
                  />
                  <img
                    src="data:image/png;base64,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"
                    alt="iOS (Dark)"
                    className="w-6 h-6 mr-3 hidden dark:block"
                  />
                  <div className="text-left leading-tight text-sm">
                    <span className="block text-gray-600 text-xs dark:text-white/60">Download on the</span>
                    <span className="font-semibold">App Store</span>
                  </div>
                </a>

                {/* Google Play Button */}
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 rounded-lg shadow-md border transition-all duration-300
                            bg-white text-black border-gray-200 hover:bg-gray-100
                            dark:bg-black dark:text-white dark:border-white/20 dark:hover:bg-gray-900"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Google_Play_Arrow_logo.svg/512px-Google_Play_Arrow_logo.svg.png"
                    alt="Android"
                    className="w-6 h-6 mr-3"
                  />
                  <div className="text-left leading-tight text-sm">
                    <span className="block text-gray-600 text-xs dark:text-white/60">GET IT ON</span>
                    <span className="font-semibold">Google Play</span>
                  </div>
                </a>
              </div>


              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-5">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-cyan-300">
                      {stat.number}
                    </div>
                    <div className="text-sm text-blue-200">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src={HomeIMG}
                  alt="Vaultivas Mobile App Interface"
                  className="transform transition-transform duration-500 w-full min-h-full mx-auto"
                  loading="eager"
                />
              </div>
              
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id={'features'} ref={featuresRef} className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose <span className="text-blue-600">Vaultivas</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience the future of financial management with our comprehensive suite of tools designed for modern living.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className={`${feature.bgColor} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 h-full`}>
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Split Bills Section */}
      <section id={'splittingbills'} className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              <span className="text-blue-400">Split Bills</span> With Friends
              <br />
              Easy and Convenient
            </motion.h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                      01
                    </div>
                    <h4 className="font-semibold">Monitor friends</h4>
                  </div>
                  <p className="text-gray-400 text-sm">Payment even offline</p>
                </div>
                
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                      02
                    </div>
                    <h4 className="font-semibold">Instant notification</h4>
                  </div>
                  <p className="text-gray-400 text-sm">on all transactions</p>
                </div>
                
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                      03
                    </div>
                    <h4 className="font-semibold">USSD for transactions</h4>
                  </div>
                  <p className="text-gray-400 text-sm">on the go.</p>
                </div>
                
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-sm font-bold">
                      04
                    </div>
                    <h4 className="font-semibold">AI insight monitors</h4>
                  </div>
                  <p className="text-gray-400 text-sm">your spend habit and provide Advices</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={SplitBills}
                alt="Split Bills Mobile Interface"
                className="w-full max-w-md mx-auto"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Multiple Wallet System */}
      <WalletSection />

      {/* How It Works Section */}
      <section id={'how-it-works'} ref={howItWorksRef} className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Get started in three simple steps
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center relative"
                >
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-600 transform -translate-x-1/2 z-0"></div>
                  )}
                  
                  <div className="relative z-10">
                    <div className={`w-24 h-24 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 max-w-xs mx-auto">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id={'FAQs'} className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">FAQs</h2>
            <p className="text-xl text-gray-300">Frequently Asked Questions</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <details className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <summary className="font-semibold text-lg cursor-pointer hover:text-blue-400 transition-colors">
                What is Vaultivas?
              </summary>
              <p className="mt-4 text-gray-300 leading-relaxed">
                Vaultivas is a comprehensive fintech platform that allows you to pay bills, split expenses with friends, 
                set up secure escrow transactions, and manage multiple wallets with AI-powered insights.
              </p>
            </details>
            
            <details className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <summary className="font-semibold text-lg cursor-pointer hover:text-blue-400 transition-colors">
                How does the escrow system work?
              </summary>
              <p className="mt-4 text-gray-300 leading-relaxed">
                Our escrow system holds funds securely until both parties fulfill their obligations. 
                Money is only released when the buyer confirms receipt of goods or services, ensuring protection for both parties.
              </p>
            </details>
            
            <details className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <summary className="font-semibold text-lg cursor-pointer hover:text-blue-400 transition-colors">
                Is my money safe with Vaultivas?
              </summary>
              <p className="mt-4 text-gray-300 leading-relaxed">
                Yes, we use bank-level security with 256-bit encryption, two-factor authentication, 
                and are fully licensed and regulated by relevant financial authorities.
              </p>
            </details>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className=''>
              <Link to="/" className="flex items-center space-x-2 group mb-5">
                <motion.img 
                  src={Logo}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="w-10 h-12  flex items-center justify-center text-white font-bold"
                />
                <div>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-600 transition-colors">
                    Vaultiva {'\n'} 
                  </p>
                  <p className="text-xs text-gray-600 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">
                    Your vault for payment & trust
                  </p>
                </div>
              </Link>
              <p className="text-gray-400 mb-4">
                Your trusted partner for secure payments, bill management, and financial control.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/bills" className="text-gray-400 hover:text-white transition-colors">Pay Bills</Link></li>
                <li><Link to="/split" className="text-gray-400 hover:text-white transition-colors">Split Bills</Link></li>
                <li><Link to="/escrow" className="text-gray-400 hover:text-white transition-colors">Escrow</Link></li>
                <li><Link to="/insights" className="text-gray-400 hover:text-white transition-colors">AI Insights</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Vaultivas. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;