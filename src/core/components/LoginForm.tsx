import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {Fragment, useState} from 'react';
import TextField from './TextField';
import {MainButton} from './MainButton';

type LoginFormProps = {
  formSubmitted: (data: any) => void;
};

const LoginForm: React.FC<LoginFormProps> = ({formSubmitted}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmitted = () => {
    formSubmitted({username, password});
  };

  return (
    <View style={styles.formHolder}>
      <View style={{marginBottom: 20}}>
        <TextField label={'Username'} onChange={setUsername}/>
        <TextField label={'Password'} onChange={setPassword}/>
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
