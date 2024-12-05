import React, { useState } from 'react';
import { SearchBar } from '../components/gym/SearchBar';
import { GymCard } from '../components/gym/GymCard';
import { gyms } from '../data/gyms';

export function FindGym() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGyms = gyms.filter(gym => 
    gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    gym.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Section */}
        <div className="mb-12">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {/* Gym List */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredGyms.map((gym, index) => (
            <GymCard key={gym.id} gym={gym} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}