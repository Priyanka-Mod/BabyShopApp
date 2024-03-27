import React from 'react';
import { Image, Text, View } from 'react-native';
import { Header } from '../../components';
import { MenuIcon, PlusIcon } from '../../assets/icon';
import { DrawerActions } from '@react-navigation/native';
import { Colors } from '../../utils';

const WalletScreen = ({ navigation }: any) => {
  return (
    <View className='flex-1 bg-white dark:bg-zinc-900'>
      <Header
        title="Wallet"
        iconLeft={
          <MenuIcon
            width={25}
            height={25}
            fill={'white'}
          />
        }
        onBackPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}

      />
      <View className='items-center py-5 bg-lightpink dark:bg-zinc-700'>
        <Text className='text-[#443D42] dark:text-white text-base font-semibold'>
          Available Wallet Balance
        </Text>
        <Text className='pb-7 pt-3 text-5xl text-primary font-bold'>
          Rs.200
        </Text>
        <View className='border-primary border px-2.5 pl-0 pb-1 flex-row items-center gap-1.5 justify-center'
          style={{ borderStyle: 'dashed' }}>
          <PlusIcon height={20} width={20} />
          <Text className='text-primary font-extrabold'>
            ADD MONEY
          </Text>
        </View>
      </View>
      <View className='mx-5'>
        <View className='border-b border-lightergray pb-5'>
          <View>
            <View className='mt-3 mb-3' >
              <Text className='text-lightgray text-base font-bold pb-3'>
                Order ID#12345
              </Text>
            </View>
            <View className='flex-row justify-between items-start'>
              <View className='border-lightergray rounded-xl border-2'>
                <Image className='rounded-xl'
                  source={{
                    uri: 'https://images.mamaearth.in/catalog/product/d/n/dnbw-1_hfoavdvwmgs9qmxd_white_bg.jpg?fit=contain&height=600',
                    height: 80,
                    width: 80,
                  }}
                />
              </View>
              <View className='gap-[3px] w-[180px]'>
                <Text className='text-base font-medium text-black dark:text-white'>
                  Deeply Nourshing Body Wash
                </Text>
                <View className='items-center w-[120px] p-1.5 rounded-md border-2 border-lightblue'>
                  <Text className='text-blue font-bold text-sm'>
                    +5 More Items
                  </Text>
                </View>
                <Text className='text-base font-extrabold text-primary'>
                  Rs. 4,139.00
                </Text>
              </View>
              <Text className='text-[#F82C24] font-black text-base self-center'>
                - Rs. 40
              </Text>
            </View>

          </View>
          <Text className='text-xs font-medium text-lightgray'>
            10:30 AM on 19/01/2021
          </Text>
        </View>
        <View className='mt-2.5 flex-row items-center justify-between'>
          <View className='mt-2'>
            <Text className='text-black dark:text-white font-extrabold mb-1.5'>
              Payment Added
            </Text>
            <Text className='text-lightgray font-extrabold pb-1'>
              Debit Card (xxxx xxxx xxxx xx12)
            </Text>
            <Text className='text-xs font-medium text-lightgray'>
              10:30 AM on 19/01/2021
            </Text>
          </View>
          <Text className='text-green font-black text-base'>+Rs. 50</Text>
        </View>
      </View>
    </View>
  );
};

export default WalletScreen;
