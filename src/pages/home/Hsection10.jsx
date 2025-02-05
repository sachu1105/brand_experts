import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Johnson",
    position: "HR Director, TechInnovate Solutions",
    text: "Brand Experts made designing and ordering signs so easy! The quality of the vinyl lettering I ordered exceeded my expectations, and the delivery was super fast.",
    date: "Jan 3, 2025",
    rating: 5,
    image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  },
  {
    name: "John D",
    position: "Dean of Academic Affairs",
    text: "Absolutely loved the acrylic display I ordered for my home office! The design tool was so intuitive, and the final product looked even better than I imagined. Highly recommend Brand Experts!",
    date: "Dec 29, 2024",
    rating: 5,
    image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  },
  {
    name: "David",
    position: "CEO, EduCert Solutions",
    text: "The car decals I ordered for my business turned out perfect! Vibrant colors, durable material, and quick delivery. I'll definitely use Brand Experts again.",
    date: "Sep 6, 2024",
    rating: 5,
    image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  },
  {
    name: "Karen",
    position: "HR, EduCert Solutions",
    text: "The car decals I ordered for my business turned out perfect! Vibrant colors, durable material, and quick delivery. I'll definitely use Brand Experts again.",
    date: "Sep 6, 2024",
    rating:4 ,
    image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  }
];

const TestimonialSlider = () => {
  const [startIndex, setStartIndex] = useState(0);

  const slideLeft = () => {
    setStartIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const slideRight = () => {
    setStartIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="w-full bg-[#fdf5f5] py-16"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-8"
          variants={headerVariants}
        >
          <h2 className="text-3xl font-bold">what our client say about</h2>
          <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#BF1A1C] to-[#a01618]">
            Brand Experts
          </h3>
        </motion.div>

        <div className="relative">
          <div className="flex justify-end gap-2 mb-6 px-4">
            <button
              onClick={slideLeft}
              className="w-10 h-10 border-2 border-red-600 text-red-600 rounded-md flex items-center justify-center hover:bg-red-700 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={slideRight}
              className="w-10 h-10 border-2 border-red-600 text-red-600 rounded-md flex items-center justify-center hover:bg-red-700 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <motion.div className="overflow-hidden">
            <motion.div 
              className="flex gap-6"
              style={{
                transform: `translateX(-${startIndex * 33.33}%)`,
              }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="min-w-[300px] flex-1 bg-white rounded-lg p-6 shadow-md"
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-red-600"
                    />
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.position}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 text-sm">"{testimonial.text}"</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-sm">⭐</span>
                      ))}
                    </div>
                    <p className="text-gray-400 text-sm">{testimonial.date}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="text-center mt-12"
          variants={headerVariants}
        >
          <p className="text-lg mb-4">Join thousands of satisfied customers. Create your custom sign today!</p>
          <motion.button 
            className="bg-gradient-to-b from-[#BF1A1C] to-[#a01618] text-white px-8 py-3 rounded-lg font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Designing →
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default TestimonialSlider;