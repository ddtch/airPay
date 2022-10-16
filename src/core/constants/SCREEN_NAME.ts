export enum SCREEN_TYPE {
  //APP
  LoadingStack = 'LoadingStack',
  OnboardingStack = 'OnboardingStack',
  HomeStack = 'HomeStack',

  //ONBOARDING_STACK
  OnboardingWellcome = 'OnboardingWelcome',
  OnboardingConnect = 'OnboardingConnect',
  OnboardingConnectSuccess = 'OnboardingSuccess',
  OnboardingConnectError = 'OnboardingError',

  //HOME_STACK
  TabRoutes = 'TabRoutes',

  //TABS
  MainTabRoutes = 'MainTabRoutes',
  PaymentsTabRoutes = 'PaymentsTabRoutes',
  NotificationsTabRoutes = 'NotificationTabRoutes',
  ProfileTabRoutes = 'ProfileTabRoutes',

  //MAIN_TAB
  Dashboard = 'Dashboard',

  //PAAYMENT_TAB
  PaymentsScreen = 'PaymentsScreen',

  // NOTIFICATION_TAB
  NotificationsScreen = 'NotificationsScreen',
  NotificationItemScreen = 'NotificationItemScreen',

  //PROFILE_TAB
  ProfileScreen = 'ProfileScreen',
}

export const SCREEN_NAME = {...SCREEN_TYPE};
