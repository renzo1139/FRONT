import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const TopBarRegistrarme = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-black text-white p-4 flex justify-between items-center" style={{ border: "2px solid #f0f0f0" }}>
      <span className="font-bold text-lg">CLIMA AREQUIPA</span>
      <Button
        variant="outlined"
        onClick={() => navigate("/")}
        style={{ backgroundColor: "#f0f0f0", color: "black" }}
      >
        Volver al Inicio
      </Button>
    </section>
  );
};

export default TopBarRegistrarme;

