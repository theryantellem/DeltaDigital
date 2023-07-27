import React, {useCallback, useState} from 'react';

import {Text, View, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import {RootStackScreenProps} from "../types";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {AntDesign, Entypo, FontAwesome, MaterialIcons, Octicons} from "@expo/vector-icons";
import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../helpers/normalize";
import {Fonts} from "../constants/Fonts";
import Colors from "../constants/Colors";
import {useFocusEffect} from "@react-navigation/native";
import Animated, {Easing, FadeInDown, FadeOutDown, Layout} from 'react-native-reanimated';
import {CyborgBottomTab} from "../navigation/cyborg";
import {useAppSelector} from "../app/hooks";
import FastImage from "react-native-fast-image";
import {useQuery} from "@tanstack/react-query";
import {checkUserPlan, getUser} from "../api";
import {useRefreshOnFocus} from "../helpers";

const LandingScreen = ({navigation}: RootStackScreenProps<'LandingScreen'>) => {
    const user = useAppSelector(state => state.user)
    const {User_Details} = user

    const [greeting, setGreeting] = useState('');


  //const {} =  useQuery(['checkUserPlan',User_Details.id],()=>checkUserPlan(User_Details.id))

    const {data, refetch,isLoading} = useQuery(['user-data'],()=> getUser(User_Details.id))



    useFocusEffect(
        useCallback(() => {
            // Do something when the screen is focused
            const hour = new Date().getHours();
            const welcomeTypes = ["Morning",
                "Good Day",
                "Hi",];
            let welcomeText = "";

            if (hour <= 12) welcomeText = welcomeTypes[0];
            else if (hour < 10) welcomeText = welcomeTypes[3];
            else if (hour < 18) welcomeText = welcomeTypes[1];
            else welcomeText = welcomeTypes[2]

            setGreeting(welcomeText)
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );

    const CyborgHome = () => {
        navigation.navigate('CyborgBottomTab')
    }

    useRefreshOnFocus(refetch)

    return (
        <SafeAreaView style={styles.safeArea}>
            {

                isLoading &&
                <View style={styles.loading}>
                    <ActivityIndicator size='large' color={Colors.primary}/>
                </View>

            }

            <LinearGradient style={styles.background}
                            colors={['#4E044B', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}


            >
                <View style={styles.topBar}>
                    <View style={styles.leftButton}>
                        <View style={styles.userImageWrap}>






                                <FastImage
                                style={styles.tAvatar}
                            source={{
                                uri: User_Details.image ? User_Details.image : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
                                cache: FastImage.cacheControl.web,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />


                        </View>
                        <View style={styles.userDetails}>
                            <Text style={styles.greeting}>
                                {greeting}, {User_Details.username}
                            </Text>
                            <Text style={styles.tag}>
                                Welcome back
                            </Text>
                        </View>
                    </View>


                </View>


                <ScrollView style={{width: '100%',}} contentContainerStyle={styles.scrollView} scrollEnabled
                            showsVerticalScrollIndicator={false}>


                    {

                        !isLoading &&
                    <>

                    <View style={styles.introTextWrap}>
                        <Text style={styles.titleText}>
                            Delta Signal
                        </Text>

                        <Text style={styles.textSub}>
                            Safe & secure way to send and
                            spend on what you want
                        </Text>
                    </View>

                    <Animated.View style={styles.planContainer} layout={Layout.easing(Easing.bounce).delay(100)} entering={FadeInDown.springify()} exiting={FadeOutDown}>


                        <TouchableOpacity
                            onPress={CyborgHome}
                            activeOpacity={0.8} style={[styles.plan,
                            {backgroundColor: '#090A1C'}]}>
                            <View style={styles.planTop}>
                                <View style={styles.imageCover}>
                                    <Image source={require('../assets/images/cyborg-logo.png')} style={styles.imageLogo}/>
                                </View>



                                <View style={styles.APYPill}>
                                    <Text style={styles.apyText}>
                                        Spot/Future
                                    </Text>
                                </View>
                            </View>


                            <View style={styles.planBottom}>
                                <View style={styles.planBottomLeft}>
                                    <Text style={styles.planTitle}>
                                        Cyborg
                                    </Text>
                                    <View style={styles.planDescriptionWrap}>
                                        <Text style={styles.planDescription}>
                                            $185,600
                                        </Text>
                                    </View>

                                </View>

                                <Entypo name="chevron-right" size={20} color="#60687E"/>

                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity

                            activeOpacity={0.8} style={[styles.plan,
                            {backgroundColor: '#090A1C'}]}>
                            <View style={styles.planTop}>
                                <FontAwesome name="graduation-cap" size={20} color="#fff"/>

                                <View style={styles.APYPill}>
                                    <Text style={styles.apyText}>
                                        Learn
                                    </Text>
                                </View>
                            </View>


                            <View style={styles.planBottom}>
                                <View style={styles.planBottomLeft}>
                                    <Text style={styles.planTitle}>
                                        Finix
                                    </Text>
                                    <View style={styles.planDescriptionWrap}>
                                        <Text style={styles.planDescription}>
                                            $85,000
                                        </Text>
                                    </View>

                                </View>

                                <Entypo name="chevron-right" size={20} color="#60687E"/>

                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity

                            activeOpacity={0.8} style={[styles.plan,
                            {backgroundColor: '#090A1C'}]}>
                            <View style={styles.planTop}>

                                <MaterialIcons name="waterfall-chart" size={20} color="#fff"/>
                                <View style={styles.APYPill}>
                                    <Text style={styles.apyText}>
                                        Forex
                                    </Text>
                                </View>
                            </View>


                            <View style={styles.planBottom}>
                                <View style={styles.planBottomLeft}>
                                    <Text style={styles.planTitle}>
                                        Starfox
                                    </Text>
                                    <View style={styles.planDescriptionWrap}>
                                        <Text style={styles.planDescription}>
                                            $31,400
                                        </Text>
                                    </View>

                                </View>

                                <Entypo name="chevron-right" size={20} color="#60687E"/>

                            </View>
                        </TouchableOpacity>

                    </Animated.View>
                    </>
                    }

                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        width: '100%',
        backgroundColor: "#141621",
        alignItems: 'center',

    },
    background: {
        flex: 1,
        width: '100%',
        paddingHorizontal: pixelSizeHorizontal(20),
    },
    scrollView: {
        //  backgroundColor: Colors.background,

        width: '100%',
        alignItems: 'center'
    },
    topBar: {
        width: '100%',
        height: heightPixel(90),

        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    topTabButtons: {
        width: '90%',
        height: heightPixel(60),
        justifyContent: 'flex-start'

    },


    leftButton: {
        width: '100%',
        height: '90%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    userDetails: {
        width: '82%',
        height: '50%',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        marginHorizontal: pixelSizeHorizontal(10)
    },
    greeting: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(16),
        color: "#fff",
    },
    tag: {
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(14),
        color: "#D9D9D9",
    },

    userImageWrap: {
        width: 42,
        height: 42,
        alignItems: 'center',
        borderRadius: 45,
        overflow: 'hidden'
    },
    userImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'

    },

    tAvatar: {
        borderRadius: 100,
        resizeMode: 'cover',
        width: '100%',
        height: '100%'
    },
    planContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: heightPixel(630)
    },
    plan: {
        height: heightPixel(200),
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    planBottom: {
        width: '100%',
        alignItems: 'center',
        height: heightPixel(80),
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    planBottomLeft: {
        width: '80%',
        alignItems: 'flex-start',
        height: '100%',
        justifyContent: 'space-evenly'
    },
    planTitle: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(20),
        color: Colors.primary
    },
    planDescription: {
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(14),
        color: "#EAF6EB",
        lineHeight: heightPixel(22)
    },
    planDescriptionWrap: {
        width: '60%'
    },
    planTop: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        height: heightPixel(60),
        justifyContent: 'space-between'
    },
    APYPill: {
        paddingHorizontal: pixelSizeHorizontal(15),
        backgroundColor: Colors.secondary,
        minWidth: widthPixel(100),
        borderRadius: 20,
        height: heightPixel(35),
        alignItems: 'center',
        justifyContent: 'center'
    },
    apyText: {
        fontFamily: Fonts.faktumMedium,
        fontSize: fontPixel(14),
        color: "#fff"
    },
    introTextWrap: {
        height: heightPixel(140),
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(24),
        color: "#fff"
    },
    textSub: {
        textAlign: 'center',
        fontFamily: Fonts.faktumMedium,
        fontSize: fontPixel(18),
        color: "#d9d9d9"
    },
    imageCover:{

        height:35,
        width:35,
        alignItems:'center',
        justifyContent:'center',

    },
    imageLogo:{
        width:'100%',
        height:'100%',
        resizeMode:'cover',
    },
    loading: {
        flex:1,
        width:'100%',
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex:1,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'rgba(0,0,0,0.3)'
    }

})

export default LandingScreen;
