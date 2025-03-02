import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      data: [],
    },
  },

  reducers: {
    disAddUserApi(state, action) {
      const { data } = action.payload;
      state.user.data = data;
    },
  },
});

export const { disAddUserApi } = UserSlice.actions;

export default UserSlice.reducer;
