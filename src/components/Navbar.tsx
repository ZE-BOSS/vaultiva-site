import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { Bell, Moon, Sun, User, LogOut, Menu, X, Home, Briefcase, LayoutGrid, Wallet, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import Logo from '../assets/logo.avif';
import LanguageSelector from './LanguageSelector';

const languages = [
  { code: 'en', label: 'English', flag: 'https://flagcdn.com/us.svg' },
  { code: 'fr', label: 'Français', flag: 'https://flagcdn.com/fr.svg' },
  { code: 'es', label: 'Español', flag: 'https://flagcdn.com/es.svg' }
];

const Navbar: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const { unreadCount } = useNotifications();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only trigger after some scroll threshold
      if (Math.abs(currentScrollY - lastScrollY) < 5) return;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false); // Scrolling down
      } else {
        setShowNavbar(true); // Scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
  };

  const navItems = [
    { to: 'home', label: 'Home', icon: Home },
    { to: 'features', label: 'Services', icon: Briefcase },
    { to: 'splittingbills', label: 'Bill Splitting', icon: LayoutGrid },
    { to: 'wallets', label: 'Wallet', icon: Wallet },
    { to: 'how-it-works', label: 'How It Works', icon: HelpCircle },
    { to: 'FAQs', label: 'FAQs', icon: HelpCircle },
  ];

  const authenticatedNavItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/wallets', label: 'Wallets' },
    { path: '/bills', label: 'Pay Bills' },
    { path: '/insights', label: 'AI Insights' }
  ];

  if (!isAuthenticated) {
    return (
      <motion.nav 
        initial={{ y: 0 }}
        animate={{ y: showNavbar ? 0 : -100, opacity: showNavbar ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 left-0 py-[0.5rem] right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <div className="max-w-[90rem] mx-auto px-4 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <RouterLink to="/" className="flex items-center space-x-2 group">
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
            </RouterLink>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                return (
                  <ScrollLink
                    key={item.to}
                    to={item.to}
                    smooth={true}
                    duration={500}
                    offset={-80} // Adjust if your navbar is fixed height
                    spy={true}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-300 ${
                      location.hash === `#${item.to}`
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50'
                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    <span>{item.label}</span>
                  </ScrollLink>
                );
              })}
            </div>
            
            <div className="flex items-center">
              {/* Language Switch */}
              <LanguageSelector languages={languages} />

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-xl ml-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
                aria-label="Toggle theme"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isDark ? 180 : 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {isDark ? (
                    <Sun className="w-5 h-5 text-yellow-500 group-hover:text-yellow-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                  )}
                </motion.div>
              </motion.button>
              
              {/* Auth Buttons */}
              <RouterLink
                to="/login"
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Sign In
              </RouterLink>
              
              <RouterLink
                to="/register"
                className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started
              </RouterLink>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4"
              >
                <div className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <RouterLink
                        key={item.to}
                        to={item.to}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                          location.pathname === item.to
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </RouterLink>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    );
  }

  return (
    <motion.nav 
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -100, opacity: showNavbar ? 1 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 py-[0.5rem] right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <RouterLink to="/dashboard" className="flex items-center space-x-2 group">
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
          </RouterLink>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {authenticatedNavItems.map((item) => (
              <RouterLink
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {item.label}
              </RouterLink>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              {unreadCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold"
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </motion.span>
              )}
            </motion.button>
            
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-500 group-hover:text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                )}
              </motion.div>
            </motion.button>
            
            {/* User Menu */}
            <div className="relative">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="User menu"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/20"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
                <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {user?.name}
                </span>
              </motion.button>
              
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-12 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2"
                  >
                    <RouterLink
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </RouterLink>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-3 text-sm text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4"
            >
              <div className="space-y-2">
                {authenticatedNavItems.map((item) => (
                  <RouterLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.label}
                  </RouterLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;