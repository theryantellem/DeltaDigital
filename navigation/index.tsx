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
import UserAccount from "../screens/cyborg/UserAccount";
import Assets from "../screens/cyborg/profile/Assets";
import DepositScreen from "../screens/cyborg/profile/DepositScreen";
import WithdrawalAmount from "../screens/cyborg/profile/WIthdrawalAmount";
import Withdrawal from "../screens/cyborg/profile/Withdrawal";
import TransferScreen from "../screens/cyborg/profile/TransferScreen";
import RewardDetails from "../screens/cyborg/profile/RewardDetails";
import SettingsScreen from "../screens/cyborg/profile/SettingsScreen";
import ApiBinding from "../screens/cyborg/profile/ApiBinding";
import Earnings from "../screens/cyborg/profile/Earning";
import ToastAnimated from "../components/toast";
import {useEffect, useRef, useState} from "react";
import {logoutUser, setLockUser, setUserLastSession} from "../app/slices/userSlice";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {store} from "../app/store";
import {timeDifference} from "../helpers";
import LeaderBoard from "../screens/cyborg/more/LeaderBoard";
import SuccessScreen from "../screens/cyborg/SuccessScreen";
import EditProfile from "../screens/cyborg/profile/EditProfile";
import CouncellerScreen from "../screens/cyborg/profile/CouncellerScreen";
import ViewAPIBinding from "../screens/cyborg/profile/ViewAPIBinding";
import SyncStrategy from "../screens/cyborg/profile/SyncStrategy";
import LogScreen from "../screens/cyborg/strategy/LogScreen";
import ContactUs from "../screens/cyborg/profile/ContactUs";
import FeedbackRecord from "../screens/cyborg/profile/FeedbackRecord";
import Quantitative from "../screens/cyborg/Quantitative";


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

        }} initialRouteName={ !isAuthenticated ? "OnBoardingScreen" : 'LandingScreen'}>


            {
                !isAuthenticated &&
            <Stack.Group>
            <Stack.Screen name={"OnBoardingScreen"} component={OnBoardingScreen}/>
            <Stack.Screen name={"Auth"} component={AuthNavigator}/>

            </Stack.Group>
            }

            {
                isAuthenticated &&
            <Stack.Group screenOptions={{headerShown: false, animation: 'slide_from_left'}}>
                <Stack.Screen name={"LandingScreen"} component={LandingScreen}/>
                <Stack.Screen name={"CyborgBottomTab"} options={{
                    headerShown: false
                }} component={CyborgBottomTab}/>

                <Stack.Screen name={"NewsScreen"} options={{
                    animation: 'slide_from_bottom'
                }} component={NewsScreen}/>

                <Stack.Screen name={"SelectExchange"} component={SelectExchange}/>
                <Stack.Screen name={"SelectAsset"} component={SelectAsset}/>
                <Stack.Screen name={"TradeSetting"} component={TradeSetting}/>
                <Stack.Screen name={"ReviewScreen"} component={ReviewScreen}/>
                <Stack.Screen name={"OverView"} component={OverView}/>
                <Stack.Screen name={"UserAccount"} component={UserAccount}/>
                <Stack.Screen name={"Assets"} component={Assets}/>
                <Stack.Screen name={"DepositScreen"} component={DepositScreen}/>
                <Stack.Screen name={"Withdrawal"} component={Withdrawal}/>
                <Stack.Screen name={"TransferScreen"} component={TransferScreen}/>
                <Stack.Screen name={"RewardDetails"} component={RewardDetails}/>
                <Stack.Screen name={"ApiBinding"} component={ApiBinding}/>
                <Stack.Screen name={"Earnings"} component={Earnings}/>
                <Stack.Screen name={"SettingsScreen"} component={SettingsScreen}/>
                <Stack.Screen name={"WithdrawalAmount"} component={WithdrawalAmount}/>

                <Stack.Screen name={"BotSuccess"} options={{animation: 'slide_from_bottom'}} component={BotSuccess}/>
                <Stack.Screen name={"SuccessScreen"} options={{animation: 'slide_from_bottom'}} component={SuccessScreen}/>

                <Stack.Screen name={"SelectType"} component={SelectType}/>
                <Stack.Screen name={"EditProfile"} component={EditProfile}/>
                <Stack.Screen name={"CouncellerScreen"} component={CouncellerScreen}/>
                <Stack.Screen name={"ViewAPIBinding"} component={ViewAPIBinding}/>
                <Stack.Screen name={"SyncStrategy"} component={SyncStrategy}/>
                <Stack.Screen name={"LogScreen"} component={LogScreen}/>
                <Stack.Screen name={"ContactUs"} component={ContactUs}/>
                <Stack.Screen name={"FeedbackRecord"} component={FeedbackRecord}/>
                <Stack.Screen name={"Quantitative"} component={Quantitative}/>

                <Stack.Screen name={"LeaderBoard"} component={LeaderBoard}/>




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
