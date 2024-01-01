import { Product } from "../lib/definition";

export async function fetchAllCategories() {
  const response = await fetch("https://fakestoreapi.com/products/categories");
  const data = await response.json();

  return data as string[];
}

export async function fetchProducts({ queryKey }: { queryKey: string[] }) {
  const [_, category] = queryKey;

  let response: Response;
  if (category) {
    response = await fetch(
      `https://fakestoreapi.com/products/category/${category}`,
    );
  } else {
    response = await fetch("https://fakestoreapi.com/products");
  }

  const data = await response.json();

  return data as Product[];
}
