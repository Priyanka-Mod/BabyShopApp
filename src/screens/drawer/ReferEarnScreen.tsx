import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Header } from "../../components";
import { MenuIcon } from "../../assets/icon";
import { DrawerActions } from "@react-navigation/native";
import { Colors } from "../../utils";

const ReferEarnScreen = ({ navigation }: any) => {
  return (
    <View className="flex-1 bg-white dark:bg-zinc-900">
      <Header title="Refer & Earn"
        iconLeft={
          <MenuIcon
            width={25}
            height={25}
            fill={'white'}
          />
        }
        onBackPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}

      />
      <View className="bg-white">
        <Image
          source={require('../../assets/img/logo.png')}
          resizeMode="contain"
        />
      </View>
      <View className="items-center justify-center">
        <Text className="my-5 text-center w-[85%] text-lightgray text-base font-medium">
          Lorem Ipsum is simply dummy test of printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </Text>
        <Text className="text-black dark:text-white text-base font-black">YOUR REFER CODE</Text>
        <View className="my-6 border-primary border-2 rounded-xl border-dashed">
          <Text className="py-2.5 px-10 text-xl font-black text-primary">BGEFG30</Text>
        </View>

      </View>
      <View className="absolute bottom-12 rounded-full border-2 border-lightblue 
                z-10 left-40">
        <TouchableOpacity className="h-20 w-20 justify-center items-center">
          <Image className="w-10 h-10"
            source={require('../../assets/img/share.png')}
            tintColor={'#0685DB'}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ReferEarnScreen