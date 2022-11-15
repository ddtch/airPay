import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
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
import {MainButton} from './MainButton';
import {useDispatch, useSelector} from 'react-redux';
import {setWalletAddress, setWalletConnectMode} from '../../store/info.slice';
import {RootState} from '../../store';
import uniqBy from 'lodash/uniqBy';

import MartianIcon from '../../../assets/svg/icon-martian-wallet.svg';
import PhantomIcon from '../../../assets/svg/icon-phantom-wallet.svg';
import SolIcon from '../../../assets/svg/icon-sol-wallet.svg';
import LoginForm from './LoginForm';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useStyle} from 'react-native-style-utilities';
import CopyBtn from './CopyBtn';
import {walletService} from '../services';

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
  const [conectedWalletData, setConectedWalletData] = useState<any>(null);
  const [passwordStage, setPasswordStage] = useState(false);

  const handleWalletClick = (waletId: number, isConnected: boolean) => {
    if (waletId === activeWallet) {
      return setActiveWallet(-1);
    }
    setActiveWallet(waletId);
    setPasswordStage(true);
  };

  const handleSuccessConnection = async () => {
    setConnectNewWallet(false);
    setIsLoading(true);

    const updatedWallets = [...walletsList, ...mockWallets]
      .map((el: any) => {
        if (el.id === activeWallet) {
          el.connected = true;
          el.address = conectedWalletData
            ? conectedWalletData.address
            : 'ArWXC2qgiiNS9nrtDyjRZwGUJwEdrMQdUQedfLEAjGhh';
        }
        return el;
      })
      .filter(el => el && el.connected);

    onWalletConnected(uniqBy(updatedWallets, 'id'));
    dispatch(setWalletConnectMode(false));
    setActiveWallet(-1);
  };

  const handleFormSubmitted = (formData: any) => {
    setConnectNewWallet(true);
    setPasswordStage(false);

    const walletData = walletService
      .getAccountResources(
        'meow',
      )
      .then(resp => {
        setConectedWalletData(resp);
        dispatch(setWalletAddress(resp.address));
        return resp;
      })
      .catch(err => {
        console.log('++++++++++++++++++++++++++++++++++++');
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
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

  const actionSheetContainerStyle = useStyle(
    () => ({
      paddingBottom: 1,
      flex: 0.75,
    }),
    [],
  );

  return (
    <KeyboardAvoidingView behavior={'height'}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ActionSheet
          ref={actionSheetRef}
          onClose={handleSheetClosed}
          headerAlwaysVisible
          containerStyle={actionSheetContainerStyle}>
          <View
            style={{
              ...mainStyles.actionSheetContent,
              paddingHorizontal: 0,
              minHeight: '75%',
            }}>
            {!connectNewWallet && passwordStage && (
              <LoginForm formSubmitted={handleFormSubmitted} />
            )}

            {!connectNewWallet &&
              !passwordStage &&
              walletsList?.length > 0 &&
              walletsList.map((el: any, index: number) => (
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
                        paddingBottom: 20,
                      }}>
                      <Text
                        style={{opacity: 0.6, marginRight: 20, width: '77%'}}>
                        {conectedWalletData
                          ? conectedWalletData.address
                          : 'ArWXC2qgiiNS9nrtDyjRZwGUJwEdrMQdUQedfLEAjGhh'}
                      </Text>
                      <CopyBtn
                        onPress={() =>
                          Alert.alert('Address copied to clipboard')
                        }
                      />
                    </View>
                    <MainButton
                      onPress={handleSuccessConnection}
                      title={'ok'}
                    />
                  </>
                )}
              </View>
            )}
          </View>
        </ActionSheet>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
