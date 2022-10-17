import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProfilePageItem = ({label}: any) => {
  return (
    <View style={{marginBottom: 10}}>
      <Text style={{fontFamily: 'MazzardM-SemiBold', fontSize: 16}}>{label}</Text>
    </View>
  )
}

export default ProfilePageItem

const styles = StyleSheet.create({})