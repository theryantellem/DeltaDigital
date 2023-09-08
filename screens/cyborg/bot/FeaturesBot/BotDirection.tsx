import React from 'react';

import {Text, View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import HeaderWithTitle from "../../../../components/cyborg/header/HeaderWithTitle";
import HorizontalLine from "../../../../components/HorizontalLine";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../../../../helpers/normalize";
import {Fonts} from "../../../../constants/Fonts";
import Colors from "../../../../constants/Colors";
import Animated, {Easing, FadeInDown, FadeOutDown, Layout} from "react-native-reanimated";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {CyborgStackScreenProps, RootStackScreenProps} from "../../../../types";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {updateFeatureBotData} from "../../../../app/slices/dataSlice";

const BotDirection = ({navigation}:CyborgStackScreenProps<'BotDirection'>) => {

    const data = useAppSelector(state => state.data)
    const {featuresBotData} = data
    const dispatch = useAppDispatch()
    const selectContinue = (direction:string) => {
        const updatedData = {
           direction
        };
        dispatch(updateFeatureBotData(updatedData));
navigation.navigate('TradeSetting')
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


                    <HeaderWithTitle title='Features Bot' step totalStep={'6'} currentStep={'2'}/>

                    <View style={styles.planInfo}>
                        <Text style={styles.planTitle}>
                      Trade direction.
                        </Text>
                        <View style={styles.planMessage}>
                            <Text style={styles.planMessageTxt}>
                               Which direction do you want your Bot to Trade?
                            </Text>
                        </View>
                    </View>


                    <HorizontalLine/>



                    <Animated.View layout={Layout.easing(Easing.bounce).delay(100)}
                                   entering={FadeInDown.springify()} exiting={FadeOutDown}
                                   style={styles.choiceBoxContainer}>


                        <TouchableOpacity onPress={()=>selectContinue('Long')} activeOpacity={0.6} style={[styles.choiceBox, {


                        }]}>

                            <View style={styles.choiceBoxTop}>
                                <View style={[styles.choiceBoxIcon,{

                                }]}>
                                    <MaterialCommunityIcons name="arrow-top-right" size={16} color={Colors.successChart} />

                                </View>


                            </View>

                            <View style={styles.choiceBoxBody}>
                                <Text style={styles.choiceBoxName}>
                                    Long
                                </Text>
                                <Text style={styles.choiceBoxMessage}>
                                    Make money when the crypto price goes UP
                                </Text>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={()=>selectContinue('Short')}  activeOpacity={0.6}
                                          style={[styles.choiceBox, {}]}>

                            <View style={styles.choiceBoxTop}>
                                <View style={styles.choiceBoxIcon}>
                                    <Ionicons name="ios-arrow-down-sharp" size={16} color={Colors.errorRed} />

                                </View>


                            </View>

                            <View style={styles.choiceBoxBody}>
                                <Text style={[styles.choiceBoxName,{

                                }]}>
                                    Short
                                </Text>
                                <Text style={styles.choiceBoxMessage}>
                                    Make money when the crypto price goes DOWN
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
        height: heightPixel(90),
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
    choiceBoxContainer: {
        marginTop:50,
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
        height: heightPixel(100),
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
})

export default BotDirection;
