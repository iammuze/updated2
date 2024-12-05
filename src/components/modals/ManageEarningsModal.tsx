import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, DollarSign, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { WithdrawConfirmModal } from './WithdrawConfirmModal';

interface ManageEarningsModalProps {
  onClose: () => void;
}

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  lastFourDigits: string;
}

export function ManageEarningsModal({ onClose }: ManageEarningsModalProps) {
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [formData, setFormData] = useState({
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
  });

  // Mock data - in a real app, this would come from your backend
  const [bankAccounts] = useState<BankAccount[]>([
    { id: '1', bankName: 'Chase Bank', accountNumber: '****5678', lastFourDigits: '5678' },
  ]);
  const availableBalance = 1234.56;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.accountNumber !== formData.confirmAccountNumber) {
      toast.error('Account numbers do not match');
      return;
    }
    // Here you would typically make an API call to save the bank account
    toast.success('Bank account added successfully');
    setShowAddAccount(false);
  };

  const handleWithdrawClick = () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    if (amount > availableBalance) {
      toast.error('Insufficient balance');
      return;
    }
    if (amount < 50) {
      toast.error('Minimum withdrawal amount is $50');
      return;
    }
    if (amount > 10000) {
      toast.error('Maximum withdrawal amount is $10,000');
      return;
    }
    setShowWithdrawConfirm(true);
  };

  const handleWithdrawConfirm = () => {
    // Here you would typically make an API call to process the withdrawal
    toast.success('Withdrawal initiated successfully');
    setShowWithdrawConfirm(false);
    setWithdrawAmount('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Manage Earnings</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Available Balance and Withdraw Section */}
          <div className="bg-purple-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-purple-900">Available Balance</p>
                <p className="text-2xl font-bold text-purple-900">${availableBalance.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-purple-900 mb-1">
                  Withdrawal Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="block w-full pl-10 pr-12 border border-purple-300 rounded-md focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="0.00"
                    step="0.01"
                    min="50"
                    max="10000"
                  />
                </div>
              </div>
              <button
                onClick={handleWithdrawClick}
                className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 h-10"
              >
                Withdraw
              </button>
            </div>
          </div>

          {/* Rest of the component remains the same */}
          {/* Bank Accounts Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium text-gray-900">Bank Accounts</h4>
              <button
                onClick={() => setShowAddAccount(true)}
                className="flex items-center text-purple-600 hover:text-purple-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Account
              </button>
            </div>

            {bankAccounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-4 border rounded-lg mb-2"
              >
                <div>
                  <p className="font-medium text-gray-900">{account.bankName}</p>
                  <p className="text-sm text-gray-500">Account ending in {account.lastFourDigits}</p>
                </div>
                <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Add Bank Account Form */}
          {showAddAccount && (
            <form onSubmit={handleSubmit} className="border-t pt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Account Holder Name</label>
                <input
                  type="text"
                  value={formData.accountHolderName}
                  onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Account Number</label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Account Number</label>
                <input
                  type="text"
                  value={formData.confirmAccountNumber}
                  onChange={(e) => setFormData({ ...formData, confirmAccountNumber: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">IFSC Code</label>
                <input
                  type="text"
                  value={formData.ifscCode}
                  onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddAccount(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Add Account
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>

      {/* Withdraw Confirmation Modal */}
      {showWithdrawConfirm && (
        <WithdrawConfirmModal
          amount={parseFloat(withdrawAmount)}
          onConfirm={handleWithdrawConfirm}
          onCancel={() => setShowWithdrawConfirm(false)}
        />
      )}
    </div>
  );
}