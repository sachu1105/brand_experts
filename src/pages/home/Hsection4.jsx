import { motion } from "framer-motion";
const DesignProcess = () => {
  const steps = [
    {
      number: "01",
      title: "Pick Templates or Upload Designs",
      description: "Head over to our templates to select a theme that makes your vision. Modify or upload an image to make your own sign online.",
      icon: () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
          />
        </svg>
      )
    },
    {
      number: "02",
      title: "Customize Your Design",
      description: "Our online design tool comes with original templates to create a unique design for your signs. Select a print medium, size, style, and more.",
      icon: () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
      )
    },
    {
      number: "03",
      title: "Click to Order Your Product",
      description: "Place your order once done with the design. Click and add any notes regarding the order. Proceed to checkout, and we will get your signs printed right away.",
      icon: () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
          />
        </svg>
      )
    }
  ];

  const StepIcon = ({ icon: Icon }) => (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
        <Icon />
      </div>
    </div>
  );

  const StepNumber = ({ number }) => (
    <div className="relative">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center transform transition-transform hover:scale-110">
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
          <span className="text-3xl font-bold text-red-600">{number}</span>
        </div>
      </div>
    </div>
  );

  const StepContent = ({ title, description, isReversed }) => (
    <div className={`flex-1 ${isReversed ? 'text-right' : 'text-left'}`}>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        {title}
      </h3>
      <p className={`text-lg text-gray-600 leading-relaxed max-w-xl ${isReversed ? 'ml-auto' : ''}`}>
        {description}
      </p>
    </div>
  );

  return (
    <motion.div
    className=""
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true, amount: 0.3 }} // Animates when 30% of the section is visible
  >
    <section>
    <div className=" py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 className="text-4xl font-bold  ">
            3-Step Design & Order Process
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            We have made the sign design and ordering process as easy as possible.
            Follow these simple steps to design your very own sign.
          </p>
        </header>
        

        <div className="relative">
          {steps.map((step, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <div 
                key={step.number}
                className={`flex items-center gap-8 mb-16 ${
                  isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
                } flex-col`}
              >
                
                <div className="relative flex-shrink-0">
                  <StepNumber number={step.number} />
                  <StepIcon icon={step.icon} />
                </div>
                    
                <StepContent 
                  title={step.title}
                  description={step.description}
                  isReversed={isReversed}
                />

                {index < steps.length - 1 && (
                  <div 
                    className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-[50px] w-0.5 bg-gradient-to-b from-red-800 to-transparent"
                    style={{ top: '100%' }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </section>
    </motion.div>
  );
};

export default DesignProcess;