import React, {useCallback, useId, useRef, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Platform,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Pressable, RefreshControl, ActivityIndicator, ImageBackground
} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../../../helpers/normalize";
import TopBar from "../../../components/cyborg/header/TopBar";
import {RootTabScreenProps} from "../../../types";
import {Fonts} from "../../../constants/Fonts";
import {Ionicons, MaterialCommunityIcons, Octicons} from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import {currencyFormatter, invertNumber, useRefreshOnFocus, wait} from "../../../helpers";
import {LineChart} from "react-native-wagmi-charts";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Animated, {Easing, FadeInDown, FadeOutDown, Layout} from "react-native-reanimated";
import SwipeToast from "../../../components/toast/SwipeToast";
import ToastAnimated from "../../../components/toast";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {addNotificationItem, setHideBalance} from "../../../app/slices/dataSlice";
import {useQuery} from "@tanstack/react-query";
import {
    activeStrategy,
    binanceTicker,
    getAsset,
    getExchangeBal,
    getRevenueDetails,
    getUser, quantitativeStrategies
} from "../../../api";
import NoItem from "../../../components/NoItem";

let width = Dimensions.get("window").width


const ChartData = [
    {
        timestamp: 5225945400000,
        value: 75.25,
    }, {
        timestamp: 1625945400000,
        value: 933575.25,
    }, {
        timestamp: 1025945400000,
        value: 13355.25,
    },
    {
        timestamp: 1625946300000,
        value: 355.25,
    },
    {
        timestamp: 1625947200000,
        value: 833510.25,
    },
    {
        timestamp: 1625948109000,
        value: 931205.25,
    }, {
        timestamp: 1910948109000,
        value: 1431205.25,
    },]

interface props {
    Exchanges: [],
    tickers: [],
    seeLogs: (exchange: string, Market: string, id: string,trade_type:string) => void
    item: {
        [x: string]: any;
        id: string;
        Market: string,
        trade_type: string,
        Avg_Price: string;
        Quantity: string
    }
}


const HomeTradeCard = ({item, seeLogs, Exchanges, tickers}: props) => {

    const tickerRes = tickers?.find((ticker: { symbol: string; }) => ticker.symbol == item.Market.replace('/', ''))

 /*   let old_price = item?.Quantity * item?.Avg_Price;
    let new_value = item?.Quantity * parseFloat(tickerRes?.lastPrice);
    let finalvalue = new_value - old_price;*/


    let p2 = parseFloat(item?.Quantity) * parseFloat(tickerRes?.lastPrice);
    let val = item['Positionamount'] > 0 ? (Number(item['Positionamount']) - (p2)) / Number(item['Positionamount']) : 0;
    let finalvalue = val * 100;


    return (
        <Animated.View key={item.id} layout={Layout.easing(Easing.bounce).delay(100)}
                       entering={FadeInDown.springify()}
                       exiting={FadeOutDown}>
            <Pressable onPress={() => seeLogs(item.exchange, item.Market, item.id, item.trade_type)}
                       style={styles.AssetCard}>

                <View style={styles.assetIcon}>
                    <View style={styles.assetCardIcon}>
                        <Image
                            source={{uri: `https://backend.deltacyborg.pro/Upload/coin/${item['coin image']}`}}
                            style={styles.logo}/>
                    </View>
                </View>

                <View style={styles.coinName}>
                    <Text style={styles.coinSymbol}>
                        {item.Market}
                    </Text>
                    <View style={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                        <Text style={styles.coinNameText}>

                            {Exchanges.find(exchange => exchange.exchange == item.exchange)?.exchangeName}

                        </Text>

                        <MaterialCommunityIcons name="circle-small" size={14} color={Colors.text} />
                        <Text style={{
                            fontSize: 10,

                            color: Colors.pendingYellow
                        }}>
                            {item?.trade_type == '1' && 'Futures'}
                            {item?.trade_type == '0' && 'Spot'}
                        </Text>
                    </View>

                </View>

                {
                    item?.trade_type == '1' &&
                <View style={styles.assetChart}>
                    <LineChart.Provider data={ChartData}>
                        <LineChart height={heightPixel(70)} width={widthPixel(90)}>
                            <LineChart.Path color={item.profit  < 1 ? Colors.errorRed : Colors.successChart}/>
                        </LineChart>
                    </LineChart.Provider>
                </View>
                }
                {
                    item?.trade_type == '0' &&
                <View style={styles.assetChart}>
                    <LineChart.Provider data={ChartData}>
                        <LineChart height={heightPixel(70)} width={widthPixel(90)}>
                            <LineChart.Path color={finalvalue  < 1 ? Colors.errorRed : Colors.successChart}/>
                        </LineChart>
                    </LineChart.Provider>
                </View>
                }

                {
                    item?.trade_type == '1'
                &&
                <View style={styles.priceSection}>
                    <Text style={[styles.coinSymbol, {
                        color:item.profit ? item.profit   < 0 ?  Colors.errorRed :Colors.successChart : Colors.successChart
                    }]}>

                        {/* {currencyFormatter('en-US', 'USD').format(item.Avg_Price)}*/}

                        {item.profit ? parseFloat(item.profit).toFixed(2) : '0.00'}%
                    </Text>
                    <Text style={styles.coinNameText}>
                        {parseFloat(item.Positionamount).toFixed(2)}
                    </Text>
                </View>
                }
                {
                    item?.trade_type == '0'
                &&
                <View style={styles.priceSection}>
                    <Text style={[styles.coinSymbol, {
                        color:finalvalue ? invertNumber((finalvalue))   < 0 ?  Colors.errorRed :Colors.successChart : Colors.successChart
                    }]}>

                        {/* {currencyFormatter('en-US', 'USD').format(item.Avg_Price)}*/}

                        {finalvalue ? invertNumber(parseFloat(finalvalue)) : '0.00'}%
                    </Text>
                    <Text style={styles.coinNameText}>
                        {item.Positionamount ? parseFloat(item.Positionamount).toFixed(2) : '0.00'}%

                    </Text>
                </View>
}
            </Pressable>


        </Animated.View>
    )
}


const CyborgHome = ({navigation}: RootTabScreenProps<'CyborgHome'>) => {


    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)
    const {User_Details} = user

    const dataSlice = useAppSelector(state => state.data)
    const {hideBalance} = dataSlice

    const {data: Asset, refetch: fetchAsset, isLoading} = useQuery(['user-Asset'], () => getAsset(User_Details.id))

    const [refreshing, setRefreshing] = useState(false);


    const {
        data: strategy,
        refetch: fetchStrategy,
        isLoading: loadingStrategy
    } = useQuery(['activeStrategy'], () => activeStrategy(User_Details.id))

    const {
        data:strategies,
        isLoading:loadingStrategies,
        refetch:fetchStrategies
    } = useQuery(['quantitativeStrategies', User_Details.id], () => quantitativeStrategies(User_Details.id))

    const {
        data: revenue,
        refetch: fetchRevenue,

    } = useQuery(['get-RevenueDetails', User_Details.id], () => getRevenueDetails(User_Details.id))


    const {
        data: tickers,
        refetch: fetchTickers,
        isLoading: fetchingTickers
    } = useQuery(['binanceTicker'], binanceTicker)


    const overView = () => {
        navigation.navigate('CyborgBottomTab',{
            screen:'OverView'
        })
    }

    const seeLogs = (exchange: string, market: string, id: string, trade_type:string) => {

        navigation.navigate('CyborgBottomTab',{
            screen:'LogScreen', params:{
                id,
                trade_type,
                exchange,
                market,
                screenFrom:'CyborgHome'
            }
        })
    }



    const {data, isRefetching, refetch,} = useQuery(
        [`user-data`, User_Details.id],
        () => getUser(User_Details.id),
        {})


    const refresh = () => {
        setRefreshing(true)
        refetch()
        wait(2000).then(() => setRefreshing(false));
    }

    const seeAll = () => {
        navigation.navigate('ActiveTrades')
    }
    const hideMyBalance = () => {
        dispatch(setHideBalance())
    }

    useRefreshOnFocus(fetchAsset)
    useRefreshOnFocus(fetchStrategy)

    useRefreshOnFocus(fetchRevenue)
    useRefreshOnFocus(fetchStrategies)


    const Exchanges = [
        {
            id: '1',
            logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
            status: User_Details.coinbaseprobind,
            rank: "3",
            exchange: '3',
            exchangeName: 'Coinbase'
        }, {
            id: '2',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/1200px-Binance_Logo.svg.png',
            status: User_Details.binancebind,

            rank: "1",
            exchange: '1',
            exchangeName: 'Binance'
        }, {
            id: '3',
            logo: 'https://static-00.iconduck.com/assets.00/kraken-icon-512x512-icmwhmh8.png',
            status: User_Details.krakenbind,
            rank: "1",
            exchange: '4',
            exchangeName: 'Kraken'
        }, {
            id: '4',
            logo: 'https://assets.staticimg.com/cms/media/3gfl2DgVUqjJ8FnkC7QxhvPmXmPgpt42FrAqklVMr.png',
            status: User_Details.kucoinbind,
            rank: "1",
            exchange: '2',
            exchangeName: 'Kucoin'
        }
    ]

    const TotalBal = parseInt(strategies?.data?.binance_balance) + parseInt(strategies?.data?.futures_binance_balance)

    return (

        <SafeAreaView style={styles.safeArea}>

            {/*<ImageBackground source={require('../../../assets/images/Background-cyborg.jpg')}*/}
            {/*                 resizeMode={'cover'}*/}
            {/*                 style={styles.dashboardBackground}>*/}
            {/*     <LinearGradient style={styles.background}


                             start={{x: 2.5, y: 0}}
                             end={{x: 1.5, y: 0.8,}}

                 colors={['#4E044B', '#141621',]}

                // start={{x: 2.5, y: 0}}
               //  end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}
            >*/}
            <ScrollView style={{width: '100%',}} contentContainerStyle={styles.scrollView} scrollEnabled
                        showsVerticalScrollIndicator={false}

                        refreshControl={<RefreshControl tintColor={Colors.primary} refreshing={refreshing}
                                                        onRefresh={refresh}/>}
            >
                {/*   <LinearGradient style={styles.dashboard}
                                colors={[ "#A13AD1",'#030D34', '#0B0811']}
                               // colors={['#e813e1', "#690152", '#030D34']}
                                start={{x: 1.5, y: 0}}
                                end={{x: 1.2, y: 1,}}

                    // locations={[0.1, 0.7,]}
                >


*/}
                <View style={styles.dashboard}>


                    <ImageBackground source={require('../../../assets/images/Blackbackground.jpg')}
                                     resizeMode={'cover'}
                                     style={styles.dashboardImage}>

                        <TopBar homeDash
                                profilePhoto={User_Details.image ? User_Details.image : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}
                                userName={User_Details.username}/>

                        <View style={styles.dashboardInfo}>
                            <View style={styles.cyborgInfo}>
                                <Text style={styles.cyborgName}>Cyborg</Text>
                                <View style={styles.logoCover}>
                                    <Image source={require('../../../assets/images/logos/cyborlogo.png')}
                                           style={styles.logoCyborg}/>
                                </View>
                            </View>

                            <View style={styles.amountContainer}>

                                <TouchableOpacity onPress={hideMyBalance} activeOpacity={0.7}
                                                  style={styles.balanceTitle}>
                                    <Text style={styles.balText}>
                                        Account balance
                                    </Text>
                                    {
                                        hideBalance &&
                                        <Ionicons name="eye-off-outline" size={14} color={"#d9d9d9"}/>
                                    }
                                    {
                                        !hideBalance &&
                                        <Ionicons name="eye-outline" size={14} color={"#d9d9d9"}/>
                                    }

                                </TouchableOpacity>


                                <View style={styles.balanceGraph}>
                                    {
                                        !hideBalance &&
                                        <Text style={styles.balance}>

                                            {currencyFormatter('en-US', 'USD').format(TotalBal ? TotalBal : 0)}

                                        </Text>
                                    }
                                    {
                                        hideBalance &&
                                        <Text style={styles.balance}>

                                            ****

                                        </Text>
                                    }

                                    <TouchableOpacity onPress={overView} style={styles.overviewBtn}>
                                        <Text style={styles.overviewText}>
                                            Overview
                                        </Text>
                                        <Octicons name="chevron-right" size={14} color="#A13AD1"/>

                                    </TouchableOpacity>
                                </View>


                                <View style={styles.bottomEarn}>
                                    <Text style={styles.profitText}>
                                        Total Profits
                                    </Text>
                                    {
                                        !hideBalance &&

                                        <Text style={styles.profitBalance}>

                                            {currencyFormatter('en-US', 'USD').format(revenue?.data?.total_profit ? revenue?.data?.total_profit : 0)}

                                        </Text>
                                    }
                                    {
                                        hideBalance &&
                                        <Text style={styles.balance}>

                                            ****

                                        </Text>
                                    }

                                </View>

                                <View style={{
                                    width: '100%',
                                    height: 100,

                                    justifyContent: 'center'
                                }}>

                                    <GestureHandlerRootView style={{}}>
                                        <LineChart.Provider data={ChartData}>
                                            <LineChart style={[

                                                {bottom: 0}
                                            ]} height={100} width={widthPixel(350)}>

                                                <LineChart.Path color={Colors.successChart}>


                                                    <LineChart.Tooltip
                                                        textStyle={{
                                                            fontFamily: Fonts.faktumRegular,
                                                            backgroundColor: Colors.tintSuccess,
                                                            borderRadius: 4,
                                                            color: Colors.success,
                                                            fontSize: fontPixel(12),
                                                            padding: 4,
                                                        }}
                                                    />

                                                    <LineChart.Gradient/>
                                                </LineChart.Path>
                                                <LineChart.CursorCrosshair color={Colors.successChart}/>
                                            </LineChart>
                                        </LineChart.Provider>
                                    </GestureHandlerRootView>

                                </View>
                            </View>
                        </View>

                    </ImageBackground>
                </View>

                <View style={styles.contentTop}>


                    <View style={styles.contentMsg}>

                        <Text style={[styles.contentMsgTxt, {
                            fontFamily: Fonts.faktumBold,

                        }]}>
                            Active trades
                        </Text>

                    </View>

                    <Pressable onPress={seeAll} style={styles.contentMsgRight}>

                        <Text style={[styles.contentMsgTxt, {
                            fontFamily: Fonts.faktumMedium,
                            fontSize: fontPixel(12)
                        }]}>
                            See all
                        </Text>
                        <Ionicons name="chevron-forward" size={14} color={Colors.text}/>

                    </Pressable>
                </View>


                <View style={styles.portfolioHead}>
                    <Text style={styles.portfolioHeadText}>
                        Portfolio
                    </Text>
                    <Text style={styles.portfolioHeadText}>
                        Chart
                    </Text>
                    <Text style={styles.portfolioHeadText}>
                         Profit/Loss
                    </Text>
                </View>

                {
                    loadingStrategy && <ActivityIndicator size='small' color={Colors.primary}/>
                }
                {
                    !loadingStrategy && strategy &&   strategy?.data['Operation Strategy'] == null &&
                    <NoItem message={"No active trades"}/>
                }

                {
                    !loadingStrategy &&
                    strategy &&
                    strategy?.data && strategy?.data['Operation Strategy'] !== null &&
                    strategy?.data['Operation Strategy']?.map((item: {
                        [x: string]: any;
                        id: React.Key | null | undefined;
                        Market: string,
                        Avg_Price: number | bigint;
                        Quantity: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
                    }, index: any) => (


                        <HomeTradeCard tickers={tickers} Exchanges={Exchanges} key={item.id} item={item}
                                       seeLogs={seeLogs}/>


                    ))


                }

            </ScrollView>


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        width: '100%',
        backgroundColor: "#000",
        alignItems: 'center',
        paddingBottom: Platform.OS === 'ios' ? -40 : 0
    },
    dashboardBackground: {
        width: '100%',
        alignItems: 'center',
        flex: 1,

    },
    scrollView: {

        width: '100%',
        alignItems: 'center'
    },
    background: {
        flex: 1,
        width: '100%',
        // paddingHorizontal: pixelSizeHorizontal(20),
    },
    dashboard: {


        width: '96%',
        height: heightPixel(440),
        alignItems: 'center',
        borderRadius: 30,
        overflow: 'hidden',
    },
    dashboardImage: {
        // paddingHorizontal: pixelSizeHorizontal(20),
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        borderRadius: 30,
        alignItems: 'center',
    },
    dashboardInfo: {

        width: '90%',
        height: heightPixel(300),
        alignItems: 'center',
    },
    cyborgInfo: {
        height: 65,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%'
    },
    cyborgName: {
        marginRight: 10,
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(30),
        color: "#fff"
    },
    logoCover: {
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoCyborg: {
        resizeMode: 'cover',
        height: '100%',
        width: '100%',
    },
    amountContainer: {
        width: '100%',

        justifyContent: 'center',
        height: heightPixel(250),
        alignItems: 'center',

    },
    balanceTitle: {

        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        height: heightPixel(25),
    },
    balText: {
        fontFamily: Fonts.faktumRegular,
        color: "#d9d9d9",
        fontSize: fontPixel(14),
        marginRight: 5,
    },
    bottomEarn: {
        marginTop: 15,
        width: '100%',
        alignItems: 'flex-start',
        height: heightPixel(45),
        justifyContent: 'space-between',
    },
    profitText: {
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(14),
        color: "#d9d9d9",
    },
    profitBalance: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(18),
        color: "#2EBD85",
    },
    balanceGraph: {

        width: '100%',
        alignItems: 'center',
        height: heightPixel(55),
        flexDirection: 'row',
        justifyContent: 'space-between',

    }, balance: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(34),
        color: "#fff",
    },
    overviewBtn: {
        backgroundColor: "#fff",
        width: widthPixel(90),
        height: 30,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 10,
        flexDirection: 'row',
    },
    overviewText: {
        marginRight: 5,
        fontFamily: Fonts.faktumSemiBold,
        fontSize: fontPixel(12),
        color: "#A13AD1",
    },
    earnedToday: {
        justifyContent: 'center',
        width: '90%',
        height: heightPixel(40),
    },
    earnedText: {
        fontFamily: Fonts.faktumMedium,
        fontSize: fontPixel(16),
        color: Colors.textDark
    },


    AssetCard: {
        width: '90%',
        height: heightPixel(80),
        marginVertical: pixelSizeVertical(10),
        paddingHorizontal: pixelSizeHorizontal(10),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.secondary,
        borderRadius: 20,
    },
    assetIcon: {
        width: 40,
        height: '70%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    coinName: {
        width: '30%',

        height: '80%',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly'
    },
    coinSymbol: {
        color: Colors.text,
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumBold
    },
    coinNameText: {
        color: Colors.greyText,
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumMedium
    },
    assetChart: {

        width: '25%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    priceSection: {

        width: '30%',
        height: '80%',
        alignItems: 'flex-end',
        justifyContent: 'space-evenly'
    },
    assetCardIcon: {
        borderRadius: 40,
        width: 25,
        height: 25,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    logo: {
        borderRadius: 20,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',

    },
    portfolioHead: {
        paddingHorizontal: pixelSizeHorizontal(20),
        marginTop: 15,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 45,
        flexDirection: 'row'
    },
    portfolioHeadText: {
        color: Colors.tintText,
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumMedium
    },
    contentTop: {
        marginTop: 35,
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: heightPixel(50),
        borderBottomColor: Colors.borderColor,


    },
    contentMsg: {

        height: '100%',

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    contentMsgRight: {
        width: widthPixel(50),
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    contentMsgTxt: {

        fontSize: fontPixel(14),
        color: Colors.text
    },

})

export default CyborgHome;
