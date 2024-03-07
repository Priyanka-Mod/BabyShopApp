import React from "react";
import { Text, View } from "react-native";
import { Header } from "../../components";
import { MenuIcon, OfferIcon } from "../../assets/icon";
import { DrawerActions } from "@react-navigation/native";
import { Colors } from "../../utils";

const OffersScreen = ({navigation}:any) => {
    return(
        <View className='flex-1 bg-white'>
            <Header title="Offers & Coupons" 
             iconLeft={
                <MenuIcon
                  width={25}
                  height={25}
                  fill={'white'}
                  onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                />
              }/>
              <View className="rounded-xl border-2 my-[15px] border-lightergray mx-4">
                <View className="flex-row gap-2 items-center mx-5 py-3 border-b-2 border-lightergray">
                    <OfferIcon width={30} height={30} fill={Colors.primary}/>
                    <Text className="text-xl font-normal text-primary">10%OFF</Text>
                </View>
                <View className="py-2 px-6">
                    <Text className="text-black font-bold text-[15px]">Lorem Ipsum is simply dummy text of printing text of the printing.......</Text>
                    <Text className='text-lightgray text-[15px] font-bold my-1'>Expired : <Text className='text-[#048AD4]'>20/02/2021</Text></Text>
                </View>
              </View>
              <View className="rounded-xl border-2 my-[15px] border-lightergray mx-4" >
                <View className="flex-row gap-2 items-center mx-5 py-3 border-b-2 border-lightergray">
                    <OfferIcon width={30} height={30} fill={'#A2A2A2'}/>
                    <Text className="text-5 font-normal text-[a2a2a2] text-xl font-normal">VDAY40</Text>
                </View>
                <View className="py-2 px-6">
                    <Text className="text-[a2a2a2] font-bold text-[15px]">Lorem Ipsum is simply dummy text of printing text of the printing.......</Text>
                    <Text className='text-lightgray text-[15px] font-bold my-1'>Expired : <Text className='text-[a2a2a2]'>14/02/2021</Text></Text>
                </View>
              </View>
              <View className="rounded-xl border-2 my-[15px] border-lightergray mx-4">
                <View className="flex-row gap-2 items-center mx-5 py-3 border-b-2 border-lightergray">
                    <OfferIcon width={30} height={30} fill={'#A2A2A2'}/>
                    <Text className='text-5 font-normal text-[a2a2a2] text-xl font-normal'>DIWALI2021</Text>
                </View>
                <View className='py-2 px-6'>
                    <Text className='text-[a2a2a2] font-bold text-[15px]'>Lorem Ipsum is simply dummy text of printing text of the printing.......</Text>
                    <Text className='text-lightgray text-[15px] font-bold my-1'>Expired : <Text className='text-[a2a2a2]'>0/10/2020</Text></Text>
                </View>
              </View>
        </View>
    )
}

export default OffersScreen