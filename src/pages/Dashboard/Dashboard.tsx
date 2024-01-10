import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../interfaces/User/User";
import { callUsers, renderUser } from "./functions";
import EditarPermisos from "../EditarPermisos/EditarPermisos";
import DrawerCustomComponent from "../../components/DrawerCustomComponent";

function Dashboard() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser[]>();
  const [isEditarPermisosOpen, setIsEditarPermisosOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser>();
  const [change, setChange] = useState<boolean>(false);

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
    callUsers(setUsers);
  }, [change]);

  useEffect(() => {
    const userFinded = users?.find((user) => user.id === currentUser?.id);
    setCurrentUser(userFinded);
  }, [users]);

  return (
    <div>
      <DrawerCustomComponent />
      <div className="w-full p-8 px-4">
        <p className="font-bold text-xl">Bienvenido</p>
        <div className="border border-slate-500 mt-8 rounded-lg p-2">
          <p className="font-bold">Usuarios:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {users && users.map((user) => renderUser(user, setCurrentUser, setIsEditarPermisosOpen))}
          </div>
        </div>
        {isEditarPermisosOpen && currentUser && (
          <EditarPermisos open={isEditarPermisosOpen} handleClose={setIsEditarPermisosOpen} user={currentUser} setChange={setChange} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
