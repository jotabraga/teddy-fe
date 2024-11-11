import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RootState } from "@/redux/store";
import { setUser } from "@/redux/user/user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (user) {
      navigate("/home");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-y-[15px] md:gap-y-[25px] h-screen bg-[#f5f5f5] px-4">
      <p className="font-sans text-[20px] sm:text-[24px] md:text-[36px] font-normal leading-[1.2] text-center">
        Olá, seja bem-vindo!
      </p>

      <Input
        type="text"
        value={user}
        onChange={(e) => dispatch(setUser(e.target.value))}
        placeholder="Digite seu nome"
        className="w-full max-w-[90%] md:max-w-[521px] h-[50px] sm:h-[40px] md:h-[60px] rounded px-4 py-2 text-left text-[16px] sm:text-[18px] md:text-[24px] font-normal font-sans placeholder:text-[16px] sm:placeholder:text-[18px] md:placeholder:text-[24px] placeholder:font-normal placeholder:font-sans"
      />

      <Button
        className="w-full max-w-[90%] md:max-w-[521px] h-[50px] sm:h-[40px] md:h-[60px] rounded bg-[#EC6724] text-white font-sans text-[18px] sm:text-[16px] md:text-[24px] font-bold hover:bg-[#a44819]"
        onClick={handleSubmit}
      >
        Entrar
      </Button>
    </div>
  );
}

export default LoginPage;
