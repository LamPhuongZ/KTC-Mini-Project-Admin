import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { loginRequest } from "../services/loginAPI";

export const loginRequestAction = createAsyncThunk(
  "userAdminSlice/login",
  async (values) => {
    try {
      const userInfo = await loginRequest(values);

      //trường hợp ko đủ quyền truy cập
      if (userInfo.maLoaiNguoiDung !== "QuanTri") {
        toast.error("Không đủ quyền truy cập");
        throw new Error("Không đủ quyền truy cập");
      }

      const { accessToken } = userInfo;
      localStorage.setItem("accessToken", accessToken);

      //trường hợp đủ quyền truy cập
      return userInfo;
    } catch (error) {
      toast.error(error);
      throw new Error(error);
    }
  }
);

const initialState = {
  user: null,
  isLoading: false,
  error: "",
};

const userReducer = createSlice({
  name: "userAdminSlice",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginRequestAction.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(loginRequestAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(loginRequestAction.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export default userReducer.reducer;
export const { logout } = userReducer.actions;
