import pageReducer from "./page/page";
import customerReducer from "./selectedCustomers/selectedCustomers";
import userReducer from "./user/user";
import viewReducer from "./viewOption/viewOption";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    user: userReducer,
    page: pageReducer,
    customer: customerReducer,
    viewOption: viewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
