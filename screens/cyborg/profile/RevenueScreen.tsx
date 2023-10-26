import React, {SetStateAction, useCallback, useId, useState} from 'react';

import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
    Pressable, Platform
} from 'react-native';
import HeaderWithTitle from "../../../components/cyborg/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {Feather, Ionicons, Octicons} from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import {currencyFormatter, useRefreshOnFocus, wait} from "../../../helpers";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../../../helpers/normalize";
import {Fonts} from "../../../constants/Fonts";
import {useQuery} from "@tanstack/react-query";
import {getRevenueDetails, getRevenues, getRewardDetails} from "../../../api";
import {useAppSelector} from "../../../app/hooks";
import {FlashList} from "@shopify/flash-list";
import dayjs from "dayjs";
import {CyborgStackScreenProps, RootStackScreenProps} from "../../../types";
import IOSSegmentContol from "../../../components/segment-control/IOSSegmentContol";
import SegmentedControl from "../../../components/segment-control/SegmentContol";
import {IF} from "../../../helpers/ConditionJsx";
import Animated, {Easing, FadeInDown, FadeOutDown, Layout} from "react-native-reanimated";


interface RewardItem {
    item: {
        "Date": string,
        "market": string,
        "profit": string,
        "buysell": string,
        "price": string
    }
}



const RevenueScreen = ({navigation}:CyborgStackScreenProps<'RevenueScreen'>) => {

    const [refreshing, setRefreshing] = useState(false);

    const user = useAppSelector(state => state.user)
    const {User_Details} = user


    const {
        data,
        refetch,
        isLoading,
        isRefetching
    } = useQuery(['get-RevenueDetails',User_Details.id], () => getRevenueDetails(User_Details.id))

//console.log(data)




//console.log(data?.data['History Records'])

    const [tabIndex, setTabIndex] = useState(0);
    const handleTabsChange = (index: SetStateAction<number>) => {
        setTabIndex(index);
        //  setScreen(index === 0 ? 'Banks' : 'Wallets')
    };


const seeAll = () => {
  navigation.navigate('AllRevenue')
}




    const refresh = () => {
        setRefreshing(true)
        refetch()
        wait(2000).then(() => setRefreshing(false));
    }


    useRefreshOnFocus(refetch)

//console.log(data?.data['futures_history'].slice(0,1))
    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#04074E', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >


                <HeaderWithTitle title='Revenue details'/>
                <ScrollView style={{
                    width: '100%'
                }} contentContainerStyle={styles.scrollView} scrollEnabled
                            showsVerticalScrollIndicator={false}>


                    <View style={styles.topDetails}>
                        <View style={styles.interestGained}>


                            <View
                                              style={[styles.balanceTitle, {
                                                  justifyContent: 'flex-start',

                                              }]}>
                                <Text style={styles.balText}>
                                    Today's profit (USDT)
                                </Text>



                            </View>

                            <View style={styles.balanceWrap}>


                                <View>
                                    <Text style={[styles.balance, {color: Colors.success}]}>

                                        { data?.data?.today_profit ? currencyFormatter('en-US','USD').format(data?.data?.today_profit) : "$0.00"}
                                    </Text>

                                </View>


                            </View>

                        </View>


                        <View style={styles.verticalLine}/>
                        <View style={styles.currentBalanceContainer}>

                            <TouchableOpacity activeOpacity={0.7} style={[styles.balanceTitle, {
                                justifyContent: 'flex-end',
                            }]}>
                                <Text style={styles.balText}>
                                    Cumulative profit (USDT)
                                </Text>




                            </TouchableOpacity>

                            <View style={[styles.balanceWrap,{
                                alignItems: 'flex-end',
                            }]}>


                                <Text style={[styles.balance]}>


                                    { data?.data?.total_profit ? currencyFormatter('en-US','USD').format(data?.data?.total_profit) : '$0.00'}
                                </Text>



                            </View>

                        </View>


                    </View>


                   <TouchableOpacity activeOpacity={0.7} style={styles.contentTop}>


                       <View style={styles.contentMsg}>

                           <Text style={[styles.contentMsgTxt, {
                               fontFamily: Fonts.faktumBold,

                           }]}>
                               Analysis
                           </Text>

                       </View>

                       <Pressable onPress={seeAll} style={styles.contentMsgRight}>

                           <Text style={[styles.contentMsgTxt, {
                               fontFamily: Fonts.faktumMedium,
                               fontSize: fontPixel(14)
                           }]}>
                               See all
                           </Text>
                           <Ionicons name="chevron-forward" size={16} color={Colors.text}/>

                       </Pressable>
                   </TouchableOpacity>
                   {
                       Platform.OS === 'ios' ?

                           <IOSSegmentContol tabs={["Spot Record", "Futures Record"]}
                                             currentIndex={tabIndex}
                                             onChange={handleTabsChange}
                                             segmentedControlBackgroundColor={'#7676801F'}
                                             activeSegmentBackgroundColor={"#fff"}
                                             activeTextColor={Colors.textDark}
                                             textColor={"#fff"}
                                             paddingVertical={pixelSizeVertical(12)}/>
                           :

                           <SegmentedControl tabs={["Spot Record", "Futures Record"]}
                                             currentIndex={tabIndex}
                                             onChange={handleTabsChange}
                                             segmentedControlBackgroundColor={Colors.tintPrimary}
                                             activeSegmentBackgroundColor={Colors.primary}
                                             activeTextColor={Colors.text}
                                             textColor={"#CDD4D7"}
                                             paddingVertical={pixelSizeVertical(16)}/>
                   }



                   {
                        isLoading && <ActivityIndicator color={Colors.primary} size='small'/>
                    }

                    <IF condition={tabIndex == 0}>


                    { data?.data['History Records'] !== null &&
                        data?.data['History Records'].slice(0,30).map((item: { profit: string ; price: string ;id:string,market_type:string, market: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; Date: number; })=>(
                            <Animated.View  layout={Layout.easing(Easing.bounce).delay(10)}
                                   entering={FadeInDown.springify()} exiting={FadeOutDown} key={item.id} style={styles.transactionCard}>




                                <View style={styles.bodyLeft}>

                                    <View style={styles.leftWrap}>
                                    <Text style={styles.transactionTitle}>
                                        {item.market}

                                    </Text>

                                    </View>
                                    <Text style={styles.transactionDate}>

                                        {dayjs.unix(item.Date).format('ddd, DD MMM YYYY hh:m A' )}
                                    </Text>
                                </View>

                                <View style={styles.bodyRight}>
                                    <Text style={[styles.transactionTitle,{
                                        color: Colors.success
                                    }]}>
                                        +{currencyFormatter('en-US','USD').format(item.profit)}

                                    </Text>
                                    <Text style={styles.transactionDate}>

                                        {item.price}
                                    </Text>
                                </View>

                            </Animated.View>
                        ))
                    }

                    </IF>

              {/*      <IF condition={tabIndex == 1}>


                    {  data?.data['Income distribution'] !== null &&
                        data?.data['Income distribution']?.slice(0,30).map((item,index)=>(
                            <Animated.View layout={Layout.easing(Easing.bounce).delay(10)}
                                  entering={FadeInDown.springify()} exiting={FadeOutDown} key={parseInt(item.profit) + index} style={[styles.transactionCard,{
                                marginVertical: pixelSizeVertical(5),
                                height: heightPixel(50),
                            }]}>




                                <View style={styles.bodyLeft}>
                                    <Text style={styles.transactionTitle}>
                                        {item.Market}
                                    </Text>

                                </View>

                                <View style={styles.bodyRight}>
                                    <Text style={[styles.transactionTitle,{
                                        color: Colors.success
                                    }]}>
                                        +{currencyFormatter('en-US','USD').format(item.profit)}
                                    </Text>

                                </View>

                            </Animated.View>
                        ))
                    }

                    </IF>*/}
                    <IF condition={tabIndex == 1}>


                    {  data?.data['futures_history'] !== null &&
                        data?.data['futures_history']?.slice(0,30).map((item,index)=>(
                            <Animated.View layout={Layout.easing(Easing.bounce).delay(10)}
                                  entering={FadeInDown.springify()} exiting={FadeOutDown} key={item.id} style={[styles.transactionCard,{
                                marginVertical: pixelSizeVertical(5),

                            }]}>




                                <View style={styles.bodyLeft}>

                                    <View style={styles.leftWrap}>
                                        <Text style={styles.transactionTitle}>
                                            {item.market}

                                        </Text>

                                    </View>
                                    <Text style={styles.transactionDate}>

                                        { item.Date ? dayjs.unix(item.Date).format('ddd, DD MMM YYYY hh:m A' ) : 'N/A'}
                                    </Text>
                                </View>

                                <View style={styles.bodyRight}>
                                    <Text style={[styles.transactionTitle,{
                                        color: Colors.success
                                    }]}>
                                        +{item.profit ? currencyFormatter('en-US','USD').format(item.profit) : '$0.00'}
                                    </Text>
                                    <Text style={styles.transactionDate}>

                                        {item.price}
                                    </Text>
                                </View>

                            </Animated.View>
                        ))
                    }

                    </IF>

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

    balanceGraph: {
        width: '90%',
        height: heightPixel(45),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',

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
    contentTop: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: heightPixel(50),
        borderBottomColor: Colors.borderColor,
        borderTopColor: Colors.borderColor,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        paddingHorizontal: pixelSizeHorizontal(15),
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

        fontSize: fontPixel(16),
        color: Colors.text
    },
    content: {
        flex: 1,
        width: '100%',

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
    leftWrap: {
        width: '100%',

        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    bodyRight: {
        width: '35%',
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
    topDetails: {
        paddingHorizontal: pixelSizeHorizontal(20),
        width: '100%',

        height: heightPixel(120),
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    interestGained: {
        marginTop: 20,
        width: '45%',

        height: heightPixel(80),
        alignItems: 'flex-start',

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


    balanceTitle: {


        paddingVertical: 0,
        paddingHorizontal: 0,
        borderRadius: 0,
        flexDirection: 'row',
        height: heightPixel(25),
    },
    balText: {
        fontFamily: Fonts.faktumMedium,
        color: Colors.lightText,
        fontSize: fontPixel(12),
        marginRight: 5,
    },
    balance: {
        color: Colors.text,
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(20),

    },
    balanceWrap: {
        width: '90%',
        height: heightPixel(50),
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    verticalLine:{
        width:1,
        height:'80%',
        backgroundColor:Colors.borderColor
    },
    tagWrap: {
        position:'absolute',
        backgroundColor: Colors.textDark,
        paddingHorizontal: 10,
        height: 20,
        right:50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    tagText: {
        color: Colors.pendingYellow,
        fontFamily: Fonts.faktumSemiBold,
        fontSize: fontPixel(10),
    },


})

export default RevenueScreen;
