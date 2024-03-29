import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {
  ErrorText,
  Input,
  Layout,
  PrimaryButton,
  Header,
} from '../../components';
import {
  BackArrowIcon,
  BackWhiteArrowIcon,
  CalendarIcon,
  CameraIcon,
  CrossIcon,
  FacebookIcon,
  GalleryIcon,
  GoogleIcon,
  PlusIcon,
} from '../../assets/icon';
import { Colors } from '../../utils';
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import VerifyMobileScreen from './VerifyMobileScreen';
import { parsePhoneNumber } from 'libphonenumber-js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../services/firebaseConfig';
import * as ImagePicker from 'react-native-image-picker';
import { setDoc, doc, loadBundle } from 'firebase/firestore';
import storage from '@react-native-firebase/storage';

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

/* toggle includeExtra */
const includeExtra = true;

const actions: Action[] = [
  {
    title: 'Take Image',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Select Image',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
];

const RegisterScreen = ({ navigation }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userData, setUserData] = useState<{
    userImage: string, name: string, email: string, number: string, password: string, childData:
    [{ id: string, imagePath: string | undefined, childName: string, genderValue: string, birthDate: Date }]
  }>({
    userImage: '',
    name: '',
    email: '',
    number: '',
    password: '',
    childData: [
      {
        id: Math.random().toString(),
        imagePath: '',
        childName: '',
        genderValue: '',
        birthDate: new Date(),
      },
    ],
  });
  const [modal, setModal] = useState(false);
  const [parentModal, setParentModal] = useState(false);
  const [uri, setUri] = useState<any>();
  const [selectDate, setSelectDate] = useState(false);
  const [genderValue, setGenderValue] = useState('');
  const [focus, setFocus] = useState(false);
  const [error, setError] = useState('');

  const changeUserData = (key: string, value: string) => {
    setUserData(prev => ({ ...prev, [key]: value }));
  };
  const [response, setResponse] = React.useState<any>(null);
  const setChildData = () => {
    setUserData(oldValue => {
      return {
        ...oldValue,
        userData: userData.childData,
      };
    });
  };
  const onButtonPress = React.useCallback(async (type: any, options: any) => {
    if (type === 'capture') {
      const result = await ImagePicker.launchCamera(options, setResponse);
      setUri(result.assets ? result.assets[0].uri : null); //if user close the screen without selecting any image handle that case
    } else {
      const result = await ImagePicker.launchImageLibrary(options, setResponse);
      setUri(result.assets ? result.assets[0].uri : null);
    }
  }, []);
  const onChildButtonPress = React.useCallback(
    async (type: any, options: any, item?: any,) => {
      //console.log("ItemSelected : ",type , " " , options , ' ' , item)
      if (type === 'capture') {
        const result = await ImagePicker.launchCamera(options, setResponse);
        if (item) {
          const index = userData.childData.findIndex(it => it.id === item.id);
          //console.log('result: ', result.assets);
          userData.childData[index].imagePath = result.assets
            ? result.assets[0].uri
            : '';
          setChildData();
        } else {
          setUri(result.assets ? result.assets[0].uri : null); //if user close the screen without selecting any image handle that case
        }
      } else {
        const result = await ImagePicker.launchImageLibrary(
          options,
          setResponse,
        );
        if (item) {
          // Alert.alert(item)
          // //console.log('itemSelected: ', index);

          const index = userData.childData.findIndex(it => it.id === item.id);
          //console.log("result for image : " , result)
          userData.childData[index].imagePath = result.assets
            ? result.assets[0].uri
            : '';
          setChildData();
          //console.log('items: ', item);
        } else {
          setUri(result.assets ? result.assets[0].uri : null);
        }
      }
    },
    [],
  );

  const addChild = () => {
    userData.childData.push({
      id: Math.random().toString(),
      imagePath: '',
      childName: '',
      genderValue: '',
      birthDate: new Date(),
    });
    setChildData();
  };

  const onVerifyMobile = async () => {
    const emailValidation = new RegExp(
      '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
    );
    const passwordValidation = new RegExp(
      '^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$',
    );
    for (let i = 0; i < userData.childData.length; i++) {
      let childData = userData.childData[i];
      if (
        !childData.birthDate ||
        !childData.childName ||
        !childData.genderValue
      ) {
        setError('All feilds are required except refferal code!');
        return false;
      }
    }

    if (
      !userData.email ||
      !userData.name ||
      !userData.number ||
      !userData.password
    ) {
      setError('All feilds are required!');
      return false;
    }

    if (!emailValidation.test(userData.email)) {
      setError('Invalid email');
      return false;
    }
    if (!passwordValidation.test(userData.password)) {
      setError('Enter strong password');
      return false;
    }

    const checkNumber = parsePhoneNumber(userData.number, 'IN');
    if (!checkNumber?.isValid()) {
      setError('Enter valid number');
      return false;
    }

    <VerifyMobileScreen number={userData.number} />;

    await handleSignUp();
  };

  const convertUri = async (uri: string, id: string) => {
    //console.log('convertURI :', uri, '  ', id);
    let url = '';
    const reference = storage().ref(id); // Create a storage reference from our storage service by taking our image id to it
    await reference.putFile(uri.replace('file://', ''));
    //putFile() method automatically infers the MIME type from the File extension upload it in storage
    await reference
      .getDownloadURL()
      .then(res => {
        //console.log('resOfConverted URL: ', res);
        url = res;
      })
      .catch(err => console.log('error in function: ', err)); // to download url from storage for using it further in code
    return url;
  };

  const handleSignUp = async () => {
    const emailValidation = new RegExp(
      '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
    );
    const passwordValidation = new RegExp(
      '^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$',
    );
    if (
      emailValidation.test(userData.email) &&
      passwordValidation.test(userData.password)
    ) {
      //console.log('hello', response.assets[0].id);

      // let url: any = null;
      // if (response) {
      //   const reference = storage().ref(response.assets[0].id); // Create a storage reference from our storage service by taking our image id to it
      //   await reference.putFile(response.assets[0].uri.replace('file://', '')); //putFile() method automatically infers the MIME type from the File extension upload it in storage
      //   url = await reference.getDownloadURL(); // to download url from storage for using it further in code
      // }

      await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password,
      )
        .then(async userCred => {
          // //console.log('userCred:', JSON.stringify(userCred.user.providerData));
          // const childName = userData.childData.map(
          //   childData => childData.childName,
          // );

          // const childGender = userData.childData.map(
          //   gender => gender.genderValue,
          // );

          // const childDOB = userData.childData.map(DOB => DOB.birthDate);
          // const childImage = await Promise.all(
          //   userData.childData.map(
          //     async item =>
          //       await convertUri(item.imagePath as string, item.id.toString()),
          //   ),
          // );
          // const childDetails ={ childName: childName,
          // childBirthDate: childDOB,
          // childGender: childGender,
          // childPhotoURL: childImage,}

          //to pass the userData details in database to store it
          const childDataValues = await Promise.all(userData.childData.map(async (res) => {
            //console.log("responseData date : ", res.birthDate)
            return { ...res, imagePath: await convertUri(res.imagePath || '', res.id.toString()) }
          }))
          //console.log("BeforeConvert data", userData.childData);

          //console.log('converted childdata : ', childDataValues);

          const userDetails = {
            ...userCred.user.providerData[0],
            displayName: userData.name,
            phoneNumber: userData.number,
            photoURL: await convertUri(uri, userCred.user.uid),
            childData: childDataValues

            // }
            // );
          }

          // };
          //console.log("registration details:", userDetails);

          const Data = {
            _id: userCred.user.uid, // unique id for the database record
            userData: userDetails, // userData feild that stores all userDetails in it
          };
          //console.log('data: ', Data);

          setDoc(doc(db, 'user', userCred.user.uid), Data)
            // setDoc is used to create or update a document in a collection ,
            // doc is a lightweight record that contains fields, which map to values. Each document is identified by a name. ,
            // db is getStorage from firebase const exported from firebase service it is ,
            // user is collection name
            // unique id bt userCred.user.uid
            // Data is the main data to be stored

            .then(() =>
              navigation.navigate('VerifyMobile', { number: userData.number }),
            );
        })
        .catch(err => console.log('error:', err));
    }
  };

  const delChildObject = (id: string) => {
    let index = userData.childData.findIndex(item => {
      return item.id === id;
    });
    setUserData(oldValue => {
      return {
        ...oldValue,
        userData: userData.childData.splice(index, 1),
      };
    });
  };
  const onBackPress = () => {
    navigation.goBack();
  };
  const genderData = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];



  // //console.log("response:" ,response);
  const { height, width } = useWindowDimensions();
  return (
    <View className='px-5 bg-white'>
      <Header
        auth
        iconLeft={<BackArrowIcon height={28} width={28} />}
        onBackPress={onBackPress}

        title="REGISTER"
      />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View className='flex-1 mt-5'>
          <View className='border-primary border-2 rounded-full flex-row mb-5 self-center , h-20 w-20'>

            <TouchableOpacity
              className='flex-1 justify-center items-center'
              onPress={() => setParentModal(true)}>
              {response ? (
                <Image className='h-[70px] w-[70px] rounded-full'
                  source={{
                    uri: uri,
                  }}
                />
              ) : (
                <CameraIcon height={35} width={35} fill={'#A0A0A0'} />
              )}
            </TouchableOpacity>
            <Modal
              animationType="fade"
              transparent={true}
              visible={parentModal}
              onRequestClose={() => setParentModal(false)}>
              <View className='bg-black opacity-50 flex-1'
              />
              <View className='bg-white w-full h-36 items-start justify-start p-2.5 gap-5 ml-0'>
                <TouchableOpacity className='self-end'>
                  <CrossIcon
                    height={20}
                    width={20}
                    onPress={() => setParentModal(false)}
                  />
                </TouchableOpacity>
                {actions.map(({ title, type, options }) => {
                  return (
                    <View className='flex-1 w-full'>
                      {type === 'capture' ? (
                        <TouchableOpacity className='flex-row gap-5 items-center'
                          onPress={() => {
                            onButtonPress(type, options);
                            setParentModal(false);
                          }}>
                          <CameraIcon height={30} width={30} fill={'#A0A0A0'} />
                          <Text className='text-base font-bold'>
                            {title}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity className='flex-row gap-5 items-center'
                          onPress={() => {
                            onButtonPress(type, options);
                            setParentModal(false);
                          }}>
                          <GalleryIcon
                            height={30}
                            width={30}
                            fill={'#A0A0A0'}
                          />
                          <Text className='text-base font-bold' >
                            {title}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                })}
              </View>
            </Modal>
          </View>
          <Input
            placeholder="Enter Name"
            value={userData.name}
            onChangeText={newName => changeUserData('name', newName)}
          />
          <Input
            placeholder="Enter Mobile"
            value={userData.number}
            keyboardType="number-pad"
            onChangeText={num => changeUserData('number', num)}
          />
          <Input
            placeholder="Enter Email"
            value={userData.email}
            onChangeText={newEmail => changeUserData('email', newEmail)}
          />
          <Input
            placeholder="Enter Password"
            value={userData.password}
            onChangeText={code => changeUserData('password', code)}
            secureTextEntry
          />
          <FlatList
            data={userData.childData}
            renderItem={({ item, index }) => {
              // //console.log("item length : " , index);

              return (
                <View>
                  <View className='flex-row items-start'>
                    <View className='border-primary border-2 rounded-full flex-row mb-5 h-12 w-12 mr-[14px]'
                    >
                      <TouchableOpacity
                        className='flex-1 justify-center items-center'
                        onPress={() => setModal(true)}>
                        {response ? (
                          <Image className='h-10 w-10 rounded-full'
                            style={{
                              resizeMode: 'cover',
                            }}
                            source={{
                              uri: item.imagePath,
                            }}
                          />
                        ) : (
                          <CameraIcon height={22} width={22} fill={'#A0A0A0'} />
                        )}
                      </TouchableOpacity>
                      <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modal}
                        onRequestClose={() => setModal(false)}>
                        <View className='bg-black opacity-50 flex-1'
                        />
                        <View
                          className='bg-white w-full h-36 items-start justify-start p-2.5 gap-5 ml-0'>
                          <TouchableOpacity className='self-end'>
                            <CrossIcon
                              height={20}
                              width={20}
                              onPress={() => setModal(false)}
                            />
                          </TouchableOpacity>
                          {actions.map(({ title, type, options }) => {
                            return (
                              <View className='flex-1 w-full'>
                                {type === 'capture' ? (
                                  <TouchableOpacity className='flex-row gap-5 items-center'
                                    onPress={() => {
                                      onChildButtonPress(type, options, item);
                                      setModal(false);
                                    }}>
                                    <CameraIcon
                                      height={30}
                                      width={30}
                                      fill={'#A0A0A0'}
                                    />
                                    <Text className='text-base font-bold'>
                                      {title}
                                    </Text>
                                  </TouchableOpacity>
                                ) : (
                                  <TouchableOpacity className='flex-row gap-5 items-center'
                                    onPress={() => {
                                      onChildButtonPress(type, options, item);
                                      //console.log("Selected item:" , item);

                                      setModal(false);
                                    }}>
                                    <GalleryIcon
                                      height={30}
                                      width={30}
                                      fill={'#A0A0A0'}
                                    />
                                    <Text className='text-base font-bold'>
                                      {title}
                                    </Text>
                                  </TouchableOpacity>
                                )}
                              </View>
                            );
                          })}
                        </View>
                      </Modal>
                    </View>
                    <View style={{ width: index > 0 ? 245 : 290 }}>
                      <Input
                        placeholder="Enter Child Name"
                        value={item.childName}
                        onChangeText={name => {
                          userData.childData[index].childName = name;
                          setChildData();
                        }}
                      />
                    </View>
                    {index > 0 ? (
                      <TouchableOpacity className='mt-2.5 ml-2.5' onPress={() => delChildObject(item.id)}>
                        <CrossIcon
                          height={30}
                          width={30}
                          onPress={() => delChildObject(item.id)}
                        />
                      </TouchableOpacity>
                    ) : null}
                  </View>

                  <View className='flex-row justify-center'>
                    <View className='mr-[18px] w-[45%]'>
                      <Dropdown
                        placeholderStyle={{ color: "#999999" }}
                        selectedTextStyle={{ color: "#999999" }}
                        style={[
                          styles.dropDown,
                          { borderColor: focus ? '#E97DAF' : '#F9F2EE' },
                        ]}
                        // placeholderStyle={{ color: focus ? 'black' : '#BDBDBD' }}
                        // selectedTextStyle={{ color: focus ? 'black' : '#BDBDBD' }}
                        data={genderData}
                        placeholder="Gender"
                        value={item.genderValue}
                        onChange={gender => {
                          userData.childData[index].genderValue = gender.value;
                          setChildData();
                        }}
                        labelField="label"
                        valueField="value"
                        onBlur={() => setFocus(false)}
                        onFocus={() => setFocus(true)}
                      />
                    </View>
                    <View className='w-2/4'>
                      <Input
                        placeholder="Date Of Birth"
                        icon={
                          <CalendarIcon
                            height={20}
                            width={20}
                            fill={'#A0A0A0'}
                          />
                        }
                        onIconPress={() => {
                          setCurrentIndex(index)
                          setSelectDate(true)
                        }}
                        value={new Date(item.birthDate).toDateString()}
                      />
                      {selectDate && index === currentIndex && (
                        <RNDateTimePicker
                          value={new Date(item.birthDate)}
                          mode="date"
                          onChange={date => {
                            const birthDate = new Date(
                              date.nativeEvent.timestamp,
                            ); //to set we need to do like this for updating the date
                            userData.childData[currentIndex].birthDate = birthDate;
                            //console.log("Date : " ,birthDate ,"index of date: " ,index , "setting date: " ,JSON.stringify(userData.childData[index].birthDate) ) 
                            setChildData();
                            // setDate(new Date(date.nativeEvent.timestamp)), //to set we need to do like this for updating the date
                            setSelectDate(false);
                          }}
                        />
                      )}
                    </View>
                  </View>
                </View>
              );
            }}
          />

          <TouchableOpacity onPress={addChild} className='flex-row items-center justify-center bg-lightpink h-[50px] rounded-full mb-5'>
            <PlusIcon height={20} width={20} fill={'#E4097D'} />
            <Text className='text-primary text-lg ml-1.5 font-extrabold'>ADD CHILD</Text>
          </TouchableOpacity>
          {error ? <ErrorText text={error} /> : null}
          <PrimaryButton text="VERIFY MOBILE" onPress={onVerifyMobile} />

          <View className='flex-row justify-center mt-5 mb-4'>
            <View className='border-[#a2a2a2] h-px self-center border w-28' ></View>
            <Text className='font-bold text-xl text-[#a2a2a2]'> OR </Text>
            <View className='border-[#a2a2a2] h-px self-center border w-28'></View>
          </View>

          <View className='flex-row pb-16 pt-0 mt-0 gap-[18px]'>
            <TouchableOpacity className='px-5 h-10 flex-1 flex-row items-center justify-center border-2 rounded-full border-lightergray'>
              <FacebookIcon height={20} width={20} fill={'#29468B'} />
              <Text className='font-bold text-[13px]'> Login with Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity className='px-5 h-10 flex-1 flex-row items-center justify-center border-2 rounded-full border-lightergray'>
              <GoogleIcon height={20} width={20} />
              <Text className='font-bold text-[13px]'>  Login with Google </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
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
  },
})

export default RegisterScreen;
