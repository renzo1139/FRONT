import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { loginService } from "../services/Login";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username && password) {
      loginService({
        username,
        password,
      })
        .then((response) => {
          if (response.data.role === "admin") {
            toast.success("Administrador");
            navigate("/dashboard");
            localStorage.setItem("user", JSON.stringify(response.data));
          } else {
            localStorage.setItem("user", JSON.stringify(response.data));
            toast.success("Bienvenido");
            navigate("/home");
          }
        })
        .catch(() => toast.error("Campos incorrectos"));
    } else {
      toast.error("Completa los campos");
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-2 justify-center min-h-[100vh] gap-4">
      <section className="flex flex-col gap-4 w-full items-center justify-center">
        <h2 className="font-bold text-2xl">Iniciar Sesión</h2>
        <div className="rounded-full p-2 bg-black w-max">
          <VpnKeyIcon sx={{ color: "white" }} fontSize="large" />
        </div>
      </section>
      <section className="flex flex-col gap-4 justify-center items-center mt-5">
        <TextField onChange={(e) => setUsername(e.target.value)} label="Usuario" variant="outlined" required />
        <TextField onChange={(e) => setPassword(e.target.value)} label="Contraseña" variant="outlined" type="password" required />
        <Button onClick={handleLogin} variant="contained">
          Ingresar
        </Button>
        <Button variant="outlined" onClick={() => navigate("/registrarme")}>
          Registrarse
        </Button>
      </section>
    </div>
  );
}

export default Login;
