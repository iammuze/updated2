import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gray-900 h-screen flex items-center">
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Floating Shapes */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Dumbbell className="mx-auto h-20 w-20 text-purple-400 mb-8" />
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-6">
            Your Global Gym Access
          </h1>
          <p className="text-xl sm:text-2xl text-purple-200 mb-10">
            One membership, thousands of gyms worldwide
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-purple-900 bg-purple-100 hover:bg-purple-200 transition-colors"
            >
              Start Your Journey
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}