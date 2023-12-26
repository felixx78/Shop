import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme() {
      const newTheme =
        localStorage.getItem("color-theme") === "dark" ? "light" : "dark";

      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      localStorage.setItem("color-theme", newTheme);
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
