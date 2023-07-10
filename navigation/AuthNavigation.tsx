import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AuthStackParamList, RootStackParamList} from "../types";
import * as React from "react";

import SignInScreen from "../screens/auth/SignIn";
import ForgotPasswordScreen from "../screens/auth/ForgotPassword";


const AuthStackNav = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
    return(
        <AuthStackNav.Navigator initialRouteName='SignInScreen'  screenOptions={{
            headerShown: false,
            gestureEnabled:true,
            animation:'slide_from_left',

        }}>
            <AuthStackNav.Screen name="SignInScreen" component={SignInScreen}/>
            <AuthStackNav.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen}/>





        </AuthStackNav.Navigator>
    )

}
