import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Header, Star} from '../../components';
import {BackWhiteArrowIcon} from '../../assets/icon';
import {Colors} from '../../utils';

const ReviewScreen = ({navigation}: any) => {
  const onBackPress = () => {
    navigation.navigate('ProductDetail');
  };
  return (
    <View className='flex-1 bg-white'>
      <Header
        iconLeft={
          <BackWhiteArrowIcon height={25} width={25} onPress={onBackPress} />
        }
        title="Review"
      />
      
        <View className='mx-5'>
          <View className='my-2.5 border-b-2 border-lightergray '>
          <View className='my-2.5  pt-0 flex-row gap-x-2.5'>
            <View
               className='bg-lightpink rounded-full border-lightpink border w-[50px] h-[50px] items-center justify-center'>
              <Text
                className='text-primary text-3xl font-semibold'>
                M
              </Text>
            </View>
            <View>
              <Text
                className='text-base font-bold text-[#575757] mb-1.5'>
                Mark Johnson
              </Text>
              <Star size={15} gap={2} value={3} />
            </View>
          </View>
          <Text
            className='text-base w-[300px] font-semibold text-[#a4a4a4] pb-2.5'>
            Good quality battery backup is good Supper product, My kid loves it.
          </Text>
          </View>
          <View className='my-2.5 border-b-2 border-lightergray '>
          <View className='my-2.5 mt-0 pt-0 flex-row gap-x-2.5'>
            <View
              className='rounded-full border-[transparent] border w-[50px] h-[50px] items-center justify-center'>
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoM8pM97yLHyPSgw08hWbRvhxaGZzDMGXXBssV0iNANNuBx-uiuroBJpx2yK5J3fyvdoE&usqp=CAU',
                }}
                height={50}
                width={50}
              />
            </View>
            <View>
              <Text
                className='text-base font-bold text-[#575757] mb-1.5'>
                Mark Johnson
              </Text>
              <Star size={15} gap={2} value={3} />
            </View>
          </View>
          <Text
            className='text-base w-[300px] font-semibold text-[#a4a4a4] pb-2.5'>
            Good quality battery backup is good Supper product, My kid loves it.
          </Text>
          </View>
          <View className='my-2.5 border-b-2 border-lightergray '>
          <View className='my-2.5 mt-0 pt-0 flex-row gap-x-2.5'>
            <View
               className='bg-lightpink rounded-full border-lightpink border w-[50px] h-[50px] items-center justify-center'>
              <Text
                className='text-primary text-3xl font-semibold'>
                M
              </Text>
            </View>
            <View>
              <Text
                className='text-base font-bold text-[#575757] mb-1.5'>
                Mark Johnson
              </Text>
              <Star size={15} gap={2} value={3} />
            </View>
          </View>
          <Text
            className='text-base w-[300px] font-semibold text-[#a4a4a4] pb-2.5'>
            Good quality battery backup is good Supper product, My kid loves it.
          </Text>
          </View>
          <View className='my-2.5'>
          <View className='my-2.5 mt-0 pt-0 flex-row gap-x-2.5'>
            <View
              className='rounded-full border-[transparent] border w-[50px] h-[50px] items-center justify-center'>
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoM8pM97yLHyPSgw08hWbRvhxaGZzDMGXXBssV0iNANNuBx-uiuroBJpx2yK5J3fyvdoE&usqp=CAU',
                }}
                height={50}
                width={50}
              />
            </View>
            <View>
              <Text
                className='text-base font-bold text-[#575757] mb-1.5'>
                Mark Johnson
              </Text>
              <Star size={15} gap={2} value={3} />
            </View>
          </View>
          <Text
            className='text-base w-[300px] font-semibold text-[#a4a4a4] pb-2.5'>
            Good quality battery backup is good Supper product, My kid loves it.
          </Text>
          </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ReviewScreen;
