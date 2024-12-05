import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignInForm } from '../components/auth/SignInForm';
import { PhoneSignInForm } from '../components/auth/PhoneSignInForm';
import { SocialButtons } from '../components/auth/SocialButtons';
import { Dumbbell, Phone, Mail } from 'lucide-react';

export function Login() {
  const [signInMethod, setSignInMethod] = useState<'email' | 'phone'>('phone');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Dumbbell className="h-12 w-12 text-purple-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Sign in to GymGPT
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Sign In Method Selector */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setSignInMethod('phone')}
              className={`flex-1 flex items-center justify-center px-4 py-2 border rounded-md text-sm font-medium ${
                signInMethod === 'phone'
                  ? 'border-purple-600 text-purple-600 bg-purple-50'
                  : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
              }`}
            >
              <Phone className="h-4 w-4 mr-2" />
              Phone
            </button>
            <button
              onClick={() => setSignInMethod('email')}
              className={`flex-1 flex items-center justify-center px-4 py-2 border rounded-md text-sm font-medium ${
                signInMethod === 'email'
                  ? 'border-purple-600 text-purple-600 bg-purple-50'
                  : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
              }`}
            >
              <Mail className="h-4 w-4 mr-2" />
              Email
            </button>
          </div>

          {signInMethod === 'email' ? <SignInForm /> : <PhoneSignInForm />}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <SocialButtons />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-purple-600 hover:text-purple-500">
                Forgot your password?
              </Link>
            </div>
            <div className="text-sm">
              <Link to="/signup" className="font-medium text-purple-600 hover:text-purple-500">
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}