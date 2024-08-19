import instance from "../../config/index";

// Call API lấy danh dách người dùng
export const getAccountAllAPI = async () => {
  const { data } = await instance.get(
    `/QuanLyNguoiDung/LayDanhSachNguoiDung`
  );
  return data;
};

// Call API thêm tài khoản
export async function createAccountAPI(payload) {
  try {
    const response = await instance.post(
      "/QuanLyNguoiDung/ThemNguoiDung",
      payload
    );
    return response;
  } catch (error) {
    throw error.response.data.content;
  }
}

// Call API lấy thông tin tài khoản
export async function getAccountAPI(accountName) {
  try {
    const response = await instance.post(
      `/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${accountName}`
    );
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

// Call API cập nhật thông tin
export const updateAccountAPI = async (account) => {
  try {
    const payload = { ...account };

    const { data } = await instance.post("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", payload);
    return data;
  } catch (error) {
    throw error.response.data.content;
  }
};

// Call API xóa tài khoản
export async function deleteAccountAPI(accountName) {
  try {
    const response = await instance.delete(
      `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${accountName}`
    );
    return response;
  } catch (error) {
    throw error.response.data.content;
  }
}

// Call API lấy danh sách loại người dùng
export const getTypeAPI = async () => {
  const { data } = await instance.get(
    `/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`
  );
  return data;
};
