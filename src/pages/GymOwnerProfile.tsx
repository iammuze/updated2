import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Building2, MapPin, Phone, Mail, Globe, Instagram, Facebook, Twitter } from 'lucide-react';
import { useGymOwnerStore } from '../store/gym-owner-store';
import { AmenitiesSection } from '../components/gym/AmenitiesSection';
import toast from 'react-hot-toast';

export function GymOwnerProfile() {
  const { owner } = useGymOwnerStore();
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop');
  const [gymImages, setGymImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&auto=format&fit=crop'
  ]);
  const [socialLinks, setSocialLinks] = useState({
    instagram: '',
    facebook: '',
    twitter: ''
  });

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        toast.success('Profile picture updated successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGymImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          if (newImages.length === files.length) {
            setGymImages([...gymImages, ...newImages]);
            toast.success('Gym images uploaded successfully');
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSocialLinkUpdate = (platform: keyof typeof socialLinks, value: string) => {
    setSocialLinks(prev => ({
      ...prev,
      [platform]: value
    }));
    toast.success(`${platform} link updated successfully`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          {/* Profile Header */}
          <div className="relative h-48 bg-purple-600">
            <div className="absolute -bottom-12 left-8">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-white object-cover"
                />
                <label className="absolute bottom-0 right-0 bg-purple-500 rounded-full p-2 cursor-pointer hover:bg-purple-600 transition-colors">
                  <Camera className="h-4 w-4 text-white" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="p-6 pt-16 space-y-8">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex items-center space-x-3">
                  <Building2 className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">{owner?.gymName || 'FitZone Elite'}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">123 Main St, New York, NY</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">+1 234 567 890</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">{owner?.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">www.fitzoneelite.com</span>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Social Media</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Instagram className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={socialLinks.instagram}
                    onChange={(e) => handleSocialLinkUpdate('instagram', e.target.value)}
                    placeholder="Instagram profile URL"
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <Facebook className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={socialLinks.facebook}
                    onChange={(e) => handleSocialLinkUpdate('facebook', e.target.value)}
                    placeholder="Facebook profile URL"
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <Twitter className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={socialLinks.twitter}
                    onChange={(e) => handleSocialLinkUpdate('twitter', e.target.value)}
                    placeholder="Twitter profile URL"
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Gym Photos */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Gym Photos</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {gymImages.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={image}
                      alt={`Gym photo ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
                <label className="relative aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-purple-500">
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <span className="mt-2 block text-sm font-medium text-gray-600">
                      Add Photo
                    </span>
                  </div>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    accept="image/*"
                    onChange={handleGymImageUpload}
                  />
                </label>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="border-t pt-6">
              <AmenitiesSection />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}