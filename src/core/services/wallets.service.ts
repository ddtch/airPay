import axios from 'axios';
import {BASE_API_URL} from '../constants/URLS';

export const getAccountResources = (
  mnemonic: string,
): Promise<{address: string; balance: number}> => {
  return axios
    .post(`${BASE_API_URL}/getAccountResources`, {mnemonic})
    .then(resp => resp.data)
};
