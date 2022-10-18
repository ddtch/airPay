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
import React, {Fragment, useTransition} from 'react';
import {mainStyles} from '../../../../styles/main.styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';
import TextBlock from '../../../core/components/TextBlock';
import {useTranslation} from 'react-i18next';
import VirtualCardsSlider from '../../../core/components/VirtualCardsSlider';
import {QuickActionTypes} from '../../../core/models/QuickActionTypes';
import Action1Icon from '../../../../assets/svg/icon-action1.svg';
import Action2Icon from '../../../../assets/svg/icon-action2.svg';
import FlashIcon from '../../../../assets/svg/icon-flash.svg';

const mockAva = require('../../../../assets/avatar.jpeg');

type ActionsBlockProps = {
  actionSelected: (type: QuickActionTypes) => void;
};

const ActionsBlock: React.FC<ActionsBlockProps> = ({actionSelected}) => {
  const actions = [
    {
      id: 1,
      type: QuickActionTypes.PROMOTION,
      label: 'Promotions',
      icon: <Action1Icon width={24} height={24} />,
    },
    {
      id: 2,
      type: QuickActionTypes.PAY,
      label: 'Pay',
      icon: <Action1Icon width={24} height={24} />,
    },
    {
      id: 3,
      type: QuickActionTypes.EARN,
      label: 'Earn',
      icon: <Action2Icon width={24} height={24} />,
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
            borderRadius: 6,
            backgroundColor: '#4060B2',
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
              color: '#fff',
              fontFamily: 'MazzardM-Medium',
              marginTop: 2,
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
      <FlatList
        data={payments}
        renderItem={({item, index}: any) => {
          return (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'space-between',
              }}>
              <FlashIcon
                width={30}
                height={30}
                style={{marginHorizontal: 20}}
              />
              <View
                style={{
                  paddingVertical: 30,
                  paddingHorizontal: 15,
                  backgroundColor: '#F8F8FA',
                  borderRadius: 6,
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontWeight: '500', fontSize: 16}}>
                  {item.title}
                </Text>
                <Text style={{fontWeight: '600', fontSize: 16}}>
                  ${item.amount}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </>
  );
};

const DashboardScreen = () => {
  const {user} = useSelector((state: RootState) => state.user);
  const {cardsData, payments} = useSelector((state: RootState) => state.info);
  const {t} = useTranslation();

  const handleActionSelected = (actionType: QuickActionTypes) => {};

  return (
    <Fragment>
      <SafeAreaView style={{flex: 0, backgroundColor: '#334D8F'}} />
      <SafeAreaView
        style={{
          flex: 0.75,
          backgroundColor: '#3A9EBD',
          borderBottomRightRadius: 6,
          borderBottomLeftRadius: 6,
        }}>
        <ScrollView>
          <View style={styles.userInfo}>
            <View style={styles.personal}>
              <View style={styles.avatar}>
                <Image
                  style={{marginTop: -20, marginLeft: -20}}
                  source={mockAva}
                  resizeMode={'cover'}
                />
              </View>
            </View>

            <View style={styles.info}>
              <Text style={styles.names}>
                {user?.firstName + ' ' + user?.lastName}
              </Text>
              <Text style={styles.currencyInfo}>
                Tokens (in USDC) = 124 000 000$
              </Text>
              <Text style={styles.currencyInfo}>
                NFT's (in USDC) = 14 874 908$
              </Text>
              <Text style={styles.currencyInfo}>Total = 138 874 908$</Text>
            </View>
          </View>

          <View style={styles.cardsBlock}>
            <TextBlock
              variant={'title'}
              color={'#fff'}
              style={{paddingHorizontal: 20}}>
              {t('virtual-card')}
            </TextBlock>
            <VirtualCardsSlider cardsData={cardsData} />
          </View>

          <View style={styles.actionsHolder}>
            <TextBlock variant={'title'} color={'#fff'}>
              {t('quick-actions')}
            </TextBlock>
            <ActionsBlock actionSelected={handleActionSelected} />
          </View>
        </ScrollView>
      </SafeAreaView>

      <SafeAreaView style={{
        flex: 0.25,
      }}>
        <View style={styles.lastPayments}>
          <View style={styles.paymentsPanel}>
            <TextBlock variant={'title'} style={{marginBottom: 0}}>
              {t('last-payments')}
            </TextBlock>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 14,
                fontWeight: '500',
                textTransform: 'uppercase',
                textDecorationLine: 'underline',
              }}>
              All
            </Text>
          </View>

          <PaymentsList payments={payments} />
        </View>
      </SafeAreaView>
    </Fragment>
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
  },
  personal: {
    display: 'flex',
    marginRight: 20,
    alignContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 60,
    overflow: 'hidden',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
  },
  names: {
    fontFamily: 'MazzardM-SemiBold',
    fontSize: 20,
    marginBottom: 10,
    color: '#fff',
  },
  currencyInfo: {
    marginBottom: 6,
    color: '#fff',
    fontFamily: 'MazzardM-Regular',
  },
  cardsBlock: {
    height: 230,
    marginBottom: 10,
  },
  actionsHolder: {
    paddingHorizontal: 20,
  },
  paymentsPanel: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  lastPayments: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  filterBtnHolder: {},
});
