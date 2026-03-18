import { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  TrendingUp, 
  Calendar,
  Search,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Filter,
  Download,
  Wallet,
  ArrowUpRight,
  ShoppingBag
} from 'lucide-react';
import { StatCard } from './components/StatCard';
import { SpendingChart } from './components/SpendingChart';
import { CategoryDistribution } from './components/CategoryDistribution';
import { CustomerTable } from './components/CustomerTable';
import { getMockTransactions, getMockSpendingTrends, getMockCategoryData, getMockCustomers } from './mockData';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const transactions = useMemo(() => getMockTransactions(), []);
  const spendingTrends = useMemo(() => getMockSpendingTrends(), []);
  const categoryData = useMemo(() => getMockCategoryData(), []);
  const customers = useMemo(() => getMockCustomers(), []);

  const totalRevenue = useMemo(() => transactions.reduce((acc, curr) => acc + curr.amount, 0), [transactions]);
  const avgTransaction = useMemo(() => totalRevenue / transactions.length, [totalRevenue, transactions]);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden lg:flex">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Paystone</span>
          </div>

          <nav className="space-y-1">
            <NavItem 
              icon={LayoutDashboard} 
              label="Overview" 
              active={activeTab === 'overview'} 
              onClick={() => setActiveTab('overview')} 
            />
            <NavItem 
              icon={Users} 
              label="Customers" 
              active={activeTab === 'customers'} 
              onClick={() => setActiveTab('customers')} 
            />
            <NavItem 
              icon={CreditCard} 
              label="Transactions" 
              active={activeTab === 'transactions'} 
              onClick={() => setActiveTab('transactions')} 
            />
            <NavItem 
              icon={TrendingUp} 
              label="Analytics" 
              active={activeTab === 'analytics'} 
              onClick={() => setActiveTab('analytics')} 
            />
            <NavItem 
              icon={Calendar} 
              label="Marketing" 
              active={activeTab === 'marketing'} 
              onClick={() => setActiveTab('marketing')} 
            />
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-100">
          <nav className="space-y-1">
            <NavItem icon={Settings} label="Settings" />
            <NavItem icon={LogOut} label="Logout" className="text-rose-600 hover:bg-rose-50 hover:text-rose-700" />
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search customers, transactions..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-full text-sm focus:ring-2 focus:ring-sky-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">The Coffee House</p>
                <p className="text-xs text-slate-500">Merchant ID: 882910</p>
              </div>
              <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-sky-700 font-bold">
                CH
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto space-y-8"
          >
            {/* Page Title & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Customer 360</h1>
                <p className="text-slate-500 mt-1">Visualize and analyze your customer spending patterns.</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-sky-600 rounded-xl text-sm font-medium text-white hover:bg-sky-700 transition-colors shadow-sm">
                  <Download className="w-4 h-4" />
                  Export Data
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="Total Revenue" 
                value={`$${totalRevenue.toLocaleString()}`} 
                icon={TrendingUp} 
                trend={{ value: 12.5, isPositive: true }}
              />
              <StatCard 
                title="Active Customers" 
                value={customers.length} 
                icon={Users} 
                trend={{ value: 8.2, isPositive: true }}
              />
              <StatCard 
                title="Avg. Transaction" 
                value={`$${avgTransaction.toFixed(2)}`} 
                icon={ShoppingBag} 
                trend={{ value: 2.4, isPositive: false }}
              />
              <StatCard 
                title="Loyalty Points Issued" 
                value="45.2K" 
                icon={ArrowUpRight} 
                trend={{ value: 15.1, isPositive: true }}
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Revenue Trends</h3>
                  <select className="bg-slate-50 border-none text-xs font-medium rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-sky-500">
                    <option>Last 14 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                  </select>
                </div>
                <SpendingChart data={spendingTrends} />
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Spending by Category</h3>
                <CategoryDistribution data={categoryData} />
              </div>
            </div>

            {/* Customers Table Section */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Top Customers</h3>
                <button className="text-sky-600 text-sm font-semibold hover:text-sky-700 flex items-center gap-1">
                  View all <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <CustomerTable customers={customers} />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ 
  icon: Icon, 
  label, 
  active = false, 
  onClick, 
  className 
}: { 
  icon: any, 
  label: string, 
  active?: boolean, 
  onClick?: () => void,
  className?: string
}) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
        active 
          ? "bg-sky-50 text-sky-700" 
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
        className
      )}
    >
      <Icon className={cn("w-5 h-5", active ? "text-sky-700" : "text-slate-400")} />
      {label}
    </button>
  );
}

