import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 定义初始状态类型
interface AuthState {
  isAuthenticated: boolean;
}

// 定义初始状态
const initialState: AuthState = {
  isAuthenticated: true,
};

// 创建 Slice
const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem("access_token"); // 用户退出时清除Token
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

// 导出 actions 和 reducer
export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
