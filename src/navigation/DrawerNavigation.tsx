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
import Help from '../screens/drawer/Help';

const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerStyle: {width: '85%'},
        headerShown: false,
      }}>
      <Drawer.Screen
        name="Dashboard"
        component={HomeScreen}
      />
      <Drawer.Screen
        name="My Account"
        component={MyAccountNavigation}
      />
      <Drawer.Screen
        name="Wishlist"
        component={WishlistScreen}
      />
      <Drawer.Screen
        name="Offers & Coupons"
        component={OffersScreen}
      />
      <Drawer.Screen
        name="Refer & Earn"
        component={ReferEarnScreen}
      />
      <Drawer.Screen
        name="Wallet"
        component={WalletScreen}
      />
      <Drawer.Screen
        name="About Us"
        component={AboutUsScreen}
      />
      <Drawer.Screen
        name="Shipping Policy"
        component={ShippingScreen}
      />
      <Drawer.Screen
        name="Privacy Policy"
        component={PrivacyScreen}
      />
      <Drawer.Screen
        name="HelpScreen"
        component={Help}
      />
      <Drawer.Screen
        name="Contact Us"
        component={ContactUsScreen}
      />
      

    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
