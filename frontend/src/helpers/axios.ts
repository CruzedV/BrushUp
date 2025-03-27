import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response?.status === 401 &&
      !["/api/auth/login", "/api/auth/register"].includes(error.config?.url)
    ) {
      deleteCookie("token");
      console.warn("Неавторизован! Перенаправляем на логин...");  
    }
    return Promise.reject(error);
  }
);

export default api;