import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Award,
  ClipboardIcon,
  Lock,
  ReceiptIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserCheck,
  UsersIcon,
  WalletIcon,
} from 'lucide-react';
import HomeIMG from '../assets/home.avif';
import SplitBills from '../assets/splitbills.avif';
import Logo from '../assets/logo.avif';
import WalletSection from '../components/WalletSection';

const Home: React.FC = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [howItWorksRef, howItWorksInView] = useInView({ threshold: 0.1, triggerOnce: true });

  /**
   * Every service we actually offer, each linking to the page that provides it.
   *
   * Smart Escrow was commented out and Bill Payments was absent entirely, so the
   * two headline features were invisible on the marketing page. The cards were
   * also inert — no link — so a visitor had no route from "this looks useful" to
   * using it. `to` now drives a real link; RequireAuth sends a signed-out
   * visitor to /login and returns them here afterwards.
   */
  const features = [
    {
      title: "Bill Payments",
      description: "Airtime, data, electricity and TV — paid in seconds from any wallet.",
      icon: ReceiptIcon,
      to: "/bills",
      gradient: "from-white to-[#bae6fd] dark:from-gray-900 dark:to-sky-900",
      iconColor: "bg-sky-400 dark:bg-sky-600"
    },
    {
      title: "Smart Escrow",
      description: "Hold funds securely until all parties meet their obligations.",
      icon: ShieldCheckIcon,
      to: "/escrow",
      gradient: "from-white to-[#fecaca] dark:from-gray-900 dark:to-red-900",
      iconColor: "bg-red-400 dark:bg-red-600"
    },
    {
      title: "Split Payments",
      description: "Easily split bills between friends and track contributions.",
      icon: UsersIcon,
      to: "/split",
      gradient: "from-white to-[#bfdbfe] dark:from-gray-900 dark:to-blue-900",
      iconColor: "bg-blue-400 dark:bg-blue-600"
    },
    {
      title: "Multi-Wallets",
      description: "Organize your finances across different goals and wallets.",
      icon: WalletIcon,
      to: "/wallets",
      gradient: "from-white to-[#fed7aa] dark:from-gray-900 dark:to-orange-900",
      iconColor: "bg-orange-400 dark:bg-orange-600"
    },
    {
      title: "AI Insights",
      description: "See where your money goes, with recommendations that adapt to you.",
      icon: SparklesIcon,
      to: "/insights",
      gradient: "from-white to-[#e9d5ff] dark:from-gray-900 dark:to-purple-900",
      iconColor: "bg-purple-400 dark:bg-purple-600"
    },
    {
      title: "Activity Logs",
      description: "Track every transaction with detailed logs and filters.",
      icon: ClipboardIcon,
      to: "/dashboard",
      gradient: "from-white to-[#fef9c3] dark:from-gray-900 dark:to-yellow-900",
      iconColor: "bg-yellow-400 dark:bg-yellow-600"
    },
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

  /**
   * These were '500K+ Active Users', '₦50B+ Transactions Processed', '99.9%
   * Uptime' and '24/7 Customer Support'. None of it was true — the product has
   * not launched. Publishing invented volume figures on a financial services
   * site is a consumer-protection problem in its own right, and on a domain
   * registered days ago it reads to Google Safe Browsing's classifier exactly
   * like a scam, which is the likeliest reason the site was flagged
   * "Dangerous". Replaced with capabilities that are actually shipped.
   */
  const stats = [
    { number: 'Escrow', label: 'Funds held until both sides confirm' },
    { number: 'Split', label: 'Share a bill with friends' },
    { number: 'Auto-refill', label: 'Never miss a recurring payment' },
    { number: 'Multi-wallet', label: 'A wallet for each purpose' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id={'home'} ref={heroRef} className="relative pt-32 md:pt-10 text-white overflow-hidden min-h-screen flex items-center" style={{ background: 'linear-gradient(0deg, #cfe6ff -21%, #002a7d)' }}>
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
                <span
                  aria-disabled="true"
                  title="Coming soon to the App Store"
                  className="inline-flex items-center px-4 py-2 rounded-lg shadow-md border cursor-default opacity-70
                            bg-white text-black border-gray-200
                            dark:bg-black dark:text-white dark:border-white/20"
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
                    <span className="block text-gray-600 text-xs dark:text-white/60">Coming soon to the</span>
                    <span className="font-semibold">App Store</span>
                  </div>
                </span>

                {/* Google Play Button */}
                <span
                  aria-disabled="true"
                  title="Coming soon to Google Play"
                  className="inline-flex items-center px-4 py-2 rounded-lg shadow-md border cursor-default opacity-70
                            bg-white text-black border-gray-200
                            dark:bg-black dark:text-white dark:border-white/20"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Google_Play_Arrow_logo.svg/512px-Google_Play_Arrow_logo.svg.png"
                    alt="Android"
                    className="w-6 h-6 mr-3"
                  />
                  <div className="text-left leading-tight text-sm">
                    <span className="block text-gray-600 text-xs dark:text-white/60">COMING SOON TO</span>
                    <span className="font-semibold">Google Play</span>
                  </div>
                </span>
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
                    <div className="text-xl md:text-2xl font-bold text-cyan-300">
                      {stat.number}
                    </div>
                    <div className="text-xs md:text-sm text-blue-200">
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
      <section
        id="features"
        ref={featuresRef}
        className="py-24 bg-[#f9fbff] dark:bg-[#0f172a]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1e3a8a] dark:text-[#cfe6ff] mb-4">
              Why Choose <span className="text-sky-600">Vaultiva</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Smart finance made simple. Enjoy seamless escrow, bill split, and secure wallet services all in one place.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const gradient = feature.gradient; // Example: "from-white to-[#fef9c3]"
              const iconBg = feature.iconColor; // Example: "bg-sky-300" or "bg-green-200"
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link
                    to={feature.to}
                    aria-label={`${feature.title} — ${feature.description}`}
                    className={`block rounded-3xl p-8 bg-gradient-to-br ${gradient} shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-[#e5e7eb] dark:border-[#1f2b46] h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                  >
                    <div className={`w-16 h-16 ${iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-xl font-semibold text-[#1e3a8a] dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Split Bills Section */}
      <section id={'splittingbills'} className="py-20 text-white" style={{ backgroundColor: '#142352' }}>
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
      <section id={'FAQs'} className="py-20 bg-[#142352] text-white">
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
            <details className="bg-[#142352] rounded-2xl p-6 border border-gray-700">
              <summary className="font-semibold text-lg cursor-pointer hover:text-blue-400 transition-colors">
                What is Vaultivas?
              </summary>
              <p className="mt-4 text-gray-300 leading-relaxed">
                Vaultivas is a comprehensive fintech platform that allows you to pay bills, split expenses with friends, 
                set up secure escrow transactions, and manage multiple wallets with AI-powered insights.
              </p>
            </details>
            
            {/* <details className="bg-[#142352] rounded-2xl p-6 border border-gray-700">
              <summary className="font-semibold text-lg cursor-pointer hover:text-blue-400 transition-colors">
                How does the escrow system work?
              </summary>
              <p className="mt-4 text-gray-300 leading-relaxed">
                Our escrow system holds funds securely until both parties fulfill their obligations. 
                Money is only released when the buyer confirms receipt of goods or services, ensuring protection for both parties.
              </p>
            </details> */}
            
            <details className="bg-[#142352] rounded-2xl p-6 border border-gray-700">
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
      <footer className="bg-[#142352] text-white py-16 border-t border-[#142352">
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
                <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-and-conditions" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/refund-policy" className="text-gray-400 hover:text-white transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-and-conditions" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/refund-policy" className="text-gray-400 hover:text-white transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Vaultivas. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;