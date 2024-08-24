import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { loginRequest } from "../services/loginAPI";

export const loginRequestAction = createAsyncThunk(
  "userAdminSlice/login",
  async (values) => {
    try {
      const userInfo = await loginRequest(values);
      const { token } = userInfo;
      localStorage.setItem("token", token);
      return userInfo;
    } catch (error) {
      toast.error(error);
      throw new Error(error);
    }
  }
);

const initialState = {
  token: null,
  isLoading: false,
  error: "",
};

const userReducer = createSlice({
  name: "userAdminSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginRequestAction.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(loginRequestAction.fulfilled, (state, action) => {
      state.token = action.payload.token;
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
