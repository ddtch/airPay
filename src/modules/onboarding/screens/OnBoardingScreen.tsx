import {useNavigation} from '@react-navigation/native';
import React, {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import Swiper from 'react-native-swiper';
import {mainStyles} from '../../../../styles/main.styles';
import {LightButton} from '../../../core/components/LightButton';
import {MainButton} from '../../../core/components/MainButton';
import TextBlock from '../../../core/components/TextBlock';
import { SCREEN_NAME } from '../../../core/constants/SCREEN_NAME';
import { NAV_TYPE } from '../../../core/models/ScreenTypes';

const OnboardingScreen = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation<NAV_TYPE>();
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const handleLogin = () => {
    actionSheetRef?.current?.show();
  };

  const handleConnectionProcess = () => {
    actionSheetRef?.current?.hide();
    navigate(SCREEN_NAME.OnboardingConnect);
  };

  return (
    // <SafeAreaView style={mainStyles.container}>
    <View style={styles.content}>
      <Swiper style={styles.wrapper} showsButtons={false} pagingEnabled>
        <View style={styles.slideHolder}>
          <View style={styles.topPart}>
            <Text>1</Text>
          </View>
          <View style={styles.botPart}>
            <Text style={styles.header}>
              Now payments are {'\n'}"Smarter" than you think
            </Text>
            <MainButton onPress={handleLogin} title={t('signup')} />
            <LightButton onPress={handleLogin} title={t('login')} />
          </View>
        </View>

        <View style={styles.slideHolder}>
          <View style={styles.topPart}>
            <Text>New slide</Text>
          </View>
          <View style={styles.botPart}>
            <Text style={styles.header}>You can add more of them</Text>
            <MainButton onPress={() => null} title={t('ok')} />
          </View>
        </View>
      </Swiper>

      <ActionSheet ref={actionSheetRef}>
        <View style={styles.sheetContent}>
          <TextBlock variant={'subtitle'}>Please connect with wallet</TextBlock>
          <MainButton
            onPress={handleConnectionProcess}
            title={'Martian Wallet'}
          />
        </View>
      </ActionSheet>
    </View>
    // </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  content: {
    ...mainStyles.content,
    padding: 0,
  },
  wrapper: {},
  slideHolder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topPart: {
    flex: 0.7,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#334D8F',
    borderBottomLeftRadius: 12,
    borderBottomEndRadius: 12,
  },
  botPart: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.3,
    width: '100%',
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 21,
    fontWeight: '600',
    color: '#474A56',
    textAlign: 'center',
    marginBottom: 30,
  },
  sheetContent: {
    minHeight: 120,
    padding: 20,
  },
});
