import React, {useState} from 'react';
import {Header, Input} from '../../components';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BackWhiteArrowIcon,
  CalendarIcon,
  CrossIcon,
  DeleteIcon,
  EditIcon,
  PlusIcon,
} from '../../assets/icon';
import {useAuth} from '../../services/useContextService';
import moment from 'moment';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const MyChildDetails = ({navigation}: any) => {
  const [modal, setModal] = useState(false);
  const [selectDate, setSelectDate] = useState(false);
  const [isEditted, setIsEditted] = useState(false);
  const [editData, setEditData] = useState<any>({
    birthDate: new Date(),
    childName: '',
    genderValue: '',
    id: null,
    imagePath: '',
  });
  const [configureDate, setConfigureDate] = useState('');
  const changeUserData = (key: string, value: string | Date) => {
    setEditData(prev => ({...prev, [key]: value}));

    console.log('after Edit data :', editData);
  };
  const setChildData = () => {
    setEditData(oldValue => {
      return {
        ...oldValue,
        childName: editData.childName,
        genderValue: editData.genderValue,
        birthDate: editData.birthdate,
      };
    });
  };

  const {user} = useAuth();
  const {setUser} = useAuth();
  console.log('user:', user, 'type : ', typeof user);
  console.log('childData:', user!.userData.childData);

  const childData = user!.userData.childData;

  console.log(
    'date',
    moment.unix(childData[0].birthDate.seconds).toDate(),
    moment.unix(childData[0].birthDate.seconds).format('DD/MM/YYYY'),
    childData[0].birthDate,
  );
  const onAddChild = () => {
    setModal(true);
  };
  const onEdit = (id: number) => {
    const editChild = childData.find(data => data.id === id);
    console.log('editChild:', editChild);
    setModal(true);
    setEditData(editChild);
    console.log('editdata', editData);
    setConfigureDate(
      moment.unix(editChild.birthDate.seconds).format('ddd MMM DD yyyy'),
    );
  };

  return (
    <View className="flex-1 bg-white">
      <Header
        title="My Child Details"
        iconLeft={
          <BackWhiteArrowIcon
            height={25}
            width={25}
            onPress={() => navigation.navigate('Account')}
          />
        }
      />
      <TouchableOpacity
        className="bg-lightpink flex-row gap-2.5 py-2.5 pt-0 mt-0 items-center justify-center"
        onPress={onAddChild}>
        <PlusIcon height={25} width={25} />
        <Text className="text-base font-bold text-primary">ADD CHILD</Text>
      </TouchableOpacity>
      <FlatList
        data={childData}
        renderItem={({item, index}) => {
          return (
            <View
              className="flex-row items-start justify-between mx-5 border-lightgray"
              style={{
                borderBottomWidth: childData.length - 1 === index ? 0 : 1,
              }}>
              <View className="flex-row gap-2.5 py-5 items-center">
                <Image
                  className="rounded-full border-primary border-2"
                  source={{
                    uri: item.imagePath,
                    height: 80,
                    width: 80,
                  }}
                />

                <View>
                  <Text className="text-lightgray font-medium text-[15px]">
                    Name :{' '}
                    <Text className="text-[15px] font-semibold text-darkgray">
                      {item.childName}
                    </Text>
                  </Text>
                  <Text className="text-lightgray font-medium text-[15px]">
                    Gender :{' '}
                    <Text className="text-[15px] font-semibold text-darkgray">
                      {item.genderValue}
                    </Text>
                  </Text>
                  <Text className="text-lightgray font-medium text-[15px]">
                    DOB :{' '}
                    <Text className="text-[15px] font-semibold text-darkgray">
                      {moment.unix(item.birthDate.seconds).format('DD/MM/YYYY')}
                    </Text>
                  </Text>
                </View>
              </View>
              <View className="flex-row gap-5 pt-5 items-start">
                <TouchableOpacity onPress={() => onEdit(item.id)}>
                  <EditIcon height={20} width={20} fill={'#bfbfbf'} />
                </TouchableOpacity>
                <DeleteIcon height={20} width={20} fill={'#bfbfbf'} />
              </View>

              <Modal
                animationType="fade"
                transparent={true}
                visible={modal}
                onRequestClose={() => setModal(false)}>
                <View className="bg-black opacity-50 flex-1" />
                <View className="bg-white w-full h-[400px] items-center justify-start p-3">
                  <TouchableOpacity className="self-end">
                    <CrossIcon
                      height={20}
                      width={20}
                      onPress={() => setModal(false)}
                    />
                  </TouchableOpacity>
                  <View className="m-5">
                    <Input
                      placeholder="Enter Child Name"
                      value={editData.childName}
                      onChangeText={newName =>
                        changeUserData('childName', newName)
                      }
                    />
                    <Input
                      placeholder="Enter Child Gender"
                      value={editData.genderValue}
                      onChangeText={newGender =>
                        changeUserData('genderValue', newGender)
                      }
                    />
                    <Input
                      placeholder="Date Of Birth"
                      icon={
                        <CalendarIcon height={20} width={20} fill={'#A0A0A0'} />
                      }
                      onIconPress={() => setSelectDate(true)}
                      value={configureDate}
                      // onChangeText={() => new Date(item.birthDate).toDateString()}
                    />

                    {selectDate && (
                      <RNDateTimePicker
                        value={
                          new Date(editData.birthDate.seconds) || new Date()
                        }
                        mode="date"
                        onChange={date => {
                          setEditData({
                            ...editData,
                            birthDate: {
                              nanoseconds: 0,
                              seconds: date.nativeEvent.timestamp,
                            },
                          });
                          setConfigureDate(
                            moment(new Date(editData.birthDate.seconds)).format(
                              'ddd MMM DD yyyy',
                            ),
                          );
                          setSelectDate(false);
                        }}
                      />
                    )}
                    {/* <TouchableOpacity onPress={() => setUser()}>
                      <Text>Ok</Text>
                      </TouchableOpacity> */}
                  </View>
                </View>
              </Modal>
            </View>
          );
        }}
      />
    </View>
  );
};

export default MyChildDetails;
