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
import GradientButton from "../../components/GradientButton";

const Hsection4 = () => {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center "
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
          <GradientButton text="Get Started" Icon={MoveRight} />
          <p className="text-md text-gray-500 mb-6">
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
          <button className="font-bold py-2 rounded-lg text-lg flex items-center justify-center cursor-pointer">
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

        </div>
      </section>


    </motion.div>
  );
};

export default Hsection4;
