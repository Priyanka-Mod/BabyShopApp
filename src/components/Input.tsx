import React, { useState } from 'react';
import {
    Alert,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';

type InputProps = {
  icon?: React.ReactNode;
  onIconPress?:any;
  height?:number
  radius?:number
} & TextInputProps;
export const Input = (props: InputProps) => {

  const [focus,setFocus] =useState(false)
  return (
    <View className='flex-row bg-white mb-5 rounded-full border-2 items-center justify-between' style={{borderColor:focus? "#E97DAF" : '#F9F2EE',borderRadius:props.radius? props.radius : 100}}>
      <View style={{width:props.icon? '80%' : '100%'}}>
        <TextInput className='text-left text-black bg-white px-5'
          style={{height:props.height,borderRadius:props.radius? props.radius : 100,verticalAlign:props.height? 'top' : 'middle'}}
          placeholder={props.placeholder}
          placeholderTextColor={focus? 'black' : '#BDBDBD'}
          keyboardType={props.keyboardType || 'default'}
          onChange={props.onChange}
          onFocus={() => setFocus(true)}
          onBlur={()=>setFocus(false)}
          value={props.value}
          {...props} //any props of children will work with this seperator
        />
      </View>
      <View className='self-center pr-5'>
        <TouchableOpacity onPress= {props.onIconPress}>
          {props.icon}
        </TouchableOpacity>
      </View>
    </View>
  );
};

