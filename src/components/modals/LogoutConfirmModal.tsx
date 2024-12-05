import React from 'react';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';

interface LogoutConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function LogoutConfirmModal({ onConfirm, onCancel }: LogoutConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="bg-red-100 rounded-full p-3">
            <LogOut className="h-6 w-6 text-red-600" />
          </div>
        </div>
        <h3 className="text-lg font-medium text-gray-900 text-center mb-4">
          Confirm Logout
        </h3>
        <p className="text-sm text-gray-500 text-center mb-6">
          Are you sure you want to log out? You will need to sign in again to access your dashboard.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
}