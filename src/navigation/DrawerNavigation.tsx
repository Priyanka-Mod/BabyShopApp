import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import HomeScreen from '../screens/drawer/HomeScreen';
import MyAccountScreen from '../screens/drawer/MyAccountScreen';
import WishlistScreen from '../screens/drawer/Wishlist';
import OffersScreen from '../screens/drawer/OffersScreen';
import ReferEarnScreen from '../screens/drawer/ReferEarnScreen';
import WalletScreen from '../screens/drawer/WalletScreen';
import AboutUsScreen from '../screens/drawer/AboutScreen';
import ShippingScreen from '../screens/drawer/ShippingScreen';
import PrivacyScreen from '../screens/drawer/PrivacyScreen';
import HelpScreen from '../screens/drawer/HelpScreen';
import ContactUsScreen from '../screens/drawer/ContactUsScreen';
import CustomDrawer from '../screens/drawer/CustomDrawer';
import {
  AboutusIcon,
  CartIcon,
  ContactIcon,
  HeartIcon,
  HelpIcon,
  HomeIcon,
  OfferIcon,
  PersonIcon,
  PrivacyIcon,
  ReferIcon,
  TruckIcon,
  WalletIcon,
} from '../assets/icon';
import {Colors} from '../utils';
import {View} from 'react-native';
import MyOrderScreen from '../screens/drawer/MyOrderScreen';
import MyAddress from '../screens/drawer/MyAddress';
import MyProfile from '../screens/drawer/MyProfile';
import MyChildDetails from '../screens/drawer/MyChildDetails';
import AddAddress from '../screens/drawer/AddAddress';
import OrderDetails from '../screens/drawer/OrderDetails';
import Review from '../screens/drawer/Review';
import MyAccountNavigation from './MyAccountNavigation';
import Notification from '../screens/drawer/Notification';

const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerStyle: {width: '85%'},
        drawerLabelStyle: {
          fontSize: 16,
          marginBottom: 5,
          fontWeight: '500',
          marginLeft: -20,
        },
        drawerActiveTintColor: Colors.primary,
        drawerInactiveTintColor: '#3F3F3F',
        drawerActiveBackgroundColor: 'white',
        drawerInactiveBackgroundColor: 'white',
        headerShown: false,
      }}>
      <Drawer.Screen
        name="Dashboard"
        component={HomeScreen}
        options={{
          drawerIcon: ({focused}) => (
            <View className='{focused? bg-[#FDF1F9] : bg-white pl-7 pr-5 py-2.5 pt-1 rounded-tr-full rounded-br-full'
             >
              <HomeIcon height={20} width={20} fill={focused?Colors.primary:'#A1A1A1'} />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="My Account"
        component={MyAccountNavigation}
        options={{
          drawerIcon: ({focused}) => (
            <View className='{focused? bg-[#FDF1F9] : bg-white pl-7 pr-5 py-2.5 pt-1 rounded-tr-full rounded-br-full'>
              <PersonIcon height={20} width={20} fill={focused?Colors.primary:'#A1A1A1'} />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          drawerIcon: ({focused}) => (
            <View className='{focused? bg-[#FDF1F9] : bg-white pl-7 pr-5 py-2.5 pt-1 rounded-tr-full rounded-br-full'
             >
              <HeartIcon height={20} width={20} fill={focused?Colors.primary:'#A1A1A1'} />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Offers & Coupons"
        component={OffersScreen}
        options={{
          drawerIcon: ({focused}) => (
            <View className='{focused? bg-[#FDF1F9] : bg-white pl-7 pr-5 py-2.5 pt-1 rounded-tr-full rounded-br-full'
             >
              <OfferIcon height={20} width={20} fill={focused?Colors.primary:'#A1A1A1'} />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Refer & Earn"
        component={ReferEarnScreen}
        options={{
          drawerIcon: ({focused}) => (
            <View className='{focused? bg-[#FDF1F9] : bg-white pl-7 pr-5 py-2.5 pt-1 rounded-tr-full rounded-br-full'
             >
              <ReferIcon height={20} width={20} fill={focused?Colors.primary:'#A1A1A1'} />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          drawerIcon: ({focused}) => (
            <View className='{focused? bg-[#FDF1F9] : bg-white pl-7 pr-5 py-2.5 pt-1 rounded-tr-full rounded-br-full'
             >
              <WalletIcon height={20} width={20} fill={focused?Colors.primary:'#A1A1A1'} />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="About Us"
        component={AboutUsScreen}
        options={{
          drawerIcon: ({focused}) => (
            <View className='{focused? bg-[#FDF1F9] : bg-white pl-7 pr-5 py-2.5 pt-1 rounded-tr-full rounded-br-full'
             >
              <AboutusIcon height={20} width={20} fill={focused?Colors.primary:'#A1A1A1'} />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Shipping Policy"
        component={ShippingScreen}
        options={{
          drawerIcon: ({focused}) => (
            <View className='{focused? bg-[#FDF1F9] : bg-white pl-7 pr-5 py-2.5 pt-1 rounded-tr-full rounded-br-full'
             >
              <TruckIcon height={20} width={20} fill={focused?Colors.primary:'#A1A1A1'} />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Privacy Policy"
        component={PrivacyScreen}
        options={{
          drawerIcon: ({focused}) => (
            <View className='{focused? bg-[#FDF1F9] : bg-white pl-7 pr-5 py-2.5 pt-1 rounded-tr-full rounded-br-full'
             >
              <PrivacyIcon height={20} width={20} fill={focused?Colors.primary:'#A1A1A1'} />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Notification"
        component={Notification}
        options={{
          drawerIcon: ({focused}) => (
            <View className='{focused? bg-[#FDF1F9] : bg-white pl-7 pr-5 py-2.5 pt-1 rounded-tr-full rounded-br-full'
             >
              <HelpIcon height={20} width={20} fill={focused?Colors.primary:'#A1A1A1'} />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Contact Us"
        component={ContactUsScreen}
        options={{
          drawerIcon: ({focused}) => (
            <View className='{focused? bg-[#FDF1F9] : bg-white pl-7 pr-5 py-2.5 pt-1 rounded-tr-full rounded-br-full'
             >
              <ContactIcon height={20} width={20} fill={focused?Colors.primary:'#A1A1A1'} />
            </View>
          ),
        }}
      />
      

    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
