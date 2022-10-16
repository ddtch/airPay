import React, { PropsWithChildren } from 'react';
import {StyleProp, StyleSheet, Text, View, ViewProps, ViewStyle} from 'react-native';

interface RowProps {
  justifyContent?: ViewStyle['justifyContent'];
  alignItems?: ViewStyle['alignItems'];
  style?: StyleProp<ViewStyle>;
}

const Row: React.FC<PropsWithChildren & RowProps> = ({children, ...props}) => {
  return <View style={[{justifyContent: props.justifyContent, alignItems: props.alignItems}, styles.container, props.style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default Row;
