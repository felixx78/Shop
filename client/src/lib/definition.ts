export type RootState = {
  theme: {
    theme: "dark" | "light";
  };
  user: {
    acessToken: string;
    user: User;
  };
};

export type User = {
  id: number;
  email: string;
  role: string;
};
