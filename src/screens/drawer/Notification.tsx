import React from "react";
import { Header } from "../../components";
import { Text, View } from "react-native";
import { BackWhiteArrowIcon, MenuIcon } from "../../assets/icon";
import { Colors } from "../../utils";
import { DrawerActions } from "@react-navigation/native";
const Notification = ({navigation}:any) => {
    return(
        <View className='flex-1 bg-white'>
            <Header title="Notification" iconLeft={
                <MenuIcon width={25} height={25} fill={'white'} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
            }/>
            <View className="bg-lightpink p-[15px]">
                <Text className="text-primary">11/02/2021</Text>
                <Text className="text-black font-black text-[15px]" >Lorem ipsum is simple dummy text.</Text>
                <Text className="text-darkgray font-medium w-[300px]">Lorem ipsum is simple dummy text of the printing and typesetting industry.</Text>
            </View>
            <View className="p-[15px]">
                <Text className="text-lightgray">01/02/2021</Text>
                <Text className="text-black font-black text-[15px]" >Lorem ipsum is simple dummy text.</Text>
                <Text className="text-darkgray font-medium w-[300px]">Lorem ipsum is simple dummy text of the printing and typesetting industry.</Text>
            </View>
        </View>
    )
}

export default Notification