import axios from "axios";
import { api_url } from "../constants";
import { ILoginService } from "../interfaces/Login/Login";

const instance = axios.create({
  baseURL: api_url,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginService = (data: ILoginService) => {
  return instance.post("login", data);
};
