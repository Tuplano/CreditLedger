import React from 'react';
import { Loan, Payment } from '../types/database';

interface LoanCardProps {
  loan: Loan;
  payments: Payment[];
  onViewDetails: (loan: Loan) => void;
}

export const LoanCard: React.FC<LoanCardProps> = ({ loan, payments, onViewDetails }) => {
  // Calculate loan statistics
  const monthlyPayment = calculateMonthlyPayment(loan.total_amount, loan.interest_rate, loan.total_months);
  const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const remainingBalance = loan.total_amount - totalPaid;
  const paidMonths = payments.length;
  const remainingMonths = loan.total_months - paidMonths;
  const progressPercentage = (paidMonths / loan.total_months) * 100;
  
  // Check if current payment is late
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const paymentDay = loan.payment_day;
  
  const currentPaymentDate = new Date(currentYear, currentMonth, paymentDay);
  const isCurrentPaymentLate = today > currentPaymentDate && paidMonths < loan.total_months;
  
  const nextPaymentDate = new Date(currentYear, currentMonth + 1, paymentDay);
  if (today.getDate() > paymentDay) {
    nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{loan.nickname}</h3>
          <p className="text-sm text-gray-600">{loan.bank_name}</p>
        </div>
        <div className="text-right">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            isCurrentPaymentLate ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}>
            {isCurrentPaymentLate ? 'Payment Late' : 'Up to Date'}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{paidMonths}/{loan.total_months} months</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Loan Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500">Monthly Payment</p>
          <p className="text-sm font-semibold">₱{monthlyPayment.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Interest Rate</p>
          <p className="text-sm font-semibold">{loan.interest_rate}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Total Paid</p>
          <p className="text-sm font-semibold text-green-600">₱{totalPaid.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Remaining</p>
          <p className="text-sm font-semibold text-orange-600">₱{remainingBalance.toLocaleString()}</p>
        </div>
      </div>

      {/* Next Payment */}
      <div className="mb-4 p-3 bg-gray-50 rounded">
        <p className="text-xs text-gray-500">Next Payment Due</p>
        <p className="text-sm font-semibold">{nextPaymentDate.toLocaleDateString()}</p>
      </div>

      <button 
        onClick={() => onViewDetails(loan)}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        View Details
      </button>
    </div>
  );
};

function calculateMonthlyPayment(principal: number, annualRate: number, months: number): number {
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return principal / months;
  
  const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                  (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(payment * 100) / 100;
}