import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TestimonialSlider } from '../components/home/TestimonialSlider';
import { motion } from 'framer-motion';
import { Dumbbell, Globe, QrCode, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  const features = [
    {
      icon: Globe,
      title: "Global Access",
      description: "Access gyms across the globe with our extensive network of partner facilities."
    },
    {
      icon: QrCode,
      title: "Quick Scan",
      description: "Simply scan the QR code at any partner gym to instantly gain access."
    },
    {
      icon: Clock,
      title: "24/7 Access",
      description: "Work out on your schedule with round-the-clock access to participating facilities."
    }
  ];

  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Why Choose GymGPT?
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Experience the future of gym access
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-purple-500 rounded-full opacity-10" />
                <div className="relative">
                  <feature.icon className="h-12 w-12 text-purple-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/membership"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              View Membership Plans
            </Link>
          </div>
        </div>
      </div>

      <TestimonialSlider />

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-purple-900 py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">1000+</div>
              <div className="text-purple-200">Partner Gyms</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-purple-200">Active Members</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-purple-200">Cities Worldwide</div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}