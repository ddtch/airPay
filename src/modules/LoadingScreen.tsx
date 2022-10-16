import {ActivityIndicator, Animated, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import useAppTheme from '../core/hooks/context/UseAppTheme';
import SIZE from '../core/constants/SIZE';

export const LoadingScreen = ({title, progress}: {title?: string; progress?: number}) => {
  //must have using inside NavigateContainer to have theme context
  const theme = useAppTheme();
  const {t} = useTranslation();
  const isShowProgress = Number.isFinite(progress);
  const titleString = (title || t('loading')) + (isShowProgress ? ':' : '');
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.mainColors.white,
      }}>
      <Text style={{color: theme.colors.text, fontSize: 18, marginTop: '20%'}}>
        {titleString} {isShowProgress && <Text style={styles.progressText}>{progress}%</Text>}
      </Text>
      {!isShowProgress && <ActivityIndicator style={{marginTop: 15}} />}
      {isShowProgress && (
        <View style={{width: '70%', paddingTop: 20}}>
          <AnimateProgressLine progress={progress} />
        </View>
      )}
    </View>
  );
};

const LINE_HEIGHT = 15;

const AnimateProgressLine = ({progress}: {progress?: number}) => {
  const {animateStyle} = useAnimateStyleProgress(progress || 0);
  return (
    <View style={styles.lineBg}>
      <Animated.View style={[animateStyle, styles.lineBase]}>
        <Text>Loader...</Text>
      </Animated.View>
    </View>
  );
};

const useAnimateStyleProgress = (progress: number) => {
  const animate = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animate, {toValue: progress, useNativeDriver: false}).start();
  }, [progress]);

  const animateStyle = {
    width: animate.interpolate({inputRange: [0, 100], outputRange: ['0%', '100%']}),
  };

  return {animateStyle};
};

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: SIZE.getVW(50),
  },
  progressText: {fontWeight: 'bold'},
  lineBg: {
    height: LINE_HEIGHT,
    width: '100%',
    backgroundColor: '#e7e7e7',
    borderRadius: LINE_HEIGHT,
  },
  lineBase: {
    height: LINE_HEIGHT,
    borderRadius: LINE_HEIGHT,
    overflow: 'hidden',
  },
});

export default LoadingScreen;
