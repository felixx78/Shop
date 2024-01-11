import { useQuery } from "@tanstack/react-query";
import { fetchAllCategories, fetchProducts } from "../api/product";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useEffect, useRef, useState } from "react";
import ProductCard, { ProductCardSkeleton } from "../components/ProductCard";

function ProductsPage() {
  const [category, setCategory] = useState("");

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", category],
    queryFn: fetchProducts,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchAllCategories,
    initialData: [],
  });

  return (
    <div className="pb-6 pt-2">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 px-8">
        <h1 className="text-2xl font-bold">Products</h1>
        <SelectCategory
          value={category}
          onChange={setCategory}
          categories={categories}
        />
      </div>

      <div className="mx-auto max-w-[1220px]">
        {isLoading || !products ? (
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 8 }, (_, i) => i).map((i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 0: 1, 620: 2, 920: 3, 1220: 4 }}
          >
            <Masonry gutter="25px">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}
      </div>
    </div>
  );
}

const SelectCategory = ({
  value,
  onChange,
  categories,
}: {
  value: string;
  onChange: (s: string) => void;
  categories: string[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOnClick = (e: MouseEvent) => {
    if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOnClick);

    return () => window.removeEventListener("click", handleOnClick);
  }, []);

  return (
    <div className="relative">
      <button
        className="w-[165px] rounded-md border-2 border-border bg-foreground py-1 text-copy dark:border-dark-border dark:bg-transparent dark:text-border"
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || "Select category"}
      </button>
      <div
        className={`${
          isOpen ? "top-[120%] opacity-100" : "invisible top-1/2 opacity-0"
        } r absolute w-full rounded-md border-2 border-border bg-foreground transition-all duration-300 dark:border-dark-border dark:bg-dark-foreground dark:text-border`}
      >
        <button
          className="block w-full cursor-pointer p-1.5 text-left hover:bg-border dark:hover:bg-dark-border"
          onClick={() => onChange("")}
        >
          all
        </button>
        {categories.map((category) => (
          <button
            onClick={() => onChange(category)}
            className="block w-full p-1.5 text-left hover:bg-border dark:hover:bg-dark-border"
            key={category}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
