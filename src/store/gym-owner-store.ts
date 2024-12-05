import { create } from 'zustand';
import { gymOwners } from '../data/gymOwners';

interface GymOwner {
  id: number;
  email: string;
  gymId: number;
  name: string;
  gymName: string;
}

interface GymOwnerState {
  owner: GymOwner | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useGymOwnerStore = create<GymOwnerState>((set) => ({
  owner: null,
  isAuthenticated: false,
  login: (email, password) => {
    const owner = gymOwners.find(
      (o) => o.email === email && o.password === password
    );
    
    if (owner) {
      const { password: _, ...ownerData } = owner;
      set({ owner: ownerData, isAuthenticated: true });
      return true;
    }
    return false;
  },
  logout: () => set({ owner: null, isAuthenticated: false }),
}));