import { Transaction, Customer, SpendingTrend, CategoryData } from './types';
import { subDays, format, startOfDay, eachDayOfInterval } from 'date-fns';

const CUSTOMERS: Customer[] = [
  { id: '1', name: 'Alex Thompson', email: 'alex.t@example.com', totalSpent: 1250.50, transactionCount: 15, lastVisit: subDays(new Date(), 2).toISOString(), segment: 'VIP', loyaltyPoints: 1250 },
  { id: '2', name: 'Sarah Chen', email: 'sarah.c@example.com', totalSpent: 450.20, transactionCount: 5, lastVisit: subDays(new Date(), 1).toISOString(), segment: 'Regular', loyaltyPoints: 450 },
  { id: '3', name: 'Marcus Miller', email: 'm.miller@example.com', totalSpent: 890.00, transactionCount: 12, lastVisit: subDays(new Date(), 15).toISOString(), segment: 'At Risk', loyaltyPoints: 890 },
  { id: '4', name: 'Elena Rodriguez', email: 'elena.r@example.com', totalSpent: 120.00, transactionCount: 1, lastVisit: subDays(new Date(), 0).toISOString(), segment: 'New', loyaltyPoints: 120 },
  { id: '5', name: 'Jordan Smith', email: 'j.smith@example.com', totalSpent: 2100.75, transactionCount: 28, lastVisit: subDays(new Date(), 3).toISOString(), segment: 'VIP', loyaltyPoints: 2100 },
];

export const getMockTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  const categories: Transaction['category'][] = ['Retail', 'Dining', 'Services', 'Online'];
  
  for (let i = 0; i < 100; i++) {
    const customer = CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)];
    transactions.push({
      id: `tx-${i}`,
      customerId: customer.id,
      customerName: customer.name,
      amount: Math.floor(Math.random() * 200) + 10,
      date: subDays(new Date(), Math.floor(Math.random() * 30)).toISOString(),
      category: categories[Math.floor(Math.random() * categories.length)],
      status: Math.random() > 0.05 ? 'Completed' : 'Refunded',
    });
  }
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getMockSpendingTrends = (): SpendingTrend[] => {
  const interval = eachDayOfInterval({
    start: subDays(new Date(), 14),
    end: new Date(),
  });

  return interval.map(date => ({
    date: format(date, 'MMM dd'),
    revenue: Math.floor(Math.random() * 1000) + 500,
    transactions: Math.floor(Math.random() * 20) + 5,
  }));
};

export const getMockCategoryData = (): CategoryData[] => [
  { name: 'Retail', value: 4500 },
  { name: 'Dining', value: 3200 },
  { name: 'Services', value: 2100 },
  { name: 'Online', value: 1800 },
];

export const getMockCustomers = () => CUSTOMERS;
