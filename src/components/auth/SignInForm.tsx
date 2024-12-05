import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useAuthStore } from '../../store/auth-store';
import { useGymOwnerStore } from '../../store/gym-owner-store';
import { Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useAuthStore((state) => state.setUser);
  const loginGymOwner = useGymOwnerStore((state) => state.login);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isGymOwner = searchParams.get('type') === 'gym-owner';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isGymOwner) {
        const success = loginGymOwner(email, password);
        if (success) {
          toast.success('Successfully signed in!');
          navigate('/gym-owner-dashboard');
        } else {
          throw new Error('Invalid credentials');
        }
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password);
        setUser({
          id: result.user.uid,
          name: result.user.displayName || 'User',
          email: result.user.email || '',
          membershipType: 'basic',
        });
        toast.success('Successfully signed in!');
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast.error('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <div className="mt-1 relative">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          />
          <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1 relative">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          />
          <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Sign in
        </button>
      </div>
    </form>
  );
}