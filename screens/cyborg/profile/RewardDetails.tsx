import React, {useCallback, useId, useState} from 'react';

import {Text, View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl} from 'react-native';
import HeaderWithTitle from "../../../components/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {Ionicons, Octicons} from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import {currencyFormatter, useRefreshOnFocus, wait} from "../../../helpers";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../../../helpers/normalize";
import {Fonts} from "../../../constants/Fonts";
import {useQuery} from "@tanstack/react-query";
import {getRevenues, getRewardDetails} from "../../../api";
import {useAppSelector} from "../../../app/hooks";
import {FlashList} from "@shopify/flash-list";
import dayjs from "dayjs";




interface RewardItem {
    item:{
        "Date": number,
        "Details": string,
        "Reward": string
    }
}


const RewardItem =({item}:RewardItem) =>{
    return(
        <View style={styles.transactionCard}>


            <View style={styles.circleTop}>


                <Octicons name="dot-fill" size={20} color={Colors.successChart}/>

            </View>

            <View style={styles.bodyLeft}>
                <Text style={styles.transactionTitle}>
                    {item.Details}
                </Text>
                <Text style={styles.transactionDate}>

                    {dayjs.unix(item.Date).format('ddd, DD MMM YYYY')}
                </Text>
            </View>

            <View style={styles.bodyRight}>
                <Text style={styles.transactionTitle}>
                    +{item.Reward}
                </Text>
                <Text style={styles.transactionDate}>

                    {dayjs.unix(item.Date).format('H:mm')}
                </Text>
            </View>

        </View>
    )
}

const RewardDetails = () => {

    const [refreshing, setRefreshing] = useState(false);

    const user = useAppSelector(state => state.user)
    const {User_Details} = user


    const {data,refetch,isLoading,isRefetching} = useQuery(['get-RewardDetails'],()=> getRewardDetails(User_Details.id))


    useRefreshOnFocus(refetch)



   const renderItem = useCallback(
        ({item}) => (
            <RewardItem item={item}/>
        ),
        [],
    );



    const keyExtractor = useCallback((item: { Date: string,Details:string }) => item.Date , [],);


    const  renderHeader= useCallback(() => (
        <>

            <View style={styles.balanceCanvas}>
                <View style={styles.balanceTop}>

                    <TouchableOpacity style={styles.balanceTitle}>
                        <Text style={styles.balText}>
                            Cumulative Reward (USDT)
                        </Text>

                        <Ionicons name="eye-off-outline" size={18} color={Colors.text}/>

                    </TouchableOpacity>

                    <View style={styles.balanceGraph}>

                        <Text
                            style={styles.balance}>

                            {currencyFormatter('en-US', 'USD').format(data?.data?.comulative_profit)}
                        </Text>

                    </View>
                    <Text style={styles.walletAddressTxt}>
                        <Text style={{color: data?.data?.today_profit > 0 ?Colors.success : Colors.errorRed}}>+${data?.data?.today_profit}</Text> Today’s reward
                    </Text>
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

                <View style={styles.contentMsgRight}>

                    <Text style={[styles.contentMsgTxt, {
                        fontFamily: Fonts.faktumMedium,
                        fontSize: fontPixel(14)
                    }]}>
                        View details
                    </Text>
                    <Ionicons name="chevron-forward" size={16} color={Colors.text}/>

                </View>
            </TouchableOpacity>

        </>
    ), [data]);


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


                <HeaderWithTitle title='Reward details'/>

                    <View style={styles.content}>




                        {
                            isLoading && <ActivityIndicator color={Colors.primary} size='small'/>
                        }
                        {
                            !isLoading && data &&
                            <FlashList
                                estimatedItemSize={200}
                                ListHeaderComponent={renderHeader}
                                refreshing={isLoading}
                                onRefresh={refetch}
                                scrollEnabled
                                showsVerticalScrollIndicator={false}
                                data={data.data.All}
                                renderItem={renderItem}
                                keyExtractor={keyExtractor}
estimatedListSize={{height:70,width:320}}
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
flex:1,
        width: '100%',

    },
    transactionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical:pixelSizeVertical(10),
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
        width: '30%',
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

})

export default RewardDetails;
