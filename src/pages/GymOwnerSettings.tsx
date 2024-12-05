import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Shield, Clock, DollarSign } from 'lucide-react';
import { ManageEarningsModal } from '../components/modals/ManageEarningsModal';

export function GymOwnerSettings() {
  const [showEarningsModal, setShowEarningsModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md"
        >
          <div className="px-6 py-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
          </div>

          <div className="px-6 py-4 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-gray-400" />
                <div className="ml-3">
                  <span className="text-sm font-medium text-gray-900">Manage Earnings</span>
                  <p className="text-sm text-gray-500">Bank accounts and withdrawals</p>
                </div>
              </div>
              <button
                onClick={() => setShowEarningsModal(true)}
                className="bg-purple-100 text-purple-600 px-3 py-1 rounded-md text-sm font-medium"
              >
                Manage
              </button>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 text-gray-400" />
                  <span className="ml-3 text-sm font-medium text-gray-900">Notifications</span>
                </div>
                <button className="bg-purple-100 text-purple-600 px-3 py-1 rounded-md text-sm font-medium">
                  Configure
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-gray-400" />
                <span className="ml-3 text-sm font-medium text-gray-900">Security</span>
              </div>
              <button className="bg-purple-100 text-purple-600 px-3 py-1 rounded-md text-sm font-medium">
                Manage
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400" />
                <span className="ml-3 text-sm font-medium text-gray-900">Operating Hours</span>
              </div>
              <button className="bg-purple-100 text-purple-600 px-3 py-1 rounded-md text-sm font-medium">
                Update
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {showEarningsModal && (
        <ManageEarningsModal onClose={() => setShowEarningsModal(false)} />
      )}
    </div>
  );
}