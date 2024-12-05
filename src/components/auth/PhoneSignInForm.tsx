import React, { useState } from 'react';
import { Phone, Lock } from 'lucide-react';
import { useAuthStore } from '../../store/auth-store';
import { useGymOwnerStore } from '../../store/gym-owner-store';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export function PhoneSignInForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const loginGymOwner = useGymOwnerStore((state) => state.login);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isGymOwner = searchParams.get('type') === 'gym-owner';

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // For demo purposes, we'll accept any phone number
      setIsVerifying(true);
      toast.success('Verification code sent! Use 123456');
    } catch (error) {
      toast.error('Failed to send verification code');
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (verificationCode !== '123456') {
        throw new Error('Invalid code');
      }

      if (isGymOwner) {
        // For demo, we'll use hardcoded gym owner credentials
        const success = loginGymOwner('owner@fitzoneelite.com', 'fitzoneelite123');
        if (success) {
          toast.success('Successfully signed in as gym owner!');
          navigate('/gym-owner-dashboard');
        } else {
          throw new Error('Invalid credentials');
        }
      } else {
        // For demo, create a user account
        setUser({
          id: 'demo-user-' + Date.now(),
          name: 'Demo User',
          email: '',
          membershipType: 'Basic Pass',
        });
        toast.success('Successfully signed in!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Invalid verification code');
    }
  };

  return (
    <div className="space-y-6">
      {!isVerifying ? (
        <form onSubmit={handleSendCode}>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="mt-1 relative">
              <input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="+1234567890"
                required
              />
              <Phone className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Send Verification Code
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode}>
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              Verification Code
            </label>
            <div className="mt-1 relative">
              <input
                id="code"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter 6-digit code"
                maxLength={6}
                required
              />
              <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsVerifying(false)}
              className="text-sm text-purple-600 hover:text-purple-500"
            >
              Change Phone Number
            </button>
            <button
              type="submit"
              className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Verify Code
            </button>
          </div>
        </form>
      )}
    </div>
  );
}