import axios, { InternalAxiosRequestConfig } from "axios";


const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

let interceptorAdded = false;

export const setupResponseInterceptor = (navigate: any) => {
  if (interceptorAdded) return;

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
      return Promise.reject(error);
    },
  );

  interceptorAdded = true;
};
export default axiosInstance;
