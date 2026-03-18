import React from 'react';
import { Customer } from '../types';
import { format } from 'date-fns';
import { cn } from '../lib/utils';

interface CustomerTableProps {
  customers: Customer[];
}

export const CustomerTable: React.FC<CustomerTableProps> = ({ customers }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
            <th className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Segment</th>
            <th className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Spent</th>
            <th className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Visit</th>
            <th className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Points</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
              <td className="py-4 px-4">
                <div>
                  <p className="text-sm font-medium text-slate-900">{customer.name}</p>
                  <p className="text-xs text-slate-500">{customer.email}</p>
                </div>
              </td>
              <td className="py-4 px-4">
                <span className={cn(
                  "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tight",
                  customer.segment === 'VIP' && "bg-amber-50 text-amber-600",
                  customer.segment === 'Regular' && "bg-blue-50 text-blue-600",
                  customer.segment === 'At Risk' && "bg-rose-50 text-rose-600",
                  customer.segment === 'New' && "bg-emerald-50 text-emerald-600",
                )}>
                  {customer.segment}
                </span>
              </td>
              <td className="py-4 px-4 text-sm font-medium text-slate-700">
                ${customer.totalSpent.toLocaleString()}
              </td>
              <td className="py-4 px-4 text-sm text-slate-500">
                {format(new Date(customer.lastVisit), 'MMM dd, yyyy')}
              </td>
              <td className="py-4 px-4 text-sm text-slate-600">
                {customer.loyaltyPoints}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
