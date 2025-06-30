import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Wallet, 
  CreditCard, 
  Users, 
  Shield, 
  TrendingUp 
} from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Home' },
    { path: '/wallets', icon: Wallet, label: 'Wallets' },
    { path: '/bills', icon: CreditCard, label: 'Bills' },
    { path: '/split', icon: Users, label: 'Split' },
    { path: '/escrow', icon: Shield, label: 'Escrow' },
    { path: '/insights', icon: TrendingUp, label: 'Insights' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 md:hidden">
      <div className="grid grid-cols-6 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;