

import * as React from "react";


import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {RootStackParamList, SignalStackParamList} from "../../types";
import {SignalBottomTab} from "./index";


const StackNav = createNativeStackNavigator<SignalStackParamList>();

export function MainSignalNav() {
    return(
        <StackNav.Navigator initialRouteName='SignalBottomTab'  screenOptions={{
            headerShown: false,
            gestureEnabled:true,
            animation:'slide_from_left',

        }}>

     <StackNav.Screen name={"SignalBottomTab"} options={{headerShown: false}} component={SignalBottomTab}/>


        </StackNav.Navigator>
    )

}
