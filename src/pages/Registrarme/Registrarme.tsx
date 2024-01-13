import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { registerUser } from "../../services/User";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import TopBarRegistrarme from "./TopBarRegistrarme";

const imageUrl = "https://i.pinimg.com/564x/47/86/09/478609febc69ac5bfb66315c4b5a7aaf.jpg";

function Registrarme() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = () => {
    console.log("Registrarme button clicked");

    if (userName.length < 5) {
      toast.error("Número de caracteres insuficientes en el nombre.");
      return;
    }

    if (password.length < 5) {
      toast.error("Número de caracteres insuficientes en la contraseña.");
      return;
    }

    registerUser({
      name: userName,
      password,
      role: "user",
    })
      .then(() => {
        toast.success("Usuario registrado");
        setUserName("");
        setPassword("");
        navigate("/");
        window.location.reload();
      })
      .catch(() => {
        toast.error("Error al registrar usuario");
      });
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Usa el nuevo componente TopBarRegistrarme */}
      <TopBarRegistrarme />

      <div className="flex flex-1">
        <section className="w-1/2 bg-gray-200 flex items-center justify-center h-screen overflow-hidden">
          <img src={imageUrl} alt="Ejemplo" className="w-full h-full object-cover" />
        </section>
        <section className="w-1/2 flex flex-col p-4 items-center justify-center">
          <div className="flex flex-col items-center">
            <h2 className="font-bold text-2xl mb-6">Bienvenido</h2>
            <div className="flex flex-col gap-4 mt-4 mb-4">
              <TextField value={userName} onChange={(e) => setUserName(e.target.value)} label="Nombre" variant="outlined" required />
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Contraseña"
                variant="outlined"
                type="password"
                required
              />
            </div>
            <Button variant="contained" onClick={handleRegister}>
              Registrarme
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Registrarme;
