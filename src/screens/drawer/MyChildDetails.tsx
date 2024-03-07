import React from 'react';
import {Header} from '../../components';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {
  BackWhiteArrowIcon,
  DeleteIcon,
  EditIcon,
  PlusIcon,
} from '../../assets/icon';

const MyChildDetails = ({navigation}: any) => {
  const childData = [
    {
      name: 'Lily Johnson',
      gender: 'Female',
      dob: '18/02/2017',
      image:
        'https://i.pinimg.com/736x/88/90/fa/8890fa8dcacfa85571e8269727a4262b.jpg',
    },
    {
      name: 'Joy Johnson',
      gender: 'Male',
      dob: '25/082015',
      image:
        'https://img.freepik.com/premium-vector/cute-baby-boy-cartoon-vector-illustration_921448-1210.jpg',
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <Header
        title="My Child Details"
        iconLeft={
          <BackWhiteArrowIcon
            height={25}
            width={25}
            onPress={() => navigation.navigate('Account')}
          />
        }
      />
      <TouchableOpacity className="bg-lightpink flex-row gap-2.5 py-2.5 pt-0 mt-0 items-center justify-center">
        <PlusIcon height={25} width={25} />
        <Text className="text-base font-bold text-primary">ADD CHILD</Text>
      </TouchableOpacity>
      <FlatList
        data={childData}
        renderItem={({item, index}) => {
          return (
            <View
              className="flex-row items-start justify-between mx-5 border-lightgray"
              style={{
                borderBottomWidth: childData.length - 1 === index ? 0 : 1,
              }}>
              <View className="flex-row gap-2.5 py-5 items-center">
                <Image
                  className="rounded-full border-primary border-2"
                  source={{
                    uri: item.image,
                    height: 80,
                    width: 80,
                  }}
                />

                <View>
                  <Text className="text-lightgray font-medium text-[15px]">
                    Name :{' '}
                    <Text className='text-[15px] font-semibold text-darkgray'
                      >
                      {item.name}
                    </Text>
                  </Text>
                  <Text className="text-lightgray font-medium text-[15px]">
                    Gender :{' '}
                    <Text className='text-[15px] font-semibold text-darkgray'
                      >
                      {item.gender}
                    </Text>
                  </Text>
                  <Text className="text-lightgray font-medium text-[15px]">
                    DOB :{' '}
                    <Text className='text-[15px] font-semibold text-darkgray'
                      >
                      {item.dob}
                    </Text>
                  </Text>
                </View>
              </View>
              <View className="flex-row gap-5 pt-5 items-start">
                <EditIcon height={20} width={20} fill={'#bfbfbf'} />
                <DeleteIcon height={20} width={20} fill={'#bfbfbf'} />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default MyChildDetails;
