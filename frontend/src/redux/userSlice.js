import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "Customer",
  userID: null,
  address: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserID: (state, action) => {
      state.userID = action.payload;
    },
    clearUserID: (state) => {
      state.userID = null;
    },
    setUserAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { setUserID, clearUserID, setUserAddress } = userSlice.actions;

export default userSlice.reducer;
