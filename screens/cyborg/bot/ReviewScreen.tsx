import React from 'react';

import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import HeaderWithTitle from "../../../components/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {RootStackScreenProps} from "../../../types";
import Colors from "../../../constants/Colors";
import {fontPixel, heightPixel, pixelSizeHorizontal} from "../../../helpers/normalize";
import {Fonts} from "../../../constants/Fonts";
import {MyButton} from "../../../components/MyButton";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {botTradeSetting, startTradingBotFuture} from "../../../api";
import * as Haptics from "expo-haptics";
import {addNotificationItem, clearTradeSetting} from "../../../app/slices/dataSlice";
import ToastAnimated from "../../../components/toast";
import HorizontalLine from "../../../components/HorizontalLine";

const ReviewScreen = ({navigation}: RootStackScreenProps<'ReviewScreen'>) => {

    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()
    const dataSlice = useAppSelector(state => state.data)
    const {tradeSetting} = dataSlice

    const user = useAppSelector(state => state.user)
    const {User_Details} = user


    const strategyPeriodShot = tradeSetting.one_shot == '1' ? '1' : '0'
    const strategyPeriodCycle = tradeSetting.cycle == '1' ? '1' : '0'


    const {mutate: createBot, isLoading, isSuccess, error} = useMutation(['bot-Trade-Setting'], botTradeSetting,

        {

            onSuccess: async (data) => {
                // alert(message)
                console.log(data)
                if (data.status == 1) {
                    navigation.navigate('BotSuccess', {
                        amount: tradeSetting.firstbuy_amount,
                        market: tradeSetting.market,
                    })
                    dispatch(clearTradeSetting())
                    /* navigation.navigate('SuccessScreen', {
                         title: 'Successfull',
                         message: 'Trading Bot created',
                         type: 'success'
                     })*/


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

                console.log(err)
            },
            onSettled: () => {
                queryClient.invalidateQueries(['bot-Trade-Setting']);
            }

        })


    const {
        mutate: createFutureBot,
        isLoading: loading
    } = useMutation(['start-Trading-Bot-Future'], startTradingBotFuture,

        {

            onSuccess: async (data) => {
                // alert(message)

                if (data.status == 1) {
                    navigation.navigate('BotSuccess', {
                        amount: tradeSetting.firstbuy_amount,
                        market: tradeSetting.market,
                    })
                    dispatch(clearTradeSetting())
                    /*navigation.navigate('SuccessScreen', {
                        title: 'Successful',
                        message: 'Trading Bot created',
                        type: 'success'
                    })*/


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

console.log(err)
            },
            onSettled: () => {
                queryClient.invalidateQueries(['start-Trading-Bot-Future']);
            }

        })


    const Exchanges = [
        {
            id: '1',
            logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',

            exchange: '3',
            exchangeName: 'Coinbase'
        }, {
            id: '2',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/1200px-Binance_Logo.svg.png',

            exchange: '1',
            exchangeName: 'Binance'
        }, {
            id: '3',
            logo: 'https://static-00.iconduck.com/assets.00/kraken-icon-512x512-icmwhmh8.png',

            exchange: '4',
            exchangeName: 'Kraken'
        }, {
            id: '4',
            logo: 'https://assets.staticimg.com/cms/media/3gfl2DgVUqjJ8FnkC7QxhvPmXmPgpt42FrAqklVMr.png',

            exchange: '2',
            exchangeName: 'Kucoin'
        }
    ]
    const botComplete = () => {

    }

    const editSetting = () => {
        navigation.goBack()
    }


    const startBot = () => {
        if (tradeSetting.trade_type == '1') {
            const formData = new FormData()
            formData.append('firstbuy_amount', tradeSetting.firstbuy_amount)
            formData.append('double_position', tradeSetting.double_position)
            formData.append('margin_limit', tradeSetting.margin_limit)
            formData.append('profit_ratio', tradeSetting.profit_ratio)
            formData.append('whole_ratio', tradeSetting.whole_ratio)
            formData.append('whole_stop', tradeSetting.whole_stop)
            formData.append('first_call', tradeSetting.price_drop)
            formData.append('first_ratio', tradeSetting.m_ratio)
            formData.append('cycle', tradeSetting.cycle)
            formData.append('profit_callback', tradeSetting.profit_callback)
            formData.append('one_short', tradeSetting.one_shot)
          //  formData.append('exchange', tradeSetting.exchange)
            formData.append('trade_type', tradeSetting.trade_type)
            formData.append('direction', tradeSetting.direction)
            formData.append('id', tradeSetting.id)
            formData.append('market', tradeSetting.market)

            formData.append('stop_loss', tradeSetting.stop_loss)
            formData.append('price_above', tradeSetting.price_above)
            formData.append('re_capital', tradeSetting.re_capital)
            formData.append('closing_price', tradeSetting.closing_price)
            formData.append('price_below', tradeSetting.price_below)
            formData.append('entry_call', tradeSetting.entry_call)
            createFutureBot({body: formData, userId: User_Details.id})

        }
        if (tradeSetting.trade_type == '0') {
            const formData = new FormData()
            formData.append('firstbuy_amount', tradeSetting.firstbuy_amount)
            formData.append('double_position', tradeSetting.double_position)
            formData.append('margin_limit', tradeSetting.margin_limit)
            formData.append('profit_ratio', tradeSetting.profit_ratio)
            formData.append('whole_ratio', tradeSetting.whole_ratio)
            formData.append('whole_stop', tradeSetting.whole_stop)

            formData.append('first_call', tradeSetting.price_drop)
            formData.append('first_ratio', tradeSetting.m_ratio)
            formData.append('cycle', tradeSetting.cycle)
            formData.append('profit_callback', tradeSetting.profit_callback)
            formData.append('one_short', tradeSetting.one_shot)
          //  formData.append('exchange', tradeSetting.exchange)
            formData.append('trade_type', '0')
            formData.append('market', tradeSetting.market)
            formData.append('id', tradeSetting.id)

            createBot({body: formData, userId: User_Details.id})

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

                                    {Exchanges.find(exchange => exchange.exchange == tradeSetting.exchange)?.exchangeName}
                                </Text>

                            </View>

                            <View style={styles.Details}>
                                <View style={styles.DetailsLeft}>
                                    <Text style={styles.DetailTitleText}>
                                        First Buy Amount
                                    </Text>
                                    <Text onPress={editSetting} style={[styles.DetailTitleText, {
                                        color: Colors.primaryLight,
                                        marginLeft: 15,
                                        fontSize: fontPixel(14)
                                    }]}>
                                        Edit</Text>
                                </View>
                                <Text style={[styles.DetailsText, {}]}>
                                    {tradeSetting.firstbuy_amount}
                                </Text>

                            </View>

                            <View style={styles.Details}>
                                <View style={styles.DetailsLeft}>
                                    <Text style={styles.DetailTitleText}>
                                        Stop loss
                                    </Text>
                                    <Text onPress={editSetting} style={[styles.DetailTitleText, {
                                        color: Colors.primaryLight,
                                        marginLeft: 15,
                                        fontSize: fontPixel(14)
                                    }]}>
                                        Edit</Text>
                                </View>

                                <Text style={[styles.DetailsText, {
                                    fontFamily: Fonts.faktumMedium,

                                }]}>
                                    {tradeSetting.whole_stop}

                                </Text>

                            </View>

                            <View style={styles.Details}>
                                <View style={styles.DetailsLeft}>
                                    <Text style={styles.DetailTitleText}>
                                        Profit callback
                                    </Text>
                                    <Text onPress={editSetting} style={[styles.DetailTitleText, {
                                        color: Colors.primaryLight,
                                        marginLeft: 15,
                                        fontSize: fontPixel(14)
                                    }]}>
                                        Edit</Text>
                                </View>
                                <Text style={[styles.DetailsText, {
                                    fontFamily: Fonts.faktumMedium,

                                }]}>
                                    {tradeSetting.profit_callback}
                                </Text>

                            </View>


                            <View style={styles.Details}>
                                <Text style={styles.DetailTitleText}>
                                    Take profit
                                </Text>
                                <Text style={[styles.DetailsText, {
                                    fontFamily: Fonts.faktumMedium,

                                }]}>
                                    {tradeSetting.profit_ratio}
                                </Text>

                            </View>
                            <View style={styles.Details}>
                                <Text style={styles.DetailTitleText}>
                                    Strategy period
                                </Text>
                                <Text style={[styles.DetailsText, {
                                    fontFamily: Fonts.faktumMedium,

                                }]}>

                                    {strategyPeriodShot == '1' && 'One Shot'}
                                    {strategyPeriodCycle == '1' && 'Cycle'}

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
                                    color: Colors.success,
                                    textTransform: 'uppercase'
                                }]}>
                                    {tradeSetting.market}
                                </Text>

                            </View>

                        </View>


                        <View style={[styles.Details, {}]}>
                            <Text style={styles.DetailTitleText}>
                                Type
                            </Text>
                            <Text style={styles.DetailsText}>

                                {tradeSetting.trade_type == '1' ? 'Futures' : 'Spot'}
                            </Text>
                        </View>


                    </View>


                </KeyboardAwareScrollView>


                {
                    tradeSetting.trade_type == '0' &&
                <MyButton onPress={startBot} style={[styles.button, {
                    // backgroundColor: !isValid ? Colors.border : Colors.primary
                }]}>
                    <LinearGradient style={styles.createBtnGradient}
                                    colors={['#e602df', '#4406b0']}

                                    start={{x: 1, y: 0}}
                                    end={{x: 0.1, y: 0.3,}}

                        // locations={[0.1, 0.7,]}
                    >
                        {
                            isLoading && <ActivityIndicator size='small' color={"#fff"}/>
                        }
                        {
                            !isLoading &&
                            <Text style={styles.buttonTxt}>
                                Create bot
                            </Text>
                        }

                    </LinearGradient>
                </MyButton>
                }

                {
                    tradeSetting.trade_type == '1' &&
                <MyButton onPress={startBot} style={[styles.button, {
                    // backgroundColor: !isValid ? Colors.border : Colors.primary
                }]}>
                    <LinearGradient style={styles.createBtnGradient}
                                    colors={['#e602df', '#4406b0']}

                                    start={{x: 1, y: 0}}
                                    end={{x: 0.1, y: 0.3,}}

                        // locations={[0.1, 0.7,]}
                    >
                        {
                            loading && <ActivityIndicator size='small' color={"#fff"}/>
                        }
                        {
                            !loading &&
                            <Text style={styles.buttonTxt}>
                                Create bot
                            </Text>
                        }

                    </LinearGradient>
                </MyButton>
                }


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
        //   borderTopColor: Colors.borderColor,
        // borderTopWidth: 1,

        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    Details: {
        height: heightPixel(55),
        width: '100%',
        borderBottomWidth: 1,
        paddingHorizontal: pixelSizeHorizontal(20),
        borderBottomColor: Colors.borderColor,
        flexDirection: "row",
        alignItems: 'center',
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
        fontSize: fontPixel(14),
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
    createBtnGradient: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row'
    },
})

export default ReviewScreen;
