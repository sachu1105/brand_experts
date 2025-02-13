import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useProducts } from "../../hooks/useProducts";
import {
  getProductsBySubcategory,
  getProductsByCategory,
} from "../../services/categoryApi";
import errorImg from "../../assets/images/error.svg"; // Add this import

export default function Products() {
  const [searchParams] = useSearchParams();
  const subcategoryId = searchParams.get("subcategory");
  const categoryId = searchParams.get("category");

  // Separate query for all products
  const productsQuery = useProducts();

  // Query for filtered products by subcategory
  const filteredBySubcategoryQuery = useQuery({
    queryKey: ["products", "subcategory", subcategoryId],
    queryFn: () => getProductsBySubcategory(subcategoryId),
    enabled: !!subcategoryId,
  });

  // Query for filtered products by category
  const filteredByCategoryQuery = useQuery({
    queryKey: ["products", "category", categoryId],
    queryFn: () => getProductsByCategory(categoryId),
    enabled: !!categoryId,
  });

  // Determine which query to use
  const {
    data: productsData,
    isLoading,
    error,
  } = subcategoryId
    ? filteredBySubcategoryQuery
    : categoryId
    ? filteredByCategoryQuery
    : productsQuery;

  console.log("Query error:", error); // For debugging

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
        <img src={errorImg} alt="Error" className="w-32 h-32 mb-4 opacity-75" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Sorry, we hit a snag!
        </h2>
        <p className="text-gray-600 mb-4">
          We couldn't load the products at this time
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[90rem] mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-left mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Custom Sign Printing
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            {subcategoryId
              ? `Showing filtered results`
              : `Select from our versatile range of signs and customize them to suit your needs.`}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productsData?.products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-lg   transition-shadow duration-200 overflow-hidden flex flex-col h-96"
            >
              <div className="w-full h-48 overflow-hidden bg-gray-100 flex-shrink-0 ">
                {product.image1 ? (
                  <img
                    src={product.image1}
                    alt={product.name}
                    className="w-full  object-cover object-center transform group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-400 text-sm">
                      No image available
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow ">
                <h3 className="text-lg font-medium text-gray-900 mb-3 ">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 ">
                  {product.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
