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
    backgroundColor: 'rgba(32, 55, 115, 0.73)',
    width: '100%',
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: .25,
    shadowRadius: 4,
    elevation: 8,
  },
  btnTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  }
})
