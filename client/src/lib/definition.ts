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
