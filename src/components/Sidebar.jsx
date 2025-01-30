import { ChevronDown, ChevronUp, Plus, X } from 'lucide-react';
import { useState } from 'react';

const Sidebar = ({ categories, activeCategory, setActiveCategory, isCollapsed, toggleSidebar }) => {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (categoryId) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  return (
    <div className={`fixed inset-0 z-50 bg-white transform ${isCollapsed ? '-translate-x-full' : 'translate-x-0'} transition-transform duration-300 md:relative md:translate-x-0 md:w-64 border-r border-gray-200`}>
      <div className="p-4 flex justify-between items-center md:hidden">
        <button className="flex items-center justify-center w-full px-4 py-2 bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white rounded-md">
          <Plus className="w-4 h-4 mr-2" />
          Create a design
        </button>
        <button onClick={toggleSidebar} className="ml-4">
          <X className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      <div className="p-4 hidden md:block">
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
            <div key={category.id}>
              <button
                onClick={() => toggleCategory(category.id)}
                className="flex items-center justify-between w-full px-2 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <span className="mr-2">{category.icon}</span>
                  <span>{category.name}</span>
                </div>
                {openCategory === category.id ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {openCategory === category.id && (
                <div className="pl-6 mt-2 space-y-1">
                  {/* Add subcategories or options here */}
                  <button
                    onClick={() => setActiveCategory(`${category.id}-option1`)}
                    className="block w-full text-left px-2 py-1 text-sm text-gray-700 rounded-md hover:bg-gray-100"
                  >
                    Option 1
                  </button>
                  <button
                    onClick={() => setActiveCategory(`${category.id}-option2`)}
                    className="block w-full text-left px-2 py-1 text-sm text-gray-700 rounded-md hover:bg-gray-100"
                  >
                    Option 2
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
