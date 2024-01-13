import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { loginService } from "../services/Login";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import whatsappImage from "C:/Users/Admin/Documents/GitHub/FRONT/public/WATSAPP.webp";
import TopBar from "./TopBar";

// Reemplaza la ruta de la imagen con la nueva URL
const nuevaImagenInicio = "https://media.vogue.mx/photos/5e5c4a5f25623100081c4372/master/pass/Arequipa--can%CC%83o%CC%81n--paisaje.jpg";

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

  const handleWhatsAppClick = () => {
    window.open("https://api.whatsapp.com/send/?phone=%2B51919717728&text&type=phone_number&app_absent=0", "_blank");
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Usa el nuevo componente TopBar */}
      <TopBar />

      {/* Contenido principal */}
      <div className="flex flex-1">
        <section className="w-1/2 bg-gray-200 flex items-center justify-center h-screen overflow-hidden">
          <img src={nuevaImagenInicio} alt="Mapa de Inicio" className="w-full h-full object-cover" />
        </section>
        <section className="w-1/2 flex flex-col p-4 items-center justify-center">
          <div className="flex flex-col items-center">
            <h2 className="font-bold text-2xl mb-6">Iniciar Sesión</h2>
            <div className="rounded-full p-2 bg-black w-max mb-6">
              <VpnKeyIcon sx={{ color: "white" }} fontSize="large" />
            </div>
            <TextField onChange={(e) => setUsername(e.target.value)} label="Usuario" variant="outlined" required className="mb-4" />
            <div className="mb-2" />
            <TextField onChange={(e) => setPassword(e.target.value)} label="Contraseña" variant="outlined" type="password" required className="mb-4" />
            <Button onClick={handleLogin} variant="contained" className="mb-4">
              Ingresar
            </Button>
            <div className="mb-4" />
          </div>
        </section>
      </div>

      {/* Botón de WhatsApp en la parte inferior derecha */}
      <section className="fixed bottom-0 right-0 p-4">
        <Button onClick={handleWhatsAppClick}>
          <img src={whatsappImage} alt="WhatsApp" className="w-12 h-12" />
        </Button>
      </section>
    </div>
  );
}

export default Login;


