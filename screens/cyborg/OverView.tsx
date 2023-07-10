import React from 'react';

import {Text, View, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import Animated, {Easing, FadeInDown, FadeOutDown, Layout} from "react-native-reanimated";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical} from "../../helpers/normalize";
import {currencyFormatter} from "../../helpers";
import HeaderWithTitle from "../../components/header/HeaderWithTitle";
import {LinearGradient} from "expo-linear-gradient";
import {SafeAreaView} from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import {Fonts} from "../../constants/Fonts";
import {RootStackScreenProps} from "../../types";
import HorizontalLine from "../../components/HorizontalLine";
import {FontAwesome5, Ionicons, MaterialIcons} from "@expo/vector-icons";

const OverView = ({navigation}: RootStackScreenProps<'OverView'>) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#4E044B', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >


                <HeaderWithTitle title='Overview'/>
                <ScrollView style={{
                    width: '100%'
                }} contentContainerStyle={styles.scrollView} scrollEnabled
                            showsVerticalScrollIndicator={false}>


                    <View style={styles.planInfo}>
                        <Text style={styles.planTitle}>
                            All wallet balance
                        </Text>
                        <View style={styles.planMessage}>
                            <Text style={styles.planMessageTxt}>
                                Track and monitor are your wallet balance and profits
                            </Text>
                        </View>
                    </View>

                    <Animated.View entering={FadeInDown}
                                   layout={Layout.easing(Easing.bounce).delay(100)}
                                   exiting={FadeOutDown} style={styles.wallets}>

                        <TouchableOpacity style={[styles.walletCard,{
                            backgroundColor: Colors.secondary,
                        }]}
                                          activeOpacity={0.9}>
                            <View style={styles.logoCircle}>

                                {/*<Image source={require('../../../assets/images/brace-icon.png')}
                                       style={styles.logo}/>*/}

                                <Ionicons name="wallet-outline" size={24} color="#fff" />
                            </View>

                            <View style={styles.walletCardBody}>
                                <Text style={styles.cardTitle}>
                                    Account balance
                                </Text>
                                <Text style={styles.cardText}>
                                    Total balance
                                </Text>
                            </View>
                            <View style={styles.walletCardAmount}>
                                <Text style={[styles.cardTitle, {
                                    fontSize: fontPixel(14)
                                }]}>
                                    {


                                        currencyFormatter('en-US', 'USD').format(98765)
                                    }
                                </Text>
                            </View>

                        </TouchableOpacity>


                        <TouchableOpacity style={[styles.walletCard,{
                            backgroundColor: Colors.secondary,
                        }]} activeOpacity={0.9}>
                            <View style={styles.logoCircle}>

                                {/*<Image source={require('../../../assets/images/brace-icon.png')}
                                       style={styles.logo}/>*/}

                                <MaterialIcons name="stacked-line-chart" size={20} color="#fff" />
                            </View>

                            <View style={styles.walletCardBody}>
                                <Text style={styles.cardTitle}>
                                    Total profit
                                </Text>
                                <Text style={styles.cardText}>
                                    Total balance
                                </Text>
                            </View>
                            <View style={styles.walletCardAmount}>
                                <Text style={[styles.cardTitle, {
                                    fontSize: fontPixel(14)
                                }]}>
                                    {


                                        currencyFormatter('en-US', 'USD').format(98765)
                                    }
                                </Text>
                            </View>

                        </TouchableOpacity>


                    </Animated.View>
                    <HorizontalLine margin={20}/>

                    <View style={styles.planInfo}>
                        <Text style={styles.planTitle}>
                          Others
                        </Text>

                    </View>

                    <TouchableOpacity style={[styles.walletCard,{
                        borderWidth:1,
                        borderColor:Colors.secondary,
                    }]} activeOpacity={0.9}>
                        <View style={styles.logoCircle}>

                            {/*<Image source={require('../../../assets/images/brace-icon.png')}
                                       style={styles.logo}/>*/}
                            <FontAwesome5 name="compress-arrows-alt" size={20} color="#ffff" />

                        </View>

                        <View style={styles.walletCardBody}>
                            <Text style={styles.cardTitle}>
                                Direct earnings
                            </Text>
                            <Text style={styles.cardText}>
                                Counted every hour
                            </Text>
                        </View>
                        <View style={styles.walletCardAmount}>
                            <Text style={[styles.cardTitle, {
                                fontSize: fontPixel(14)
                            }]}>
                                {


                                    currencyFormatter('en-US', 'USD').format(765)
                                }
                            </Text>
                        </View>

                    </TouchableOpacity>


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
        alignItems: "center"
    },
    scrollView: {
        width: '100%',
        alignItems: "center"
    },
    wallets: {
        width: '100%',
        minHeight: heightPixel(270),
        alignItems: 'center',

        paddingVertical: pixelSizeVertical(20),
        justifyContent: 'space-evenly',
    },
    walletCard: {
        width: '90%',
        borderRadius: 10,
        height: heightPixel(90),
        alignItems: 'center',
        justifyContent: 'space-between',


        padding: 16,
        flexDirection: "row",

    },

    logoCircle: {
        width: 40,
        height: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.textDark
    },
    logo: {
        width: 30,
        height: 30,
        resizeMode: 'cover',

    },
    walletCardBody: {
        width: '55%',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        height: heightPixel(50)

    },
    cardTitle: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(16),
        color: Colors.text,
    },
    cardText: {
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(14),
        color: "#6B7280",
    },
    walletCardAmount: {
        width: '25%',

        alignItems: 'flex-end',
        justifyContent: 'center',
        height: heightPixel(50)

    },
    planInfo: {
        width: '100%',
        paddingHorizontal: pixelSizeHorizontal(20),
        minHeight: heightPixel(40),
        alignItems: 'flex-start',
        justifyContent: 'flex-start',

    },
    planTitle: {
        color: "#fff",
        fontSize: fontPixel(18),
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
})

export default OverView;
