import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import USDCIcon from '../../../assets/svg/icon-usdc.svg';
import IconUp from '../../../assets/svg/icon-arrow-up.svg';
import IconDown from '../../../assets/svg/icon-arrow-down.svg';
import { EBalanceBlockType } from '../models/EBalanceBlockTypes';


const blocks = [
  {
    id: 1,
    title: 'Total',
    titleIcon: <USDCIcon width={14} height={14} style={{marginRight: 2}}/>,
    amount: 9849,
    type: EBalanceBlockType.total,
  },
  {
    id: 2,
    title: 'Tokens',
    amountIcon: <IconUp width={12} height={12} style={{marginRight: 2}}/>,
    amount: 1762,
    type: EBalanceBlockType.token,
    income: true,
  },
  {
    id: 3,
    title: 'NFTs',
    amountIcon: <IconDown width={12} height={12} style={{marginRight: 2}}/>,
    amount: 8123,
    type: EBalanceBlockType.nft,
    outcome: true
  },
]

const Balances = () => {
  return (
    <View style={styles.holder}>
      {
        blocks.map(el => <View key={el.id} style={styles.block}>
          <View style={styles.blockTitle}>
            {el.titleIcon}
            <Text style={styles.blockTitleText}>{el.title}</Text>
          </View>
          {el.type !== EBalanceBlockType.total  && <View style={styles.sumHolder}>
            {el.amountIcon}
            <Text style={{color: el.income ? '#0CDD2F' : '#DD320C'}}>${el.amount.toLocaleString('en')}</Text>
          </View>}
          {el.type === EBalanceBlockType.total  && <View style={styles.sumHolder}>
            <Text style={styles.totalAmount}>${el.amount.toLocaleString('en')}</Text>
          </View>}
        </View>)
      }
    </View>
  )
}

export default Balances

const styles = StyleSheet.create({
  holder: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: .15,
    shadowRadius: 4,
    elevation: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  block: {

  },
  blockTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  blockTitleText: {
    fontSize: 14,
    opacity: .5,
    fontFamily: 'MazzardM-Regular',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'MazzardM-SemiBold'
  },
  sumHolder: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sumText: {
    fontFamily: 'MazzardM-Regular',
  }
})