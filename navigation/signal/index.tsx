import React from 'react';
import {
    Platform,
    StyleSheet,
} from 'react-native';

import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
    withTiming
} from "react-native-reanimated";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Plus...


// Font Awesome Icons...
import {Entypo, Feather, FontAwesome5, Ionicons, Octicons} from '@expo/vector-icons'
import CyborgHome from "../../screens/cyborg/tabs/CyborgHome";
import CreateScreen from "../../screens/cyborg/tabs/CreateScreen";
import MoreScreen from "../../screens/cyborg/tabs/MoreScreen";
import {RootTabParamList, SignalTabParamList} from "../../types";
import Colors from "../../constants/Colors";
import {LinearGradient} from "expo-linear-gradient";
import HomeSignal from "../../screens/finix/tabs/HomeSignal";
import ChatScreen from "../../screens/finix/tabs/ChatScreen";
import SignalScreen from "../../screens/finix/tabs/SignalScreen";
import SettingsScreen from "../../screens/cyborg/profile/SettingsScreen";
import SignalSettings from "../../screens/finix/tabs/SignalSettings";
import SignalSummary from "../../screens/finix/SignalSummary";


const Tab = createBottomTabNavigator<SignalTabParamList>();

// Hiding Tab Names...
export const SignalBottomTab = () => {

    const rotation = useSharedValue(0);


    const progress = useSharedValue(0);
    const progressMore = useSharedValue(0);
    const scaleDownAnimation = useSharedValue(1);
    const scaleMoreDownAnimation = useSharedValue(1);


    const scaleAnimatedStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            progress.value,
            [0, 1],
            ['transparent', '#070A21']
        ),
        transform: [{scale: scaleDownAnimation.value}],
    }));

    const scaleMoreAnimatedStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            progressMore.value,
            [0, 1],
            ['transparent', '#070A21',]
        ),
        transform: [{scale: scaleMoreDownAnimation.value}],
    }));


    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{rotateZ: `${rotation.value}deg`}],
        };
    });

    // Animated Tab Indicator...

    return (
        <>
            <Tab.Navigator
                initialRouteName={'SignalHome'}

                sceneContainerStyle={{}}

                screenOptions={{
                    tabBarStyle: {
                      //  backgroundColor: '#11192E',
                        backgroundColor: '#141621',
                        height: 50,
                        borderTopColor: '#11192E',
                        borderTopWidth: 1,
                    },
                    headerShown: false,
                    tabBarShowLabel: false,

                    // Floating Tab Bar...


                }}>

                {
                    // Tab Screens....

                    // Tab ICons....
                }
                <Tab.Screen name={"SignalHome"} component={HomeSignal} options={{


                    tabBarIcon: ({focused}) => (
                        <Animated.View style={[scaleAnimatedStyle, {

                            backgroundColor: "#070A21",

                        },styles.tabButton]}>

                            <Octicons name="home" size={20} color={focused ? Colors.primary : '#fff'}/>

                        </Animated.View>
                    )
                }} />

                <Tab.Screen name={"SignalChat"} component={ChatScreen} options={{


                    tabBarIcon: ({focused}) => (
                        <Animated.View style={[scaleAnimatedStyle, {

                            backgroundColor: "#070A21",

                        },styles.tabButton]}>
                            <Ionicons name="chatbubbles" size={20} color={focused ? Colors.primary : '#fff'}/>


                        </Animated.View>
                    )
                }} />


                <Tab.Screen name={"Signals"} component={SignalSummary} options={{


                    tabBarIcon: ({focused}) => (
                        <Animated.View style={[scaleAnimatedStyle, {

                            backgroundColor: "#070A21",

                        },styles.tabButton]}>

                            <Entypo name="bar-graph" size={20}  color={focused ? Colors.primary : '#fff'} />

                        </Animated.View>
                    )
                }}/>





            </Tab.Navigator>


        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#11192E',
        alignItems: 'center',
        justifyContent: 'center',
    },
    createBtn: {
        // centring Tab Button...
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        width: 40,
        height: 40,
        //backgroundColor: "#5F46F6",
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
       // marginBottom: Platform.OS == "android" ? 70 : 60,

        zIndex: 100,
    },
    createBtnGradient:{
        width:'100%',height:'100%', borderRadius:10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabButton:{
        position: 'absolute',


        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    }
});
