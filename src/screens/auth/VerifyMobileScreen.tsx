import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, PrimaryButton, Header } from '../../components';
import { BackArrowIcon } from '../../assets/icon';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { Colors } from '../../utils';
import { CommonActions } from '@react-navigation/native';

const VerifyMobileScreen = (props: any) => {
  const onBackPress = () => {
    props.navigation.navigate('Register');
  };
  const onSubmit = () => {
    props.navigation.navigate('LogIn');
  }
  return (
    <View className='flex-1 px-5 bg-white'>
      <Header
        auth
        onBackPress={onBackPress}
        iconLeft={<BackArrowIcon height={28} width={28} />}
        title="VERIFY MOBILE"
      />
      <View className='flex-1 items-center my-5'>
        <Text className='text-black text-sm font-normal'>
          OTP has been send to you on +91 {props.route.params.number}
        </Text>
        <Text className='text-black text-sm font-normal'>Please enter it below.</Text>

        <View>
          <OTPInputView
            style={styles.OTPInput}
            pinCount={4}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => {
              //console.log(`Code is ${code}, you are good to go!`);
            }}
          />
        </View>
        <View className='flex-row w-full items-center gap-x-12 pl-0'>
          <View className='w-2/4'>
            <PrimaryButton text="SUBMIT" onPress={onSubmit} />
          </View>
          <TouchableOpacity>
            <Text>Resend OTP?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  OTPInput: { width: '65%', height: 100 },
  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderRadius: 100,
  },

  underlineStyleHighLighted: {
    borderColor: Colors.primary,
  },
});

export default VerifyMobileScreen;
