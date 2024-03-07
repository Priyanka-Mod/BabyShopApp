import React from "react";
import { Header, Input, PrimaryButton } from "../../components";
import { Image, View } from "react-native";
import { BackWhiteArrowIcon, EditIcon } from "../../assets/icon";

const MyProfile = ({navigation}:any) => {
    return(
        <View className='flex-1 bg-white'>
            <Header title="My Profile" iconLeft={<BackWhiteArrowIcon height={25} width={25} onPress={()=>navigation.navigate('Account')} />} 
                rightIcon1={<EditIcon height={20} width={20} fill={'white'}/>}
            />
            <View className='mx-5'>
            <Image className="self-center rounded-full border-primary my-5 border-2"
          

                source={{
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoM8pM97yLHyPSgw08hWbRvhxaGZzDMGXXBssV0iNANNuBx-uiuroBJpx2yK5J3fyvdoE&usqp=CAU',
          }}
          height={80}
          width={80}
            />

        <Input value="Mark Johnson"/>
        <Input value="+91 12345 67890"/>
        <Input value="mark1998@gmail.com"/>

        <PrimaryButton text="SUBMIT" onPress={()=>navigation.navigate('Account')}/>
        
            </View>
            
    <View>

    </View>
        </View>
    )
}

export default MyProfile