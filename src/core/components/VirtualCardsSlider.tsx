import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import CardItem from './CardItem';
import {useTranslation} from 'react-i18next';
import Carousel from 'react-native-snap-carousel';

type VirtualCardsSliderProps = {
  cardsData: any[];
};

const VirtualCardsSlider: React.FC<VirtualCardsSliderProps> = ({cardsData}) => {
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
      showsPagination={true}>
      {cardsData.map(el => (
        // <CardItem item={el} key={el.id} />
        <View key={el.id} style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Image source={el.cardImage} resizeMode={'contain'} style={{width: '90%', height: 161,}}/>
        </View>
      ))}
    </Swiper>
    // <Carousel
    //     data={cardsData}
    //     renderItem={_renderItem}
    //     itemWidth={292}
    //   />
  );
};

export const _renderItem = ({item, index}: any) => {
  return (
      <View style={{}}>
          <Text style={{}}>{ item.title }</Text>
      </View>
  );
}

export default VirtualCardsSlider;

const styles = StyleSheet.create({
  wrapper: {
    // overflow: 'hidden',
    // backgroundColor: 'red',
  },
});
