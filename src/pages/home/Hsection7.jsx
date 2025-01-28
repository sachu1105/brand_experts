import React from 'react';
import { LayoutTemplate, Paintbrush, Building2, FileStack, Headphones, Maximize } from 'lucide-react';

const ModernFeaturesGrid = () => {
  const features = [
    {
      icon: Paintbrush,
      title: 'Free Design Tool',
      description: 'Unleash your inner artist with our easy-to-use design tool featuring simple drag and drop elements for signs.'
    },
    {
      icon: LayoutTemplate,
      title: '90+ Types of Signs',
      description: 'When we say we offer every visual communication tool for branding and personal use, we mean it! Select your medium and make custom signs in minutes.'
    },
    {
      icon: Building2,
      title: 'Corporate Offers',
      description: 'We provide professional support for brand design and printing for small businesses. Need to order signs to promote your company? We re here for you.'
    },
    {
      icon: FileStack,
      title: '2000+ Templates',
      description: 'Select your favorite templates from various categories and restyle the signs until they suit your taste. Find your inner sign creator online.'
    },
    {
      icon: Headphones,
      title: 'Customer Service',
      description: 'As a customer-centric company, we provide top-of-the-line services by working closely with our clients. Get creative with our intuitive sign design tool.'
    },
    {
      icon: Maximize,
      title: 'Customizable Sizes',
      description: 'Forget the standard sizes offered on other platforms. At Brand Experts, we re not limiting you to fixed products. Modify the size of almost every medium.'
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Features
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white rounded-lg p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="h-12 w-12 rounded-lg bg-red-50 p-2 mb-4 group-hover:bg-red-100 transition-colors duration-300">
                <feature.icon 
                  className="h-8 w-8 text-red-600" 
                />
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed mb-4">
                {feature.description}
              </p>
              
              <div className="flex items-center text-sm font-medium text-red-600 hover:text-red-500 transition-colors duration-300 cursor-pointer">
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModernFeaturesGrid;