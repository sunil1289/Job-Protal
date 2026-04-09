import { createSlice } from "@reduxjs/toolkit";

const getInitialToken = (): string => {
  try {
    const token = localStorage.getItem("token");
    if (!token || token.trim() === "") return "";
    const parts = token.split(".");
    if (parts.length !== 3) {
      localStorage.removeItem("token");
      return "";
    }
    return token;
  } catch {
    return "";
  }
};

const jwtSlice = createSlice({
  name: "jwt",
  initialState: getInitialToken(),
  reducers: {
    setJwt: (state, action) => {
      localStorage.setItem("token", action.payload);
      return action.payload;
    },
    removeJwt: () => {
      localStorage.removeItem("token");
      return "";
    },
  },
});

export const { setJwt, removeJwt } = jwtSlice.actions;
export default jwtSlice.reducer;
