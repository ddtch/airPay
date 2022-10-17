import { StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren } from 'react'

const Panel:React.FC<PropsWithChildren> = ({children}) => {
  return (
    <View style={styles.panelHolder}>
      {children}
    </View>
  )
}

export default Panel

const styles = StyleSheet.create({
  panelHolder: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
  }
})