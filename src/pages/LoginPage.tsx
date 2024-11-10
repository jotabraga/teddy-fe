import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name) {
      navigate("/home");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold">Bem-vindo!</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite seu nome"
        className="px-4 py-2 border rounded"
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Entrar
      </button>
    </div>
  );
}

export default LoginPage;
