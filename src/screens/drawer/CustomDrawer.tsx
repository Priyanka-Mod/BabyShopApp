import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React, {useEffect, useState} from 'react';
import {Alert, Image, Text, View} from 'react-native';
import {Colors} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageService from '../../services/asyncStorageService';
// import {userService} from '../../services/asyncStorageService';

const CustomDrawer = (props: any) => {
  const [user,setUser] = useState<any>()
  useEffect(() => {
    // Alert.alert('drawer')
    AsyncStorageService.getItem('UserData').then((data:any)=>{
      console.log("data" , data);
      
      setUser(data)
    })
  }, []);

  return (
    <View className="flex-1 my-5 border-b border-b-lightergray">
      <View className="flex-row gap-4 items-center mx-2">
        <View className="w-20 h-20 items-center justify-center border-2 rounded-full border-primary">
          <Image
            className="rounded-full"
            source={{
              uri: user.userData.photoURL,
              width: 70,
              height: 70,
            }}
          />
        </View>
        <Text className="text-black text-lg font-extrabold">{user.userData.displayName}</Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
