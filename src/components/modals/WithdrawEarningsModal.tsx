import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';

interface WithdrawEarningsModalProps {
  onClose: () => void;
}

export function WithdrawEarningsModal({ onClose }: WithdrawEarningsModalProps) {
  const [amount, setAmount] = useState('');
  const availableBalance = 1234.56; // This would typically come from your state management

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawAmount = parseFloat(amount);
    
    if (withdrawAmount > availableBalance) {
      toast.error('Insufficient balance');
      return;
    }

    // Here you would typically make an API call to process the withdrawal
    toast.success('Withdrawal initiated successfully');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Withdraw Earnings</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <span className="text-sm text-gray-500">
                Available: ${availableBalance.toFixed(2)}
              </span>
            </div>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="block w-full pl-10 pr-12 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Withdrawal Information</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Withdrawals are processed within 1-3 business days</li>
              <li>• Minimum withdrawal amount: $50</li>
              <li>• Maximum withdrawal amount: $10,000</li>
            </ul>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Withdraw Funds
          </button>
        </form>
      </motion.div>
    </div>
  );
}