import Logo from "@/assets/logoTeddy.svg";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { RootState } from "@/redux/store";
import { setViewOption } from "@/redux/viewOption/viewOption";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { viewOption } = useSelector((state: RootState) => state.viewOption);

  const handleOptionClick = (option: string) => {
    dispatch(setViewOption(option));
  };

  const handleExitClick = () => {
    navigate("/");
  };

  const { user } = useSelector((state: RootState) => state.user);
  return (
    <header className="flex items-center justify-between p-4 bg-white text-black w-full h-auto sm:h-[100px] shadow-md">
      <div className="flex items-center space-x-4">
        <SidebarTrigger className="self-start" />
      </div>
      <div className="flex flex-col sm:flex-row flex-grow sm:flex-grow-0 items-center space-y-4 sm:space-y-0 sm:w-4/5 sm:mx-auto sm:justify-between">
        <img
          src={Logo}
          alt="Logo da Empresa"
          className="hidden md:block w-16 sm:w-24 h-auto"
        />
        <div className="flex flex-col sm:flex-row items-center gap-5 mx-auto">
          <h1
            onClick={() => handleOptionClick("Clientes")}
            className={`text-base sm:text-lg font-semibold cursor-pointer ${
              viewOption === "Clientes" ? "text-[#EC6724]" : ""
            }`}
          >
            Clientes
          </h1>
          <h1
            onClick={() => handleOptionClick("Clientes selecionados")}
            className={`text-base sm:text-lg font-semibold cursor-pointer ${
              viewOption === "Clientes selecionados" ? "text-[#EC6724]" : ""
            }`}
          >
            Clientes selecionados
          </h1>
          <button
            onClick={() => handleExitClick()}
            className="text-base sm:text-lg font-semibold"
          >
            Sair
          </button>
        </div>
        <h1 className="hidden md:block text-base sm:text-lg m-0 text-center sm:text-right">
          Olá, <span className="font-semibold">{user}</span>
        </h1>
      </div>
    </header>
  );
}

export default Header;
