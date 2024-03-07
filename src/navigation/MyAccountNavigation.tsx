import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import MyOrderScreen from "../screens/drawer/MyOrderScreen";
import MyAddress from "../screens/drawer/MyAddress";
import MyProfile from "../screens/drawer/MyProfile";
import MyChildDetails from "../screens/drawer/MyChildDetails";
import AddAddress from "../screens/drawer/AddAddress";
import OrderDetails from "../screens/drawer/OrderDetails";
import Review from "../screens/drawer/Review";
import MyAccountScreen from "../screens/drawer/MyAccountScreen";
import Notification from "../screens/drawer/Notification";

const Stack = createNativeStackNavigator();

const MyAccountNavigation = () => {
    return(
      
            <Stack.Navigator screenOptions={{
            headerShown:false
        }} initialRouteName="Account">
      <Stack.Screen name='Account' component={MyAccountScreen}/>
      <Stack.Screen name='MyOrder' component={MyOrderScreen}/>
      <Stack.Screen name='MyAddress' component={MyAddress}/>
      <Stack.Screen name='MyProfile' component={MyProfile}/>
      <Stack.Screen name='ChildDetails' component={MyChildDetails}/>
      <Stack.Screen name='Add Address' component={AddAddress}/>
      <Stack.Screen name='OrderDetails' component={OrderDetails}/>
      <Stack.Screen name='Review' component={Review}/>
      <Stack.Screen name="Notification" component={Notification}/>
      
      </Stack.Navigator>
        
    )
}
export default MyAccountNavigation