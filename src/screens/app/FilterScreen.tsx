import React, {useCallback, useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header} from '../../components';
import {BackWhiteArrowIcon} from '../../assets/icon';
import {Colors} from '../../utils';
import { CheckBox } from '../../components/CheckBox';
// import CheckBox from '@react-native-community/checkbox';

const FilterScreen = ({navigation}: any) => {
  const [currentId,setCurrentId] = useState<null | string>('1')
  const filterData=[
    {
      id:'1',
      name: 'Sub Category',
    },
    {
      name: 'Brands',
      id:'2'
    },
    {
      name: 'Age',
      id:'3'
    },
    {
      name: 'Size',
      id:'4'
    },
    {
      name: 'Color',
      id:'5'
    },
    {
      name: 'Gender',
      id:'6'
    },
    {
      name: 'Certification',
      id:'7'
    },
  ];
  const [checkBoxData, setCheckBoxData] = useState([
    {
      id: '1',
      value: 'Lotions , Oils & Powders',
      checked: false,
    },
    {
      id: '2',
      value: 'Soap , Shampoos & Body Wash',
      checked: false,
    },
    {
      id: '3',
      value: 'Baby Creams',
      checked: false,
    },
    {
      id: '4',
      value: 'Bathing Accessories',
      checked: false,
    },
  ]);
  const onCheckPressed = useCallback(
    (index: number, value?: boolean) => {
      const newData = [...checkBoxData];
      newData[index].checked = value ? !value : !newData[index].checked;
      setCheckBoxData(newData);
    },
    [checkBoxData],
  );

  const onBackPress = () => {
    navigation.navigate('BathCare');
  };
  return (
    <View className='flex-1'>
      <Header
        title="Filter"
        iconLeft={
          <BackWhiteArrowIcon height={25} width={25}/>
        }
        onBackPress={onBackPress}

      />
      <View className='flex-row'>
        <View className='w-2/5 bg-white dark:bg-zinc-900' style={styles.filterContainer}>
          <View className='h-full'>
            <FlatList
              data={filterData}
              renderItem={({item}) => {
                return (
                  <View>
                    <TouchableOpacity className={item.id === currentId ? "bg-[#FEF1F8] dark:bg-zinc-700" : "bg-white dark:bg-zinc-900"}
                      onPress={() => setCurrentId(item.id)}>
                      <Text className={`text-left pl-4 text-xl py-2.5 ${item.id === currentId? 'text-primary' : 'text-[#9C9C9C]'} `}
                      >{item.name}</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </View>
        <View className='bg-white dark:bg-zinc-900 w-[60%]'>
          <FlatList
            data={checkBoxData}
            renderItem={({item, index}) => {
              return (
                <View className='mt-1.5 ml-2.5'>
                  <TouchableOpacity
                    onPress={() => onCheckPressed(index)}
                    className='flex-row items-center pb-2.5 border-lightgray'>
                    <CheckBox
                      check={item.checked}
                      onValueChange={() => {
                        onCheckPressed(index, item.checked);
                      }}
                      customLabelStyle={item.checked === true ? 'text-black dark:text-white' : 'text-zinc-500 dark:text-zinc-400'}
                      label={item.value}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </View>
      <View className='flex-row items-center px-3 border-r-5 border-l-5
     border-zinc-300 dark:border-zinc-700 border h-[50px] absolute bottom-0 z-10 w-full bg-[#f9f9f9] dark:bg-zinc-600'>
        <TouchableOpacity className='w-2/4 border-lightgray border-r-2 items-center'>
          <Text className='text-[17px] font-bold text-[#8E8E8E] dark:text-white'>CLEAR ALL</Text>
        </TouchableOpacity>
        <TouchableOpacity className='items-center w-2/4'>
          <Text className='text-[17px] font-black text-primary dark:text-pink-500 text-center'>APPLY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer:{
    zIndex: 2,
    shadowColor: 'black',
    elevation: 10,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 5},
  },
});
export default FilterScreen;
