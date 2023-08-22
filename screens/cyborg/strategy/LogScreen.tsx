import React from 'react';

import {Text, View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
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
import {currencyFormatter, useRefreshOnFocus} from "../../../helpers";
import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../../../helpers/normalize";
import {Fonts} from "../../../constants/Fonts";
import {RootStackScreenProps} from "../../../types";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {binanceTicker, getNewstrategy, startStopBot, startTradingBotFuture} from "../../../api";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {MyButton} from "../../../components/MyButton";
import * as Haptics from "expo-haptics";
import {addNotificationItem} from "../../../app/slices/dataSlice";
import ToastAnimated from "../../../components/toast";


const LogScreen = ({navigation, route}: RootStackScreenProps<'LogScreen'>) => {

    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()

    const {exchange, market, id} = route.params
    const user = useAppSelector(state => state.user)
    const {User_Details} = user


    const {
        data: tickers,
        refetch: fetchTickers,
        isLoading: fetchingTickers
    } = useQuery(['binanceTicker'], binanceTicker)

    const tickerRes = tickers?.find((ticker: { symbol: string; }) => ticker.symbol == market.replace('/', ''))


    const formdata = new FormData()
    formdata.append('market', market)
    formdata.append('exchange', exchange)
    const {
        data: newStrategy,
        refetch: fetchNewStrategy,
        isLoading
    } = useQuery([`get-new-strategy-${market}`, User_Details.id],
        () => getNewstrategy({body: formdata, userId: User_Details.id}))


    let old_price = newStrategy?.data['Operation Strategy'][0].Quantity * newStrategy?.data['Operation Strategy'][0].Avg_Price;
    let new_value = newStrategy?.data['Operation Strategy'][0].Quantity * tickerRes?.lastPrice;
    let finalvalue = new_value - old_price;

    /*   if(finalvalue >= 0){
           element.floating_profit = finalvalue;
       }
       else{
           element.floating_loss = finalvalue;
       }*/
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
navigation.navigate('TransactionRecords',{
    records:newStrategy?.data['Transaction records']
})
    }
    //console.log("********************quantitativeStrategies********************")

    // console.log(newStrategy?.data['Transaction records'])
    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#04074E', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >


                <HeaderWithTitle title='Logs' headerAction={openTransactionRecs}
                                 headerButton={<Ionicons name="ios-document-text-outline" size={24} color="#fff"/>}/>
                {
                    isLoading &&
                    <View style={styles.loading}>
                        <ActivityIndicator size='large' color={Colors.primary}/>
                    </View>
                }
                <ScrollView style={{
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
                                            Floating loss
                                        </Text>


                                    </TouchableOpacity>

                                    <View style={[styles.logWrap, {
                                        alignItems: 'flex-end',
                                    }]}>


                                        <Text style={[styles.logBalance, {
                                            color: Colors.errorRed
                                        }]}>

                                            {finalvalue.toFixed(2)}
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


                </ScrollView>

                <View style={styles.buttonRow}>
                    <MyButton activeOpacity={0.7}
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
    }
})

export default LogScreen;
