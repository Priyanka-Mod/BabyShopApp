import React, {useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {Input, Layout, PrimaryButton, Header} from '../../components';
import {Colors} from '../../utils';
import {BackArrowIcon} from '../../assets/icon';

const ForgetPasswordScreen = ({navigation}: any) => {
  const [user, setUser] = useState('');
  const onSumbit = () => {};
  const onBackPress = () => {
    navigation.navigate('LogIn');
  };
  return (
    <Layout>
      <Header
        auth
        iconLeft={<BackArrowIcon height={25} width={25} />}
        onBackPress={onBackPress}
      />
      <View className='flex-1 justify-center'>
        <View className='w-[90%]'>
          <Text className='text-3xl font-bold text-primary'>FORGOT PASSWORD?</Text>

          <Text className='text-sm text-[#404040] font-medium mb-7' >
            To set password enter registerd mail or mobile.
          </Text>
        </View>

        <Input
          placeholder="Enter Mobile OR Email"
          onChangeText={newEmail => setUser(newEmail)}
          value={user}
        />

        <PrimaryButton text="GET LINK" onPress={onSumbit} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  forgotContainer:{width: '90%'},
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  subheading: {
    fontSize: 14,
    color: '#404040',
    fontWeight: '600',
    marginBottom: 30,
  },
});

export default ForgetPasswordScreen;
