"use client";

import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import PriceFilter from "./price-filter";
import UseProductsFilters from "../../hooks/use-product-filters";

interface ProductFiltersProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

const ProductFilter = ({ children, title, className }: ProductFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const Icon = isOpen ? ChevronDownIcon : ChevronRightIcon;

  return (
    <div className={cn("p-4 border-b flex flex-col gap-2", className)}>
      <div
        onClick={() => setIsOpen((current) => !current)}
        className="flex items-center justify-between cursor-pointer"
      >
        <p className="font-medium">{title}</p>
        <Icon className="size-5" />
      </div>
      {isOpen && children}
    </div>
  );
};

const ProductFilters = () => {
  const [filters, setFilters] = UseProductsFilters();
  const onChange = (key: keyof typeof filters, value: unknown) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="border rounded-md bg-white">
      <div className="p-4 border-b flex items-center justify-between">
        <p className="font-medium">Filters</p>
        <button className="underline" onClick={() => {}} type="button">
          clear all
        </button>
      </div>
      <ProductFilter title="Price" className="boder-b-0">
        <PriceFilter
          maxPrice={filters.maxPrice}
          minPrice={filters.minPrice}
          onMinPriceChange={(value) => onChange("minPrice", value)}
          onMaxPriceChange={(value) => onChange("maxPrice", value)}
        />
      </ProductFilter>
    </div>
  );
};

export default ProductFilters;
