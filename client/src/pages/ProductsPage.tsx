import { useQuery } from "@tanstack/react-query";
import { fetchAllCategories, fetchProducts } from "../api/product";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useState } from "react";
import ProductCard, { ProductCardSkeleton } from "../components/ProductCard";
import SelectCategory from "../components/ProductsPage/SelectCategory";

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
          <div className="flex flex-wrap gap-5">
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

export default ProductsPage;
