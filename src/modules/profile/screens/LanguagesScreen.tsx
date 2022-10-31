import {Image, Platform, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {mainStyles} from '../../../../styles/main.styles';
import { useTranslation } from 'react-i18next';
import FlagEN from'../../../../assets/svg/flag-en.svg';
import FlagES from'../../../../assets/svg/flag-es.svg';

const langs = [{
  id: 1,
  title: 'English',
  key: 'en',
  icon: <FlagEN width={20} height={20} />,
}, {
  id: 2,
  title: 'Espaniol',
  key: 'es',
  icon: <FlagES width={20} height={20} />,
}]

const LanguagesScreen = () => {
  const {i18n} = useTranslation();
  const curLang = i18n.language;
  
  return (
    <SafeAreaView style={mainStyles.container}>
      {Platform.OS === 'android' && <View style={{height: 50}}/>}
      <View style={mainStyles.content}>
        {langs.map(el => <TouchableOpacity style={styles.langItem} key={el.id} onPress={() => i18n.changeLanguage(el.key)}>
          {el.icon}
          <Text style={{marginLeft: 10, fontWeight: '500', textDecorationLine: curLang === el.key ? 'underline' : 'none'}}>{el.title}</Text>
        </TouchableOpacity>)}
      </View>
    </SafeAreaView>
  );
};

export default LanguagesScreen;

const styles = StyleSheet.create({
  langItem: {
    backgroundColor: '#F8F8FA',
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 6,
  }
});
