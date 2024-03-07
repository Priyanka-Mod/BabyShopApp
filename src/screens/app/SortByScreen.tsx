import CheckBox from '@react-native-community/checkbox';
import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../utils';
import {Header} from '../../components';
import {BackWhiteArrowIcon} from '../../assets/icon';

const SortByScreen = ({navigation}: any) => {
  const [sortData,setSortData] = useState([
    {name: 'Oldest',checked:false},
    {name: 'Name By (A - Z)',checked:false},
    {name: ' Name By (Z - A)',checked:false},
    {name: 'Price (Lowest)',checked:false},
    {name: 'Price (Higest)',checked:false},
    {name: 'Best Seller',checked:false},
    {name: 'Brand (A - Z)',checked:false},
    {name: 'Brand (Z - A)',checked:false},
    {name: 'Newest',checked:false},
    {name: 'Popular',checked:false},
  ]);
  const onBackPress = () => {
    navigation.navigate('BathCare');
  };
  const onCheckPressed = useCallback((index:number,value?:boolean)=>{
    const newData = [...sortData]
    newData[index].checked =value?!value: !newData[index].checked
    setSortData(newData)
},[sortData])
  return (
    <View className='flex-1'>
      <Header
        title="Sort By"
        iconLeft={
          <BackWhiteArrowIcon width={25} height={25} onPress={onBackPress} />
        }
      />
      <FlatList
        data={sortData}
        renderItem={({item,index}) => {
          return (
            <View className='my-1.5 mx-3'>
              <TouchableOpacity
                onPress={() =>
                     onCheckPressed(index)
                  }
                
                className='flex-row items-center pb-1.5 border-[#e2e2e2]'
                style={
                  {
                    marginTop: item.name === 'Oldest' ? 5 : 0,
                    borderBottomWidth: item.name === 'Popular' ? 0 : 2,
                  }
                }>
                <CheckBox
                  disabled={false}
                  value={item.checked}
                  tintColors={{
                    true: Colors.primary,
                    false: '#e2e2e2',
                  }}
                  onValueChange={() => 
                    onCheckPressed(index,item.checked)
                  }
                />
                <Text className='text-black text-xl font-normal'>{item.name}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <View className='flex-row items-center px-3 rounded-t-3xl border-[#e2e2e2] border-2 h-[50px] absolute bottom-0 w-full' >
        <TouchableOpacity className='w-2/4 border-[#e2e2e2] border-r-2 items-center'>
          <Text className='text-[17px] font-extrabold'>CLEAR ALL</Text>
        </TouchableOpacity>
        <TouchableOpacity className='w-2/4 items-center'>
          <Text className='text-[17px] font-black text-primary text-center'>APPLY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default SortByScreen;
