import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREEN_PARAMS_ALL } from "../../core/models/ScreenTypes";
import { SCREEN_NAME } from '../../core/constants/SCREEN_NAME';
import TabRoutes from '../tabs';

const Stack = createNativeStackNavigator<SCREEN_PARAMS_ALL>();

/**
 * HomeStack include all auth user accessed screens
 */
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={SCREEN_NAME.TabRoutes} component={TabRoutes} />
    </Stack.Navigator>
  );
};

export default HomeStack;