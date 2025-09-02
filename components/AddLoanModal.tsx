import React, { useState } from "react";
import { Loan } from "@/types/database";
import InputField from "./ui/InputField";

interface AddLoanModalProps {
  userId: string;
  onClose: () => void;
  onSave: (loan: Omit<Loan, "id" | "created_at" | "updated_at">) => void;
}

export default function AddLoanModal({
  userId,
  onClose,
  onSave,
}: AddLoanModalProps) {
  const [form, setForm] = useState<
    Omit<Loan, "id" | "created_at" | "updated_at">
  >({
    user_id: userId,
    nickname: "",
    bank_name: "",
    interest_rate: 0,
    total_months: 0,
    total_amount: 0,
    processing_fee: 0,
    payment_day: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New Loan</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Nickname"
            name="nickname"
            value={form.nickname}
            onChange={handleChange}
            required
          />
          <InputField
            label="Bank Name"
            name="bank_name"
            value={form.bank_name}
            onChange={handleChange}
            required
          />
          <InputField
            label="Interest Rate (%)"
            name="interest_rate"
            type="number"
            value={form.interest_rate}
            onChange={handleChange}
            required
          />
          <InputField
            label="Total Months"
            name="total_months"
            type="number"
            value={form.total_months}
            onChange={handleChange}
            required
          />
          <InputField
            label="Total Amount"
            name="total_amount"
            type="number"
            value={form.total_amount}
            onChange={handleChange}
            required
          />
          <InputField
            label="Processing Fee"
            name="processing_fee"
            type="number"
            value={form.processing_fee}
            onChange={handleChange}
            required
          />
          <InputField
            label="Payment Day"
            name="payment_day"
            type="number"
            value={form.payment_day}
            onChange={handleChange}
            required
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
