import {
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {mainStyles} from '../../../../styles/main.styles';

import {useSelector} from 'react-redux';
import {RootState} from '../../../store';

import MartianIcon from '../../../../assets/svg/icon-martian-wallet.svg';
import PhantomIcon from '../../../../assets/svg/icon-phantom-wallet.svg';
import SolIcon from '../../../../assets/svg/icon-sol-wallet.svg';
import WalletListItem from '../../../core/components/WalletListItem';
import WalletConnectionsActionSheet from '../../../core/components/WalletConnectionsActionSheet';

export const mcWallets = [
  {
    id: 1,
    title: 'Martian wallet',
    connected: true,
    address: 'B6E7ffe574DB6E7f6414d301c74f4be69E949080F9F30',
    icon: <MartianIcon width={28} height={28} />,
  },
  {
    id: 2,
    title: 'Phantom',
    connected: false,
    address: '0xfe574DB6E7f6414d301c74f4be69E949080F9F30',
    icon: <PhantomIcon width={28} height={28} />,
  },
  {
    id: 4,
    title: 'Folflare',
    connected: false,
    icon: <SolIcon width={28} height={28} />,
  },
];


const PaymentMethodsScreen = () => {
  
  const [filteredWallets, setFilteredWallets] = useState(
    mcWallets.filter(el => el && el.connected),
  );

  const handleWalletConnected = (updatedWallets: any[]) => {
    setFilteredWallets(updatedWallets);
  };

  return (
    <SafeAreaView style={{...mainStyles.container}}>
      {Platform.OS === 'android' && <View style={{height: 50}}/>}
      <View style={{...mainStyles.content, paddingHorizontal: 0}}>
        <View style={{marginBottom: 30}}>
          {filteredWallets.map(
            (el, index) =>
              el.connected && (
                <WalletListItem
                  key={el.id}
                  item={el}
                  index={index}
                  onSelected={() => null}
                  lastItem={index === filteredWallets.length - 1}
                />
              ),
          )}
        </View>
      </View>

      <WalletConnectionsActionSheet
        walletsList={mcWallets}
        onWalletConnected={handleWalletConnected}
      />
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
  },
  itemWrapper: {},
  indicatorHolder: {
    flex: 1,
    height: '100%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
    fontWeight: '500',
  },
});
