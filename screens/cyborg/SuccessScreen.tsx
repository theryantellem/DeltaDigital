import React from 'react';

import {Text, View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {fontPixel, heightPixel, pixelSizeVertical, widthPixel} from "../../helpers/normalize";
import {Ionicons, Octicons} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import {Fonts} from "../../constants/Fonts";
import HeaderWithTitle from "../../components/cyborg/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Animated, {Easing, FadeInDown, FadeOutDown, Layout} from "react-native-reanimated";
import {CyborgStackScreenProps, RootStackScreenProps} from "../../types";
import HorizontalLine from "../../components/HorizontalLine";

const SuccessScreen = ({navigation, route}: CyborgStackScreenProps<'SuccessScreen'>) => {

    const {type, message, title, origin, trade_type,market,exchange,id } = route.params


    const goNextScreen = () => {

        if(origin == 'BotToggle'){
          navigation.navigate('CyborgHome')
        }else if(origin == 'TradeSetting'){
            navigation.navigate('LogScreen', {
                screenFrom: 'CyborgHome',
                trade_type,
                market,
                id,
                exchange,
            })
        }else{
            navigation.navigate('CyborgHome')
        }
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

                    <View style={styles.container}>


                        <Animated.View key={'title-info'} layout={Layout.easing(Easing.bounce).delay(100)}
                                       entering={FadeInDown.springify()} exiting={FadeOutDown} style={[styles.topWrap, {
                            height: heightPixel(80)
                        }]}>


                            <Text style={styles.title}>
                                {title}
                            </Text>

                            <Text style={styles.message}>
                                {message}
                            </Text>

                        </Animated.View>


                        <Animated.View key={"checked"} layout={Layout.easing(Easing.bounce).delay(50)}
                                       entering={FadeInDown.springify()} exiting={FadeOutDown}
                                       style={styles.circleCheck}>
                            <Octicons name="check" size={34} color="#fff"/>
                        </Animated.View>


                       {/* <Text style={styles.noticeText}>
                            You will be notified as soon as it is completed typically within 5 minutes
                        </Text>*/}

                    </View>

                    <TouchableOpacity style={styles.button}
                                      onPress={goNextScreen}>
                        <Text style={styles.btnText}>
                            Continue
                        </Text>
                    </TouchableOpacity>
                </ScrollView>


            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    button: {
        width: widthPixel(120),
        height: heightPixel(60),
        borderRadius: 10,

        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',

    },
    btnText: {
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumBold,
        color: Colors.text
    },
    successCenter: {
        flex: 0.7,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    wrap: {

        width: '90%',
        alignItems: 'center',

    },
    circleCheck: {
        marginVertical: pixelSizeVertical(55),
        height: 80,
        width: 80,
        borderRadius: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.success
    },
    circleClose: {
        marginVertical: pixelSizeVertical(5),
        height: 80,
        width: 80,
        borderRadius: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.errorRed
    },
    title: {

        textAlign: 'center',

        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(24),
        color: Colors.text
    },
    message: {

        textAlign: 'center',
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(16),
        color: Colors.tintText
    },
    scrollView: {
        width: '100%',
        alignItems: "center"
    },
    safeArea: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#141621",
    },
    background: {

        flex: 1,
        width: '100%',
        alignItems: "center"
    },
    container: {
        height: heightPixel(600),
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    topWrap: {
        marginTop: 15,
        width: '80%',
        alignItems: 'center',

        justifyContent: 'space-evenly',
        height: heightPixel(100)
    },
    DetailsTitle: {
        fontFamily: Fonts.faktumSemiBold,
        fontSize: fontPixel(18),
        color: Colors.text
    },
    details: {
        width: '90%',
        alignItems: 'center',
        height: 85,
        justifyContent: 'space-between',
    },
    rowDetails: {
        width: '100%',
        flexDirection: 'row',
        height: 35,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    amountText: {
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(14),
        color: Colors.text
    },
    noticeText: {
        width: '70%',
        marginVertical: pixelSizeVertical(55),
        textAlign: 'center',
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(14),
        color: Colors.text
    }
})

export default SuccessScreen;
