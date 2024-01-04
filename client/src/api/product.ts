import { CartItem, Product } from "../lib/definition";

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

export async function fetchProductById({ queryKey }: { queryKey: any[] }) {
  const [_, id] = queryKey;

  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await response.json();

  return data as Product;
}

export async function fetchProductFromCart(cartItems: CartItem[]) {
  const data: Product[] = [];

  for (const item of cartItems) {
    const product = await fetchProductById({ queryKey: ["", item.productId] });
    data.push(product);
  }

  return data as Product[];
}
