import instance from "../../config/index";
import {
  API_GET_ACCOUNT,
  API_GET_ACCOUNTS,
  API_POST_ACCOUNT,
} from "../../utils/settings/apiKey";

// Call API lấy danh dách người dùng
export const getAccountAllAPI = async () => {
  try {
    const response = await instance.get(API_GET_ACCOUNTS);
    return response.data;
  } catch (error) {
    console.log("API call failed", error);
    throw error;
  }
};

// Call API thêm tài khoản
export async function createAccountAPI(payload) {
  try {
    const response = await instance.post(API_POST_ACCOUNT, payload);
    return response.data;
  } catch (error) {
    console.log("API call failed", error);
    throw error;
  }
}

// Call API xóa tài khoản
export async function deleteAccountAPI(accountId) {
  try {
    const response = await instance.put(`${API_POST_ACCOUNT}/${accountId}`);
    return response;
  } catch (error) {
    console.log("API call failed", error);
    throw error;
  }
}

export const getMeAPI = async () => {
  try {
    const response = await instance.get(API_GET_ACCOUNT);
    return response.data;
  } catch (error) {
    console.log("API call failed", error);
    throw error;
  }
};
