import { useQuery } from "@tanstack/react-query";
import API from "../pages/loginSignin/Api";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await API.get("dash/products/");
      return response.data;
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
