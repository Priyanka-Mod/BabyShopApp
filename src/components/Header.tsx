import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Platform, Alert} from 'react-native';
import {BackArrowIcon} from '../assets/icon';
import {Colors} from '../utils';

type HeaderProps = {
  backgrndTransparent?:boolean
  iconLeft?: React.ReactNode;
  onBackPress?: any;
  onPressRightIcon?: any;
  onPressRighterIcon?:any;
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
          <View className='justify-center self-start'>
            <TouchableOpacity onPress={props.onBackPress}>
              {props.iconLeft}
             
            </TouchableOpacity>
          </View>
          <View className='flex-1 mr-6'>
            <Text className='text-primary ml-0 self-center text-xl font-extrabold'>{props.title}</Text>
          </View>
        </View>
      ) : (
        <View className='flex-row items-center h-[45px]' style={{backgroundColor:props.backgrndTransparent? 'transparent':Colors.primary , }}>
          <View className='text-white px-2 justify-center self-start mt-2.5 ml-2.5'>
            <TouchableOpacity onPress={props.onBackPress}>
              {props.iconLeft}
            </TouchableOpacity>
          </View>
          <View className='flex-1 justify-center items-center'>
            <Text className='text-white self-center text-base font-semibold' style={{width:props.title === 'Question & Answer'? 140:'auto'}}>{props.title}</Text>
          </View>
          <View className=' justify-end flex-row mr-3 items-center gap-x-5'>
            <TouchableOpacity onPress={props.onPressRightIcon}>
              {props.rightIcon1}
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onPressRighterIcon}>
              {props.rightIcon2}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};