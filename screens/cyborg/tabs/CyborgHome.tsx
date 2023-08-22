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
import TopBar from "../../../components/header/TopBar";
import {RootTabScreenProps} from "../../../types";
import {Fonts} from "../../../constants/Fonts";
import {Ionicons, Octicons} from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import {currencyFormatter, useRefreshOnFocus, wait} from "../../../helpers";
import {LineChart} from "react-native-wagmi-charts";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Animated, {Easing, FadeInDown, FadeOutDown, Layout} from "react-native-reanimated";
import SwipeToast from "../../../components/toast/SwipeToast";
import ToastAnimated from "../../../components/toast";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {addNotificationItem} from "../../../app/slices/dataSlice";
import {useQuery} from "@tanstack/react-query";
import {activeStrategy, getAsset, getNewstrategy, getUser} from "../../../api";

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


const CyborgHome = ({navigation}: RootTabScreenProps<'CyborgHome'>) => {


    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)
    const {User_Details} = user

    const {data: Asset, refetch: fetchAsset, isLoading} = useQuery(['user-Asset'], () => getAsset(User_Details.id))

    const [refreshing, setRefreshing] = useState(false);


    const {
        data: strategy,
        refetch: fetchStrategy,
        isLoading: loadingStrategy
    } = useQuery(['activeStrategy'], () => activeStrategy(User_Details.id))


    const openNotifications = () => {

    }
    const overView = () => {
        navigation.navigate('OverView')
    }

    const seeLogs = (exchange: string, market: string, id:string) => {
        navigation.navigate('LogScreen', {
            id,
            exchange,
            market
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

    useRefreshOnFocus(fetchAsset)
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

                    <TopBar homeDash profilePhoto={User_Details.image ? User_Details.image : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'} userName={User_Details.username}/>

                    <View style={styles.dashboardInfo}>
                        <View style={styles.cyborgInfo}>
                            <Text style={styles.cyborgName}>Cyborg</Text>
                            <View style={styles.logoCover}>
                                <Image source={require('../../../assets/images/logos/cyborlogo.png')}
                                       style={styles.logoCyborg}/>
                            </View>
                        </View>

                        <View style={styles.amountContainer}>

                            <TouchableOpacity activeOpacity={0.7}
                                              style={styles.balanceTitle}>
                                <Text style={styles.balText}>
                                    Account balance
                                </Text>

                                <Ionicons name="eye-off-outline" size={14} color={"#d9d9d9"}/>


                            </TouchableOpacity>


                            <View style={styles.balanceGraph}>

                                <Text
                                    style={styles.balance}>

                                    {currencyFormatter('en-US', 'USD').format(Asset?.data?.total_assets)}

                                </Text>


                                <TouchableOpacity onPress={overView} style={styles.overviewBtn}>
                                    <Text style={styles.overviewText}>
                                        Overview
                                    </Text>
                                    <Octicons name="chevron-right" size={14} color="#A13AD1"/>

                                </TouchableOpacity>
                            </View>


                            <View style={styles.bottomEarn}>
                                <Text style={styles.profitText}>
                                    Profit earned
                                </Text>
                                <Text style={styles.profitBalance}>

                                    {currencyFormatter('en-US', 'USD').format(Asset?.data?.rp_assets)}

                                </Text>


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


                <View style={styles.portfolioHead}>
                    <Text style={styles.portfolioHeadText}>
                        Portfolio
                    </Text>
                    <Text style={styles.portfolioHeadText}>
                        Chart
                    </Text>
                    <Text style={styles.portfolioHeadText}>
                        Floating profit
                    </Text>
                </View>

                {
                    loadingStrategy && <ActivityIndicator size='small' color={Colors.primary}/>
                }

                {
                    strategy &&
                    strategy?.data['Operation Strategy'].map((item: {
                        [x: string]: any;
                        id: React.Key | null | undefined;
                        Market: string,
                        Avg_Price: number | bigint;
                        Quantity: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
                    }, index: any) => (
                        <Animated.View key={item.id} layout={Layout.easing(Easing.bounce).delay(100)}
                                       entering={FadeInDown.springify()}
                                       exiting={FadeOutDown}>
                            <Pressable onPress={() => seeLogs(item.exchange, item.Market, item.id)} style={styles.AssetCard}>

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
                                    <Text style={styles.coinNameText}>
                                        Bitcoin
                                    </Text>
                                </View>

                                <View style={styles.assetChart}>
                                    <LineChart.Provider data={ChartData}>
                                        <LineChart height={heightPixel(70)} width={widthPixel(90)}>
                                            <LineChart.Path color={Colors.errorRed}/>
                                        </LineChart>
                                    </LineChart.Provider>
                                </View>


                                <View style={styles.priceSection}>
                                    <Text style={styles.coinSymbol}>
                                        {currencyFormatter('en-US', 'USD').format(item.Avg_Price)}
                                    </Text>
                                    <Text style={styles.coinNameText}>
                                        {item.Quantity}
                                    </Text>
                                </View>

                            </Pressable>


                        </Animated.View>
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
    dashboardBackground:{
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
overflow:'hidden',
    },
    dashboardImage:{
       // paddingHorizontal: pixelSizeHorizontal(20),
        resizeMode:'cover',
        width:'100%',
        height:'100%',
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
        fontFamily: Fonts.faktumMedium,
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
    }

})

export default CyborgHome;
