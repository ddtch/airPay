import {StyleSheet, Text, View} from 'react-native';
import React, { PropsWithChildren } from 'react';

type TextBlockProps = {
  variant: 'title' | 'subtitle' | 'body' | 'caption';
  alignment?: 'left' | 'center' | 'right',
  text?: string;
};

const TextBlock: React.FC<PropsWithChildren<TextBlockProps>> = ({variant, text, children, alignment}) => {
  return (
    <>
      <Text style={{...styles[variant], textAlign: alignment ? alignment : 'left'}}>{children}</Text>
    </>
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
    fontWeight: '600',
  },
  subtitle: {
    ...commonStyle,
    fontSize: 20,
    fontWeight: '600',
  },
  body: {
    ...commonStyle,
    fontSize: 18,
  },
  caption: {
    ...commonStyle,
    fontSize: 16,
  },
});
