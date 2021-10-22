import axios from "axios";

const defaultOptions = {
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

let axiosClient = axios.create(defaultOptions);

axiosClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default axiosClient;
