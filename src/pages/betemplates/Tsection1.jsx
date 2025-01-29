import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar'; // Import Sidebar component

const DesignEditor = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  
  const categories = [
    { id: 'business', name: 'Business', icon: '💼' },
    { id: 'decoration', name: 'Decoration', icon: '🎨' },
    { id: 'education', name: 'Education', icon: '📚' },
    { id: 'events', name: 'Events', icon: '🎉' },
    { id: 'holiday', name: 'Holiday', icon: '🎄' },
    { id: 'informative', name: 'Informative', icon: 'ℹ️' },
    { id: 'public-safety', name: 'Public safety & politics', icon: '🚨' },
    { id: 'nature', name: 'Nature', icon: '🌿' },
    { id: 'real-estate', name: 'Real estate', icon: '🏠' },
    { id: 'stationary', name: 'Stationary', icon: '📝' }
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
  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <Sidebar 
        categories={categories} 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-4 px-4 py-2">
            {['Banners & displays', 'Rigid signs', 'Decals & magnets', 'Trade Shows & Events', 
              'Office Signs', 'Outdoor Signs', 'Photo & Décor', 'Wedding & parties'].map((item) => (
              <button
                key={item}
                className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                {item}
              </button>
            ))}
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
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
  );
};

export default DesignEditor;