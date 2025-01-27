import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Add this import

const Hsection3 = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  const cards = [
    { 
      image: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
      title: 'Custom Selfie Frames',
      paragraph: 'Take memorable photos with our custom selfie frames which will be a trendy addition to your event. Personalize a selfie board on our website by choosing the size, orientation and other options.',
    },
    {
      image: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
      title: 'Logo Table Covers',
      paragraph: 'Enhance your brands visibility at every business meet-up and event with 4-sided custom logo table covers. This product will impress attendees and capture their attention thanks to its vibrant visuals.',
    },
    {
      image: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
      title: 'Custom Postcards',
      paragraph: 'Our custom postcard printing is perfect for businesses looking to add a personal, high-impact touch to their communication, incorporating vibrant colors, premium materials, and full customization.',
    },
    {
        image: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
        title: 'Custom Postcards',
        paragraph: 'Our custom postcard printing is perfect for businesses looking to add a personal, high-impact touch to their communication, incorporating vibrant colors, premium materials, and full customization.',
      },
      {
        image: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
        title: 'Custom Postcards',
        paragraph: 'Our custom postcard printing is perfect for businesses looking to add a personal, high-impact touch to their communication, incorporating vibrant colors, premium materials, and full customization.',
      },
      {
        image: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
        title: 'Custom Postcards',
        paragraph: 'Our custom postcard printing is perfect for businesses looking to add a personal, high-impact touch to their communication, incorporating vibrant colors, premium materials, and full customization.',
      },
  ];

  return (
  <motion.div
    className=""
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true, amount: 0.3 }} // Animates when 30% of the section is visible
  >
    <section>
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          What's New and Trendy
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:scale-105"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {card.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {card.paragraph}
                </p>
                
                <div className="mt-6">
                  <button className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-300">
                    Learn More
                    <svg
                      className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 ${
                  activeIndex === index ? 'opacity-100' : ''
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
    </section>
    </motion.div>
  );
};

export default Hsection3;