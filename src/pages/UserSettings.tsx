import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Shield, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';

export function UserSettings() {
  const handleNotificationToggle = () => {
    toast.success('Notification settings updated');
  };

  const handlePasswordChange = () => {
    toast.success('Password updated successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md"
        >
          <div className="px-6 py-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
          </div>

          <div className="p-6 space-y-6">
            {/* Notifications */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 text-gray-400" />
                    <span className="ml-3 text-sm font-medium text-gray-900">Push Notifications</span>
                  </div>
                  <button
                    onClick={handleNotificationToggle}
                    className="bg-purple-100 text-purple-600 px-3 py-1 rounded-md text-sm font-medium"
                  >
                    Configure
                  </button>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Security</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-gray-400" />
                    <span className="ml-3 text-sm font-medium text-gray-900">Change Password</span>
                  </div>
                  <button
                    onClick={handlePasswordChange}
                    className="bg-purple-100 text-purple-600 px-3 py-1 rounded-md text-sm font-medium"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                    <span className="ml-3 text-sm font-medium text-gray-900">Manage Payment Methods</span>
                  </div>
                  <button
                    className="bg-purple-100 text-purple-600 px-3 py-1 rounded-md text-sm font-medium"
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}