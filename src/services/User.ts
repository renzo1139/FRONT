import axios from "axios";
import { api_url } from "../constants";
import { IDeleteOrAddAdmin, IDeleteUser, INewUser } from "../interfaces/User/User";

const instance = axios.create({
  baseURL: api_url,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllUsers = () => {
  return instance.get("user");
};

export const deleteUser = (data: IDeleteUser) => {
  return instance.post(`user/deleteUser`, data);
};

export const registerUser = (data: INewUser) => {
  return instance.post(`user/newUser`, data);
};
export const deleteAdminUser = (data: IDeleteOrAddAdmin) => {
  return instance.post(`user/deleteAdmin`, data);
};

export const addAdminUser = (data: IDeleteOrAddAdmin) => {
  return instance.post(`user/makeAdmin`, data);
};
