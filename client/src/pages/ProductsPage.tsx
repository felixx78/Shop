import { useQuery } from "@tanstack/react-query";
import { fetchAllCategories, fetchProducts } from "../api/product";
import { useEffect, useState } from "react";
import ProductCard, { ProductCardSkeleton } from "../components/ProductCard";
import SelectCategory from "../components/ProductsPage/SelectCategory";
import SortBy from "../components/ProductsPage/SortBy";
import { Product } from "../lib/definition";

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>();

  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["products", category],
    queryFn: fetchProducts,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchAllCategories,
    initialData: [],
  });

  const sort = (data: Product[], sortBy: string) => {
    let sortedData = data.slice();

    if (sortBy === "price low") {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price high") {
      sortedData.sort((a, b) => b.price - a.price);
    }

    return sortedData;
  };

  useEffect(() => {
    setProducts(sort(data || [], sortBy));
  }, [sortBy, data]);

  return (
    <div className="pb-6 pt-2">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 px-8 sm:mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex flex-wrap gap-2 sm:gap-4">
          <SelectCategory
            value={category}
            onChange={setCategory}
            categories={categories}
          />
          <SortBy value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      <div
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
        }}
        className="mx-auto grid max-w-[1220px] gap-5"
      >
        {isLoading || !products
          ? Array.from({ length: 8 }, (_, i) => i).map((i) => (
              <ProductCardSkeleton key={i} />
            ))
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
}

export default ProductsPage;
