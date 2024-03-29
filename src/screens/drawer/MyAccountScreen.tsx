import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Appearance, Image, Platform, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Header, PrimaryButton } from '../../components';
import {
  BoxIcon,
  ChildIcon,
  ForwardButtonIcon,
  LocationIcon,
  LogOutIcon,
  MenuIcon,
  PersonIcon,
  ThemeIcon,
} from '../../assets/icon';
import { CommonActions, DrawerActions, useFocusEffect } from '@react-navigation/native';
import { Colors } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../services/firebaseConfig';
import AsyncStorageService from '../../services/asyncStorageService';
import { useAuth } from '../../services/useContextService';
import { useIsFocused } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import { darkTheme, lightTheme } from '../../../constants';
import Animated, { LightSpeedInLeft, LightSpeedOutLeft } from 'react-native-reanimated';
const MyAccountScreen = ({ navigation }: any) => {
  const { theme } = useAuth();
  const { setTheme } = useAuth();
  const { user, setUser } = useAuth();
  const [userDetails, setUserDetails] = useState<any>(user)
  const isFocused = useIsFocused();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  // const [currentTheme, setCurrentTheme] = useState(darkTheme);
  // const [isSwitchOn, setIsSwitchOn] = useState(true);
  useEffect(() => {
    if (isFocused) {
      // Perform actions you want when the screen is focused.
      // This could be fetching data, re-rendering components, or any other refresh logic.
      setUserDetails(user)
    }
  }, [isFocused]);
  //console.log("profileAcc Detail : ", userDetails);

  // useEffect(() =>{
  //   // Alert.alert("UseEffect")
  //   const colorScheme = Appearance.getColorScheme();
  //   if (colorScheme === 'dark') {
  //     setCurrentTheme(darkTheme)
  //   } else{
  //     setCurrentTheme(lightTheme)
  //   }
  // },[])

  // const toggleSwitch = () => {
  //   setIsSwitchOn(!isSwitchOn);
  //   const newTheme = isSwitchOn ? darkTheme : lightTheme;
  //   setCurrentTheme(newTheme);
  //   const themeValue = isSwitchOn ? 'dark' : 'light'
  //   setTheme(themeValue)
  // };

  const logOut = async () => {
    setUser(null)
    await auth
      .signOut()
      .then(async data => {
        await AsyncStorage.removeItem('token');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'AuthStack' }],
          }),
        );
      })
      .catch(err => console.log(err));
  };
  return (
    <View className="flex-1 bg-white dark:bg-black"
    // style={{backgroundColor: currentTheme?.containerBackgroundColor}}
    >
      <Header
        title="My Account"
        iconLeft={
          <MenuIcon
            fill={'white'}
            height={25}
            width={25}
          />
        }
        onBackPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
      {userDetails ? <View className="bg-lightpink dark:bg-zinc-800 flex-row items-center gap-5 mt-0 p-5 pt-0"
      // style={{backgroundColor:currentTheme.secondaryContainer}}
      >
        <Image
          className="rounded-full"
          source={{
            uri: userDetails.userData.photoURL,
          }}
          height={80}
          width={80}
        />
        {userDetails ? <View>
          <Text className="text-primary dark:text-white text-lg font-bold"
          // style={{color:currentTheme.textColor}}
          >{userDetails.userData.displayName}
          </Text>
          <Text className="text-lightgray text-base font-medium">
            Mobile :{' '}
            <Text className="text-base text-[#4B4B4B] dark:text-zinc-400 font-semibold ">
              +91 {userDetails.userData.phoneNumber}
            </Text>
          </Text>
          <Text className="text-lightgray text-base font-medium">
            Email :{' '}
            <Text className="text-base font-semibold text-[#4B4B4B] dark:text-zinc-400">
              {userDetails.userData.email}
            </Text>
          </Text>
        </View> : <ActivityIndicator></ActivityIndicator>}
      </View> : <ActivityIndicator></ActivityIndicator>}
      <TouchableOpacity
        className="flex-row items-center justify-between p-5"
        onPress={() => navigation.navigate('MyProfile')}>
        <View className="flex-row items-center gap-5">
          <PersonIcon height={20} width={20} fill={Colors.primary} />
          <Text className="text-black dark:text-white text-base font-medium"
          // style={{color:currentTheme.textColor}}
          >My Profile</Text>
        </View>

        <ForwardButtonIcon height={20} width={20} fill={'#BFBFBF'} />
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center justify-between p-5"
        onPress={() => navigation.navigate('MyOrder')}>
        <View className="flex-row items-center gap-5">
          <BoxIcon height={20} width={20} fill={Colors.primary} />
          <Text className="text-black dark:text-white text-base font-medium"
          // style={{color:currentTheme.textColor}}
          >My Orders</Text>
        </View>

        <ForwardButtonIcon height={20} width={20} fill={'#BFBFBF'} />
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center justify-between p-5"
        onPress={() => navigation.navigate('MyAddress')}>
        <View className="flex-row items-center gap-5">
          <LocationIcon height={20} width={20} fill={Colors.primary} />
          <Text className="text-black dark:text-white text-base font-medium"
          // style={{color:currentTheme.textColor}}
          >My Address</Text>
        </View>
        <ForwardButtonIcon height={20} width={20} fill={'#BFBFBF'} />
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center justify-between p-5"
        onPress={() => navigation.navigate('ChildDetails')}>
        <View className="flex-row items-center gap-5">
          <ChildIcon height={20} width={20} fill={Colors.primary} />
          <Text className="text-black dark:text-white text-base font-medium"
          // style={{color:currentTheme.textColor}}
          >
            My Child Details
          </Text>
        </View>
        <ForwardButtonIcon height={20} width={20} fill={'#BFBFBF'} />
      </TouchableOpacity>
      <View
        className="flex-row items-center justify-between p-5"
      >
        <View className="flex-row items-center gap-5">
          <ThemeIcon height={20} width={20} fill={Colors.primary} />
          <Text className="text-black dark:text-white text-base font-medium"
          // style={{color:currentTheme.textColor}}
          >
            Theme
          </Text>
        </View>
        <Switch className='self-end' value={colorScheme === 'dark'} onChange={toggleColorScheme} trackColor={{ true: Colors.primary, false: Platform.OS == 'android' ? '#d3d3d3' : '#fbfbfb' }} thumbColor={'white'} />
      </View>
      {/* <View className='mx-5 flex-row justify-between'>
        <Text style={{color: currentTheme.textColor}}>Toggle theme context</Text>
        <Switch className='self-end' value={isSwitchOn} onChange={toggleSwitch} trackColor={{ true: Colors.primary, false: Platform.OS=='android'?'#d3d3d3': '#fbfbfb' }} thumbColor={'white'} />
        
      </View> */}
      <View className="absolute bottom-5 self-center w-11/12"  >
        <PrimaryButton
          text="LOGOUT"
          icon={
            <LogOutIcon
              height={20}
              width={20}
              fill={'white'} />}
          onPress={() => logOut()}
        />
      </View>
    </View>
  );
};

export default MyAccountScreen;
