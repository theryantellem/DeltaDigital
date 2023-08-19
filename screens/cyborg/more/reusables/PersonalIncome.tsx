import React, {useCallback, useState} from 'react';

import {Text, View, StyleSheet, Image, FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import Animated, {Easing, FadeInDown, FadeInLeft, FadeOutDown, FadeOutLeft, Layout} from "react-native-reanimated";
import {
    fontPixel,
    heightPixel,
    pixelSizeHorizontal,
    pixelSizeVertical,
    widthPixel
} from "../../../../helpers/normalize";
import {FontAwesome5, Ionicons, Octicons} from "@expo/vector-icons";
import Colors from "../../../../constants/Colors";
import {Fonts} from "../../../../constants/Fonts";
import {useQuery} from "@tanstack/react-query";
import {getLeaderboard} from "../../../../api";
import {useAppSelector} from "../../../../app/hooks";
import {useRefreshOnFocus, wait} from "../../../../helpers";
import {FlashList} from "@shopify/flash-list";


interface props {
    item: {
        idcard: string,
        reward_total: string,
        level: string,
        username: string,
    }
}


const LeaderboardItem = ({item}: props) => {
    return (
        <View style={styles.transactionCard}>


            <View style={styles.circleTop}>


                <Image
                    source={{uri: item.idcard ? item.idcard : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}}
                    style={styles.idcard}/>

            </View>

            <View style={styles.bodyLeft}>
                <Text style={styles.transactionTitle}>
                    {item.username}
                </Text>
                <Text style={styles.transactionDate}>
                    #{item.level}
                </Text>
            </View>

            <View style={styles.bodyRight}>
                <Text style={styles.transactionTitle}>
                    {item.reward_total}
                </Text>
                {/*  <Text style={styles.transactionDate}>
                            10:53 AM
                        </Text>*/}
            </View>

        </View>
    )
}
const PersonalIncome = () => {

    const user = useAppSelector(state => state.user)
    const {User_Details} = user

    const {
        data,
        isLoading,
        refetch,
        isRefetching
    } = useQuery(['user-leaderboard'], () => getLeaderboard(User_Details.id))
    const keyExtractor = useCallback((item: { id: string }) => item.id, [],);

    const [refreshing, setRefreshing] = useState(false);
    useRefreshOnFocus(refetch)

   // console.log("*********************DATA******************")
   // console.log(data.data['Personal Income List'].slice(0,2))

    const renderHeader = useCallback(() => (
        <View style={[styles.topDashboard]}>

            <Animated.View
                entering={FadeInLeft.springify()}
                exiting={FadeOutLeft} layout={Layout.easing(Easing.ease).delay(20)}
                style={[styles.leaderboardWrap, {
                    height: heightPixel(180),
                }]}>

                <View style={styles.rankWrap}>
                    <Text style={styles.rankText}>

                        {data.data['Personal Income List'][0].level}
                    </Text>
                    <Ionicons name="caret-up" size={20} color={Colors.success}/>
                </View>

                <View style={[styles.leaderboard, styles.leaderboardOne]}>

                    <Image
                        source={{uri: data.data['Personal Income List'][0].idcard ?  'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' :  data.data['Personal Income List'][0].idcard}}
                        style={styles.streakImage}/>

                    <View style={[styles.leaderboardScore, {
                        backgroundColor: Colors.purplePrimary,
                    }]}>
                        <Text style={styles.streakText}>
                            {data.data['Personal Income List'][0].reward_total}
                        </Text>
                    </View>
                </View>
                <Text style={[styles.leaderboardText, {}]}>
                    {data.data['Personal Income List'][0].username}
                </Text>
            </Animated.View>


            <View

                style={[styles.leaderboardWrap, {
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: heightPixel(220),
                    width: widthPixel(160)
                }]}>
                {/*<Image source={require('../../assets/images/crownimage.png')} style={{
                            width: '90%',
                            height: 25,
                            resizeMode: 'contain'
                        }}/>*/}
                <View style={styles.rankWrap}>
                    <Text style={[styles.rankText, {
                        marginBottom: 5,
                    }]}>
                        {data.data['Personal Income List'][1].level}
                    </Text>
                    <FontAwesome5 name="crown" size={24} color={Colors.pendingYellow}/>
                </View>
                <Animated.View entering={FadeInDown.springify()}
                               exiting={FadeOutDown} layout={Layout.easing(Easing.ease).delay(20)}
                               style={[styles.leaderboard, styles.leaderboardCenter]}>

                    <Image
                        source={{uri: data.data['Personal Income List'][1].idcard ?  'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' :  data.data['Personal Income List'][0].idcard}}
                        style={styles.streakImage}/>


                    <View style={[styles.leaderboardScore, {
                        backgroundColor: Colors.primary,
                    }]}>
                        <Text style={styles.streakText}>

                            {data.data['Personal Income List'][1].reward_total}
                        </Text>
                    </View>
                </Animated.View>
                <Text style={[styles.leaderboardText, {}]}>

                    {data.data['Personal Income List'][1].username}
                </Text>
            </View>


            <Animated.View
                entering={FadeInLeft.springify()}
                exiting={FadeOutLeft} layout={Layout.easing(Easing.ease).delay(20)}
                style={[styles.leaderboardWrap, {
                    height: heightPixel(180),
                }]}>

                <View style={styles.rankWrap}>
                    <Text style={styles.rankText}>
                        {data.data['Personal Income List'][2].level}
                    </Text>
                    <Ionicons name="caret-down" size={20} color={Colors.primary}/>
                </View>

                <View style={[styles.leaderboard, styles.leaderboardOne]}>

                    <Image
                        source={{uri: data.data['Personal Income List'][2].idcard ?  'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' :  data.data['Personal Income List'][0].idcard}}
                        style={styles.streakImage}/>


                    <View style={[styles.leaderboardScore, {
                        backgroundColor: Colors.purplePrimary,
                    }]}>
                        <Text style={styles.streakText}>
                            {data.data['Personal Income List'][2].reward_total}
                        </Text>
                    </View>
                </View>
                <Text style={[styles.leaderboardText, {}]}>
                    {data.data['Personal Income List'][2].username}
                </Text>
            </Animated.View>
        </View>
    ), []);


    const renderItem = useCallback(({item}) => (
        <LeaderboardItem item={item}/>
    ), [])


    const refresh = () => {
        setRefreshing(true)
        refetch()
        wait(2000).then(() => setRefreshing(false));
    }


    return (


        <View style={styles.listContainer}>
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
                    data={data.data['Personal Income List']}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    onEndReachedThreshold={0.3}
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.text}
                            refreshing={refreshing}
                            onRefresh={refresh}
                        />
                    }
                    ListFooterComponent={isRefetching ?
                        <ActivityIndicator size="small" color={Colors.primary}/> : null}

                />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,

        //  paddingHorizontal: pixelSizeHorizontal(20),

        width: '100%',

    },
    topDashboard: {
        marginVertical: 30,

        height: heightPixel(230),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
    },
    leaderboardWrap: {

        alignItems: 'center',
        justifyContent: 'space-between',
        width: widthPixel(110)
    },
    rankWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
    },
    rankText: {
        color: "#fff",
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(14)
    },
    leaderboard: {

        alignItems: 'center',
        justifyContent: 'center'
    },
    leaderboardCenter: {
        height: 120,
        width: 120,
        borderRadius: 120,
        borderWidth: 3,
        borderColor: Colors.primary,
    },
    leaderboardOne: {

        height: 80,
        width: 80,
        borderRadius: 120,
        borderWidth: 3,
        borderColor: Colors.purplePrimary,
    },
    streakImage: {
        resizeMode: 'cover',
        height: "100%",
        width: '100%',
        borderRadius: 120,

    },
    leaderboardScore: {
        position: 'absolute',
        bottom: -10,
        borderRadius: 30,
        paddingHorizontal: pixelSizeHorizontal(10),
        minWidth: widthPixel(16),
        height: heightPixel(20),
        alignItems: 'center',

        justifyContent: 'center',
    },
    streakText: {

        color: "#fff",
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(12)
    },
    leaderboardText: {
        textTransform: 'capitalize',
        color: Colors.text,
        fontFamily: Fonts.faktumSemiBold,
        fontSize: fontPixel(14)
    },


    circleTop: {

        height: 30,
        width: 30,
        borderRadius: 30,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    idcard: {
        width: '100%',
        height: '100%',
        borderRadius: 30,
    },

    bodyLeft: {
        width: '55%',
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
        color: Colors.text,
        textTransform: 'capitalize'
    },
    transactionDate: {
        height: heightPixel(20),
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumRegular,
        color: Colors.tintText
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
})

export default PersonalIncome;
