import { Action, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import dayjs from 'dayjs';
import {unionBy, uniqBy} from 'lodash'
import { ICardDetails } from "../core/models/ICardDetails";
const card1 = require('../../assets/img-card-1.png');
const card2 = require('../../assets/img-card-2.png');

const initialMockCards = [
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
]

interface Balances {
  nft: number,
  tokens: number,
  total: number
}

export interface InfoState {
  devMode: boolean;
  cardsData: any[];
  currentCard: null | ICardDetails;
  payments: any[];
  notificationsList: any[];
  walletConnectMode: boolean;
  balance: Balances;
  payClickCount: number;
  walletAddress: string;
}

const initialState: InfoState = {
  devMode: false,
  balance: {
    nft: 0,
    tokens: 0,
    total: 0,
  },
  walletAddress: '',
  cardsData: initialMockCards,
  currentCard: null,
  payClickCount: 0,
  payments: [
  ],
  notificationsList: [
    {
      id: 11,
      date: dayjs().set('hours', 8).set('minutes', 47).valueOf(),
      title: 'Transaction has been approved',
      merchant: true,
      icon: true,
    },
    {
      id: 1,
      date: dayjs().subtract(1, 'day').valueOf(),
      title: 'Your wallet has been connected',
      text: 'Smart card’s balance is about to get to 0. Please, make your payment.',
      isRead: false,
    },
    {
      id: 2,
      date: dayjs().subtract(2, 'day').add(1, 'hour').valueOf(),
      title: 'Transaction has been approved',
      text: 'Your balance has been incresed.',
      isRead: true,
      merchant: true,
    },
    {
      id: 3,
      date: dayjs().subtract(3, 'day').subtract(1, 'hour').add(21, 'minutes').valueOf(),
      title: 'Your information has been updated',
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
    },
    setCardsData: (state, action: PayloadAction<ICardDetails[]>) => {
      const patchedCards = initialMockCards.map((el, i) => {
        el = {...el, ...action.payload[i], id: +el.id}
        return el;
      })
      state.cardsData = [];
      state.cardsData = patchedCards;
    },
    setWalletBalance: (state, action: PayloadAction<any>) => {
      state.balance = action.payload
    },
    setPayClickCount: (state, action: PayloadAction<number>) => {
      state.payClickCount = action.payload;
    },
    addNotificationItem: (state, action: PayloadAction<any>) => {
      const list = state.notificationsList
      list.unshift(action.payload);
      state.notificationsList = uniqBy(list, 'id');
    },
    setWalletAddress: (state, action: PayloadAction<string>) => {
      state.walletAddress = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setDevMode,
  setTransactionsList,
  setWalletConnectMode,
  setCardsData,
  setWalletBalance,
  setPayClickCount,
  addNotificationItem,
  setWalletAddress,
} = infoSlice.actions;

export default infoSlice.reducer;
