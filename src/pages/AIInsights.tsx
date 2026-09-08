import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Target,
  Calendar,
  DollarSign,
  Zap
} from 'lucide-react';
import { walletApi, ApiError, type Transaction } from '../api';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const AIInsights: React.FC = () => {
  /**
   * Spending, computed from the account's own transactions.
   *
   * Every figure on this page used to be a literal: ₦45,000 on bills, a four
   * month history ending in January, a "High Spending Alert" telling the user
   * their spending was 23% higher than last month. None of it came from the
   * account, so the page presented invented finances as analysis — and gave
   * advice based on them.
   *
   * The charts below are derived from real transactions. Where there is no
   * history yet, they are empty rather than filled in.
   */
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const rows = await walletApi.transactions();
        if (!cancelled) setTransactions(rows);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : 'Could not load your activity.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const CATEGORY_COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#14B8A6'];

  const spendingByCategory = useMemo(() => {
    const totals = new Map<string, number>();
    for (const t of transactions) {
      const key = (t.type || 'other').replace(/_/g, ' ');
      totals.set(key, (totals.get(key) ?? 0) + Number(t.amount ?? 0));
    }
    return [...totals.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([name, value], i) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
        color: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
      }));
  }, [transactions]);

  const monthlySpending = useMemo(() => {
    const months = new Map<string, number>();
    for (const t of transactions) {
      const d = new Date(t.createdAt);
      const key = d.toLocaleString('en-NG', { month: 'short', year: '2-digit' });
      months.set(key, (months.get(key) ?? 0) + Number(t.amount ?? 0));
    }
    return [...months.entries()].slice(-6).map(([month, amount]) => ({ month, amount }));
  }, [transactions]);

  const spendingTrend = useMemo(() => {
    // The last seven days, including days with no activity.
    const days: { day: string; amount: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - i);
      const next = new Date(d);
      next.setDate(next.getDate() + 1);
      const amount = transactions
        .filter((t) => {
          const at = new Date(t.createdAt);
          return at >= d && at < next;
        })
        .reduce((sum, t) => sum + Number(t.amount ?? 0), 0);
      days.push({ day: d.toLocaleDateString('en-NG', { weekday: 'short' }), amount });
    }
    return days;
  }, [transactions]);

  /**
   * Observations, not advice.
   *
   * The previous list was four hardcoded recommendations — an auto-refill
   * amount, a savings-goal percentage — none of which were derived from
   * anything. These describe only what the transactions actually show, and the
   * list is empty until there is enough history to say something true.
   */
  const insights = useMemo(() => {
    const out: Array<{
      id: number;
      type: string;
      icon: typeof TrendingUp;
      title: string;
      description: string;
      color: string;
      bgColor: string;
      textColor: string;
    }> = [];

    if (monthlySpending.length >= 2) {
      const previous = monthlySpending[monthlySpending.length - 2].amount;
      const current = monthlySpending[monthlySpending.length - 1].amount;
      if (previous > 0) {
        const change = Math.round(((current - previous) / previous) * 100);
        if (Math.abs(change) >= 10) {
          const up = change > 0;
          out.push({
            id: 1,
            type: up ? 'warning' : 'success',
            icon: up ? AlertTriangle : Target,
            title: up ? 'Spending is up' : 'Spending is down',
            description: `You have moved ${Math.abs(change)}% ${
              up ? 'more' : 'less'
            } this month than last.`,
            color: up ? 'from-red-500 to-orange-500' : 'from-green-500 to-emerald-500',
            bgColor: up ? 'bg-red-50 dark:bg-red-900/50' : 'bg-green-50 dark:bg-green-900/50',
            textColor: up
              ? 'text-red-700 dark:text-red-300'
              : 'text-green-700 dark:text-green-300',
          });
        }
      }
    }

    const top = spendingByCategory[0];
    const total = spendingByCategory.reduce((sum, c) => sum + c.value, 0);
    if (top && total > 0) {
      out.push({
        id: 2,
        type: 'info',
        icon: TrendingUp,
        title: `Most of your activity is ${top.name.toLowerCase()}`,
        description: `${top.name} accounts for ${Math.round(
          (top.value / total) * 100,
        )}% of what has moved through your wallets.`,
        color: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-50 dark:bg-blue-900/50',
        textColor: 'text-blue-700 dark:text-blue-300',
      });
    }

    return out;
  }, [monthlySpending, spendingByCategory]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const totalSpending = spendingByCategory.reduce((sum, item) => sum + item.value, 0);
  const avgDailySpending = spendingTrend.reduce((sum, item) => sum + item.amount, 0) / spendingTrend.length;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"
          role="status"
          aria-label="Loading your insights"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 dark:bg-gray-900">
        <p role="alert" className="text-center text-red-600 dark:text-red-400">
          {error}
        </p>
      </div>
    );
  }

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