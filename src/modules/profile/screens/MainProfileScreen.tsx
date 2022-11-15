import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native';
import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';
const mockAva = require('../../../../assets/avatar.jpeg');
const mockAva1 = require('../../../../assets/avatar1.jpeg');
import IconLogout from '../../../../assets/svg/icon-logout.svg';
import {SCREEN_NAME} from '../../../core/constants/SCREEN_NAME';
import IconChevronRight from '../../../../assets/svg/icon-chevron-right.svg';
import {useNavigation} from '@react-navigation/native';
import {NAV_TYPE} from '../../../core/models/ScreenTypes';
import {mainStyles} from '../../../../styles/main.styles';
import Swiper from 'react-native-swiper';
import ProfileBg from '../../../../assets/svg/profile-bg.svg';
const pbg = require('../../../../assets/svg/pbg-1.png');

const userRoutes = [
  {
    id: 1,
    link: SCREEN_NAME.PaymentMethods,
    label: 'My wallets',
  },
  {
    id: 2,
    link: SCREEN_NAME.Languadge,
    label: 'Languages',
  },
  // {
  //   id: 3,
  //   link: SCREEN_NAME.PersonalNotifications,
  //   label: 'Notifications',
  // },
  // {
  //   id: 4,
  //   link: SCREEN_NAME.PersonalNotifications,
  //   label: 'Notifications',
  // },
];

const LinkItem = ({item, index, navTo}: any) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#F8F8FA',
        padding: 15,
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: 20,
        borderRadius: 6,
      }}
      onPress={() => navTo(item.link)}>
      <Text
        style={{
          fontSize: 18,
          fontFamily: 'MazzardM-SemiBold',
          margin: 0,
          color: '#000',
        }}>
        {item.label}
      </Text>
      <IconChevronRight width={24} height={24} />
    </TouchableOpacity>
  );
};

const MainProfileScreen = () => {
  const {balance} = useSelector((state: RootState) => state.info);
  const {navigate} = useNavigation<NAV_TYPE>();

  return (
    <SafeAreaView
      style={{
        display: 'flex',
        flex: 1, //(Dimensions.get('screen').height / 2.10) / Dimensions.get('screen').height,
        flexDirection: 'column',
      }}>
      <View
        style={{
          position: 'absolute',
          width: Dimensions.get('screen').width,
          
          height: Dimensions.get('screen').height / 3,
          overflow: 'hidden',
          left: 0,
          top: -20,
          zIndex: 0,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}>
        <ProfileBg
          style={{position: 'absolute', top: Platform.OS === 'ios' ? '-96%' : '-100%'}}
          width={Dimensions.get('screen').width}
          height={Dimensions.get('screen').height}
        />
      </View>

      <View
        style={{
          height: '100%',
          maxHeight: 244,
        }}>
        <Swiper
          style={{
            position: 'relative',
            zIndex: 2,
          }}
          paginationStyle={{bottom: 40}}
          dotColor={'#9E9E9E'}
          activeDotColor={'#fff'}>
          <View style={styles.topHolder}>
            <View style={styles.userDataHolder}>
              <Text style={{color: '#fff', fontWeight: '700', fontSize: 16}}>
                carrera.apt
              </Text>
              <Image
                source={mockAva1}
                resizeMethod={'resize'}
                resizeMode={'contain'}
                style={styles.avatar}
              />
              <Text style={{color: '#fff', fontWeight: '700', fontSize: 18}}>
                ${balance.total}
              </Text>
            </View>
          </View>

          <View style={styles.topHolder}>
            <View style={styles.userDataHolder}>
              <Text style={{color: '#fff', fontWeight: '700', fontSize: 16}}>
                ddtch.sol
              </Text>
              <Image
                source={mockAva}
                resizeMethod={'resize'}
                resizeMode={'contain'}
                style={styles.avatar}
              />
              <Text style={{color: '#fff', fontWeight: '700', fontSize: 18}}>
                $76.10
              </Text>
            </View>
          </View>
        </Swiper>
      </View>

      <View style={{...mainStyles.content, paddingVertical: 0}}>
        <FlatList
          style={{
            width: '100%',
          }}
          data={userRoutes}
          renderItem={({item, index}) => (
            <LinkItem
              item={item}
              index={index}
              navTo={(link: any) => navigate(link)}
            />
          )}
        />

        <View style={styles.singleBtn}>
          <TouchableOpacity
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <IconLogout width={24} height={24} style={{marginRight: 10}} />
            <Text style={{color: '#334D8F', fontWeight: '600'}}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MainProfileScreen;

const styles = StyleSheet.create({
  userDataHolder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topHolder: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  avatar: {
    borderRadius: 30,
    overflow: 'hidden',
    width: 100,
    height: 100,
    marginVertical: 16,
  },
  singleBtn: {
    marginBottom: 20,
  },
  panel: {},
});
