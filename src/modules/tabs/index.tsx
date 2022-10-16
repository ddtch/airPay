import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import { SCREEN_PARAMS_ALL } from '../../core/models/ScreenTypes';
import { SCREEN_NAME } from '../../core/constants/SCREEN_NAME';
import BottomTabBarCustom from './BottomTabBarCustom';
import MainTabRoutes from '../main';
import PaymentsTabRoutes from '../payments';
import NotificationTabRoutes from '../notifications';
import ProfileTabRoutes from '../profile';

const Tab = createBottomTabNavigator<SCREEN_PARAMS_ALL>();

const TabRoutes = () => {
  const {t} = useTranslation();

  return (
    <Tab.Navigator
      backBehavior={'history'}
      initialRouteName={SCREEN_NAME.MainTabRoutes}
      detachInactiveScreens={true}
      tabBar={(props) => <BottomTabBarCustom {...props} isDark={false} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name={SCREEN_NAME.MainTabRoutes}
        component={MainTabRoutes}
        options={{
          tabBarHideOnKeyboard: true,
          title: t('nav-main'),
        }}
      />

      <Tab.Screen
        name={SCREEN_NAME.PaymentsTabRoutes}
        component={PaymentsTabRoutes}
        options={{
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={SCREEN_NAME.NotificationsTabRoutes}
        component={NotificationTabRoutes}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name={SCREEN_NAME.ProfileTabRoutes}
        component={ProfileTabRoutes}
        options={{
          title: t('nav-profile'),
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;
