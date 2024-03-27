import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Header, ProductCard} from '../../components';
import {BackArrowIcon, BackWhiteArrowIcon, CartIcon} from '../../assets/icon';
import {Colors} from '../../utils';
import Animated, { FadeInDown } from 'react-native-reanimated';

const BathCareScreen = ({navigation}: any) => {
  const bathSkinCareProducts = [
    {
      id: '1',
      productUrl:
        'https://images.mamaearth.in/catalog/product/d/n/dnbw-1_hfoavdvwmgs9qmxd_white_bg.jpg?fit=contain&height=600',
      productName: 'Deeply Nourishing Body Wash',
      productPrice: '4139',
      actualPrice: '4599',
      discount: '-10%',
      size:'500ml',
      brand:'Mamaearth',
      qty:1
    },
    {
      id: '2',
      productUrl: 'https://m.media-amazon.com/images/I/51bbFLQbsBL.jpg',
      productName: 'All We Know Baby Bubble Bath ',
      productPrice: '379',
      actualPrice: '459',
      discount: '-5%',
      size:'200ml',
      brand:'Mamaearth',
      qty:1

    },
    {
      id: '3',
      productUrl:
        'https://www.chicco.in/dw/image/v2/BGMM_PRD/on/demandware.static/-/Sites-chicco-master/default/dwe073c429/combo/grpcd042.png?sw=800&sh=800&sm=fit',
      productName: 'Deeply Nourishing Chicco Body Wash',
      productPrice: '4139',
      actualPrice: '4599',
      discount: '-10%',
      size:'500ml',
      brand:'Chicco',
      qty:1

    },
    {
      id: '4',
      productUrl:
        'https://www.jiomart.com/images/product/original/491334908/chicco-baby-moments-no-tears-shampoo-500-ml-product-images-o491334908-p590106051-0-202203150239.jpg?im=Resize=(1000,1000)',
      productName: 'Chicco Baby Moments no-tears Shampoo',
      productPrice: '499',
      actualPrice: '599',
      discount: '-5%',
      size:'500ml',
      brand:'Chicco',
      qty:1

    },
    {
        id: '5',
        productUrl:
          'https://images.mamaearth.in/catalog/product/d/n/dnbw-1_hfoavdvwmgs9qmxd_white_bg.jpg?fit=contain&height=600',
        productName: 'Deeply Nourishing Body Wash',
        productPrice: '4139',
        actualPrice: '4599',
        discount: '-10%',
        brand:'Mamaearth',
        size:'500ml',
      qty:1

      },
      {
        id: '6',
        productUrl: 'https://m.media-amazon.com/images/I/51bbFLQbsBL.jpg',
        productName: 'All We Know Baby Bubble Bath ',
        productPrice: '379',
        actualPrice: '459',
        discount: '-5%',
        brand:'Mamaearth',
        size:'200ml',
        qty:1

      },
      {
        id: '7',
        productUrl:
          'https://www.chicco.in/dw/image/v2/BGMM_PRD/on/demandware.static/-/Sites-chicco-master/default/dwe073c429/combo/grpcd042.png?sw=800&sh=800&sm=fit',
        productName: 'Deeply Nourishing Chicco Body Wash',
        productPrice: '4139',
        actualPrice: '4599',
        discount: '-10%',
        brand:'Chicco',
        size:'500ml',
      qty:1

      },
      {
        id: '8',
        productUrl:
          'https://www.jiomart.com/images/product/original/491334908/chicco-baby-moments-no-tears-shampoo-500-ml-product-images-o491334908-p590106051-0-202203150239.jpg?im=Resize=(1000,1000)',
        productName: 'Chicco Baby Moments no-tears Shampoo',
        productPrice: '499',
        actualPrice: '599',
        discount: '-5%',
        brand:'Chicco',
        size:'500ml',
      qty:1

      },
  ];

  const onBackPress = () => {
    navigation.navigate('Dashboard');
  };
  const onSortBy = () => {
    navigation.navigate("Sortby")
  }
  const onFilter = () => {
    navigation.navigate("Filter")
  }
  const onCartPress = () => {
    navigation.navigate("Cart")
  }
  return (
    <View className='bg-[#f9f9f9] dark:bg-zinc-900 flex-1'>
      <Header
        title="Bath & Skin Care "
        iconLeft={
          <BackWhiteArrowIcon height={25} width={25}  />
        }
        onBackPress={onBackPress}
        rightIcon1={<CartIcon height={20} width={20} />}
        onPressRightIcon={onCartPress}
      />
      <View className='bg-white dark:bg-zinc-800 flex-row items-center py-1.5 mt-5 w-[350px] self-center rounded-full justify-center
      border-[#f2f2f2] dark:border-zinc-700 border-2'>        
        <TouchableOpacity className='pl-0 border-[#f2f2f2] border-r-2 w-[50%] flex-row items-center justify-center gap-x-5 self-center'
         
          onPress={onSortBy}
          >
          <Image 
            source={require('../../assets/img/sort.png')}
            style={styles.logoStyle}
            className='h-5 w-5'
          />
          <Text className='font-medium text-xl text-[#404040] dark:text-zinc-300'>
            Sort By
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
         onPress={onFilter}
         className='border-[#f2f2f2] w-[50%] flex-row items-center justify-center gap-x-5 self-center'
          >
          <Image
            source={require('../../assets/img/filter.png')}
            style={styles.logoStyle}
            className='h-5 w-5'
          />
          <Text className='font-medium text-xl text-[#404040] dark:text-zinc-300'>
            Filter
          </Text>
        </TouchableOpacity>
      </View>
      <View className='my-2.5 mb-[150px] items-center'>
        <ProductCard productData={bathSkinCareProducts} addToCart/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoStyle:{ tintColor: Colors.primary},

});
export default BathCareScreen;
