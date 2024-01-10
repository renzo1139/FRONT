import axios from "axios";
import { api_url } from "../constants";
import { IPermissionsToUser } from "../interfaces/Permissions/Permissions";

const instance = axios.create({
  baseURL: api_url,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllPermissions = () => {
  return instance.get("permissions");
};

export const addPermissionToUser = (data: IPermissionsToUser) => {
  return instance.post("permission/addPermision", data);
};
