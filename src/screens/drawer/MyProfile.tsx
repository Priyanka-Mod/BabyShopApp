import React, {useEffect, useState} from 'react';
import {Header, Input, PrimaryButton} from '../../components';
import {ActivityIndicator, Image, View} from 'react-native';
import {BackWhiteArrowIcon, EditIcon} from '../../assets/icon';
import AsyncStorageService from '../../services/asyncStorageService';
import {update} from 'firebase/database';
import firestore from '@react-native-firebase/firestore';
import {useAuth} from '../../services/useContextService';

const MyProfile = ({navigation}: any) => {
  // const [Id , setId] = useState<any>();
  // const [user, setUser] = useState<any>();
  const {user} = useAuth();
  const {setUser} = useAuth();

  const [name, setName] = useState<any>();
  const [number, setNumber] = useState<any>();
  const [email, setEmail] = useState<any>();
  useEffect(() => {
    setName(user!.userData.displayName);
    setEmail(user!.userData.email);
    setNumber(user!.userData.phoneNumber);
  }, []);
  const onSubmit = (name: any, email: any, number: any) => {
    console.log('details Updated :', name, email, number);
    // const oldData = [...user]
    if (user) {
      user.userData.displayName = name;
      user.userData.email = email;
      user.userData.phoneNumber = number;
      let updatedData = {userData: user.userData};
      firestore().collection('user').doc(user._id).update(updatedData);
      console.log('updatedDB : ', updatedData);
      setUser(user);
      console.log('user', user);

      navigation.navigate('Account');
    }
    // AsyncStorageService.setItem('UserData',user)
  };
  return (
    <View className="flex-1 bg-white">
      <Header
        title="My Profile"
        iconLeft={
          <BackWhiteArrowIcon
            height={25}
            width={25}
            onPress={() => navigation.navigate('Account')}
          />
        }
        rightIcon1={<EditIcon height={20} width={20} fill={'white'} />}
      />
      {user ? (
        <View className="mx-5">
          <Image
            className="self-center rounded-full border-primary my-5 border-2"
            source={{
              uri: user.userData.photoURL,
            }}
            height={80}
            width={80}
          />

          <Input value={name} onChangeText={newName => setName(newName)} />
          <Input
            value={`+91 ${number}`}
            onChangeText={newNum => setNumber(newNum)}
          />
          <Input value={email} onChangeText={newEmail => setEmail(newEmail)} />

          <PrimaryButton
            text="SUBMIT"
            onPress={() => onSubmit(name, email, number)}
          />
        </View>
      ) : (
        <ActivityIndicator></ActivityIndicator>
      )}
    </View>
  );
};

export default MyProfile;
