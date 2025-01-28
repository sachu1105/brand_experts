import { motion } from "framer-motion"
import { Facebook, Dribbble, Instagram, Twitter, Youtube, Linkedin, Github, Codepen } from 'lucide-react';

function Hsection9() {
  return (
    <motion.div
      className="flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }} // Animates when 30% of the section is visible
    >
      <section>
        <h2 className="text-3xl font-bold mt-10 text-center">More than <span className=" bg-clip-text text-transparent bg-gradient-to-r from-[#BF1A1C] to-[#a01618]">1000+</span>  companies trust <span className=" bg-clip-text text-transparent bg-gradient-to-r from-[#BF1A1C] to-[#a01618]"> Brand Experts</span></h2>
        <div className="w-full h-50 inline-flex flex-nowrap">
          <motion.ul
            className="flex items-center justify-center md:justify-start [&_li]:mx-12 [&_img]:max-w-none"
            animate={{ x: ["0%", "-40%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            {/* Original list items */}
            <li>
              <Facebook color="#808080" width={50} height={50} />
            </li>
            <li>
              <Dribbble color="#808080" width={50} height={50} />
            </li>
            <li>
              <Instagram color="#808080" width={50} height={50} />
            </li>
            <li>
              <Twitter color="#808080" width={50} height={50} />
            </li>
            <li>
              <Youtube color="#808080" width={50} height={50} />
            </li>
            <li>
              <Linkedin color="#808080" width={50} height={50} />
            </li>
            <li>
              <Github color="#808080" width={50} height={50} />
            </li>
            <li>
              <Codepen color="#808080" width={50} height={50} />
            </li>
            {/* Duplicate the list items to create a seamless loop */}
            <li>
              <Facebook color="#808080" width={50} height={50} />
            </li>
            <li>
              <Dribbble color="#808080" width={50} height={50} />
            </li>
            <li>
              <Instagram color="#808080" width={50} height={50} />
            </li>
            <li>
              <Twitter color="#808080" width={50} height={50} />
            </li>
            <li>
              <Youtube color="#808080" width={50} height={50} />
            </li>
            <li>
              <Linkedin color="#808080" width={50} height={50} />
            </li>
            <li>
              <Github color="#808080" width={50} height={50} />
            </li>
            <li>
              <Codepen color="#808080" width={50} height={50} />
            </li>
          </motion.ul>
        </div>
      </section>
    </motion.div>
  )
}

export default Hsection9