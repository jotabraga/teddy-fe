import Logo from "@/assets/logoTeddy.svg";
import { SidebarTrigger } from "@/components/ui/sidebar";

function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white text-black w-full h-[100px] shadow-md">
      <div className="flex items-center space-x-4">
        <SidebarTrigger />
      </div>

      <div className="flex items-center space-y-4 w-4/5 mx-auto">
        <img src={Logo} alt="Logo da Empresa" className="w-24 h-auto" />
        <div className="flex items-center gap-5 mx-auto">
          <h1 className="text-lg font-semibold">Clientes</h1>
          <h1 className="text-lg font-semibold">Clientes selecionados</h1>
          <button className="text-lg font-semibold text-red-600">Sair</button>
        </div>

        <h1 className="text-lg m-0">
          Olá, <span className="font-semibold">Usuário</span>
        </h1>
      </div>
    </header>
  );
}

export default Header;
