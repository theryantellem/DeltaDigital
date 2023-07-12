import React, {SetStateAction, useState} from 'react';

import {Text, View, StyleSheet, ScrollView, TouchableOpacity, Platform} from 'react-native';
import HeaderWithTitle from "../../../components/header/HeaderWithTitle";
import {LinearGradient} from "expo-linear-gradient";
import {SafeAreaView} from "react-native-safe-area-context";
import {RootStackScreenProps} from "../../../types";
import {currencyFormatter} from "../../../helpers";
import {Feather, FontAwesome5, Ionicons} from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from '../../../helpers/normalize';
import {Fonts} from "../../../constants/Fonts";
import HorizontalLine from "../../../components/HorizontalLine";
import IOSSegmentContol from "../../../components/segment-control/IOSSegmentContol";
import SegmentedControl from "../../../components/segment-control/SegmentContol";

const Assets = ({navigation}: RootStackScreenProps<'Assets'>) => {

    const [tabIndex, setTabIndex] = useState(0);
    const handleTabsChange = (index: SetStateAction<number>) => {
        setTabIndex(index);
        //  setScreen(index === 0 ? 'Banks' : 'Wallets')
    };


    const navigate = (screen: 'DepositScreen' | 'TransferScreen' | 'WithdrawalAmount') => {
        navigation.navigate(screen)
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#04074E', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >


                <HeaderWithTitle title='Assets'/>
                <ScrollView style={{
                    width: '100%'
                }} contentContainerStyle={styles.scrollView} scrollEnabled
                            showsVerticalScrollIndicator={false}>


                    <View style={styles.balanceCanvas}>
                        <View style={styles.balanceTop}>

                            <TouchableOpacity style={styles.balanceTitle}>
                                <Text style={styles.balText}>
                                    Available asset (USDT)
                                </Text>

                                <Ionicons name="eye-off-outline" size={18} color={Colors.text}/>

                            </TouchableOpacity>

                            <View style={styles.balanceGraph}>

                                <Text
                                    style={styles.balance}>

                                    {currencyFormatter('en-US', 'USD').format(434343)}
                                </Text>

                            </View>
                            <Text style={styles.walletAddressTxt}>
                                <Text style={{color: Colors.success}}>+$150</Text> Total fee
                            </Text>
                        </View>
                        <View style={styles.walletAddress}>


                            <Text style={styles.walletAddressTxt}>
                                Data is counted by every month
                            </Text>


                        </View>
                    </View>


                    <View style={styles.dashButtonContainer}>

                        <TouchableOpacity
                            onPress={() => navigate('DepositScreen')}
                            activeOpacity={0.6} style={styles.dashButton}>
                            <View style={[styles.dashIcon]}>
                                <Feather name="dollar-sign" size={24} color="#fff"/>
                            </View>
                            <Text style={styles.dashText}>
                                Deposit
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate('TransferScreen')} activeOpacity={0.6}
                                          style={styles.dashButton}>
                            <View style={styles.dashIcon}>
                                <FontAwesome5 name="exchange-alt" size={20} color="#fff"/>
                            </View>
                            <Text style={styles.dashText}>
                                Transfer
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>navigate('WithdrawalAmount')} activeOpacity={0.6}
                                          style={styles.dashButton}>
                            <View style={styles.dashIcon}>
                                <Ionicons name="ios-arrow-down-sharp" size={24} color="#fff"/>
                            </View>
                            <Text style={styles.dashText}>
                                Withdraw
                            </Text>

                        </TouchableOpacity>
                    </View>

                    <HorizontalLine margin={20}/>


                    {
                        Platform.OS === 'ios' ?

                            <IOSSegmentContol tabs={["Deposits", "Withdrawal", "Transfers"]}
                                              currentIndex={tabIndex}
                                              onChange={handleTabsChange}
                                              segmentedControlBackgroundColor={'#7676801F'}
                                              activeSegmentBackgroundColor={"#fff"}
                                              activeTextColor={Colors.textDark}
                                              textColor={"#fff"}
                                              paddingVertical={pixelSizeVertical(12)}/>
                            :

                            <SegmentedControl tabs={["Deposits", "Withdrawal", "Transfers"]}
                                              currentIndex={tabIndex}
                                              onChange={handleTabsChange}
                                              segmentedControlBackgroundColor={Colors.tintPrimary}
                                              activeSegmentBackgroundColor={Colors.primary}
                                              activeTextColor={Colors.textDark}
                                              textColor={"#CDD4D7"}
                                              paddingVertical={pixelSizeVertical(16)}/>
                    }

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
    balanceCanvas: {
        width: '100%',

        height: heightPixel(160),
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    balanceTop: {
        width: '100%',
        height: '75%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    balanceTitle: {

        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: heightPixel(30),
    },
    balText: {
        fontFamily: Fonts.faktumMedium,
        color: Colors.tintText,
        fontSize: fontPixel(12),
        marginRight: 5,
    },
    balanceGraph: {
        width: '90%',
        height: heightPixel(45),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',

    },
    balance: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(36),
        color: Colors.text
    },
    walletAddress: {
        height: 30,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    walletAddressTxt: {

        color: "#CCCCCC",
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(12)
    },
    horizontalLine: {
        marginTop: 20,
        width: '100%',
        borderBottomColor: Colors.borderColor,
        borderBottomWidth: 1,

    },
    dashButtonContainer: {
        width: '90%',
        height: heightPixel(140),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    dashButton: {
        width: heightPixel(70),
        height: heightPixel(80),

        alignItems: 'center',
        justifyContent: 'space-between'

    },
    dashIcon: {
        width: 50,
        height: 50,
        backgroundColor: Colors.secondary,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: "center"
    },
    dashText: {
        color: Colors.text,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumMedium
    },
})

export default Assets;
