import React, { Fragment } from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import RegisterScreen from "../screens/auth/RegisterScreen";
import LogInScreen from "../screens/auth/LogInScreen";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import ForgetPasswordScreen from "../screens/auth/ForgetPasswordScreen";
import VerifyMobileScreen from "../screens/auth/VerifyMobileScreen";

const Stack = createNativeStackNavigator()

const AuthNavigation = () => {
    return(
        <Fragment>
        <SafeAreaView className="flex-1">
            <StatusBar backgroundColor='transparent'
                  barStyle='dark-content'/>
             <Stack.Navigator initialRouteName="LogIn" screenOptions={{
            headerShown:false
        }}>
            
            <Stack.Screen name="LogIn" component={LogInScreen}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Forgot Password" component={ForgetPasswordScreen}/>
            <Stack.Screen name="VerifyMobile" component={VerifyMobileScreen}/>
        </Stack.Navigator>
        </SafeAreaView>
        </Fragment>
    )
}
export default AuthNavigation