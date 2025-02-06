import { motion } from "framer-motion";
import designSteps from "../../assets/images/designSteps.png";
import designStepsWebp from "../../assets/images/designSteps.webp";
const DesignProcess = () => {
  const steps = [
    {
      number: "01",
      title: "Pick Templates or Upload Designs",
      description:
        "Head over to our templates to select a theme that matches your vision. Modify it or upload an image to make your own sign online. You can also explore templates directly from our design tool.",
      Icon: () => (
        <div className="w-24 h-24 text-red-500">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-full h-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
      ),
    },
    {
      number: "02",
      title: "Fully Customize Your Signs",
      description:
        "Our online design tool comes with original templates to create a unique design for your signs. Select a print medium, size, style, texts, icons, accessories as well as sign printing and cutting options.",
      Icon: () => (
        <div className="w-24 h-24 text-red-500">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-full h-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      ),
    },
    {
      number: "03",
      title: "Click to Order Your Product",
      description:
        'Place your order once done with the design. Click "add to cart" for ordering then provide shipping info and any notes regarding the order. Proceed to checkout and we\'ll get your signs printed right away.',
      Icon: () => (
        <div className="w-24 h-24 text-red-500">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-full h-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8 relative">
      {/* Add the image with absolute positioning */}
      <picture>
        <source srcSet={designStepsWebp} type="image/webp" />
        <img
          src={designSteps}
          alt="Design Steps"
          className="hidden sm:block absolute top-45 left-10 w-78 pointer-events-none"
          loading="lazy"
        />
      </picture>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">
            3-Step Design & Order Process
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-4">
            We've made the sign design and ordering process as easy as possible.
            Follow these simple steps to design your very own sign.
          </p>
        </div>

        <div className="space-y-12 sm:space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                {/* Mobile layout (centered) */}
                <div className="sm:hidden w-full text-center">
                  <div className="text-6xl sm:text-9xl font-bold text-red-100 mb-4">
                    {step.number}
                  </div>
                  {/* Remove or hide the icon div on mobile */}
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-gray-600 mt-2 text-sm">
                    {step.description}
                  </p>
                </div>

                {/* Desktop layout (alternating) */}
                <div className="hidden sm:flex items-start gap-8 w-full">
                  {index % 2 === 0 ? (
                    <>
                      <div className="w-1/3"></div>
                      <div className="flex-1 flex items-center gap-8">
                        <div className="w-34">
                          <div className="text-9xl font-bold text-red-100">
                            {step.number}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-700">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 mt-4">
                            {step.description}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <step.Icon />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-1 flex items-center gap-8">
                        <div className="w-34">
                          <div className="text-9xl font-bold text-red-100">
                            {step.number}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-700">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 mt-4">
                            {step.description}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <step.Icon />
                        </div>
                      </div>
                      <div className="w-1/3"></div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DesignProcess;
