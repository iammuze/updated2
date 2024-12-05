import React, { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useAuthStore } from '../../store/auth-store';
import { Phone } from 'lucide-react';
import toast from 'react-hot-toast';

export function PhoneLoginForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'normal',
        callback: () => {
          // reCAPTCHA solved
        },
      });
    }
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setupRecaptcha();
      const formattedNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedNumber,
        (window as any).recaptchaVerifier
      );
      (window as any).confirmationResult = confirmation;
      setIsVerifying(true);
      toast.success('Verification code sent!');
    } catch (error) {
      toast.error('Error sending verification code');
      console.error(error);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await (window as any).confirmationResult.confirm(verificationCode);
      setUser({
        id: result.user.uid,
        name: 'User',
        email: '',
        membershipType: 'basic',
      });
      toast.success('Successfully logged in!');
    } catch (error) {
      toast.error('Invalid verification code');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      {!isVerifying ? (
        <form onSubmit={handleSendCode}>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="+1234567890"
                required
              />
              <Phone className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div id="recaptcha-container" className="mb-4"></div>
          
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
          >
            Send Verification Code
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode}>
          <div className="mb-4">
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter 6-digit code"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
          >
            Verify Code
          </button>
        </form>
      )}
    </div>
  );
}