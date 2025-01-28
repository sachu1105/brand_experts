import { motion } from "framer-motion"
import GradientButton from "../../components/GradientButton";
import BrLogo from "../../assets/images/be_footer_logo (1).webp" // Uncomment and use the logo
import {MoveRight} from "lucide-react"
function Hsection8() {
  return (
    <motion.div
      className="flex items-center justify-center bg-black"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }} // Animates when 30% of the section is visible
    >
      <section className="text-center py-10 ">
        <h2 className="text-3xl font-bold mb-6 text-white">Get Started With <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#BF1A1C] to-[#a01618]">Brand Experts</span></h2>
        <GradientButton text="Sign Up" Icon={MoveRight}/>
      </section>
      <img src={BrLogo} alt="Brand Experts Logo" className="ml-96 w-68 h-44" /> {/* Adjusted size */}

    </motion.div>
  )
}

export default Hsection8