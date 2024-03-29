import React, { Fragment } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterScreen from "../screens/auth/RegisterScreen";
import LogInScreen from "../screens/auth/LogInScreen";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import ForgetPasswordScreen from "../screens/auth/ForgetPasswordScreen";
import VerifyMobileScreen from "../screens/auth/VerifyMobileScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator()

const AuthNavigation = () => {
    const insets = useSafeAreaInsets();

    return (
        <Fragment>
            <SafeAreaView className="flex-1 bg-white">
                <StatusBar backgroundColor='white'
                    barStyle='dark-content' />
                <Stack.Navigator initialRouteName="LogIn" screenOptions={{
                    headerShown: false
                }}>

                    <Stack.Screen name="LogIn" component={LogInScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                    <Stack.Screen name="Forgot Password" component={ForgetPasswordScreen} />
                    <Stack.Screen name="VerifyMobile" component={VerifyMobileScreen} />
                </Stack.Navigator>
            </SafeAreaView>
            <View style={{ position: 'absolute', bottom: 0, backgroundColor: 'black', height: insets.bottom, width: '100%' }} />

        </Fragment>
    )
}
export default AuthNavigation