import React, {SetStateAction, useState} from 'react';

import {Text, View, StyleSheet, ScrollView, TouchableOpacity, Platform, ActivityIndicator} from 'react-native';
import HeaderWithTitle from "../../../components/header/HeaderWithTitle";
import {LinearGradient} from "expo-linear-gradient";
import {SafeAreaView} from "react-native-safe-area-context";
import {RootStackScreenProps} from "../../../types";
import {currencyFormatter, truncateString, useRefreshOnFocus} from "../../../helpers";
import {Feather, FontAwesome5, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from '../../../helpers/normalize';
import {Fonts} from "../../../constants/Fonts";
import HorizontalLine from "../../../components/HorizontalLine";
import IOSSegmentContol from "../../../components/segment-control/IOSSegmentContol";
import SegmentedControl from "../../../components/segment-control/SegmentContol";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getAsset} from "../../../api";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import dayjs from "dayjs";
import {IF} from "../../../helpers/ConditionJsx";
import Animated, {
    Easing,
    FadeInDown,
    FadeInLeft,
    FadeInRight,
    FadeOutDown, FadeOutLeft,
    FadeOutRight,
    Layout
} from 'react-native-reanimated';


interface props {
    item: {
        "Date": number,
        "address": string,
        "Asset": string,
        "TX": string,
        "amount": string
    }
}


const DepositRecordItem = ({item}: props) => {
    return (
        <View style={styles.transactionCard}>


            <View style={styles.circleTop}>

                <MaterialCommunityIcons name="arrow-bottom-right" size={20} color={Colors.successChart}/>


            </View>

            <View style={styles.bodyLeft}>
                <Text style={styles.transactionTitle}>
                    {item.address}
                </Text>
                <Text style={styles.transactionDate}>

                    {dayjs.unix(item.Date).format('ddd, DD MMM YYYY')}
                </Text>
            </View>

            <View style={styles.bodyRight}>
                <Text style={styles.transactionTitle}>
                    {item.amount}
                </Text>
                <Text style={styles.transactionDate}>

                    {item.Asset}
                </Text>
            </View>

        </View>
    )
}


const Assets = ({navigation}: RootStackScreenProps<'Assets'>) => {


    const dispatch = useAppDispatch()
    const queryClient = useQueryClient()

    const user = useAppSelector(state => state.user)
    const {userData, User_Details} = user


    const [tabIndex, setTabIndex] = useState(0);
    const handleTabsChange = (index: SetStateAction<number>) => {
        setTabIndex(index);
        //  setScreen(index === 0 ? 'Banks' : 'Wallets')
    };

    const {data: Asset, refetch: fetchAsset, isLoading} = useQuery(['user-Asset'], () => getAsset(User_Details.id))


    useRefreshOnFocus(fetchAsset)


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

                    {
                        isLoading && <ActivityIndicator size='small' color={Colors.primary}/>
                    }
                    {
                        !isLoading &&

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

                                    {currencyFormatter('en-US', 'USD').format(Asset?.data?.total_assets)}
                                </Text>

                            </View>
                            <Text style={styles.walletAddressTxt}>
                                <Text style={{color: Colors.errorRed}}>{Asset?.data?.rp_assets}</Text> Total fee
                            </Text>
                        </View>
                        <View style={styles.walletAddress}>


                            <Text style={styles.walletAddressTxt}>
                                Data is counted by every month
                            </Text>


                        </View>
                    </View>
                    }

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

                        <TouchableOpacity onPress={() => navigate('WithdrawalAmount')} activeOpacity={0.6}
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



                        <View style={styles.content}>
                            {
                                isLoading && <ActivityIndicator size='small' color={Colors.primary}/>
                            }
                            <IF condition={tabIndex == 0}>
                            {
                                !isLoading && Asset &&
                                Asset.data['Deposit Records'].slice(0, 30).map((({address, Date, amount, Asset, TX}:
                                                                                     {
                                                                                         address: string,
                                                                                         Date: string,
                                                                                         amount: string,
                                                                                         Asset: string,
                                                                                         TX: string
                                                                                     }) => (
                                    <Animated.View layout={Layout.easing(Easing.bounce).delay(10)}
                                                   entering={FadeInLeft.springify()} exiting={FadeOutLeft}  style={styles.transactionCard} key={TX}>


                                        <View style={styles.circleTop}>

                                            <MaterialCommunityIcons name="arrow-bottom-right" size={20}
                                                                    color={Colors.successChart}/>


                                        </View>

                                        <View style={styles.bodyLeft}>
                                            <Text style={styles.transactionTitle}>
                                                {truncateString(address, 25)}
                                            </Text>
                                            <Text style={styles.transactionDate}>

                                                {dayjs.unix(Number(Date)).format('ddd, DD MMM YYYY')}
                                            </Text>
                                        </View>

                                        <View style={styles.bodyRight}>
                                            <Text style={styles.transactionTitle}>
                                                {amount}
                                            </Text>
                                            <Text style={styles.transactionDate}>

                                                {Asset}
                                            </Text>
                                        </View>

                                    </Animated.View>
                                )))

                            }
                            </IF>
                            <IF condition={tabIndex == 1}>
                            {
                                !isLoading && Asset &&
                                Asset.data['Withdraw Records'].filter(asset => asset.address !== "RP Transfer").slice(0, 30).map((({address, Date, amount, Asset, TX}:
                                                                                     {
                                                                                         address: string,
                                                                                         Date: string,
                                                                                         amount: string,
                                                                                         Asset: string,
                                                                                         TX: string
                                                                                     }) => (
                                    <Animated.View layout={Layout.easing(Easing.bounce).delay(10)}
                                                   entering={FadeInRight.springify()} exiting={FadeOutRight}  style={styles.transactionCard} key={address+amount+Date}>


                                        <View style={styles.circleTop}>

                                            <MaterialCommunityIcons name="arrow-top-right" size={20}
                                                                    color={Colors.errorRed}/>


                                        </View>

                                        <View style={styles.bodyLeft}>
                                            <Text style={styles.transactionTitle}>
                                                {truncateString(address, 25)}
                                            </Text>
                                            <Text style={styles.transactionDate}>

                                                {dayjs.unix(Number(Date)).format('ddd, DD MMM YYYY')}
                                            </Text>
                                        </View>

                                        <View style={styles.bodyRight}>
                                            <Text style={styles.transactionTitle}>
                                                {amount}
                                            </Text>
                                            <Text style={styles.transactionDate}>

                                                {Asset}
                                            </Text>
                                        </View>

                                    </Animated.View>
                                )))

                            }
                            </IF>
                            <IF condition={tabIndex == 2}>
                            {
                                !isLoading && Asset &&
                                Asset.data['Withdraw Records'].filter(asset => asset.address == "RP Transfer").slice(0, 30).map((({address, Date, amount, Asset, TX}:
                                                                                     {
                                                                                         address: string,
                                                                                         Date: string,
                                                                                         amount: string,
                                                                                         Asset: string,
                                                                                         TX: string
                                                                                     }) => (
                                    <Animated.View layout={Layout.easing(Easing.bounce).delay(10)}
                                                   entering={FadeInRight.springify()} exiting={FadeOutRight}  style={styles.transactionCard} key={address+amount+Date}>


                                        <View style={styles.circleTop}>


                                            <FontAwesome5 name="exchange-alt" size={16} color="#fff" />

                                        </View>

                                        <View style={styles.bodyLeft}>
                                            <Text style={styles.transactionTitle}>
                                                {truncateString(address, 25)}
                                            </Text>
                                            <Text style={styles.transactionDate}>

                                                {dayjs.unix(Number(Date)).format('ddd, DD MMM YYYY')}
                                            </Text>
                                        </View>

                                        <View style={styles.bodyRight}>
                                            <Text style={styles.transactionTitle}>
                                                {amount}
                                            </Text>
                                            <Text style={styles.transactionDate}>

                                                {Asset}
                                            </Text>
                                        </View>

                                    </Animated.View>
                                )))

                            }
                            </IF>
                        </View>



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


    transactionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: pixelSizeVertical(10),
        paddingHorizontal: pixelSizeHorizontal(15),
        height: heightPixel(70),

    },
    circleTop: {

        height: '50%',
        width: widthPixel(15),
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    bodyLeft: {
        width: '60%',
        height: '80%',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
    },
    bodyRight: {
        width: '30%',
        height: '80%',

        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
    },
    transactionTitle: {
        height: heightPixel(25),
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumSemiBold,
        color: Colors.text
    },
    transactionDate: {
        height: heightPixel(20),
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumRegular,
        color: Colors.tintText
    },

    content: {
        alignItems: 'center',
        width: '100%',

    },
})

export default Assets;
