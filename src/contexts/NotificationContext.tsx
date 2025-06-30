import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Notification {
  id: string;
  type: 'transaction' | 'account' | 'system' | 'security';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'transaction',
      title: 'Payment Successful',
      message: 'Your airtime purchase of ₦1,000 was successful',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      priority: 'medium'
    },
    {
      id: '2',
      type: 'account',
      title: 'Wallet Balance Low',
      message: 'Your personal wallet balance is below ₦5,000',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
      priority: 'high'
    },
    {
      id: '3',
      type: 'system',
      title: 'Auto-refill Activated',
      message: 'Auto-refill has been set up for your electricity bills',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
      priority: 'low'
    },
    {
      id: '4',
      type: 'security',
      title: 'New Login Detected',
      message: 'A new login was detected from Lagos, Nigeria',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: false,
      priority: 'high'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) { // 20% chance every 30 seconds
        const types: Array<Notification['type']> = ['transaction', 'account', 'system'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        
        const messages = {
          transaction: ['Payment completed successfully', 'Bill payment processed', 'Transfer received'],
          account: ['Balance updated', 'New wallet created', 'Profile updated'],
          system: ['Maintenance scheduled', 'New feature available', 'System update completed']
        };

        addNotification({
          type: randomType,
          title: `${randomType.charAt(0).toUpperCase() + randomType.slice(1)} Update`,
          message: messages[randomType][Math.floor(Math.random() * messages[randomType].length)],
          priority: 'medium'
        });
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      clearAll
    }}>
      {children}
    </NotificationContext.Provider>
  );
};