

import * as React from "react";


import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {RootStackParamList, SignalStackParamList} from "../../types";
import {SignalBottomTab} from "./index";
import SignalDetails from "../../screens/finix/SignalDetails";
import EducatorsScreen from "../../screens/finix/Educators";
import ViewEducator from "../../screens/finix/ViewEducator";
import StreamersList from "../../screens/finix/StreamersList";
import SignalSummary from "../../screens/finix/SignalSummary";


const StackNav = createNativeStackNavigator<SignalStackParamList>();

export function MainSignalNav() {
    return(
        <StackNav.Navigator initialRouteName='SignalBottomTab'  screenOptions={{
            headerShown: false,
            gestureEnabled:true,
            animation:'slide_from_left',

        }}>

     <StackNav.Screen name={"SignalBottomTab"} options={{headerShown: false}} component={SignalBottomTab}/>
     <StackNav.Screen name={"SignalDetails"} component={SignalDetails}/>
     <StackNav.Screen name={"EducatorsScreen"} component={EducatorsScreen}/>
     <StackNav.Screen name={"ViewEducator"} component={ViewEducator}/>
     <StackNav.Screen name={"StreamersList"} component={StreamersList}/>
     <StackNav.Screen name={"SignalSummary"} component={SignalSummary}/>


        </StackNav.Navigator>
    )

}
