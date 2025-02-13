import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import API from "../pages/loginSignin/Api";

export const useSearch = (searchTerm) => {
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["search", debouncedTerm],
    queryFn: async () => {
      if (!debouncedTerm || debouncedTerm.length < 2) return [];
      try {
        const response = await API.get(`/dash/search/?q=${debouncedTerm}`);
        return response.data.map((product) => ({
          id: product.id,
          name: product.name,
          image: product.image_url,
          price: product.price,
          description: product.description,
          size: product.size,
        }));
      } catch (error) {
        console.error("Search error:", error);
        return [];
      }
    },
    enabled: debouncedTerm?.length >= 2,
  });

  return {
    searchResults: searchResults || [],
    isLoading,
    setDebouncedTerm,
  };
};
