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

      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      localStorage.setItem("color-theme", newTheme);
      state.theme = newTheme;
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
