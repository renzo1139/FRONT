import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import { IUser } from "../../../interfaces/User/User";
import { Dispatch, SetStateAction } from "react";
import { addAdminUser, deleteAdminUser, deleteUser, getAllUsers } from "../../../services/User";
import toast from "react-hot-toast";

export const renderUser = (
  user: IUser,
  setCurrentUser: Dispatch<SetStateAction<IUser | undefined>>,
  setIsEditarPermisosOpen: Dispatch<SetStateAction<boolean>>
) => {
  const actualUser = JSON.parse(localStorage.getItem("user") as string) as IUser;

  const makeOrDeleteAdmin = (id: number, type: string) => {
    switch (type) {
      case "quit":
        deleteAdminUser({
          id,
        })
          .then(() => {
            toast.success("Administrador eliminado con éxito");
            window.location.reload();
          })
          .catch(() => {
            toast.error("No se pudo eliminar el administrador");
          });
        break;
      case "make":
        addAdminUser({
          id,
        })
          .then(() => {
            toast.success("Administrador agregado con éxito");
            window.location.reload();
          })
          .catch(() => {
            toast.error("No se pudo agregar el administrador");
          });
        break;
      default:
        break;
    }
  };

  return (
    <>
      {actualUser.id !== user.id && (
        <div key={user.id} className="max-w-sm rounded overflow-hidden shadow-lg m-4 p-4">
          <div className="flex gap-4 items-center">
            <div className="font-bold text-xl mb-2">{user.name}</div>
            <p className="flex gap-2 items-center text-white text-base bg-slate-700 w-max p-2 rounded-xl">
              {user.role === "admin" ? <AdminPanelSettingsIcon /> : <PersonIcon />}
              {user.role}
            </p>
          </div>
          <div>
            <span className="text-red-500">desde:</span> {new Date(user.created_at).toLocaleDateString()}
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <p className="font-bold ">Permisos:</p>
            {user.permissions.length > 0 && (
              <div className="shadow-md p-4 flex gap-4">
                <p>Permiso Actual: </p>
                <span className="font-bold">{user.permissions[user.permissions.length - 1].name}</span>
              </div>
            )}

            {<p className="text-gray-700 text-base">{user.permissions.length === 0 && "Aún no tiene permisos designados"}</p>}
            <button
              className="p-2 bg-black text-white rounded-xl"
              onClick={() => {
                setCurrentUser(user);
                setIsEditarPermisosOpen(true);
              }}
            >
              Editar permisos
            </button>
            {user.role === "admin" ? (
              <button className="bg-blue-600 text-white rounded-xl p-2" onClick={() => makeOrDeleteAdmin(user.id, "quit")}>
                Quitar administrador
              </button>
            ) : (
              <button className="bg-green-600 text-white rounded-xl p-2" onClick={() => makeOrDeleteAdmin(user.id, "make")}>
                Dar administrador
              </button>
            )}
            <button
              className="p-2 bg-red-600 text-white rounded-xl"
              onClick={() => {
                deleteUserFromDB(user.id);
              }}
            >
              Eliminar usuario
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export const callUsers = (setUsers: Dispatch<SetStateAction<IUser[] | undefined>>) => {
  getAllUsers().then((response) => {
    setUsers(response.data);
  });
};

export const deleteUserFromDB = (id: number) => {
  deleteUser({
    id,
  })
    .then(() => {
      toast.success("Usuario eliminado con éxito");
    })
    .catch(() => {
      toast.error("No se pudo eliminar el usuario");
    });
};
