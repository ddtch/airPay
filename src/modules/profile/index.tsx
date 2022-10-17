import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREEN_NAME} from '../../core/constants/SCREEN_NAME';
import {SCREEN_PARAMS_ALL} from '../../core/models/ScreenTypes';
import MainProfileScreen from './screens/MainProfileScreen';
import PersonalDetailsScreen from './screens/PersonalDetailsScreen';
import PaymentMethodsScreen from './screens/PaymentMethodsScreen';
import LanguagesScreen from './screens/LanguagesScreen';
import PersonalNotificationsScreen from './screens/PersonalNotificationsScreen';
import BackBtn from '../../../assets/svg/icon-chevron-left.svg';
import EditBtn from '../../../assets/svg/icon-edit.svg';
import { TouchableOpacity } from 'react-native';

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
      <Profile.Group
        screenOptions={{
          headerShown: true,
          headerBackVisible: true,
          headerBackTitle: '',
          headerShadowVisible: false,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerTintColor: '#474A56',
        }}>
        <Profile.Screen
          name={SCREEN_NAME.PersonalDetails}
          component={PersonalDetailsScreen}
          options={{
            title: 'Personal details',
            headerTitleStyle: {
              fontFamily: 'MazzardM-SemiBold',
              fontSize: 22,
            },
            headerRight: () => {
              return (
                <TouchableOpacity style={{
                  marginTop: -2,
                }}>
                  <EditBtn width={24} height={24}/>
                </TouchableOpacity>
              )
            }
          }}
        />
        <Profile.Screen
          name={SCREEN_NAME.PaymentMethods}
          component={PaymentMethodsScreen}
          options={{
            headerRight: () => {
              return (
                <TouchableOpacity style={{
                  marginTop: -2,
                }}>
                  <EditBtn width={24} height={24}/>
                </TouchableOpacity>
              )
            }
          }}
        />
        <Profile.Screen
          name={SCREEN_NAME.Languadge}
          component={LanguagesScreen}
        />
        <Profile.Screen
          name={SCREEN_NAME.PersonalNotifications}
          component={PersonalNotificationsScreen}
        />
      </Profile.Group>
    </Profile.Navigator>
  );
}
