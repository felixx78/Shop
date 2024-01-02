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
    <div className="pt-2">
      <div className="mb-4 flex flex-wrap justify-between px-8">
        <h1 className="mb-4 text-2xl font-bold">Products</h1>
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
        className="w-[180px] border-2 border-border bg-foreground py-1 text-lg dark:border-dark-border dark:bg-transparent"
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || "Select category"}
      </button>
      {isOpen && (
        <div className="absolute top-full w-full divide-y-2 divide-border border-2 border-border bg-foreground dark:divide-dark-border dark:border-dark-border dark:bg-dark-foreground">
          <button
            className="block w-full cursor-pointer p-2 text-left"
            onClick={() => onChange("")}
          >
            all
          </button>
          {categories.map((category) => (
            <button
              onClick={() => onChange(category)}
              className="block w-full p-2 text-left"
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
