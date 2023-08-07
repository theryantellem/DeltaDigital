import React from 'react';

import {Text, View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {Ionicons} from "@expo/vector-icons";
import {MyButton} from "../../../components/MyButton";
import Colors from "../../../constants/Colors";
import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../../../helpers/normalize";
import {Fonts} from "../../../constants/Fonts";
import HeaderWithTitle from "../../../components/header/HeaderWithTitle";
import {LinearGradient} from "expo-linear-gradient";
import HorizontalLine from "../../../components/HorizontalLine";
import Animated, {Easing, FadeInDown, FadeOutDown, Layout} from 'react-native-reanimated';
import {RootStackScreenProps} from "../../../types";
import AllStrategy from "./strategy/AllStrategy";

const SelectType = ({navigation}:RootStackScreenProps<'SelectType'>) => {

    const selectContinue = () => {
      navigation.navigate('SelectExchange')
    }


    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#4E044B', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}


            >
                <ScrollView style={{
                    width: '100%'
                }} contentContainerStyle={styles.scrollView} scrollEnabled
                            showsVerticalScrollIndicator={false}>


                    <HeaderWithTitle title='Select bot'/>

                    <View style={styles.planInfo}>
                        <Text style={styles.planTitle}>
                            Select Bot
                        </Text>
                        <View style={styles.planMessage}>
                            <Text style={styles.planMessageTxt}>
                                Your bot trades in both upward and downwards market trends to give profits or stop ;
                            </Text>
                        </View>
                    </View>


                    <HorizontalLine/>
                    <View style={styles.contentMsg}>
                        <Text style={styles.contentMsgTxt}>
                            How would you like to make your Bot?
                        </Text>
                    </View>


                    <Animated.View layout={Layout.easing(Easing.bounce).delay(100)}
                                   entering={FadeInDown.springify()} exiting={FadeOutDown}
                                   style={styles.choiceBoxContainer}>


                        <TouchableOpacity onPress={selectContinue} activeOpacity={0.6} style={[styles.choiceBox, {
                            borderWidth: 1,
                            borderColor: Colors.blue
                        }]}>

                            <View style={styles.choiceBoxTop}>
                                <View style={styles.choiceBoxIcon}>
                                    <Ionicons name="lock-closed-outline" size={16} color="#fff"/>
                                </View>


                            </View>

                            <View style={styles.choiceBoxBody}>
                                <Text style={styles.choiceBoxName}>
                                    Spot
                                </Text>
                                <Text style={styles.choiceBoxMessage}>
                                    Slow, steady returns with lower risk
                                </Text>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity activeOpacity={0.6} style={[styles.choiceBox, {}]}>

                            <View style={styles.choiceBoxTop}>
                                <View style={styles.choiceBoxIcon}>
                                    <Ionicons name="lock-closed-outline" size={16} color="#fff"/>
                                </View>


                            </View>

                            <View style={styles.choiceBoxBody}>
                                <Text style={styles.choiceBoxName}>
                                    Futures
                                </Text>
                                <Text style={styles.choiceBoxMessage}>
                                    Quick, big returns with higher risk
                                </Text>
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
        width: '100%',
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#141621",
    },
    background: {
        flex: 1,
        width: '100%',

    },
    topBar: {
        height: heightPixel(100),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: pixelSizeHorizontal(15)
    },

    count: {
        width: widthPixel(60),
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    countText: {

        fontSize: fontPixel(20),
        fontFamily: Fonts.faktumMedium
    },
    title: {
        color: Colors.textDark,
        fontSize: fontPixel(18),
        fontFamily: Fonts.faktumBold
    },
    scrollView: {

        width: '100%',
        alignItems: "center"
    },
    planInfo: {
        width: '100%',
        paddingHorizontal: pixelSizeHorizontal(20),
        height: heightPixel(130),
        alignItems: 'flex-start',
        justifyContent: 'flex-start',

    },
    planTitle: {
        color: "#fff",
        fontSize: fontPixel(24),
        fontFamily: Fonts.faktumBold
    },
    planMessage: {
        width: '80%',
        marginTop: 10,
    },
    planMessageTxt: {

        color: Colors.tintText,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumRegular
    },
    contentMsg: {
        width: '90%',
        height: heightPixel(90),
        alignItems: 'flex-start',
        justifyContent: 'center'

    },
    contentMsgTxt: {
        width: '70%',
        fontFamily: Fonts.faktumSemiBold,
        fontSize: fontPixel(16),
        color: Colors.tintText,
        lineHeight: heightPixel(22),
    },
    choiceBoxContainer: {
        width: '90%',
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: heightPixel(450),
    },
    choiceBox: {
        backgroundColor: Colors.secondary,
        width: widthPixel(180),
        height: heightPixel(200),
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    choiceBoxTop: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: heightPixel(40)
    },
    choiceBoxIcon: {
        width: 30,
        height: 30,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#062638"
    },
    percentage: {
        fontFamily: Fonts.faktumMedium,
        fontSize: fontPixel(14),
        color: Colors.textDark
    },
    choiceBoxBody: {
        width: '100%',
        height: heightPixel(90),
        justifyContent: 'flex-start',
    },
    choiceBoxName: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(16),
        color: Colors.text
    },
    choiceBoxMessage: {
        marginTop: 8,
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(14),
        color: Colors.tintText,
        lineHeight: heightPixel(20)
    },
    button: {
        width: '90%',
        bottom: 0,
        justifyContent: 'center',
    },
    buttonTxt: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(18),
        color: "#fff"
    }
})

export default SelectType;
