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
    Pressable, RefreshControl
} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../../../helpers/normalize";
import TopBar from "../../../components/header/TopBar";
import {RootTabScreenProps} from "../../../types";
import {Fonts} from "../../../constants/Fonts";
import {Ionicons, Octicons} from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import {currencyFormatter, wait} from "../../../helpers";
import {LineChart} from "react-native-wagmi-charts";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Animated, {Easing, FadeInDown, FadeOutDown, Layout} from "react-native-reanimated";
import SwipeToast from "../../../components/toast/SwipeToast";
import ToastAnimated from "../../../components/toast";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {addNotificationItem} from "../../../app/slices/dataSlice";
import {useQuery} from "@tanstack/react-query";
import {getUser} from "../../../api";

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
    const {userData,User_Details} = user
    const openProfile = () => {

    }

    const [refreshing, setRefreshing] = useState(false);
    const openNotifications = () => {

    }
    const overView = () => {
        navigation.navigate('OverView')
    }
    const {data, refetch} = useQuery(['user-data'],()=> getUser(userData.id))


    const refresh = () => {
        setRefreshing(true)
        refetch()
        wait(2000).then(() => setRefreshing(false));
    }


    return (

        <SafeAreaView style={styles.safeArea}>
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
                <LinearGradient style={styles.dashboard}
                                colors={['#e813e1', "#690152", '#030D34']}

                                start={{x: 1.8, y: 0}}
                                end={{x: 1.5, y: 0.8,}}

                    // locations={[0.1, 0.7,]}
                >


                    <TopBar
                        profilePhoto={ User_Details.image? User_Details.image : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}
                        userName={User_Details.username}/>

                    <View style={styles.dashboardInfo}>
                        <View style={styles.cyborgInfo}>
                            <Text style={styles.cyborgName}>Cyborg</Text>
                            <View style={styles.logoCover}>
                                <Image source={require('../../../assets/images/cyborg-logo.png')}
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

                                    {currencyFormatter('en-US', 'USD').format(27673891)}

                                </Text>




                            <TouchableOpacity onPress={overView} style={styles.overviewBtn}>
                                    <Text style={styles.overviewText}>
                                        Overview
                                    </Text>
                                    <Octicons name="chevron-right" size={14} color="#fff"/>

                                </TouchableOpacity>
                            </View>


                            <View style={styles.bottomEarn}>
                                <Text style={styles.profitText}>
                                    Profit earned
                                </Text>
                                <Text style={styles.profitBalance}>

                                    {currencyFormatter('en-US', 'USD').format(73891)}

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
                                        ]} height={100} width={width - 40}>

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


                </LinearGradient>


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

                <Animated.View layout={Layout.easing(Easing.bounce).delay(100)} entering={FadeInDown.springify()}
                               exiting={FadeOutDown}>
                    <Pressable style={styles.AssetCard}>

                        <View style={styles.assetIcon}>
                            <View style={styles.assetCardIcon}>
                                <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/5968/5968260.png'}}
                                       style={styles.logo}/>
                            </View>
                        </View>

                        <View style={styles.coinName}>
                            <Text style={styles.coinSymbol}>
                                BTC/USDT
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
                                {currencyFormatter('en-US', 'USD').format(230032)}
                            </Text>
                            <Text style={styles.coinNameText}>
                                0.323
                            </Text>
                        </View>

                    </Pressable>


                </Animated.View>



            </ScrollView>


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        width: '100%',
        backgroundColor: "#141621",
        alignItems: 'center',
        paddingBottom: Platform.OS === 'ios' ? -40 : 0
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
        width: '100%',
        height: heightPixel(440),
        alignItems: 'center',
        borderRadius: 60,
        paddingHorizontal: pixelSizeHorizontal(20),
    },
    dashboardInfo: {

        width: '100%',
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
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(28),
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
        height: heightPixel(45),
        flexDirection: 'row',
        justifyContent: 'space-between',

    }, balance: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(26),
        color: "#fff",
    },
    overviewBtn: {
        backgroundColor: "#690152",
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
        color: "#fff",
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