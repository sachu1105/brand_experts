import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
// import GradientButton from "../../components/GradientButton";
const testimonials = [
  {
    name: "Sarah Johnson",
    position: "HR Director, TechInnovate Solutions",
    text: "Brand Experts made designing and ordering signs so easy! The quality of the vinyl lettering I ordered exceeded my expectations, and the delivery was super fast.",
    date: "Jan 3, 2025",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "John D",
    position: "Dean of Academic Affairs",
    text: "Absolutely loved the acrylic display I ordered for my home office! The design tool was so intuitive, and the final product looked even better than I imagined. Highly recommend Brand Experts!",
    date: "Dec 29, 2024",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "David",
    position: "CEO, EduCert Solutions",
    text: "The car decals I ordered for my business turned out perfect! Vibrant colors, durable material, and quick delivery. I'll definitely use Brand Experts again.",
    date: "Sep 6, 2024",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
];

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <motion.div
      className="flex items-center justify-center overflow-hidden bg-[#fdf5f5]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }} // Animates when 30% of the section is visible
    >
    <section>
    <div className="bg-[#fdf5f5] p-10 text-center">
      <h2 className="text-3xl font-bold">what our client say about</h2>
      <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-[#BF1A1C] to-[#a01618] text-4xl font-extrabold mb-6">Brand Experts</h3>
      <div className="relative flex justify-center items-center">
        <button className="absolute left-0 p-3 bg-red-600 text-white rounded-full" onClick={prevTestimonial}>
          <FaArrowLeft />
        </button>
        <div className="bg-white shadow-lg p-6 rounded-xl max-w-md text-left flex flex-col items-center">
          <img
            src={testimonials[currentIndex].image}
            alt={testimonials[currentIndex].name}
            className="w-16 h-16 rounded-full border-2 border-red-600 mb-3"
          />
          <h4 className="font-bold text-lg">{testimonials[currentIndex].name}</h4>
          <p className="text-sm text-gray-500">{testimonials[currentIndex].position}</p>
          <p className="mt-3 text-center">"{testimonials[currentIndex].text}"</p>
          <div className="flex mt-3 text-yellow-500">
            {Array.from({ length: testimonials[currentIndex].rating }, (_, i) => (
              <span key={i}>⭐</span>
            ))}
          </div>
          <p className="text-sm text-gray-400 mt-2">{testimonials[currentIndex].date}</p>
        </div>
        <button className="absolute right-0 p-3 bg-red-600 text-white rounded-full" onClick={nextTestimonial}>
          <FaArrowRight />
        </button>
      </div>
      <p className="mt-6">Join thousands of satisfied customers. Create your custom sign today!</p>
      <button className="mt-4 bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white px-6 py-3 rounded-lg text-lg font-bold">
        Start Designing →
      </button>
    </div>
</section>
</motion.div>
  );
}
