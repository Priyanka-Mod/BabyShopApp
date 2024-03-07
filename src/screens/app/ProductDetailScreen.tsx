import React from 'react';
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header, PrimaryButton, ProductCard, Star} from '../../components';
import {
  BackWhiteArrowIcon,
  CartIcon,
  ForwardButtonIcon,
} from '../../assets/icon';
import Swiper from 'react-native-swiper';
import {Colors} from '../../utils';
import {db} from '../../services/firebaseConfig';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {doc, getDoc, setDoc} from 'firebase/firestore';
import {ProductDetailsType} from '../../types';

const ProductDetailScreen = ({route, navigation}: any) => {
  const productData = route.params;
  console.log('selectedProduct : ', productData);

  const onReviewNav = () => {
    navigation.navigate('Review');
  };
  const onBackPress = () => {
    navigation.navigate('Dashboard');
  };
  const onQuePress = () => {
    navigation.navigate('QueAns');
  };
  const onCartPress = () => {
    navigation.navigate('Cart');
  };
  const addToCart = async (item: ProductDetailsType) => {
    const userData = await AsyncStorage.getItem('UserData');
    if (!userData) {
      Alert.alert('You need to login yourself first!');
      return false;
    }

    console.log('user:', userData);
    const userDataObj = JSON.parse(userData);

    let docRef = firestore()
      .collection('cartProducts')
      .doc(userDataObj.userData.uid);

    docRef.get().then(res => {
      if (res.exists) {
        console.log('res: ', res.data());
        let oldData = res?.data()?.productData;

        console.log('old data:', oldData);
        const checkOldData = oldData;
        const isExists = checkOldData.find(
          (data: ProductDetailsType) => data.id === item.id,
        );
        if (!isExists) {
          let updatedData = {productData: [...oldData, item]}; // update it on specific object key's value
          console.log('Updated cart: ', updatedData);

          firestore()
            .collection('cartProducts')
            .doc(userDataObj.userData.uid)
            .update(updatedData); //.update will take object or specific key's object value
        } else {
          Alert.alert('This product is already added in cart!');
        }
      } else {
        const productDetails = {
          _id: userDataObj.userData.uid,
          productData: [item],
        };
        console.log('new data created');

        setDoc(
          doc(db, 'cartProducts', userDataObj.userData.uid),
          productDetails,
        );
      }
    });
  };
  return (
    <View className="flex-1 bg-white">
      <Header
        title="Product Details"
        iconLeft={
          <BackWhiteArrowIcon height={25} width={25} onPress={onBackPress} />
        }
        rightIcon1={<CartIcon height={20} width={20} onPress={onCartPress} />}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="absolute top-2.5 right-2.5 rounded-full border-2 border-[#AAD5E8] z-10">
          <TouchableOpacity className="h-7 w-7 justify-center items-center">
            <Image
              className="h-4 w-4"
              source={require('../../assets/img/share.png')}
              tintColor={'#0685DB'}
            />
          </TouchableOpacity>
        </View>

        <View className="h-64 mt-0 border-b-2 border-lightergray">
          <Swiper activeDotColor="#E4097D">
            <View className="flex-1">
              <Image
                className="flex-1"
                style={styles.imageSwiperContainer}
                source={{
                  uri: productData.productSelected.productUrl,
                }}
              />
            </View>
            <View className="flex-1">
              <Image
                className="flex-1"
                style={styles.imageSwiperContainer}
                source={{
                  uri: 'https://images.mamaearth.in/catalog/product/b/o/body-wash_probs_ui8gwmtjnj2sahbz.jpg?fit=contain&height=600',
                }}
              />
            </View>
            <View className="flex-1">
              <Image
                className="flex-1"
                style={styles.imageSwiperContainer}
                source={{
                  uri: 'https://images.mamaearth.in/catalog/product/d/n/dnbw-4_l5ovudq8qlem0su0.jpg?fit=contain&height=600',
                }}
              />
            </View>
          </Swiper>
        </View>

        <View className="my-2.5 border-b-2 border-lightergray">
          <View className="mx-5">
            <View className="flex-row justify-between items-start">
              <Text className="text-xl w-[250px] font-normal text-black">
                {productData.productSelected.productName}
              </Text>
              <Image
                className="w-6 h-6"
                source={require('../../assets/img/heart.png')}
                tintColor={'#E71F2B'}
              />
            </View>
            <Text className="text-green my-1.5 text-[15px] font-semibold">
              In Stock (3 Items Left)
            </Text>

            <Star size={15} gap={1} value={3} />
            <View className="my-1.5 pb-2.5 flex-row items-center">
              <Text className="text-xl font-bold text-primary">
                {productData.productSelected.productPrice}{' '}
              </Text>
              <Text className="line-through font-semibold text-base text-lightgray">
                {productData.productSelected.actualPrice}{' '}
              </Text>
              <Text className="text-blue text-xl font-extrabold">
                {' '}
                {productData.productSelected.discount} OFF
              </Text>
            </View>
          </View>
        </View>

        <View className="my-2.5 border-b-2 border-lightergray">
          <View className="mx-5">
            <Text className="text-xl font-semibold text-darkgray">Size</Text>
            <View className="my-2.5 flex-row gap-x-2.5">
              <TouchableOpacity className="border-darkgray border-2 rounded-lg h-7 items-center px-[15px] justify-center">
                <Text className="text-black font-semibold text-base">50ml</Text>
              </TouchableOpacity>
              <TouchableOpacity className="border-lightblue border-2 rounded-lg h-7 items-center px-2.5 justify-center">
                <Text className="text-blue font-normal text-base">250ml</Text>
              </TouchableOpacity>
              <TouchableOpacity className="border-[#bbbbbb] border-2 rounded-lg h-7 items-center px-2.5 justify-center">
                <Text className="text-[#bbbbbb] text-base font-normal">
                  500ml
                </Text>
              </TouchableOpacity>
            </View>
            <Text className="my-1.5 text-xl font-semibold text-darkgray">
              Color
            </Text>
            <View className="flex-row my-1.5 gap-x-[15px]">
              <TouchableOpacity className="h-6 w-6 bg-[#0183b5] rounded-lg border-[#0183b5]"></TouchableOpacity>
              <TouchableOpacity className="h-6 w-6 bg-[#2CB300] rounded-lg border-[#2CB300]"></TouchableOpacity>
            </View>
            <View className="my-2.5 pb-2.5">
              <PrimaryButton text="ADD TO CART" onPress={() => addToCart(productData.productSelected)}/>
            </View>
          </View>
        </View>

        <View className="my-2.5 border-b-2 border-lightergray">
          <View className="mx-5">
            <View className="flex-row items-center my-1.5 justify-between">
              <Text className="text-xl font-semibold text-black">
                Description / Specification
              </Text>
              <Text className="text-sm font-extrabold text-primary">
                - Less
              </Text>
            </View>
            <Text className="text-[#a8a8a8] text-[15px] font-bold">
              KEY FEATURES
            </Text>
            <View className="my-1.5 pb-2.5">
              <Text className="text-[#b9b9b9] font-semibold">
                EN 71 certified walker
              </Text>
              <Text className="text-[#b9b9b9] font-semibold">
                Designed to turn into rocker
              </Text>
              <Text className="text-[#b9b9b9] font-semibold">
                comes with Brake Pads
              </Text>
              <Text className="text-[#b9b9b9] font-semibold">
                Designed to fold easily when not in use
              </Text>
            </View>
          </View>
        </View>

        <View className="my-1.5 border-b-2 border-lightergray">
          <View className="mx-5">
            <View className="my-1.5">
              <Text className="text-xl font-semibold text-black">
                Delivery & Return Policy
              </Text>
            </View>
            <View className="my-1.5 pb-2.5">
              <Text className="text-[#b9b9b9] font-semibold">
                We pack your items in a completely opaque thick brown cardboard
                box. We don't put any indication of product name iin the package
                on packaging box.
              </Text>
            </View>
          </View>
        </View>

        <View className="my-1.5 border-b-2 border-lightergray">
          <View className="mx-5">
            <View className="flex-row items-center justify-between">
              <Text className="text-black text-xl font-semibold">Reviews</Text>
              <ForwardButtonIcon
                height={18}
                width={18}
                fill={'#BFBFBF'}
                onPress={onReviewNav}
              />
            </View>

            <View className="my-2.5 flex-row gap-x-2.5">
              <View className="bg-lightpink rounded-full border-lightpink border w-[50px] h-[50px] items-center justify-center">
                <Text className="text-primary text-3xl font-semibold">M</Text>
              </View>
              <View>
                <Text className="text-base font-bold text-[#575757] mb-1.5">
                  Mark Johnson
                </Text>
                <Star size={15} gap={2} value={3} />
              </View>
            </View>
            <Text className="text-base w-[300px] font-semibold text-[#a4a4a4] pb-2.5">
              Good quality battery backup is good Supper product, My kid loves
              it.
            </Text>
          </View>
        </View>

        <View className="my-2.5 border-b-2 border-lightergray">
          <View className="mx-5">
            <View className="my-2.5 flex-row gap-x-2.5">
              <View className="rounded-full border-[transparent] border w-[50px] h-[50px] items-center justify-center">
                <Image
                  source={{
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoM8pM97yLHyPSgw08hWbRvhxaGZzDMGXXBssV0iNANNuBx-uiuroBJpx2yK5J3fyvdoE&usqp=CAU',
                  }}
                  height={50}
                  width={50}
                />
              </View>
              <View>
                <Text className="text-base font-bold text-[#575757] mb-1.5">
                  Mark Johnson
                </Text>
                <Star size={15} gap={2} value={3} />
              </View>
            </View>
            <Text className="text-base w-[300px] font-semibold text-[#a4a4a4] pb-2.5">
              Good quality battery backup is good Supper product, My kid loves
              it.
            </Text>
          </View>
        </View>

        <View className="my-2.5 border-b-2 border-lightergray">
          <View className="mx-5">
            <View className="flex-row items-center justify-between">
              <Text className="text-black text-xl font-semibold">
                Question & Answer
              </Text>
              <TouchableOpacity
                className="flex-row items-center gap-x-[15px]"
                onPress={onQuePress}>
                <Text className="text-primary text-sm font-extrabold">
                  Ask Question?
                </Text>
                <ForwardButtonIcon
                  height={18}
                  width={18}
                  fill={'#BFBFBF'}
                  onPress={onQuePress}
                />
              </TouchableOpacity>
            </View>
            <View className="my-2.5 border-b-2 border-lightergray pb-2.5">
              <Text className="font-semibold text-[#b7b7b7]">
                1) This body nourishing is safe for 4 month old baby?
              </Text>
              <Text className="font-extrabold text-[#424242]">
                A. Yes ,this is very safe.
              </Text>
            </View>
            <View style={{paddingBottom: 10}}>
              <Text className="font-semibold text-[#b7b7b7]">
                2) This body nourishing is safe for 4 month old baby?
              </Text>
              <Text className="font-extrabold text-[#424242]">
                A. Yes ,this is very safe.
              </Text>
            </View>
          </View>
        </View>

        <View className="my-1.5">
          <View className="mx-5">
            <Text className="text-#ea59a0 text-lg font-semibold">
              Similar Products
            </Text>
            <View className="my-2.5 flex-row gap-x-2.5">
              <ProductCard productData={productData} horizontal />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imageSwiperContainer: {
    resizeMode: 'contain',
  },
});

export default ProductDetailScreen;
