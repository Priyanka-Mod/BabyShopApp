import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewProps,
} from 'react-native';
type Props = {
  text: string;
  textBold?: string;
  onPress?: () => void;
  height?: number;
  width?: number;
  style?: StyleProp<ViewProps>;
};

export const BottomButton = ({text, textBold, style, onPress}: Props) => {
  return (
    <TouchableOpacity className='flex-row justify-center items-center bg-[#018bd3] text-white px-3 rounded-t-3xl h-[46px] w-full absolute bottom-0' style={ style} onPress={onPress}>
      <Text className='text-center text-white text-lg'>{text}</Text>
      <Text className='text-center text-white font-bold text-xl'>{textBold}</Text>
    </TouchableOpacity>
  );
};


