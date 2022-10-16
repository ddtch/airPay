import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREEN_NAME} from '../../core/constants/SCREEN_NAME';
import { SCREEN_PARAMS_ALL } from '../../core/models/ScreenTypes';
import MainProfileScreen from './screens/MainProfileScreen';


const Profile = createNativeStackNavigator<SCREEN_PARAMS_ALL>();

export default function ProfileTabRoutes() {
  return (
    <Profile.Navigator
      initialRouteName={SCREEN_NAME.ProfileScreen}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}>
      <Profile.Screen
        name={SCREEN_NAME.ProfileScreen}
        component={MainProfileScreen}
        options={{
          headerShown: false,
          headerBackVisible: false,
        }}
      />
    </Profile.Navigator>
  );
}
