import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from './Navbar';
import BottomNavigation from './BottomNavigation';

const Layout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  if (!isAuthenticated) {
    return <Outlet />;
  }

  const showBottomNav = location.pathname !== '/';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className={`${showBottomNav ? 'pb-20' : ''}`}>
        <Outlet />
      </main>
      {showBottomNav && <BottomNavigation />}
    </div>
  );
};

export default Layout;