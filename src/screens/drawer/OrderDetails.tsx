import React from 'react';
import {Image, Text, View} from 'react-native';
import {Header, Star} from '../../components';
import {BackWhiteArrowIcon} from '../../assets/icon';
import {Colors} from '../../utils';
import {TouchableOpacity} from 'react-native-gesture-handler';

const OrderDetails = ({navigation,route}: any) => {
  console.log("props: ",route.params)
  return (
    <View className='flex-1 bg-white'>
      <Header
        title="Order Details"
        iconLeft={
          <BackWhiteArrowIcon
            height={25}
            width={25}
            onPress={() => navigation.navigate('MyOrder')}
          />
        }
      />
      <View className='border-b-2 border-lightergray pb-5 my-2.5'>
        <View className='mx-5'>
          <Text className='my-2 text-lightgray text-base font-semibold'>
            Order ID #12345
          </Text>
          <View className='flex-row gap-2.5 items-center'>
            <Text className='text-base text-primary font-semibold'>
              MARK JOHNSON
            </Text>

            <View className='flex-row justify-center items-center bg-white border-lightblue border-2 rounded-full px-2.5'>
              <Text
                className='
                  text-center
                  text-blue
                  font-semibold
                  text-xs
                '>
                Home
              </Text>
            </View>
          </View>
          <View>
            <Text
              className='
                w-[360]
                text-[15px]
                font-medium
                text-darkgray'
              >
              401, Cosmo Complex, Mahila College Circle, Kalawad Rd, Rajkot,
              Gujarat 360001',
            </Text>
            <Text className='text-lightgray font-medium text-[15px]'>
              Mobile :{' '}
              <Text className='text-base font-semibold text-darkgray'>
                +91 12345 67890
              </Text>
            </Text>
            <Text className='text-lightgray font-medium text-[15px]'>
              Email :{' '}
              <Text className='text-base font-semibold text-darkgray'>
                mark1998@gmail.com
              </Text>
            </Text>
            <Text className='text-lightgray font-medium text-[15px]'>
              Order Status :{' '}
              <Text className='text-base font-semibold text-green'>
                Deliverd
              </Text>
            </Text>
            <Text className='text-lightgray font-medium text-[15px]'>Date : <Text className='text-base font-semibold text-darkgray'>
                30/01/2021
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <View
        className='
          border-b-2
          border-lightergray
          pb-5
          my-2.5'>
        <View className='mx-5'>
          <View className='
              flex-row
              items-start
              justify-between'>
            <View>
              <Text
                className='
                  text-black
                  text-[15px]
                  font-medium
                  mb-2'>
                Deeply Nourishing Body Wash....
              </Text>
              <Text className='text-lightgray font-medium text-base'>
                Brand :{' '}
      <Text className =  'text-base font-semibold text-darkgray'>
                  Mamaearth
                </Text>
              </Text>
              <Text className='text-lightgray font-medium text-base'>
                Size :{' '}
      <Text className='text-base font-semibold text-darkgray'>
                  500 ml
                </Text>
              </Text>
              <Text className='text-lightgray font-medium text-base'>
                Color :{' '}
      <Text className='text-base font-semibold text-darkgray'>
                  White
                </Text>
              </Text>
              <Text
                className='
                  text-primary
                  text-base
                  font-extrabold'>
                Rs. 4,139.00{' '}
                <Text className='text-lightgray font-medium text-sm line-through'>
                  
                  {' '}
                  Rs. 4,599.00
                </Text>
              </Text>
              {route.params?<View className='mt-2.5'>
                <Star value={route.params.value} size={16}/>
                <Text className='mt-1.5 text-normal font-semibold'>{route.params.review}</Text>
              </View>:
              <TouchableOpacity
              onPress={() =>navigation.navigate("Review")}
                className='
                  mt-2.5 
                  flex-row
                  justify-center
                  items-center
                  bg-white
                  border-lightblue
                  border-2
                  rounded-md
                  w-[100px]
                  py-1.5
                '>
                <Text
                  className='
                    text-center
                    text-blue
                    font-semibold
                    text-xs'
                  >
                  Write Review
                </Text>
              </TouchableOpacity> 
              }
            </View>

            <View className='gap-2.5'>
              <View
                className='border-lightergray rounded-md border-2'>
                <Image className='rounded-md'
                  style={{ resizeMode: 'center'}}
                  source={{
                    uri: 'https://images.mamaearth.in/catalog/product/d/n/dnbw-1_hfoavdvwmgs9qmxd_white_bg.jpg?fit=contain&height=600',
                    width: 80,
                    height: 80,
                  }}
                />
              </View>
              <View className ='border-lightergray border-2 rounded-md'>
                <Text className='text-center'>Qty: 1</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View>
      <View className='mx-5'>
      <Text className='font-medium mb-1 text-black text-lg'>Price Details</Text>
        <View className='flex-row items-center justify-between'>
          <View>
              <Text className='text-base font-medium'>Total price</Text>
              <Text  className='text-base font-medium'>Total Discount</Text>
              <Text  className='text-base font-medium'>Coupon Code Discount</Text>
              <Text  className='text-base font-medium text-black'>Grand Total</Text>
          </View>
          <View>
            <Text className='text-black text-base font-medium'>Rs.4,139</Text>
            <Text  className='text-black text-base font-medium self-end'>-Rs.460</Text>
            <Text  className='text-black text-base font-medium self-end'>-Rs.30</Text>
            <Text  className='text-primary text-base font-black'>Rs.3,649</Text>
          </View>
        </View>
      </View>
      </View>

      <View className='flex-row justify-center items-center px-3 rounded-tr-2xl rounded-tl-2xl
              border-lightergray border-2 h-14 absolute bottom-0 w-[100%]' style={{
       
      }}>
        <TouchableOpacity onPress={() => navigation.navigate("Account")
        }>
            <Text className='text-primary text-xl font-bold'>DOWNLOAD INVOICE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderDetails;
