import React from 'react';
import { motion } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';

interface WithdrawConfirmModalProps {
  amount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export function WithdrawConfirmModal({ amount, onConfirm, onCancel }: WithdrawConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Confirm Withdrawal</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-yellow-100 rounded-full p-3">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-center text-gray-600 mb-2">
            You are about to withdraw
          </p>
          <p className="text-center text-2xl font-bold text-gray-900 mb-4">
            ${amount.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 text-center">
            This amount will be transferred to your selected bank account within 1-3 business days.
          </p>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Confirm Withdrawal
          </button>
        </div>
      </motion.div>
    </div>
  );
}