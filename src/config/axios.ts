import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { supabase } from "./supabase";

const api: AxiosInstance = axios.create({
  timeout: 10000,
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    } else {
      console.warn("Sesión no encontrada o token expirado");
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
