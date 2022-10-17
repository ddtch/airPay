import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { IMyTheme } from '../../../styles/main.styles';
import useAppTheme from '../hooks/context/UseAppTheme';

type LightButtonProps = {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const LightButton:React.FC<LightButtonProps> = ({onPress, title}) => {
  const theme = useAppTheme();
  const mainStPass = styles(theme);
  return (
    <TouchableOpacity onPress={onPress} style={mainStPass.buttonContainer}>
      <Text style={mainStPass.btnTitle}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = (theme: IMyTheme) => StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'transparent',
    width: '100%',
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 10,
  },
  btnTitle: {
    color: theme.colors.primary,
    fontSize: 18,
    fontFamily: 'MazzardM-SemiBold',
  }
})
