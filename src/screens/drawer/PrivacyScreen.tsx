import React from "react";
import { Text, View } from "react-native";
import { Header } from "../../components";
import { MenuIcon } from "../../assets/icon";
import { DrawerActions } from "@react-navigation/native";

const PrivacyScreen = ({ navigation }: any) => {
    return (
        <View>
            <Header title="Privacy Policy"
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

export default PrivacyScreen