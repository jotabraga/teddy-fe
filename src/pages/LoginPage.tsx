import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <div className="flex flex-col items-center justify-center w-full gap-y-[25px] h-screen bg-[#f5f5f5]">
      <p className="font-sans text-[36px] font-normal leading-[43.57px] text-left decoration-skip-ink-none underline-offset-auto">
        Olá, seja bem vindo!
      </p>

      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite seu nome"
        className="w-[521px] h-[60px] rounded px-4 py-2 text-left placeholder:text-[24px] placeholder:font-normal placeholder:font-sans"
      />

      <Button
        className="w-[521px] h-[60px] rounded bg-[#EC6724] text-white font-sans text-[24px] font-bold"
        onClick={handleSubmit}
      >
        Entrar
      </Button>
    </div>
  );
}

export default LoginPage;
