// GradientButton.jsx
const GradientButton = ({ text, Icon }) => {
  return (
    <button className="bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white py-2 px-6 rounded-lg text-lg mb-4 flex items-center justify-center cursor-pointer hover:shadow-[#ffc5c8] transition-shadow duration-300 shadow-xl">
      {text}
      {Icon && <Icon className="ml-2" />}
    </button>
  );
};

export default GradientButton;
