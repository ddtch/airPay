import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {onChange} from 'react-native-reanimated';

type TextFieldProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  type?: 'password' | 'text' | 'number';
  onChange?: (value: string) => void;
};

const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  value,
  type,
  onChange,
}) => {
  return (
    <View style={styles.inputHolder}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <View style={styles.textInputWrapper}>
        <TextInput
          secureTextEntry={type && type === 'password'}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={'rgba(0,0,0,.7)'}
          value={value}
          onChangeText={(val: string) => onChange && onChange(val)}
        />
      </View>
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  inputHolder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    // backgroundColor: 'red'
    marginBottom: 20,
  },
  inputLabel: {
    marginBottom: 4,
    opacity: 0.8,
  },
  textInputWrapper: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.6)',
    width: '100%',
  },
  input: {
    lineHeight: 16,
    fontSize: 16,
    textAlign: 'center',
  },
});
