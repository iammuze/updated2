import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Calendar, Activity, Eye } from 'lucide-react';
import { UserProfileModal } from '../components/gym/UserProfileModal';

const mockVisits = [
  { 
    id: 1,
    userId: "usr1",
    membershipType: "Pro Pass",
    visitHistory: 15,
    lastVisit: "2024-03-15",
    timeSpent: "1.5 hours",
    preferredTime: "Morning",
    fitnessGoals: ["Weight Training", "Cardio"],
    date: "2024-03-15",
    time: "09:30 AM"
  },
  {
    id: 2,
    userId: "usr2",
    membershipType: "Basic Pass",
    visitHistory: 8,
    lastVisit: "2024-03-15",
    timeSpent: "1 hour",
    preferredTime: "Evening",
    fitnessGoals: ["Yoga", "Flexibility"],
    date: "2024-03-15",
    time: "10:15 AM"
  },
  {
    id: 3,
    userId: "usr3",
    membershipType: "Global Pass",
    visitHistory: 25,
    lastVisit: "2024-03-15",
    timeSpent: "2 hours",
    preferredTime: "Afternoon",
    fitnessGoals: ["Strength Training", "HIIT"],
    date: "2024-03-15",
    time: "11:45 AM"
  }
];

export function GymOwnerDashboard() {
  const [selectedUser, setSelectedUser] = useState<typeof mockVisits[0] | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {[
            { title: "Today's Visits", value: "45", icon: Users, color: "bg-blue-500" },
            { title: "Monthly Visits", value: "1,248", icon: TrendingUp, color: "bg-green-500" },
            { title: "Active Members", value: "892", icon: Activity, color: "bg-purple-500" },
            { title: "Peak Hours", value: "5-7 PM", icon: Calendar, color: "bg-orange-500" },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-center">
                <div className={`${stat.color} rounded-md p-3`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Visits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-lg shadow"
        >
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Visits</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Membership
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockVisits.map((visit) => (
                  <tr key={visit.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{visit.userId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{visit.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{visit.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {visit.membershipType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedUser(visit)}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* User Profile Modal */}
      {selectedUser && (
        <UserProfileModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}