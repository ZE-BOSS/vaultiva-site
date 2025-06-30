import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Lightbulb,
  Target,
  Calendar,
  DollarSign,
  Zap
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useWallet } from '../contexts/WalletContext';

const AIInsights: React.FC = () => {
  const { transactions, wallets } = useWallet();

  // Mock AI insights data
  const spendingByCategory = [
    { name: 'Bills', value: 45000, color: '#3B82F6' },
    { name: 'Split', value: 25000, color: '#10B981' },
    { name: 'Escrow', value: 100000, color: '#8B5CF6' },
    { name: 'Transfer', value: 15000, color: '#F59E0B' }
  ];

  const monthlySpending = [
    { month: 'Oct', amount: 120000 },
    { month: 'Nov', amount: 95000 },
    { month: 'Dec', amount: 140000 },
    { month: 'Jan', amount: 185000 }
  ];

  const spendingTrend = [
    { day: 'Mon', amount: 15000 },
    { day: 'Tue', amount: 8000 },
    { day: 'Wed', amount: 25000 },
    { day: 'Thu', amount: 12000 },
    { day: 'Fri', amount: 35000 },
    { day: 'Sat', amount: 20000 },
    { day: 'Sun', amount: 5000 }
  ];

  const insights = [
    {
      id: 1,
      type: 'warning',
      icon: AlertTriangle,
      title: 'High Spending Alert',
      description: 'Your spending this month is 23% higher than last month. Consider reviewing your expenses.',
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-50 dark:bg-red-900/50',
      textColor: 'text-red-700 dark:text-red-300'
    },
    {
      id: 2,
      type: 'tip',
      icon: Lightbulb,
      title: 'Auto-Refill Recommendation',
      description: 'Based on your airtime usage, we recommend setting up auto-refill for ₦5,000 weekly.',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/50',
      textColor: 'text-yellow-700 dark:text-yellow-300'
    },
    {
      id: 3,
      type: 'success',
      icon: Target,
      title: 'Savings Goal Progress',
      description: 'Great job! You\'re 67% towards your monthly savings goal. Keep it up!',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/50',
      textColor: 'text-green-700 dark:text-green-300'
    },
    {
      id: 4,
      type: 'info',
      icon: TrendingUp,
      title: 'Bill Payment Pattern',
      description: 'You typically spend more on bills during the first week of the month. Plan accordingly.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/50',
      textColor: 'text-blue-700 dark:text-blue-300'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const totalSpending = spendingByCategory.reduce((sum, item) => sum + item.value, 0);
  const avgDailySpending = spendingTrend.reduce((sum, item) => sum + item.amount, 0) / spendingTrend.length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                AI Insights
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Smart analytics and personalized recommendations for your spending
              </p>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400 px-2 py-1 rounded-full">
                +12%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(totalSpending)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Spending</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400 px-2 py-1 rounded-full">
                -5%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(avgDailySpending)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Avg Daily Spending</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400 px-2 py-1 rounded-full">
                67%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              ₦67,000
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Savings Goal</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400 px-2 py-1 rounded-full">
                Active
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              3
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Auto-Refills</p>
          </motion.div>
        </div>

        {/* AI Insights Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Personalized Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`${insight.bgColor} rounded-2xl p-6 border border-gray-100 dark:border-gray-700`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${insight.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${insight.textColor} mb-2`}>
                        {insight.title}
                      </h3>
                      <p className={`text-sm ${insight.textColor} opacity-80`}>
                        {insight.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Spending by Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Spending by Category
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendingByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {spendingByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {spendingByCategory.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {item.name}: {formatCurrency(item.value)}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Monthly Spending Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Monthly Spending Trend
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlySpending}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" tickFormatter={(value) => `₦${value / 1000}k`} />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Weekly Spending Pattern */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Weekly Spending Pattern
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={spendingTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="day" stroke="#6B7280" />
                <YAxis stroke="#6B7280" tickFormatter={(value) => `₦${value / 1000}k`} />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#8B5CF6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Auto-Refill Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mt-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Smart Auto-Refill</h3>
              <p className="text-blue-100">AI-powered recommendations based on your usage patterns</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h4 className="font-semibold mb-2">Airtime</h4>
              <p className="text-2xl font-bold mb-1">₦5,000</p>
              <p className="text-sm text-blue-100">Weekly refill recommended</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h4 className="font-semibold mb-2">Data Bundle</h4>
              <p className="text-2xl font-bold mb-1">₦3,000</p>
              <p className="text-sm text-blue-100">Bi-weekly refill recommended</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h4 className="font-semibold mb-2">Electricity</h4>
              <p className="text-2xl font-bold mb-1">₦15,000</p>
              <p className="text-sm text-blue-100">Monthly refill recommended</p>
            </div>
          </div>
          
          <button className="mt-6 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
            Set Up Auto-Refill
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AIInsights;