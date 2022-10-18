import {StyleSheet, Text, View, Platform} from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import AppleWallet from '../../../assets/svg/icon-wallet-ios.svg';
import GoogleWallet from '../../../assets/svg/icon-wallet-android.svg';

type CardItemProps = {
  item: any;
  index: number;
}

const CardItem = ({ item, index }: any) => {
  const {t} = useTranslation();
  return (
    <View style={styles.cardHolder}>
      <View style={styles.topPart}>
        <View style={styles.leftPart}>
          <Text style={styles.text1}>{item.number}</Text>
          <Text style={styles.text2}>{item.label}</Text>
        </View>
        <View style={styles.rightPart}>
          {Platform.OS === 'ios' ? <AppleWallet width={98} height={30}/> : <GoogleWallet width={98} height={30}/>}
        </View>
      </View>
      <View style={styles.botPart}>
        <View style={styles.leftPart}>
          <Text style={styles.text1}>{t('balance')}</Text>
          <Text style={{...styles.text2, color: '#334D8F'}}>{item.balance}{item.currency}</Text>
        </View>
        {/* <View style={styles.rightPart}>
          <Text style={styles.text1}>{t('debt')}</Text>
          <Text style={{...styles.text2, color: '#FF5959'}}>{item.debt}{item.currency}</Text>
        </View> */}
      </View>
    </View>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  cardHolder: {
    display: 'flex',
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',

    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4.65,
    elevation: 6,
  },
  topPart: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 50,
  },
  botPart: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  leftPart: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
    width: '70%',
  },
  rightPart: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
    width: '30%',
  },
  text1: {
    color: '#8A8A8A',
    textTransform: 'uppercase',
    fontSize: 14,
    marginBottom: 5,
  },
  text2: {
    fontSize: 20,
    color: '#474A56',
    fontWeight: '700',
  },
});
