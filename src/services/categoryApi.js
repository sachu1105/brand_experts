import API from "../pages/loginSignin/Api";

export const getParentCategories = async () => {
  const response = await API.get("/dash/parent-categories/");
  return response.data;
};
