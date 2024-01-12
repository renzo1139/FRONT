import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { registerUser } from "../../services/User";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Registrarme() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = () => {
    console.log("Registrarme button clicked");
    
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
    <div className="p-4">
      <div className="p-4">
        <Button variant="outlined" onClick={() => navigate("/")}>
          Ir al inicio
        </Button>
      </div>
      <div className="w-[90%] m-auto rounded-xl border border-slate-700 p-4">
        <h2 className="font-bold text-xl">Registrarme</h2>
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
    </div>
  );
}

export default Registrarme;
