export const MEMBERSHIP_PLANS = [
  {
    name: 'Basic Pass',
    price: 29,
    features: [
      'Access to local partner gyms',
      '5 visits per month',
      'Basic fitness tracking',
      'Standard support'
    ]
  },
  {
    name: 'Pro Pass',
    price: 79,
    features: [
      'Access to nationwide partner gyms',
      'Unlimited visits',
      'Advanced fitness tracking',
      'Priority support',
      'Guest passes (2/month)'
    ]
  },
  {
    name: 'Global Pass',
    price: 149,
    features: [
      'Access to worldwide partner gyms',
      'Unlimited visits',
      'Premium fitness tracking',
      '24/7 VIP support',
      'Guest passes (4/month)',
      'Personal trainer discounts'
    ]
  }
] as const;

export const FITNESS_GOALS = [
  'Weight Loss',
  'Muscle Gain',
  'Endurance',
  'Flexibility'
] as const;

export const AMENITY_CATEGORIES = [
  'equipment',
  'facility',
  'service'
] as const;