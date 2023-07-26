import React from 'react';

import {Text, View, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import HeaderWithTitle from "../../../components/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import Colors from "../../../constants/Colors";
import {fontPixel, heightPixel, pixelSizeVertical, widthPixel} from "../../../helpers/normalize";
import {Fonts} from "../../../constants/Fonts";
import {useQuery} from "@tanstack/react-query";
import {getUser} from "../../../api";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {RootStackScreenProps} from "../../../types";
import {useRefreshOnFocus} from "../../../helpers";
import {Octicons} from "@expo/vector-icons";

const ApiBinding = ({navigation}:RootStackScreenProps<'ApiBinding'>) => {


    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)
    const {userData,User_Details} = user

    const {data, isRefetching, refetch,} = useQuery(
        [`user-data`,User_Details.id],
        () => getUser(User_Details.id),
        {

        })

useRefreshOnFocus(refetch)

    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#04074E', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >


                <HeaderWithTitle title='API Binding'/>
                <ScrollView style={{
                    width: '100%'
                }} contentContainerStyle={styles.scrollView} scrollEnabled
                            showsVerticalScrollIndicator={false}>

                    <View style={styles.content}>
                    <View style={styles.appListCard}>
                        <View style={styles.listTop}>
                            <View style={styles.listTopLeft}>
                                <View style={styles.appIconWrap}>
                                    <Image source={{uri: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0'}} style={styles.logo}/>
                                </View>
                                <Text style={[styles.appText, {
                                    color: Colors.text
                                }]}>
                                    Coinbase
                                </Text>
                            </View>
                            <TouchableOpacity  activeOpacity={0.8}
                                              style={styles.connectBtn}>

                                {
                                    data.data["User Details"][0].coinbaseprobind == '1'
                                ?
                                <Text style={[styles.appText, {
                                    color: Colors.primary
                                }]}>
                                    Unbound
                                </Text>
:
                                        <Text style={[styles.appText, {
                                            color: Colors.success
                                        }]}>
                                            Bind
                                        </Text>

                                }
                                <Octicons name="chevron-right" size={14} color="#ccc" />

                            </TouchableOpacity>
                        </View>
                    </View>



                        <View style={styles.appListCard}>
                            <View style={styles.listTop}>
                                <View style={styles.listTopLeft}>
                                    <View style={styles.appIconWrap}>
                                        <Image source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/1200px-Binance_Logo.svg.png'}} style={styles.logo}/>
                                    </View>
                                    <Text style={[styles.appText, {
                                        color: Colors.text
                                    }]}>
                                        Binance
                                    </Text>
                                </View>
                                <TouchableOpacity  activeOpacity={0.8}
                                                   style={styles.connectBtn}>

                                    {
                                        data.data["User Details"][0].binancebind == '1'
                                            ?
                                            <Text style={[styles.appText, {
                                                color: Colors.primary
                                            }]}>
                                                Unbound
                                            </Text>
                                            :
                                            <Text style={[styles.appText, {
                                                color: Colors.success
                                            }]}>
                                                Bind
                                            </Text>

                                    }
                                    <Octicons name="chevron-right" size={14} color="#ccc" />

                                </TouchableOpacity>
                            </View>
                        </View>





                        <View style={styles.appListCard}>
                            <View style={styles.listTop}>
                                <View style={styles.listTopLeft}>
                                    <View style={styles.appIconWrap}>
                                        <Image source={{uri: 'https://static-00.iconduck.com/assets.00/kraken-icon-512x512-icmwhmh8.png'}} style={styles.logo}/>
                                    </View>
                                    <Text style={[styles.appText, {
                                        color: Colors.text
                                    }]}>
                                        Kraken
                                    </Text>
                                </View>
                                <TouchableOpacity  activeOpacity={0.8}
                                                   style={styles.connectBtn}>

                                    {
                                        data.data["User Details"][0].krakenbind == '1'
                                            ?
                                            <Text style={[styles.appText, {
                                                color: Colors.primary
                                            }]}>
                                                Unbound
                                            </Text>
                                            :
                                            <Text style={[styles.appText, {
                                                color: Colors.success
                                            }]}>
                                                Bind
                                            </Text>

                                    }
                                    <Octicons name="chevron-right" size={14} color="#ccc" />

                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.appListCard}>
                            <View style={styles.listTop}>
                                <View style={styles.listTopLeft}>
                                    <View style={styles.appIconWrap}>
                                        <Image source={{uri: 'https://assets.staticimg.com/cms/media/3gfl2DgVUqjJ8FnkC7QxhvPmXmPgpt42FrAqklVMr.png'}} style={styles.logo}/>
                                    </View>
                                    <Text style={[styles.appText, {
                                        color: Colors.text
                                    }]}>
                                        Kucoin
                                    </Text>
                                </View>
                                <TouchableOpacity  activeOpacity={0.8}
                                                   style={styles.connectBtn}>

                                    {
                                        data.data["User Details"][0].krakenbind == '1'
                                            ?
                                            <Text style={[styles.appText, {
                                                color: Colors.primary
                                            }]}>
                                                Unbound
                                            </Text>
                                            :
                                            <Text style={[styles.appText, {
                                                color: Colors.success
                                            }]}>
                                                Bind
                                            </Text>

                                    }
                                    <Octicons name="chevron-right" size={14} color="#ccc" />

                                </TouchableOpacity>
                            </View>
                        </View>


                    </View>
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
    appListCard: {

        width: '90%',
        borderBottomColor: Colors.borderColor,
        borderBottomWidth: 1,
        paddingVertical: pixelSizeVertical(12),
        minHeight: heightPixel(60),
        alignItems: 'center'
    },
    listTop: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',

        justifyContent: 'space-between',
        height: heightPixel(60)
    },
    listTopLeft: {
        width: '60%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
    },
    appIconWrap: {
        marginRight: 8,
        width: 40,
        height: 40,
        borderRadius: 60,
        backgroundColor: Colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    appText: {

        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumSemiBold
    },
    listBody: {
        width: '100%',
        paddingVertical: pixelSizeVertical(5)
    },
    listBodyText: {
        color: "#6B7280",
        fontSize: fontPixel(14),

        fontFamily: Fonts.faktumRegular
    },
    connectBtn:{
        height:'100%',
        width:widthPixel(90),
        justifyContent:'space-evenly',
        alignItems:'center',
      flexDirection:'row'
    },
    content: {

        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        borderRadius:20,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',

    },
})

export default ApiBinding;
