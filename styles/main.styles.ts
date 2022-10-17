import { DefaultTheme, Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

interface IThemeColors {
  contrast: string;
  contrastAlpha: string;
  main?: string;
  dark?: string;
  gray?: string;
  black?: string;
}

interface IThemeMainColors {
  primary: string;
  secondary: string;
  black: string;
  white: string;
  gray: string;
  contrast: string;
  red: string;
  green: string;
  blue: string;
}

export interface IMyTheme extends Theme {
  themeColorsForDark?: IThemeColors;
  themeColorsForLight?: IThemeColors;
  mainColors: IThemeMainColors;
}

export const AirMoneyThemeDark: IMyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#042033',
    primary: '#334D8F',
  },
  mainColors: {
    primary: '#334D8F',
    secondary: '#FE7B43',
    black: '#000',
    white: '#fff',
    gray: '#787878',
    contrast: '#fff',
    red: '#EB4D3D',
    green: '#5BD580',
    blue: '#498CDB',
  },
};

export const AirMoneyThemeLight: IMyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#474A56',
  },
  mainColors: {
    primary: '#CF1259',
    secondary: '#FFE03F',
    black: '#201F2B',
    white: '#F9F9F9',
    gray: '#BBBBBB',
    contrast: '#000',
    red: '#EB4D3D',
    green: '#5BD580',
    blue: '#498CDB',
  },
};

export const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    // backgroundColor: 'blue',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    padding: 22,
    // backgroundColor: 'red'
  },
  containerCalendarIsExpand: {
    backgroundColor: 'white',
  },
  onBoardingLogo: {
    width: 218,
    height: 92,
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 48,
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#61dafb',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  actionSheetContent: {
    minHeight: 120,
    padding: 20,
  }
});