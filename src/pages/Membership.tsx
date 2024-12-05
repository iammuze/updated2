import React from 'react';
import { MembershipPasses } from '../components/home/MembershipPasses';
import { motion } from 'framer-motion';
import { Globe, Shield, CreditCard } from 'lucide-react';

export function Membership() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-6">Membership Plans</h1>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              Choose the perfect plan for your fitness journey. Access thousands of gyms worldwide with a single membership.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Global Access",
                description: "Work out at any partner gym worldwide with a single membership."
              },
              {
                icon: Shield,
                title: "Secure Access",
                description: "Quick and secure entry with our QR code scanning system."
              },
              {
                icon: CreditCard,
                title: "Flexible Plans",
                description: "Choose from monthly or annual plans with no long-term commitments."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-lg"
              >
                <benefit.icon className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Membership Passes */}
      <MembershipPasses />

      {/* FAQ Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                question: "How does gym access work?",
                answer: "Simply scan the GymGPT QR code at any partner gym's entrance using our mobile app. You'll get instant access to the facility."
              },
              {
                question: "Can I freeze my membership?",
                answer: "Yes, you can freeze your membership for up to 3 months per year with no additional charges."
              },
              {
                question: "Is there a commitment period?",
                answer: "No, all our plans are flexible with no long-term commitments. You can cancel anytime."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}