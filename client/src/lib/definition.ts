export type RootState = {
  theme: {
    theme: "dark" | "light";
  };
  user: {
    user: User;
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
