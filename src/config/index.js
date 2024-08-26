import axios from "axios";
import { TOKEN_KEY } from "../utils/settings/apiKey";

const instance = axios.create({
  baseURL: " https://apparently-uncommon-gopher.ngrok-free.app",
  headers: {
    "ngrok-skip-browser-warning": "69420",
  },
});

// Cấu hình headers trước khi gửi lên server:
instance.interceptors.request.use((config) => {
  const isLogin = localStorage.getItem(TOKEN_KEY) ? true : false;
  config.headers.Authorization = isLogin
    ? `Bearer ${localStorage.getItem(TOKEN_KEY)}`
    : "";
  return config;
});

// Tìm lỗi "401" bằng console.log (error)
// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       window.location.href = `/login?redirectUrl=${window.location.pathname}`;
//     }
//     return Promise.reject(error);
//   }
// );

export default instance;
