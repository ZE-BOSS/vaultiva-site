import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { WalletProvider } from './contexts/WalletContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Wallets from './pages/Wallets';
import BillPayment from './pages/BillPayment';
import BillSplitting from './pages/BillSplitting';
import Escrow from './pages/Escrow';
import AIInsights from './pages/AIInsights';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import RefundPolicy from './pages/RefundPolicy';
import BankingInstructions from './pages/BankingInstructions';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <WalletProvider>
            <NotificationProvider>
              <Router>
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                    <Route path="/refund-policy" element={<RefundPolicy />} />
                    <Route path="/banking-instructions" element={<BankingInstructions />} />
                    <Route path="/" element={<Layout />}>
                      <Route index element={<Home />} />
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="wallets" element={<Wallets />} />
                      <Route path="bills" element={<BillPayment />} />
                      <Route path="split" element={<BillSplitting />} />
                      <Route path="escrow" element={<Escrow />} />
                      <Route path="insights" element={<AIInsights />} />
                      <Route path="profile" element={<Profile />} />
                    </Route>
                  </Routes>
                </div>
              </Router>
            </NotificationProvider>
          </WalletProvider>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;