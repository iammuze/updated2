import React from 'react';
import { Calendar, Activity, MapPin } from 'lucide-react';
import { useAuthStore } from '../store/auth-store';
import { MembershipStatus } from '../components/dashboard/MembershipStatus';

export function Dashboard() {
  const { user } = useAuthStore();

  const membershipData = {
    membershipType: user?.membershipType || 'Basic Pass',
    startDate: '2024-01-01',
    expiryDate: '2024-12-31',
    daysRemaining: 290,
    isAutoRenewal: true
  };

  const recentVisits = [
    { id: 1, gym: "FitZone Elite", date: "2024-03-15", location: "New York" },
    { id: 2, gym: "PowerHouse Gym", date: "2024-03-13", location: "Los Angeles" },
    { id: 3, gym: "Global Fitness", date: "2024-03-10", location: "Chicago" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Membership Status */}
      <div className="mb-8">
        <MembershipStatus {...membershipData} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Calendar className="h-10 w-10 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">12 Visits</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Activity className="h-10 w-10 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Streak</p>
              <p className="text-2xl font-bold text-gray-900">5 Days</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <MapPin className="h-10 w-10 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Different Gyms</p>
              <p className="text-2xl font-bold text-gray-900">3 Locations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Visits */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Visits</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gym
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentVisits.map((visit) => (
                <tr key={visit.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {visit.gym}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {visit.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {visit.location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}