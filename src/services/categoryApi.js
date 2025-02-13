import API from "../pages/loginSignin/Api.jsx";

export const getParentCategories = async () => {
  const response = await API.get("/dash/parent-categories/");
  // Transform the response to include the required fields
  return response.data.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    imageUrl: category.image_url,
    path: `/category/${category.id}`,
  }));
};

export const getCategoryDetails = async (categoryId) => {
  if (!categoryId) {
    throw new Error("Category ID is required");
  }

  try {
    console.log("Fetching category details for ID:", categoryId); // Debug
    const response = await API.get(`dash/categories/${categoryId}/`);
    console.log("Raw API Response:", response.data); // Debug

    if (!response.data) {
      throw new Error("No data received from API");
    }

    // Transform the data
    const transformed = {
      parentCategoryId: response.data.parent_category_id,
      parentCategoryName: response.data.parent_category_name,
      description: response.data.description,
      parentCategoryImage: response.data.parent_category_image,
      categories:
        response.data.categories?.map((category) => ({
          id: category.category_id,
          name: category.category_name,
          description: category.description,
          imageUrl: category.category_image,
          products:
            category.products?.map((product) => ({
              id: product.product_id,
              name: product.name,
              description: product.description,
              status: product.status,
              size: product.size,
              price: product.price,
              images: [
                product.image1,
                product.image2,
                product.image3,
                product.image4,
              ].filter(Boolean),
            })) || [],
        })) || [],
    };

    console.log("Transformed data:", transformed); // Debug
    return transformed;
  } catch (error) {
    console.error("Error in getCategoryDetails:", error);
    console.error("Category ID that failed:", categoryId);
    throw error;
  }
};

export const getProductsBySubcategory = async (subcategoryId) => {
  const response = await fetch(
    `https://dash.brandexperts.ae/dash/products-by-subcategory/?subcategory_id=${subcategoryId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

export const getProductsByCategory = async (categoryId) => {
  const response = await fetch(
    `https://dash.brandexperts.ae/dash/products-by-category/?category_id=${categoryId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch category products");
  }
  return response.json();
};
