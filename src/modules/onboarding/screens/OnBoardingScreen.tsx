import {useNavigation} from '@react-navigation/native';
import React, { useEffect } from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {mainStyles} from '../../../../styles/main.styles';
import {MainButton} from '../../../core/components/MainButton';
import {NAV_TYPE} from '../../../core/models/ScreenTypes';
import {useDispatch} from 'react-redux';
import {setWalletConnectMode} from '../../../store/info.slice';
import WalletConnectionsActionSheet, {
  mockWallets,
} from '../../../core/components/WalletConnectionsActionSheet';
import {setUser} from '../../../store/user.slice';
import {setLoggedInStatus} from '../../../store/auth.slice';

const onboardingBg = require('../../../../assets/onboarding-bg.png');
const pbg = require('../../../../assets/svg/pbg-1.png');

const OnboardingScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {navigate} = useNavigation<NAV_TYPE>();

  const handleLogin = () => {
    dispatch(setWalletConnectMode(true));
  };

  const handleConnectionProcess = () => {
    setTimeout(() => {
      dispatch(setLoggedInStatus(true));
      dispatch(
        setUser({
          firstName: 'David',
          lastName: 'Cholariia',
          username: 'username.man',
        }),
      );
    }, 400);
  };

  return (
    <View style={styles.content}>
      <Swiper style={styles.wrapper} showsButtons={false} pagingEnabled>
        <View style={styles.slideHolder}>
          <View style={styles.topPart}>
            <Image
              source={pbg}
              resizeMode={'cover'}
              style={{position: 'absolute', top: 0, left: 0}}
            />
            <Image
              source={onboardingBg}
              resizeMode={'contain'}
              style={{width: 238, position: 'relative', top: '15.5%'}}
            />
          </View>
          <View style={styles.botPart}>
            <Text style={styles.header}>
              Instantly pay at any store{'\n'}with your on-chain tokens
            </Text>
            <MainButton
              onPress={handleLogin}
              disabled={false}
              title={`${t('connect')} ${t('wallet')}`}
            />
          </View>
        </View>
      </Swiper>
      <WalletConnectionsActionSheet
        walletsList={mockWallets}
        onWalletConnected={handleConnectionProcess}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  content: {
    ...mainStyles.content,
    padding: 0,
  },
  wrapper: {},
  slideHolder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topPart: {
    flex: 0.6,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#334D8F',
    borderBottomLeftRadius: 12,
    borderBottomEndRadius: 12,
  },
  botPart: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.4,
    width: '100%',
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 21,
    fontWeight: '600',
    color: '#474A56',
    textAlign: 'center',
    marginBottom: 30,
  },
  sheetContent: {
    minHeight: 120,
    padding: 20,
  },
});
