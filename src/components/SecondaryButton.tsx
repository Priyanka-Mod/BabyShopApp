import React from 'react';
import {StyleProp, StyleSheet, Text, TouchableOpacity, ViewProps} from 'react-native';
type Props = {
  text: string;
  onPress?:() => void;
  height?:  number;
  width?: number;
  paddingHorizontal?:number
  style?: StyleProp<ViewProps>
};

export const SecondaryButton = ({text,style,onPress ,paddingHorizontal}: Props) => {

  return (
    <TouchableOpacity className='flex-row justify-center items-center bg-white border-lightblue border-2 rounded-full' style={ {paddingHorizontal:paddingHorizontal}} onPress={onPress}>
      <Text className='text-center text-blue font-bold text-base'>{text}</Text>
    </TouchableOpacity>
  );
};

