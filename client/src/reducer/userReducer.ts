import { createSlice } from "@reduxjs/toolkit";
import { User } from "../lib/definition";

const initialState = {
  user: JSON.parse(localStorage.getItem("user") || "{}") as User,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    auth(state, action: { payload: typeof initialState }) {
      const payload = action.payload;

      state.user = payload.user;

      localStorage.setItem("user", JSON.stringify(payload.user));
    },
    logout(state) {
      state.user = {} as User;
      localStorage.removeItem("user");
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
