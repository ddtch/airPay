import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { mainStyles } from '../../../../styles/main.styles'
import TextBlock from '../../../core/components/TextBlock';
import LedIndicator from '../../../core/components/LedIndicator';
import { MainButton } from '../../../core/components/MainButton';
import {useDispatch} from 'react-redux';
import {setLoggedInStatus} from '../../../store/auth.slice';
import { setUser } from '../../../store/user.slice';

const OnBoardingConnectionScreen = () => {
  const [isLoading, setisLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 2100);
  }, []);

  const handleConnectSuccess = () => {
    dispatch(setUser({firstName: 'D_d', lastName: 'Tch', username: 'username.man'}));
    dispatch(setLoggedInStatus(true))
  }

  return (
    <SafeAreaView style={mainStyles.container}>
      <View style={mainStyles.content}>
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
              <MainButton onPress={handleConnectSuccess} title={'ok'}/>
            </>
          )
        }
      </View>
    </SafeAreaView>
  )
}

export default OnBoardingConnectionScreen

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
  }
})