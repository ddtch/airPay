import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREEN_PARAMS_ALL } from '../../core/models/ScreenTypes';
import { SCREEN_NAME } from '../../core/constants/SCREEN_NAME';
import OnBoardingScreen from './screens/OnBoardingScreen';
import OnBoardingConnectionScreen from './screens/OnBoardingConnectionScreen';

const Stack = createNativeStackNavigator<SCREEN_PARAMS_ALL>();

const OnboardingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerTransparent: true,
          headerTitle: '',
          headerBackVisible: true,
          headerTintColor: 'rgba(0,0,0,.4)',
          headerShown: false,
        }}>
        <Stack.Screen name={SCREEN_NAME.OnboardingWellcome} component={OnBoardingScreen} />
        <Stack.Screen name={SCREEN_NAME.OnboardingConnect} component={OnBoardingConnectionScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default OnboardingStack

const styles = StyleSheet.create({

})