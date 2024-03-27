import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Header, Input, PrimaryButton} from '../../components';
import {BackWhiteArrowIcon} from '../../assets/icon';

const AskQueScreen = ({navigation}: any) => {
  const [focus, setFocus] = useState(false);

  const onBackPress = () => {
    navigation.navigate('QueAns');
  };
  return (
    <View className='flex-1 bg-white dark:bg-zinc-900'>
      <Header
        title="Ask Question"
        iconLeft={
          <BackWhiteArrowIcon width={25} height={25}  />

        }
        onBackPress={onBackPress}
      />
      <View className='my-2.5 mx-5'>
        <View className='mt-2.5'>
          <Input
            placeholder="Question Title"
            placeholderTextColor={'#B7B7B7'}
          />
        </View>
        <View className='mt-1.5'>
          <Input
            placeholder="Enter Description"
            placeholderTextColor={'#B7B7B7'}
            height={100}
            radius={10}
          />
        </View>
        <View className='mt-1.5'>
          <Input
            placeholder="Submit Query"
            placeholderTextColor={'#B7B7B7'}
            height={80}
            radius={10}
          />
        </View>
        <View>
            <PrimaryButton text='SUBMIT' onPress={()=>navigation.navigate("QueAns")}/>
        </View>
      </View>
    </View>
  );
};

export default AskQueScreen;
