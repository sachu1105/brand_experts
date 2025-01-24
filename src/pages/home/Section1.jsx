import bannerPostPng from "../../assets/images/banner-post.png";
import bannerPostWebp from "../../assets/images/banner-post(1).webp";
import {
  CircleArrowRight,
  Images,
  MoveRight,
  Newspaper,
  ShoppingCart,
} from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }} // Animates when 30% of the section is visible
    >
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-8 py-12 lg:py-20 max-w-7xl mx-auto">
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            Create, Enhance, and <br />
            Showcase Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#BF1A1C] to-[#590C0D]">
              Brand!
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Your Vision, Crafted to Perfection
          </p>
          <button className="bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white py-2 px-6 rounded-lg text-lg mb-4 flex items-center justify-center">
            Get Started
            <MoveRight className="ml-2" />
          </button>
          <p className="text-sm text-gray-500 mb-6">
            Emphasizes customization and quality in delivering user-designed
            products.
          </p>
          {/* Icons Row */}
          <div className="flex justify-center lg:justify-start gap-6 mb-6">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-2 border-[#BF1A1C] rounded-full flex items-center justify-center">
                <Newspaper size={32} className="text-[#BF1A1C]" />
              </div>
              <p className="text-sm mt-2">Pick templates</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-2 border-[#BF1A1C] rounded-full flex items-center justify-center">
                <Images size={32} className="text-[#BF1A1C]" />
              </div>
              <p className="text-sm mt-2">customize your signs</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-2 border-[#BF1A1C] rounded-full flex items-center justify-center">
                <ShoppingCart size={32} className="text-[#BF1A1C]" />
              </div>
              <p className="text-sm mt-2">Order your product</p>
            </div>
          </div>
          <button className="font-bold py-2 rounded-lg text-lg flex items-center justify-center">
            Start New Design
            <motion.div
              className="ml-2"
              animate={{
                x: [0, 10, 0], // Moves left to right (x-axis)
              }}
              transition={{
                duration: 1.5, // Total animation duration
                repeat: Infinity, // Makes it loop infinitely
                repeatType: "loop", // Smooth looping
                ease: "easeInOut", // Easing function
              }}
            >
              <CircleArrowRight className="text-[#BF1A1C] w-8 h-8" />
            </motion.div>
          </button>
        </div>

        {/* Right Billboard with Sliding Images */}
        <div className="lg:w-1/2 relative">
          <picture>
            <source srcSet={bannerPostWebp} type="image/webp" />
            <source srcSet={bannerPostPng} type="image/png" />
            <img
              src={bannerPostPng} 
              className="" 
              alt="hero section banner Logo"
            />
          </picture>

          {/* Sliding Content */}
          <div className="absolute top-16 left-12 w-[80%] h-[100%] overflow-hidden transform skew-y-[-8deg]">
            <div className="sliding-content flex">
              <img
                src="https://www.picmaker.com/assets/images/postermaker/poster_maker_ogimage.png"
                alt="Slide 1"
                className="w-full h-full object-cover " // Match the skew with the billboard's angle
              />
              <img
                src="https://www.dochipo.com/wp-content/uploads/2021/06/How-to-Make-a-Music-Poster-1.png"
                alt="Slide 2"
                className="w-full h-full object-cover " // Match the skew with the billboard's angle
              />
              <img
                src="https://www.dochipo.com/wp-content/uploads/2022/07/25-Creative-Poster-Making-Ideas.png"
                alt="Slide 3"
                className="w-full h-full " // Match the skew with the billboard's angle
              />
            </div>
          </div>
        </div>
      </section>

      {/* CSS for sliding effect */}
      <style jsx>{`
        .sliding-content {
          animation: slide 12s linear infinite;
          display: flex;
        }

        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </motion.div>
  );
};

export default HeroSection;
