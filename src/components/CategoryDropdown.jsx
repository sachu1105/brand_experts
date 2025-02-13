import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategoryDetails } from "../services/categoryApi";

const CategoryDropdown = ({ category, position = "right" }) => {
  const {
    data: categoryDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categoryDetails", category?.id],
    queryFn: () => getCategoryDetails(category?.id),
    enabled: !!category?.id,
    staleTime: 300000, // Cache for 5 minutes
    retry: 2,
  });


  if (isLoading) {
    return (
      <div className="absolute z-50 bg-white shadow-lg rounded-lg p-4 min-w-[200px]">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute z-50 bg-white shadow-lg rounded-lg p-4">
        <p className="text-red-500">Failed to load categories</p>
      </div>
    );
  }

  // Guard against missing or empty data
  if (!categoryDetails?.categories?.length) {
    return (
      <div className="absolute z-50 bg-white shadow-lg rounded-lg p-4">
        <p className="text-gray-500">No products available</p>
      </div>
    );
  }

  return (
    <div
      className={`absolute z-50 ${
        position === "right" ? "left-full top-0" : "left-0 top-full"
      }`}
    >
      <div className="w-[900px] bg-white shadow-lg rounded-lg p-6 border border-gray-100">
        <div className="grid grid-cols-3 gap-x-8">
          {categoryDetails.categories.map((category, index) => (
            <div key={category.id} className={`${index > 2 ? "mt-8" : ""}`}>
              <Link
                to={`/category/${category.id}`}
                className="block text-gray-900 hover:text-red-600 font-medium border-b border-gray-200 pb-2 mb-3"
              >
                {category.name}
              </Link>
              {category.products?.length > 0 && (
                <div className="flex flex-col space-y-2">
                  {category.products.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="flex items-center justify-between text-gray-600 hover:text-red-600 text-sm group/item"
                    >
                      <div className="flex items-center gap-2">
                        <span>{product.name}</span>
                        {product.status && (
                          <span
                            className={`px-2 py-0.5 text-xs rounded-full ${
                              product.status === "Best Seller"
                                ? "bg-orange-100 text-orange-600"
                                : product.status.includes("%")
                                ? "bg-red-100 text-red-600"
                                : "bg-green-100 text-green-600"
                            }`}
                          >
                            {product.status}
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
