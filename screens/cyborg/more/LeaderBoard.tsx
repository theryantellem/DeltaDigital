import React, {SetStateAction, useState} from 'react';

import {Text, View, StyleSheet, Image, Platform} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import HeaderWithTitle from "../../../components/header/HeaderWithTitle";
import IOSSegmentContol from "../../../components/segment-control/IOSSegmentContol";
import Colors from "../../../constants/Colors";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../../../helpers/normalize";
import SegmentedControl from "../../../components/segment-control/SegmentContol";

import {Fonts} from "../../../constants/Fonts";
import {FontAwesome5, Ionicons, Octicons} from "@expo/vector-icons";
import {useQuery} from "@tanstack/react-query";
import {getCircleleaderboard, getLeaderboard} from "../../../api";
import {useAppSelector} from "../../../app/hooks";
import {useRefreshOnFocus} from "../../../helpers";
import PersonalIncome from "./reusables/PersonalIncome";
import {IF} from "../../../helpers/ConditionJsx";
import CircleOwner from "./reusables/CircleOwner";


interface props {
    item: {}
}

const Item = ({item}: props) => {
    return (
        <View style={styles.transactionCard}>


            <View style={styles.circleTop}>


                <Octicons name="dot-fill" size={25} color={Colors.successChart}/>

            </View>

            <View style={styles.bodyLeft}>
                <Text style={styles.transactionTitle}>
                    Libarvet
                </Text>
                <Text style={styles.transactionDate}>
                    #6
                </Text>
            </View>

            <View style={styles.bodyRight}>
                <Text style={styles.transactionTitle}>
                    2,350
                </Text>
                {/*  <Text style={styles.transactionDate}>
                            10:53 AM
                        </Text>*/}
            </View>

        </View>
    )
}

const LeaderBoard = () => {
    const user = useAppSelector(state => state.user)
    const {userData, User_Details} = user
    const [tabIndex, setTabIndex] = useState(0);
    const handleTabsChange = (index: SetStateAction<number>) => {
        setTabIndex(index);
        //  setScreen(index === 0 ? 'Banks' : 'Wallets')
    };

    // const {data,refetch} = useQuery(['user-Leaderboard'], ()=>getLeaderboard(User_Details.id))
    const {data: circleLeaderboard} = useQuery(['Circle-leaderboard'], () => getCircleleaderboard(userData.id))



    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#04074E', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >

                <HeaderWithTitle title='Leaderboard'/>

              {/*  {
                    Platform.OS === 'ios' ?

                        <IOSSegmentContol tabs={["Personal Income List", "Circle Owner Income List",]}
                                          currentIndex={tabIndex}
                                          onChange={handleTabsChange}
                                          segmentedControlBackgroundColor={'#7676801F'}
                                          activeSegmentBackgroundColor={"#fff"}
                                          activeTextColor={Colors.textDark}
                                          textColor={"#fff"}
                                          paddingVertical={pixelSizeVertical(12)}/>
                        :

                        <SegmentedControl tabs={["Personal Income List", "Circle Owner Income List",]}
                                          currentIndex={tabIndex}
                                          onChange={handleTabsChange}

                                          segmentedControlBackgroundColor={Colors.tintPrimary}
                                          activeSegmentBackgroundColor={Colors.primary}
                                          activeTextColor={Colors.textDark}
                                          textColor={"#CDD4D7"}
                                          paddingVertical={pixelSizeVertical(16)}/>
                }
*/}

                {/*      <View style={[styles.topDashboard]}>

                        <Animated.View
                            entering={FadeInLeft.springify()}
                            exiting={FadeOutLeft} layout={Layout.easing(Easing.ease).delay(20)}
                            style={[styles.leaderboardWrap, {
                                height: heightPixel(180),
                            }]}>

                            <View style={styles.rankWrap}>
                                <Text style={styles.rankText}>
                                    2
                                </Text>
                                <Ionicons name="caret-up" size={20} color={Colors.success}/>
                            </View>

                            <View style={[styles.leaderboard, styles.leaderboardOne]}>
                                <Image
                                    source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}}
                                    style={styles.streakImage}/>

                                <View style={[styles.leaderboardScore, {
                                    backgroundColor: Colors.purplePrimary,
                                }]}>
                                    <Text style={styles.streakText}>
                                        32999
                                    </Text>
                                </View>
                            </View>
                            <Text style={[styles.leaderboardText, {}]}>
                                Micheal
                            </Text>
                        </Animated.View>


                        <View

                            style={[styles.leaderboardWrap, {
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                height: heightPixel(220),
                                width: widthPixel(160)
                            }]}>
                            <Image source={require('../../assets/images/crownimage.png')} style={{
                            width: '90%',
                            height: 25,
                            resizeMode: 'contain'
                        }}/>
                            <View style={styles.rankWrap}>
                                <Text style={[styles.rankText, {
                                    marginBottom: 5,
                                }]}>
                                    1
                                </Text>
                                <FontAwesome5 name="crown" size={24} color={Colors.pendingYellow}/>
                            </View>
                            <Animated.View entering={FadeInDown.springify()}
                                           exiting={FadeOutDown} layout={Layout.easing(Easing.ease).delay(20)}
                                           style={[styles.leaderboard, styles.leaderboardCenter]}>
                                <Image
                                    source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}}
                                    style={styles.streakImage}/>

                                <View style={[styles.leaderboardScore, {
                                    backgroundColor: Colors.primary,
                                }]}>
                                    <Text style={styles.streakText}>
                                        44,345
                                    </Text>
                                </View>
                            </Animated.View>
                            <Text style={[styles.leaderboardText, {}]}>
                                OrjiAce
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
                                    3
                                </Text>
                                <Ionicons name="caret-down" size={20} color={Colors.primary}/>
                            </View>

                            <View style={[styles.leaderboard, styles.leaderboardOne]}>
                                <Image
                                    source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}}
                                    style={styles.streakImage}/>

                                <View style={[styles.leaderboardScore, {
                                    backgroundColor: Colors.purplePrimary,
                                }]}>
                                    <Text style={styles.streakText}>
                                        32999
                                    </Text>
                                </View>
                            </View>
                            <Text style={[styles.leaderboardText, {}]}>
                                Micheal
                            </Text>
                        </Animated.View>
                    </View>*/}

                    <PersonalIncome/>


              {/*  <IF condition={tabIndex == 1}>
                    <CircleOwner/>
                </IF>*/}

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


    content: {
        marginTop: 25,
        width: '100%',
        //  alignItems: 'center',
        // justifyContent: 'center',
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

        height: 30,
        width: 30,
        borderRadius: 30,
        backgroundColor: 'red',
        alignItems: 'flex-start',
        justifyContent: 'center'
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
        color: Colors.text
    },
    transactionDate: {
        height: heightPixel(20),
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumRegular,
        color: Colors.tintText
    },


    topDashboard: {
        marginTop: 20,
        height: heightPixel(230),
        width: '90%',
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
        fontSize: fontPixel(14)
    },
    leaderboardText: {
        textTransform: 'capitalize',
        color: Colors.text,
        fontFamily: Fonts.faktumSemiBold,
        fontSize: fontPixel(16)
    },

})

export default LeaderBoard;
