import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BackArrowIcon,
  BackWhiteArrowIcon,
  BellIcon,
  CartIcon,
  ForwardButtonIcon,
  MenuIcon,
  UserIcon,
} from '../../assets/icon';
import {Header, Layout, ProductCard, SecondaryButton, Star} from '../../components';

import Swiper from 'react-native-swiper';
import {Colors} from '../../utils';
import { DrawerActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import AsyncStorageService from '../../services/asyncStorageService';
import { useAuth } from '../../services/useContextService';

const HomeScreen = ({navigation}: any) => {
  const {setUser} = useAuth();

  const init = useCallback(async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('tokenLogIn=> ',token);
    getDoc(doc(db, 'user', token!)) // getDoc to get document data from doc record having db storage named user having particular id
    .then(async docSnap => {
      // gives all stored data from database
      if (docSnap.exists()) {
        console.log('User Data:', docSnap.data());
        // await AsyncStorage.setItem(
        //   'UserData',
        //   JSON.stringify(docSnap.data()),
        // );
        setUser(docSnap.data())
        
      }
    }).catch(err => console.log(err)
    )
    },[])
    
    useEffect(() => {
      init();
    }, [init]);
   

  const productData = [
    {
      id: '7',
      productUrl:
        'https://content.jdmagicbox.com/quickquotes/images_main/r-for-rabbit-baby-walker-01-10-2021-101-240989852-1uk2z.jpg?impolicy=queryparam&im=Resize=(360,360),aspect=fit',
      productName: 'R for Rabbit Ringa Ringa Rocking Baby Walker',
      productPrice: '4139',
      actualPrice: '4599',
      discount:'-10%',
      fav:false,
      brand:'Rabbit',
      qty:1
    },
    {
      id: '8',
      productUrl:
        'https://m.media-amazon.com/images/I/61yHEifanlL.jpg',
      productName: 'R for Rabbit Ringa Ringa Rocking Baby Walker',
      productPrice: '4139',
      actualPrice: '4599',
      discount:'-10%',
      fav:false,
      brand:'Rabbit',
      qty:1

    },
    {
      id: '9',
      productUrl:
        'https://m.media-amazon.com/images/I/61yHEifanlL.jpg',
      productName: 'R for Rabbit Ringa Ringa Rocking Baby Walker',
      productPrice: '4139',
      actualPrice: '4599',
      discount:'-10%',
      fav:false,
      brand:'Rabbit',
      qty:1

    },
    {
      id: '10',
      productUrl:
        'https://content.jdmagicbox.com/quickquotes/images_main/r-for-rabbit-baby-walker-01-10-2021-101-240989852-1uk2z.jpg?impolicy=queryparam&im=Resize=(360,360),aspect=fit',
      productName: 'R for Rabbit Ringa Ringa Rocking Baby Walker',
      productPrice: '4139',
      actualPrice: '4599',
      discount:'-10%',
      fav:false,
      brand:'Rabbit',
      qty:1

    },
  ];

  const catagoryNavigation = () => {
    navigation.navigate('Caterogy');
  };

  const navigateBrands = () => {
    navigation.navigate('Brands');
  };

  const catagoriesData = [
    {
      image:
        'https://softsensbaby.com/cdn/shop/files/babycare.jpg?v=1615796924',
      imageCaption: 'Bath & Skin Care',
    },

    {
      image:
        'https://cdn.fcglcdn.com/brainbees/images/products/583x720/14036240a.webp',
      imageCaption: 'Baby Gear',
    },

    {
      image: 'https://miro.medium.com/v2/resize:fit:700/0*iwV_e9RuH5uOJz6K',
      imageCaption: 'Feeding & Nursing',
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr0_8B1XS-K8TBd87lCcPFT_ECKgP-ndMWo_LM4bk_FA&s',
      imageCaption: 'Toys',
    },
    {
      image:
        'https://i0.wp.com/lovevery-blog.com/wp-content/uploads/2023/01/20211021_BFCM_1953_BLOG_web.jpg?fit=2048%2C1214&ssl=1',
      imageCaption: 'Nursery',
    },
    {
      image:
        'https://5.imimg.com/data5/SELLER/Default/2023/8/334956525/PU/YQ/JK/74695551/baby-care-kit-10-pcs-500x500.jpg',
      imageCaption: 'Health & Safety',
    },
    {
      image:
        'https://5.imimg.com/data5/SELLER/Default/2022/3/OG/XU/UY/144220430/pampers-baby-diaper.jpg',
      imageCaption: 'Diapering',
    },
    {
      image:
        'https://img.freepik.com/premium-vector/baby-sitting-is-crib_9512-60.jpg',
      imageCaption: 'Cots & Cradles',
    },
  ];

  const brands = [
    {
      image:
        'https://halomama.com/cdn/shop/collections/Chicco_logo.svg_00fa772b-9f7b-475d-a587-e13b54a6f628_1200x1200.png?v=1655260998',
    },
    {
      image:
        'https://brandstruck.co/wp-content/uploads/2016/09/Johnsons-logo.png',
    },
    {
      image:
        'data:image/png;base64,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',
    },
    {
      image:
        'https://media.licdn.com/dms/image/C4E12AQF4q1jmCk3Ufg/article-cover_image-shrink_600_2000/0/1520122153965?e=2147483647&v=beta&t=itfB6J5YZfJgv6wvDnX3Odzke1uvQ5jujHLz7ZLovxo',
    },
    {
      image:
        'https://www.graphream.com/upload/case_studies/case_study_img094594ee8d7fe4e911f6039bb4342b131644919485.jpg',
    },
    {
      image:
        'https://w7.pngwing.com/pngs/290/730/png-transparent-discounts-and-allowances-retail-shopping-centre-mothercare-mother-care-blue-text-trademark-thumbnail.png',
    },
    {
      image:
        'https://himalayawellness.in/cdn/shop/files/orange-leaf-logo-1200x600.jpg?v=1662006119',
    },
    {
      image: 'https://www.yaap.in/static/images/case-studies/moms/moms1.jpg',
    },
  ];

  const onCategoryPress = () => {
    navigation.navigate("BathCare")
  }


  const renderHeaderComponent = () => {
    return (
      <>
        <View className='h-52 mt-0'>
          <Swiper activeDotColor="#E4097D">
            <View className='flex-1' >
              <Image
              className='flex-1'
                source={{
                  uri: 'https://scontent-bom1-2.xx.fbcdn.net/v/t1.6435-9/59697289_2286407284758210_1163771146047324160_n.jpg?stp=dst-jpg_p526x296&_nc_cat=108&ccb=1-7&_nc_sid=7f8c78&_nc_ohc=UpRG6emNjXsAX-6n7UJ&_nc_ht=scontent-bom1-2.xx&oh=00_AfClAISNkHTSUhfvCR4cO3oB4rqRE0pSHecRTx6KtseMQg&oe=65F695B9',
                }}
              />
            </View>
            <View className='flex-1' >
              <Image
               className='flex-1'
                source={{
                  uri: 'https://getfreedealz.com/wp-content/uploads/2024/01/Parachute-Advansed-Baby-Free-product-samples.jpg',
                }}
              />
            </View>
            <View className='flex-1' >
              <Image
                className='flex-1'
                source={{
                  uri: 'https://5.imimg.com/data5/SELLER/Default/2021/1/KD/AA/SH/120386859/baby-care-kit-500x500.jpg',
                }}
              />
            </View>
          </Swiper>
        </View>
        <View className='my-2.5 mx-5' >
          <View className='flex-row justify-between items-center'>
            <Text className='text-xl font-semibold text-primary'>Categories</Text>
            <ForwardButtonIcon
              height={15}
              width={15}
              fill={'#BCBCBC'}
              onPress={catagoryNavigation}
            />
          </View>
        </View>
      </>
    );
  };

  const renderFooterComponent = () => {
    return (
      <>
        <View className='bg-lightpink'>
          <View className='my-2.5 mx-5'>
            <View className='flex-row justify-between items-center'>
              <Text className='text-xl font-semibold text-primary'>Brands</Text>
              <ForwardButtonIcon
                height={15}
                width={15}
                fill={'#BCBCBC'}
                onPress={navigateBrands}
              />
            </View>
            <FlatList
              numColumns={4}
              className='ml-0 my-2.5'
              
              data={brands}
              renderItem={({item}) => {
                return (
                  <View className='ml-0 my-2.5'>
                    <TouchableOpacity className='items-center' style={styles.productWrapper}>
                      <Image className='rounded-full border border-transparent'
                        
                        source={{
                          uri: item.image,
                          height: 70,
                          width: 70,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </View>

        <View className='my-2.5 mx-5'>
          <Text className='text-xl font-semibold text-primary'>Trending</Text>
          <ProductCard productData={productData}/>
        </View>
      </>
    );
  };
  const onCartPress = () => {
    navigation.navigate("Cart")
  }
  return (
    <View>
      <Header
        title="Dashboard"
        iconLeft={<MenuIcon fill={'white'} height={25} width={25} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>}
        
        rightIcon1={<CartIcon height={18} width={20} fill={'white'} onPress={onCartPress} />}
        rightIcon2={<BellIcon height={25} width={25} fill={'white'} onPress={() => navigation.navigate('Notification')}/>}
      />
      <View className='bg-white'>
        <FlatList
          scrollEnabled 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerpadding}
          numColumns={4}
          ListHeaderComponent={() => renderHeaderComponent()}
          data={catagoriesData}
          renderItem={({item}) => {
            return (
              <View className='ml-2 my-2.5'>
                <TouchableOpacity className='items-center' style={styles.productWrapper} onPress={onCategoryPress}>
                  <Image
                    className='rounded-full border border-transparent'
                    source={{
                      uri: item.image,
                      height: 70,
                      width: 70,
                    }}
                  />
                  <Text className='text-center text-[11px] mt-1 text-black font-normal' >{item.imageCaption}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
          ListFooterComponent={() => renderFooterComponent()}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  contentContainerpadding:{paddingBottom: 100},
  productWrapper: {
    width: (Dimensions.get('window').width - 32) / 4,
  },
});
export default HomeScreen;
