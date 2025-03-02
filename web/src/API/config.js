import axios from "axios";
const server = process.env.REACT_APP_SERVICE_URL;
const http = axios.create({
  baseURL: server, // Базовый URL сервера
  withCredentials: true, // Если нужен обмен cookies
});

http.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
