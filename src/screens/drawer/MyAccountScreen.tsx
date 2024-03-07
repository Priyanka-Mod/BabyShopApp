import React from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {Header, PrimaryButton} from '../../components';
import {
  BoxIcon,
  ChildIcon,
  ForwardButtonIcon,
  LocationIcon,
  LogOutIcon,
  MenuIcon,
  PersonIcon,
} from '../../assets/icon';
import {CommonActions, DrawerActions} from '@react-navigation/native';
import {Colors} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {auth} from '../../services/firebaseConfig';

const MyAccountScreen = ({navigation}: any) => {
  
  const logOut = async () => {
    await auth
      .signOut()
      .then(async data => {
        await AsyncStorage.removeItem('token');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'AuthStack'}],
          }),
        );
      })
      .catch(err => console.log(err));
  };
  return (
    <View className="flex-1 bg-white">
      <Header
        title="My Account"
        iconLeft={
          <MenuIcon
            fill={'white'}
            height={25}
            width={25}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        }
      />
      <View className="bg-lightpink flex-row items-center gap-5 mt-0 p-5 pt-0">
        <Image
          className="rounded-full"
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoM8pM97yLHyPSgw08hWbRvhxaGZzDMGXXBssV0iNANNuBx-uiuroBJpx2yK5J3fyvdoE&usqp=CAU',
          }}
          height={80}
          width={80}
        />
        <View>
          <Text className="text-primary text-lg font-bold">Mark Johnson</Text>
          <Text className="text-lightgray text-base font-medium">
            Mobile :{' '}
            <Text className="text-base font-semibold text-[#4B4B4B]">
              +91 12345 67890
            </Text>
          </Text>
          <Text className="text-lightgray text-base font-medium">
            Email :{' '}
            <Text className="text-base font-semibold text-[#4B4B4B]">
              mark1998@gmail.com
            </Text>
          </Text>
        </View>
      </View>
      <TouchableOpacity
        className="flex-row items-center justify-between p-5"
        onPress={() => navigation.navigate('MyProfile')}>
        <View className="flex-row items-center gap-5">
          <PersonIcon height={20} width={20} fill={Colors.primary} />
          <Text className="text-black text-base font-medium">My Profile</Text>
        </View>

        <ForwardButtonIcon height={20} width={20} fill={'#BFBFBF'} />
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center justify-between p-5"
        onPress={() => navigation.navigate('MyOrder')}>
        <View className="flex-row items-center gap-5">
          <BoxIcon height={20} width={20} fill={Colors.primary} />
          <Text className="text-black text-base font-medium">My Orders</Text>
        </View>

        <ForwardButtonIcon height={20} width={20} fill={'#BFBFBF'} />
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center justify-between p-5"
        onPress={() => navigation.navigate('MyAddress')}>
        <View className="flex-row items-center gap-5">
          <LocationIcon height={20} width={20} fill={Colors.primary} />
          <Text className="text-black text-base font-medium">My Address</Text>
        </View>
        <ForwardButtonIcon height={20} width={20} fill={'#BFBFBF'} />
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center justify-between p-5"
        onPress={() => navigation.navigate('ChildDetails')}>
        <View className="flex-row items-center gap-5">
          <ChildIcon height={20} width={20} fill={Colors.primary} />
          <Text className="text-black text-base font-medium">
            My Child Details
          </Text>
        </View>
        <ForwardButtonIcon height={20} width={20} fill={'#BFBFBF'} />
      </TouchableOpacity>
      <View className="absolute bottom-5 self-center w-11/12"  >
        <PrimaryButton
          text="LOGOUT"
          icon={
            <LogOutIcon
              height={20}
              width={20}
              fill={'white'}/>}
              onPress={() => logOut()}
          />
      </View>
    </View>
  );
};

export default MyAccountScreen;
