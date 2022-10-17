import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';
const mockAva = require('../../../../assets/avatar.jpeg');
import QBtn from '../../../../assets/svg/icon-question.svg';
import IconLogout from '../../../../assets/svg/icon-logout.svg';
import {SCREEN_NAME} from '../../../core/constants/SCREEN_NAME';
import IconChevronRight from '../../../../assets/svg/icon-chevron-right.svg';
import {useNavigation} from '@react-navigation/native';
import {NAV_TYPE} from '../../../core/models/ScreenTypes';
import {mainStyles} from '../../../../styles/main.styles';

const userRoutes = [
  {
    id: 1,
    link: SCREEN_NAME.PersonalDetails,
    label: 'Personal details',
  },
  {
    id: 2,
    link: SCREEN_NAME.PaymentMethods,
    label: 'Payment methods',
  },
  {
    id: 3,
    link: SCREEN_NAME.Languadge,
    label: 'Languages',
  },
  {
    id: 4,
    link: SCREEN_NAME.PersonalNotifications,
    label: 'Notifications',
  },
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
          fontSize: 16,
          fontWeight: '500',
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
      <SafeAreaView style={{flex: 0, backgroundColor: '#334D8F'}} />
      <SafeAreaView
        style={{
          flex: 0.35,
          backgroundColor: '#334D8F',
          borderBottomRightRadius: 6,
          borderBottomLeftRadius: 6,
          display: 'flex',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity style={styles.questionBtn}>
          <QBtn width={24} height={24} />
        </TouchableOpacity>
        <View style={styles.topHolder}>
          <View style={styles.userDataHolder}>
            <Text style={{color: '#fff', fontWeight: '700', fontSize: 16}}>
              {user?.username}
            </Text>
            <Image
              source={mockAva}
              resizeMethod={'resize'}
              resizeMode={'contain'}
              style={styles.avatar}
            />
            <Text style={{color: '#fff', fontWeight: '700', fontSize: 18}}>
              $0.00
            </Text>
          </View>
        </View>
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
            <TouchableOpacity style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <IconLogout width={24} height={24} style={{marginRight: 10}}/>
              <Text style={{color:'#334D8F',fontWeight: '600'}}>Logout</Text>
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
  singleBtn: {

  },
  panel: {},
});
