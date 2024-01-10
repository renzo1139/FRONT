import { Dispatch, SetStateAction, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { IUser } from "../../interfaces/User/User";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { permisos } from "./constants/constants";
import { addPermissionToUser } from "../../services/Permissions";
import toast from "react-hot-toast";

interface DialogProps {
  open: boolean;
  handleClose: Dispatch<SetStateAction<boolean>>;
  user: IUser;
  setChange: Dispatch<SetStateAction<boolean>>;
}

function EditarPermisos({ open, handleClose, user, setChange }: DialogProps) {
  const [currentPermiso, setCurrentPermiso] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setCurrentPermiso(event.target.value as string);
  };

  const addPermission = (permiso: string) => {
    addPermissionToUser({
      id: user.id,
      permissionName: permiso,
    })
      .then(() => {
        toast.success("Permiso agregado correctamente");
        setChange((prevState) => !prevState);
      })
      .catch(() => {
        toast.error("Error al agregar permiso");
      });
  };

  return (
    <Dialog open={open} onClose={() => handleClose(false)} fullWidth>
      <DialogTitle>Editar Permisos</DialogTitle>
      <DialogContent>
        <p className="font-bold">{user.name}</p>
        <p className="text-sm text-slate-400">ID: {user.id}</p>
        <Box>
          {user.permissions.length === 0 ? (
            <div className="shadow-md p-4">
              <p className="text-gray-700 text-base">Aún no tiene permisos designados</p>
            </div>
          ) : (
            <div className="shadow-md p-4 flex gap-4">
              <p>Permiso Actual: </p>
              <span className="font-bold">{user.permissions[user.permissions.length - 1].name}</span>
            </div>
          )}

          <div className="mt-6 mb-6">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Selecciona un permiso</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currentPermiso}
                label="Selecciona un permiso"
                onChange={handleChange}
              >
                {permisos.map((permiso, index) => (
                  <MenuItem key={index} value={permiso}>
                    {permiso}
                  </MenuItem>
                ))}
              </Select>
              <div className="mt-5 flex justify-end">
                <Button variant="contained" onClick={() => addPermission(currentPermiso)}>
                  Agregar
                </Button>
              </div>
            </FormControl>
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditarPermisos;
