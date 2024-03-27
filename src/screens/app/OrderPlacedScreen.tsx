import React from "react";
import { Alert, Text, View } from "react-native";
import { Header, PrimaryButton } from "../../components";
import { BackArrowIcon, CheckeedIcon } from "../../assets/icon";
import { Colors } from "../../utils";
import { CommonActions, NavigationAction, useNavigation } from "@react-navigation/native";

const OrderPlacedScreen = () => {
    const navigation : any = useNavigation();
    const onMyOrder = () => {
        // navigation.dispatch(
        //     CommonActions.reset({
        //       index: 0,
        //       routes: [{name: 'DrawerNavigation'}],
        //     }),
        //   );
        // Alert.alert('a')
        navigation.navigate('Drawer', {screen:'My Account'})
        navigation.navigate('MyOrder')
    }
    return(
        <View className="bg-white dark:bg-zinc-400 flex-1">
            <Header backgrndTransparent iconLeft={<BackArrowIcon height={25} width={25} />}
            onBackPress={() => navigation.goBack()}/>
            <View className="flex-1 items-center justify-center">
                <CheckeedIcon height={60} width={60} fill={Colors.primary}/>
                <Text className="mt-5 text-xl font-extrabold text-black">ORDER PLACED!</Text>
                <Text className="my-[15px] w-[70%] font-bold text-base text-zinc-500 text-center">
                    Your order was placed sucessfully. For more details, check delivery status under my account tab...
                </Text>
                <View className="w-[250px]">
                    <PrimaryButton text="MY ORDER" 
                    onPress={() => onMyOrder()}
                    />
                </View>
            </View>
        </View>
    )
}

export default OrderPlacedScreen