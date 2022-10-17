import {Image, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {mainStyles} from '../../../../styles/main.styles';
import { useTranslation } from 'react-i18next';
const FlagEN = require('../../../../assets/svg/flag-en.png');
const FlagRu = require('../../../../assets/svg/flag-ru.png');

const langs = [{
  id: 1,
  title: 'English',
  key: 'en',
  icon: <Image source={FlagEN} style={{width: 20, height: 20,}} resizeMode={'contain'}/>,
}, {
  id: 2,
  title: 'Русский',
  key: 'ru',
  icon: <Image source={FlagRu} style={{width: 20, height: 20,}} resizeMode={'contain'}/>,
}]

const LanguagesScreen = () => {
  const {i18n} = useTranslation();
  const curLang = i18n.language;
  
  return (
    <SafeAreaView style={mainStyles.container}>
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
