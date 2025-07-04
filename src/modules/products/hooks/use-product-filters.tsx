import {
  useQueryStates,
  parseAsArrayOf,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs";

const sortValues = ["curated", "trending", "hot_and_new"] as const;

const params = {
  search: parseAsString
    .withOptions({
      clearOnDefault: true,
    })
    .withDefault(""),
  sort: parseAsStringLiteral(sortValues).withDefault("curated"),
  minPrice: parseAsString
    .withOptions({
      clearOnDefault: true,
    })
    .withDefault(""),
  maxPrice: parseAsString
    .withOptions({
      clearOnDefault: true,
    })
    .withDefault(""),
  tags: parseAsArrayOf(parseAsString)
    .withOptions({
      clearOnDefault: true,
    })
    .withDefault([]),
};

const UseProductsFilters = () => {
  return useQueryStates(params);
};

export default UseProductsFilters;
