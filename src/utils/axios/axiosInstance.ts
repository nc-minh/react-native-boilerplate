import axios from "axios";

import {localStorageKey} from "@/constants/localStorage";
import {storage} from "@/localStorage";

const axiosInstance = axios.create({
  timeout: 100000,
});

axiosInstance.interceptors.request.use(
  function (config: any) {
    const accessToken = storage.getString(localStorageKey.ACCESS_TOKEN);
    if (accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  },
);

export default axiosInstance;
