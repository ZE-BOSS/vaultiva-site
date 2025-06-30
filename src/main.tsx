import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import { usePerformanceMonitor } from './hooks/usePerformanceMonitor.ts';
import './index.css';

// Performance monitoring
const AppWithMonitoring = () => {
  usePerformanceMonitor();
  return <App />;
};

// Service Worker Registration
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <AppWithMonitoring />
    </ErrorBoundary>
  </StrictMode>
);