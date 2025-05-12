import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "./../../services/api";
import { Eye, EyeOff } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { msgError, msgInfo } from "../../alerts";
import imagembackground from "../../imgs/fundo_login.png"

function ScreenLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!username && !password) {
        return msgInfo("Preencha todos os campos!");
      }

      const res = await api.post("/login", {
        username,
        password,
      });

      login(res.data.token);
      navigate("/home");
    } catch (error) {
      msgError("Erro ao fazer login");
      setPassword("");
      setUsername("");
    }
  };

  const backgroundimagem = imagembackground

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundimagem})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="h-screen flex items-center justify-center select-none
      md:justify-end md:pr-56
      "
    >
      <ToastContainer autoClose={5000} />
      <div
        className="bg-white w-[300px] h-[250px] flex flex-col justify-center items-center rounded-md
        md:w-[400px] md:h-[300px]
        "
      >
        <h2 className="mb-5 font-bold text-2xl">Conecte-se</h2>
        <form
          onSubmit={handleLogin}
          className="flex flex-col w-64 gap-1
          md:w-80 md:gap-2
          "
        >
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-slate-200 pl-3 py-1 rounded-md
                border border-gray-300 focus:border-primary-scooter_500 focus:ring-primary-scooter_500 focus:outline-none"
          />
          <div className="relative w-full max-w-xs">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-200 pl-3 pr-10 py-1 rounded-md 
                border border-gray-300 focus:border-primary-scooter_500 focus:ring-primary-scooter_500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          <button
            type="submit"
            className="bg-primary-scooter_500 py-1 rounded-md 
                border-[2px] border-transparent 
                hover:bg-primary-scooter_100 hover:border-primary-scooter_400 hover:border-solid transition duration-700"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ScreenLogin;
