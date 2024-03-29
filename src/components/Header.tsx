import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Platform, Alert } from 'react-native';
import { BackArrowIcon } from '../assets/icon';
import { Colors } from '../utils';

type HeaderProps = {
  backgrndTransparent?: boolean
  iconLeft?: React.ReactNode;
  onBackPress?: any;
  onPressRightIcon?: any;
  onPressRightIcon2?: any;
  title?: string;
  auth?: boolean;
  rightIcon1?: React.ReactNode;
  rightIcon2?: React.ReactNode;
  count?: number
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
        <View className='flex-row items-center' style={{ backgroundColor: props.backgrndTransparent ? 'transparent' : Colors.primary }}>
          <View style={{ height: 45, width: 90, }}>
            <TouchableOpacity disabled={!Boolean(props.iconLeft)} onPress={props.onBackPress}
              className='h-[45px] w-[45px] justify-center items-center'>
              {props.iconLeft}
            </TouchableOpacity>
          </View>
          <Text className='flex-1 text-center text-white text-base font-semibold'>{props.title}</Text>
          <View className='h-[45px] w-[90px] flex-row items-center'>
            <TouchableOpacity disabled={!Boolean(props.rightIcon2)} onPress={props.onPressRightIcon}
              className='h-[45px] w-[45px] justify-center items-center'>
              {props.rightIcon2}
            </TouchableOpacity>
            <TouchableOpacity disabled={!Boolean(props.rightIcon1)} onPress={props.onPressRightIcon2} className='h-[45px] w-[45px] justify-center items-center'>
              {props.rightIcon1}
              {Boolean(props.count) &&
                <View
                  className='h-[18px] w-[18px] absolute top-[5px] right-[5px] bg-white rounded-full border border-primary justify-center items-center overflow-hidden'>
                  <Text className='text-[10px] font-extrabold'>{props.count}</Text>
                </View>}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};