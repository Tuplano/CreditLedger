"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { LoanCard } from "@/components/LoanCard";
import { LoanDetails } from "@/components/LoanDetails";
import { LoanStats } from "@/components/LoanStats";
import AddLoanModal from "@/components/AddLoanModal";
import RecordPaymentModal from "@/components/RecordPaymentModal";
import { Loan, Payment } from "@/types/database";

const supabase = createClient();

// Define a reusable type for filterStatus
type FilterStatus = "all" | "active" | "overdue" | "completed";

export default function LoanDashboard() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  const [showAddLoan, setShowAddLoan] = useState(false);
  const [showRecordPayment, setShowRecordPayment] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    loadUserAndData();
  }, []);

  const loadUserAndData = async () => {
    try {
      setLoading(true);
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;
      setUserId(userData.user.id);

      const { data: loansData, error: loansError } = await supabase
        .from("loans")
        .select("*")
        .eq("user_id", userData.user.id)
        .order("created_at", { ascending: false });

      const { data: paymentsData, error: paymentsError } = await supabase
        .from("payments")
        .select("*")
        .eq("user_id", userData.user.id)
        .order("payment_date", { ascending: false });

      if (loansError) throw loansError;
      if (paymentsError) throw paymentsError;

      setLoans(loansData || []);
      setPayments(paymentsData || []);
    } catch (err) {
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLoan = async (
    newLoan: Omit<Loan, "id" | "created_at" | "updated_at">
  ) => {
    const { data, error } = await supabase
      .from("loans")
      .insert(newLoan)
      .select()
      .single();

    if (!error && data) {
      setLoans((prev) => [data, ...prev]);
      setShowAddLoan(false);
    } else {
      console.error("Error adding loan:", error);
    }
  };

  const handleRecordPayment = async (
    newPayment: Omit<Payment, "id" | "created_at" | "is_late">
  ) => {
    if (!userId) return;
    const paymentWithUser = { ...newPayment, user_id: userId };

    const { data, error } = await supabase
      .from("payments")
      .insert(paymentWithUser)
      .select()
      .single();

    if (!error && data) {
      setPayments((prev) => [data, ...prev]);
      setShowRecordPayment(false);
    } else {
      console.error("Error recording payment:", error);
    }
  };

  const filteredLoans = loans.filter((loan) => {
    const matchesSearch =
      loan.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.bank_name.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterStatus === "all") return true;

    const loanPayments = payments.filter((p) => p.loan_id === loan.id);
    const totalPaid = loanPayments.reduce((sum, p) => sum + p.amount, 0);
    const isCompleted = totalPaid >= loan.total_amount;

    if (filterStatus === "completed") return isCompleted;
    if (filterStatus === "active") return !isCompleted;

    if (filterStatus === "overdue") {
      const today = new Date();
      const paidMonths = loanPayments.length;
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      const paymentDate = new Date(currentYear, currentMonth, loan.payment_day);
      return (
        !isCompleted && today > paymentDate && paidMonths < loan.total_months
      );
    }

    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading loans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Loan Dashboard</h1>
            <div className="flex space-x-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                onClick={() => setShowAddLoan(true)}
                disabled={!userId}
              >
                Add New Loan
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                onClick={() => setShowRecordPayment(true)}
                disabled={!userId}
              >
                Record Payment
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <LoanStats loans={loans} payments={payments} />

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search loans by nickname or bank..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(
                    e.target.value as FilterStatus
                  )
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Loans</option>
                <option value="active">Active Loans</option>
                <option value="overdue">Overdue Loans</option>
                <option value="completed">Completed Loans</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLoans.map((loan) => {
            const loanPayments = payments.filter((p) => p.loan_id === loan.id);
            return (
              <LoanCard
                key={loan.id}
                loan={loan}
                payments={loanPayments}
                onViewDetails={setSelectedLoan}
              />
            );
          })}
        </div>

        {filteredLoans.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No loans found matching your criteria.
            </p>
          </div>
        )}
      </main>

      {/* Loan Details Modal */}
      {selectedLoan && (
        <LoanDetails
          loan={selectedLoan}
          payments={payments.filter((p) => p.loan_id === selectedLoan.id)}
          onClose={() => setSelectedLoan(null)}
        />
      )}

      {showAddLoan && userId && (
        <AddLoanModal
          userId={userId}
          onClose={() => setShowAddLoan(false)}
          onSave={handleAddLoan}
        />
      )}

      {showRecordPayment && (
        <RecordPaymentModal
          userId={userId}
          loans={loans}
          onClose={() => setShowRecordPayment(false)}
          onSave={handleRecordPayment}
        />
      )}
    </div>
  );
}
