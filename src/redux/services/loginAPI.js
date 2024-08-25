import { API_LOGIN } from "../../utils/settings/apiKey";
import axiosClient from "../../config/index";

export const loginRequest = async (payload) => {
  try {
    const response = await axiosClient.post(API_LOGIN, payload);
    return response.data;
  } catch (error) {
    console.log("API call failed", error);
    throw error;
  }
};
