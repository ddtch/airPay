import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {mainStyles} from '../../../../styles/main.styles';
import ProfilePageItem from '../../../core/components/ProfilePageItem';
import {MainButton} from '../../../core/components/MainButton';

const options = [
  {
    id: 1,
    title: 'Wallet address',
  },
  {
    id: 2,
    title: "NFT's",
  },
  {
    id: 3,
    title: 'Tokens',
  },
];

const PersonalDetailsScreen = () => {
  return (
    <SafeAreaView style={mainStyles.container}>
      <View style={mainStyles.content}>
        {options.map(el => (
          <ProfilePageItem key={el.id} label={el.title} />
        ))}
        <View
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <MainButton onPress={() => null} noShadows disabled title={'Apply'} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PersonalDetailsScreen;

const styles = StyleSheet.create({});
