import {SafeAreaView, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View} from 'react-native';
import React, {Fragment} from 'react';
import {mainStyles} from '../../../../styles/main.styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';
import StatusIcon from '../../../../assets/svg/icon-action1.svg';
import dayjs from 'dayjs';
import isYesterday from 'dayjs/plugin/isYesterday';
import FilterIcon from '../../../../assets/svg/icon-settings.svg';
import TextBlock from '../../../core/components/TextBlock';
import { useTranslation } from 'react-i18next';
dayjs.extend(isYesterday);

const MainNotificationsScreen = () => {
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
        <View style={styles.panel}>
          <TextBlock variant={'title'} style={{marginBottom: 0}}>{t('tabs.notifications')}</TextBlock>
          <TouchableOpacity style={styles.filtersBtn}>
            <FilterIcon width={24} height={24} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {notificationsList.map(el => (
            <Fragment key={el.id}>
              <View
                key={el.id}
                style={{
                  ...styles.notifyItemHolder,
                  borderTopRightRadius: !el.isRead ? 0 : 6,
                  borderBottomRightRadius: !el.isRead ? 0 : 6,
                }}>
                <View style={styles.messageContainer}>
                  <Text style={{...styles.text, fontWeight: !el.isRead ? '500' : '400',}}>{el.text}</Text>
                  <Text style={styles.date}>{getDateFormat(el.date)}</Text>
                </View>

                {!el.isRead && (
                  <View style={styles.statusHolder}>
                    <StatusIcon width={24} height={24} />
                  </View>
                )}
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
    fontWeight: '500',
    marginBottom: 2,
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
  filtersBtn: {}
});
