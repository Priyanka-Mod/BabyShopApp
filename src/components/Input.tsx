import React, { useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../services/useContextService';
import { darkTheme, lightTheme } from '../../constants';

type InputProps = {
  icon?: React.ReactNode;
  onIconPress?: any;
  height?: number
  radius?: number
} & TextInputProps;
export const Input = (props: InputProps) => {
  const { theme } = useAuth();
  const [currentTheme, setCurrentTheme] = useState(lightTheme);
  //console.log("theme : " , theme);
  useEffect(() => {
    if (theme === 'dark') {
      setCurrentTheme(darkTheme)
    } else {
      setCurrentTheme(lightTheme)
    }
  }, [theme])
  const [focus, setFocus] = useState(false)
  return (
    <View className='flex-row bg-white dark:bg-zinc-800 mb-5 border-2 dark:border-zinc-700 items-center justify-between' style={{ borderColor: focus ? "#E97DAF" : '#F9F2EE', borderRadius: props.radius ? props.radius : 100 }}>
      <View style={{ width: props.icon ? '80%' : '100%' }}>
        <TextInput className='text-left text-black dark:text-white bg-white dark:bg-zinc-800 px-5'
          style={{ paddingVertical: Platform.OS === 'ios' ? 16 : 14, height: props.height, borderRadius: props.radius ? props.radius : 100, verticalAlign: props.height ? 'top' : 'middle', paddingTop: Platform.OS === 'ios' ? 16 : 14 }}
          placeholder={props.placeholder}
          placeholderTextColor={focus ? 'black' : '#BDBDBD'}
          keyboardType={props.keyboardType || 'default'}
          onChange={props.onChange}
          multiline={Platform.OS === 'ios' && props.height ? true : false}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          value={props.value}
          {...props} //any props of children will work with this seperator
        />
      </View>
      <View className='self-center pr-5'>
        <TouchableOpacity onPress={props.onIconPress}>
          <View>{props.icon}</View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

