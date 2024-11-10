import { createSlice } from "@reduxjs/toolkit";

const initialState = { viewOption: "Clientes" };

export const viewOptionSlice = createSlice({
  name: "viewOption",
  initialState,
  reducers: {
    setViewOption: (state, action) => {
      state.viewOption = action.payload;
    },
  },
});

export const { setViewOption } = viewOptionSlice.actions;

export default viewOptionSlice.reducer;
