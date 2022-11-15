import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React, {Fragment, useState} from 'react';
import TextField from './TextField';
import {MainButton} from './MainButton';
const logosConnect = require('../../../assets/connect-logos.jpeg');

type LoginFormProps = {
  formSubmitted: (data: any) => void;
};

const LoginForm: React.FC<LoginFormProps> = ({formSubmitted}) => {
  // const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmitted = () => {
    formSubmitted({password});
  };

  return (
    <View style={styles.formHolder}>
      <View style={{marginBottom: 20}}>
        <View style={{display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center'}}>
          <Image source={logosConnect} resizeMode={'contain'} resizeMethod={'resize'} style={{width: '80%', height: 200}}/>
        </View>
        {/* <TextField label={'Username'} onChange={setUsername}/> */}
        <TextField placeholder={'Enter your Martian password'} type={'password'} onChange={setPassword}/>
      </View>

      <MainButton title="Connect wallet" onPress={handleFormSubmitted} />
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  formHolder: {
    flex: 1,
    // backgroundColor: 'blue',
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
  },
});
