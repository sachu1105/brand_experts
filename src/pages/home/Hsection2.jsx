import GradientButton from "../../components/GradientButton";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion"; // Add this import

const Hsection2 = () => {
  return (
  <motion.div
    className=""
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true, amount: 0.3 }} // Animates when 30% of the section is visible
  >
    <section className="min-h-[50vh] flex flex-col lg:flex-row items-center justify-between px-8 py-8 lg:py-12 max-w-7xl mx-auto gap-8 overflow-hidden">
      {/* Product Card */}
      <div className="max-w-xl bg-white rounded-lg shadow-lg border-2 border-gray-200 ">
        <div className="flex flex-col sm:flex-row">
          {/* Left side - Image */}
          <div className="sm:w-1/3 p-4">
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <img
                src="https://www.shutterstock.com/image-vector/set-3-minimalist-wall-art-260nw-2317980909.jpg"
                alt="Acrylic Photo Print"
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="sm:w-2/3 p-4">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold">Acrylic Photo Prints</h2>
              <span className="text-lg font-bold text-red-600">$99.99</span>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Custom acrylic prints for indoor/outdoor use
            </p>

            <div className="space-y-2">
              <div>
                <label htmlFor="standard-size" className="block text-sm font-medium text-gray-700 mb-1">
                  Standard Size
                </label>
                <input
                  id="standard-size"
                  type="text"
                  placeholder="Select size"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Size
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Width"
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Height"
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  placeholder="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h1 className="text-3xl lg:text-5xl font-bold mb-4">
          Craft Your Style, Ship Your Smile!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Create a custom sign on state-of-the-art acrylic materials perfect for branding or personal use in indoor and outdoor settings.
        </p>
        <div className="w-full flex justify-center lg:justify-start">

        <GradientButton text="Design Now" Icon={MoveRight} />
        </div>
      </div>
    </section>
  </motion.div>
  );
};

export default Hsection2;