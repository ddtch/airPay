import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProgressBar = () => {
  return (
    <View style={styles.holder}>
      <View style={styles.fillScale}></View>
      <View style={styles.emptyScale}></View>
    </View>
  )
}

export default ProgressBar

const styles = StyleSheet.create({
  holder: {
    borderRadius: 6,
    height: 8,
    width: '100%',
    display: 'flex',
    position: 'relative',
    overflow: 'hidden',
  },
  fillScale: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'red',
    width: '30%',
    height: 8,
    zIndex: 2,
    borderTopRightRadius: 6,
    borderBottomEndRadius: 6,
  },
  emptyScale: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: 8,
    backgroundColor: '#C7C3C3'
  }
})