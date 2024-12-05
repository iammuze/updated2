import React from 'react';
import { motion } from 'framer-motion';
import { Check, Globe, Clock, Users, Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';

const passes = [
  {
    name: 'Basic Pass',
    price: '29',
    features: [
      'Access to local partner gyms',
      '5 visits per month',
      'Basic fitness tracking',
      'Standard support'
    ],
    icon: Dumbbell,
    color: 'purple'
  },
  {
    name: 'Pro Pass',
    price: '79',
    features: [
      'Access to nationwide partner gyms',
      'Unlimited visits',
      'Advanced fitness tracking',
      'Priority support',
      'Guest passes (2/month)'
    ],
    icon: Users,
    popular: true,
    color: 'indigo'
  },
  {
    name: 'Global Pass',
    price: '149',
    features: [
      'Access to worldwide partner gyms',
      'Unlimited visits',
      'Premium fitness tracking',
      '24/7 VIP support',
      'Guest passes (4/month)',
      'Personal trainer discounts'
    ],
    icon: Globe,
    color: 'purple'
  }
];

export function MembershipPasses() {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Choose Your Pass
          </h2>
          <p className="text-xl text-gray-600">
            Flexible plans for every fitness journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {passes.map((pass, index) => (
            <motion.div
              key={pass.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl shadow-xl overflow-hidden ${
                pass.popular ? 'border-2 border-indigo-500' : ''
              }`}
            >
              {pass.popular && (
                <div className="absolute top-0 right-0 bg-indigo-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{pass.name}</h3>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-4xl font-bold tracking-tight text-gray-900">
                        ${pass.price}
                      </span>
                      <span className="ml-1 text-xl font-semibold text-gray-500">/month</span>
                    </div>
                  </div>
                  <pass.icon className={`h-12 w-12 text-${pass.color}-600`} />
                </div>

                <ul className="space-y-4 mb-8">
                  {pass.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/signup"
                  className={`block w-full text-center px-6 py-3 rounded-lg text-white font-medium transition-colors ${
                    pass.popular
                      ? 'bg-indigo-600 hover:bg-indigo-700'
                      : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}