export type RootState = {
  theme: {
    theme: "dark" | "light";
  };
  user: {
    user: User;
  };
  cart: {
    items: CartItem[];
  };
};

export type User = {
  id: number;
  email: string;
  role: string;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type CartItem = {
  quantity: number;
  productId: number;
};
