import bannerPostPng from "../../assets/images/banner-post.png";
import bannerPostWebp from "../../assets/images/banner-post(1).webp";
import grassPng from "../../assets/images/grass.png";
import grassWebp from "../../assets/images/grass.webp";
import arrowPng from "../../assets/images/arrow.png";
import React from "react";
import {
  CircleArrowRight,
  Images,
  MoveRight,
  Newspaper,
  ShoppingCart,
} from "lucide-react";
import { motion } from "framer-motion";
import GradientButton from "../../components/GradientButton";

const HeroSection = () => {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-[#fdf5f5] px-4 sm:px-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }} // Animates when 30% of the section is visible
    >
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between py-8 lg:py-20 max-w-7xl mx-auto w-full">
        {/* Left Content */}
        <div className="lg:w-1/2 w-full flex flex-col items-center lg:items-start space-y-6">
          <h1 className="text-5xl sm:text-4xl lg:text-6xl font-bold text-center lg:text-left">
            Create, Enhance, and <br className="hidden sm:block" />
            Showcase Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#BF1A1C] to-[#590C0D]">
              Brand!
            </span>
          </h1>
          <p className="text-lg text-gray-600 text-center lg:text-left">
            Your Vision, Crafted to Perfection
          </p>
          <div className="w-full flex justify-center lg:justify-start">
            <GradientButton text="Get Started" Icon={MoveRight} />
          </div>
          <p className="text-md text-gray-500 text-center lg:text-left max-w-md">
            Emphasizes customization and quality in delivering user-designed
            products.
          </p>
          {/* Icons Row with Arrows */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 w-full items-center">
            {[
              { icon: Newspaper, text: "Pick templates" },
              { icon: Images, text: "Customize your signs" },
              { icon: ShoppingCart, text: "Order your product" },
            ].map((item, index, array) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-[#BF1A1C] rounded-full flex items-center justify-center">
                    <item.icon size={28} className="text-[#BF1A1C]" />
                  </div>
                  <p className="text-xs sm:text-sm mt-2 text-center">
                    {item.text}
                  </p>
                </div>
                {/* Add arrow image between icons, but not after the last icon */}
                {index < array.length - 1 && (
                  <img
                    src={arrowPng} // Replace with your actual arrow image path
                    alt="Arrow"
                    className="w-8 sm:w-12 hidden sm:block" // Hide arrow on small screens
                  />
                )}
              </React.Fragment>
            ))}
          </div>{" "}
          <button className="font-bold py-2 rounded-lg text-lg flex items-center justify-center cursor-pointer w-full sm:w-auto hover:bg-gray-200 sm:hover:bg-transparent">
            Start New Design
            <motion.div
              className="ml-2"
              animate={{ x: [0, 10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
              <CircleArrowRight className="text-[#BF1A1C] w-6 h-6 sm:w-8 sm:h-8" />
            </motion.div>
          </button>
        </div>

  {/* Right Billboard with Fixed Sliding Images */}
        <div className="lg:w-1/2 relative hidden lg:block">
          <picture>
            <source srcSet={bannerPostWebp} type="image/webp" />
            <source srcSet={bannerPostPng} type="image/png" />
            <img
              src={bannerPostPng}
              className="w-full"
              alt="hero section banner Logo"
            />
          </picture>
          <picture className="absolute bottom-0 right-0 h-12">
            <source srcSet={grassWebp} type="image/webp" />
            <source srcSet={grassPng} type="image/png" />
            <img src={grassPng} alt="hero section banner Logo" />
          </picture>
          
          {/* Improved Sliding Content Container */}
          <div className="absolute top-[9%] left-[-1%] w-[87%] h-[48%] ">
            {/* Adding a perspective container */}
            <div className="relative w-full h-full" style={{
              perspective: '500px',
              transformStyle: 'preserve-3d'
            }}>
              {/* Image container with adjusted transform */}
              <div className="w-full h-full" style={{
                transform: 'rotateX(3deg) rotateY(-8deg) skewY(-8deg)',
                transformOrigin: 'center center'
              }}>
                <motion.img
                  src="https://www.picmaker.com/assets/images/postermaker/poster_maker_ogimage.png"
                  alt="Slide 1"
                  className="w-full h-full object-cover absolute top-0 left-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 2,
                    delay: 0,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 4,
                    ease: "easeInOut",
                  }}
                  style={{
                    backfaceVisibility: 'hidden'
                  }}
                />
                <motion.img
                  src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/323265237/original/5158009026e4637bb8dc93fea90065c1f5775797/design-product-advertisement-poster-and-social-media-ads.png"
                  alt="Slide 2"
                  className="w-full h-full object-cover absolute top-0 left-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 2,
                    delay: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 4,
                    ease: "easeInOut",
                  }}
                  style={{
                    backfaceVisibility: 'hidden'
                  }}
                />
                <motion.img
                  src="https://assets.designhill.com/design-blog/wp-content/uploads/2022/11/Top-5-Poster-Template-Designs-For-2025.jpg"
                  alt="Slide 3"
                  className="w-full h-full object-cover absolute top-0 left-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 2,
                    delay: 12,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 4,
                    ease: "easeInOut",
                  }}
                  style={{
                    backfaceVisibility: 'hidden'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
      );
};

export default HeroSection;