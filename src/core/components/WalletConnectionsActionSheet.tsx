import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {mainStyles} from '../../../styles/main.styles';
import WalletListItem from './WalletListItem';
import LedIndicator from './LedIndicator';
import TextBlock from './TextBlock';
import IconCopy from '../../../assets/svg/icon-copy.svg';
import {MainButton} from './MainButton';
import {useDispatch, useSelector} from 'react-redux';
import {setWalletConnectMode} from '../../store/info.slice';
import {RootState} from '../../store';
import uniqBy from 'lodash/uniqBy';

import MartianIcon from '../../../assets/svg/icon-martian-wallet.svg';
import PhantomIcon from '../../../assets/svg/icon-phantom-wallet.svg';
import SolIcon from '../../../assets/svg/icon-sol-wallet.svg';

export const mockWallets = [
  {
    id: 1,
    title: 'Martian wallet',
    connected: false,
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

const WalletConnectionsActionSheet = ({
  onWalletConnected,
  walletsList,
}: any) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [connectNewWallet, setConnectNewWallet] = useState(false);
  const [activeWallet, setActiveWallet] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const {walletConnectMode} = useSelector((state: RootState) => state.info);

  const handleWalletClick = (waletId: number, isConnected: boolean) => {
    if (waletId === activeWallet) {
      return setActiveWallet(-1);
    }
    setActiveWallet(waletId);
    if (!isConnected) {
      setConnectNewWallet(true);
      actionSheetRef.current?.show();
      setTimeout(() => {
        setIsLoading(false);
      }, 1300);
    }
  };

  const handleSuccessConnection = () => {
    setConnectNewWallet(false);
    setIsLoading(true);
    const updatedWallets = [...walletsList, ...mockWallets].map((el: any) => {
      if (el.id === activeWallet) {
        el.connected = true;
        el.address = 'ArWXC2qgiiNS9nrtDyjRZwGUJwEdrMQdUQedfLEAjGhh';
      }
      return el;
    }).filter(el => el && el.connected);
    onWalletConnected(uniqBy(updatedWallets, 'id'));
    dispatch(setWalletConnectMode(false));
    setActiveWallet(-1);
    
  };

  useEffect(() => {
    if (walletConnectMode) {
      actionSheetRef.current?.show();
    } else {
      actionSheetRef.current?.hide();
    }
  }, [walletConnectMode]);

  const handleSheetClosed = () => {
    setActiveWallet(-1);
    dispatch(setWalletConnectMode(false));
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      onClose={handleSheetClosed}
      headerAlwaysVisible>
      <View
        style={{
          ...mainStyles.actionSheetContent,
          paddingHorizontal: 0,
          minHeight: '75%',
        }}>
        {!connectNewWallet &&
          walletsList?.length > 0 && walletsList.map((el: any, index: number) => (
            <WalletListItem
              key={el.id}
              activeWalletId={activeWallet}
              onSelected={handleWalletClick}
              item={el}
              index={index}
              lastItem={index === walletsList.length - 1}
            />
          ))}

        {connectNewWallet && (
          <View style={{paddingHorizontal: 20}}>
            {isLoading && (
              <View style={styles.indicatorHolder}>
                <TextBlock variant={'caption'} style={styles.label}>
                  Loading wallet data
                </TextBlock>
                <ActivityIndicator size={'large'} />
              </View>
            )}
            {!isLoading && (
              <>
                <LedIndicator connected />
                <TextBlock variant={'subtitle'}>
                  Congrats, your new wallet is connected!
                </TextBlock>
                <TextBlock variant={'body'}>Your address is:</TextBlock>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: -10,
                    // paddingVertical: 20,
                    paddingBottom: 20,
                  }}>
                  <Text style={{opacity: 0.6, marginRight: 20, width: '75%'}}>
                    ArWXC2qgiiNS9nrtDyjRZwGUJwEdrMQdUQedfLEAjGhh
                  </Text>
                  <TouchableOpacity
                    style={{
                      display: 'flex',
                      maxWidth: '75%',
                      borderWidth: 1,
                      borderColor: 'rgba(0,0,0,.45)',
                      height: 32,
                      width: 32,
                      borderRadius: 32,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => Alert.alert('Address copied to clipboard')}>
                    <IconCopy width={14} height={14} />
                  </TouchableOpacity>
                </View>
                <MainButton onPress={handleSuccessConnection} title={'ok'} />
              </>
            )}
          </View>
        )}
      </View>
    </ActionSheet>
  );
};

export default WalletConnectionsActionSheet;

const styles = StyleSheet.create({
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
