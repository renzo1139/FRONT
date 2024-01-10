import { Button, Drawer } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

function DrawerCustomComponent() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="m-4">
      <div className="w-max p-2 bg-black rounded-full cursor-pointer" onClick={() => setDrawerOpen(true)}>
        <MenuIcon sx={{ color: "white" }} />
      </div>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div className="p-4">
          <Button variant="contained" color="error">
            <p onClick={logout}>Cerrar Sesión</p>
          </Button>
        </div>
      </Drawer>
    </div>
  );
}

export default DrawerCustomComponent;
