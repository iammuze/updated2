// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  membershipType: string;
}

// Gym Types
export interface Gym {
  id: number;
  name: string;
  address: string;
  distance: string;
  rating: number;
  totalRatings: number;
  hours: string;
  image: string;
  amenities: string[];
}

// Membership Types
export interface MembershipPlan {
  name: string;
  price: number;
  features: string[];
}

// Form Types
export interface BankAccountFormData {
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  confirmAccountNumber: string;
  ifscCode: string;
}