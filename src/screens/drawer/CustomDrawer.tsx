import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../services/useContextService';
import { AboutusIcon, ContactIcon, HeartIcon, HelpIcon, HomeIcon, OfferIcon, PersonIcon, PrivacyIcon, ReferIcon, TruckIcon, WalletIcon } from '../../assets/icon';
import { Colors } from '../../utils';
import { darkTheme, lightTheme } from '../../../constants';
// import {userService} from '../../services/asyncStorageService';

const CustomDrawer = (props: any) => {
  const [focused, setFocused] = useState('Dashboard')
  const { user } = useAuth()
  // const { user,theme } = useAuth();
  // const [currentTheme, setCurrentTheme] = useState(lightTheme);
  // //console.log("theme : " , theme);
  // useEffect(() => {   
  //   if(theme === 'dark'){
  //     setCurrentTheme(darkTheme)
  //   }else{
  //     setCurrentTheme(lightTheme)
  //   }
  // },[theme])

  //console.log("userDetailsinDrawer", user);
  const list = [
    {
      label: 'Dashboard',
      navigate: 'Dashboard',
      icon: <HomeIcon height={20} width={20} fill={focused === 'Dashboard' ? Colors.primary : '#A1A1A1'} />
    },
    {
      label: 'My Account',
      navigate: 'My Account',
      icon: <PersonIcon height={20} width={20} fill={focused === 'My Account' ? Colors.primary : '#A1A1A1'} />,

    },
    {
      label: 'Wishlist',
      navigate: 'Wishlist',
      icon: <HeartIcon height={20} width={20} fill={focused === 'Wishlist' ? Colors.primary : '#A1A1A1'} />

    },
    {
      label: 'Offer & Coupons',
      navigate: 'Offers & Coupons',
      icon: <OfferIcon height={20} width={20} fill={focused === 'Offer & Coupons' ? Colors.primary : '#A1A1A1'} />

    },
    {
      label: 'Refer & Earn',
      navigate: 'Refer & Earn',
      icon: <ReferIcon height={20} width={20} fill={focused === 'Refer & Earn' ? Colors.primary : '#A1A1A1'} />

    },
    {
      label: 'Wallet',
      navigate: 'Wallet',
      icon: <WalletIcon height={20} width={20} fill={focused === 'Wallet' ? Colors.primary : '#A1A1A1'} />

    },
    {
      label: 'About Us',
      navigate: 'About Us',
      icon: <AboutusIcon height={20} width={20} fill={focused === 'About Us' ? Colors.primary : '#A1A1A1'} />

    },
    {
      label: 'Shipping Policy',
      navigate: 'Shipping Policy',
      icon: <TruckIcon height={20} width={20} fill={focused === 'Shipping Policy' ? Colors.primary : '#A1A1A1'} />

    },
    {
      label: 'Privacy Policy',
      navigate: 'Privacy Policy',
      icon: <PrivacyIcon height={20} width={20} fill={focused === 'Privacy Policy' ? Colors.primary : '#A1A1A1'} />

    },
    {
      label: 'Help',
      navigate: 'HelpScreen',
      icon: <HelpIcon height={20} width={20} fill={focused === 'Help' ? Colors.primary : '#A1A1A1'} />

    },
    {
      label: 'Contact Us',
      navigate: 'Contact Us',
      icon: <ContactIcon height={20} width={20} fill={focused === 'Contact Us' ? Colors.primary : '#A1A1A1'} />

    },
  ]
  const listWithoutUser = [
    {
      label: 'Dashboard',
      navigate: 'Dashboard',
      icon: <HomeIcon height={20} width={20} fill={focused === 'Dashboard' ? Colors.primary : '#A1A1A1'} />
    },
    {
      label: 'Wishlist',
      navigate: 'Wishlist',
      icon: <HeartIcon height={20} width={20} fill={focused === 'Wishlist' ? Colors.primary : '#A1A1A1'} />

    },
    {
      label: 'Offer & Coupons',
      navigate: 'Offers & Coupons',
      icon: <OfferIcon height={20} width={20} fill={focused === 'Offer & Coupons' ? Colors.primary : '#A1A1A1'} />

    },
    {
      label: 'Refer & Earn',
      navigate: 'Refer & Earn',
      icon: <ReferIcon height={20} width={20} fill={focused === 'Refer & Earn' ? Colors.primary : '#A1A1A1'} />

    },
    {
      label: 'Wallet',
      navigate: 'Wallet',
      icon: <WalletIcon height={20} width={20} fill={focused === 'Wallet' ? Colors.primary : '#A1A1A1'} />

    },
    {
      label: 'About Us',
      navigate: 'About Us',
      icon: <AboutusIcon height={20} width={20} fill={focused === 'About Us' ? Colors.primary : '#A1A1A1'} />

    },
    {
      label: 'Shipping Policy',
      navigate: 'Shipping Policy',
      icon: <TruckIcon height={20} width={20} fill={focused === 'Shipping Policy' ? Colors.primary : '#A1A1A1'} />

    },
    {
      label: 'Privacy Policy',
      navigate: 'Privacy Policy',
      icon: <PrivacyIcon height={20} width={20} fill={focused === 'Privacy Policy' ? Colors.primary : '#A1A1A1'} />

    },
    {
      label: 'Help',
      navigate: 'HelpScreen',
      icon: <HelpIcon height={20} width={20} fill={focused === 'Help' ? Colors.primary : '#A1A1A1'} />

    },
    {
      label: 'Contact Us',
      navigate: 'Contact Us',
      icon: <ContactIcon height={20} width={20} fill={focused === 'Contact Us' ? Colors.primary : '#A1A1A1'} />

    },
  ]
  return (
    <View className="flex-1 bg-white dark:bg-zinc-900 py-5"
    // style={{backgroundColor: currentTheme.containerBackgroundColor}}
    >

      {user ? <View className="flex-row gap-4 items-center pb-3 ml-[0.5px] pl-0">
        <View className="w-20 h-20 items-center justify-center border-2 rounded-full border-primary">
          <Image
            className="rounded-full"
            source={{
              uri: user.userData.photoURL,
              width: 70,
              height: 70,
            }}
          />
        </View>
        <Text className="text-black dark:text-white text-lg"
        //  style={{color:currentTheme.textColor , fontFamily: 'OleoScript-Bold' }}
        >{user.userData.displayName}</Text>
      </View>
        : <View className='mx-4 flex-row justify-between items-center pb-3'>
          <Text className='text-xl font-bold text-primary'>Hello User!</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate("AuthStack")}>
            <Text className='text-base text-blue font-medium'>LogIn?</Text>
          </TouchableOpacity>
        </View>}
      <FlatList
        data={user ? list : listWithoutUser}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity className={`${list.length - 1 === index ? 'border-b border-zinc-400 pt-3 pb-5' : 'py-3'} , flex-row gap-x-4 items-center`} onPress={
              () => {
                setFocused(item.label)
                //console.log('item.navigate:', item.navigate);

                props.navigation.navigate(item.navigate)
              }
            }>
              <View className={`${focused === item.label ? 'bg-lightpink' : 'bg-white dark:bg-zinc-900'} , pl-8 pr-5 py-2 rounded-tr-full rounded-br-full`}
              // style={{backgroundColor : focused === item.label ? '#FEF1F8' : 
              // currentTheme.containerBackgroundColor}}
              >
                {item.icon}
              </View>
              <Text className={`${focused === item.label ? 'text-primary' : 'text-black dark:text-white'} , font-medium text-base`}
              // style={{color:focused === item.label ? Colors.primary : currentTheme.textColor}}
              >{item.label}</Text>

            </TouchableOpacity>
          )
        }}
      />

    </View>
  );
};

export default CustomDrawer;
