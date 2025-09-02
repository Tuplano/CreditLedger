import React from 'react';
import { Loan, Payment } from '../types/database';

interface LoanStatsProps {
  loans: Loan[];
  payments: Payment[];
}

export const LoanStats: React.FC<LoanStatsProps> = ({ loans, payments }) => {
  // Calculate statistics
  const totalLoans = loans.length;
  const totalLoanAmount = loans.reduce((sum, loan) => sum + loan.total_amount, 0);
  const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const totalRemaining = totalLoanAmount - totalPaid;
  
  // Calculate active loans (loans with remaining balance)
  const activeLoans = loans.filter(loan => {
    const loanPayments = payments.filter(p => p.loan_id === loan.id);
    const paidAmount = loanPayments.reduce((sum, p) => sum + p.amount, 0);
    return paidAmount < loan.total_amount;
  }).length;

  // Calculate overdue payments
  const today = new Date();
  const overdueLoans = loans.filter(loan => {
    const loanPayments = payments.filter(p => p.loan_id === loan.id);
    const paidMonths = loanPayments.length;
    
    if (paidMonths >= loan.total_months) return false;
    
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const paymentDate = new Date(currentYear, currentMonth, loan.payment_day);
    
    return today > paymentDate;
  }).length;

  const stats = [
    { label: 'Total Loans', value: totalLoans, color: 'blue' },
    { label: 'Active Loans', value: activeLoans, color: 'green' },
    { label: 'Overdue Loans', value: overdueLoans, color: 'red' },
    { label: 'Total Amount', value: `₱${totalLoanAmount.toLocaleString()}`, color: 'purple' },
    { label: 'Total Paid', value: `₱${totalPaid.toLocaleString()}`, color: 'green' },
    { label: 'Remaining Balance', value: `₱${totalRemaining.toLocaleString()}`, color: 'orange' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`p-3 rounded-full bg-${stat.color}-100 mr-4`}>
              <div className={`w-6 h-6 bg-${stat.color}-600 rounded`}></div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};