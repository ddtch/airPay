import axios from 'axios';
import {BASE_API_URL} from '../constants/URLS';

export const getAccountResources = (
  mnemonic: string,
): Promise<{
  address: string;
  balance: {nft: string; tokens: string; total: string};
}> => {
  return axios
    .post(`${BASE_API_URL}/getAccountResources`, {mnemonic})
    .then((resp: any) => ({
      address: resp.data.address,
      balance: {
        tokens: parseFloat(resp.data.token_balance).toFixed(2),
        nft: parseFloat(resp.data.nft_balance).toFixed(2),
        total: (Number(resp.data.nft_balance) + Number(resp.data.token_balance)).toFixed(2),
      },
    }));
};

export const getCardInfo = (): Promise<
  {
    id: string;
    cardholder_name: string;
    card_number: string;
    cvc: string;
    expiration_date: string;
  }[]
> => {
  return axios.get(`${BASE_API_URL}/getCards`).then(resp => resp.data);
};
