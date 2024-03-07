import React, { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Header } from "../../components";
import { BackWhiteArrowIcon } from "../../assets/icon";
import { Colors } from "../../utils";

const QueAnsScreen = ({navigation}:any) => {
    const onBackPress = () => {
        navigation.navigate("ProductDetail")
    }
    const [queData,setQueData] = useState([
        {
            id:'1',
            Que:'1) This body nourishing is safe for 4 month old baby?',
            Ans:'A. Yes ,this is very safe.',
            show:false
        },
        {
            id:'2',
            Que:'2) This body nourishing is safe for 4 month old baby?',
            Ans:'A. Yes ,this is very safe.',
            show:false
        },
        {
            id:'3',
            Que:'1) This body nourishing is safe for 4 month old baby?',
            Ans:'A. Yes ,this is very safe.',
            show:false
        },
        {
            id:'4',
            Que:'2) This body nourishing is safe for 4 month old baby?',
            Ans:'A. Yes ,this is very safe.',
            show:false
        }
    ])

    const onShowPress = useCallback((index:number) => {

        // for (let data of queData) {
        //     console.log(data.show);
            
        //     if(data.id === id){
        //         data.show = !data.show
        //         console.log("data.show=> " , data.show);
               
        //     }
            
        // }

        const newArray = [...queData]
        newArray[index].show = !newArray[index].show
        console.log(newArray[index]);
        setQueData(newArray)        
    },[queData])

    const renderQueList = useCallback(() => {
        return(
            <FlatList
            data={queData}
            renderItem={({item,index}) => {
                return(
                    <View className="my-1.5 mx-5 border-lightgray pb-2.5"
                     style={{borderBottomWidth:index===queData.length-1?0: 2,}}>
                                <TouchableOpacity onPress={() => onShowPress(index)}>
                                <Text className="text-[#b7b7b7] font-semibold"
                                >{item.Que}{JSON.stringify(item.show)}</Text>
                            
                                </TouchableOpacity>
                               {item.show? <View className="flex-1"><Text className="font-extrabold text-[#424242]">{item.Ans}</Text></View> :
                               null}
                    </View>
                )
            }}
        />
        )
    },[queData])
    return(
        <View className="flex-1 bg-white">
            <Header title="Question & Answer" iconLeft={<BackWhiteArrowIcon width={25} height={25} onPress={onBackPress}/>}/>
            <TouchableOpacity className="bg-[#FEF1F8] py-2.5" onPress={()=>navigation.navigate('AskQue')}>
                <Text className="text-center text-lg font-normal text-primary" >Ask Questions?</Text>
            </TouchableOpacity>
            {renderQueList()}
        </View>
    )
}

export default QueAnsScreen