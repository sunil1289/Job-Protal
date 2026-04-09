import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Components/Slices/UserSlice";
import profileReducer from "./Components/Slices/ProfileSlice";
import filterReducer from "./Components/Slices/FilterSlice";
import sortReducer from "./Components/Slices/SortSlice";
import jwtReducer from "./Components/Slices/JwtSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    filter: filterReducer,
    sort: sortReducer,
    jwt : jwtReducer
  },
});
