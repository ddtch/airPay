import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import dayjs from 'dayjs';

export interface InfoState {
  devMode: boolean;
  cardsData: any[];
  payments: any[];
  notificationsList: any[];
}

const initialState: InfoState = {
  devMode: false,
  cardsData: [
    {
      id: 1,
      number: 'A8716ZJA1',
      label: 'LIGHT',
      balance: 13.20,
      debt: 0.20,
      currency: 'ß'
    },
    {
      id: 2,
      number: 'A8826ZJA1',
      label: 'LIGHT',
      balance: 1.20,
      debt: 0.00,
      currency: 'µ'
    },
    {
      id: 3,
      number: 'A8716GYA1',
      label: 'BOLD',
      balance: 123.20,
      debt: 1.20,
      currency: 'ß'
    },
  ],
  payments: [
    {
      id: 1,
      title: 'Light',
      amount: 28.10,
      currency: '$',
    }
  ],
  notificationsList: [
    {
      id: 1,
      date: +new Date(),
      text: 'Smart card’s balance is about to get to 0. Please, make your payment.',
      isRead: false,
    },
    {
      id: 2,
      date: dayjs().subtract(1, 'day').valueOf(),
      text: 'Your balance has been incresed.',
      isRead: true,
    }
  ]
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
