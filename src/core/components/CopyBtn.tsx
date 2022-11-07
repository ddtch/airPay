import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IconCopy from '../../../assets/svg/icon-copy.svg';

type CopyBtnProps = {
  onPress?: () => void,
  iconRadius?: number,
  iconSize?: number,
}

const CopyBtn:React.FC<CopyBtnProps> = ({onPress, iconRadius=32, iconSize=14}) => {
  return (
    <TouchableOpacity
      style={{
        
        display: 'flex',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,.15)',
        height: iconRadius,
        width: iconRadius,
        borderRadius: iconRadius,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => onPress && onPress()}>
      <IconCopy width={iconSize} height={iconSize} />
    </TouchableOpacity>
  );
};

export default CopyBtn;

const styles = StyleSheet.create({});
