import axios from 'axios';
import {BASE_API_URL} from '../constants/URLS';
import { ITransaction } from '../models/ITransaction';

export const doTransaction = async (): Promise<ITransaction> => {
  const resp = await axios
    .post(`${BASE_API_URL}/airpayTransaction`);
  return resp.data;
};
