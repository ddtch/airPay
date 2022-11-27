import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Fragment} from 'react';
import {mainStyles} from '../../../../styles/main.styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';
import dayjs from 'dayjs';
import isYesterday from 'dayjs/plugin/isYesterday';
import FilterIcon from '../../../../assets/svg/icon-settings.svg';
import TextBlock from '../../../core/components/TextBlock';
import {useTranslation} from 'react-i18next';
import IconAptos from '../../../../assets/svg/icon-aptos.svg';
import ItemIconMcDonalds from '../../../../assets/svg/transaction-logo-3.svg';
import IconStarbucks from '../../../../assets/svg/icon-startbucks.svg';
import ItemIconJoeCoffe from '../../../../assets/svg/icon-joe.svg';
dayjs.extend(isYesterday);

const MainNotificationsScreen = ({navigation, route}: any) => {
  const {notificationsList} = useSelector((state: RootState) => state.info);
  const {t} = useTranslation();

  const getDateFormat = (date: number): string => {
    return dayjs(date).isYesterday()
      ? 'Yesterday'
      : dayjs(date).isSame(dayjs().valueOf())
      ? 'Today'
      : dayjs(date).format('MM/DD/YYYY');
  };
  return (
    <SafeAreaView style={mainStyles.container}>
      <View style={mainStyles.content}>
        {!route?.params?.hideTitle && (
          <View style={styles.panel}>
            <TextBlock variant={'title'} style={{marginBottom: 0}}>
              {t('tabs.notifications')}
            </TextBlock>
            <TouchableOpacity style={styles.filtersBtn}>
              <FilterIcon width={24} height={24} />
            </TouchableOpacity>
          </View>
        )}
        <ScrollView>
          {notificationsList.map((el, index) => (
            <Fragment key={el.id}>
              <View
                style={{
                  borderTopWidth: 1,
                  borderBottomWidth:
                    index >= 0
                      ? index === notificationsList.length - 1
                        ? 1
                        : 0
                      : 1,
                  borderColor: 'rgba(0,0,0,.15)',
                }}>
                <View
                  style={{
                    paddingVertical: 10,
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}>
                  <View
                    style={{
                      alignContent: 'flex-start',
                      marginBottom: 'auto',
                      marginTop: 8,
                      width: 8,
                      height: 8,
                      backgroundColor: !el.isRead ? '#0C6CDD' : 'transparent',
                      borderRadius: 8,
                    }}
                  />
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{
                        fontWeight: '500',
                        fontFamily: 'MazzardM-Medium',
                        fontSize: 16,
                        marginBottom: 8,
                      }}>
                      {el.title}
                    </Text>
                    <Text
                      style={{
                        fontWeight: '400',
                        fontFamily: 'MazzardM-Medium',
                        fontSize: 12,
                        opacity: 0.7,
                      }}>
                      {dayjs(el.date).format(`MMM DD, YYYY - HH:mm A`)}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderWidth: 1,
                      borderColor: 'rgba(0,0,0,.15)',
                      borderRadius: 50,
                      alignContent: 'flex-end',
                      marginLeft: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {!el.merchant && (
                      <IconAptos
                        width={26}
                        height={26}
                        fill={'black'}
                        color={'black'}
                      />
                    )}
                    {el.merchant && (
                      <>
                        {!el.icon && (
                          <ItemIconMcDonalds width={26} height={26} />
                        )}
                        {el.icon && el.id !== 11 && <IconStarbucks width={32} height={32}/>}
                        {el.icon && el.id === 11 && <ItemIconJoeCoffe width={32} height={32}/>}
                      </>
                    )}
                  </View>
                </View>
              </View>
            </Fragment>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MainNotificationsScreen;

const styles = StyleSheet.create({
  notifyItemHolder: {
    borderRadius: 6,
    backgroundColor: '#F8F8FA',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
  },
  messageContainer: {
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '85%',
  },
  text: {
    fontSize: 16,
    fontFamily: 'MazzardM-SemiBold',
    marginBottom: 4,
  },
  date: {
    opacity: 0.6,
    fontSize: 12,
  },
  statusHolder: {
    justifySelf: 'flex-end',
    marginLeft: 'auto',
    backgroundColor: '#334D8F',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  panel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: 30,
  },
  filtersBtn: {},
});
