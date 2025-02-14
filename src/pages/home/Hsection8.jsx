import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GradientButton from "../../components/GradientButton";
import BrLogo from "../../assets/images/be_footer_logo (1).webp"; // Uncomment and use the logo
import { MoveRight } from "lucide-react";
import getStartedImage from "../../assets/images/getstrated.png";

function Hsection8() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row items-center justify-center bg-black px-4 py-8 md:py-10 gap-8 md:gap-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }} // Animates when 30% of the section is visible
    >
      <img
        src={getStartedImage}
        alt="Brand Experts Logo"
        className="w-48 h-32 md:w-56 md:h-36 lg:w-68 lg:h-44 object-contain hidden md:block"
      />
      <section className="text-center md:text-left">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-white">
          Get Started With{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#BF1A1C] to-[#a01618]">
            Brand Experts
          </span>
        </h2>
        <div className="w-full flex justify-center lg:justify-center">
          <GradientButton
            text="Sign Up"
            Icon={MoveRight}
            onClick={handleSignUp}
          />
        </div>
      </section>
      <img
        src={BrLogo}
        alt="Brand Experts Logo"
        className="w-48 h-32 md:w-56 md:h-36 lg:w-68 lg:h-44 object-contain"
      />
    </motion.div>
  );
}

export default Hsection8;
