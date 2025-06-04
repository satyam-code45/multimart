import { Category } from "@/payload-types";
import CategoryDropdown from "./category-dropdown";

interface CategoriesProps {
  data: any;
}

const Categories = ({ data }: CategoriesProps) => {
  return (
    <div className="relative w-full">
      <div className="flex flex-nowrap items-center">
        <div className="flex flex-row items-center gap-4">
          {data.map((category: Category) => (
            <div key={category.id}>
              <CategoryDropdown
                category={category}
                isActive={false}
                isNavigationHovered={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
