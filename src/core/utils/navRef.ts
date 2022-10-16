import React from 'react';
import {NavigationContainerRef, useNavigation} from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef<{}>>();

export const getNavigate = (): ReturnType<typeof useNavigation> => {
  //@ts-ignore
  return navigationRef?.current;
};
