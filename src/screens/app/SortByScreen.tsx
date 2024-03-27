// import CheckBox from '@react-native-community/checkbox';
import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../utils';
import {Header} from '../../components';
import {BackWhiteArrowIcon} from '../../assets/icon';
import { CheckBox } from '../../components/CheckBox';

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
    <View className='flex-1 bg-white dark:bg-zinc-900'>
      <Header
        title="Sort By"
        iconLeft={
          <BackWhiteArrowIcon width={25} height={25}/>
        }
        onBackPress={onBackPress}
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
                  check={item.checked}
                  onValueChange={() => 
                    onCheckPressed(index,item.checked)
                  }
                  label={item.name}
                  customLabelStyle={'text-black dark:text-zinc-400 text-xl font-normal'}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <View className='flex-row items-center px-3 rounded-t-3xl border-[#e2e2e2] dark:border-zinc-700 border-2 h-[50px] absolute bottom-0 w-full' >
        <TouchableOpacity className='w-2/4 border-[#e2e2e2] border-r-2 items-center'>
          <Text className='text-[17px] font-extrabold text-[#8E8E8E] dark:text-white'>CLEAR ALL</Text>
        </TouchableOpacity>
        <TouchableOpacity className='w-2/4 items-center'>
          <Text className='text-[17px] font-black text-primary dark:text-pink-500 text-center'>APPLY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default SortByScreen;
