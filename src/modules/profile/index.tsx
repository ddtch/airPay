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
import AddWalletBtn from '../../../assets/svg/icon-add.svg';
import { Pressable, TouchableOpacity } from 'react-native';
import MainNotificationsScreen from '../notifications/screens/MainNotificationsScreen';
import { useDispatch } from 'react-redux';
import { setWalletConnectMode } from '../../store/info.slice';
import { useTranslation } from 'react-i18next';

const Profile = createNativeStackNavigator<SCREEN_PARAMS_ALL>();

export default function ProfileTabRoutes() {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const handleAddWallet = () => {
    dispatch(setWalletConnectMode(true));
  }

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
                <Pressable style={{
                  marginTop: -2,
                }}>
                  <AddWalletBtn width={24} height={24}/>
                </Pressable>
              )
            }
          }}
        />
        <Profile.Screen
          name={SCREEN_NAME.PaymentMethods}
          component={PaymentMethodsScreen}
          options={{
            title: t('my-wallets'),
            headerRight: () => {
              return (
                <Pressable style={{
                  marginTop: -2,
                }}>
                  <AddWalletBtn width={24} height={24} onPress={() => handleAddWallet()}/>
                </Pressable>
              )
            }
          }}
        />
        <Profile.Screen
          name={SCREEN_NAME.Languadge}
          options={{
            title: t('tabs.language')
          }}
          component={LanguagesScreen}
        />
        <Profile.Screen
          name={SCREEN_NAME.PersonalNotifications}
          component={MainNotificationsScreen}
          initialParams={{hideTitle: true}}
          options={{
            headerTitle: t('tabs.notifications')
          }}
        />
      </Profile.Group>
    </Profile.Navigator>
  );
}
