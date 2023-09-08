import React, {useEffect, useState} from 'react';

import {Text, View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import HeaderWithTitle from "../../../components/cyborg/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {Entypo, Ionicons} from "@expo/vector-icons";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../../../helpers/normalize";
import Colors from "../../../constants/Colors";
import {Fonts} from "../../../constants/Fonts";
import QRCode from "react-native-qrcode-svg";
import Animated, {FadeInDown, FadeOutDown} from "react-native-reanimated";
import {truncateString, useRefreshOnFocus} from "../../../helpers";
import HorizontalLine from "../../../components/HorizontalLine";
import {useQuery} from "@tanstack/react-query";
import {getAsset, getDepositAddress, getRevenues} from "../../../api";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import * as Clipboard from "expo-clipboard";
import {addNotificationItem, clearNotification} from "../../../app/slices/dataSlice";
import ToastAnimated from "../../../components/toast";


const DepositScreen = () => {
    const [copied, setCopied] = useState(false);
const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)
    const {User_Details} = user
    const {data,refetch,isLoading} = useQuery(['user-DepositAddress'],()=> getDepositAddress(User_Details.id))


    const copyAddress = async () => {
        await Clipboard.setStringAsync(data.wallet);
        dispatch(addNotificationItem({
            id: Math.random(),
            type: 'info',
            body: "Wallet address copied 👍",
        }))
        setCopied(true)
    };

    useEffect(() => {
        // console.log(user)
        let time: NodeJS.Timeout | undefined;
        if (copied) {


            time = setTimeout(() => {
              setCopied(false)
            }, 3000)

        }
        return () => {
            clearTimeout(time)
        };
    }, [copied])

    useRefreshOnFocus(refetch)
    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#04074E', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >


                <HeaderWithTitle title='Deposit'/>
                <ScrollView style={{
                    width: '100%'
                }} contentContainerStyle={styles.scrollView} scrollEnabled
                            showsVerticalScrollIndicator={false}>




                    {
                        isLoading && <ActivityIndicator color="#fff" size='small'/>
                    }

                    {
                        !isLoading && data && data.status == 1 &&

                    <>

                    <View style={styles.assetBox}>


                        <Text style={styles.coinName}>
                            USDT (TRC20)
                        </Text>


                    </View>


                    <View style={styles.qrCode}>


                        <QRCode
                            logo={require('../../../assets/images/logos/cyborlogo.png')}
                            logoSize={35}
                            size={200}

                            value={data.wallet}
                            color={Colors.text}

                            backgroundColor={Colors.secondary}
                        />


                       {/* <Text style={{
                            fontFamily: Fonts.faktumRegular,
                            fontSize: fontPixel(14),
                            color: Colors.tintText
                        }}>
                            0% Transaction fee
                        </Text>
*/}
                    </View>


                    <View style={styles.walletInfo}>
                        <View style={{
                            height: '30%'
                        }}>
                            <Text style={styles.text}>
                                Deposit address
                            </Text>
                        </View>

                        <View style={styles.copyWrap}>
                            <View>
                                <Text style={styles.walletAddress}>
                                    {
                                        truncateString( data.wallet, 30)
                                    }


                                </Text>
                            </View>


                            {
                                copied ? <Animated.Text key={2} entering={FadeInDown.springify()}
                                                        exiting={FadeOutDown.springify()} style={styles.copied}>
                                        Copied
                                    </Animated.Text> :
                                    <Animated.View key={1} entering={FadeInDown.springify()}
                                                   exiting={FadeOutDown.springify()}>


                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={copyAddress}
                                        >
                                            <Ionicons name="ios-copy-outline" size={18}
                                                      color={Colors.text}/>
                                        </TouchableOpacity>
                                    </Animated.View>
                            }

                        </View>
                    </View>

                    <HorizontalLine/>
                    <View style={styles.operationReminderWrap}>
                        <Text style={styles.operationReminderTitle}>
                            Operation reminder
                        </Text>


                        <View style={[styles.list, {
                            marginTop: 12,
                        }]}>
                            <Entypo name="dot-single" size={20} color={Colors.pendingYellow}/>
                            <Text style={[styles.bodyText, {}]}>
                                Inactive accounts can not be withdrawn
                            </Text>
                        </View>


                        <View style={styles.list}>
                            <Entypo name="dot-single" size={20} color={Colors.pendingYellow}/>
                            <Text style={[styles.bodyText, {}]}>
                                Please do not deposit any non <Text style={{fontFamily:Fonts.faktumBold}}>TRC20 USDT</Text> assets to
                                the above, otherwise the assets will not be retrieved.
                            </Text>
                        </View>


                        <View style={styles.list}>
                            <Entypo name="dot-single" size={20} color={Colors.pendingYellow}/>
                            <Text style={[styles.bodyText, {}]}>
                                After depositing to the above address, confirmation of
                                the entire network node is required. After 12 network
                                confirmations, it will arrive and after 12 network
                                confirmations, it will be withdrawn.
                            </Text>
                        </View>
                    </View>
                    </>
                    }
                </ScrollView>
                <ToastAnimated/>
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
    assetBox: {

        borderRadius: 12,

        height: heightPixel(50),
        alignItems: 'center',

        flexDirection: 'row',
        justifyContent: 'center',

    },
    assetIcon: {
        height: heightPixel(20),
        resizeMode: 'contain',

        width: widthPixel(20)
    },
    assetIconWrap: {
        height: heightPixel(35),

        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: widthPixel(35)
    },
    coinName: {
        color: Colors.text,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumBold
    },
    qrCode: {
        marginVertical: pixelSizeHorizontal(20),
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: heightPixel(250),
        height: heightPixel(250),
        borderRadius: 16,
        padding: 10,
        backgroundColor: Colors.secondary,

    },
    walletInfo: {

        justifyContent: 'center',
        width: '90%',
        height: heightPixel(80),
        marginVertical: pixelSizeHorizontal(20),
    },
    walletAddress: {
        color: Colors.tintText,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumRegular
    },
    text: {
        color: Colors.text,
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumBold
    },
    copyWrap: {
        height: '40%',
        width: '100%',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    operationReminderWrap: {
        marginTop: 20,
        width: '90%',
        alignItems: 'flex-start'
    },
    operationReminderTitle: {
        color: Colors.pendingYellow,
        fontFamily: Fonts.faktumMedium,
        fontSize: fontPixel(16),

    },
    list: {
minHeight:heightPixel(20),
        // flexWrap:'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '90%',
        marginVertical:pixelSizeVertical(10),

    },
    bodyText: {

        lineHeight: heightPixel(20),
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(14),
        color: Colors.text
    },
    copied: {
        color: Colors.primary,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumBold
    },
})

export default DepositScreen;
