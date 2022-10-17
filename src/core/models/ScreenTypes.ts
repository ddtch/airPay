import {NavigationProp, RouteProp} from '@react-navigation/native';
import { SCREEN_NAME, SCREEN_TYPE } from '../constants/SCREEN_NAME';

export type SCREEN_PARAMS_ALL = {
  [SCREEN_NAME.OnboardingStack]: undefined;
  [SCREEN_NAME.HomeStack]: undefined;
  [SCREEN_NAME.LoadingStack]: undefined;

  [SCREEN_NAME.OnboardingWellcome]: undefined;
  [SCREEN_NAME.OnboardingConnect]: undefined;
  [SCREEN_NAME.OnboardingConnectSuccess]: undefined;
  [SCREEN_NAME.OnboardingConnectError]: undefined;

  
  [SCREEN_NAME.MainTabRoutes]: undefined;
  [SCREEN_NAME.TabRoutes]: undefined;
  [SCREEN_NAME.PaymentsTabRoutes]: undefined;
  [SCREEN_NAME.NotificationsTabRoutes]: undefined;
  [SCREEN_NAME.ProfileTabRoutes]: undefined;

  [SCREEN_NAME.Dashboard]: undefined;
  [SCREEN_NAME.NotificationsScreen]: undefined;
  [SCREEN_NAME.NotificationItemScreen]: {itemId: number};
  [SCREEN_NAME.PaymentsScreen]: undefined;

  [SCREEN_NAME.ProfileScreen]: undefined;
  [SCREEN_NAME.PersonalDetails]: undefined;
  [SCREEN_NAME.PaymentMethods]: undefined;
  [SCREEN_NAME.Languadge]: undefined;
  [SCREEN_NAME.PersonalNotifications]: undefined;
};

export type NAV_TYPE = NavigationProp<SCREEN_PARAMS_ALL>;

export type ROUTE_TYPE<T extends SCREEN_TYPE> = RouteProp<SCREEN_PARAMS_ALL, T>;
