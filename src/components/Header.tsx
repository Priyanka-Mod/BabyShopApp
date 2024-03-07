import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {BackArrowIcon} from '../assets/icon';
import {Colors} from '../utils';

type HeaderProps = {
  backgrndTransparent?:boolean
  iconLeft?: React.ReactNode;
  onBackPress?: any;
  onPressIcon?: any;
  title?: string;
  auth?: boolean;
  rightIcon1?: React.ReactNode;
  rightIcon2?: React.ReactNode;
};

export const Header = (props: HeaderProps) => {
  return (
    <>
      {props.auth ? (
        <View className='flex-row mt-5 items-center'>
          <View className='absolute left-0'>
            <TouchableOpacity onPress={props.onBackPress}>
              {props.iconLeft}
            </TouchableOpacity>
          </View>
          <View className='flex-1'>
            <Text className='text-primary self-center text-xl font-extrabold'>{props.title}</Text>
          </View>
        </View>
      ) : (
        <View className='flex-row items-center h-[45px]' style={{backgroundColor:props.backgrndTransparent? 'transparent':Colors.primary}}>
          <View className='text-white flex-1 self-start mt-2.5 ml-2.5'>
            <TouchableOpacity onPress={props.onBackPress}>
              {props.iconLeft}
            </TouchableOpacity>
          </View>
          <View className='flex-1 justify-center'>
            <Text className='text-white self-center text-base font-semibold' style={{width:props.title === 'Question & Answer'? 140:'auto'}}>{props.title}</Text>
          </View>
          <View className='flex-1 justify-end flex-row mr-3 items-center gap-x-5'>
            <TouchableOpacity onPress={props.onPressIcon}>
              {props.rightIcon1}
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onPressIcon}>
              {props.rightIcon2}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};