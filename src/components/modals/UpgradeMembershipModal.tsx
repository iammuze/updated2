import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check, CreditCard, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface UpgradeMembershipModalProps {
  currentPlan: string;
  onClose: () => void;
}

const plans = [
  {
    name: 'Basic Pass',
    price: 29,
    features: [
      'Access to local partner gyms',
      '5 visits per month',
      'Basic fitness tracking',
      'Standard support'
    ]
  },
  {
    name: 'Pro Pass',
    price: 79,
    features: [
      'Access to nationwide partner gyms',
      'Unlimited visits',
      'Advanced fitness tracking',
      'Priority support',
      'Guest passes (2/month)'
    ]
  },
  {
    name: 'Global Pass',
    price: 149,
    features: [
      'Access to worldwide partner gyms',
      'Unlimited visits',
      'Premium fitness tracking',
      '24/7 VIP support',
      'Guest passes (4/month)',
      'Personal trainer discounts'
    ]
  }
];

export function UpgradeMembershipModal({ currentPlan, onClose }: UpgradeMembershipModalProps) {
  const [selectedPlan, setSelectedPlan] = useState(currentPlan);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCurrentPlanWarning, setShowCurrentPlanWarning] = useState(false);

  const handlePlanSelect = (planName: string) => {
    if (planName === currentPlan) {
      setShowCurrentPlanWarning(true);
      setTimeout(() => setShowCurrentPlanWarning(false), 3000); // Hide warning after 3 seconds
    } else {
      setShowCurrentPlanWarning(false);
    }
    setSelectedPlan(planName);
  };

  const handleUpgrade = async () => {
    if (selectedPlan === currentPlan) {
      toast.error('Please select a different plan to upgrade');
      return;
    }

    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    toast.success('Membership upgraded successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">Upgrade Membership</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        {showCurrentPlanWarning && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-4 bg-yellow-50 rounded-lg flex items-center"
          >
            <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
            <p className="text-sm text-yellow-700">
              This is your current plan. Please select a different plan to upgrade.
            </p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedPlan === plan.name
                  ? plan.name === currentPlan
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
              onClick={() => handlePlanSelect(plan.name)}
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-medium text-gray-900">{plan.name}</h4>
                {selectedPlan === plan.name && (
                  <Check className={`h-5 w-5 ${
                    plan.name === currentPlan ? 'text-yellow-500' : 'text-purple-600'
                  }`} />
                )}
              </div>
              {plan.name === currentPlan && (
                <span className="inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full mb-2">
                  Current Plan
                </span>
              )}
              <p className="text-2xl font-bold text-gray-900 mb-4">
                ${plan.price}
                <span className="text-sm font-normal text-gray-500">/month</span>
              </p>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t pt-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center text-gray-600">
              <CreditCard className="h-5 w-5 mr-2" />
              <span>Secure payment with Stripe</span>
            </div>
            <button
              onClick={handleUpgrade}
              disabled={isProcessing || selectedPlan === currentPlan}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                isProcessing || selectedPlan === currentPlan
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {isProcessing ? 'Processing...' : 'Upgrade Now'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}