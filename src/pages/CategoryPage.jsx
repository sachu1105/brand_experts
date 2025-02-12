import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategoryDetails } from "../services/categoryApi";

const CategoryPage = () => {
  const { categoryId } = useParams();

  const { data: categoryDetails, isLoading } = useQuery({
    queryKey: ["categoryDetails", parseInt(categoryId)],
    queryFn: () => getCategoryDetails(parseInt(categoryId)),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!categoryDetails) {
    return <div>Category not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">
        {categoryDetails.category_name}
      </h1>
      {/* Add your category page content here */}
    </div>
  );
};

export default CategoryPage;
