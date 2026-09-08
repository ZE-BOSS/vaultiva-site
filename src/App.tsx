import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { WalletProvider } from './contexts/WalletContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Wallets from './pages/Wallets';
import BillPayment from './pages/BillPayment';
import BillSplitting from './pages/BillSplitting';
import Escrow from './pages/Escrow';
import AIInsights from './pages/AIInsights';
import Profile from './pages/Profile';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';
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
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                    <Route path="/refund-policy" element={<RefundPolicy />} />
                    <Route path="/banking-instructions" element={<BankingInstructions />} />
                    <Route path="/" element={<Layout />}>
                      <Route index element={<Home />} />
                      <Route path="dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
                      <Route path="wallets" element={<RequireAuth><Wallets /></RequireAuth>} />
                      <Route path="bills" element={<RequireAuth><BillPayment /></RequireAuth>} />
                      <Route path="split" element={<RequireAuth><BillSplitting /></RequireAuth>} />
                      <Route path="escrow" element={<RequireAuth><Escrow /></RequireAuth>} />
                      <Route path="insights" element={<RequireAuth><AIInsights /></RequireAuth>} />
                      <Route path="profile" element={<RequireAuth><Profile /></RequireAuth>} />
                    </Route>
                    {/* Anything else rendered a blank page before this. */}
                    <Route path="*" element={<NotFound />} />
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