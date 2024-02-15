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

// axiosInstance.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     if (error.response) {
//       // Xử lý lỗi từ phản hồi HTTP
//       const {data, status} = error.response;

//       console.log("data", data);

//       return Promise.reject({
//         data: null,
//         errors: {
//           message: data.message,
//           status: status,
//           errorCode: error.code, // hoặc bạn có thể đặt giá trị khác nếu cần
//           service: "Your Service Name", // tên của dịch vụ của bạn
//         },
//       });
//     } else if (error.request) {
//       // Lỗi không nhận được phản hồi từ máy chủ
//       console.error("Request error:", error.request);
//       return Promise.reject({
//         data: null,
//         errors: {
//           message: "Request error",
//           status: 0,
//           errorCode: "REQUEST_ERROR",
//           service: "Your Service Name",
//         },
//       });
//     } else {
//       // Lỗi xảy ra khi thiết lập yêu cầu
//       console.error("Error:", error.message);
//       return Promise.reject({
//         data: null,
//         errors: {
//           message: error.message,
//           status: 0,
//           errorCode: "REQUEST_SETUP_ERROR",
//           service: "Your Service Name",
//         },
//       });
//     }
//   },
// );

export default axiosInstance;
