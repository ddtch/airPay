import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {Provider} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SCREEN_PARAMS_ALL} from './src/core/models/ScreenTypes';
import {SCREEN_NAME} from './src/core/constants/SCREEN_NAME';
import {navigationRef} from './src/core/utils';
import i18n from './src/i18n';
import HomeStack from './src/modules/home';
import LoadingScreen from './src/modules/LoadingScreen';
import OnboardingStack from './src/modules/onboarding';
import {AirMoneyThemeDark} from './styles/main.styles';
import {SheetProvider} from 'react-native-actions-sheet';
import { RootState, store } from './src/store';
import {useSelector, useDispatch} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
//@ts-ignore
import GlobalFont from 'react-native-global-font';

i18n.init();

const App = () => {
  const {t} = useTranslation();
  const scheme = useColorScheme();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    SplashScreen?.hide();
    GlobalFont.applyGlobal('MazzardM-Regular')
  }, [])

  return (
    <NavigationContainer
      // fallback={<FullScreenLoader />}
      ref={navigationRef}
      theme={scheme === 'dark' ? AirMoneyThemeDark : AirMoneyThemeDark}>
      <Provider store={store}>
        <SheetProvider>
          <NavigateApp />
        </SheetProvider>
      </Provider>
    </NavigationContainer>
  );
};

const Stack = createNativeStackNavigator<SCREEN_PARAMS_ALL>();

export const NavigateApp = () => {
  const {loggedIn} = useSelector((state: RootState) => state.auth);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
  }, []);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!isLoaded && (<Stack.Screen name={SCREEN_NAME.LoadingStack} component={LoadingScreen}/>)}
      
      {isLoaded && !loggedIn && (<Stack.Screen name={SCREEN_NAME.OnboardingStack} component={OnboardingStack}/>)}
      
      {isLoaded && loggedIn && (<Stack.Screen name={SCREEN_NAME.HomeStack} component={HomeStack}/>)}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
