import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Header, Input, PrimaryButton, Star} from '../../components';
import {BackWhiteArrowIcon} from '../../assets/icon';

const Review = ({navigation}: any) => {
  const [focus, setFocus] = useState(false);
  const [value,setValue] = useState(0);
  const [review,setReview] = useState('')

  return (
    <View className='flex-1 bg-white'>
      <Header
        title="Write Review"
        iconLeft={
          <BackWhiteArrowIcon
            height={25}
            width={25}
            onPress={() => navigation.navigate('OrderDetails')}
          />
        }
      />
      <View className='m-5'>
        <View className='flex-row gap-5 items-center mb-5'>
          <View className='border-2 border-lightergray rounded-xl'>
            <Image className='rounded-xl '
             
              source={{
                uri: 'https://images.mamaearth.in/catalog/product/d/n/dnbw-1_hfoavdvwmgs9qmxd_white_bg.jpg?fit=contain&height=600',
                width: 80,
                height: 80,
              }}
            />
          </View>

          <Text className='text-black text-[15px] mb-1.5 font-medium'>
            Deeply Nourishing Body Wash....
          </Text>
        </View>
        <Input value="Mark Johnson" />
        <Input value="mark1998@gmail.com" />
        <View className='items-start px-5 bg-white border-2 mb-5 rounded-xl align-top
                           border-[#F9F2EE]'>
          <Text className='my-2.5'>Rating</Text>
          <View className='pb-2.5'>
            <Star 
            value={value}
            onChange={(value) => setValue(value)}/>
          </View>
        </View>
        <Input
          placeholder="Review"
          value={review}
          placeholderTextColor={'#B7B7B7'}
          height={80}
          radius={10}
          onChangeText={reviewText => setReview(reviewText)}
        />
        <PrimaryButton text="SUBMIT" onPress={() => {
            navigation.navigate("OrderDetails",{review:review,value:value})
        }}/>
      </View>
    </View>
  );
};

export default Review;
