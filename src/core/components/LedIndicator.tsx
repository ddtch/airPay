import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type LedIndicatorProps = {
  connected: boolean;
  label?: string;
};

const LedIndicator: React.FC<LedIndicatorProps> = ({connected, label}) => {
  return (
    <View style={styles.indicatorHolder}>
      <View
        style={{
          ...styles.indicator,
          backgroundColor: connected ? '#18B23A' : 'red',
        }}/>
        <Text>{label ? label : 'Connected'}</Text>
    </View>
  );
};

export default LedIndicator;

const styles = StyleSheet.create({
  indicatorHolder: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 8,
    display: 'flex',
    marginRight: 10,
  },
});
