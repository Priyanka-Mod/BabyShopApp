import React, { ReactNode } from 'react';
import {StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewProps} from 'react-native';
type Props = {
  text: string;
  onPress?:() => void;
  height?:  number;
  width?: number;
  style?: StyleProp<ViewProps>
  icon?: ReactNode
};

export const PrimaryButton = ({text,style,onPress,icon}: Props) => {

  return (
    <TouchableOpacity className='flex-row justify-center items-center bg-primary text-white px-3 rounded-full h-[46px] gap-x-2.5 pl-0 ml-0' style={style} onPress={onPress}>
      {icon? 
        <View>
          {icon}
        </View> :null 
    }
      <Text className='text-center text-white font-bold text-xl'>{text}</Text>
    </TouchableOpacity>
  );
};


