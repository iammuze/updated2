import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface Amenity {
  id: string;
  name: string;
  description: string;
  category: 'equipment' | 'facility' | 'service';
}

export function AmenitiesSection() {
  const [amenities, setAmenities] = useState<Amenity[]>([
    {
      id: '1',
      name: 'Cardio Equipment',
      description: 'Modern treadmills, ellipticals, and bikes',
      category: 'equipment'
    },
    {
      id: '2',
      name: 'Locker Rooms',
      description: 'Secure lockers with shower facilities',
      category: 'facility'
    }
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newAmenity, setNewAmenity] = useState({
    name: '',
    description: '',
    category: 'equipment' as const
  });

  const handleAdd = () => {
    if (!newAmenity.name || !newAmenity.description) {
      toast.error('Please fill in all fields');
      return;
    }

    setAmenities([
      ...amenities,
      {
        id: Date.now().toString(),
        ...newAmenity
      }
    ]);
    setNewAmenity({
      name: '',
      description: '',
      category: 'equipment'
    });
    setIsAdding(false);
    toast.success('Amenity added successfully');
  };

  const handleEdit = (amenity: Amenity) => {
    const updatedAmenities = amenities.map(a => 
      a.id === editingId ? amenity : a
    );
    setAmenities(updatedAmenities);
    setEditingId(null);
    toast.success('Amenity updated successfully');
  };

  const handleDelete = (id: string) => {
    setAmenities(amenities.filter(a => a.id !== id));
    toast.success('Amenity deleted successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Gym Amenities</h3>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center text-sm text-purple-600 hover:text-purple-700"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Amenity
        </button>
      </div>

      {/* Add New Amenity Form */}
      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 p-4 rounded-lg space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={newAmenity.name}
              onChange={(e) => setNewAmenity({ ...newAmenity, name: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              value={newAmenity.description}
              onChange={(e) => setNewAmenity({ ...newAmenity, description: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={newAmenity.category}
              onChange={(e) => setNewAmenity({ ...newAmenity, category: e.target.value as any })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            >
              <option value="equipment">Equipment</option>
              <option value="facility">Facility</option>
              <option value="service">Service</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
            >
              Add
            </button>
          </div>
        </motion.div>
      )}

      {/* Amenities List */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {amenities.map((amenity) => (
          <motion.div
            key={amenity.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-4 rounded-lg border shadow-sm"
          >
            {editingId === amenity.id ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={amenity.name}
                  onChange={(e) => setAmenities(amenities.map(a => 
                    a.id === amenity.id ? { ...a, name: e.target.value } : a
                  ))}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                />
                <input
                  type="text"
                  value={amenity.description}
                  onChange={(e) => setAmenities(amenities.map(a => 
                    a.id === amenity.id ? { ...a, description: e.target.value } : a
                  ))}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                />
                <select
                  value={amenity.category}
                  onChange={(e) => setAmenities(amenities.map(a => 
                    a.id === amenity.id ? { ...a, category: e.target.value as any } : a
                  ))}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                >
                  <option value="equipment">Equipment</option>
                  <option value="facility">Facility</option>
                  <option value="service">Service</option>
                </select>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setEditingId(null)}
                    className="p-1 text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(amenity)}
                    className="p-1 text-green-600 hover:text-green-700"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{amenity.name}</h4>
                    <p className="text-sm text-gray-500">{amenity.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingId(amenity.id)}
                      className="p-1 text-gray-400 hover:text-gray-500"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(amenity.id)}
                      className="p-1 text-red-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 mt-2">
                  {amenity.category}
                </span>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}