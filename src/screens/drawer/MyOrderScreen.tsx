import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import {Header, Input} from '../../components';
import {BackWhiteArrowIcon, CalendarIcon} from '../../assets/icon';
import {Dropdown} from 'react-native-element-dropdown';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from '../../utils';
import moment from 'moment';

const MyOrderScreen = ({navigation}:any) => {
  const [selectDate, setSelectDate] = useState(false);
  const [orderData,setOrderData] = useState([
    {
      id: '12345',
      orderDate: '2021-01-19',
      productName: 'Deeply Nourshing Body Wash',
      price: 'Rs. 4,139.00',
      productImage:
        'https://images.mamaearth.in/catalog/product/d/n/dnbw-1_hfoavdvwmgs9qmxd_white_bg.jpg?fit=contain&height=600',
    },
    {
      id: '12346',
      orderDate: '2021-01-19',
      productName: 'Deeply Nourshing Body Wash',
      price: 'Rs. 4,139.00',
      productImage:
        'https://images.mamaearth.in/catalog/product/d/n/dnbw-1_hfoavdvwmgs9qmxd_white_bg.jpg?fit=contain&height=600',
    },
    {
      id: '12347',
      orderDate: '2021-02-19',
      productName: 'Shampoo',
      price: 'Rs. 4,139.00',
      productImage:
        'https://images.mamaearth.in/catalog/product/d/n/dnbw-1_hfoavdvwmgs9qmxd_white_bg.jpg?fit=contain&height=600',
    },
    {
      id: '12348',
      orderDate: '2021-01-19',
      productName: 'Deeply Nourshing Body Wash',
      price: 'Rs. 4,139.00',
      productImage:
        'https://images.mamaearth.in/catalog/product/d/n/dnbw-1_hfoavdvwmgs9qmxd_white_bg.jpg?fit=contain&height=600',
    },
  ]);
  const [filteredData, setFilteredData] = useState(orderData);
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View className='flex-1 bg-white dark:bg-zinc-900'>
      <Header
        title="My Order"
        iconLeft={<BackWhiteArrowIcon height={25} width={25}/>}
        onBackPress={() => navigation.navigate('Account')}

      />
      <View className='mt-5 mx-5'>
        <Input
          editable={false}
          placeholder="Date"
          icon={<CalendarIcon height={20} width={20} fill={'#A0A0A0'} />}
          onIconPress={() => setSelectDate(true)}
          value={new Date(selectedDate).toDateString()}
        />
        {selectDate && (
          <RNDateTimePicker
            mode="date"
            value={new Date(selectedDate)}
            onChange={date => {
              let birthDate = new Date(date.nativeEvent.timestamp);
              setSelectedDate(birthDate);
              console.log("Filter data by new date");
            console.log("selected date: ",selectedDate);
            

            const filteredData = orderData.filter((data) => {
              console.log("data: ", data);
              
                const orderDate =moment(data.orderDate).toDate();
                console.log("oderdate: ",orderDate.getFullYear(),", selectedDate: " , selectedDate.getFullYear());
                
                return (
                  orderDate.getMonth() === selectedDate.getMonth() &&
                  orderDate.getFullYear() === selectedDate.getFullYear()
                );
              });
              console.log("filterdata: ",filteredData);
              setFilteredData(filteredData)
              setSelectDate(false);
            }}
          />
        )}
      </View>
      <View>
        {filteredData.length ? <FlatList
          contentContainerStyle={{paddingBottom:150}}
          scrollEnabled
          data={filteredData}
          renderItem={({item}) => {
            return (
              <View>
                <View className='bg-lightpink dark:bg-zinc-700 py-5'>
                  <Text className='text-primary dark:text-white pl-5'>
                    {item.orderDate}
                  </Text>
                </View>
                <TouchableOpacity onPress={() =>navigation.navigate('OrderDetails')}>
                <View className='my-2.5 mx-5'>
                  <Text className='text-darkgray dark:text-zinc-400 text-base font-bold'>
                    Order ID#{item.id}
                  </Text>
                  <View className='my-2.5 pt-2.5 flex-row items-start gap-5'>
                    <View className='border-lightergray border-2 rounded-xl'>
                      <Image className='rounded-xl'
                        source={{
                          uri: item.productImage,
                          height: 80,
                          width: 80,
                        }}
                      />
                    </View>
                    <View>
                      <Text className='text-base font-medium text-black dark:text-white'>
                        {item.productName}
                      </Text>
                      <Text
                       className='
                          text-base
                          font-extrabold
                          text-primary
                        '>
                        {item.price}
                      </Text>
                    </View>
                  </View>
                </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />:
        <View>
          <Text className='text-[#ff0000] self-center'>No orders found on this month of given year</Text>

          </View>
        }
      </View>
    </View>
  );
};

export default MyOrderScreen;