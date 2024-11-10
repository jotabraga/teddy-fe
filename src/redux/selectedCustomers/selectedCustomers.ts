import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Customer {
  id: number;
  name: string;
  company: string;
  salary: string;
}

interface CustomersState {
  selectedCustomers: Customer[];
}

const initialState: CustomersState = {
  selectedCustomers: [],
};

export const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<Customer>) => {
      const customer = action.payload;
      const exists = state.selectedCustomers.some((c) => c.id === customer.id);
      if (!exists) {
        state.selectedCustomers.push(customer);
      }
    },
    removeCustomer: (state, action: PayloadAction<number>) => {
      const customerId = action.payload;
      state.selectedCustomers = state.selectedCustomers.filter(
        (c) => c.id !== customerId
      );
    },
  },
});

export const { addCustomer, removeCustomer } = customersSlice.actions;

export default customersSlice.reducer;
