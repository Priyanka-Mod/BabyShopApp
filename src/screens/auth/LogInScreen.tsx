import React, { useState } from 'react';
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Input,
  Layout,
  PrimaryButton,
  ErrorText,
  SecondaryButton,
  BottomButton,
} from '../../components';
import { LogInFormError } from '../../types';
import { CloseEyeIcon, OpenEyeIcon, UserIcon } from '../../assets/icon';
import { Colors } from '../../utils';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../services/firebaseConfig';
import { doc, getDoc, loadBundle } from 'firebase/firestore';
import { useAuth } from '../../services/useContextService';
import AsyncStorageService from '../../services/asyncStorageService';

const LogInScreen = ({ navigation }: any) => {
  const onPressSkip = () => {
    navigation.navigate('AppStack');
  };

  const onRegisterBtn = () => {
    navigation.navigate('Register');
  };
  const onForgotPassword = () => {
    navigation.navigate('Forgot Password');
  };
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const changeUserData = (key: string, value: string) => {
    setUserData(prev => ({ ...prev, [key]: value }));
  };

  const LogInUser = async () => {
    const emailValidation = new RegExp(
      '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
    );
    const passwordValidation = new RegExp(
      '^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$',
    );

    if (!userData.email || !userData.password) {
      setError('All fields are required to be filled');

      return false;
    }

    if (!emailValidation.test(userData.email)) {
      setError('Enter valid email');
      return false;
    }

    if (!passwordValidation.test(userData.password)) {
      setError('Enter strong password');
      return false;
    }

    await signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then(async userCred => {
        // //console.log(userCred);

        await AsyncStorage.setItem('token', userCred.user.uid).then(token => {
          console.log("tokenInLogIn", token)

          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'AppStack' }],
            }),
          )
        }
        );
      })
      .catch(err => {
        console.log(err.code);

        if (err.code === 'auth/invalid-credential') {
          setError('User not registered!');
        }
      });
  };

  return (
    <View className="flex-1">
      <Layout>
        <View className="flex-1 justify-center">
          <View className="flex-row justify-between">
            <Text className="text-3xl font-bold text-primary">LOGIN</Text>
            <SecondaryButton
              text="SKIP"
              onPress={onPressSkip}
              paddingHorizontal={20}
            />
          </View>
          <Text className="text-base text-[#404040] font-medium mb-7">
            Keep your <Text className="text-[#E97DAF]">BABY</Text> one looking
            cute.
          </Text>
          <Input
            placeholder="Enter Mobile OR Email"
            onChangeText={newEmail => changeUserData('email', newEmail)}
            value={userData.email}
          />
          <Input
            placeholder="Password"
            onChangeText={newPassword =>
              changeUserData('password', newPassword)
            }
            value={userData.password}
            secureTextEntry={showPassword ? false : true}
          />

          {error ? <ErrorText text={error} /> : null}

          <View className="flex-row items-center">
            <View className="w-2/4">
              <PrimaryButton text="LOGIN" onPress={LogInUser} />
            </View>
            <TouchableOpacity onPress={onForgotPassword}>
              <Text className="text-base font-bold text-darkgray px-7">
                Forget Password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Layout>
      <View className="px-[6px] items-center">
        <BottomButton
          text="Don't have account? "
          textBold="Register"
          onPress={onRegisterBtn}
        />
      </View>
    </View>
  );
};

export default LogInScreen;
