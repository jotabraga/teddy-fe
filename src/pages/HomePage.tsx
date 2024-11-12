import CustomerCard from "@/components/layout/customerCard";
import Modal from "@/components/layout/modal";
import { PaginationComponent } from "@/components/layout/pagination";
import { Input } from "@/components/ui/input";
import { cleanCustomersSelection } from "@/redux/selectedCustomers/selectedCustomers";
import { RootState } from "@/redux/store";
import { createCustomer, getCustomers } from "@/services/customers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Customer {
  id: number;
  name: string;
  company: string;
  salary: string;
}

function HomePage() {
  const [overlayContent, setOverlayContent] = useState<
    "edit" | "delete" | "create" | null
  >(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [customersPerPage, setCustomersPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customersCount, setCustomersCount] = useState<number>(0);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [salary, setSalary] = useState("");
  const { viewOption } = useSelector((state: RootState) => state.viewOption);
  const { selectedCustomers } = useSelector(
    (state: RootState) => state.selectedCustomers
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getCustomers(currentPage, customersPerPage).then((response) => {
      setCustomers(response.data[0] || []);
      setCustomersCount(response.data[1] || 0);
    });
  }, [customersPerPage, currentPage]);

  const handleCreateClick = () => {
    setOverlayContent("create");
    setIsOverlayOpen(true);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
    setOverlayContent(null);
    setName("");
    setCompany("");
    setSalary("");
  };

  const handleCleanCustomersSelection = () => {
    dispatch(cleanCustomersSelection());
  };

  const handleCreateCustomer = async () => {
    const newCustomer = { name, company, salary };
    try {
      const response = await createCustomer(newCustomer);
      setCustomers((prevCustomers) => [...prevCustomers, response.data]);
      setCustomersCount((prevCustomersCount) => prevCustomersCount + 1);
      closeOverlay();
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return viewOption === "Clientes selecionados" ? (
    <div className="flex flex-col items-center space-y-4 w-4/5 mx-auto">
      <div className="grid grid-cols-4 gap-4 w-full mt-4">
        {selectedCustomers.length ? (
          selectedCustomers.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              customers={customers}
              setCustomers={setCustomers}
              setCustomersCount={setCustomersCount}
            />
          ))
        ) : (
          <></>
        )}
      </div>
      <button
        onClick={handleCleanCustomersSelection}
        className="w-full h-10 rounded border-2 border-[#EC6724]"
      >
        <p className="text-sm font-bold text-[#EC6724]">
          Limpar clientes selecionados
        </p>
      </button>
    </div>
  ) : (
    <div className="flex flex-col items-center space-y-4 w-4/5 mx-auto">
      <div className="flex justify-between w-full">
        <h1 className="text-[18px] text-left">
          <span className="font-semibold">{customersCount}</span> clientes
          encontrados:
        </h1>
        <div className="text-[18px] items-center space-x-2 hidden md:flex">
          <h1>Clientes por página:</h1>
          <Input
            type="number"
            min={1}
            defaultValue={10}
            onChange={(e) => setCustomersPerPage(Number(e.target.value))}
            className="w-16 text-center"
            aria-label="Clientes por página"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full mt-4">
        {customers.length ? (
          customers.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              customers={customers}
              setCustomers={setCustomers}
              setCustomersCount={setCustomersCount}
            />
          ))
        ) : (
          <></>
        )}
      </div>

      <button
        onClick={handleCreateClick}
        className="w-full h-10 rounded border-2 border-[#EC6724]"
      >
        <p className="text-sm font-bold text-[#EC6724]">Criar cliente</p>
      </button>
      <PaginationComponent
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />

      {isOverlayOpen && (
        <Modal onClose={() => closeOverlay()}>
          {overlayContent === "create" ? (
            <>
              <h2 className="text-lg font-bold mb-4">Criar Cliente</h2>
              <Input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mb-2 p-2 border border-gray-300 rounded"
              />
              <Input
                type="text"
                placeholder="Empresa"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full mb-2 p-2 border border-gray-300 rounded"
              />
              <Input
                type="number"
                placeholder="Salário"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full mb-2 p-2 border border-gray-300 rounded"
              />
              <button
                onClick={handleCreateCustomer}
                className="w-full mt-4 bg-[#EC6724] text-white p-2 rounded"
              >
                Criar cliente
              </button>
            </>
          ) : null}
        </Modal>
      )}
    </div>
  );
}

export default HomePage;
