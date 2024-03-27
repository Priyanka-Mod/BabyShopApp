
import React, { Fragment, useEffect, useState } from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar, StyleSheet, View } from "react-native";
import { Colors } from "../utils";
import HomeScreen from "../screens/drawer/HomeScreen";
import CatagoryScreen from "../screens/app/CatagoryScreen";
import BrandScreen from "../screens/app/BrandScreen";
import BathCareScreen from "../screens/app/BathCareScreen";
import SortByScreen from "../screens/app/SortByScreen";
import FilterScreen from "../screens/app/FilterScreen";
import ProductDetailScreen from "../screens/app/ProductDetailScreen";
import ReviewScreen from "../screens/app/ReviewScreen";
import QueAnsScreen from "../screens/app/QueAnsScreen";
import AskQueScreen from "../screens/app/AskQueScreen";
import CheckoutScreen from "../screens/app/CheckoutScreen";
import DrawerNavigation from "./DrawerNavigation";
import OrderPlacedScreen from "../screens/app/OrderPlacedScreen";
import Cart from "../screens/app/Cart";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import {Appearance} from 'react-native';
import { darkTheme, lightTheme } from "../../constants";

const Stack = createNativeStackNavigator()
// const Drawer = createDrawerNavigator();
const AppNavigation = () => {
//   const { colorScheme, toggleColorScheme } = useColorScheme();
    const insets = useSafeAreaInsets();
    
    return(
        <Fragment>
        <SafeAreaView className="flex-1 bg-primary">
            <StatusBar backgroundColor='#E4097D'
                  barStyle='light-content'/>
            <Stack.Navigator screenOptions={{
            headerShown:false
        }}>
            <Stack.Screen name="Drawer" component={DrawerNavigation}/>
            <Stack.Screen name="Caterogy" component={CatagoryScreen}/>
            <Stack.Screen name="Brands" component={BrandScreen}/>
            <Stack.Screen name="BathCare" component={BathCareScreen}/>
            <Stack.Screen name="Sortby" component={SortByScreen}/>
            <Stack.Screen name="Filter" component={FilterScreen}/>
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen}/>
            <Stack.Screen name="Review" component={ReviewScreen}/>
            <Stack.Screen name="QueAns" component={QueAnsScreen}/>
            <Stack.Screen name="AskQue" component={AskQueScreen}/>
            <Stack.Screen name="Checkout" component={CheckoutScreen}/>
            <Stack.Screen name="OrderPlaced" component={OrderPlacedScreen}/>
            <Stack.Screen name="Cart" component={Cart}/>
            
        
        </Stack.Navigator>
        </SafeAreaView>
        <View style={{position:'absolute',bottom:0,backgroundColor:'black',height:insets.bottom, width:'100%'}}/>
        </Fragment>

        // <Drawer.Navigator>
        //     <Drawer.Screen name="Dashboard" component={HomeScreen}/>
        // </Drawer.Navigator>

        
    )
}


export default AppNavigation