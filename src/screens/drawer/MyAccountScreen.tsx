import React, { useEffect, useState } from 'react';
import {ActivityIndicator, Alert, Image, Text, TouchableOpacity, View} from 'react-native';
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
import {CommonActions, DrawerActions, useFocusEffect} from '@react-navigation/native';
import {Colors} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {auth} from '../../services/firebaseConfig';
import AsyncStorageService from '../../services/asyncStorageService';
import { useAuth } from '../../services/useContextService';
import { useIsFocused } from '@react-navigation/native';
const MyAccountScreen = ({navigation}: any) => {
  const {user} = useAuth();
  const [userDetails,setUserDetails] = useState<any>(user)
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      // Perform actions you want when the screen is focused.
      // This could be fetching data, re-rendering components, or any other refresh logic.
      setUserDetails(user)
    }
  }, [isFocused]);
console.log("profileAcc Detail : " , userDetails);


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
      {userDetails?<View className="bg-lightpink flex-row items-center gap-5 mt-0 p-5 pt-0">
        <Image
          className="rounded-full"
          source={{
            uri: userDetails.userData.photoURL,
          }}
          height={80}
          width={80}
        />
        {userDetails?<View>
          <Text className="text-primary text-lg font-bold">{userDetails.userData.displayName}</Text>
          <Text className="text-lightgray text-base font-medium">
            Mobile :{' '}
            <Text className="text-base font-semibold text-[#4B4B4B]">
              +91 {userDetails.userData.phoneNumber}
            </Text>
          </Text>
          <Text className="text-lightgray text-base font-medium">
            Email :{' '}
            <Text className="text-base font-semibold text-[#4B4B4B]">
              {userDetails.userData.email}
            </Text>
          </Text>
        </View>:<ActivityIndicator></ActivityIndicator>}
      </View>:<ActivityIndicator></ActivityIndicator>}
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
