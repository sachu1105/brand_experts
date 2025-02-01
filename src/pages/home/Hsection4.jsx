import { motion } from "framer-motion";
import { ImagePlus, ShoppingCart, FileText } from 'lucide-react';

const DesignProcessSteps = () => {
  const steps = [
    {
      number: "01",
      title: "Pick Templates or Upload Designs",
      description: "Head over to our templates to select a theme that matches your vision. Modify it or upload an image to make your own sign online. You can also explore templates directly from our design tool.",
      icon: FileText,
      imageSide: "left"
    },
    {
      number: "02",
      title: "Fully Customize Your Signs",
      description: "Our online design tool comes with original templates to create a unique design for your signs. Select a print medium, size, style, texts, icons, accessories as well as sign printing and cutting options.",
      icon: ImagePlus,
      imageSide: "right"
    },
    {
      number: "03",
      title: "Click to Order Your Product",
      description: "Place your order once done with the design. Click add to cart for ordering then provide shipping info and any notes regarding the order. Proceed to checkout and we'll get your signs printed right away.",
      icon: ShoppingCart,
      imageSide: "left"
    }
  ];

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            3-Step Design & Order Process
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We've made the sign design and ordering process as easy as possible. 
            Follow these simple steps to design your very own sign.
          </p>
        </div>

        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: step.imageSide === "left" ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col ${
                step.imageSide === "left" ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-8`}
            >
              {/* Number and Icon Container */}
              <div className="relative w-32 h-32 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 rounded-full" />
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-red-600">{step.number}</span>
                </div>
                <div className="absolute -right-2 -bottom-2 p-3 bg-red-100 rounded-full">
                  <step.icon className="w-6 h-6 text-red-600" />
                </div>
              </div>

              {/* Content */}
              <div className={`flex-1 ${
                step.imageSide === "right" ? "text-right md:pl-32" : "text-left md:pr-32"
              }`}>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className={`text-lg text-gray-600 ${
                  step.imageSide === "right" ? "ml-auto" : ""
                } max-w-xl`}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DesignProcessSteps;