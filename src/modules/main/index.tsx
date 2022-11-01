import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREEN_NAME} from '../../core/constants/SCREEN_NAME';
import { SCREEN_PARAMS_ALL } from '../../core/models/ScreenTypes';
import DashboardScreen from './screens/DashboardScreen';
import PaymentScreen from './screens/PaymentScreen';
import { View } from 'react-native';

const Main = createNativeStackNavigator<SCREEN_PARAMS_ALL>();

export default function MainTabRoutes() {
  return (
    <Main.Navigator
      initialRouteName={SCREEN_NAME.Dashboard}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}>
      <Main.Screen
        name={SCREEN_NAME.Dashboard}
        component={DashboardScreen}
        options={{
          headerShown: false,
          headerBackVisible: false,
        }}
      />
      <Main.Screen
        name={SCREEN_NAME.PaymentsScreen}
        component={PaymentScreen}
        options={{
          headerShown: true,
          headerBackVisible: true,
          title: 'Payments',
          headerBackTitle: '',
          headerTransparent: false,
          headerStyle: {
            
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: 'MazzardM-SemiBold',
            fontSize: 22,
          },
          headerTintColor: '#474A56',
        }}
      />
    </Main.Navigator>
  );
}
