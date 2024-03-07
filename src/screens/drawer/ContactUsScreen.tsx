import React, {useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {Header, Input, PrimaryButton} from '../../components';
import {ContactIcon, MenuIcon} from '../../assets/icon';
import {DrawerActions} from '@react-navigation/native';
import {Colors} from '../../utils';

const ContactUsScreen = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  return (
    <View className="bg-white flex-1">
      <Header
        title="Contact Us"
        iconLeft={
          <MenuIcon
            width={25}
            height={25}
            fill={'white'}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="items-center bg-lightpink py-8">
          <Image
            source={require('../../assets/img/PinkBgLogo.png')}
            width={10}
            height={10}
          />
        </View>
        <View className="border-lightgray border-b">
          <View className="flex-row my-2.5 items-center mx-5">
            <View className="pr-4">
              <ContactIcon height={45} width={45} fill={Colors.primary} />
            </View>
            <Text className="pl-4 border-[lightgray] border-l-2 text-[#575757] font-extrabold text-base">
              +91 12345 67890{' '}
            </Text>
            <Text className="self-start pt-3 font-semibold text-[10px]">
              (Mon to Sun 10:00 AM - 7:00 PM)
            </Text>
          </View>
        </View>
        <View className="border-lightgray border-b">
          <View className="flex-row my-2.5 items-center mx-5">
            <View className="pr-4">
              <ContactIcon height={45} width={45} fill={Colors.primary} />
            </View>
            <Text className="pl-4 border-[lightgray] border-l-2 text-[#575757] font-extrabold text-base">
              help@babyshopindia.com
            </Text>
          </View>
        </View>
        <View
          className="flex-row my-2.5 items-center mx-5">
          <View  className="pr-4">
            <ContactIcon height={45} width={45} fill={Colors.primary} />
          </View>
          <Text
            className="pl-4 border-[lightgray] border-l-2 text-[#575757] font-extrabold text-base">
            www.babyshopindia.com
          </Text>
        </View>
        <View 
        className='flex-row justify-center my-5'
          >
          <View
          className='border-[#A2A2A2] h self-center border w-24'
           ></View>
          <Text className='text-[#A2A2A2] font-bold text-xl'>
            {' '}
            OR{' '}
          </Text>
          <View
                      className='border-[#A2A2A2] h self-center border w-24'
                      ></View>
        </View>

        <Text className='self-center mb-5 w-80 text-center font-bold text-base'
          >
          just fill the form below and we'll get back to you as soon as
          possible.
        </Text>
        <View className='mx-5 mb-5'>
          <Input
            placeholder="Enter Name"
            value={name}
            onChangeText={newName => setName(newName)}
          />
          <Input
            placeholder="Enter Email"
            value={email}
            onChangeText={newName => setEmail(newName)}
          />
          <Input
            placeholder="Enter Subject"
            value={subject}
            onChangeText={newName => setSubject(newName)}
          />
          <Input
            placeholder="Enter Description"
            radius={10}
            height={100}
            value={description}
            onChangeText={newName => setDescription(newName)}
          />
          <PrimaryButton text="SUBMIT" />
        </View>
      </ScrollView>
    </View>
  );
};

export default ContactUsScreen;
