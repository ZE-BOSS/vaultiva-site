import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AiInsight from '../assets/aiinsight.avif'; // Make sure path is correct

type Wallet = {
  title: string;
  amount: string;
  gradient: string;
  tag: string;
  type: 'personal' | 'business' | 'escrow' | 'savings' | 'crypto';
  lastUpdated: string;
  currency: string;
  masked?: boolean;
};

const wallets: Wallet[] = [
  {
    title: 'Escrow balance',
    amount: '₦300,600.00',
    gradient: 'from-green-400 to-emerald-500',
    tag: '4Qas0L',
    type: 'escrow',
    lastUpdated: '2025-07-01 09:20 AM',
    currency: '₦',
  },
  {
    title: 'Available balance',
    amount: '₦15,586,000.03',
    gradient: 'from-blue-500 to-sky-600',
    tag: '4Qas0L',
    type: 'personal',
    lastUpdated: '2025-07-01 09:15 AM',
    currency: '₦',
  },
  {
    title: 'Airtime balance',
    amount: '₦0.00',
    gradient: 'from-purple-500 to-fuchsia-500',
    tag: '4Qas0L',
    type: 'personal',
    lastUpdated: '2025-07-01 09:00 AM',
    currency: '₦',
    masked: true,
  },
  {
    title: 'Savings',
    amount: '₦82,000.00',
    gradient: 'from-orange-400 to-yellow-500',
    tag: '4Qas0L',
    type: 'savings',
    lastUpdated: '2025-06-30 06:55 PM',
    currency: '₦',
  },
  {
    title: 'Crypto Wallet',
    amount: '₦1,250,000.00',
    gradient: 'from-gray-700 to-slate-900',
    tag: '4Qas0L',
    type: 'crypto',
    lastUpdated: '2025-07-01 08:40 AM',
    currency: '₦',
  },
];

export default function WalletSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -220 : 220,
        behavior: 'smooth',
      });
    }
  };

  const renderWalletCard = (wallet: Wallet, className = '') => (
    <div
      key={wallet.title}
      className={`bg-gradient-to-br ${wallet.gradient} rounded-2xl p-4 w-52 h-44 shadow-2xl ${className}`}
    >
      <div className="text-sm opacity-80 mb-1">{wallet.title}</div>
      <div className="text-2xl font-bold mb-1">
        {wallet.masked ? '****' : wallet.amount}
      </div>
      <div className="text-xs text-white/90 mb-1">Tag: {wallet.tag}</div>
      <div className="text-xs text-white/80">Updated: {wallet.lastUpdated}</div>
    </div>
  );

  return (
    <section id="wallets" className="relative py-24 text-white overflow-hidden" style={{ backgroundColor: '#142352' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-200 mb-4">
            Multiple Wallet system
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Switch between personal, group, or business wallets — no mix-ups, no stress.
            Keep your bills organized, your squad contributions separate, and your budget on point.
          </p>
        </motion.div>

        {/* Arrow Navigation */}
        <div className="flex justify-center space-x-6 mb-10">
          <button
            onClick={() => scroll('left')}
            className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center hover:bg-white/10 transition"
          >
            <ArrowRight className="w-5 h-5 rotate-180 text-white" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center hover:bg-white/10 transition"
          >
            <ArrowRight className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Phone Mockup + Floating Cards */}
        <div className="relative mt-20 flex justify-center items-center gap-6">
          {/* Left Floating Cards */}
          {wallets.slice(0, 2).map((wallet) => (
            <div key={wallet.title} className="hidden md:block">
              {renderWalletCard(wallet, 'blur-sm opacity-60')}
            </div>
          ))}

          {/* Center Phone */}
          <img
            src={AiInsight}
            alt="Wallet UI"
            className="rounded-[2.5rem] shadow-2xl border-4 border-blue-500/20 w-full max-w-xs z-10"
          />

          {/* Right Floating Cards */}
          {wallets.slice(2, 4).map((wallet) => (
            <div key={wallet.title} className="hidden md:block">
              {renderWalletCard(wallet, 'blur-sm opacity-60')}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
