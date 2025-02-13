import { useQuery } from "@tanstack/react-query";
import Api from "../pages/loginSignin/Api";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await Api.get("/categories/");
      return response.data;
    },
    // Remove or comment out the unnecessary logging
    // onSuccess: (data) => {
    //   console.log("Category Details:", data);
    // }
  });
}
