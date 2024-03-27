import React, { ReactNode } from 'react';
import {StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewProps} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../utils';
import Animated, { LightSpeedInLeft, LightSpeedOutLeft } from 'react-native-reanimated';
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
    // <Animated.View entering={LightSpeedInLeft.delay(200).duration(800)} exiting={LightSpeedOutLeft}>

    <TouchableOpacity className=' bg-primary rounded-full h-[46px]' style={style} onPress={onPress}>
    <LinearGradient 
    // start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
    colors={[Colors.primary ,'#f50b87', '#f7319a','#F977CE']} 
    className='flex-row justify-center items-center bg-primary text-white px-3 rounded-full h-[46px] gap-x-2.5 pl-0 ml-0'>
      
      {icon? 
        <View>
          {icon}
        </View> :null 
    }
      <Text className='text-center text-white font-bold text-xl'>{text}</Text>
      </LinearGradient>

    </TouchableOpacity>
// </Animated.View>
  );
};


