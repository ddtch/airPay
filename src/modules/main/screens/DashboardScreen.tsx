import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Pressable,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { mainStyles } from '../../../../styles/main.styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import TextBlock from '../../../core/components/TextBlock';
import { useTranslation } from 'react-i18next';
import VirtualCardsSlider from '../../../core/components/VirtualCardsSlider';
import { QuickActionTypes } from '../../../core/models/QuickActionTypes';
import ActionPromo from '../../../../assets/svg/icon-promo.svg';
import ActionPay from '../../../../assets/svg/icon-pay.svg';
import ActionEarn from '../../../../assets/svg/icon-earn.svg';
import ActionMore from '../../../../assets/svg/icon-more.svg';
import ProgressBar from '../../../core/components/ProgressBar';
import Balances from '../../../core/components/Balances';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import ItemIconFigma from '../../../../assets/svg/transaction-logo-1.svg';
import ItemIconAmazon from '../../../../assets/svg/transaction-logo-2.svg';
import ItemIconJoeCoffe from '../../../../assets/svg/transaction-logo-6.svg';
import ItemIconStarbucks from '../../../../assets/svg/transaction-logo-5.svg';
import { useNavigation } from '@react-navigation/native';
import { NAV_TYPE } from '../../../core/models/ScreenTypes';
import { SCREEN_NAME } from '../../../core/constants/SCREEN_NAME';
import BaseTextListItem from '../../../core/components/BaseTextListItem';
import { MainButton } from '../../../core/components/MainButton';
import { transactionsService, walletService } from '../../../core/services';
import {
  addNotificationItem,
  setCardsData,
  setPayClickCount,
  setWalletBalance,
} from '../../../store/info.slice';
import { ICardDetails } from '../../../core/models/ICardDetails';
import dayjs from 'dayjs';
import { ITransaction } from '../../../core/models/ITransaction';

const mockAva = require('../../../../assets/avatar1.jpeg');

export const initialTransactions: ITransaction[] = [
  {
    id: 61,
    title: 'Joe Coffee',
    amount: 5.25,
    time: '12:28 PM',
    currency: '$',
    icon: <ItemIconJoeCoffe />,
    category: 'Purchase',
    vendor: 'Joe Coffee',
    amount_paid_usd: '5.25',
    swap_price_impact: '0.1',
    fees: '0.1',
  },
  {
    id: 2,
    title: 'Amazon',
    amount: 28.12,
    time: '02:20 PM',
    currency: '$',
    icon: <ItemIconAmazon />,
    category: 'Purchase',
    vendor: 'Amazon',
    amount_paid_usd: '28.12',
    swap_price_impact: '0.1',
    fees: '0.1',
  },
  {
    id: 1,
    title: 'Figma',
    amount: 14.1,
    time: '04:43 PM',
    currency: '$',
    icon: <ItemIconFigma />,
    category: 'Purchase',
    vendor: 'Figma',
    amount_paid_usd: '14.1',
    swap_price_impact: '0.1',
    fees: '0.1',
  },
];

type ActionsBlockProps = {
  actionSelected: (type: QuickActionTypes) => void;
};

const ActionsBlock: React.FC<ActionsBlockProps> = ({ actionSelected }) => {
  const actions = [
    {
      id: 1,
      type: QuickActionTypes.PROMOTION,
      label: 'Promo',
      icon: <ActionPromo width={36} height={36} />,
    },
    {
      id: 2,
      type: QuickActionTypes.PAY,
      label: 'Pay',
      icon: <ActionPay width={36} height={36} />,
      link: 'payment',
    },
    {
      id: 3,
      type: QuickActionTypes.EARN,
      label: 'Earn',
      icon: <ActionEarn width={36} height={36} />,
    },
    {
      id: 4,
      type: QuickActionTypes.MORE,
      label: 'More',
      icon: <ActionMore width={36} height={36} />,
    },
  ];

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
      }}>
      {actions.map(el => (
        <TouchableOpacity
          key={el.id}
          style={{
            width: 90,
            height: 90,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }}
          onPress={() => actionSelected(el.type)}>
          {el.icon}
          <Text
            style={{
              color: '#000',
              fontFamily: 'MazzardM-Regular',
              marginTop: 10,
              fontSize: 14,
            }}>
            {el.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

type TransactionsListProps = {
  payments: any[];
  onTransactionSelected?: (transactionId: number) => void;
};
const TransactionsList: React.FC<TransactionsListProps> = ({
  payments,
  onTransactionSelected,
}) => {
  return (
    <>
      {payments.map((item, index) => (
        <Pressable
          key={item.id}
          onPress={() =>
            onTransactionSelected && onTransactionSelected(item.id)
          }>
          <View
            style={{
              borderTopWidth: 1,
              borderBottomWidth:
                index >= 0 ? (index === payments.length - 1 ? 1 : 0) : 1,
              borderColor: 'rgba(0,0,0,.15)',
            }}>
            <View
              style={{
                paddingVertical: 10,
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              {item.icon}
              <View style={{ marginLeft: 10 }}>
                <Text
                  style={{ fontWeight: '400', fontSize: 14, marginBottom: 8 }}>
                  {item.title}
                </Text>
                <Text style={{ fontWeight: '400', fontSize: 14, opacity: 0.7 }}>
                  {item.time}
                </Text>
              </View>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 16,
                  justifyContent: 'flex-end',
                  display: 'flex',
                  marginLeft: 'auto',
                }}>
                ${item.amount.toFixed(2)}
              </Text>
            </View>
          </View>
        </Pressable>
      ))}
    </>
  );
};

const DashboardScreen = () => {
  const [transactionsList, setTransactionsList] = useState<any[]>([]);
  const [currentCard, setCurrentCard] = useState<null | ICardDetails>(null);
  const { user } = useSelector((state: RootState) => state.user);
  const { walletAddress } = useSelector((state: RootState) => state.info);
  const { cardsData, payClickCount } = useSelector(
    (state: RootState) => state.info,
  );
  const transactionsSheetRef = useRef<BottomSheet>(null);
  const cardInfoSheetRef = useRef<BottomSheet>(null);
  const [showTransactions, setShowTransactions] = useState(false);
  const transactionsSheetSnapPoints = useMemo(() => ['8%', '48%'], []);
  const cardInfoSheetSnapPoints = useMemo(() => [1, '65%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    if (index === -1) {
      transactionsSheetRef.current?.snapToIndex(0);
    }
  }, []);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const nav = useNavigation<NAV_TYPE>();

  const handleActionSelected = (actionType: QuickActionTypes) => {
    if (actionType === QuickActionTypes.PAY) {
      // nav.navigate(SCREEN_NAME.PaymentsScreen, {transactionId: undefined});
      _doTransactionFlow()
    }
  };

  const handleCardInfoPressed = (cardId: number) => {
    const [card] = cardsData.filter(el => el && +el.id === +cardId);
    setCurrentCard(card);
    cardInfoSheetRef.current?.snapToIndex(1);
  };

  const handleStransactionSelected = (transactionId: number) => {
    nav.navigate(SCREEN_NAME.PaymentsScreen, { transactionId });
  };

  useEffect(() => {
    setTransactionsList(initialTransactions);

    walletService.getAccountResources('meow').then(resp => {
      dispatch(setWalletBalance(resp.balance));
    });

    walletService.getCardInfo().then(resp => {
      dispatch(setCardsData(resp));
    });
  }, []);

  useEffect(() => {
    if (transactionsList.length) {
      setShowTransactions(true);
    }
  }, [transactionsList]);

  useEffect(() => {
    if (payClickCount === 1 && transactionsList.length < 3) {
      setTransactionsList([
        {
          id: 3,
          title: 'Starbucks',
          amount: 10.67,
          time: dayjs().format('HH:mm A'),
          currency: '$',
          icon: <ItemIconStarbucks />,
          hidden: false,
        },
        ...transactionsList,
      ]);
    }
  }, [payClickCount]);

  const _doTransactionFlow = () => {
    console.log('transaction in progress....')
    transactionsService.doTransaction().then(resp => {
      dispatch(setPayClickCount(1));
      setTransactionsList([{
        id: 3,
        title: 'Starbucks',
        amount: 10.67,
        time: dayjs().format('HH:mm A'),
        currency: '$',
        icon: <ItemIconStarbucks />,
        hidden: false,
      },
      ...transactionsList])
      dispatch(
        addNotificationItem({
          id: 4,
          date: dayjs().valueOf(),
          title: 'New successfull transaction',
          text: 'Your have new transaction',
          isRead: false,
          merchant: true,
          icon: true,
        }),
      );
      
      walletService.getAccountResources('meow').then(resp => {
        dispatch(setWalletBalance(resp.balance));
        // dispatch(setWalletBalance({
        //   ...resp.balance,
        //   tokens: parseFloat(`${+resp.balance.tokens - 10.67}`).toFixed(2),
        //   total: parseFloat(`${+resp.balance.tokens - 10.67}`).toFixed(2),
        // }));
      });
    })
      .catch(err => {
        console.log(err)
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.userInfo}>
          <View style={styles.personal}>
            <View style={styles.avatar}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  marginLeft: -1,
                  marginTop: -1,
                }}
                source={mockAva}
                resizeMode={'contain'}
              />
            </View>
          </View>

          <View style={styles.info}>
            <View style={styles.infoTexts}>
              {/* <Text style={styles.names}>
                {user?.firstName + ' ' + user?.lastName}
              </Text> */}
              <Text style={styles.walletAddress}>{`${walletAddress.slice(
                0,
                3,
              )}...${walletAddress.slice(-3)}`}</Text>

              <Text>32/100</Text>
            </View>
            <ProgressBar />
          </View>
        </View>

        <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
          <Balances />
        </View>

        <View style={styles.cardsBlock}>
          <TextBlock
            variant={'title'}
            color={'#000'}
            style={{ paddingHorizontal: 20 }}>
            {t('my-cards')}
          </TextBlock>
          <VirtualCardsSlider
            cardsData={cardsData}
            onCardPress={_doTransactionFlow}
            onInfoPress={handleCardInfoPressed}
          />
        </View>

        <View style={styles.actionsHolder}>
          <TextBlock
            variant={'title'}
            color={'#000'}
            style={{ marginBottom: 20 }}>
            {t('quick-actions')}
          </TextBlock>
          <ActionsBlock actionSelected={handleActionSelected} />
        </View>
      </ScrollView>
      <BottomSheet
        ref={transactionsSheetRef}
        index={0}
        enablePanDownToClose={false}
        backdropComponent={BottomSheetBackdrop}
        snapPoints={transactionsSheetSnapPoints}
        contentHeight={1}
        enableHandlePanningGesture
        enableContentPanningGesture
        onChange={handleSheetChanges}>
        <View style={styles.transactionsContentHolder}>
          <View style={styles.transactionsPanel}>
            <TextBlock variant={'title'} style={{ marginBottom: 0 }}>
              {t('transactions')}
            </TextBlock>
            <Text style={styles.textBtn}>All</Text>
          </View>

          <TransactionsList
            payments={transactionsList}
            onTransactionSelected={handleStransactionSelected}
          />
        </View>
      </BottomSheet>

      <BottomSheet
        ref={cardInfoSheetRef}
        snapPoints={cardInfoSheetSnapPoints}
        index={0}
        contentHeight={1}
        backdropComponent={BottomSheetBackdrop}>
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 10,
            marginBottom: 40,
          }}>
          {/* <BaseTextListItem label="Card Type" text="Some type" /> */}
          <BaseTextListItem
            label="Name on card"
            text={currentCard?.cardholder_name || ''}
          />
          <BaseTextListItem
            label="Card Number"
            text={currentCard?.card_number || ''}
            onPressed={() => Alert.alert('Copied to clipboard')}
            copied
          />
          <BaseTextListItem label="CVC" text={currentCard?.cvc || ''} />
          <BaseTextListItem
            label="Expiration Date"
            text={currentCard?.expiration_date || ''}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 20,
          }}>
          <MainButton
            title="Close"
            onPress={() => cardInfoSheetRef.current?.close()}
          />
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  topHolder: {
    ...mainStyles.content,
    paddingHorizontal: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: '#3A9EBD',
    flex: 0.7,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  botHolder: {
    flex: 0.3,
    backgroundColor: '#fff',
  },
  content: {
    ...mainStyles.content,
    paddingHorizontal: 0,
  },
  userInfo: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    padding: 20,
    marginTop: 20,
  },
  textBtn: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
  },
  personal: {
    display: 'flex',
    marginRight: 20,
    alignContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 48,
    overflow: 'hidden',
  },
  info: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  infoTexts: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  names: {
    fontFamily: 'MazzardM-SemiBold',
    fontSize: 20,
    marginBottom: 10,
    color: '#000',
  },
  walletAddress: {
    fontFamily: 'MazzardM-Regular',
    fontSize: 20,
    marginBottom: 10,
    opacity: 0.7,
  },
  currencyInfo: {
    marginBottom: 6,
    color: '#000',
    fontFamily: 'MazzardM-Regular',
  },
  cardsBlock: {
    height: 230,
    marginBottom: 20,
  },
  actionsHolder: {
    paddingHorizontal: 20,
    marginBottom: 60,
  },
  transactionsPanel: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  transactionsContentHolder: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  filterBtnHolder: {},
});
