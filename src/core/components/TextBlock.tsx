import {StyleSheet, Text, View} from 'react-native';
import React, { PropsWithChildren } from 'react';

type TextBlockProps = {
  variant: 'title' | 'subtitle' | 'body' | 'caption';
  alignment?: 'left' | 'center' | 'right',
  style?: any;
  color?: string;
};

const TextBlock: React.FC<PropsWithChildren<TextBlockProps>> = ({variant, children, alignment, style, color = '#000'}) => {
  return (
    <Text style={{...styles[variant], color, ...style, textAlign: alignment ? alignment : 'left',}}>{children}</Text>
  );
};

export default TextBlock;

const commonStyle = {
  marginBottom: 20,
}
const styles = StyleSheet.create({
  title: {
    ...commonStyle,
    fontSize: 22,
    fontFamily: 'MazzardH-Bold'
  },
  subtitle: {
    ...commonStyle,
    fontSize: 20,
    fontFamily: 'MazzardH-SemiBold'
  },
  body: {
    ...commonStyle,
    fontSize: 18,
    fontFamily: 'MazzardH-Regular'
  },
  caption: {
    ...commonStyle,
    fontSize: 16,
    fontFamily: 'MazzardH-Regular',
  },
});
