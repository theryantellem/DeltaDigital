import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import HeaderWithTitle from "../../../components/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {RootStackScreenProps} from "../../../types";
import Colors from "../../../constants/Colors";
import {fontPixel, heightPixel} from "../../../helpers/normalize";
import {Fonts} from "../../../constants/Fonts";
import {MyButton} from "../../../components/MyButton";

const ReviewScreen = ({navigation}: RootStackScreenProps<'ReviewScreen'>) => {


    const botComplete = () => {
      navigation.navigate('BotSuccess')
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#4E044B', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >


                <HeaderWithTitle title='Review'/>
                <KeyboardAwareScrollView style={{
                    width: '100%'
                }} contentContainerStyle={styles.scrollView} scrollEnabled
                                         showsVerticalScrollIndicator={false}>


                    <View style={styles.content}>
                        <View style={[styles.DetailsRowWrap, {
                            height: heightPixel(360),
                        }]}>


                            <View style={styles.head}>
                                <Text style={[styles.title, {
                                    fontFamily: Fonts.faktumBold
                                }]}>
                                    Review trade
                                    setting
                                </Text>


                            </View>


                            <View style={styles.Details}>

                                <Text style={styles.DetailTitleText}>
                                    Exchange
                                </Text>


                                <Text style={styles.DetailsText}>
                                    Binance
                                </Text>

                            </View>

                            <View style={styles.Details}>
                                <View style={styles.DetailsLeft}>
                                    <Text style={styles.DetailTitleText}>
                                        Margin call
                                    </Text>
                                    <Text style={[styles.DetailTitleText, {
                                        color: Colors.primaryLight,
                                        marginLeft: 15,
                                        fontSize: fontPixel(14)
                                    }]}>
                                        Edit</Text>
                                </View>
                                <Text style={[styles.DetailsText, {}]}>
                                    12
                                </Text>

                            </View>

                            <View style={styles.Details}>
                                <View style={styles.DetailsLeft}>
                                    <Text style={styles.DetailTitleText}>
                                        Stop loss
                                    </Text>
                                    <Text style={[styles.DetailTitleText, {
                                        color: Colors.primaryLight,
                                        marginLeft: 15,
                                        fontSize: fontPixel(14)
                                    }]}>
                                        Edit</Text>
                                </View>

                                <Text style={[styles.DetailsText, {
                                    fontFamily: Fonts.faktumMedium,

                                }]}>
                                    34%
                                </Text>

                            </View>

                            <View style={styles.Details}>
                                <View style={styles.DetailsLeft}>
                                    <Text style={styles.DetailTitleText}>
                                        Profit callback
                                    </Text>
                                    <Text style={[styles.DetailTitleText, {
                                        color: Colors.primaryLight,
                                        marginLeft: 15,
                                        fontSize: fontPixel(14)
                                    }]}>
                                        Edit</Text>
                                </View>
                                <Text style={[styles.DetailsText, {
                                    fontFamily: Fonts.faktumMedium,

                                }]}>
                                    120
                                </Text>

                            </View>


                            <View style={styles.Details}>
                                <Text style={styles.DetailTitleText}>
                                    Take profit
                                </Text>
                                <Text style={[styles.DetailsText, {
                                    fontFamily: Fonts.faktumMedium,

                                }]}>
                                    65
                                </Text>

                            </View>
                            <View style={styles.Details}>
                                <Text style={styles.DetailTitleText}>
                                    Strategy period
                                </Text>
                                <Text style={[styles.DetailsText, {
                                    fontFamily: Fonts.faktumMedium,

                                }]}>
                                    One shot
                                </Text>

                            </View>

                        </View>

                        <View style={[styles.DetailsRowMiddle]}>

                            <View style={styles.head}>
                                <Text style={[styles.title, {
                                    fontFamily: Fonts.faktumBold
                                }]}>
                                    Others
                                </Text>


                            </View>


                            <View style={[styles.Details, {
                                alignItems: 'center'
                            }]}>
                                <Text style={styles.DetailTitleText}>
                                    Asset pair
                                </Text>
                                <Text style={[styles.DetailsText, {
                                    fontFamily: Fonts.faktumSemiBold,
                                    color: Colors.success
                                }]}>
                                    BTC/USDT
                                </Text>

                            </View>

                        </View>


                        <View style={[styles.Details, {
                            height: heightPixel(30)
                        }]}>
                            <Text style={styles.DetailTitleText}>
                                Type
                            </Text>
                            <Text style={styles.DetailsText}>
                                Spot
                            </Text>
                        </View>

                    </View>


                </KeyboardAwareScrollView>

                <MyButton onPress={botComplete} style={[styles.button, {
                    backgroundColor: Colors.primary
                }]}>
                    <Text style={styles.buttonTxt}>
                        Continue
                    </Text>
                </MyButton>


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
        alignItems: "center"
    },
    scrollView: {
        width: '100%',
        alignItems: "center"
    },
    content: {
        width: '100%',
        alignItems: 'center'
    },
    DetailsRowWrap: {

        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    DetailsRowMiddle: {
        height: heightPixel(140),
        marginTop: 30,
        borderTopColor: Colors.borderColor,
        borderTopWidth: 1,

        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    Details: {
        height: heightPixel(45),
        width: '90%',

        flexDirection: "row",
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    DetailsLeft: {
        width: '80%',

        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    DetailsText: {
        color: Colors.lightText,
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(16),
    },
    DetailTitleText: {
        color: "#fff",
        fontFamily: Fonts.faktumMedium,
        fontSize: fontPixel(16),
    },
    head: {
        height: heightPixel(55),
        width: '90%',
        justifyContent: 'center'
    },
    title: {
        color: "#fff",
        fontSize: fontPixel(18),
        fontFamily: Fonts.faktumSemiBold
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
    },
})

export default ReviewScreen;
