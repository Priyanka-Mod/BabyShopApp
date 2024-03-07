import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Image, Text, View} from 'react-native';
import {ErrorText, Header, PrimaryButton} from '../../components';
import {Colors} from '../../utils';
import {BackWhiteArrowIcon, DeleteIcon} from '../../assets/icon';
import {Dropdown} from 'react-native-element-dropdown';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProductDetailsType} from '../../types';

const Cart = ({navigation}: any) => {
  const [Id, setId] = useState('');
  const [productCartData, setProductData] = useState<ProductDetailsType[]>();
  const [totalPrice , setTotalPrice] = useState(0)
  const [discountPrice , setDiscountPrice] = useState(0)

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
            let oldData :ProductDetailsType[]  = res?.data()?.productData;

            // console.log('old data:', oldData);
            setProductData(oldData);
            let total = 0;
            let discount = 0;
            oldData.forEach(products => {
             
              total = (Number(products.qty) * Number(products.actualPrice)) + total
              discount =( ((Number(products.actualPrice)) - (Number(products.productPrice)))  * (Number(products.qty))+ discount)
              
              
            })
            
            setTotalPrice(total)
            setDiscountPrice(discount)
            
          }
        });
      } catch (err) {
        console.log('error :', err);
      }
    })();
  }, [Id]);

  const deleteProduct = (item: ProductDetailsType) => {
    // console.log('item:', item.id);
    const deletedData = productCartData?.filter(data => data.id !== item.id);
    firestore()
      .collection('cartProducts')
      .doc(Id)
      .update({productData: deletedData});

    setProductData(deletedData);
    let total = 0;
    let discount =0 ;
    deletedData?.forEach(products => {
    //  console.log(Number(products.actualPrice));
     
      total = (Number(products.qty) * Number(products.actualPrice)) + total
    // console.log("Total:",total);

    discount =( ((Number(products.actualPrice)) - (Number(products.productPrice)))  * (Number(products.qty))+ discount)
  })
  // console.log("discount:" , discount);
  
  setTotalPrice(total)
  setDiscountPrice(discount)

  };

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
        title="Cart"
        iconLeft={
          <BackWhiteArrowIcon
            width={25}
            height={25}
            fill={'white'}
            onPress={() => navigation.navigate('Drawer')}
          />
        }
      />

      {productCartData?.length ? (
        <View className='flex-1'>
          <FlatList
            keyExtractor={(item) => item.id}
            data={productCartData}
            scrollEnabled
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom:210}}
            renderItem={({item, index}) => {
              return (
                <View className="my-5 border-b border-lightergray pb-1.5">
                  <View className="mx-4 flex-row gap-x-[25px] pb-2.5 ml-0">
                    <View className="gap-y-5">
                      <View className="border-lightergray rounded-xl border-2">
                        <Image
                          className="rounded-xl"
                          style={{resizeMode: 'center'}}
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
                        placeholder="Qty : 1"
                        data={[
                          {label: 'Qty : 1', value: '1'},
                          {label: 'Qty : 2', value: '2'},
                          {label: 'Qty : 3', value: '3'},
                        ]}
                        value={item.qty}
                        onChange={qtyValue => updateQty(index, qtyValue.value)}
                        labelField={'label'}
                        valueField={'value'}
                      />
                    </View>
                    <View className="flex-row items-start justify-between">
                      <View>
                        <Text className="text-black text-[15px] font-medium mb-1.5 w-[220px]">
                          {item.productName}
                        </Text>
                        <Text className="text-[#b0b0b0] text-[15px]">
                          Brand :{' '}
                          <Text className="text-[15px] font-medium text-darkgray">
                            {item.brand}
                          </Text>
                        </Text>
                        <Text className="text-[#b0b0b0] text-[15px]">
                          Size :{' '}
                          <Text className="text-[15px] font-medium text-darkgray">
                            {item.size}
                          </Text>
                        </Text>
                        <Text className="text-[#b0b0b0] text-[15px]">
                          Color :{' '}
                          <Text className="text-[15px] font-medium text-darkgray">
                            White
                          </Text>
                        </Text>
                        <Text className="text-primary text-sm font-extrabold pt-2">
                        {Number(item.productPrice).toLocaleString('en-US')}.00{' '}
                          <Text className="text-lightgray text-xs line-through">
                            {' '}
                            {Number(item.actualPrice).toLocaleString('en-US')}.00
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <DeleteIcon
                      height={20}
                      width={20}
                      fill={'#bfbfbf'}
                      onPress={() => deleteProduct(item)}
                    />
                  </View>
                </View>
              );
            }}
          />

          <View className="absolute bottom-0 p-5 w-full bg-lightpink ">
            <Text className="font-extrabold mb-1.5 text-primary text-lg">
              Price Details
            </Text>
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-base font-medium">Total price</Text>
                <Text className="text-base font-medium">Total Discount</Text>
                <Text className="text-base font-medium text-black">
                  Grand Total
                </Text>
              </View>
              <View>
                <Text className="text-black text-base font-medium">
                  Rs.{Number(totalPrice).toLocaleString('en-US')}
                </Text>
                <Text className="text-black text-base font-medium ">
                  -Rs.{Number(discountPrice).toLocaleString('en-US')}
                </Text>
                <Text className="text-primary text-base font-black">
                  Rs.{(Number(totalPrice) - Number(discountPrice)).toLocaleString('en-US')}
                </Text>
              </View>
            </View>
            <View className="pt-5">
              <PrimaryButton
                text="PROCEED"
                onPress={() => navigation.navigate('Checkout',{total:totalPrice,discount:discountPrice})}
              />
            </View>
          </View>
        </View>
      ) : (
        <View>
          <Text className="text-[#ff0000] text-center m-5 font-semibold text-xl">
            No products added in cart
          </Text>
        </View>
      )}
    </View>
  );
};

export default Cart;
