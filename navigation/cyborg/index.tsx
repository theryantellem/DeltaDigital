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
import {Feather, FontAwesome5, Octicons} from '@expo/vector-icons'
import CyborgHome from "../../screens/cyborg/tabs/CyborgHome";
import CreateScreen from "../../screens/cyborg/tabs/CreateScreen";
import MoreScreen from "../../screens/cyborg/tabs/MoreScreen";
import {RootTabParamList} from "../../types";
import Colors from "../../constants/Colors";


const Tab = createBottomTabNavigator<RootTabParamList>();

// Hiding Tab Names...
export const CyborgBottomTab = () => {

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
                initialRouteName={'CyborgHome'}

                sceneContainerStyle={{}}

                screenOptions={{
                    tabBarStyle: {
                      //  backgroundColor: '#11192E',
                        backgroundColor: '#141621',
                        height: 80,
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
                <Tab.Screen name={"CyborgHome"} component={CyborgHome} options={{


                    tabBarIcon: ({focused}) => (
                        <Animated.View style={[scaleAnimatedStyle, {

                            right: 10,
                            backgroundColor: "#070A21",

                        },styles.tabButton]}>

                            <Octicons name="home" size={20} color={focused ? Colors.primary : '#fff'}/>

                        </Animated.View>
                    )
                }} listeners={({navigation, route}) => ({
                    // Onpress Update....
                    tabPress: e => {
                        progress.value = withTiming(1, {duration: 500});
                        progressMore.value = withTiming(0, {duration: 500});
                        scaleDownAnimation.value = withRepeat(withTiming(1.3), 2, true)
                    }
                })}></Tab.Screen>


                <Tab.Screen name={"Create"} component={CreateScreen} options={{
                    tabBarIcon: ({focused}) => (

                        <Animated.View
                            style={[animatedStyle, styles.createBtn]}>
                            <Feather name="plus" size={20} color="#fff"/>

                        </Animated.View>
                    )


                }} listeners={({navigation, route}) => ({
                    // Onpress Update....
                    tabPress: e => {
                        progress.value = withTiming(0, {duration: 500});
                        progressMore.value = withTiming(0, {duration: 500});
                        rotation.value = withSequence(
                            withTiming(-10, {duration: 50}),
                            withRepeat(withTiming(10, {duration: 100}), 6, true),
                            withTiming(0, {duration: 50})
                        );
                    }
                })}></Tab.Screen>


                <Tab.Screen name={"MoreScreen"} component={MoreScreen} options={{
                    tabBarIcon: ({focused}) => (
                        <Animated.View style={[scaleMoreAnimatedStyle,styles.tabButton,{ left: 10,}]}>
                            <Feather name="align-center" size={20} color={focused ? Colors.primary : '#fff'}/>
                        </Animated.View>
                    )
                }} listeners={({navigation, route}) => ({
                    // Onpress Update....
                    tabPress: e => {
                        // rotation.value = withRepeat(withTiming(10), 6, true)

                        progress.value = withTiming(0, {duration: 500});
                        progressMore.value = withTiming(1, {duration: 500});
                        scaleMoreDownAnimation.value = withRepeat(withTiming(1.3), 2, true)

                    }
                })}
                ></Tab.Screen>

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
        backgroundColor: "#5F46F6",
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
       // marginBottom: Platform.OS == "android" ? 70 : 60,

        zIndex: 100,
    },
    tabButton:{
        position: 'absolute',
        top: 20,
        width: 40,
        height: 40,

        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    }
});