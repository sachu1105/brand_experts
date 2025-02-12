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
      path: `/category/${cat.category_id}`,
      subcategories: cat.subcategories.map((sub) => ({
        id: sub.subcategory_id,
        title: sub.subcategory_name,
        path: `/products?subcategory=${sub.subcategory_id}`,
      })),
    }));
  };

  const subcategories = transformCategories(categoryDetails);

  return (
    <div
      className={position === "right" ? "left-full top-0" : "left-0 top-full"}
    >
      <div className="w-[900px] bg-white shadow-lg rounded-lg p-6 border border-gray-100">
        <div className="grid grid-cols-3 gap-x-8">
          {subcategories.map((mainCategory, index) => (
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
