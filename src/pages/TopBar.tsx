import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TopBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      style={{
        backgroundColor: "black",
        color: "white",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "2px solid #f0f0f0", // Color del contorno
      }}
    >
      <span className="font-bold text-lg">CLIMA AREQUIPA</span>
      <Button variant="outlined" onClick={() => navigate("/registrarme")} style={{ backgroundColor: "#f0f0f0", color: "black" }}>
        Registrarse
      </Button>
    </section>
  );
};

export default TopBar;

