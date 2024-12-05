import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const [isLocating, setIsLocating] = useState(false);

  const handleLocationClick = () => {
    setIsLocating(true);
    // Simulate getting user location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, you would convert coordinates to address
        onChange("Current Location");
        setIsLocating(false);
      },
      (error) => {
        console.error(error);
        setIsLocating(false);
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto"
    >
      <div className="relative">
        <input
          type="text"
          placeholder="Enter your location or zip code"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 pl-12 pr-32 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        <button
          onClick={handleLocationClick}
          disabled={isLocating}
          className="absolute right-3 top-2 px-3 py-1.5 bg-purple-100 text-purple-600 rounded-md flex items-center hover:bg-purple-200 transition-colors"
        >
          <MapPin className="h-4 w-4 mr-1" />
          {isLocating ? 'Locating...' : 'Use Current'}
        </button>
      </div>
    </motion.div>
  );
}