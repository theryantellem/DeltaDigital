

import * as React from "react";


import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {RootStackParamList, SignalStackParamList} from "../../types";
import {SignalBottomTab} from "./index";
import SignalDetails from "../../screens/finix/SignalDetails";
import EducatorsScreen from "../../screens/finix/Educators";
import ViewEducator from "../../screens/finix/ViewEducator";
import StreamersList from "../../screens/finix/StreamersList";
import SignalSummary from "../../screens/finix/SignalSummary";
import ChatScreen from "../../screens/finix/tabs/ChatScreen";
import MessageScreen from "../../screens/finix/message/MessageScreen";
import SignalImageDetails from "../../screens/finix/SignalImageDetails";
import EducatorSignalSummary from "../../screens/finix/EducatorSignalSummary";
import LiveStream from "../../screens/finix/stream/LiveStream";
import ViewAcademy from "../../screens/finix/academy/ViewAcademy";


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
     <StackNav.Screen name={"EducatorSignalSummary"} component={EducatorSignalSummary}/>
     <StackNav.Screen name={"EducatorsScreen"} component={EducatorsScreen}/>
     <StackNav.Screen name={"ViewEducator"} component={ViewEducator}/>
     <StackNav.Screen name={"StreamersList"} component={StreamersList}/>
     <StackNav.Screen name={"SignalImageDetails"} component={SignalImageDetails}/>
     <StackNav.Screen name={"SignalSummary"} component={SignalSummary}/>
     <StackNav.Screen name={"MessageScreen"} component={MessageScreen}/>
     <StackNav.Screen name={"LiveStream"} component={LiveStream} options={{
         animation:'slide_from_bottom'
     }}/>
            <StackNav.Screen name={"ViewAcademy"} component={ViewAcademy} options={{
         animation:'slide_from_bottom'
     }}/>


        </StackNav.Navigator>
    )

}
