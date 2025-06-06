import { parseAsString, useQueryStates } from "nuqs";

const UseProductsFilters = () => {
  return useQueryStates({
    minPrice: parseAsString.withOptions({
      clearOnDefault: true,
    }),
    maxPrice: parseAsString.withOptions({
      clearOnDefault: true,
    }),
  });
};

export default UseProductsFilters;
