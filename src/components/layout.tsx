import { useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Layout = ({ children }: any) => {

    // const route = useRoute();

    // //console.log(route)

    return (
        <SafeAreaView className="flex-1 px-4 bg-white">
            {children}
        </SafeAreaView>
    )
}


