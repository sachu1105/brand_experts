import API from "../pages/loginSignin/Api.jsx";

export const getParentCategories = async () => {
  const response = await API.get("/dash/parent-categories/");
  // Make sure all required fields are included in the transformation
  return response.data.map((category) => ({
    id: category.id,
    name: category.name,
    path: `/category/${category.id}`,
    // Include any other fields that might be needed
    subcategories: category.subcategories || [],
  }));
};

export const getCategoryDetails = async (categoryId) => {
  const response = await fetch(
    `https://dash.brandexperts.ae/dash/categories/${categoryId}/`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch category details");
  }
  return response.json();
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
