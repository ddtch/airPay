import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import dayjs from 'dayjs';
const card1 = require('../../assets/img-card-1.png');
const card2 = require('../../assets/img-card-2.png');

export interface InfoState {
  devMode: boolean;
  cardsData: any[];
  payments: any[];
  notificationsList: any[];
  walletConnectMode: boolean;
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
      currency: 'ß',
      cardImage: card1,
    },
    {
      id: 2,
      number: 'A8826ZJA1',
      label: 'LIGHT',
      balance: 1.20,
      debt: 0.00,
      currency: 'µ',
      cardImage: card2,
    },
  ],
  payments: [
  ],
  notificationsList: [
    {
      id: 1,
      date: dayjs().valueOf(),
      title: 'Your wallet has been connected',
      text: 'Smart card’s balance is about to get to 0. Please, make your payment.',
      isRead: false,
    },
    {
      id: 2,
      date: dayjs().subtract(2, 'day').add(1, 'hour').valueOf(),
      title: 'Transaction is approoved',
      text: 'Your balance has been incresed.',
      isRead: true,
      merchant: true,
    },
    {
      id: 3,
      date: dayjs().subtract(3, 'day').subtract(1, 'hour').add(21, 'minutes').valueOf(),
      title: 'Your information is updated',
      text: 'Your balance has been incresed.',
      isRead: true,
    }
  ],
  walletConnectMode: false,
};

export const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    setDevMode: (state, action: PayloadAction<boolean>) => {
      state.devMode = action.payload;
    },
    setTransactionsList: (state, action: PayloadAction<any[]>) => {
      state.payments = action.payload;
    },
    setWalletConnectMode: (state, action: PayloadAction<boolean>) => {
      state.walletConnectMode = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setDevMode,
  setTransactionsList,
  setWalletConnectMode,
} = infoSlice.actions;

export default infoSlice.reducer;
