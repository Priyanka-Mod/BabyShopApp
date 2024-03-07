import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header, PrimaryButton, SecondaryButton} from '../../components';
import {
  BackWhiteArrowIcon,
  ForwardButtonIcon,
  OfferIcon,
} from '../../assets/icon';
import {Colors} from '../../utils';
import {Dropdown} from 'react-native-element-dropdown';
import CheckBox from '@react-native-community/checkbox';
import {ProductDetailsType} from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const CheckoutScreen = ({route, navigation}: any) => {
  const {total, discount} = route.params;
  console.log(total, discount);
  const [Id, setId] = useState('');
  const [productCartData, setProductData] = useState<ProductDetailsType[]>();
  const [totalPrice , setTotalPrice] = useState(total)
  const [discountPrice , setDiscountPrice] = useState(discount)
  useEffect(() => {
    (async () => {
      try {
        // Alert.alert('useEffect Called!')
        const userData = await AsyncStorage.getItem('UserData');
        const userDataObj = JSON.parse(userData as string);
        setId(userDataObj.userData.uid);
        let docRef = firestore().collection('cartProducts').doc(Id);

        docRef.get().then(res => {
          if (res.exists) {
            // console.log('res: ', res.data());
            let productData: ProductDetailsType[] = res?.data()?.productData;
            // console.log('old data:', oldData);
            setProductData(productData);
          }
        });
      } catch (err) {
        console.log('error :', err);
      }
    })();
  }, [Id]);
  const [check, setCheck] = useState(false);
  const [paycheck, setPaycheck] = useState({cod: false, online: false});
  const updateQty = (index: number, qty: string) => {
    // let updatedProduct = [...productData]
    if (productCartData) {
      productCartData[index].qty = qty;

      // console.log(productCartData);

      let updatedData = {productData: productCartData};
      firestore().collection('cartProducts').doc(Id).update(updatedData);
      let total = 0;
      let discount=0;
      productCartData.forEach(products => {
      //  console.log(Number(products.actualPrice));
       
        total = (Number(products.qty) * Number(products.actualPrice)) + total
      // console.log("Total:",total);
      discount =( ((Number(products.actualPrice)) - (Number(products.productPrice)))  * (Number(products.qty))+ discount)
    })
    // console.log("discount:" , discount);
    
    setTotalPrice(total)
    setDiscountPrice(discount)
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Header
        title="Checkout"
        iconLeft={
          <BackWhiteArrowIcon
            height={25}
            width={25}
            onPress={() => navigation.navigate('Cart')}
          />
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="my-2.5 border-b-2 border-lightergray pb-5">
          <View className="mx-5">
            <View className="flex-row gap-2.5 items-center">
              <Text className="text-lg font-medium text-darkgray">
                MARK JOHNSON
              </Text>
              <View className="items-center">
                <View className="flex-row justify-center items-center border-lightblue border-2 rounded-full px-2.5">
                  <Text className="text-center text-blue font-semibold text-[11px]">
                    Home
                  </Text>
                </View>
              </View>
            </View>
            <View className="my-2.5">
              <Text className="w-[85%] text-[15px] font-semibold text-darkgray">
                401, Cosmo Complex, Mahila Collage Circle, Kalawad Rd, Rajkot,
                Gujarat 36001
              </Text>
              <Text className="text-[15px] text-lightgray font-normal my-1">
                Mobile :{' '}
                <Text className="text-base font-semibold text-darkgray">
                  +91 12345 67890
                </Text>
              </Text>
              <Text className="text-[15px] text-lightgray font-normal my-1">
                Email :{' '}
                <Text className="text-base font-semibold text-darkgray">
                  mark1998@gmail.com
                </Text>
              </Text>
            </View>

            <TouchableOpacity className="bg-white border-primary border-2 rounded-lg h-[38px] justify-center">
              <Text className="text-center text-primary font-bold text-base">
                CHANGE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={productCartData}
          renderItem={({item,index}) => {
            return (
              <View className="mb-2.5 border-b-2 border-lightergray pb-2.5">
                <View className="mx-5">
                  <View className="flex-row items-start justify-between">
                    <View className="py-2.5">
                      <Text className="text-black text-[15px] font-semibold mb-1.5 w-[280px]">
                        {item.productName}
                      </Text>
                      <Text className="text-[15px] text-lightgray font-normal">
                        Brand :{' '}
                        <Text className="text-[15px] font-semibold text-darkgray">
                          {item.brand}
                        </Text>
                      </Text>
                      <Text className="text-[15px] text-lightgray font-normal">
                        Size :{' '}
                        <Text className="text-[15px] font-semibold text-darkgray">
                          {item.size}
                        </Text>
                      </Text>
                      <Text className="text-[15px] text-lightgray font-normal">
                        Color :{' '}
                        <Text className="text-[15px] font-semibold text-darkgray">
                          White
                        </Text>
                      </Text>
                      <Text className="text-primary text-sm font-extrabold py-1">
                      
                        Rs. {Number(item.productPrice).toLocaleString('en-US')}.00{' '}
                        <Text className="text-lightgray text-xs line-through">
                          {' '}
                          {Number(item.actualPrice).toLocaleString('en-US')}.00
                        </Text>
                      </Text>
                    </View>
                    <View className="gap-y-2.5">
                      <View className="border-lightergray rounded-xl border-2">
                        <Image
                          className="rounded-xl"
                          source={{
                            uri: item.productUrl,
                            width: 80,
                            height: 80,
                          }}
                        />
                      </View>
                      <Dropdown
                      
                        style={{
                          borderColor: '#9ED4EE',
                          borderWidth: 2,
                          borderRadius: 5,
                          paddingHorizontal: 5,
                        }}
                        placeholder={item.qty}
                        data={[
                          {label: 'Qty:1', value: '1'},
                          {label: 'Qty:2', value: '2'},
                          {label: 'Qty:3', value: '3'},
                        ]}
                        value={item.qty}
                        onChange={qtyValue => updateQty(index, qtyValue.value) }
                        labelField={'label'}
                        valueField={'value'}
                      />
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />

        <View className="mb-2.5 border-b-2 border-lightergray pb-2.5">
          <View className="mx-5">
            <TouchableOpacity
              className="flex-row items-center gap-x-1.5"
              onPress={() => setCheck(!check)}>
              <CheckBox
                disabled={false}
                value={check}
                tintColors={{
                  true: Colors.primary,
                  false: '#e2e2e2',
                }}
                onValueChange={() => setCheck(!check)}
              />
              <Text className="text-black text-lg font-bold">Use wallet</Text>
            </TouchableOpacity>
            <Text className="pb-1.5 text-xs font-semibold text-lightgray pl-1">
              Available balance Rs. 1000/-
            </Text>
          </View>
        </View>
        <View className="mb-1.5 border-b-2 border-lightergray pb-2.5">
          <View className="mx-5">
            <Text className="font-extrabold mb-1.5 text-blue text-xl">
              Payment Type
            </Text>
            <View className="flex-row items-center gap-x-7">
              <TouchableOpacity
                className="flex-row items-center gap-x-1.5"
                onPress={() =>
                  setPaycheck(prev => ({...prev, cod: !paycheck.cod}))
                }>
                <CheckBox
                  disabled={false}
                  value={paycheck.cod}
                  tintColors={{
                    true: Colors.primary,
                    false: '#e2e2e2',
                  }}
                  onValueChange={value =>
                    setPaycheck(prev => ({...prev, cod: value}))
                  }
                />
                <Text className="text-black text-sm font-semibold">
                  Cash On Delivery
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row items-center gap-x-1.5"
                onPress={() =>
                  setPaycheck(prev => ({...prev, online: !paycheck.online}))
                }>
                <CheckBox
                  disabled={false}
                  value={paycheck.online}
                  tintColors={{
                    true: Colors.primary,
                    false: '#e2e2e2',
                  }}
                  onValueChange={value =>
                    setPaycheck(prev => ({...prev, online: value}))
                  }
                />
                <Text className="text-black text-sm font-semibold">
                  Online Payment
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="mx-5">
          <Text className="font-extrabold mb-1.5 text-blue text-xl">
            Price Details
          </Text>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-base font-semibold">Total price</Text>
              <Text className="text-base font-semibold">Total Discount</Text>
              {/* <Text  className='text-base font-semibold'>Coupon Code Discount</Text> */}
              <Text className="text-base font-semibold text-black">
                Grand Total
              </Text>
            </View>
            <View>
              <Text className="text-black text-base font-semibold">
                Rs.{Number(totalPrice).toLocaleString('en-US')}
              </Text>
              <Text className="text-black text-base font-semibold self-end">
                -Rs.{Number(discountPrice).toLocaleString('en-US')}
              </Text>
              {/* <Text  className='text-black text-base font-semibold self-end'>-Rs.30</Text> */}
              <Text className="text-primary text-base font-black">
                Rs.
                {(Number(totalPrice) - Number(discountPrice)).toLocaleString(
                  'en-US',
                )}
              </Text>
            </View>
          </View>
        </View>
        <View className="m-5">
          <PrimaryButton
            text="CHECKOUT"
            onPress={() => navigation.navigate('OrderPlaced')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CheckoutScreen;
