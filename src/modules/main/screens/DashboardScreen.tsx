import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import {mainStyles} from '../../../../styles/main.styles';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import TextBlock from '../../../core/components/TextBlock';
import {useTranslation} from 'react-i18next';
import VirtualCardsSlider from '../../../core/components/VirtualCardsSlider';
import {QuickActionTypes} from '../../../core/models/QuickActionTypes';
import ActionPromo from '../../../../assets/svg/icon-promo.svg';
import ActionPay from '../../../../assets/svg/icon-pay.svg';
import ActionEarn from '../../../../assets/svg/icon-earn.svg';
import ActionMore from '../../../../assets/svg/icon-more.svg';
import FlashIcon from '../../../../assets/svg/icon-flash.svg';
import ProgressBar from '../../../core/components/ProgressBar';
import Balances from '../../../core/components/Balances';
// import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';

import ItemIconFigma from '../../../../assets/svg/transaction-logo-1.svg';
import ItemIconAmazon from '../../../../assets/svg/transaction-logo-2.svg';
import ItemIconMcDonalds from '../../../../assets/svg/transaction-logo-3.svg';

const mockAva = require('../../../../assets/avatar1.jpeg');

type ActionsBlockProps = {
  actionSelected: (type: QuickActionTypes) => void;
};

const ActionsBlock: React.FC<ActionsBlockProps> = ({actionSelected}) => {
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

type PaymentsListProps = {
  payments: any[];
};
const PaymentsList: React.FC<PaymentsListProps> = ({payments}) => {
  return (
    <>
      {payments.map((item, index) => (
        <View
          key={item.id}
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
            <View style={{marginLeft: 10}}>
              <Text style={{fontWeight: '400', fontSize: 14, marginBottom: 8}}>
                {item.title}
              </Text>
              <Text style={{fontWeight: '400', fontSize: 14}}>{item.time}</Text>
            </View>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 16,
                justifyContent: 'flex-end',
                display: 'flex',
                marginLeft: 'auto',
              }}>
              ${item.amount}
            </Text>
          </View>
        </View>
      ))}
    </>
  );
};

const DashboardScreen = () => {
  const [transactionsList, setTransactionsList] = useState<any[]>([]);
  const {user} = useSelector((state: RootState) => state.user);
  const {cardsData} = useSelector((state: RootState) => state.info);
  // const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['65%', '8%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const handleActionSelected = (actionType: QuickActionTypes) => {};

  useEffect(() => {
    setTransactionsList([
      {
        id: 1,
        title: 'Figma',
        amount: 14.1,
        time: '04:43PM',
        currency: '$',
        icon: <ItemIconFigma />,
      },
      {
        id: 2,
        title: 'Amazon',
        amount: 28.12,
        time: '02:20PM',
        currency: '$',
        icon: <ItemIconAmazon />,
      },
  ]);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
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
              <Text style={styles.names}>
                {user?.firstName + ' ' + user?.lastName}
              </Text>

              <Text>32/100</Text>
            </View>
            <ProgressBar />
          </View>
        </View>

        <View style={{paddingHorizontal: 20, marginBottom: 30}}>
          <Balances />
        </View>

        <View style={styles.cardsBlock}>
          <TextBlock
            variant={'title'}
            color={'#000'}
            style={{paddingHorizontal: 20}}>
            {t('my-cards')}
          </TextBlock>
          <VirtualCardsSlider cardsData={cardsData} />
        </View>

        <View style={styles.actionsHolder}>
          <TextBlock variant={'title'} color={'#000'} style={{marginBottom: 20}}>
            {t('quick-actions')}
          </TextBlock>
          <ActionsBlock actionSelected={handleActionSelected} />
        </View>
      </ScrollView>
      {/* <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        contentHeight={1}
        onChange={handleSheetChanges}>
        <View style={styles.transactionsContentHolder}>
          <View style={styles.transactionsPanel}>
            <TextBlock variant={'title'} style={{marginBottom: 0}}>
              {t('transactions')}
            </TextBlock>
            <Text style={styles.textBtn}>All</Text>
          </View>

          <PaymentsList payments={transactionsList} />
        </View>
      </BottomSheet> */}
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
