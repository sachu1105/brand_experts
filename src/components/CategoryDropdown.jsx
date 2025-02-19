import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategoryDetails } from "../services/categoryApi";
import { useRef, useEffect, useState } from "react";

const CategoryDropdown = ({ category, position = "right" }) => {
  const dropdownRef = useRef(null);
  const containerRef = useRef(null);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const [hoveredProduct, setHoveredProduct] = useState(null);
  
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

  // Calculate position after render and when window resizes
  useEffect(() => {
    function calculatePosition() {
      if (!dropdownRef.current || !containerRef.current) return;
      
      const parentEl = containerRef.current.parentElement;
      if (!parentEl) return;
      
      const parentRect = parentEl.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const dropdownWidth = 900; // The width of our dropdown
      
      // Check if there's enough space on the right
      const spaceOnRight = viewportWidth - parentRect.right;
      
      if (position === "right" && spaceOnRight < dropdownWidth) {
        // Not enough space on right - show on left if enough space
        if (parentRect.left > dropdownWidth) {
          // Enough space on left
          setDropdownStyle({
            right: '100%',
            top: 0,
            left: 'auto'
          });
        } else {
          // Not enough space on either side - center it and drop below
          const leftOffset = Math.max(0, (dropdownWidth - parentRect.width) / 2);
          setDropdownStyle({
            left: `-${leftOffset}px`,
            top: '100%',
            right: 'auto'
          });
        }
      } else if (position === "right") {
        // Default right position
        setDropdownStyle({
          left: '100%',
          top: 0,
          right: 'auto'
        });
      } else {
        // Default bottom position
        setDropdownStyle({
          left: 0,
          top: '100%',
          right: 'auto'
        });
      }
    }

    // Calculate on load and resize
    calculatePosition();
    window.addEventListener('resize', calculatePosition);
    
    return () => window.removeEventListener('resize', calculatePosition);
  }, [categoryDetails, position]);

  const handleProductMouseEnter = (product) => {
    setHoveredProduct(product);
  };

  const handleProductMouseLeave = () => {
    setHoveredProduct(null);
  };

  if (isLoading) {
    return (
      <div ref={containerRef} className="absolute z-50 bg-white shadow-lg rounded-lg p-4 min-w-[200px]">
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
      <div ref={containerRef} className="absolute z-50 bg-white shadow-lg rounded-lg p-4">
        <p className="text-red-500">Failed to load categories</p>
      </div>
    );
  }

  // Guard against missing or empty data
  if (!categoryDetails?.categories?.length) {
    return (
      <div ref={containerRef} className="absolute z-50 bg-white shadow-lg rounded-lg p-4">
        <p className="text-gray-500">No products available</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute z-50" style={{ position: 'relative' }}>
      <div
        ref={dropdownRef}
        className="absolute z-50"
        style={dropdownStyle}
      >
        {/* Add padding bridge */}
        <div className="h-2"></div>
        
        <div className="w-[900px] bg-white shadow-lg rounded-lg p-6 border border-gray-100">
          <div className="flex">
            {/* Categories Column - Takes 70% width */}
            <div className="w-2/3 pr-6">
              <div className="grid grid-cols-2 gap-x-8">
                {categoryDetails.categories.map((category, index) => (
                  <div key={category.id} className={`${index > 1 ? "mt-8" : ""}`}>
                    <Link
                      to=""
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
                            onMouseEnter={() => handleProductMouseEnter(product)}
                            onMouseLeave={handleProductMouseLeave}
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
            
            {/* Product Image Column - Takes 30% width */}
            <div className="w-1/3 border-l border-gray-100 pl-6">
              {hoveredProduct ? (
                <div className="h-full flex flex-col items-center justify-center">
                  <div className="w-full h-48 mb-4 overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center">
                    {hoveredProduct.images && hoveredProduct.images.length > 0 ? (
                      <img 
                        src={hoveredProduct.images[0]} 
                        alt={hoveredProduct.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-400">No image available</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{hoveredProduct.name}</h3>
                  {hoveredProduct.price && (
                    <p className="text-red-600 font-medium">${hoveredProduct.price}</p>
                  )}
                  {hoveredProduct.description && (
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">{hoveredProduct.description}</p>
                  )}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-400 text-sm italic">Hover over a product to see details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown;