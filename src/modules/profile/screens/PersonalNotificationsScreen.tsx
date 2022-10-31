import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {mainStyles} from '../../../../styles/main.styles';

const PersonalNotificationsScreen = () => {
  return (
    <SafeAreaView style={mainStyles.container}>
      <View style={mainStyles.content}>
        <Text>PersonalNotificationsScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default PersonalNotificationsScreen;

const styles = StyleSheet.create({});
