import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  loggedIn: boolean,
  walletConnected: boolean,
}

const initialState: AuthState = {
  loggedIn: true,
  walletConnected: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedInStatus: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLoggedInStatus,
} = authSlice.actions;

export default authSlice.reducer;
