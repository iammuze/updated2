import React from 'react';
import { MapPin, Clock, Dumbbell, Star, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GymCardProps {
  gym: {
    id: number;
    name: string;
    address: string;
    distance: string;
    rating: number;
    totalRatings: number;
    hours: string;
    image: string;
    amenities: string[];
  };
  index: number;
}

export function GymCard({ gym, index }: GymCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative h-48">
        <img
          src={gym.image}
          alt={gym.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md flex items-center shadow-md">
          <Star className="h-4 w-4 text-yellow-400 mr-1" />
          <span className="font-medium">{gym.rating}</span>
          <span className="text-gray-500 text-sm ml-1">({gym.totalRatings})</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{gym.name}</h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{gym.address}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">{gym.hours}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span className="text-sm">{gym.distance} away</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {gym.amenities.map((amenity, i) => (
            <span
              key={i}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
            >
              {amenity}
            </span>
          ))}
        </div>
        <button
          className={cn(
            "w-full flex items-center justify-center px-4 py-2 border border-transparent",
            "text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          )}
        >
          <Dumbbell className="h-4 w-4 mr-2" />
          View Details
        </button>
      </div>
    </motion.div>
  );
}