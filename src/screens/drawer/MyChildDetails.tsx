import React, {useEffect, useState} from 'react';
import {Header, Input} from '../../components';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BackWhiteArrowIcon,
  CalendarIcon,
  CameraIcon,
  CrossIcon,
  DeleteIcon,
  EditIcon,
  GalleryIcon,
  PlusIcon,
} from '../../assets/icon';
import {useAuth} from '../../services/useContextService';
import moment from 'moment';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'react-native-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { useIsFocused } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';



const MyChildDetails = ({navigation}: any) => {
  const {user , setUser} = useAuth();
const [childData , setChildData] = useState(user!.userData.childData)
  // let childData = ;
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      // Perform actions you want when the screen is focused.
      // This could be fetching data, re-rendering components, or any other refresh logic.
      setChildData(user!.userData.childData)
    }
  }, [isFocused]);

  const onAddChild = () => {
    // setModal(true);
    navigation.navigate("EditChild")
  };
  const onEdit = (id: number) => {
    const editChild = childData.find(data => data.id === id);

    console.log('editChild:', editChild);

    navigation.navigate("EditChild",editChild)
  };
 
  const onDelChild = (id: number) => {
    const filterData = childData.filter(data => data.id !== id)

    console.log("Deleted child" , id , "data" , filterData);
    let updatedData = {userData:{ ...user!.userData , childData:filterData} };

    firestore().collection('user').doc(user?._id).update(updatedData);
    // setUser(updatedData)
    setChildData(filterData)
  }
  return (
    <View className="flex-1 bg-white dark:bg-zinc-900">
      <Header
        title="My Child Details"
        iconLeft={
          <BackWhiteArrowIcon
            height={25}
            width={25}
          />
        }
        onBackPress={() => navigation.navigate('Account')}

      />
      <TouchableOpacity
        className="bg-lightpink dark:bg-zinc-700 flex-row gap-2.5 py-2.5 pt-0 mt-0 items-center justify-center"
        onPress={onAddChild}>
        <PlusIcon height={25} width={25} />
        <Text className="text-base font-bold text-primary">ADD CHILD</Text>
      </TouchableOpacity>
      <FlatList
        data={childData}
        renderItem={({item, index}) => {
          return (
            <View
              className="flex-row items-start justify-between mx-5 border-lightgray"
              style={{
                borderBottomWidth: childData.length - 1 === index ? 0 : 1,
              }}>
              <View className="flex-row gap-2.5 py-5 items-center ">
                <View className="rounded-full border-primary border-2 mt-0 pt-0">
                <Image
                  className="rounded-full"
                  source={{
                    uri:item.imagePath,
                    height: 80,
                    width: 80,
                  }}
                />
                </View>

                <View>
                  <Text className="text-lightgray font-medium text-[15px]">
                    Name :{' '}
                    <Text className="text-[15px] font-semibold text-darkgray dark:text-white">
                      {item.childName}
                    </Text>
                  </Text>
                  <Text className="text-lightgray font-medium text-[15px]">
                    Gender :{' '}
                    <Text className="text-[15px] font-semibold text-darkgray dark:text-white">
                      {item.genderValue}
                    </Text>
                  </Text>
                  <Text className="text-lightgray font-medium text-[15px]">
                    DOB :{' '}
                    <Text className="text-[15px] font-semibold text-darkgray dark:text-white">
                      {moment.unix(item.birthDate.seconds).format('DD/MM/YYYY')}
                    </Text>
                  </Text>
                </View>
              </View>
              <View className="flex-row gap-5 pt-5 items-start">
                <TouchableOpacity onPress={() => onEdit(item.id)}>
                  <EditIcon height={20} width={20} fill={'#bfbfbf'} />
                </TouchableOpacity >
                <TouchableOpacity onPress={() => onDelChild(item.id)}>
                <DeleteIcon height={20} width={20} fill={'#bfbfbf'} />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropDown: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#E97DAF',
    paddingLeft: 20,
    paddingRight: 10,
    height: 50,
    marginBottom:20
  },
})

export default MyChildDetails;