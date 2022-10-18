import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {mainStyles} from '../../../../styles/main.styles';
import ProfilePageItem from '../../../core/components/ProfilePageItem';
import PlusIcon from '../../../../assets/svg/icon-plus.svg';
import {MainButton} from '../../../core/components/MainButton';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import TextBlock from '../../../core/components/TextBlock';
import CheckboxMarked from '../../../../assets/svg/icon-checkbox.svg';
import CheckboxUnMarked from '../../../../assets/svg/icon-checkbox-empty.svg';
import IconCopy from '../../../../assets/svg/icon-copy.svg';
import LedIndicator from '../../../core/components/LedIndicator';

const wallets = [
  {
    id: 1,
    title: 'Martian wallet',
    connected: true,
    address: 'B6E7ffe574DB6E7f6414d301c74f4be69E949080F9F30',
  },
  {
    id: 2,
    title: 'Phantom',
    connected: true,
    address: '0xfe574DB6E7f6414d301c74f4be69E949080F9F30',
  },
  {
    id: 3,
    title: 'MetaMask',
    connected: false,
  },
  {
    id: 4,
    title: 'Folflare',
    connected: false,
  },
];

const PaymentMethodsScreen = () => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [activeWallet, setActiveWallet] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState(true);

  const handleWalletClick = (waletId: number) => {
    if (waletId === activeWallet) {
      return setActiveWallet(-1)
    }
    const walletData = wallets.filter(el => el.id === waletId)[0];
    if (!walletData.connected) {
      actionSheetRef.current?.show();
      setTimeout(() => {
        setIsLoading(false)
        
        wallets.map(el => {
          if (el.id === waletId) {
            el.connected = true;
            el.address = 'ArWXC2qgiiNS9nrtDyjRZwGUJwEdrMQdUQedfLEAjGhh'
          }
        });

      }, 1300);
    }
    setActiveWallet(waletId);
  };

  const handleSuccessConnection = () => {
    actionSheetRef.current?.hide();
    setIsLoading(true);
    setActiveWallet(-1);
  }

  return (
    <SafeAreaView style={mainStyles.container}>
      <View style={mainStyles.content}>
        <View style={{marginBottom: 30}}>
          {wallets.map(el => (
            <View key={el.id} style={styles.itemWrapper}>
              <TouchableOpacity style={styles.walletItem} onPress={() => handleWalletClick(el.id)}>
                <View style={styles.mainLine}>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'MazzardM-Semibold',
                        fontSize: 16,
                      }}>
                      {el.title}
                    </Text>
                  </View>

                  <View style={styles.addressPart}>
                    {el.connected ? (
                      <CheckboxMarked width={20} height={20} />
                    ) : (
                      <CheckboxUnMarked width={20} height={20} />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
              {activeWallet === el.id && (
                <>
                  {el.connected && (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text style={{opacity: 0.7, fontSize: 12}}>
                        {el.address?.slice(0, 8) + '...  '}
                      </Text>
                      <TouchableOpacity onPress={() => Alert.alert('Address copied to clipboard')}>
                        <IconCopy width={14} height={14} />
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              )}
            </View>
          ))}
        </View>
      </View>
      

      <ActionSheet ref={actionSheetRef}>
        <View style={{...mainStyles.actionSheetContent, minHeight: '75%'}}>
          
        {isLoading && (<View style={styles.indicatorHolder}>
            <TextBlock variant={'caption'} style={styles.label}>Loading wallet data</TextBlock>
            <ActivityIndicator size={"large"} />
          </View>)
        }
        {
          !isLoading && (
            <>
              <LedIndicator connected/>
              <TextBlock variant={'subtitle'}>Wallet address: ArWXC2qgiiNS9nrtDyjRZwGUJwEdrMQdUQedfLEAjGhh</TextBlock>
              <MainButton onPress={handleSuccessConnection} title={'ok'}/>
            </>
          )
        }
          
        </View>
      </ActionSheet>
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
  itemWrapper: {
    backgroundColor: '#F8F8FA',
    padding: 15,
    marginBottom: 20,
    borderRadius: 6,
  },
  walletItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center', 
  },
  addressPart: {
    marginTop: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  mainLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  addresLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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
  }
});
