import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Shield, 
  Users, 
  Brain, 
  Star,
  ArrowRight,
  Smartphone,
  Download,
  CreditCard,
  Gift,
  RefreshCw,
  Lock,
  UserCheck,
  Award
} from 'lucide-react';
import HomeIMG from '../assets/home.avif';
import SplitBills from '../assets/splitbills.avif';
import AiInsight from '../assets/aiinsight.avif';

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
      <section ref={heroRef} className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white overflow-hidden min-h-screen flex items-center">
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
                  YOUR{' '}
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
                    VAULT
                  </span>
                  {' '}FOR PAYMENT
                  <span className="text-3xl md:text-4xl lg:text-5xl"> & TRUST</span>
                </h1>
                
                <p className="text-xl md:text-xl text-blue-100 leading-relaxed max-w-2xl">
                  Manage your bills, split costs with friends, set up auto-refills, 
                  and enjoy peace of mind with secure escrow payments
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-5">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-8 py-2 text-md font-semibold text-blue-600 bg-white rounded-2xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-4" />
                </Link>
                
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-8 py-4 text-md font-semibold text-white border-2 border-white/30 rounded-2xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                >
                  Login
                </Link>
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
      <section ref={featuresRef} className="py-20 bg-white dark:bg-gray-900">
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
      <section className="py-20 bg-gray-900 text-white">
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
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Multiple Wallet System
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Switch between personal, group, or business wallets — no mix-ups, no stress. 
              Keep your bills organized, your squad contributions separate, and your budget on point.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="flex justify-center items-center space-x-8 mb-8">
              <button className="w-12 h-12 border border-gray-600 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>
              <button className="w-12 h-12 border border-gray-600 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative max-w-sm mx-auto">
              <img
                src={AiInsight}
                alt="Multiple Wallet System"
                className="rounded-3xl shadow-2xl w-full"
                loading="lazy"
              />
              
              {/* Floating Wallet Cards */}
              <div className="absolute -left-20 top-1/2 transform -translate-y-1/2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-4 w-48 shadow-xl">
                  <div className="text-sm opacity-80 mb-1">Escrow balance</div>
                  <div className="text-2xl font-bold">₦300,600.00</div>
                </div>
              </div>
              
              <div className="absolute -right-20 top-1/2 transform -translate-y-1/2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-4 w-48 shadow-xl">
                  <div className="text-sm opacity-80 mb-1">Active balance</div>
                  <div className="text-2xl font-bold">****</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={howItWorksRef} className="py-20 bg-gray-50 dark:bg-gray-800">
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

      {/* Testimonial Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-2xl md:text-3xl font-medium mb-8 leading-relaxed">
                "The escrow feature is a game-changer. It's exactly what we need and gives us peace of mind. Highly recommend!"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-4">
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
                  alt="Sarah A."
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                  loading="lazy"
                />
                <div className="text-left">
                  <div className="font-semibold text-lg">Sarah A.</div>
                  <div className="text-blue-200">Verified User</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Secure Your Bills,{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Empower Your Wallet
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Pay bills, split costs, and run escrow transactions seamlessly. 
                AutoSmart Refill and AI Spending Insights keep you in control.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-6 py-3 bg-black rounded-xl hover:bg-gray-800 transition-colors"
                  aria-label="Download on Google Play"
                >
                  <Download className="w-6 h-6 mr-3" />
                  <div className="text-left">
                    <div className="text-xs text-gray-400">GET IT ON</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </a>
                
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-6 py-3 bg-black rounded-xl hover:bg-gray-800 transition-colors"
                  aria-label="Download on App Store"
                >
                  <Smartphone className="w-6 h-6 mr-3" />
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </a>
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
                src="https://images.pexels.com/photos/5717456/pexels-photo-5717456.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&dpr=2"
                alt="Vaultivas Mobile App"
                className="rounded-3xl shadow-2xl w-full max-w-md mx-auto"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900 text-white">
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
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                  V
                </div>
                <span className="text-xl font-bold">Vaultivas</span>
              </div>
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