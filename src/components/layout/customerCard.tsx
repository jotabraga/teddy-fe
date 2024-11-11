import Modal from "./modal";
import { toggleCustomerSelection } from "@/redux/selectedCustomers/selectedCustomers";
import { RootState } from "@/redux/store";
import { editCustomer, removeCustomer } from "@/services/customers";
import { Plus, Minus, Edit, Trash } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Customer {
  id: number;
  name: string;
  company: string;
  salary: string;
}

interface CustomerCardProps {
  customer: Customer;
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  setCustomersCount: React.Dispatch<React.SetStateAction<number>>;
}

const CustomerCard: React.FC<CustomerCardProps> = ({
  customer,
  customers,
  setCustomers,
  setCustomersCount,
}) => {
  const dispatch = useDispatch();
  const selectedCustomers = useSelector(
    (state: RootState) => state.selectedCustomers.customers
  );

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlayContent, setOverlayContent] = useState<
    "edit" | "delete" | "create" | null
  >(null);
  const [editedName, setEditedName] = useState(customer.name);
  const [editedCompany, setEditedCompany] = useState(customer.company);
  const [editedSalary, setEditedSalary] = useState(customer.salary);

  const isSelected = selectedCustomers.some((c) => c.id === customer.id);

  const handleToggleCustomerSelection = () => {
    dispatch(toggleCustomerSelection(customer));
  };

  const handleRemoveCustomer = async (customer: Customer) => {
    const { id } = customer;
    await removeCustomer(id);
    const newCustomersList = customers.filter((c) => c.id !== id);
    setCustomers(newCustomersList);
    setCustomersCount((prevCount) => prevCount - 1);
  };

  const handleEditCustomer = async () => {
    const updatedCustomer = {
      name: editedName,
      company: editedCompany,
      salary: editedSalary,
    };
    const { data: newDataCustomer } = await editCustomer(
      customer.id,
      updatedCustomer
    );
    const newCustomersList = customers.map((c) =>
      c.id === customer.id ? newDataCustomer : c
    );
    setCustomers(newCustomersList);
    closeOverlay();
  };

  const handleEditClick = () => {
    setOverlayContent("edit");
    setIsOverlayOpen(true);
  };

  const handleDeleteClick = () => {
    setOverlayContent("delete");
    setIsOverlayOpen(true);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
    setOverlayContent(null);
  };

  return (
    <div className="p-4 border border-gray-300 rounded shadow-md">
      <h2 className="text-lg font-semibold">{customer.name}</h2>
      <p>Empresa: {customer.company}</p>
      <p>Salário: R$ {customer.salary}</p>
      <div className="flex space-x-2 mt-2 justify-between">
        {isSelected ? (
          <Minus
            onClick={handleToggleCustomerSelection}
            className="w-5 h-5 text-[#EC6724]"
          />
        ) : (
          <Plus
            onClick={handleToggleCustomerSelection}
            className="w-5 h-5 text-[#EC6724]"
          />
        )}
        <Edit onClick={handleEditClick} className="w-5 h-5" />
        <Trash onClick={handleDeleteClick} className="w-5 h-5 text-[#EC6724]" />
      </div>

      {isOverlayOpen && (
        <Modal onClose={closeOverlay}>
          {overlayContent === "edit" ? (
            <>
              <h2 className="text-lg font-bold mb-4">Editar Cliente</h2>
              <input
                type="text"
                placeholder="Nome"
                defaultValue={customer.name}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full mb-2 p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Empresa"
                defaultValue={customer.company}
                onChange={(e) => setEditedCompany(e.target.value)}
                className="w-full mb-2 p-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                placeholder="Salário"
                defaultValue={customer.salary}
                onChange={(e) => setEditedSalary(e.target.value)}
                className="w-full mb-2 p-2 border border-gray-300 rounded"
              />
              <button
                onClick={handleEditCustomer}
                className="w-full mt-4 bg-[#EC6724] text-white p-2 rounded"
              >
                Editar cliente
              </button>
            </>
          ) : overlayContent === "delete" ? (
            <>
              <h2 className="text-lg font-bold mb-4">Excluir Cliente</h2>
              <p>Tem certeza que deseja excluir o cliente {customer.name}?</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleRemoveCustomer(customer)}
                  className="bg-[#EC6724] w-full text-white p-2 rounded"
                >
                  Excluir cliente
                </button>
              </div>
            </>
          ) : null}
        </Modal>
      )}
    </div>
  );
};

export default CustomerCard;
