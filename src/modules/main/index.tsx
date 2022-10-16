import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREEN_NAME} from '../../core/constants/SCREEN_NAME';
import { SCREEN_PARAMS_ALL } from '../../core/models/ScreenTypes';
import DashboardScreen from './screens/DashboardScreen';

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
    </Main.Navigator>
  );
}
