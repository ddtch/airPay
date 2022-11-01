import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

import RetryIcon from '../../../assets/svg/icon-payment-retry.svg';
import CloseIcon from '../../../assets/svg/icon-payment-close.svg';
import SuccessIcon from '../../../assets/svg/icon-payment-success.svg';
import ErrorIcon from '../../../assets/svg/icon-payment-error.svg';
import TextBlock from './TextBlock';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { MainButton } from './MainButton';
import { useNavigation } from '@react-navigation/native';
import { NAV_TYPE } from '../models/ScreenTypes';

const PaymentStatus = ({success, showStatusInfo}: any) => {
  const {goBack} = useNavigation<NAV_TYPE>(); 
  const yOffset = useSharedValue(-200);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(yOffset.value),
        },
      ],
    };
  });

  const yTextOffset = useSharedValue(30);
  const textOpacity = useSharedValue(0);

  const animatedTextStyles = useAnimatedStyle(() => {
    return {
      paddingHorizontal: 20,
      transform: [
        {
          translateY: withSpring(yTextOffset.value),
        },
      ],
      opacity: withSpring(textOpacity.value),
    };
  });

  const togglePaymentStatusInfo = (show: boolean) => {
    yOffset.value = withDelay(800, withTiming(show ? -20 : -200));
  };

  useEffect(() => {
    togglePaymentStatusInfo(showStatusInfo);
    if (success) { 
      yTextOffset.value = withDelay(850, withSpring(0));
      textOpacity.value = withDelay(810, withSpring(1));
    }
  }, [showStatusInfo]);

  return (
    <>
      <Animated.View style={animatedStyles}>
        <View
          style={{
            ...styles.mainHolder,
            backgroundColor: success ? '#334D8F' : '#EA1A1A',
          }}>
          <View style={styles.iconsHolder}>
            <RetryIcon width={24} height={24} />
            {success && <SuccessIcon width={64} height={64} />}
            {!success && <ErrorIcon width={64} height={64} />}
            <CloseIcon width={24} height={24} />
          </View>
          <TextBlock variant={'title'} color={'#fff'} alignment={'center'}>
            {!success
              ? 'Payment \nUnsuccessful'
              : 'Your payment \nwas successful!'}
          </TextBlock>
        </View>
      </Animated.View>

      <Animated.View style={animatedTextStyles}>
        <TextBlock variant={'title'}>Payment details</TextBlock>
        <TextBlock variant={'subtitle'} allCaps>Category</TextBlock>
        <TextBlock variant={'body'}>Purchase</TextBlock>
        <TextBlock variant={'subtitle'} allCaps>Swap price impact</TextBlock>
        <TextBlock variant={'body'}>{'>0.1%'}</TextBlock>
        <TextBlock variant={'subtitle'} allCaps>Swap</TextBlock>
        <TextBlock variant={'body'}>Game tokens for USD</TextBlock>
        <TextBlock variant={'subtitle'} allCaps>Fees</TextBlock>
        <TextBlock variant={'body'}>{'0.3%'}</TextBlock>

        <MainButton title='Ok' onPress={() => goBack()}></MainButton>
      </Animated.View>
    </>
  );
};

export default PaymentStatus;

const styles = StyleSheet.create({
  mainHolder: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: 'hidden',
  },
  iconsHolder: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
