import React from 'react';

import {Text, View, StyleSheet, ScrollView, TouchableOpacity, Image, Platform} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../../../helpers/normalize";
import TopBar from "../../../components/header/TopBar";
import Animated, {Easing, FadeInDown, FadeOutDown, Layout} from "react-native-reanimated";
import {Entypo, FontAwesome, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {Fonts} from "../../../constants/Fonts";
import Colors from "../../../constants/Colors";
import {RootTabScreenProps} from "../../../types";
import {useAppSelector} from "../../../app/hooks";

const CreateScreen = ({navigation}: RootTabScreenProps<'Create'>) => {
    const user = useAppSelector(state => state.user)
    const {userData, User_Details} = user
    const startBot = () => {
        navigation.navigate('SelectType')
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#4E044B', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}


            >
                <ScrollView style={{width: '100%',}} contentContainerStyle={styles.scrollView} scrollEnabled
                            showsVerticalScrollIndicator={false}
                >

                    <TopBar
                        profilePhoto={ User_Details.image? User_Details.image : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}
                        userName={User_Details.username}/>


                    <Animated.View style={styles.planContainer} layout={Layout.easing(Easing.bounce).delay(100)}
                                   entering={FadeInDown.springify()} exiting={FadeOutDown}>


                        <TouchableOpacity
                            onPress={startBot}
                            activeOpacity={0.8} style={[styles.plan,
                            {backgroundColor: '#090A1C'}]}>
                            <View style={styles.planTop}>

                                <MaterialCommunityIcons name="robot" size={20} color={Colors.primary}/>


                            </View>


                            <View style={styles.planBottom}>
                                <View style={styles.planBottomLeft}>
                                    <Text style={styles.planTitle}>
                                        Create bot
                                    </Text>
                                    <View style={styles.planDescriptionWrap}>
                                        <Text style={styles.planDescription}>
                                            Choose a bot type and add your own rules and conditions for trade entries
                                            and exits.
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

                                <MaterialIcons name="group-add" size={20} color="#fff"/>
                            </View>


                            <View style={styles.planBottom}>
                                <View style={styles.planBottomLeft}>
                                    <Text style={styles.planTitle}>
                                        Join strategy
                                    </Text>
                                    <View style={styles.planDescriptionWrap}>
                                        <Text style={styles.planDescription}>
                                            Setup a savings plan for a period of 3 - 6 months.
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
                                <MaterialCommunityIcons name="lightbulb-group" size={20} color="#fff"/>


                            </View>


                            <View style={styles.planBottom}>
                                <View style={styles.planBottomLeft}>
                                    <Text style={styles.planTitle}>
                                        Circle
                                    </Text>
                                    <View style={styles.planDescriptionWrap}>
                                        <Text style={styles.planDescription}>
                                            We are sharing over 80% of all our revenues with our affiliates are rewards
                                            for working together with us.
                                        </Text>
                                    </View>

                                </View>

                                <Entypo name="chevron-right" size={20} color="#60687E"/>

                            </View>
                        </TouchableOpacity>

                    </Animated.View>


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
        paddingBottom: Platform.OS === 'ios' ? -40 : 0

    },
    scrollView: {

        width: '100%',
        alignItems: 'center'
    },
    background: {
        flex: 1,
        width: '100%',
        paddingHorizontal: pixelSizeHorizontal(20),
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
        color: "#fff"
    },
    planDescription: {
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(12),
        color: "#EAF6EB",
        lineHeight: heightPixel(22)
    },
    planDescriptionWrap: {
        width: '90%'
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
})

export default CreateScreen;
