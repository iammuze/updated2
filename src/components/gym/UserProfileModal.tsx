import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, Target } from 'lucide-react';

interface UserProfileModalProps {
  user: {
    userId: string;
    membershipType: string;
    visitHistory: number;
    lastVisit: string;
    timeSpent: string;
    preferredTime: string;
    fitnessGoals: string[];
  };
  onClose: () => void;
}

export function UserProfileModal({ user, onClose }: UserProfileModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-900">Member Profile</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Member ID</p>
              <p className="mt-1 text-sm text-gray-900">{user.userId}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Membership Type</p>
              <p className="mt-1 text-sm text-gray-900">{user.membershipType}</p>
            </div>

            <div className="flex items-center space-x-4">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Visit History</p>
                <p className="mt-1 text-sm text-gray-900">{user.visitHistory} visits</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Clock className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Average Time Spent</p>
                <p className="mt-1 text-sm text-gray-900">{user.timeSpent}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Target className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Fitness Goals</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {user.fitnessGoals.map((goal) => (
                    <span
                      key={goal}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                    >
                      {goal}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}