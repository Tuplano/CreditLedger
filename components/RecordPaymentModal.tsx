import React, { useState } from "react";
import { Loan, Payment } from "@/types/database";
import InputField from "./ui/InputField";
import SelectField from "./ui/SelectField";

interface RecordPaymentModalProps {
  userId: string | null;
  loans: Loan[];
  onClose: () => void;
  onSave: (payment: Omit<Payment, "id" | "created_at" | "is_late">) => void;
}

export default function RecordPaymentModal({
  userId,
  loans,
  onClose,
  onSave,
}: RecordPaymentModalProps) {
  const [form, setForm] = useState<Omit<Payment, "id" | "created_at" | "is_late">>({
    user_id: userId ?? "",        // <-- fallback to empty string
    loan_id: loans[0]?.id || "",
    amount: 0,
    payment_date: "",
    due_date: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
        <h2 className="text-xl font-bold mb-4">Record Payment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <SelectField
            label="Loan"
            name="loan_id"
            value={form.loan_id}
            onChange={handleChange}
            options={loans.map((loan) => ({
              value: loan.id,
              label: `${loan.nickname} - ${loan.bank_name}`,
            }))}
            required
          />

          <InputField
            label="Payment Amount"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            required
          />

          <InputField
            label="Payment Date"
            name="payment_date"
            type="date"
            value={form.payment_date}
            onChange={handleChange}
            required
          />

          <InputField
            label="Due Date"
            name="due_date"
            type="date"
            value={form.due_date}
            onChange={handleChange}
            required
          />

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Notes (optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Add any additional details..."
              value={form.notes}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#76944C] focus:border-transparent transition duration-200"
            />
          </div>

          {/* Action Buttons */}
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
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
