import { api } from "@/hooks/useApi";

interface NewCustomer {
  name: string;
  company: string;
  salary: string;
}

const getCustomers = (currentPage: number, customersPerPage: number) => {
  return api.get("/customers", {
    params: { limit: customersPerPage, offset: currentPage },
  });
};

const createCustomer = (newCustomer: NewCustomer) => {
  return api.post("/customers", newCustomer);
};

const removeCustomer = (id: number) => {
  return api.delete(`/customers/${id}`);
};

const editCustomer = (id: number, updatedCustomer: NewCustomer) => {
  return api.put(`/customers/${id}`, updatedCustomer);
};

export { getCustomers, createCustomer, removeCustomer, editCustomer };
