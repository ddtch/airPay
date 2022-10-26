import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 6,
      }}
      onPress={() => navTo(item.link)}>
      <Text
        style={{
          fontSize: 18,
          fontFamily: 'MazzardM-SemiBold',
          margin: 0,
        }}>
        {item.label}
      </Text>
      <IconChevronRight width={24} height={24} />
    </TouchableOpacity>
  );
};

const MainProfileScreen = () => {
  const {user} = useSelector((state: RootState) => state.user);
  const {navigate} = useNavigation<NAV_TYPE>();

  return (
    <Fragment>
      <SafeAreaView
        style={{
          flex: 0.35,
          display: 'flex',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={pbg}
          style={{
            height: 275,
            width: Dimensions.get('screen').width,
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 0,
          }}
          resizeMode={'cover'}
        />

        <Swiper
          style={{
            position: 'relative',
            zIndex: 2,
            marginTop: 10,
          }}
          paginationStyle={{bottom: 40}}
          dotColor={'#9E9E9E'}
          activeDotColor={'#fff'}>
          <View style={styles.topHolder}>
            <View style={styles.userDataHolder}>
              <Text style={{color: '#fff', fontWeight: '700', fontSize: 16}}>
                ddtch.sol
              </Text>
              <Image
                source={mockAva1}
                resizeMethod={'resize'}
                resizeMode={'contain'}
                style={styles.avatar}
              />
              <Text style={{color: '#fff', fontWeight: '700', fontSize: 18}}>
                $9,120.00
              </Text>
            </View>
          </View>

          <View style={styles.topHolder}>
            <View style={styles.userDataHolder}>
              <Text style={{color: '#fff', fontWeight: '700', fontSize: 16}}>
                dorado.apt
              </Text>
              <Image
                source={mockAva}
                resizeMethod={'resize'}
                resizeMode={'contain'}
                style={styles.avatar}
              />
              <Text style={{color: '#fff', fontWeight: '700', fontSize: 18}}>
                $172.10
              </Text>
            </View>
          </View>
        </Swiper>
      </SafeAreaView>

      <SafeAreaView
        style={{
          flex: 0.65,
        }}>
        <View style={mainStyles.content}>
          <FlatList
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
    </Fragment>
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
  questionBtn: {
    position: 'absolute',
    zIndex: 2,
    top: 20,
    left: 20,
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
    marginVertical: 14,
  },
  singleBtn: {},
  panel: {},
});
