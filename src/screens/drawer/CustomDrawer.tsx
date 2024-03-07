import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, Image, Text, View} from 'react-native';
import {Colors} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageService from '../../services/asyncStorageService';
import { useAuth } from '../../services/useContextService';
// import {userService} from '../../services/asyncStorageService';

const CustomDrawer = (props: any) => {
  // const [user,setUser] = useState<any>()
  // useEffect(() => {
    
  //   AsyncStorageService.getItem('UserData').then((data:any)=>{
  //     console.log("dataDrawer" , data);
      
  //     setUser(data)
  //   })
  // }, []);
  const { user } = useAuth();
  console.log("userDetailsinDrawer" , user);
  
  return (
    <View className="flex-1 my-5 border-b border-b-lightergray">
      
        {user ?<View className="flex-row gap-4 items-center mx-2">
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
        </View> : <ActivityIndicator></ActivityIndicator>}
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
