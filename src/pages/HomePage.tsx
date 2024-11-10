import { PaginationComponent } from "@/components/layout/pagination";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash } from "lucide-react";
import { useState } from "react";

function HomePage() {
  const customers = [
    {
      id: 1,
      name: "joao",
      company: "teddy",
      salary: "8000",
    },
    {
      id: 1,
      name: "joao",
      company: "teddy",
      salary: "8000",
    },
    {
      id: 1,
      name: "joao",
      company: "teddy",
      salary: "8000",
    },
    {
      id: 1,
      name: "joao",
      company: "teddy",
      salary: "8000",
    },
    {
      id: 1,
      name: "joao",
      company: "teddy",
      salary: "8000",
    },
    {
      id: 1,
      name: "joao",
      company: "teddy",
      salary: "8000",
    },
    {
      id: 1,
      name: "joao",
      company: "teddy",
      salary: "8000",
    },
    {
      id: 1,
      name: "joao",
      company: "teddy",
      salary: "8000",
    },
    {
      id: 1,
      name: "joao",
      company: "teddy",
      salary: "8000",
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-4/5 mx-auto">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-bold">16 clientes encontrados:</h1>
        <div className="flex items-center space-x-2">
          <h1>Clientes por página:</h1>
          <Input
            type="number"
            defaultValue={16}
            className="w-16 text-center"
            aria-label="Clientes por página"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 w-full mt-4">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="p-4 border border-gray-300 rounded shadow-md"
          >
            <h2 className="text-lg font-semibold">{customer.name}</h2>
            <p>Empresa: {customer.company}</p>
            <p>Salário: R${customer.salary}</p>
            <div className="flex space-x-2 mt-2 justify-between">
              <Plus className="w-5 h-5" />
              <Edit className="w-5 h-5" />
              <Trash className="w-5 h-5 text-[#EC6724]" />
            </div>
          </div>
        ))}
      </div>

      <button className="w-full h-10 rounded border-2 border-[#EC6724]">
        <p className="text-sm font-bold text-[#EC6724]">Criar clientes</p>
      </button>
      <PaginationComponent
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
}

export default HomePage;
