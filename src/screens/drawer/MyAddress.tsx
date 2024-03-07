import React, {useCallback, useState} from 'react';
import {Header} from '../../components';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BackWhiteArrowIcon, MoreIcon, PlusIcon} from '../../assets/icon';
import {Colors} from '../../utils';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from 'react-native-popup-menu';

const MyAddress = ({navigation}: any) => {
  const [addressData, setAddressData] = useState([
    {
      id: '1',
      name: 'MARK JOHNSON',
      address:
        '401, Cosmo Complex, Mahila College Circle, Kalawad Rd, Rajkot, Gujarat 360001',
      mobile: '12345 67890',
      email: 'mark1998@gmail.com',
      home: true,
      moreOption: false,
    },
    {
      id: '2',
      name: 'MARK JOHNSON',
      address:
        '401, Cosmo Complex, Mahila College Circle, Kalawad Rd, Rajkot, Gujarat 360001',
      mobile: '12345 67890',
      email: 'mark1998@gmail.com',
      home: false,
      moreOption: false,
    },
  ]);
  const onMoreOptions = useCallback(
    (index: number) => {
      const newData = [...addressData];
      newData[index].moreOption = !newData[index].moreOption;
      setAddressData(newData);
    },
    [addressData],
  );
  return (
    <View className='flex-1 bg-white'>
      <Header
        title="My Address"
        iconLeft={
          <BackWhiteArrowIcon
            height={25}
            width={25}
            onPress={() => navigation.navigate('Account')}
          />
        }
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('Add Address')}
        className='bg-lightpink flex-row gap-2.5 py-2.5 pt-0 mt-0 items-center justify-center'>
        <PlusIcon height={25} width={25} />
        <Text className='text-base font-bold text-primary'>
          ADD A NEW ADDRESS
        </Text>
      </TouchableOpacity>
      <FlatList
        data={addressData}
        renderItem={({item, index}) => {
          return (
            <View className='py-2.5 px-5'>
              <View className='flex-row items-center justify-between'>
                <View className='flex-row gap-1.5 items-center'>
                  <Text className='text-base text-primary font-semibold'>
                    {item.name}
                  </Text>
                  {item.home ? (
                    <View className='flex-row justify-center items-center bg-white border-lightblue border-2 rounded-full px-2.5'
                      >
                      <Text className='text-center text-blue font-semibold text-[11px]'
                        >
                        Home
                      </Text>
                    </View>
                  ) : null}
                </View>
                <TouchableOpacity onPress={() => onMoreOptions(index)}>
                      <View>
                        <Menu>
                          <MenuTrigger>
                          <MoreIcon
                            height={20}
                            width={20}
                            fill={item.moreOption ? Colors.primary : '#979797'}
                          />
                          </MenuTrigger>
                          <MenuOptions  optionsContainerStyle={{  borderWidth: 1,padding:10,width:100,borderColor: '#bfbfbf', borderRadius: 5, marginTop: 30 }}   
                          customStyles={{ optionWrapper: { padding: 0 } }}>
                            <MenuOption
                              customStyles={{optionText: styles.textStyle}}
                              text="Edit"
                              key={'edit'}
                              onSelect={() => Alert.alert('Edit')}
                            />
                            <MenuOption
                              customStyles={{optionText: styles.textStyle}}
                              text="Remove"
                              key={'remove'}
                              onSelect={() => Alert.alert('Edit')}
                            />
                          </MenuOptions>
                        </Menu>
                      </View>
                  
                </TouchableOpacity>
              </View>
              <View>
                <Text className='w-[85%] text-[15px] font-medium text-darkgray'
                  >
                  {item.address}
                </Text>
                <Text className='color-lightgray text-[15px] font-medium'>
                  Mobile :{' '}
                  <Text className='text-base font-semibold color-darkgray'
                    >
                    +91 {item.mobile}
                  </Text>
                </Text>
                <Text className='color-lightgray text-[15px] font-medium'>
                  Email :{' '}
                  <Text className='text-base font-semibold color-darkgray'
                    >
                    {item.email}
                  </Text>
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
    zIndex: 100,
  },
});

export default MyAddress;
