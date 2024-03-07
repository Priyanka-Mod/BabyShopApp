import React from 'react';
import {Image, Text, View} from 'react-native';
import {Header} from '../../components';
import {Colors} from '../../utils';
import {DeleteIcon, MenuIcon} from '../../assets/icon';
import {DrawerActions} from '@react-navigation/native';

const WishlistScreen = ({navigation}: any) => {
  return (
    <View className="flex-1 bg-white">
      <Header
        title="Wishlist"
        iconLeft={
          <MenuIcon
            width={25}
            height={25}
            fill={'white'}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        }
      />
      <View className='my-5 border-b border-lightergray pb-1.5'
      >
        <View className='px-5 flex-row gap-6 pb-2.5'
         >
          <View className='gap-r-2.5'>
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
          <View className='flex-row items-start justify-between'>
            <View>
              <Text className='text-black text-[15px] font-medium mb-1'
                >
                Deeply Nourishing Body Wash....
              </Text>
              <Text className='text-[#b0b0b0] text-[15px]'>
                Brand :{' '}
                <Text className='text-[15px] font-medium text-[#4b4b4b]'>
                  Mamaearth
                </Text>
              </Text>
              <Text className='text-[#b0b0b0] text-[15px]'>
                Size :{' '}
                <Text className='text-[15px] font-medium text-[#4b4b4b]'>
                  500 ml
                </Text>
              </Text>
              <Text className='text-[#b0b0b0] text-[15px]'>
                Color :{' '}
                <Text className='text-[15px] font-medium text-[#4b4b4b]'>
                  White
                </Text>
              </Text>
              <Text className='text-primary text-sm font-extrabold'
                >
                Rs. 4,139.00{' '}
                <Text className='text-[#a9a9a9] text-xs line-through'
                  >
                  {' '}
                  Rs. 4,599.00
                </Text>
              </Text>
            </View>
          </View>
          <DeleteIcon height={20} width={20} fill={'#bfbfbf'} />
        </View>
      </View>
      <View className='pb-1.5'>
        <View className='px-5 flex-row gap-6 pb-2.5'>
          <View className='gap-r-2.5'>
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
          <View className='flex-row items-start justify-between'>
            <View>
              <Text className='text-black text-[15px] font-medium mb-1'
                >
                Deeply Nourishing Body Wash....
              </Text>
              <Text className='text-[#b0b0b0] text-[15px]'>
                Brand :{' '}
                <Text className='text-[15px] font-medium text-[#4b4b4b]'>
                  Mamaearth
                </Text>
              </Text>
              <Text className='text-[#b0b0b0] text-[15px]'>
                Size :{' '}
                <Text className='text-[15px] font-medium text-[#4b4b4b]'>
                  500 ml
                </Text>
              </Text>
              <Text className='text-[#b0b0b0] text-[15px]'>
                Color :{' '}
                <Text className='text-[15px] font-medium text-[#4b4b4b]'>
                  White
                </Text>
              </Text>
              <Text className='text-primary text-sm font-extrabold'
                >
                Rs. 4,139.00{' '}
                <Text className='text-[#a9a9a9] text-xs line-through'
                  >
                  {' '}
                  Rs. 4,599.00
                </Text>
              </Text>
            </View>
          </View>
          <DeleteIcon height={20} width={20} fill={'#bfbfbf'} />
        </View>
      </View>
    </View>
  );
};

export default WishlistScreen;
