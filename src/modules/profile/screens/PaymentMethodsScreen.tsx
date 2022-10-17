import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {mainStyles} from '../../../../styles/main.styles';
import ProfilePageItem from '../../../core/components/ProfilePageItem';
import PlusIcon from '../../../../assets/svg/icon-plus.svg';
import { MainButton } from '../../../core/components/MainButton';

const wallets = [
  {
    id: 1,
    title: 'Martian wallet',
  },
  {
    id: 2,
    title: 'Phantom',
  },
];

const PaymentMethodsScreen = () => {
  return (
    <SafeAreaView style={mainStyles.container}>
      <View style={mainStyles.content}>
        <View style={{marginBottom: 30}}>
          {wallets.map(el => (
            <ProfilePageItem key={el.id} label={el.title} />
          ))}
        </View>
        <TouchableOpacity style={styles.addWalletBtn}>
          <Text style={{color: '#394c8a', fontWeight: '600'}}>Add new payment method</Text>
          <PlusIcon width={24} height={24} />
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 20}}>
      <MainButton onPress={() => null} noShadows disabled title={'Apply'} />
      </View>
    </SafeAreaView>
  );
};

export default PaymentMethodsScreen;

const styles = StyleSheet.create({
  addWalletBtn: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#394c8a',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  }
});
