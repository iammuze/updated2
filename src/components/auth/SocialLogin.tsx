import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '../../lib/firebase';
import { useAuthStore } from '../../store/auth-store';
import toast from 'react-hot-toast';

export function SocialLogin() {
  const setUser = useAuthStore((state) => state.setUser);

  const handleSocialLogin = async (provider: any) => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser({
        id: result.user.uid,
        name: result.user.displayName || 'User',
        email: result.user.email || '',
        membershipType: 'basic',
      });
      toast.success('Successfully logged in!');
    } catch (error) {
      toast.error('Login failed');
      console.error(error);
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={() => handleSocialLogin(googleProvider)}
        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5 mr-2" />
        Continue with Google
      </button>
      <button
        onClick={() => handleSocialLogin(facebookProvider)}
        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="h-5 w-5 mr-2" />
        Continue with Facebook
      </button>
    </div>
  );
}