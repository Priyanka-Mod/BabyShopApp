import React from 'react';
import {Image, Text, View} from 'react-native';
import {Header} from '../../components';
import {Colors} from '../../utils';
import {DeleteIcon, MenuIcon} from '../../assets/icon';
import {DrawerActions} from '@react-navigation/native';

const WishlistScreen = ({navigation}: any) => {
  return (
    <View className="flex-1 bg-white dark:bg-zinc-900">
      <Header
        title="Wishlist"
        iconLeft={
          <MenuIcon
            width={25}
            height={25}
            fill={'white'}
          />
        }
        onBackPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}

      />
      <View className='my-5 border-b border-lightergray pb-1.5'
      >
        <View className='px-5 flex-row pb-2.5 justify-between'
         >
          <View>
            <View className='border border-lightergray rounded-xl'
              >
              <Image className='rounded-xl'
                source={{
                  uri: 'https://images.mamaearth.in/catalog/product/d/n/dnbw-1_hfoavdvwmgs9qmxd_white_bg.jpg?fit=contain&height=600',
                  width: 80,
                  height: 80,
                }}
              />
            </View>
          </View>
            <View className='w-[65%]'>
              <Text className='text-black dark:text-white text-[15px] font-medium mb-1'
                >
                Deeply Nourishing Body Wash....
              </Text>
              <Text className='text-[#b0b0b0] text-[15px]'>
                Brand :{' '}
                <Text className='text-[15px] font-medium text-[#4b4b4b] dark:text-white'>
                  Mamaearth
                </Text>
              </Text>
              <Text className='text-[#b0b0b0] text-[15px]'>
                Size :{' '}
                <Text className='text-[15px] font-medium text-[#4b4b4b] dark:text-white'>
                  500 ml
                </Text>
              </Text>
              <Text className='text-[#b0b0b0] text-[15px]'>
                Color :{' '}
                <Text className='text-[15px] font-medium text-[#4b4b4b] dark:text-white'>
                  White
                </Text>
              </Text>
              <Text className='text-primary dark:text-pink-500 text-sm font-extrabold'
                >
                Rs. 4,139.00{' '}
                <Text className='text-[#a9a9a9] text-xs line-through'
                  >
                  {' '}
                  Rs. 4,599.00
                </Text>
              </Text>
            </View>
          <DeleteIcon height={20} width={20} fill={'#bfbfbf'} />
        </View>
      </View>
      <View className='pb-1.5'>
      <View className='px-5 flex-row pb-2.5 justify-between'
         >
          <View>
            <View className='border border-lightergray rounded-xl'
              >
              <Image className='rounded-xl'
                source={{
                  uri: 'https://images.mamaearth.in/catalog/product/d/n/dnbw-1_hfoavdvwmgs9qmxd_white_bg.jpg?fit=contain&height=600',
                  width: 80,
                  height: 80,
                }}
              />
            </View>
          </View>
            <View className='w-[65%]'>
              <Text className='text-black dark:text-white text-[15px] font-medium mb-1'
                >
                Deeply Nourishing Body Wash....
              </Text>
              <Text className='text-[#b0b0b0] text-[15px]'>
                Brand :{' '}
                <Text className='text-[15px] font-medium text-[#4b4b4b] dark:text-white'>
                  Mamaearth
                </Text>
              </Text>
              <Text className='text-[#b0b0b0] text-[15px]'>
                Size :{' '}
                <Text className='text-[15px] font-medium text-[#4b4b4b] dark:text-white'>
                  500 ml
                </Text>
              </Text>
              <Text className='text-[#b0b0b0] text-[15px]'>
                Color :{' '}
                <Text className='text-[15px] font-medium text-[#4b4b4b] dark:text-white'>
                  White
                </Text>
              </Text>
              <Text className='text-primary dark:text-pink-500 text-sm font-extrabold'
                >
                Rs. 4,139.00{' '}
                <Text className='text-[#a9a9a9] text-xs line-through'
                  >
                  {' '}
                  Rs. 4,599.00
                </Text>
              </Text>
            </View>
          <DeleteIcon height={20} width={20} fill={'#bfbfbf'} />
        </View>
      </View>
    </View>
  );
};

export default WishlistScreen;
