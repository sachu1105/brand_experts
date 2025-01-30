import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar'; // Import Sidebar component
import { motion } from 'framer-motion';
import { Briefcase, Paintbrush, Book, Calendar, Gift, Info, Shield, Leaf, Home, PenTool, Menu, SidebarOpen } from 'lucide-react';

const DesignEditor = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedNavItem, setSelectedNavItem] = useState('Banners & displays');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false);
  
  const categories = [
    { id: 'business', name: 'Business', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'decoration', name: 'Decoration', icon: <Paintbrush className="w-4 h-4" /> },
    { id: 'education', name: 'Education', icon: <Book className="w-4 h-4" /> },
    { id: 'events', name: 'Events', icon: <Calendar className="w-4 h-4" /> },
    { id: 'holiday', name: 'Holiday', icon: <Gift className="w-4 h-4" /> },
    { id: 'informative', name: 'Informative', icon: <Info className="w-4 h-4" /> },
    { id: 'public-safety', name: 'Public safety & politics', icon: <Shield className="w-4 h-4" /> },
    { id: 'nature', name: 'Nature', icon: <Leaf className="w-4 h-4" /> },
    { id: 'real-estate', name: 'Real estate', icon: <Home className="w-4 h-4" /> },
    { id: 'stationary', name: 'Stationary', icon: <PenTool className="w-4 h-4" /> }
  ];

  const categoryCards = [
    { id: 'beauty', title: 'Beauty/Wellness', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMCaxYh9JWTAp5_a1G8RLDUBLPhApMLyzdyw&s' },
    { id: 'healthcare', title: 'Healthcare', image: 'https://media.istockphoto.com/id/1396691293/photo/medical-worker-helping-his-patient-to-move-around-the-apartment.jpg?s=612x612&w=0&k=20&c=r4aZgevNk3sWIo7J53egzcNjF1GGhVnImWJusttHLAA=' },
    { id: 'interior', title: 'Interior decoration', image: 'https://media.istockphoto.com/id/1824615178/photo/interior-design-of-modern-apartment-with-colorful-dark-walls-and-orange-sofa-interior-mockup.jpg?s=612x612&w=0&k=20&c=iYt26CAed3m48RWN63aJGXe0t_3FaKMFBEy_DigJb4w=' },
    { id: 'school', title: 'School', image: 'https://allonehealth.com/wp-content/uploads/2022/07/iStock-1358014313-scaled-1.jpg' },
    { id: 'birthday', title: 'Birthday', image: 'https://hips.hearstapps.com/hmg-prod/images/mid-adult-woman-lighting-the-candles-for-her-royalty-free-image-1735851427.pjpeg?crop=0.670xw:1.00xh;0.277xw,0&resize=1200:*' },
    
  ];

  const categoryCards2 = [
    { id: 'beauty', title: 'Beauty/Wellness', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMCaxYh9JWTAp5_a1G8RLDUBLPhApMLyzdyw&s' },
    { id: 'healthcare', title: 'Healthcare', image: 'https://media.istockphoto.com/id/1396691293/photo/medical-worker-helping-his-patient-to-move-around-the-apartment.jpg?s=612x612&w=0&k=20&c=r4aZgevNk3sWIo7J53egzcNjF1GGhVnImWJusttHLAA=' },
    { id: 'interior', title: 'Interior decoration', image: 'https://media.istockphoto.com/id/1824615178/photo/interior-design-of-modern-apartment-with-colorful-dark-walls-and-orange-sofa-interior-mockup.jpg?s=612x612&w=0&k=20&c=iYt26CAed3m48RWN63aJGXe0t_3FaKMFBEy_DigJb4w=' },
    { id: 'school', title: 'School', image: 'https://allonehealth.com/wp-content/uploads/2022/07/iStock-1358014313-scaled-1.jpg' },
    { id: 'birthday', title: 'Birthday', image: 'https://hips.hearstapps.com/hmg-prod/images/mid-adult-woman-lighting-the-candles-for-her-royalty-free-image-1735851427.pjpeg?crop=0.670xw:1.00xh;0.277xw,0&resize=1200:*' },
    
  ];

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleNavDropdown = () => {
    setIsNavDropdownOpen(!isNavDropdownOpen);
  };

  return (
    <motion.div
    className=""
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true, amount: 0.3 }} // Animates when 30% of the section is visible
    >
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <Sidebar 
        categories={categories} 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <div className="border-b border-gray-200 flex justify-between items-center px-4 py-2">
          <button onClick={toggleSidebar} className="md:hidden">
            <SidebarOpen className="w-6 h-6 text-gray-700" />
          </button>
          <div className="hidden md:flex flex-wrap space-x-4">
            {['Banners & displays', 'Rigid signs', 'Decals & magnets', 'Trade Shows & Events', 
              'Office Signs', 'Outdoor Signs', 'Photo & Décor', 'Wedding & parties'].map((item) => (
              <button
                key={item}
                className={`px-3 py-2 text-sm ${selectedNavItem === item ? 'text-red-600 border border-red-800' : 'text-gray-700 hover:text-white hover:bg-red-800'} rounded-md`}
                onClick={() => setSelectedNavItem(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="md:hidden relative">
            <button onClick={toggleNavDropdown} className="px-3 py-2 text-sm text-gray-700 hover:text-white hover:bg-red-800 rounded-md">
              Menu
            </button>
            {isNavDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                {['Banners & displays', 'Rigid signs', 'Decals & magnets', 'Trade Shows & Events', 
                  'Office Signs', 'Outdoor Signs', 'Photo & Décor', 'Wedding & parties'].map((item) => (
                  <button
                    key={item}
                    className={`block w-full text-left px-4 py-2 text-sm ${selectedNavItem === item ? 'text-red-600' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => {
                      setSelectedNavItem(item);
                      setIsNavDropdownOpen(false);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-pink-100 to-blue-100 p-8 m-4 rounded-lg">
          <h1 className="text-3xl font-bold mb-2">Design Your Vision:<br />Explore Templates That Inspire!</h1>
          <p className="text-gray-700 mb-4">Choose from a variety of customizable templates crafted for every need.</p>
          <button className="px-4 py-2 bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white rounded-md">Design now</button>
        </div>

        {/* Category Grid */}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Browse by category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoryCards.map((card) => (
              <div key={card.id} className="relative group cursor-pointer">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent rounded-b-lg">
                  <h3 className="text-white text-sm font-medium">{card.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Business</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoryCards2.map((card) => (
              <div key={card.id} className="relative group cursor-pointer">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent rounded-b-lg">
                  <h3 className="text-white text-sm font-medium">{card.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </motion.div>
  );
};

export default DesignEditor;