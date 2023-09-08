/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {FontAwesome} from '@expo/vector-icons';

import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName, AppState, Pressable} from 'react-native';

import {RootStackParamList} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import {AuthNavigator} from "./AuthNavigation";

import LandingScreen from "../screens/LandingScreen";
import {useEffect, useRef, useState} from "react";
import {logoutUser, setLockUser, setUserLastSession} from "../app/slices/userSlice";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {store} from "../app/store";
import {timeDifference} from "../helpers";
import {CyborgMainNavigator} from "./cyborg/MainCyborgNav";


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




    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)
    const [firstLaunch, setFirstLaunch] = useState<boolean | null>(null);
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const {
        lockUser,
        lastUserActive,
        isAuthenticated,
        userIsIn
    } = user


    useEffect(() => {
        const subscription = AppState.addEventListener("change", _handleAppStateChange);

        return () => {
            subscription.remove();
        };

    }, []);
    const _handleAppStateChange = (nextAppState: string) => {
        if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
            // console.log('App has come to the foreground!');
        }
        const start = Date.now();
        appState.current = nextAppState;
        setAppStateVisible(appState.current);

        if (appState.current === 'inactive') {
            if(isAuthenticated) {
                dispatch(setUserLastSession({lastUserActive: start}))
            }
        }
        // console.log('AppState', appState.current);

    };




    //  let resolution = lastUserActive - Date.now()
    //console.log(Date.now())
    const diffMinutes = timeDifference(Date.now(), lastUserActive)

    useEffect(() => {
        if (appStateVisible === 'active') {
            if (diffMinutes > 10) {

                dispatch(setLockUser({
                    lockUser: true
                }))


            }

        }

    }, [appStateVisible, diffMinutes]);






    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
animation:'slide_from_right'
        }} initialRouteName={ !isAuthenticated ? "Auth" : 'LandingScreen'}>


            {
                !isAuthenticated &&
            <Stack.Group>

            <Stack.Screen name={"Auth"} component={AuthNavigator}/>

            </Stack.Group>
            }

            {
                isAuthenticated &&
            <Stack.Group screenOptions={{headerShown: false, animation: 'slide_from_left'}}>
                <Stack.Screen name={"LandingScreen"} component={LandingScreen}/>
                <Stack.Screen name={"CyborgBottomTab"} component={CyborgMainNavigator}/>





            </Stack.Group>
            }
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
