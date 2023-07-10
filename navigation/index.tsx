/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {FontAwesome} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName, AppState, Pressable} from 'react-native';

import {RootStackParamList, RootTabParamList, RootTabScreenProps} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import {AuthNavigator} from "./AuthNavigation";
import OnBoardingScreen from "../screens/onboarding";
import LandingScreen from "../screens/LandingScreen";
import {CyborgBottomTab} from "./cyborg";
import NewsScreen from "../screens/cyborg/NewsScreen";
import SelectType from "../screens/cyborg/bot/SelectType";
import SelectExchange from "../screens/cyborg/bot/SelectExchange";
import SelectAsset from "../screens/cyborg/bot/SelectAsset";
import TradeSetting from "../screens/cyborg/bot/TradeSetting";
import ReviewScreen from "../screens/cyborg/bot/ReviewScreen";
import OverView from "../screens/cyborg/OverView";
import BotSuccess from "../screens/cyborg/bot/BotSuccess";


export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator/>
        </NavigationContainer>
    );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();


function RootNavigator() {

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,

        }} initialRouteName={"OnBoardingScreen"}>

            <Stack.Screen name={"OnBoardingScreen"} component={OnBoardingScreen}/>
            <Stack.Screen name={"Auth"} component={AuthNavigator}/>
            <Stack.Screen name={"LandingScreen"} component={LandingScreen}/>

            <Stack.Group screenOptions={{
                headerShown: false,
                animation: 'slide_from_left'
            }}>

                <Stack.Screen name={"NewsScreen"} options={{
                    animation: 'slide_from_bottom'
                }} component={NewsScreen}/>

                <Stack.Screen name={"SelectExchange"} component={SelectExchange}/>
                <Stack.Screen name={"SelectAsset"} component={SelectAsset}/>
                <Stack.Screen name={"TradeSetting"} component={TradeSetting}/>
                <Stack.Screen name={"ReviewScreen"} component={ReviewScreen}/>
                <Stack.Screen name={"OverView"} component={OverView}/>
                <Stack.Screen name={"BotSuccess"} options={{animation: 'slide_from_bottom'}} component={BotSuccess}/>

                <Stack.Screen name={"SelectType"} component={SelectType}/>

                <Stack.Screen name={"CyborgBottomTab"} options={{
                    headerShown: false
                }} component={CyborgBottomTab}/>


            </Stack.Group>
        </Stack.Navigator>
    );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */


/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={30} style={{marginBottom: -3}} {...props} />;
}
