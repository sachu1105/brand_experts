import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
const Hsection5 = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  const cards = [
    {
      image:
        "https://d3mbwbgtcl4x70.cloudfront.net/Ombre_Elegance_08ec1c43a1.webp",
      text: "Card 1",
      paragraph:
        "Take memorable photos with our custom selfie frames which will be a trendy addition to your event. Personalize a selfie board on our website by choosing the size, orientation and other options.",
    },
    {
      image:
        "https://www.nerolac.com/sites/default/files/2024-03/Guide-to-Creating-a-3D-Wall-Painting-in-Your-Bedroom.webp",
      text: "Card 2",
      paragraph:
        "Enhance your brand’s visibility at every business meet-up and event with 4-sided custom logo table covers. This product will impress attendees and capture their attention thanks to its vibrant visuals.",
    },
    {
      image: "https://m.media-amazon.com/images/I/714670ZsDTL.jpg",
      text: "Card 3",
      paragraph:
        "Our custom postcard printing is perfect for businesses looking to add a personal, high-impact touch to their communication, incorporating vibrant colors, premium materials, and full customization.",
    },
    {
      image:
        "https://d3mbwbgtcl4x70.cloudfront.net/Ombre_Elegance_08ec1c43a1.webp",
      text: "Card 4",
      paragraph:
        "Our custom postcard printing is perfect for businesses looking to add a personal, high-impact touch to their communication, incorporating vibrant colors, premium materials, and full customization.Our custom postcard printing is perfect for businesses looking to add a personal, high-impact touch to their communication, incorporating vibrant colors, premium materials, and full customization.bwbgtcl4x70.cloudfront.net/Ombre_Elegance_08ec1c43a1.webp",
      text: "Card 5",
      paragraph:
        "Our custom postcard printing is perfect for businesses looking to add a personal, high-impact touch to their communication, incorporating vibrant colors, premium materials, and full customization.",
    },
    {
      image:
        "https://d3mbwbgtcl4x70.cloudfront.net/Ombre_Elegance_08ec1c43a1.webp",
      text: "Card 6",
      paragraph:
        "Our custom postcard printing is perfect for businesses looking to add a personal, high-impact touch to their communication, incorporating vibrant colors, premium materials, and full customization.",
    },
  ];
  return (
    <motion.div
    className="bg-[#fdf5f5]"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true, amount: 0.3 }} // Animates when 30% of the section is visible
  >
    <section className="overflow-hidden">
    <div className="hsection3  py-8 overflow-hidden">
      {" "}
      <h2 className="text-2xl font-bold text-center mb-6">
      Top Commercial Signs
      </h2>{" "}
      <Slider {...settings}>
        {" "}
        {cards.map((card, index) => (
          <div key={index} className="p-4">
            {" "}
            <div className="bg-white rounded-lg shadow-lg p-4">
              {" "}
              <img
                src={card.image}
                alt={card.text}
                className="w-full h-48 object-cover rounded-md mb-4"
              />{" "}
              <p className="text-center font-black">{card.text}</p>{" "}
              <p className="text-center text-gray-600 ">{card.paragraph}</p>{" "}
            </div>{" "}
          </div>
        ))}{" "}
      </Slider>{" "}
    </div>
    </section>
  </motion.div>
  );
};
export default Hsection5;
