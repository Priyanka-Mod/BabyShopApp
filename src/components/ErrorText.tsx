import React from "react";
import { StyleSheet, Text } from "react-native";

export const ErrorText = (props:{text:string}) => {
    return(
        <Text className="mb-5 text-center text-[#ff0000]">{props.text}</Text>
    )
}
