import axiosClient from "../../config/index";

export const loginRequest = async (payload) => {
  try {
    const response = await axiosClient.post(`/api/auth/admins/login`, payload);
    return response.data;
  } catch (error) {
    console.log("API call failed", error);
    throw error;
  }
};
