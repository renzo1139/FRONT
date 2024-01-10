import axios from "axios";
import { api_url } from "../constants";
import { PropsWeather } from "../interfaces/Weather/Weather";

const instance = axios.create({
  baseURL: api_url,
  headers: {
    "Content-Type": "application/json",
  },
});

// 2af725cf554841b0a84151407233012

export const callTemperature = (data: PropsWeather) => {
  return instance.get(
    `https://api.weatherapi.com/v1/current.json?key=2af725cf554841b0a84151407233012&q=${data.lat}, ${data.lng}&aqi=no&lang=es`
  );
};
