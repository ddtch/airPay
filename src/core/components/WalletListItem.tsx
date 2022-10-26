import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Checkbox from '../../../assets/svg/icon-check.svg';
import CheckboxMarked from '../../../assets/svg/icon-checkbox.svg';
import CheckboxUnMarked from '../../../assets/svg/icon-checkbox-empty.svg';

import WalletAddBtn from '../../../assets/svg/icon-add-wallet.svg';
import IconCopy from '../../../assets/svg/icon-copy.svg';

const WalletListItem = ({
  item,
  index,
  lastItem,
  onSelected,
}: any) => {
  return (
    <View
      style={{
        borderTopWidth: 1,
        borderBottomWidth: index >= 0 ? (lastItem ? 1 : 0) : 1,
        borderColor: 'rgba(0,0,0,.15)',
        paddingHorizontal: 20,
      }}>
      <Pressable
        style={styles.walletItem}
        onPress={() => onSelected(item.id, item.connected)}>
        <View style={styles.mainLine}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>

            <View
              style={{
                display: 'flex',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,.15)',
                borderRadius: 50,
                width: 50,
                height: 50,
                marginRight: 20,
              }}>
              {item.icon}
            </View>

            <View style={{display: 'flex', flexDirection: 'column',}}>
              <Text
                style={{
                  fontFamily: 'MazzardM-Semibold',
                  fontSize: 18,
                }}>
                {item.title}
              </Text>
              {item.connected && (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 4,
                  }}>
                  <Text style={{opacity: 0.7, fontSize: 12}}>
                    {item.address?.slice(0, 8) + '...  '}
                  </Text>
                  <TouchableOpacity
                    onPress={() => Alert.alert('Address copied to clipboard')}>
                    <IconCopy width={14} height={14} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          <View style={styles.addressPart}>
            {item.connected && <CheckboxMarked width={22} height={22} />}
            {!item.connected && <CheckboxUnMarked width={22} height={22} />}
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default WalletListItem;

const styles = StyleSheet.create({
  walletItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  addressPart: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  mainLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  addresLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
