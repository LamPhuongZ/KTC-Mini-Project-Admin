import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { loginRequest } from "../services/loginAPI";
import { TOKEN_KEY } from "../../utils/settings/apiKey";

export const loginRequestAction = createAsyncThunk(
  "userAdminSlice/login",
  async (values) => {
    try {
      const userInfo = await loginRequest(values);
      const { token } = userInfo;
      localStorage.setItem(TOKEN_KEY, token);
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

// createSlice: tạo ra các slice, xử lý các action trả về
const userReducer = createSlice({
  name: "userAdminSlice",
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = null;
      localStorage.removeItem('token')
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
export const { logOut } = userReducer.actions;
