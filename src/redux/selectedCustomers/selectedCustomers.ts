import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Customer {
  id: number;
  name: string;
  company: string;
  salary: string;
}

interface SelectedCustomersState {
  selectedCustomers: Customer[];
}

const initialState: SelectedCustomersState = {
  selectedCustomers: [],
};

const selectedCustomersSlice = createSlice({
  name: "selectedCustomers",
  initialState,
  reducers: {
    toggleCustomerSelection: (state, action: PayloadAction<Customer>) => {
      const customer = action.payload;
      const index = state.selectedCustomers.findIndex(
        (c) => c.id === customer.id
      );
      if (index >= 0) {
        state.selectedCustomers.splice(index, 1);
      } else {
        state.selectedCustomers.push(customer);
      }
    },
    cleanCustomersSelection: (state) => {
      state.selectedCustomers = [];
    },
  },
});

export const { toggleCustomerSelection, cleanCustomersSelection } =
  selectedCustomersSlice.actions;
export default selectedCustomersSlice.reducer;
