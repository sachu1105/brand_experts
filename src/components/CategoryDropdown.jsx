import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const CategoryDropdown = ({ category }) => {
  // Hardcoded data for all categories
  const subcategoriesData = {
    "Rigid signs": [
      {
        id: "acrylic",
        title: "Acrylic Signs",
        path: "/rigid-signs/acrylic-signs",
        subcategories: [
          {
            id: 2,
            title: "Clear Acrylic Signs",
            path: "/rigid-signs/clear-acrylic-signs",
            badge: "Best Seller",
          },
          {
            id: 3,
            title: "White Acrylic Signs",
            path: "/rigid-signs/white-acrylic-signs",
          },
          {
            id: 4,
            title: "Frosted Acrylic Signs",
            path: "/rigid-signs/frosted-acrylic-signs",
          },
          {
            id: 5,
            title: "Black Acrylic Signs",
            path: "/rigid-signs/black-acrylic-signs",
          },
          {
            id: 6,
            title: "Black Transparent Acrylic Signs",
            path: "/rigid-signs/black-transparent-acrylic-signs",
          },
          {
            id: 7,
            title: "Gold Acrylic Signs",
            path: "/rigid-signs/gold-acrylic-signs",
            badge: "20% OFF",
          },
        ],
      },
      {
        id: "metal",
        title: "Metal Signs",
        path: "/rigid-signs/metal-signs",
        subcategories: [
          {
            id: 9,
            title: "Aluminum Signs",
            path: "/rigid-signs/aluminum-signs",
            badge: "Best Seller",
          },
          {
            id: 10,
            title: "Dibond Signs",
            path: "/rigid-signs/dibond-signs",
            badge: "Best Seller",
          },
          {
            id: 11,
            title: "Brushed Aluminum Signs",
            path: "/rigid-signs/brushed-aluminum-signs",
          },
          {
            id: 12,
            title: "Reflective Aluminum Signs",
            path: "/rigid-signs/reflective-aluminum-signs",
          },
        ],
      },
      {
        id: "foam",
        title: "Foam Core Signs",
        path: "/rigid-signs/foam-core-signs",
        subcategories: [
          {
            id: 14,
            title: "Foam Board Signs",
            path: "/rigid-signs/foam-board-signs",
            badge: "Best Seller",
          },
          {
            id: 15,
            title: "Gatorboard Signs",
            path: "/rigid-signs/gatorboard-signs",
          },
          {
            id: 16,
            title: "Ultra Board Signs",
            path: "/rigid-signs/ultra-board-signs",
          },
          {
            id: 17,
            title: "Self Adhesive Foam Boards",
            path: "/rigid-signs/self-adhesive-foam-boards",
          },
        ],
      },
      {
        id: "plastic",
        title: "Plastic Signs",
        path: "/rigid-signs/plastic-signs",
        subcategories: [
          { id: 19, title: "PVC Signs", path: "/rigid-signs/pvc-signs" },
          {
            id: 20,
            title: "Styrene Signs",
            path: "/rigid-signs/styrene-signs",
          },
          {
            id: 21,
            title: "Corrugated Plastic Signs",
            path: "/rigid-signs/corrugated-plastic-signs",
            badge: "Best Seller",
          },
        ],
      },
      {
        id: "wooden",
        title: "Wooden Signs",
        path: "/rigid-signs/wooden-signs",
        subcategories: [],
      },
      {
        id: "accessories",
        title: "Accessories",
        path: "/rigid-signs/accessories",
        subcategories: [],
      },
    ],
  };

  // Get subcategories based on category title
  const subCategories = subcategoriesData[category.title] || [];

  // If no subcategories found, don't render the dropdown
  if (subCategories.length === 0) return null;

  return (
    <div className="ml-2">
      {" "}
      {/* Remove invisible/visible classes since parent controls visibility */}
      <div className="w-[900px] bg-white shadow-lg rounded-lg p-6">
        <div className="grid grid-cols-3 gap-x-8">
          {subCategories.map((mainCategory, index) => (
            <div key={mainCategory.id} className={`${index > 2 ? "mt-8" : ""}`}>
              <Link
                to={mainCategory.path}
                className="block text-gray-800 hover:text-red-600 font-medium border-b border-gray-100 pb-2 mb-3"
              >
                {mainCategory.title}
              </Link>
              {mainCategory.subcategories?.length > 0 && (
                <div className="flex flex-col space-y-2">
                  {mainCategory.subcategories.map((subCategory) => (
                    <Link
                      key={subCategory.id}
                      to={subCategory.path}
                      className="flex items-center text-gray-600 hover:text-red-600 text-sm group/item"
                    >
                      <span className="flex items-center gap-2">
                        {subCategory.title}
                        {subCategory.badge && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded ${
                              subCategory.badge === "Best Seller"
                                ? "bg-green-100 text-green-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {subCategory.badge}
                          </span>
                        )}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown;
