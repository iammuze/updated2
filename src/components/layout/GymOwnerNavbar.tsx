import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, LogOut, Settings, User } from 'lucide-react';
import { useGymOwnerStore } from '../../store/gym-owner-store';
import { useNavigate } from 'react-router-dom';
import { LogoutConfirmModal } from '../modals/LogoutConfirmModal';

export function GymOwnerNavbar() {
  const { owner, logout } = useGymOwnerStore();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    navigate('/login?type=gym-owner');
  };

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/gym-owner-dashboard" className="flex items-center">
                <Building2 className="h-8 w-8 text-purple-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">{owner?.gymName}</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative group">
                <Link
                  to="/gym-owner-personal-profile"
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 focus:outline-none"
                >
                  <User className="h-5 w-5" />
                  <span>Personal Profile</span>
                </Link>
              </div>
              <Link
                to="/gym-owner-profile"
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 focus:outline-none"
              >
                <Building2 className="h-5 w-5" />
                <span>Gym Profile</span>
              </Link>
              <Link
                to="/gym-owner-settings"
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 focus:outline-none"
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 focus:outline-none"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {showLogoutModal && (
        <LogoutConfirmModal
          onConfirm={confirmLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </>
  );
}