import React, {SetStateAction, useState} from 'react';

import {Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, Platform} from 'react-native';
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
import {useAppSelector} from "../../app/hooks";
import {useQuery} from "@tanstack/react-query";
import {getAsset, getExchangeBal, getRevenueDetails} from "../../api";
import IOSSegmentContol from "../../components/segment-control/IOSSegmentContol";
import SegmentedControl from "../../components/segment-control/SegmentContol";
import {IF} from "../../helpers/ConditionJsx";

const OverView = ({navigation}: RootStackScreenProps<'OverView'>) => {

    const user = useAppSelector(state => state.user)
    const {User_Details} = user

    const {data: Asset, refetch: fetchAsset, isLoading} = useQuery(['user-Asset'], () => getAsset(User_Details.id))

    const {
        data:revenue,
        refetch:fetchRevenue,

    } = useQuery(['get-RevenueDetails',User_Details.id], () => getRevenueDetails(User_Details.id))


    const {
        data:ExchangeBal,
        refetch:fetchExchangeBal,

    } = useQuery(['get-Exchange-Bal',User_Details.id], () => getExchangeBal({userId:User_Details.id}))

    const [tabIndex, setTabIndex] = useState(0);
    const handleTabsChange = (index: SetStateAction<number>) => {
        setTabIndex(index);
        //  setScreen(index === 0 ? 'Banks' : 'Wallets')
    };

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
                    {
                        Platform.OS === 'ios' ?

                            <IOSSegmentContol tabs={["Others", "Spot", "Futures"]}
                                              currentIndex={tabIndex}
                                              onChange={handleTabsChange}
                                              segmentedControlBackgroundColor={'#7676801F'}
                                              activeSegmentBackgroundColor={"#fff"}
                                              activeTextColor={Colors.textDark}
                                              textColor={"#fff"}
                                              paddingVertical={pixelSizeVertical(12)}/>
                            :

                            <SegmentedControl tabs={["Others", "Spot", "Futures"]}
                                              currentIndex={tabIndex}
                                              onChange={handleTabsChange}
                                              segmentedControlBackgroundColor={Colors.tintPrimary}
                                              activeSegmentBackgroundColor={Colors.primary}
                                              activeTextColor={Colors.text}
                                              textColor={"#CDD4D7"}
                                              paddingVertical={pixelSizeVertical(16)}/>
                    }
                    <IF condition={tabIndex == 0}>


                    <Animated.View entering={FadeInDown} layout={Layout.easing(Easing.bounce).delay(100)} exiting={FadeOutDown} style={styles.wallets}>

                        <View style={[styles.walletCard,{
                            backgroundColor: Colors.secondary,
                        }]}
                                       >
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
                                    Total Balance
                                </Text>
                            </View>
                            <View style={styles.walletCardAmount}>
                                <Text style={[styles.cardTitle, {
                                    fontSize: fontPixel(14)
                                }]}>
                                    {


                                        currencyFormatter('en-US', 'USD').format(Asset?.data?.total_assets)
                                    }
                                </Text>
                            </View>

                        </View>


                        <View style={[styles.walletCard,{backgroundColor: Colors.secondary,}]}>
                            <View style={styles.logoCircle}>

                                {/*<Image source={require('../../../assets/images/brace-icon.png')}
                                       style={styles.logo}/>*/}

                                <MaterialIcons name="stacked-line-chart" size={20} color="#fff" />
                            </View>

                            <View style={styles.walletCardBody}>
                                <Text style={styles.cardTitle}>
                                    Available Trading Fee
                                </Text>
                                <Text style={styles.cardText}>
                                    Trade fee
                                </Text>
                            </View>
                            <View style={styles.walletCardAmount}>
                                <Text style={[styles.cardTitle, {
                                    fontSize: fontPixel(14)
                                }]}>



                                        {currencyFormatter('en-US', 'USD').format(Asset?.data?.rp_assets ? Asset?.data?.rp_assets : 0)}

                                </Text>
                            </View>

                        </View>


                    </Animated.View>
                    </IF>

                    <IF condition={tabIndex == 1}>


                    <Animated.View entering={FadeInDown} layout={Layout.easing(Easing.bounce).delay(100)} exiting={FadeOutDown} style={styles.wallets}>

                        <View style={[styles.walletCard,{
                            backgroundColor: Colors.secondary,
                        }]}
                                         >
                            <View style={styles.logoCircle}>

                                <Image source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/1200px-Binance_Logo.svg.png'}}
                                       style={styles.logo}/>


                            </View>

                            <View style={styles.walletCardBody}>
                                <Text style={styles.cardTitle}>
                               Binance
                                </Text>
                                <Text style={styles.cardText}>
                                    Spot Balance
                                </Text>
                            </View>
                            <View style={styles.walletCardAmount}>
                                <Text style={[styles.cardTitle, {
                                    fontSize: fontPixel(14)
                                }]}>
                                    {


                                        currencyFormatter('en-US', 'USD').format(ExchangeBal?.data?.binance_balance ? ExchangeBal?.data?.binance_balance : 0)
                                    }
                                </Text>
                            </View>

                        </View>


                        <View style={[styles.walletCard,{backgroundColor: Colors.secondary,}]}>
                            <View style={styles.logoCircle}>

                                <Image source={{uri:'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0'}}
                                       style={styles.logo}/>
                            </View>

                            <View style={styles.walletCardBody}>
                                <Text style={styles.cardTitle}>
                                   Coinbase Pro
                                </Text>
                                <Text style={styles.cardText}>
                                    Spot Balance
                                </Text>
                            </View>
                            <View style={styles.walletCardAmount}>
                                <Text style={[styles.cardTitle, {
                                    fontSize: fontPixel(14)
                                }]}>



                                        {currencyFormatter('en-US', 'USD').format(ExchangeBal?.data?.coinbasepro_balance ? ExchangeBal?.data?.coinbasepro_balance : 0)}

                                </Text>
                            </View>

                        </View>


                        <View style={[styles.walletCard,{backgroundColor: Colors.secondary,}]} >
                            <View style={styles.logoCircle}>


                                <Image source={{uri:'https://assets.staticimg.com/cms/media/3gfl2DgVUqjJ8FnkC7QxhvPmXmPgpt42FrAqklVMr.png'}}
                                       style={styles.logo}/>

                            </View>

                            <View style={styles.walletCardBody}>
                                <Text style={styles.cardTitle}>
                                    Kucoin
                                </Text>
                                <Text style={styles.cardText}>
                                    Spot Balance
                                </Text>
                            </View>
                            <View style={styles.walletCardAmount}>
                                <Text style={[styles.cardTitle, {
                                    fontSize: fontPixel(14)
                                }]}>



                                    {currencyFormatter('en-US', 'USD').format(ExchangeBal?.data?.kucoin_balance ? ExchangeBal?.data?.kucoin_balance : 0)}

                                </Text>
                            </View>

                        </View>



                        <View style={[styles.walletCard,{backgroundColor: Colors.secondary,}]} >
                            <View style={styles.logoCircle}>

                                <Image source={{uri:'https://static-00.iconduck.com/assets.00/kraken-icon-512x512-icmwhmh8.png'}}
                                       style={styles.logo}/>

                            </View>

                            <View style={styles.walletCardBody}>
                                <Text style={styles.cardTitle}>
                                    Kraken
                                </Text>
                                <Text style={styles.cardText}>
                                    Spot Balance
                                </Text>
                            </View>
                            <View style={styles.walletCardAmount}>
                                <Text style={[styles.cardTitle, {
                                    fontSize: fontPixel(14)
                                }]}>



                                    {currencyFormatter('en-US', 'USD').format(ExchangeBal?.data?.kraken_balance ? ExchangeBal?.data?.kraken_balance : 0)}

                                </Text>
                            </View>

                        </View>


                    </Animated.View>
                    </IF>


                    <IF condition={tabIndex == 2}>


                        <Animated.View entering={FadeInDown} layout={Layout.easing(Easing.bounce).delay(100)} exiting={FadeOutDown} style={styles.wallets}>

                            <View style={[styles.walletCard,{
                                backgroundColor: Colors.secondary,
                            }]}
                                       >
                                <View style={styles.logoCircle}>

                                    <Image source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/1200px-Binance_Logo.svg.png'}}
                                           style={styles.logo}/>


                                </View>

                                <View style={styles.walletCardBody}>
                                    <Text style={styles.cardTitle}>
                                        Binance
                                    </Text>
                                    <Text style={styles.cardText}>
                                        Futures Balance
                                    </Text>
                                </View>
                                <View style={styles.walletCardAmount}>
                                    <Text style={[styles.cardTitle, {
                                        fontSize: fontPixel(14)
                                    }]}>
                                        {


                                            currencyFormatter('en-US', 'USD').format(ExchangeBal?.data?.futures_binance_balance ? ExchangeBal?.data?.futures_binance_balance : 0)
                                        }
                                    </Text>
                                </View>

                            </View>


                            <View style={[styles.walletCard,{backgroundColor: Colors.secondary,}]} >
                                <View style={styles.logoCircle}>

                                    <Image source={{uri:'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0'}}
                                           style={styles.logo}/>
                                </View>

                                <View style={styles.walletCardBody}>
                                    <Text style={styles.cardTitle}>
                                        Coinbase Pro
                                    </Text>
                                    <Text style={styles.cardText}>
                                        Futures Balance
                                    </Text>
                                </View>
                                <View style={styles.walletCardAmount}>
                                    <Text style={[styles.cardTitle, {
                                        fontSize: fontPixel(14)
                                    }]}>



                                        {currencyFormatter('en-US', 'USD').format(ExchangeBal?.data?.futures_coinbasepro_balance ? ExchangeBal?.data?.futures_coinbasepro_balance : 0)}

                                    </Text>
                                </View>

                            </View>


                            <View style={[styles.walletCard,{backgroundColor: Colors.secondary,}]} >
                                <View style={styles.logoCircle}>


                                    <Image source={{uri:'https://assets.staticimg.com/cms/media/3gfl2DgVUqjJ8FnkC7QxhvPmXmPgpt42FrAqklVMr.png'}}
                                           style={styles.logo}/>

                                </View>

                                <View style={styles.walletCardBody}>
                                    <Text style={styles.cardTitle}>
                                        Kucoin
                                    </Text>
                                    <Text style={styles.cardText}>
                                        Futures Balance
                                    </Text>
                                </View>
                                <View style={styles.walletCardAmount}>
                                    <Text style={[styles.cardTitle, {
                                        fontSize: fontPixel(14)
                                    }]}>



                                        {currencyFormatter('en-US', 'USD').format(ExchangeBal?.data?.futures_kucoin_balance ? ExchangeBal?.data?.futures_kucoin_balance : 0)}

                                    </Text>
                                </View>

                            </View>



                            <View style={[styles.walletCard,{backgroundColor: Colors.secondary,}]}>
                                <View style={styles.logoCircle}>

                                    <Image source={{uri:'https://static-00.iconduck.com/assets.00/kraken-icon-512x512-icmwhmh8.png'}}
                                           style={styles.logo}/>

                                </View>

                                <View style={styles.walletCardBody}>
                                    <Text style={styles.cardTitle}>
                                        Kraken
                                    </Text>
                                    <Text style={styles.cardText}>
                                        Futures Balance
                                    </Text>
                                </View>
                                <View style={styles.walletCardAmount}>
                                    <Text style={[styles.cardTitle, {
                                        fontSize: fontPixel(14)
                                    }]}>



                                        {currencyFormatter('en-US', 'USD').format(ExchangeBal?.data?.futures_kraken_balance ? ExchangeBal?.data?.futures_kraken_balance : 0)}

                                    </Text>
                                </View>

                            </View>


                        </Animated.View>
                    </IF>

                    <HorizontalLine margin={20}/>

                    <View style={styles.planInfo}>
                        <Text style={styles.planTitle}>
                          Others
                        </Text>

                    </View>

                    <TouchableOpacity style={[styles.walletCard,{
                        borderWidth:1,
                        borderColor:Colors.borderColor,
                    }]} activeOpacity={0.9}>
                        <View style={styles.logoCircle}>


                            <MaterialIcons name="attach-money" size={20} color="#ffff" />

                        </View>

                        <View style={styles.walletCardBody}>
                            <Text style={styles.cardTitle}>
                         Total profits
                            </Text>
                            <Text style={styles.cardText}>
                               Cumulative profit earned
                            </Text>
                        </View>
                        <View style={styles.walletCardAmount}>
                            <Text style={[styles.cardTitle, {
                                fontSize: fontPixel(14)
                            }]}>
                                {


                                    currencyFormatter('en-US', 'USD').format(revenue?.data?.total_profit ? revenue?.data?.total_profit : 0)
                                }
                            </Text>
                        </View>

                    </TouchableOpacity>


                    <TouchableOpacity style={[styles.walletCard,{
                        marginTop:20,
                        borderWidth:1,
                        borderColor:Colors.borderColor,
                    }]} activeOpacity={0.9}>
                        <View style={styles.logoCircle}>

                            <MaterialIcons name="attach-money" size={20} color="#ffff" />


                        </View>

                        <View style={styles.walletCardBody}>
                            <Text style={styles.cardTitle}>
                         Todays profits
                            </Text>
                            <Text style={styles.cardText}>
                           Profit earned today
                            </Text>
                        </View>
                        <View style={styles.walletCardAmount}>
                            <Text style={[styles.cardTitle, {
                                fontSize: fontPixel(14)
                            }]}>
                                {


                                    currencyFormatter('en-US', 'USD').format(revenue?.data?.today_profit ? revenue?.data?.today_profit : 0)
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
        justifyContent: 'flex-start',
    },
    walletCard: {
        marginVertical:pixelSizeVertical(8),
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
borderRadius:100,
    },
    walletCardBody: {
        width: '55%',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        height: heightPixel(50)

    },
    cardTitle: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(14),
        color: Colors.text,
    },
    cardText: {
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(12),
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
