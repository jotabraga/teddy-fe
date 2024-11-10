import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold">Lista de Clientes</h1>
      <button
        onClick={() => navigate("/selecionados")}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Ver Selecionados
      </button>
    </div>
  );
}

export default HomePage;
