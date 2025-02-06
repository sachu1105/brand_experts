import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Hsection5 = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: false, // Changed from true to false
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const cards = [
    {
      image:
        "https://lh4.googleusercontent.com/proxy/yi6Zo7N91GkEVPbpSf_TZ1naePahB-n8LRzDymlVImoZUKDhQWT5JSKhb12h85h4wYDznapEkSrMhAeykLEiuVwkS3wMFaZd3riOMvRp1KEiVVvokwOtAUwWzUKsw3KzGjtrLTs",
      text: "Acrylic Signs",
      paragraph:
        "Enhance your brand’s visibility at every business meet-up and event with 4-sided custom logo table covers. This product will impress attendees and capture their attention thanks to its vibrant visuals.",
    },
    {
      image:
        "https://cdn.squaresigns.com/images/media/brushed-aluminum-room-sign.jpg",
      text: "Aluminum Signs",
      paragraph:
        "Our custom postcard printing is perfect for businesses looking to add a personal, high-impact touch to their communication, incorporating vibrant colors, premium materials, and full customization.",
    },
    {
      image: "https://cdn.squaresigns.com/images/products/slider/Foam-Board-Signs-Slider-6.jpg",
      text: "Foam Board Signs",
      paragraph:
        "Lightweight, budget-friendly and easy-to-use realtor signs will promote your house listings with style, be it rain or shine.",
    },
  ];

  return (
    <motion.div
      className="bg-[#fdf5f5] relative "
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <section className="overflow-hidden p-4 relative ">
        <div className="flex justify-between items-center absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-4 z-10 ">
          <button
            onClick={() => sliderRef.current.slickPrev()}
            className="bg-red-200 text-white p-2 rounded-full cursor-pointer hover:bg-red-500 transition transform hover:scale-105"
          >
            <FaArrowLeft size={20} />
          </button>
          <button
            onClick={() => sliderRef.current.slickNext()}
            className="bg-red-200 text-white p-2 rounded-full cursor-pointer hover:bg-red-500 transition transform hover:scale-105"
          >
            <FaArrowRight size={20} />
          </button>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">
        Top Commercial Signs
        </h2>
        <Slider ref={sliderRef} {...settings} className="mb-4">
          {cards.map((card, index) => (
            <div key={index} className="px-2">
              <div className="bg-white rounded-lg shadow-2xl  w-[400px] h-[350px] flex flex-col justify-between mx-auto mb-4">
                <img
                  src={card.image}
                  alt={card.text}
                  className="w-full h-1/2 object-cover mb-4 rounded-t-lg"
                />
                <div className="flex-grow p-4">
                  <p className=" text-xl font-black mb-2 text-gray-700">{card.text}</p>
                  <p className=" text-sm text-gray-600">{card.paragraph}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>
    </motion.div>
  );
};

export default Hsection5;
