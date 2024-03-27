import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {Header} from '../../components';
import {BackWhiteArrowIcon} from '../../assets/icon';
import {Colors} from '../../utils';

const CatagoryScreen = ({navigation}:any) => {

    const onBackPress =() => {
        navigation.navigate("Dashboard")
    }

   

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

  return (
    <View className='flex-1 bg-white dark:bg-zinc-900'>
      <Header
        title="Categories"
        iconLeft={<BackWhiteArrowIcon fill={'white'} height={25} width={25} />}
        onBackPress={onBackPress}
      />

        <View className='mt-0 h-[210px]'>
          <Swiper activeDotColor='#E4097D'>
            <View className='flex-1'>
              <Image
               className='flex-1'
                source={{
                  uri: 'https://5.imimg.com/data5/SELLER/Default/2021/1/KD/AA/SH/120386859/baby-care-kit-500x500.jpg',
                }}
              />
            </View>
            <View className='flex-1'>
              <Image
               className='flex-1'
                source={{
                  uri: 'https://getfreedealz.com/wp-content/uploads/2024/01/Parachute-Advansed-Baby-Free-product-samples.jpg',
                }}
              />
            </View>
            <View className='flex-1'>
              <Image
               className='flex-1'
                source={{
                  uri: 'https://5.imimg.com/data5/SELLER/Default/2021/1/KD/AA/SH/120386859/baby-care-kit-500x500.jpg',
                }}
              />
            </View>
          </Swiper>
        </View>
        
      <View className='mx-4'>
        <FlatList
          numColumns={4} 
          className='my-2.5'
          data={catagoriesData}
          renderItem={({item}) => {
            return (
              <View className='my-2.5'>
                <TouchableOpacity style={styles.productWrapper}>
                  <View  className='rounded-full border-lightergray border-2'>

                  
                  <Image
                  className='rounded-full border-lightergray border-2'
                    source={{
                      uri: item.image,
                      height: 70,
                      width: 70,
                    }}
                  /></View>
                  <Text className='text-center text-[11px] mt-1.5 text-black dark:text-zinc-400 font-normal'>{item.imageCaption}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productWrapper: {
    alignItems: 'center',
    width: (Dimensions.get('window').width - 32) / 4,
  },
});

export default CatagoryScreen;
