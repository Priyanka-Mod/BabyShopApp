import React, { useCallback, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SecondaryButton, Star } from '.';
import { Colors } from '../utils';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import firestore from '@react-native-firebase/firestore';
import { ProductDetailsType } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../services/useContextService';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';

type ProductDetailScreenParams = {
  productSelected: ProductDetailsType;
};

type StackParamList = {
  ProductDetail: ProductDetailScreenParams;
  // Add other screens if you have them in your stack
};
type ProductCard = {
  productData: any;
  addToCart?: boolean;
  horizontal?: boolean;
  scrollToTop?: () => void;
};
export const ProductCard = ({
  productData,
  addToCart = false,
  horizontal = false,
  scrollToTop
}: ProductCard,) => {
  // //console.log(addToCart);
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const navigateProductDetail = (item: ProductDetailsType) => {
    navigation.navigate('ProductDetail', { productSelected: item });
  };
  const [data, setData] = useState(productData);
  const [value, setValue] = useState(3);
  const [modal, setModal] = useState(false);
  const { user } = useAuth();
  //console.log("data:", data);
  const onFavClick = useCallback(
    (index: number) => {
      const newData = [...data];
      newData[index].fav = !newData[index].fav;
      setData(newData);
    },
    [data],
  );
  //   const addToFav = (id:string,productIndex:number) => {
  //     //console.log(id,productIndex);
  //     for(let [index,data] of productData.entries()){
  //       // //console.log('value: ' , data , "index:" , index)
  //       if(productIndex === index){
  //       //console.log('value: ' , data , "index:" , index)
  //         // setIsFav(!isFav)
  //       }
  //     }

  // }

  const onScroll = () => {
    if (scrollToTop)
      scrollToTop()
  }
  const onAddToCart = async (item: ProductDetailsType) => {
    const userDetails = user
    const userData = userDetails?.userData
    if (!userData) {
      setModal(true)
      // Alert.alert('You need to login yourself first!');
      return false;
    }

    //console.log('user:', userData);
    // const userDataObj = JSON.parse(userData);

    let docRef = firestore()
      .collection('cartProducts')
      .doc(userData.uid);

    docRef.get().then(res => {
      if (res.exists) {
        //console.log('res: ', res.data());
        let oldData = res?.data()?.productData;

        //console.log('old data:', oldData);
        const checkOldData = oldData;
        const isExists = checkOldData.find((data: ProductDetailsType) => data.id === item.id);
        if (!isExists) {
          let updatedData = { productData: [...oldData, item] }; // update it on specific object key's value
          //console.log('Updated cart: ', updatedData);

          firestore()
            .collection('cartProducts')
            .doc(userData.uid)
            .update(updatedData); //.update will take object or specific key's object value

          Alert.alert("Item added successfully")

        } else {
          Alert.alert('This product is already added in cart!');
        }
      } else {

        const productDetails = {
          _id: userData.uid,
          productData: [item],
        };
        //console.log('new data created', userData.uid);
        //console.log('Product details : ', productDetails)

        setDoc(
          doc(db, 'cartProducts', userData.uid),
          productDetails,
        );

      }
    });
  };
  return (

    <View className="px-0">
      <FlatList
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        numColumns={horizontal ? 0 : 2}
        data={data}
        renderItem={({ item, index }) => {
          return (
            <Animated.View entering={FadeInDown.delay(index * 100).duration(1000).springify().damping(10)}>

              <View className="my-2.5">
                <View className="absolute top-2 z-10 right-5 ">
                  <SecondaryButton text={item.discount} paddingHorizontal={8} />
                </View>
                <TouchableOpacity
                  onPress={() => { navigateProductDetail(item), onScroll() }}
                  className="items-center"
                  style={styles.productImageContainer}>
                  <View className="border-lightergray border bg-white rounded-t-2xl">
                    <Image
                      className="p-0 m-0"
                      style={{
                        resizeMode: 'cover',
                      }}
                      source={{
                        uri: item.productUrl,
                        height: 140,
                        width: 160,
                      }}
                    />
                  </View>
                  <View className="border border-lightergray dark:border-zinc-800 w-[160px] bg-white dark:bg-zinc-800 rounded-b-2xl">
                    <View className="flex-row items-start p-1.5 justify-evenly">
                      <Text className="w-[74%] text-[9px] font-black text-darkgray dark:text-zinc-400">
                        {item.productName}
                      </Text>
                      <TouchableOpacity onPress={() => onFavClick(index)}>
                        <Image
                          source={require('../assets/img/heart.png')}
                          className="h-3.5 w-3.5"
                          style={[
                            styles.favImage,
                            { tintColor: item.fav ? 'red' : '#e2e2e2' },
                          ]}
                        />
                      </TouchableOpacity>
                    </View>

                    <View className="px-3.5">
                      <Star value={value} size={12} gap={3} />
                      <View className='flex-row items-center pt-1'>
                        <Text
                          className="text-primary dark:text-pink-500 font-bold text-xs mr-0"
                        >Rs. {Number(item.productPrice).toLocaleString('en-US')}.00 </Text>
                        <Text className="text-[9px] font-bold text-[#bdbdbd] line-through decoration-gray">Rs.{Number(item.actualPrice).toLocaleString('en-US')}.00
                        </Text>

                      </View>
                      <View style={{
                        borderColor: addToCart
                          ? '#bfbfbf'
                          : 'transparent',
                        borderWidth: 0.5,
                      }} className='w-full mt-2' />
                    </View>
                    {addToCart ? (
                      <TouchableOpacity
                        className="my-1.5 self-center"
                        onPress={() => onAddToCart(item)}>
                        <Text className="text-blue text-base font-bold">
                          ADD TO CART
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </TouchableOpacity>
              </View>
            </Animated.View>
          );
        }}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modal}
        onRequestClose={() => setModal(false)}>
        <View className='bg-black opacity-50 flex-1' />
        <View className='bg-white w-full h-[180px] items-center p-2.5 pt-4 gap-5 ml-0 pl-0'>
          <Text className='text-xl'>You need to log in yourself first!</Text>
          <View className='flex-row w-[50%] justify-between'>
            <TouchableOpacity className='p-2' onPress={() => setModal(false)}>
              <Text className='text-base text-zinc-700 font-bold'>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity className='p-2' onPress={() => {
              navigation.navigate('AuthStack')
              setModal(false)
            }}>
              <Text className='text-base text-blue font-bold'>LogIn</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  productImageContainer: {
    width: (Dimensions.get('window').width / 2) - 10,
    alignItems: 'center'
  },
  favImage: { resizeMode: 'contain' },
});
