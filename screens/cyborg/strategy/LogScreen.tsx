import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Switch,
    RefreshControl
} from 'react-native';
import HeaderWithTitle from "../../../components/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {
    AntDesign,
    FontAwesome,
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
    SimpleLineIcons
} from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import {currencyFormatter, invertNumber, useRefreshOnFocus, wait} from "../../../helpers";
import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../../../helpers/normalize";
import {Fonts} from "../../../constants/Fonts";
import {RootStackScreenProps} from "../../../types";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {activateCopyStrategy, binanceTicker, getNewstrategy, startStopBot, startTradingBotFuture} from "../../../api";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {MyButton} from "../../../components/MyButton";
import * as Haptics from "expo-haptics";
import {addNotificationItem, updateBotSetting} from "../../../app/slices/dataSlice";
import ToastAnimated from "../../../components/toast";
import {
    BottomSheetDefaultBackdropProps
} from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetScrollView
} from "@gorhom/bottom-sheet";
import QRCode from "react-native-qrcode-svg";
import HorizontalLine from "../../../components/HorizontalLine";


const SWITCH_TRACK_COLOR = {
    true: Colors.primary,
    false: Colors.success,
};
const LogScreen = ({navigation, route}: RootStackScreenProps<'LogScreen'>) => {

    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()

    const [refreshing, setRefreshing] = useState(false);
    const {exchange, market, id,trade_type} = route.params
    const user = useAppSelector(state => state.user)
    const {User_Details} = user


    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present(1);
    }, []);

    const handleClose = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);


    // variables
    const snapPoints = useMemo(() => ["1%", "50%", "70%"], []);


    const renderBackdrop = useCallback(
        (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={0}
                appearsOnIndex={1}
            />
        ),
        []
    );


    const {
        data: tickers,
        refetch: fetchTickers,
        isLoading: fetchingTickers
    } = useQuery(['binanceTicker'], binanceTicker)

    const tickerRes = tickers?.find((ticker: { symbol: string; }) => ticker.symbol == market.replace('/', ''))


    const formdata = new FormData()
    formdata.append('market', market)
    formdata.append('id', id)
    formdata.append('exchange', exchange)


    const {
        data: newStrategy,
        refetch: fetchNewStrategy,
        isLoading
    } = useQuery([`get-new-strategy-${id}`, User_Details.id],
        () => getNewstrategy({body: formdata, userId: User_Details.id}))

    const [switchToggle, setSwitchToggle] = useState(newStrategy?.data['Operation Strategy'][0]?.active_copy != '0');





  /*  let old_price = parseFloat(newStrategy?.data['Operation Strategy'][0].Quantity) * parseFloat(newStrategy?.data['Operation Strategy'][0].Avg_Price)
    let new_value = parseFloat(newStrategy?.data['Operation Strategy'][0].Quantity) * parseFloat(tickerRes?.lastPrice);
   // let finalvalue = new_value - old_price;
*/


    let p2 = parseFloat(newStrategy?.data['Operation Strategy'][0]?.Quantity) * parseFloat(tickerRes?.lastPrice);
    let val = (Number(newStrategy?.data['Operation Strategy'][0]['Positionamount']) - (p2)) / Number(newStrategy?.data['Operation Strategy'][0]['Positionamount']);
    let finalvalue = val * 100;

    /*   if(finalvalue >= 0){
           element.floating_profit = finalvalue;
       }
       else{
           element.floating_loss = finalvalue;
       }*/

    useEffect(() => {
        setSwitchToggle(newStrategy?.data['Operation Strategy'][0]?.active_copy != '0')
    }, [newStrategy]);

    const {
        mutate,
        isLoading: loading
    } = useMutation(['start-Stop-Bot'], startStopBot,

        {

            onSuccess: async (data) => {
                // alert(message)

                if (data.status == 1) {

                    navigation.navigate('SuccessScreen', {
                        title: 'Successful',
                        message: `${market} Trading Bot Status updated`,
                        type: 'success'
                    })


                } else {
                    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
                    dispatch(addNotificationItem({
                        id: Math.random(),
                        type: 'error',
                        body: data.error,
                    }))

                }
            },

            onError: (err) => {


            },
            onSettled: () => {
                queryClient.invalidateQueries(['start-Stop-Bot']);
            }

        })


    const {
        mutate: toggleCopyStatus,
        isLoading: loadingCopy
    } = useMutation(['activate-Copy-Strategy'], activateCopyStrategy,

        {

            onSuccess: async (data) => {
                // alert(message)

                if (data.status == 1) {
                    fetchNewStrategy()
                    /*  navigation.navigate('SuccessScreen', {
                          title: 'Successful',
                          message: `${market} Trading Bot Status updated`,
                          type: 'success'
                      })*/
                    dispatch(addNotificationItem({
                        id: Math.random(),
                        type: 'success',
                        body: "Strategy Copy status updated!",
                    }))

                } else {
                    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
                    dispatch(addNotificationItem({
                        id: Math.random(),
                        type: 'error',
                        body: data.error,
                    }))

                }
            },

            onError: (err) => {


            },
            onSettled: () => {
                queryClient.invalidateQueries(['activate-Copy-Strategy']);
            }

        })

    useRefreshOnFocus(fetchNewStrategy)

    const stopBot = () => {

        const formdata = new FormData()
        formdata.append('id', id)
        formdata.append('startbot', '0')
        mutate({body: formdata, userId: User_Details.id})
    }

    const startBot = () => {

        const formdata = new FormData()
        formdata.append('id', id)
        formdata.append('startbot', '1')
        mutate({body: formdata, userId: User_Details.id})
    }

    const openTransactionRecs = () => {
        navigation.navigate('TransactionRecords', {
            records: newStrategy?.data['Transaction records']
        })
    }

    const tradeSettingStrategy = () => {
        navigation.navigate('TradeSettingStrategy', {
            id,
            dataLogs: newStrategy?.data['Operation Strategy'][0]
        })
    }

    useEffect(() => {
        dispatch(updateBotSetting({
            price_drop: newStrategy?.data['Operation Strategy'][0]["Price drop"].join('|'),
            m_ratio: newStrategy?.data['Operation Strategy'][0]["Martingale ratio"].join('|'),

        }))
    }, []);


    const refresh = () => {
        setRefreshing(true)
        fetchNewStrategy()
        wait(2000).then(() => setRefreshing(false));
    }

    return (
        <>

            <SafeAreaView style={styles.safeArea}>
                <LinearGradient style={styles.background}
                                colors={['#04074E', '#141621',]}

                                start={{x: 2.5, y: 0}}
                                end={{x: 1.5, y: 0.8,}}
                    // locations={[0.1, 0.7,]}

                >


                    <HeaderWithTitle isButton logAction={handlePresentModalPress} title='Logs'
                                     headerAction={openTransactionRecs}
                                     headerButton={<Ionicons name="ios-document-text-outline" size={24}
                                                             color="#fff"/>}/>
                    {
                        isLoading &&
                        <View style={styles.loading}>
                            <ActivityIndicator size='large' color={Colors.primary}/>
                        </View>
                    }
                    <ScrollView
                        refreshControl={<RefreshControl tintColor={Colors.primary} refreshing={refreshing}
                                                        onRefresh={refresh} />}
                        style={{
                        width: '100%'
                    }} contentContainerStyle={styles.scrollView} scrollEnabled
                                showsVerticalScrollIndicator={false}>


                        {
                            !isLoading && newStrategy &&
                            <>

                                <View style={styles.balanceCanvas}>
                                    <View style={styles.balanceTop}>

                                        <View style={styles.balanceTitle}>
                                            <Text style={[styles.balText, {
                                                color: Colors.success
                                            }]}>

                                                {newStrategy?.data['Operation Strategy'][0].cycle == '1' && 'Cycle'}
                                                {newStrategy?.data['Operation Strategy'][0]['One-shot'] == '1' && 'One-shot'}

                                            </Text>

                                        </View>

                                        <View style={styles.balanceTitle}>
                                            <Text style={[styles.balText, {
                                                color: Colors.primary
                                            }]}>

                                                {trade_type == '0' && 'Spot'}
                                                {trade_type == '1' && 'Futures'}

                                            </Text>

                                        </View>

                                        <View style={styles.balanceGraph}>

                                            <Text
                                                style={styles.balance}>
                                                {market}


                                            </Text>

                                        </View>

                                    </View>

                                </View>


                                <View style={styles.topDetails}>
                                    <View style={[styles.interestGained, {}]}>


                                        <TouchableOpacity activeOpacity={0.7}
                                                          style={[styles.balanceTitle, {
                                                              justifyContent: 'flex-start',

                                                          }]}>
                                            <Text style={styles.logTitle}>
                                                Position amount
                                            </Text>


                                        </TouchableOpacity>

                                        <View style={styles.logWrap}>


                                            <Text style={[styles.logBalance, {}]}>

                                                {parseFloat(newStrategy?.data['Operation Strategy'][0].Positionamount).toFixed(4)}

                                            </Text>


                                        </View>

                                    </View>


                                    <View style={[styles.interestGained, {
                                        alignItems: 'center'
                                    }]}>


                                        <TouchableOpacity activeOpacity={0.7}
                                                          style={[styles.balanceTitle, {
                                                              justifyContent: 'center',

                                                          }]}>
                                            <Text style={styles.logTitle}>
                                                Average price
                                            </Text>


                                        </TouchableOpacity>

                                        <View style={[styles.logWrap, {
                                            alignItems: 'center',
                                        }]}>


                                            <Text style={[styles.logBalance, {}]}>
                                                {parseFloat(newStrategy?.data['Operation Strategy'][0].Avg_Price).toFixed(4)}


                                            </Text>


                                        </View>

                                    </View>


                                    <View style={[styles.interestGained, {alignItems: 'flex-end'}]}>


                                        <TouchableOpacity activeOpacity={0.7}
                                                          style={[styles.balanceTitle, {justifyContent: 'flex-end',}]}>
                                            <Text style={styles.logTitle}>
                                                Number of calls
                                            </Text>


                                        </TouchableOpacity>

                                        <View style={[styles.logWrap, {
                                            alignItems: 'flex-end',
                                        }]}>


                                            <Text style={[styles.logBalance, {}]}>

                                                {parseFloat(newStrategy?.data['Operation Strategy'][0].Numbercallmargin)}
                                            </Text>


                                        </View>

                                    </View>


                                </View>


                                <View style={styles.topDetails}>
                                    <View style={styles.interestGained}>


                                        <TouchableOpacity activeOpacity={0.7}
                                                          style={[styles.balanceTitle, {
                                                              justifyContent: 'flex-start',

                                                          }]}>
                                            <Text style={styles.logTitle}>
                                                Position quantity
                                            </Text>


                                        </TouchableOpacity>

                                        <View style={styles.logWrap}>


                                            <Text style={[styles.logBalance, {}]}>

                                                {parseFloat(newStrategy?.data['Operation Strategy'][0].Quantity).toFixed(4)}
                                            </Text>


                                        </View>

                                    </View>


                                    <View style={[styles.interestGained, {alignItems: 'center'}]}>


                                        <TouchableOpacity activeOpacity={0.7}
                                                          style={[styles.balanceTitle, {
                                                              justifyContent: 'center',

                                                          }]}>
                                            <Text style={styles.logTitle}>
                                                Current price
                                            </Text>


                                        </TouchableOpacity>

                                        <View style={[styles.logWrap, {
                                            alignItems: 'center',
                                        }]}>


                                            <Text style={[styles.logBalance, {}]}>

                                                {currencyFormatter('en-US', 'USD').format(tickerRes?.lastPrice)}
                                            </Text>


                                        </View>

                                    </View>


                                    <View style={[styles.interestGained, {alignItems: 'flex-end'}]}>


                                        <TouchableOpacity activeOpacity={0.7}
                                                          style={[styles.balanceTitle, {justifyContent: 'flex-end',}]}>
                                            <Text style={styles.logTitle}>

                                                {finalvalue ? invertNumber(parseFloat(finalvalue)) < 0 ? 'Floating loss' : 'Floating profit' : 'Floating profit' }
                                            </Text>


                                        </TouchableOpacity>

                                        <View style={[styles.logWrap, {
                                            alignItems: 'flex-end',
                                        }]}>


                                            <Text style={[styles.logBalance, {
                                                color: finalvalue ? invertNumber(parseFloat(finalvalue)) < 0 ? Colors.errorRed : Colors.successChart : Colors.errorRed
                                            }]}>

                                                {finalvalue ? invertNumber(parseFloat(finalvalue)) : '0.00'}%
                                            </Text>


                                        </View>

                                    </View>


                                </View>


                                {/*           <View style={styles.moreButtonContainer}>


                                <TouchableOpacity activeOpacity={0.6}
                                                  style={styles.dashButton}>
                                    <View style={[styles.dashIcon,
                                        {backgroundColor: Colors.secondary}]}>

                                        <Ionicons name="sync-circle-outline" size={20} color="#fff"/>
                                    </View>
                                    <Text style={styles.dashText}>
                                        Cycle
                                    </Text>
                                </TouchableOpacity>


                                <TouchableOpacity activeOpacity={0.6} style={styles.dashButton}>
                                    <View style={styles.dashIcon}>
                                        <MaterialCommunityIcons name="arrow-top-right-thin" size={20} color="#fff"/>

                                    </View>
                                    <Text style={styles.dashText}>
                                        Sell
                                    </Text>

                                </TouchableOpacity>


                                <TouchableOpacity disabled activeOpacity={0.6} style={styles.dashButton}>
                                    <View style={[styles.dashIcon,]}>
                                        <SimpleLineIcons name="tag" size={20} color="#fff"/>

                                    </View>
                                    <Text style={styles.dashText}>
                                        Buy
                                    </Text>
                                </TouchableOpacity>


                            </View>*/}


                                {/*<View style={[styles.moreButtonContainer, {}]}>


                                <TouchableOpacity activeOpacity={0.6} style={styles.dashButton}>
                                    <View style={[styles.dashIcon,
                                        {backgroundColor: Colors.secondary}]}>

                                        <Ionicons name="analytics-outline" size={20} color="#fff"/>
                                    </View>
                                    <Text style={styles.dashText}>
                                        Open margin call


                                    </Text>
                                </TouchableOpacity>


                                <TouchableOpacity activeOpacity={0.6} style={styles.dashButton}>
                                    <View style={styles.dashIcon}>
                                        <FontAwesome5 name="chess" size={20} color="#fff"/>

                                    </View>
                                    <Text style={styles.dashText}>
                                        Strategy mode
                                    </Text>

                                </TouchableOpacity>

                                <TouchableOpacity activeOpacity={0.6}
                                                  style={styles.dashButton}>

                                </TouchableOpacity>


                            </View>*/}


                                <View style={[styles.spotlightContainer, {marginTop: 15,}]}>

                                    <View style={styles.spotlight}>

                                        <Text style={styles.spotlightTitle}>
                                            Initial Buy
                                        </Text>
                                        <Text style={[styles.spotlightPercentage, {}]}>
                                            {parseFloat(newStrategy?.data['Operation Strategy'][0].firstbuyinamount)}

                                        </Text>
                                    </View>

                                    <View style={styles.spotlight}>

                                        <Text style={styles.spotlightTitle}>
                                            Buy in callback
                                        </Text>
                                        <Text style={[styles.spotlightPercentage, {}]}>
                                            {parseFloat(newStrategy?.data['Operation Strategy'][0].buyin_callback)}

                                        </Text>
                                    </View>
                                </View>

                                <View style={[styles.spotlightContainer,]}>
                                    <View style={styles.spotlight}>

                                        <Text style={styles.spotlightTitle}>
                                            Take profit ratio
                                        </Text>
                                        <Text style={[styles.spotlightPercentage, {}]}>
                                            {parseFloat(newStrategy?.data['Operation Strategy'][0].take_profit_ratio)}
                                        </Text>
                                    </View>

                                    <View style={styles.spotlight}>

                                        <Text style={styles.spotlightTitle}>
                                            Earning callbacks


                                        </Text>
                                        <Text style={[styles.spotlightPercentage, {}]}>
                                            {parseFloat(newStrategy?.data['Operation Strategy'][0].buyin_callback)}
                                        </Text>
                                    </View>

                                </View>


                                <View style={styles.spotlightContainer}>

                                    <View style={styles.spotlight}>

                                        <Text style={styles.spotlightTitle}>
                                            Margin call drop

                                        </Text>
                                        <Text style={[styles.spotlightPercentage, {}]}>
                                            {parseFloat(newStrategy?.data['Operation Strategy'][0].take_profit_ratio)}
                                        </Text>
                                    </View>


                                    <View style={styles.spotlight}>

                                        <Text style={styles.spotlightTitle}>
                                            Margin call limit
                                        </Text>
                                        <Text style={[styles.spotlightPercentage, {}]}>
                                            {parseFloat(newStrategy?.data['Operation Strategy'][0].margin_call_limit)}


                                        </Text>
                                    </View>

                                </View>
                            </>

                        }

                        {
                            User_Details.id == '17409' &&

                        <>

                        <HorizontalLine margin={20}/>
                        {!isLoading && newStrategy?.data['Operation Strategy'][0]?.active_copy !== undefined &&

                            <View style={styles.switchWrap}>
                            <Text style={styles.label}>
                                Activate Strategy for copy {loadingCopy && <ActivityIndicator size='small' color={Colors.text}/>}
                            </Text>
                            <Switch

                                trackColor={SWITCH_TRACK_COLOR}
                                thumbColor={switchToggle ? "#fff" : Colors.secondary}
                                ios_backgroundColor={Colors.tintSuccess}
                                onValueChange={(toggled) => {
                                    //setEnableNow(toggled)
                                    setSwitchToggle(toggled)
                                    // toggle(toggled)
                                    toggleCopyStatus({status: toggled ? '1' : '0', id, userId: User_Details.id})

                                }}
                                value={switchToggle}
                            />
                        </View>
                        }
                        <HorizontalLine margin={20}/>
                        </>
                        }
                    </ScrollView>

                    <View style={styles.buttonRow}>
                        <MyButton onPress={tradeSettingStrategy} activeOpacity={0.7}
                                  style={[styles.smallButton, {
                                      backgroundColor: Colors.secondary
                                  }]}>


                            <Text style={styles.btnText}>
                                Trade setting
                            </Text>


                        </MyButton>

                        {
                            newStrategy?.data['Operation Strategy'][0].bot_on == '1' &&

                            <MyButton onPress={stopBot} activeOpacity={0.7}
                                      style={[styles.smallButton, {

                                          backgroundColor: Colors.primary
                                      }]}>

                                {
                                    loading ? <ActivityIndicator size='small' color={"#fff"}/>
                                        :
                                        <Text style={styles.btnText}>
                                            Stop bot
                                        </Text>
                                }


                            </MyButton>
                        }

                        {
                            newStrategy?.data['Operation Strategy'][0].bot_on == '0' &&

                            <MyButton onPress={startBot} activeOpacity={0.7}
                                      style={[styles.smallButton, {

                                          backgroundColor: Colors.success
                                      }]}>

                                {
                                    loading ? <ActivityIndicator size='small' color={"#fff"}/>
                                        :
                                        <Text style={styles.btnText}>
                                            Start bot
                                        </Text>

                                }
                            </MyButton>
                        }


                    </View>
                </LinearGradient>
                <ToastAnimated/>
            </SafeAreaView>

            <BottomSheetModalProvider>


                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    animateOnMount
                    index={1}
                    snapPoints={snapPoints}
                    backdropComponent={renderBackdrop}
                    style={{
                        paddingHorizontal: pixelSizeHorizontal(20)
                    }}
                    backgroundStyle={{
                        backgroundColor: Colors.dark.background,
                    }}
                    handleIndicatorStyle={{backgroundColor: "#fff"}}

                >
                    <BottomSheetScrollView style={styles.sheetScrollView} contentContainerStyle={{
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <View style={[styles.sheetHead, {
                            height: 40,
                        }]}>


                            <Text style={[styles.sheetTitle, {
                                fontSize: fontPixel(14),
                                color: Colors.text
                            }]}>
                                Logs
                            </Text>
                            <TouchableOpacity onPress={handleClose}
                                              style={[styles.dismiss, {
                                                  backgroundColor: "#11192E"
                                              }]}>
                                <Ionicons name="close-sharp" size={20} color={"#fff"}/>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.contentContainer}>
                            <View style={styles.toastIconWrap}>
                                <View style={[styles.toastIcon, {
                                    backgroundColor: Colors.textDark,
                                }]}>

                                    <FontAwesome name="bell-o" size={18} color={Colors.errorRed}/>
                                </View>
                            </View>

                            <View style={styles.toastBody}>


                                <Text style={styles.logText}>

                                    {newStrategy?.data['Operation Strategy'][0].Log}
                                </Text>
                            </View>
                        </View>


                    </BottomSheetScrollView>
                </BottomSheetModal>

            </BottomSheetModalProvider>


        </>
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

        height: heightPixel(140),
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

        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: heightPixel(30),
    },
    balText: {
        fontFamily: Fonts.faktumMedium,
        color: Colors.tintText,
        fontSize: fontPixel(14),
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
    walletAddressTxt: {

        color: "#CCCCCC",
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(12)
    },


    topDetails: {
        paddingHorizontal: pixelSizeHorizontal(20),
        width: '100%',

        height: heightPixel(90),
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    interestGained: {
        marginTop: 20,
        width: '32%',
        backgroundColor: "#000",
        height: heightPixel(60),
        alignItems: 'flex-start',
        paddingHorizontal: 5,
    },
    interestGainedAmount: {
        width: '100%',
        height: '50%',

        alignItems: 'center'
    },


    currentBalanceContainer: {
        marginTop: 20,
        minWidth: widthPixel(130),
        height: heightPixel(80),

        //  height: heightPixel(50),
        // alignItems: 'flex-end'
    },
    currentBalance: {
        width: '100%',
        height: '100%',
        alignItems: 'flex-end',

    },
    balanceWrap: {
        width: '90%',
        height: heightPixel(50),
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },

    logTitle: {
        fontFamily: Fonts.faktumMedium,
        color: Colors.tintText,
        fontSize: fontPixel(12),

    },
    logBalance: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(14),
        color: Colors.text
    },
    logWrap: {
        width: '90%',
        height: heightPixel(50),
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },

    moreButtonContainer: {
        backgroundColor: Colors.textPrimary,
        width: '100%',
        height: heightPixel(120),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    dashButton: {
        width: heightPixel(110),
        height: heightPixel(80),

        alignItems: 'center',
        justifyContent: 'space-between'

    },
    dashIcon: {
        width: 55,
        height: 55,
        backgroundColor: Colors.secondary,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: "center"
    },
    dashText: {
        color: Colors.text,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumRegular
    },
    spotlightContainer: {

        minHeight: heightPixel(45),
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    spotlight: {
        height: heightPixel(45),
        backgroundColor: Colors.secondary,
        width: '45%',
        borderRadius: 5,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        marginHorizontal: pixelSizeHorizontal(3),
    },
    spotlightTitle: {
        marginHorizontal: 3,
        fontSize: fontPixel(14),
        color: Colors.tintText,
        fontFamily: Fonts.faktumRegular
    },
    spotlightPercentage: {

        color: Colors.text,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumSemiBold,

    },
    smallButton: {
        width: '45%',
        height: heightPixel(50),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        bottom: 0,
    },

    buttonRow: {
        width: '90%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btnText: {
        color: 'white',
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumBold

    },
    loading: {
        flex: 1,
        width: '100%',
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 1,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    sheetScrollView: {
        width: '100%',
        marginTop: 10,
        backgroundColor: Colors.dark.background,
    },
    sheetHead: {
        // paddingHorizontal: pixelSizeHorizontal(20),
        height: 60,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
    ,
    sheetTitle: {
        fontSize: fontPixel(18),
        fontFamily: Fonts.faktumBold,
        color: Colors.light.text
    },
    dismiss: {
        position: 'absolute',
        right: 10,
        borderRadius: 30,
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',

    },
    contentContainer: {
        marginTop: 40,
        paddingHorizontal: pixelSizeHorizontal(10),
        width: '100%',
        height: 100,

        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    toastIconWrap: {
        height: '70%',

        width: '8%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    toastBody: {
        width: '90%',

        marginLeft: 10,
    },
    logText: {
        lineHeight: heightPixel(18),
        color: Colors.text,
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(14),
    },
    toastIcon: {
        width: 30,
        height: 30,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'

    },
    switchWrap: {
        marginTop: 5,
        width: '90%',
        height: 65,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    label: {
        color: Colors.text,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumMedium,
    },
})

export default LogScreen;
