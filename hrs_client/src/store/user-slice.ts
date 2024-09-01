import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 定义初始状态类型
interface UserState {
  user: {
    id: string;
    username: string;
  };
}

// 定义初始状态
const initialState: UserState = {
  user: {
    id: "",
    username: "",
  },
};

// 创建 Slice
const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ id: string; username: string }>
    ) => {
      state.user = action.payload;
    },
  },
});

// 导出 actions 和 reducer
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
