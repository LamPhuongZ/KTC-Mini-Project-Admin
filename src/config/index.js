import axios from "axios";

// const getToken = () => {
//   if (typeof window !== "undefined") {
//     const userData = localStorage.getItem("userData");
//     try {
//       return JSON.parse(userData || "").accessToken || "";
//     } catch (error) {
//       console.log(error);
//       return "";
//     }
//   }
//   return "";
// };

// const token = getToken();

const instance = axios.create({
  // baseURL: "https://absolute-pangolin-key.ngrok-free.app",
  // headers: {
  //   "ngrok-skip-browser-warning": "69420",
  // },

  baseURL: "http://localhost:8080/swagger",
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0YWlfa2hvYW4iOjEwMTAsImhvX3RlbiI6IlBoYW0gVmFuIEoiLCJlbWFpbCI6InBoYW12YW5qQGV4YW1wbGUuY29tIiwic29fZHQiOiIwODk5OTk5OTk5IiwibWF0X2toYXUiOiIiLCJtYV9sb2FpX25ndW9pX2R1bmciOiJVU0VSIiwiaWF0IjoxNzI0MDg4MDg4LCJleHAiOjE3MjQxNzQ0ODh9.xvk3NnmiSgAUsD4_2mawJ7_sRB522eyQu4cQxabOkec`,
  },
});

export default instance;
