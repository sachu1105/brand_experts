import React from 'react';
import { ChevronDown, Plus } from 'lucide-react';

const Sidebar = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="w-64 border-r border-gray-200 bg-white">
      <div className="p-4">
        <button className="flex items-center justify-center w-full px-4 py-2 bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white rounded-md">
          <Plus className="w-4 h-4 mr-2" />
          Create a design
        </button>
      </div>

      <div className="px-3 py-2">
        <h2 className="text-sm font-semibold mb-2">Choose template category</h2>
        <div className="text-sm font-medium text-gray-900">All templates</div>
        
        <div className="mt-4 space-y-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className="flex items-center justify-between w-full px-2 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100"
            >
              <div className="flex items-center">
                <span className="mr-2">{category.icon}</span>
                <span>{category.name}</span>
              </div>
              <ChevronDown className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
