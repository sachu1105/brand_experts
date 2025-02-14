// GradientButton.jsx
const GradientButton = ({ text, Icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-[#BF1A1C] to-[#590C0D] text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:shadow-lg transition-shadow"
    >
      {text}
      {Icon && <Icon className="w-5 h-5" />}
    </button>
  );
};

export default GradientButton;
