import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREEN_NAME} from '../../core/constants/SCREEN_NAME';
import { SCREEN_PARAMS_ALL } from '../../core/models/ScreenTypes';
import MainNotificationsScreen from './screens/MainNotificationsScreen';

const Notifications = createNativeStackNavigator<SCREEN_PARAMS_ALL>();

export default function NotificationTabRoutes() {
  return (
    <Notifications.Navigator
      initialRouteName={SCREEN_NAME.NotificationsScreen}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}>
      <Notifications.Screen
        name={SCREEN_NAME.NotificationsScreen}
        component={MainNotificationsScreen}
        options={{
          headerShown: false,
          headerBackVisible: false,
        }}
      />
    </Notifications.Navigator>
  );
}
