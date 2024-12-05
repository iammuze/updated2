import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CreditCard, AlertCircle, ChevronRight } from 'lucide-react';
import { UpgradeMembershipModal } from '../modals/UpgradeMembershipModal';

interface MembershipStatusProps {
  membershipType: string;
  startDate: string;
  expiryDate: string;
  daysRemaining: number;
  isAutoRenewal: boolean;
}

export function MembershipStatus({
  membershipType,
  startDate,
  expiryDate,
  daysRemaining,
  isAutoRenewal
}: MembershipStatusProps) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Membership Status</h2>
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Upgrade Membership
            <ChevronRight className="ml-2 h-4 w-4" />
          </button>
        </div>
        
        {/* Current Plan */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Current Plan</p>
              <p className="text-xl font-semibold text-purple-600">{membershipType}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              daysRemaining > 30 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              Active
            </span>
          </div>
        </div>

        {/* Membership Details */}
        <div className="space-y-4">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="text-sm font-medium text-gray-900">{startDate}</p>
            </div>
          </div>

          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Expiry Date</p>
              <p className="text-sm font-medium text-gray-900">{expiryDate}</p>
            </div>
          </div>

          <div className="flex items-center">
            <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Auto Renewal</p>
              <p className="text-sm font-medium text-gray-900">
                {isAutoRenewal ? 'Enabled' : 'Disabled'}
              </p>
            </div>
          </div>
        </div>

        {/* Days Remaining Alert */}
        {daysRemaining <= 30 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-yellow-50 rounded-lg flex items-start"
          >
            <AlertCircle className="h-5 w-5 text-yellow-400 mr-3 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800">
                Your membership expires in {daysRemaining} days
              </p>
              <p className="text-sm text-yellow-700 mt-1">
                Renew now to continue enjoying uninterrupted access to all our partner gyms.
              </p>
              <button 
                onClick={() => setShowUpgradeModal(true)}
                className="mt-2 text-sm font-medium text-yellow-800 hover:text-yellow-900"
              >
                Renew Membership →
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <UpgradeMembershipModal
          currentPlan={membershipType}
          onClose={() => setShowUpgradeModal(false)}
        />
      )}
    </>
  );
}