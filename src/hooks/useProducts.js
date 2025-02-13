import { useQuery } from "@tanstack/react-query";
import API from "../pages/loginSignin/Api";

export const useProducts = (searchTerm = "") => {
  return useQuery({
    queryKey: ["products", searchTerm],
    queryFn: async () => {
      const response = await API.get("dash/products/");
      const products = response.data;

      // Handle search filtering on the client side
      if (searchTerm) {
        return products
          .filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .sort((a, b) => a.name.localeCompare(b.name));
      }

      return products;
    },
  });
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await API.get(`dash/product/${id}/`);
      return response.data;
    },
    enabled: !!id,
  });
};
