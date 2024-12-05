import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '../../lib/firebase';
import { useAuthStore } from '../../store/auth-store';
import toast from 'react-hot-toast';

export function SocialButtons() {
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
      toast.success('Successfully signed in!');
    } catch (error) {
      toast.error('Failed to sign in');
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={() => handleSocialLogin(googleProvider)}
        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
      >
        <img
          className="h-5 w-5"
          src="https://www.google.com/favicon.ico"
          alt="Google"
        />
      </button>
      <button
        onClick={() => handleSocialLogin(facebookProvider)}
        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
      >
        <img
          className="h-5 w-5"
          src="https://www.facebook.com/favicon.ico"
          alt="Facebook"
        />
      </button>
    </div>
  );
}