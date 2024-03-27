import React, { useState } from "react";
import { Image, Text, TouchableOpacity} from "react-native";
import { Colors } from "../utils";
 
type CheckBoxType =  {
    label?:string;
    onValueChange?: any
    check:boolean;
    customLabelStyle?:any
    customLabelConditionalStyle?:any

}

export const CheckBox = ({label,onValueChange,check=false,customLabelStyle,customLabelConditionalStyle}:CheckBoxType) => {
    return(
        <TouchableOpacity onPress={onValueChange} className="flex-row items-center"> 
            {check ?
            <Image style={{height:20 , width:20 , marginRight:5}}
            source={require("./../assets/img/FilledCheckbox.png")}
            height={20}
            width={20}
            tintColor={Colors.primary}
        />
            :<Image style={{height:20,width:20 , marginRight:5}}
                source={require("./../assets/img/BlankCheckbox.png")}
                tintColor='#e2e2e2'
            />}
            <Text className={customLabelStyle} style={customLabelConditionalStyle}>{label}</Text>
        </TouchableOpacity>
    )
}