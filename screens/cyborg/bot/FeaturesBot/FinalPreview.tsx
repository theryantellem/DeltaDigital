import React from 'react';

import {Text, View, StyleSheet, ScrollView,Image} from 'react-native';
import HeaderWithTitle from "../../../../components/cyborg/header/HeaderWithTitle";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {Fonts} from "../../../../constants/Fonts";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";
import {fontPixel, heightPixel, pixelSizeVertical, widthPixel} from "../../../../helpers/normalize";
import Colors from "../../../../constants/Colors";
import {useAppSelector} from "../../../../app/hooks";
import {MyButton} from "../../../../components/MyButton";
import {CyborgStackScreenProps, RootStackScreenProps} from "../../../../types";

const FinalPreview = ({navigation}:CyborgStackScreenProps<'FinalPreview'>) => {

    const dataSlice = useAppSelector(state => state.data)
    const {featureBotManualConfig, featuresBotData} = dataSlice


    const submit = () => {
navigation.navigate('SuccessScreen',{
    title:'Feature Bot Created',
    message:'Trading will start when turn this bot on',
    type:"success"
})
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


                    <HeaderWithTitle title='Configure Manually' step currentStep={'4'} totalStep={'4'}/>



                    <View style={styles.topDetails}>
                        <View style={styles.iconCircle}>

                            <FontAwesome5 name="robot" size={24} color="#fff" />
                        </View>
                        {/*<Text style={styles.amountLarge}>
      Review your trading bot setup
                        </Text>*/}
                    </View>

                    <View style={styles.notice}>
                        <Text style={styles.noticeText}>
                            Review your trading bot setup
                        </Text>

                    </View>

                    <View style={styles.details}>


                        <View style={[styles.detailsRow, {
                            borderBottomWidth: 1,
                            borderBottomColor: Colors.borderColor,
                        }]}>
                            <View style={[styles.detailsWrap, {
                                justifyContent: 'flex-start'
                            }]}>
                                <Text style={styles.leftText}>
                             Market
                                </Text>
                            </View>

                            <View style={[styles.detailsWrapRight, {

                            }]}>
                                <Text style={styles.rightText}>
                                    {featuresBotData.assetName} ({featuresBotData.assetSymbol.toUpperCase()})
                                </Text>
                            </View>
                        </View>


                        <View style={[styles.detailsRow, {
                            borderBottomWidth: 1,
                            borderBottomColor: Colors.borderColor,
                        }]}>
                            <View style={[styles.detailsWrap, {
                                justifyContent: 'flex-start'
                            }]}>
                                <Text style={styles.leftText}>
                                Amount
                                </Text>
                            </View>

                            <View style={[styles.detailsWrapRight, {

                            }]}>
                                <Text style={styles.rightText}>
                                    ${featureBotManualConfig.amount}
                                </Text>
                            </View>
                        </View>

                        <View style={[styles.detailsRow, {}]}>
                            <View style={[styles.detailsWrap, {
                                justifyContent: 'flex-start'
                            }]}>

                                <Text style={styles.leftText}>
                                Exchange to trade on
                                </Text>

                            </View>

                            <View style={[styles.detailsWrapRight, {

                            }]}>
                                <Text style={styles.rightText}>
                                    {featuresBotData.exchange}

                                </Text>
                            </View>
                        </View>
                    </View>




                    <View style={[styles.details,{
                        marginTop: 10,
                    }]}>


                        <View style={[styles.detailsRow, {
                            borderBottomWidth: 1,
                            borderBottomColor: Colors.borderColor,
                        }]}>
                            <View style={[styles.detailsWrap]}>
                                <Text style={styles.leftText}>
                             Trade direction
                                </Text>
                            </View>

                            <View style={[styles.detailsWrapRight]}>
                                <Text style={[styles.rightText,{
                                    color: featuresBotData.direction == 'Short' ? Colors.errorRed : Colors.successChart
                                }]}>
                                    {featuresBotData.direction}
                                </Text>
                            </View>
                        </View>


                        <View style={[styles.detailsRow, {
                            borderBottomWidth: 1,
                            borderBottomColor: Colors.borderColor,
                        }]}>
                            <View style={[styles.detailsWrap]}>
                                <Text style={styles.leftText}>
                                    Strategy Period
                                </Text>
                            </View>

                            <View style={[styles.detailsWrapRight]}>
                                <Text style={styles.rightText}>
                                    {featureBotManualConfig.strategyPeriod}
                                </Text>
                            </View>
                        </View>

                        <View style={[styles.detailsRow, {
                            borderBottomWidth: 1,
                            borderBottomColor: Colors.borderColor,
                        }]}>
                            <View style={[styles.detailsWrap, {

                            }]}>

                                <Text style={styles.leftText}>
                             Initial Entry Amount Per Trade
                                </Text>

                            </View>

                            <View style={[styles.detailsWrapRight]}>
                                <Text style={styles.rightText}>
                                    {featureBotManualConfig.initialEntryAmount}

                                </Text>
                            </View>
                        </View>


                        <View style={[styles.detailsRow, {}]}>
                            <View style={[styles.detailsWrap, {

                            }]}>

                                <Text style={styles.leftText}>
                                    Number Of Entries
                                </Text>

                            </View>

                            <View style={[styles.detailsWrapRight]}>
                                <Text style={styles.rightText}>
                                    {featureBotManualConfig.numberOfEntry}

                                </Text>
                            </View>
                        </View>
                    </View>




                    <View style={styles.transactionStatusBox}>

                        <View style={styles.userImage}>
                            <Image source={{uri:'https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663'}} style={styles.logo}/>
                        </View>
                        <View style={styles.innerBoxBody}>
                            <View style={styles.innerBox}>
                                <Text style={styles.innerBoxAmount}>
                                   10% of gained profit
                                </Text>

                                <Text style={styles.innerBoxStatus}>
                                300
                                </Text>

                                <Text style={styles.innerBoxDate}>

                             Total Estimated Profit
                                </Text>
                            </View>
                        </View>
                        <Text style={[styles.innerBoxStatus, {
                            color: "#E5E7EB"
                        }]}>
                 40$
                        </Text>

                    </View>


                    <MyButton onPress={submit}  style={[styles.button, {
                        backgroundColor:  Colors.primary
                    }]}>
                        <Text style={styles.buttonTxt}>
                            Continue
                        </Text>
                    </MyButton>
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
    scrollView: {

        width: '100%',
        alignItems: "center"
    },
    topDetails: {
        width: '100%',
        alignItems: 'center',
        height: heightPixel(100),
        justifyContent: 'space-evenly',
    },

    iconCircle: {
        width: widthPixel(60),
        height: heightPixel(60),
        borderRadius: 45,
        backgroundColor: Colors.secondary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    amountLarge: {
        color: Colors.text,
        fontSize: fontPixel(24),
        fontFamily: Fonts.faktumBold
    },
    details: {
        width: '90%',
        marginTop: 5,
        borderRadius: 10,
        alignItems: 'center',
        minHeight: heightPixel(150),
        justifyContent: 'space-evenly',
        shadowColor: "#333",
        backgroundColor: Colors.secondary,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.12,
        shadowRadius: 4.22,
        elevation: 3,
    },
    detailsRow: {
        width: '100%',
        height: 55,
        flexDirection: 'row',

        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    detailsWrap: {
        width: '55%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    detailsWrapRight: {
        width: '30%',
        height: '100%',
        flexDirection: 'row',
justifyContent:'flex-end',
        alignItems: 'center',

    },
    leftText:{
        fontSize: fontPixel(14),
        color:Colors.lightText,
        fontFamily: Fonts.faktumMedium
    },
    rightText:{
        fontSize: fontPixel(14),
        color:Colors.text,
        fontFamily: Fonts.faktumSemiBold
    },
    detailsTitle: {

        fontFamily: Fonts.faktumBold,
        color: "#4B5563",
        fontSize: fontPixel(16)
    },
    notice: {
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        height: heightPixel(70)
    },
    noticeText: {
        fontFamily: Fonts.faktumMedium,
        color: Colors.tintText,
        fontSize: fontPixel(14),
        textAlign: 'center'
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
    transactionStatusBox: {
        marginVertical: pixelSizeVertical(40),
        height: heightPixel(200),
        width: '90%',
        borderRadius: 10,
        borderWidth:1,
        borderColor: Colors.borderColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerBoxBody: {

        width: '80%',
        height: '70%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    userImage: {
        position: 'absolute',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: Colors.successChart,
        height: 50,
        width: 50,
        borderRadius: 70,
        top: -30,
        borderColor: Colors.borderColor,
        borderWidth: 2,
    },
    logo:{
        borderRadius:70,
        width:'80%',
        height:'80%',
        resizeMode:'cover'
    },
    innerBox: {
        marginTop: 10,
        width: '90%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'space-evenly',

    },
    innerBoxDate: {
        color: "#E5E7EB",
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumSemiBold
    },
    innerBoxAmount: {
        color: "#F9FAFB",
        fontSize: fontPixel(18),
        fontFamily: Fonts.faktumMedium
    },
    innerBoxStatus: {
        color: "#9CA3AF",
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumRegular
    },
})

export default FinalPreview;
