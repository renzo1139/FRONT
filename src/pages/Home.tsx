// Home.tsx
import React, { useEffect } from "react";
import { IUser } from "../interfaces/User/User";
import { useNavigate } from "react-router-dom";
import MyMapComponent from "../components/Map";
import DrawerCustomComponent from "../components/DrawerCustomComponent";
import TopBarHome from "./TopBarHome"; // Importa el nuevo componente

function Home() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const userFounded = JSON.parse(user) as IUser;
      if (userFounded.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      {/* Usa el nuevo componente TopBarHome */}
      <TopBarHome />
      <DrawerCustomComponent />
      <MyMapComponent />
    </div>
  );
}

export default Home;
