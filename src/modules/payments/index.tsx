import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREEN_NAME} from '../../core/constants/SCREEN_NAME';
import { SCREEN_PARAMS_ALL } from '../../core/models/ScreenTypes';
import MainPaymentScreen from './screens/MainPaymentScreen';

const Payment = createNativeStackNavigator<SCREEN_PARAMS_ALL>();

export default function PaymentsTabRoutes() {
  return (
    <Payment.Navigator
      initialRouteName={SCREEN_NAME.PaymentsScreen}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}>
      <Payment.Screen
        name={SCREEN_NAME.PaymentsScreen}
        component={MainPaymentScreen}
        options={{
          headerShown: false,
          headerBackVisible: false,
        }}
      />
    </Payment.Navigator>
  );
}
