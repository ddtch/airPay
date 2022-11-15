import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import {useTranslation} from 'react-i18next';
import InfoIcon from '../../../assets/svg/icon-info.svg';

type VirtualCardsSliderProps = {
  cardsData: any[];
  onInfoPress: (cardId: number) => void;
  onCardPress: () => void;
};

const VirtualCardsSlider: React.FC<VirtualCardsSliderProps> = ({
  cardsData,
  onInfoPress,
  onCardPress,
}) => {
  const {t} = useTranslation();

  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      paginationStyle={{
        marginBottom: 0,
        position: 'absolute',
        bottom: 0,
      }}
      index={0}
      loop={false}
      showsPagination={true}>
      {cardsData.map(el => (
        <View
          key={el.id}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* <Pressable onPress={onCardPress} style={{width: '90%', height: 161, marginLeft: 40}}> */}
            <Image
              source={el.cardImage}
              resizeMode={'contain'}
              style={{width: '90%', height: 161}}
            />
          {/* </Pressable> */}
          <Pressable
            style={styles.infoIconHolder}
            onPress={() => onInfoPress(el.id)}>
            <InfoIcon width={26} height={26} />
          </Pressable>
        </View>
      ))}
    </Swiper>
  );
};

export const _renderItem = ({item, index}: any) => {
  return (
    <View style={{}}>
      <Text style={{}}>{item.title}</Text>
    </View>
  );
};

export default VirtualCardsSlider;

const styles = StyleSheet.create({
  infoIconHolder: {
    position: 'absolute',
    bottom: 28,
    right: 74,
  },
  wrapper: {
    // overflow: 'hidden',
    // backgroundColor: 'red',
  },
});
