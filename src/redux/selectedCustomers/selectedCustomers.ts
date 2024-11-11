import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Customer {
  id: number;
  name: string;
  company: string;
  salary: string;
}

interface SelectedCustomersState {
  customers: Customer[];
}

const initialState: SelectedCustomersState = {
  customers: [],
};

const selectedCustomersSlice = createSlice({
  name: "selectedCustomers",
  initialState,
  reducers: {
    toggleCustomerSelection: (state, action: PayloadAction<Customer>) => {
      const customer = action.payload;
      const index = state.customers.findIndex((c) => c.id === customer.id);
      if (index >= 0) {
        state.customers.splice(index, 1);
      } else {
        state.customers.push(customer);
      }
    },
  },
});

export const { toggleCustomerSelection } = selectedCustomersSlice.actions;
export default selectedCustomersSlice.reducer;
