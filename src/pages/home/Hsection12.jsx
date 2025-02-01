import { useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "Can I create a custom design for my sign?",
      answer:
        "Yes, we offer custom design services for all our signs. Please contact us with your requirements.",
    },
    {
      question: "What materials do you use for the signs?",
      answer:
        "We use high-quality materials including aluminum, acrylic, and PVC, depending on your specific needs.",
    },
    {
      question: "How long does it take to receive my order?",
      answer:
        "Standard processing time is 5-7 business days, plus shipping time which varies by location.",
    },
    {
      question: "Do you offer bulk discounts?",
      answer:
        "Yes, we offer tiered pricing for bulk orders. Contact our sales team for a custom quote.",
    },
    {
      question: "What if I'm not satisfied with my order?",
      answer:
        "We offer a 30-day satisfaction guarantee. If you're not happy with your order, please contact our support team.",
    },
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      className="flex items-start justify-between overflow-hidden bg-[#fdf5f5] px-12 py-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }} // Animates when 30% of the section is visible
    >
      {/* Left Section: Heading */}
      <div className="w-1/3">
        <h2 className="text-4xl font-bold text-left">Frequently Asked Questions</h2>
      </div>

      {/* Right Section: FAQ */}
      <div className="w-2/3">
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                className="w-full flex justify-between items-center py-4 text-left"
                onClick={() => toggleQuestion(index)}
              >
                <span className="text-lg font-medium">{item.question}</span>
                <Plus
                  className={`transform transition-transform duration-200 ${
                    openIndex === index ? "rotate-45" : ""
                  }`}
                />
              </button>

              <div
                className={`transition-all duration-200 ease-in-out overflow-hidden ${
                  openIndex === index ? "max-h-40 mb-4" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 pb-4">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FAQ;
