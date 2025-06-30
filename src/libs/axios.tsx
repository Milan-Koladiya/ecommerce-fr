import axios from "axios";
import localStorage from "../utils/localStorage";
import type { AxiosInstance, AxiosResponse } from "axios";

export type APIsuccessResponse<T = undefined> = {
  error?: boolean | null,
  message?: any,
  data?: any,
  response?: AxiosResponse<T>
}

const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL ||"http://localhost:5500";
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
  });

  instance.interceptors.request.use(
    (config) => {
      const tokens = localStorage.getItem("token") ?? {};
    
      config.headers.authorization = `Bearer ${tokens}`;
      const fullUrl = `${config.baseURL}${config.url}`;
      console.log(`API CALL ${config.method?.toUpperCase()} ${fullUrl}`, config);
      return config;
    },
    (error) => {
      console.log("+++ error config", error)
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (response) => {
      console.log("+++Response", response)
      return response;
    },
    (error) => {
      console.log("+++error response", error);

      return Promise.reject(error.response ?? error);
    }
  );


  return instance;
};

const axiosClient = createAxiosInstance();

export default axiosClient;
