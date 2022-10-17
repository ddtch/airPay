import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import CardItem from './CardItem';
import {useTranslation} from 'react-i18next';

type VirtualCardsSliderProps = {
  cardsData: any[];
};

const VirtualCardsSlider: React.FC<VirtualCardsSliderProps> = ({cardsData}) => {
  const {t} = useTranslation();
  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      dot={null}
      showsPagination={false}
      activeDot={null}>
      {cardsData.map(el => (
        <CardItem item={el} key={el.id} />
      ))}
    </Swiper>
  );
};

export default VirtualCardsSlider;

const styles = StyleSheet.create({
  wrapper: {
    // overflow: 'hidden',
    // backgroundColor: 'red',
  },
});
