import axiosClient from "../../config/index";

export const loginRequest = async (payload) => {
  try {
    const response = await axiosClient.post(
      "/QuanLyNguoiDung/DangNhap",
      payload
    );
    return response.data.content;
  } catch (error) {
    throw error.response.data.message;
  }
};
