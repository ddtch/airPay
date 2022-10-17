import React from 'react';
import {SCREEN_NAME, SCREEN_TYPE} from '../../core/constants/SCREEN_NAME';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import {SvgProps} from 'react-native-svg';
import Row from '../../core/components/layout/Row';
import {NAV_TYPE} from '../../core/models/ScreenTypes';

import AddIcon from '../../../assets/svg/icon-add-btn.svg';
import homeTabIcon from '../../../assets/svg/icon-home.svg';
import paymentsTabIcon from '../../../assets/svg/icon-payments.svg';
import notificationsTabIcon from '../../../assets/svg/icon-notifications.svg';
import profileTabIcon from '../../../assets/svg/icon-profile.svg';

import TouchableScaleView from '../../core/components/TouchableScaleView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ICON_SIZE = 25;

type TabInfoType = {
  key: number;
  screen: SCREEN_TYPE;
  icon: any;
  labelKey: string;
  rootScreen?: SCREEN_TYPE;
  initialParams?: Record<string, string>;
};

//use labelKey instead i18next.t(label) - to react to lang change with hook
const TAB_INFO: TabInfoType[] = [
  {
    key: 0,
    screen: SCREEN_NAME.MainTabRoutes,
    rootScreen: SCREEN_NAME.TabRoutes,
    icon: homeTabIcon,
    labelKey: 'tabs.main',
  },
  // {
  //   key: 1,
  //   screen: SCREEN_NAME.PaymentsTabRoutes,
  //   rootScreen: SCREEN_NAME.PaymentsScreen,
  //   icon: paymentsTabIcon,
  //   labelKey: 'tabs.payments',
  // },
  {
    key: 2,
    screen: SCREEN_NAME.NotificationsTabRoutes,
    rootScreen: SCREEN_NAME.NotificationsScreen,
    icon: notificationsTabIcon,
    labelKey: 'tabs.notifications',
  },
  {
    key: 3,
    screen: SCREEN_NAME.ProfileTabRoutes,
    rootScreen: SCREEN_NAME.ProfileScreen,
    icon: profileTabIcon,
    labelKey: 'tabs.profile',
  },
];

const BottomTabBarCustom = ({
  state,
  isDark,
}: BottomTabBarProps & {isDark: boolean}) => {
  const backgroundColor = isDark ? '#2e2e2e' : '#fff'; //TODO use theme context and scheme
  const {bottom: bottomInsert} = useSafeAreaInsets();
  const PADDING_OUT = 16;

  return (
    <Row
      justifyContent={'space-around'}
      style={{
        backgroundColor,
        paddingBottom: bottomInsert + PADDING_OUT,
        paddingTop: PADDING_OUT,
        flexWrap: 'nowrap',
        height: 88,
      }}>
      <TabItem info={TAB_INFO[0]} state={state} isDark={isDark} />
      {/* <TabItem
        info={TAB_INFO[1]}
        state={state}
        isDark={isDark}
        badge={undefined}
      /> */}
      {/* <PlusEventButton /> */}
      <TabItem info={TAB_INFO[1]} state={state} isDark={isDark} />
      <TabItem info={TAB_INFO[2]} state={state} isDark={isDark} />
    </Row>
  );
};

interface TabItemProps {
  state: BottomTabBarProps['state'];
  info: TabInfoType;
}

const TabItem = (props: TabItemProps & {isDark: boolean; badge?: number}) => {
  const {t} = useTranslation();
  const {onTabPress, isFocused} = useOnPressTabByIndex(props);
  const tintColor = isFocused ? (props.isDark ? '#fff' : '#484a55') : '#C8D1E1';
  const Icon: React.FC<SvgProps> = props.info.icon;
  const isBadge = !!props.badge; //show if 1 or more
  return (
    <TouchableScaleView
      style={{alignItems: 'center', flex: 1}}
      onPress={onTabPress}>
      <Icon fill={tintColor} width={ICON_SIZE} height={ICON_SIZE} />
      <Text style={[{color: tintColor}, styles.label]} numberOfLines={1}>
        {t(props.info.labelKey as any)}
      </Text>
      {isBadge && (
        <View style={styles.badgeBox}>
          <Text style={styles.badgeTitle}>{props.badge}</Text>
        </View>
      )}
    </TouchableScaleView>
  );
};

const useOnPressTabByIndex = ({info, state}: TabItemProps) => {
  const isFocused = state.index === info.key;
  const {navigate} = useNavigation<NAV_TYPE>();
  const onTabPress = () => {
    if (isFocused && info.rootScreen) {
      return navigate(info.rootScreen as any);
    }
    navigate(info.screen, info.initialParams as any);
  };
  return {onTabPress, isFocused};
};

const PlusEventButton = () => {
  const {navigate} = useNavigation();
  const {t} = useTranslation();

  const SIZE_CIRCLE = 64;

  return (
    <View style={{paddingHorizontal: '3%'}}>
      <TouchableScaleView onPress={() => null} style={{marginTop: -8}}>
        <AddIcon width={SIZE_CIRCLE} height={SIZE_CIRCLE} fill={'#FE7B43'} />
      </TouchableScaleView>
    </View>
  );
};

const styles = StyleSheet.create({
  actionSheetContainer: {
    minHeight: 200,
    padding: 22,
    paddingBottom: 30,
    paddingTop: 12,
    borderRadius: 16,
    backgroundColor: '#eeeeee',
  },
  actionSheetContainerHeadline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
  },
  actionSheetContainerHeadlineText: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 11,
    marginTop: 5,
  },
  badgeBox: {
    position: 'absolute',
    left: '56%',
    top: 0,
    backgroundColor: '#FE7B43',
    borderRadius: 10,
    padding: 2,
    minWidth: 16,
    alignItems: 'center',
  },
  badgeTitle: {
    fontSize: 10,
  },
});

export default BottomTabBarCustom;
