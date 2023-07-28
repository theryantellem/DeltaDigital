import React, {useState} from 'react';

import {Text, View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl} from 'react-native';
import HeaderWithTitle from "../../../components/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {RootStackScreenProps} from "../../../types";
import Colors from "../../../constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../../../helpers/normalize";
import {Fonts} from "../../../constants/Fonts";
import HorizontalLine from "../../../components/HorizontalLine";
import {useQuery} from "@tanstack/react-query";
import {getRevenues} from "../../../api";
import {useAppSelector} from "../../../app/hooks";
import {useRefreshOnFocus, wait} from "../../../helpers";

const Earnings = ({}: RootStackScreenProps<'Earnings'>) => {


    const [refreshing, setRefreshing] = useState(false);
    const user = useAppSelector(state => state.user)
    const {User_Details} = user
    const {data:revenues,refetch,isLoading} = useQuery(['user-Revenues'],()=> getRevenues(User_Details.id))



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


                <HeaderWithTitle title='Earnings'/>
                <ScrollView style={{
                    width: '100%'
                }} contentContainerStyle={styles.scrollView} scrollEnabled
                            showsVerticalScrollIndicator={false}

                            refreshControl={<RefreshControl tintColor={Colors.text} refreshing={refreshing}
                                                            onRefresh={refresh}/>}
                >

                    <View style={styles.planInfo}>
                        <Text style={styles.planTitle}>
                            Quantitative Investment
                        </Text>

                    </View>

                    {
                        isLoading  && <ActivityIndicator color={Colors.primary} size='small'/>
                    }

                    {
                        !isLoading && revenues && revenues?.data
                         &&
                    <View style={styles.topDetails}>
                        <View style={styles.interestGained}>


                            <TouchableOpacity activeOpacity={0.7}
                                              style={[styles.balanceTitle, {
                                                  justifyContent: 'flex-start',

                                              }]}>
                                <Text style={styles.balText}>
                                    Activate total profit
                                </Text>



                            </TouchableOpacity>

                            <View style={styles.balanceWrap}>


                                <View>
                                    <Text style={[styles.balance, {}]}>

                                        ${revenues?.data["Activate total profit"]}
                                    </Text>

                                </View>

                                <Text style={styles.walletAddressTxt}>
                                    Counted every hour
                                </Text>

                            </View>

                        </View>

                        <View style={styles.currentBalanceContainer}>

                            <TouchableOpacity activeOpacity={0.7} style={[styles.balanceTitle, {
                                justifyContent: 'flex-end',
                            }]}>
                                <Text style={styles.balText}>
                                    Activate profit today
                                </Text>




                            </TouchableOpacity>

                            <View style={[styles.balanceWrap,{
                                alignItems: 'flex-end',
                            }]}>


                                <Text style={[styles.balance, {color: Colors.success}]}>
                                    ${revenues?.data["Activate profit today"]}
                                </Text>

                                <Text style={styles.walletAddressTxt}>
                                    Counted every hour
                                </Text>

                            </View>

                        </View>


                    </View>
                    }
                    <HorizontalLine/>

                    <View style={styles.planInfo}>
                        <Text style={styles.planTitle}>
                            Direct earnings
                        </Text>

                    </View>

                    {
                        !isLoading && revenues && revenues?.data
                        &&
                    <View style={styles.topDetails}>
                        <View style={styles.interestGained}>


                            <TouchableOpacity activeOpacity={0.7}
                                              style={[styles.balanceTitle, {
                                                  justifyContent: 'flex-start',

                                              }]}>
                                <Text style={styles.balText}>
                                    Direct earning activated
                                </Text>



                            </TouchableOpacity>

                            <View style={styles.balanceWrap}>


                                <View>
                                    <Text style={[styles.balance, {color: Colors.success}]}>
                                        ${revenues?.data["Direct activated"]}
                                    </Text>

                                </View>

                                <Text style={styles.walletAddressTxt}>
                                    Counted every hour
                                </Text>

                            </View>

                        </View>

                        <View style={styles.currentBalanceContainer}>

                            <TouchableOpacity activeOpacity={0.7} style={[styles.balanceTitle, {
                                justifyContent: 'flex-end',

                            }]}>
                                <Text style={styles.balText}>
                                     Not activated
                                </Text>




                            </TouchableOpacity>

                            <View style={[[styles.balanceWrap,{
                                alignItems: 'flex-end',
                            }]]}>


                                <Text style={[styles.balance, ]}>
                                    ${revenues?.data["Direct not activated"]}
                                </Text>

                                <Text style={styles.walletAddressTxt}>
                                    Counted every hour
                                </Text>

                            </View>

                        </View>


                    </View>
                    }

                    <HorizontalLine/>
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
        fontSize: fontPixel(14),
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
    walletAddressTxt: {

        color: "#CCCCCC",
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(12)
    },
    planInfo: {
        width: '100%',
        paddingHorizontal: pixelSizeHorizontal(20),
 marginVertical:pixelSizeVertical(15),
        alignItems: 'flex-start',
        justifyContent: 'flex-start',

    },
    planTitle: {
        color: "#fff",
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumBold
    },
})

export default Earnings;
