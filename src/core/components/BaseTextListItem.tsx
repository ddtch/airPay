import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CopyBtn from './CopyBtn';

type BaseTextListItemPropd = {
  label?: string;
  text: string;
  onPressed?: () => void;
  copied?: boolean;
};

const BaseTextListItem: React.FC<BaseTextListItemPropd> = ({
  label,
  text,
  onPressed,
  copied,
}) => {
  return (
    <View style={styles.item}>
      <View>
        {label && <Text style={styles.label}>{label}</Text>}
        <Text style={styles.text}>{text}</Text>
      </View>
      {copied && (
        <CopyBtn
          iconRadius={28}
          iconSize={12}
          onPress={() => onPressed && onPressed()}
        />
      )}
    </View>
  );
};

export default BaseTextListItem;

const styles = StyleSheet.create({
  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,.15)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    opacity: 0.4,
    fontSize: 12,
    marginBottom: 6,
    fontFamily: 'MazzardM-Regular',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'MazzardM-Medium',
  },
});
