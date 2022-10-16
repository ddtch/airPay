import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface InfoState {
  devMode: boolean;
}

const initialState: InfoState = {
  devMode: false,
};

export const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    setDevMode: (state, action: PayloadAction<boolean>) => {
      state.devMode = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setDevMode,
} = infoSlice.actions;

export default infoSlice.reducer;
