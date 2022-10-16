import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { IMyTheme } from '../../../styles/main.styles';
import useAppTheme from '../hooks/context/UseAppTheme';

type MainButtonProps = {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const MainButton:React.FC<MainButtonProps> = ({onPress, title}) => {
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
    backgroundColor: theme.colors.primary,
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
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  }
})
