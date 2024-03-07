import React, { useState } from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, Input, PrimaryButton} from '../../components';
import {BackWhiteArrowIcon} from '../../assets/icon';
import {Dropdown} from 'react-native-element-dropdown';

const AddAddress = ({navigation}: any) => {
  // const[moreOption , setMoreOption] =useState(false)
  const [focus,setFocus] = useState({city:false , state:false,country:false,addressType:false})
  const address = {
    city:'',
    state:'',
    country:'',
    addressType:''
  }
  return (
    <View 
    className='bg-white flex-1'>
      <Header
        title="Add Address"
        iconLeft={
          <BackWhiteArrowIcon
            height={25}
            width={25}
            onPress={() => navigation.navigate('MyAddress')}
          />
        }
      />
      <View className='px-6 my-6'>
        <Input placeholder="Full Name" />
        <Input placeholder="Email" />
        <Input placeholder="Mobile Number" />
        <Input placeholder="Pin Code" />
        <View className='flex-row items-center justify-between'>
          <Dropdown
            style={[
              styles.dropDown,
              {borderColor: focus.city ? '#E97DAF' : '#F9F2EE'},
            ]}
            placeholderStyle={{color: focus.city ? 'black' : '#BDBDBD'}}
            selectedTextStyle={{color: focus.city ? 'black' : '#BDBDBD'}}
            data={[
              {
                label:'Rajkot',
                value:'Rajkot'
              },
              {
                label:'Mumbai',
                value:'Mumbai'
              },
              {
                label:'Ahemdabad',
                value:'Ahemdabad'
              },

            ]}
            placeholder="City"
            value={address.city}
            onChange={city => {
              address.city= city.value;
            }}
            labelField="label"
            valueField="value"
            onBlur={() => setFocus(prev =>({...prev , city:false}))}
            onFocus={() => setFocus(prev =>({...prev , city:true}))}
          />
          <Dropdown
            style={[
              styles.dropDown,
              {borderColor: focus.state ? '#E97DAF' : '#F9F2EE'},
            ]}
            placeholderStyle={{color: focus.state ? 'black' : '#BDBDBD'}}
            selectedTextStyle={{color: focus.state ? 'black' : '#BDBDBD'}}
            data={[
              {
                label:'Gujarat',
                value:'Gujarat'
              },
              {
                label:'Maharastra',
                value:'Maharastra'
              },
              {
                label:'Delhi',
                value:'Delhi'
              },

            ]}
            placeholder="State"
            value={address.state}
            onChange={state => {
              address.state= state.value;
            }}
            labelField="label"
            valueField="value"
            onBlur={() => setFocus(prev =>({...prev , state:false}))}
            onFocus={() => setFocus(prev =>({...prev , state:true}))}
          />
        </View>
        <Dropdown
            style={[
              styles.dropDown,
              {borderColor: focus.country ? '#E97DAF' : '#F9F2EE'},
              {width:'100%'}
            ]}
            placeholderStyle={{color: focus.country ? 'black' : '#BDBDBD'}}
            selectedTextStyle={{color: focus.country ? 'black' : '#BDBDBD'}}
            data={[
              {
                label:'India',
                value:'India'
              },
             

            ]}
            placeholder="Country"
            value={address.state}
            onChange={country => {
              address.country= country.value;
            }}
            labelField="label"
            valueField="value"
            onBlur={() => setFocus(prev =>({...prev , country:false}))}
            onFocus={() => setFocus(prev =>({...prev , country:true}))}
          />
        <Input placeholder="House No., Building Name" />
        <Input placeholder="Road Name , Area , Colony" />
        <Dropdown
            style={[
              styles.dropDown,
              {borderColor: focus.addressType ? '#E97DAF' : '#F9F2EE'},
              {width:'100%'}
            ]}
            placeholderStyle={{color: focus.addressType ? 'black' : '#BDBDBD'}}
            selectedTextStyle={{color: focus.addressType ? 'black' : '#BDBDBD'}}
            data={[
              {
                label:'Home',
                value:'Home'
              },
              {
                label:'Business',
                value:'Business'
              },
             

            ]}
            placeholder="Type of Address"
            value={address.state}
            onChange={addressType => {
              address.addressType= addressType.value;
              // setChilData();
            }}
            labelField="label"
            valueField="value"
            onBlur={() => setFocus(prev =>({...prev , addressType:false}))}
            onFocus={() => setFocus(prev =>({...prev , addressType:true}))}
          />

        <PrimaryButton text="SUBMIT" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropDown: {
    borderRadius: 100,
    borderWidth: 2,

    borderColor: '#E97DAF',
    paddingLeft: 20,
    paddingRight: 10,
    height: 50,
    width:'47%',
    marginBottom:20
  },
})
export default AddAddress;
