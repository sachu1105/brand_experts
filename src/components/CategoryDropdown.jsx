import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategoryDetails } from "../services/categoryApi";

const CategoryDropdown = ({ category, position = "right" }) => {
  // Fetch category details using the category ID from the parent category
  const { data: categoryDetails, isLoading } = useQuery({
    queryKey: ["categoryDetails", category.id],
    queryFn: () => getCategoryDetails(category.id),
    // Enable for all categories since we want to fetch all of them
    enabled: !!category.id,
  });

  if (isLoading || !categoryDetails) {
    return null;
  }

  // Transform API data to match our dropdown structure
  const transformCategories = (data) => {
    return data.categories.map((cat) => ({
      id: cat.category_id,
      title: cat.category_name,
      path: `/products?category=${cat.category_id}`, // Updated path
      subcategories: cat.subcategories.map((sub) => ({
        id: sub.subcategory_id,
        title: sub.subcategory_name,
        path: `/products?subcategory=${sub.subcategory_id}`,
        status: sub.status,
      })),
    }));
  };

  const subcategories = transformCategories(categoryDetails);

  return (
    <div
      className={`${
        position === "right" 
          ? "left-full top-0" 
          : position === "top" 
            ? "left-0 top-full" 
            : "left-0 top-full"
      }`}
    >
      <div className="w-[900px] bg-white shadow-lg rounded-lg p-6 border border-gray-100">
        <div className="grid grid-cols-3 gap-x-8">
          {subcategories.map((mainCategory, index) => (
            <div key={mainCategory.id} className={`${index > 2 ? "mt-8" : ""}`}>
              <Link
                to={mainCategory.path}
                className="block text-gray-900 hover:text-red-600 font-medium border-b border-gray-200 pb-2 mb-3"
              >
                {mainCategory.title}
              </Link>
              {mainCategory.subcategories?.length > 0 && (
                <div className="flex flex-col space-y-2">
                  {mainCategory.subcategories.map((subCategory) => (
                    <Link
                      key={subCategory.id}
                      to={subCategory.path}
                      className="flex items-center justify-between text-gray-600 hover:text-red-600 text-sm group/item"
                    >
                      <div className="flex items-center gap-2">
                        <span>{subCategory.title}</span>
                        {subCategory.status === "Best Seller" && (
                          <span className="px-2 py-0.5 text-xs bg-orange-100 text-orange-600 rounded-full">
                            Best Seller
                          </span>
                        )}
                        {subCategory.status?.includes("%") && (
                          <span className="px-2 py-0.5 text-xs bg-red-100 text-red-600 rounded-full">
                            {subCategory.status}
                          </span>
                        )}
                        {subCategory.status === "Trending" && (
                          <span className="px-2 py-0.5 text-xs bg-green-100 text-green-600 rounded-full">
                            Trending
                          </span>
                        )}
                      </div>
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
