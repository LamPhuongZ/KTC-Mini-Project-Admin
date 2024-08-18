import axios from "axios";

const instance = axios.create({
  baseURL: "https://absolute-pangolin-key.ngrok-free.app",
  headers: {
    "ngrok-skip-browser-warning": "69420",
  },
});

export default instance;
