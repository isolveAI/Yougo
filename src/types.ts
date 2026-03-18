export interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  date: string;
  category: 'Retail' | 'Dining' | 'Services' | 'Online';
  status: 'Completed' | 'Refunded' | 'Pending';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  totalSpent: number;
  transactionCount: number;
  lastVisit: string;
  segment: 'VIP' | 'Regular' | 'At Risk' | 'New';
  loyaltyPoints: number;
}

export interface SpendingTrend {
  date: string;
  revenue: number;
  transactions: number;
}

export interface CategoryData {
  name: string;
  value: number;
}
