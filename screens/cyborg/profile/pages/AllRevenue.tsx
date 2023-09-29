import React, {SetStateAction, useCallback, useId, useState} from 'react';

import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
    Platform
} from 'react-native';
import HeaderWithTitle from "../../../../components/cyborg/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {Feather, Ionicons, Octicons} from "@expo/vector-icons";
import Colors from "../../../../constants/Colors";
import {currencyFormatter, useRefreshOnFocus, wait} from "../../../../helpers";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../../../../helpers/normalize";
import {Fonts} from "../../../../constants/Fonts";
import {useQuery} from "@tanstack/react-query";
import {getRevenueDetails, getRevenues, getRewardDetails} from "../../../../api";
import {useAppSelector} from "../../../../app/hooks";
import {FlashList} from "@shopify/flash-list";
import dayjs from "dayjs";
import IOSSegmentContol from "../../../../components/segment-control/IOSSegmentContol";
import SegmentedControl from "../../../../components/segment-control/SegmentContol";
import {IF} from "../../../../helpers/ConditionJsx";
import Animated, {
    Easing, FadeInDown,
    FadeInLeft,
    FadeInUp,
    FadeOutDown,
    FadeOutLeft,
    FadeOutUp,
    Layout
} from "react-native-reanimated";


interface RewardItem {
    item: {
        "Date": string,
        "market_type": string,
        "market": string,
        "profit": string,
        "buysell": string,
        "price": string,
        "Market": string,
    }
}


const RewardItem = ({item}: RewardItem) => {

    return (
        <Animated.View id={item.Date} layout={Layout.easing(Easing.bounce).delay(10)}
              entering={FadeInDown.springify()} exiting={FadeOutDown}  style={styles.transactionCard}>




            <View style={styles.bodyLeft}>
                <View style={styles.leftWrap}>
                <Text style={styles.transactionTitle}>
                    {item.market}
                </Text>
                <View style={styles.tagWrap}>

                    {
                        item.market_type == '1' ?<Text style={styles.tagText}>
                                Futures
                            </Text>
                            :
                            <Text style={styles.tagText}>
                                Spot
                            </Text>
                    }
                </View>
                </View>

                <Text style={styles.transactionDate}>

                    {dayjs.unix(item.Date).format('ddd, DD MMM YYYY')}
                </Text>
            </View>

            <View style={styles.bodyRight}>
                <Text style={[styles.transactionTitle,{
                    color: Colors.success
                }]}>
                    +{item.profit}
                </Text>
                <Text style={styles.transactionDate}>

                    {item.price}
                </Text>
            </View>

        </Animated.View>
    )
}
const RewardItemIncome = ({item}: RewardItem) => {

    return (
        <Animated.View id={item.Market} layout={Layout.easing(Easing.bounce).delay(10)}
              entering={FadeInDown.springify()} exiting={FadeOutDown}  style={[styles.transactionCard,{
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
    )
}

const AllRevenue = () => {

    const [refreshing, setRefreshing] = useState(false);

    const user = useAppSelector(state => state.user)
    const {User_Details} = user


    const [tabIndex, setTabIndex] = useState(0);
    const handleTabsChange = (index: SetStateAction<number>) => {
        setTabIndex(index);
        //  setScreen(index === 0 ? 'Banks' : 'Wallets')
    };

    const {
        data,
        refetch,
        isLoading,
        isRefetching
    } = useQuery(['get-RevenueDetails',User_Details.id], () => getRevenueDetails(User_Details.id))

//console.log(data)

    useRefreshOnFocus(refetch)


    const renderItem = useCallback(
        ({item}) => (
            <RewardItem item={item}/>
        ),
        [],
    );
 const renderItemIncome = useCallback(
        ({item}) => (
            <RewardItemIncome item={item}/>
        ),
        [],
    );


    const keyExtractor = useCallback((item: { Date: string, profit: string }) => item.Date, [],);
    const keyExtractorIncome = useCallback((item: {  profit: string },index) => item.profit + index, [],);



    const refresh = () => {
        setRefreshing(true)
        refetch()
        wait(2000).then(() => setRefreshing(false));
    }


    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#04074E', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >


                <HeaderWithTitle title='Revenue details'/>



                   {
                       Platform.OS === 'ios' ?

                           <IOSSegmentContol tabs={["History Record", "Income Distribution"]}
                                             currentIndex={tabIndex}
                                             onChange={handleTabsChange}
                                             segmentedControlBackgroundColor={'#7676801F'}
                                             activeSegmentBackgroundColor={"#fff"}
                                             activeTextColor={Colors.textDark}
                                             textColor={"#fff"}
                                             paddingVertical={pixelSizeVertical(12)}/>
                           :

                           <SegmentedControl tabs={["History Record", "Income Distribution"]}
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
                <View style={styles.content}>

                    {

                        !isLoading && data && data?.data['History Records'] !== null &&
                        <FlashList
                            estimatedItemSize={200}

                            refreshing={isLoading}
                            onRefresh={refetch}
                            scrollEnabled
                            showsVerticalScrollIndicator={false}
                            data={data?.data['History Records']}
                            renderItem={renderItem}
                            keyExtractor={keyExtractor}
                            estimatedListSize={{height: 70, width: 320}}
                            refreshControl={
                                <RefreshControl
                                    tintColor={Colors.text}
                                    refreshing={refreshing}
                                    onRefresh={refresh}
                                />
                            }


                        />
                    }


                </View>

                </IF>

                <IF condition={tabIndex == 1}>
                <View style={styles.content}>

                    {
                        !isLoading && data &&
                        data?.data['Income distribution'] !== null &&
                        <FlashList
                            estimatedItemSize={200}

                            refreshing={isLoading}
                            onRefresh={refetch}
                            scrollEnabled
                            showsVerticalScrollIndicator={false}
                            data={data?.data['Income distribution']}
                            renderItem={renderItemIncome}
                            keyExtractor={keyExtractorIncome}
                            estimatedListSize={{height: 70, width: 320}}
                            refreshControl={
                                <RefreshControl
                                    tintColor={Colors.text}
                                    refreshing={refreshing}
                                    onRefresh={refresh}
                                />
                            }


                        />
                    }


                </View>

                </IF>

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
        width: widthPixel(90),
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
    bodyRight: {
        width: '35%',
        height: '80%',

        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
    },
    transactionTitle: {
       // backgroundColor:'red',
       // width:'60%',
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
    leftWrap: {
        width: '100%',

        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

})

export default AllRevenue;
