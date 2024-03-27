import React, { useEffect, useState } from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Header, Input, PrimaryButton } from "../../components";
import { BackWhiteArrowIcon, CalendarIcon, CameraIcon, CrossIcon, GalleryIcon } from "../../assets/icon";
import * as ImagePicker from 'react-native-image-picker';
import { Dropdown } from "react-native-element-dropdown";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { useAuth } from "../../services/useContextService";
import firestore from '@react-native-firebase/firestore';
import { update } from "firebase/database";
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
const EditChildDetails = ({ navigation, route }: any) => {
    const [childData, setChildData] = useState<{ id: string, imagePath: string, childName: string, genderValue: string, birthDate: { nanoseconds: number, seconds: number } | Date }>({
        id: Math.random().toString(),
        imagePath: '',
        childName: '',
        genderValue: '',
        birthDate: new Date(),
    })
    const [focus, setFocus] = useState(false);
    const [selectDate, setSelectDate] = useState(false);
    const [configureDate, setConfigureDate] = useState('');
    const [imgaeModal, setImageModal] = useState(false)
    const [uri, setUri] = useState<any>();

    const childDetails = route.params;
    console.log("childData Params : ", childData)
    // setName(childData.childName)

    useEffect(() => {
        if (route.params) {
            console.log('we are');
            
            setChildData(childDetails)
            console.log("context data : " , user!.userData.childData);
            
            // console.log("birthdate", childData.birthDate);
            // console.log("sec birthdate", childData.birthDate.seconds);
        }
    }, [])

    useEffect(() => {
        if(childData.birthDate.seconds){
            setConfigureDate(
                moment.unix(childData.birthDate.seconds).format('ddd MMM DD yyyy'),
            )
        }else{
            setConfigureDate(moment(new Date()).format('ddd MMM DD yyyy'))
        }
      
    }, [childData])
    const [response, setResponse] = React.useState<any>(null);
    const {user} = useAuth();

    const convertUri = async (uri: string, id: string) => {
        console.log('convertURI :', uri, '  ', typeof(id));
        let url = '';
        const reference = storage().ref(id); // Create a storage reference from our storage service by taking our image id to it
        console.log("ref url : " , reference , typeof reference)
        await reference.putFile(uri.replace('file://', ''));
        //putFile() method automatically infers the MIME type from the File extension upload it in storage
        await reference
          .getDownloadURL()
          .then(res => {
            console.log('resOfConverted URL: ', res);
            url = res;
          })
          .catch(err => console.log('error in function: ', err)); // to download url from storage for using it further in code
        return url;
      };

    const genderData = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
    ];

    const onButtonPress = React.useCallback(async (type: any, options: any) => {
        if (type === 'capture') {
            const result = await ImagePicker.launchCamera(options, setResponse);
            setUri(result.assets ? result.assets[0].uri : null); //if user close the screen without selecting any image handle that case
            setChildData(prev => ({...prev ,imagePath:uri}))
        } else {
            const result = await ImagePicker.launchImageLibrary(options, setResponse);
            setUri(result.assets ? result.assets[0].uri : null);
            console.log("uri:",uri)
            let temp =result.assets ? result.assets[0].uri : ''
            setChildData(prev => ({...prev ,imagePath:temp}))
        }
    }, []);

    const onSubmit =async (data:any) => {
        console.log("Submitted data : ",data);
        console.log("Send date in utc : " , moment.utc(childData.birthDate.seconds).toDate());
        const userChildDetails = user!.userData.childData 
        console.log("userDetails : ",userChildDetails);
        const index = userChildDetails.findIndex(res => res.id === data.id)
        console.log(index,childData.imagePath)
        if(user!.userData.childData[index]){
            if(user!.userData.childData[index].imagePath !== childData.imagePath){
        user!.userData.childData[index].imagePath = await convertUri(childData.imagePath , data.id.toString())
            }else{
                user!.userData.childData[index].imagePath = childData.imagePath
            }
        
        user!.userData.childData[index].childName = childData.childName
        user!.userData.childData[index].genderValue = childData.genderValue
        user!.userData.childData[index].birthDate = childData.birthDate
        console.log("Updated data values : ",user!.userData.childData)

        // const updatedData = {childData: user!.userData.childData}
    }else{
        
        // push whole new object in childData array
        let convertedUrl = await convertUri(childData.imagePath , childData.id.toString());
        
        if(convertedUrl){
            childData.imagePath = convertedUrl
            user!.userData.childData = [...user!.userData.childData , childData]
            console.log("addedimage : " , user!.userData.childData.imagePath )

        }
    }
      let updatedData = {userData:{ ...user!.userData , childData:user!.userData.childData} };


          firestore().collection('user').doc(user?._id).update(updatedData);

          navigation.navigate("ChildDetails")

        
    }
    return (
        <View className="flex-1 bg-white dark:bg-zinc-900">
            <Header
                title="Edit Child Details"
                onBackPress={() => navigation.goBack()}
                iconLeft={<BackWhiteArrowIcon height={25} width={25} />}
            />
            {/* <Text>{JSON.stringify(childData)}</Text> */}
            <View className="mx-5 pt-4">
                <View className='border-primary border-2 rounded-full flex-row mb-5 self-center h-20 w-20'>

                    <TouchableOpacity
                        className='flex-1 justify-center items-center'
                        onPress={() => setImageModal(true)}>
                        {response || childData?.imagePath ? (
                            <Image className='h-[70px] w-[70px] rounded-full'
                                source={{
                                    uri: uri || childData.imagePath,
                                }}
                            />
                        ) : (
                            <CameraIcon height={35} width={35} fill={'#A0A0A0'} />
                        )}
                    </TouchableOpacity>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={imgaeModal}
                        onRequestClose={() => setImageModal(false)}>
                        <View className='bg-black opacity-50 flex-1'
                        />
                        <View className='bg-white w-full h-36 items-start justify-start p-2.5 gap-5 ml-0'>
                            <TouchableOpacity className='self-end'>
                                <CrossIcon
                                    height={20}
                                    width={20}
                                    onPress={() => setImageModal(false)}
                                />
                            </TouchableOpacity>
                            {actions.map(({ title, type, options }) => {
                                return (
                                    <View className='flex-1 w-full'>
                                        {type === 'capture' ? (
                                            <TouchableOpacity className='flex-row gap-5 items-center'
                                                onPress={() => {
                                                    onButtonPress(type, options);
                                                    setImageModal(false);
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
                                                    setImageModal(false);
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

                <Input value={childData.childName} placeholder="Enter child name" onChangeText={newName => setChildData(prev => ({ ...prev, childName: newName }))} />

                <Dropdown
                    style={[
                        styles.dropDown,
                        { borderColor: focus ? '#E97DAF' : '#F9F2EE' },
                    ]}
                    placeholderStyle = {{color:"#999999"}}
                        selectedTextStyle={{color:"#999999"}}
                    // placeholderStyle={{ color: focus ? 'black' : '#BDBDBD' }}
                    // selectedTextStyle={{ color: focus ? 'black' : '#BDBDBD' }}
                    data={genderData}
                    placeholder="Gender"
                    value={childData.genderValue}
                    onChange={gender => setChildData(prev => ({ ...prev, genderValue: gender.value }))}
                    labelField="label"
                    valueField="value"
                    onBlur={() => setFocus(false)}
                    onFocus={() => setFocus(true)}
                />

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
                        setSelectDate(true)
                    }}
                    value={configureDate}
                />
                {/* <Text>{JSON.stringify(configureDate)}</Text> */}

                {selectDate && (
                    <RNDateTimePicker
                        value={
                            new Date(configureDate) || new Date()
                        }
                        mode="date"
                        onChange={date => {
                            console.log("dateChange", date.nativeEvent.timestamp);

                            setChildData(prev => ({
                                ...prev, birthDate: {
                                    nanoseconds: 0,
                                    seconds: date.nativeEvent.timestamp,
                                }
                            }));
                            console.log("chenged date : ", childData.birthDate);

                            setConfigureDate(
                                moment(new Date(childData.birthDate.seconds)).format(
                                    'ddd MMM DD yyyy',
                                ),
                            );
                            setSelectDate(false);

                        }}
                    />
                )}

                <PrimaryButton
                    text="SUBMIT"
                    onPress={() => onSubmit(childData)}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    dropDown: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#E97DAF',
        paddingLeft: 20,
        paddingRight: 10,
        height: 50,
        marginBottom: 20
    },
})

export default EditChildDetails;