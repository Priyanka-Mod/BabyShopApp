import React from "react";
import { View } from "react-native";
import { Header } from "../../components";
import { BackWhiteArrowIcon, MenuIcon } from "../../assets/icon";
import { DrawerActions } from "@react-navigation/native";

const Help = ({ navigation }: any) => {
    return (
        <View>
            <Header title="Help"
                iconLeft={
                    <MenuIcon
                        fill={'white'}
                        height={25}
                        width={25}
                    />
                }
                onBackPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
        </View>
    )
}

export default Help