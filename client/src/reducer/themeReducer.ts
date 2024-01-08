import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.getItem("color-theme") || "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      const newTheme =
        localStorage.getItem("color-theme") === "dark" ? "light" : "dark";
      const circle = document.getElementById("circle")!;

      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
        circle.classList.remove("active");
      } else {
        document.documentElement.classList.remove("dark");
        circle.classList.add("active");
      }

      localStorage.setItem("color-theme", newTheme);
      state.theme = newTheme;
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
