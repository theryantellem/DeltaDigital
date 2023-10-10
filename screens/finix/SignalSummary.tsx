import React, {useCallback, useEffect, useState} from 'react';

import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Pressable,
    Image,
    ActivityIndicator, FlatList, RefreshControl
} from 'react-native';
import HeaderWithTitle from "../../components/cyborg/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {SignalRootTabScreenProps, SignalStackScreenProps} from "../../types";
import {Entypo, Feather, Ionicons} from "@expo/vector-icons";
import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../../helpers/normalize";
import Colors from "../../constants/Colors";
import {Fonts} from "../../constants/Fonts";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {getSignals, getSignalsTest} from "../../api/finix-api";
import {useRefreshOnFocus, wait} from "../../helpers";
import {useAppSelector} from "../../app/hooks";


interface Props {

    viewSignal: (signal: {}) => void
    viewSignalImage: (item: {}) => void
    item: {
        "id": string,
        "educator": {
            "id": string,
            "first_name": string,
            "last_name": string,
            "email": string,
            "photo": string,
            "total_followers": number
        },
        "asset": {
            "id": number,
            "image": string,
            "name": string,
            "symbol": string
        },
        category: {
            name: string,
            type: string
        },
        "order_type": string,
        "entry_price": number,
        "stop_loss": number,
        "target_price": number,
        "comment": string,
        "photo": string,
        "chart_photo": string,
        "market_status": string,
        "status": string
        "percentage": string
    }
}


const ItemSignal = ({item, viewSignal, viewSignalImage}: Props) => {


    const viewItemSignal = (signal) => {
        if (item.category.type == 'news') {
            viewSignalImage(signal)

        } else {
            viewSignal(signal)
        }
    }

    return (

        <TouchableOpacity onPress={() => viewItemSignal(item)} activeOpacity={0.8} style={styles.signalCard}>

            {item.category.type !== 'news' ?
                <>

                    <View style={styles.signalCardValueWrap}>
                        <Text style={styles.signalCardValue}>
                            {item.asset.symbol}
                        </Text>
                    </View>

                    <View style={styles.signalCardValueWrap}>
                        <Text style={styles.signalCardValue}>
                            {item.asset.name}
                        </Text>
                    </View>

                    <View style={styles.signalCardValueWrap}>
                        <Text style={styles.signalCardValue}>
                            {item.status}
                        </Text>
                    </View>
                    <View style={styles.signalCardValueWrap}>
                        <Text style={styles.signalCardValue}>
                            {item.percentage}
                        </Text>
                    </View>


                    <View style={styles.signalCardValueWrap}>

                        <TouchableOpacity onPress={() => viewSignal(item)} style={styles.signalViewBtn}>
                            <Text style={styles.viewText}>
                                View
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
                :
                <>

                    <View style={styles.signalCardValueWrap}>
                        <Text style={[styles.signalCardValue, {
                            textTransform: 'capitalize'
                        }]}>
                            {item.category.type}
                        </Text>
                    </View>
                    <View style={styles.signalCardValueWrap}>
                        <Text style={styles.signalCardValue}>
                            {item.category.name}
                        </Text>
                    </View>

                    <View style={styles.signalCardValueWrap}>
                        {/*   <Text style={styles.signalCardValue}>
                            {item.status}
                        </Text>*/}
                    </View>
                    <View style={styles.signalCardValueWrap}>
                        {/*  <Text style={styles.signalCardValue}>
                            {item.percentage}
                        </Text>*/}
                    </View>


                    <View style={styles.signalCardValueWrap}>

                        <TouchableOpacity onPress={() => viewItemSignal(item)} style={styles.signalViewBtn}>
                            <Text style={styles.viewText}>
                                View
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            }


        </TouchableOpacity>

    )
}


const SignalSummary = ({navigation}: SignalStackScreenProps<'SignalSummary'>) => {

    const user = useAppSelector(state => state.user)
    const {User_Details, userData} = user
    const [page, setPage] = useState(1);
    const {data, isLoading, refetch, isRefetching} = useInfiniteQuery(['get-all-user-Signals'],
        ({pageParam = 1}) => getSignalsTest.signals({page: page}), {})

    const [refreshing, setRefreshing] = useState(false);
    const keyExtractor = useCallback((item: { id: any; }) => item.id, [],)


    const viewSignal = (details: {
        "id": string,
        "educator": {
            "id": string,
            "first_name": string,
            last_name: string,
            "email": string,
            "photo": string,
            "total_followers": number
        },
        "asset": {
            "id": number,
            "image": string,
            "name": string,
            "symbol": string
        },
        "order_type": string,
        "entry_price": number,
        "stop_loss": number,
        "target_price": number,
        "comment": string,
        "photo": string,
        "chart_photo": string,
        "market_status": string,
        "status": string,
        "percentage": string
    }) => {
        navigation.navigate('MainSignalNav', {
            screen: 'SignalDetails', params: {details: details}

        })
    }


    const viewSignalImage = (details) => {
        navigation.navigate('MainSignalNav', {
            screen: 'SignalImageDetails', params: {details}

        })
    }

    const renderItem = useCallback(
        ({item}) => <ItemSignal viewSignalImage={viewSignalImage} item={item} viewSignal={viewSignal}/>,
        [],
    );


    const goBackNav = () => {
        navigation.goBack()
    }
    const refresh = () => {
        setRefreshing(true)
        refetch()
        wait(2000).then(() => setRefreshing(false));
    }

    useRefreshOnFocus(refetch)

    const nextPage = () => {

        setPage(page + 1)

    }

    const prevPage = () => {

        setPage(page - 1)

    }
    useEffect(() => {
        refresh()
    }, [page]);


    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={require('../../assets/images/signal/signal_BG.png')}
                             resizeMode={'cover'}
                             style={styles.dashboardImage}>
                <View style={styles.topBar}>
                    <TouchableOpacity style={[styles.backBtn, {
                        //backgroundColor: '#030D34',
                    }]} onPress={goBackNav}>
                        <Ionicons name="md-chevron-back" color={"#131313"} size={heightPixel(24)}/>

                    </TouchableOpacity>

                    <Pressable style={[styles.titleWrap, {}]}>
                        <View style={[]}>


                            <Text style={styles.title}>
                                Signals Summary
                            </Text>
                        </View>
                    </Pressable>


                    <TouchableOpacity style={styles.rightBtn}>

                    </TouchableOpacity>


                </View>


                <ImageBackground source={require('../../assets/images/signal/streamer_BG.png')}
                                 resizeMode={'cover'}
                                 style={styles.flatList}>
                    <View style={styles.listHead}>

                        <View style={styles.signalCardValueWrap}>
                            <Text style={styles.listHeadText}>
                                Asset
                            </Text>
                        </View>
                        <View style={styles.signalCardValueWrap}>
                            <Text style={styles.listHeadText}>
                                Name
                            </Text>
                        </View>

                        <View style={styles.signalCardValueWrap}>
                            <Text style={styles.listHeadText}>
                                Status
                            </Text>
                        </View>

                        <View style={styles.signalCardValueWrap}>
                            <Text style={styles.listHeadText}>
                                %
                            </Text>
                        </View>

                        <View style={styles.signalCardValueWrap}>

                        </View>
                    </View>

                    {!isLoading && data && data?.pages[0]?.data?.length < 1 &&
                        <View style={styles.messageWrap}>


                            <View style={styles.imageWrap}>

                                <Image source={require('../../assets/images/EmptyBox/empty_state.png')}
                                       style={styles.fileBroken}/>


                            </View>


                            <Text style={styles.message}>
                                Signal list is empty

                            </Text>
                        </View>
                    }
                    {
                        isLoading && <ActivityIndicator color={Colors.primary} size='small'/>
                    }
                    {
                        !isLoading && data && data?.pages[0]?.data?.length > 0 &&
                        <FlatList
                            data={data?.pages[0].data}
                            keyExtractor={keyExtractor}
                            pagingEnabled
                            scrollEnabled
                            snapToAlignment="center"
                            scrollEventThrottle={16}
                            decelerationRate={"fast"}
                            showsHorizontalScrollIndicator={false}
                            renderItem={renderItem}
                            refreshControl={
                                <RefreshControl
                                    tintColor={Colors.text}
                                    refreshing={refreshing}
                                    onRefresh={refresh}
                                />
                            }
                        />
                    }


                    <View style={styles.paginationContainer}>
                        <TouchableOpacity onPress={prevPage} disabled={page == 1} activeOpacity={0.7}
                                          style={[styles.pagingButton,
                                              page == 1 && {
                                                  backgroundColor: Colors.borderColor
                                              }]}>
                            <Entypo name="chevron-left" size={24} color="black"/>
                        </TouchableOpacity>


                        <TouchableOpacity disabled={data?.pages[0]?.data.length < 1} onPress={nextPage}
                                          activeOpacity={0.7} style={[styles.pagingButton,
                            data?.pages[0]?.data.length < 1 && {
                                backgroundColor: Colors.borderColor
                            }]}>
                            <Entypo name="chevron-right" size={24} color="black"/>
                        </TouchableOpacity>

                    </View>
                </ImageBackground>


            </ImageBackground>
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

    scrollView: {
        width: '100%',
        alignItems: "center",
        paddingHorizontal: 20,
    },
    topBar: {
        height: heightPixel(80),
        width: '100%',
        paddingHorizontal: pixelSizeHorizontal(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // borderBottomColor: "#E5E7EB",
        // borderBottomWidth: 1,
    },
    rightBtn: {
        width: '20%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        color: Colors.textDark,
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumSemiBold
    },
    titleWrap: {
        width: '52%',

        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    backBtn: {
        width: '20%',
        height: 40,
        borderRadius: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    flatList: {
        overflow: 'hidden',
        width: '100%',
        paddingTop: 15,
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        flex: 1,


    },
    dashboardImage: {
        // paddingHorizontal: pixelSizeHorizontal(20),
        resizeMode: 'cover',
        width: '100%',
        flex: 1,
        borderRadius: 30,
        alignItems: 'center',

    },
    listHead: {
        alignSelf: 'center',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 45,
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 20,
        flexDirection: 'row',

    },
    listHeadText: {
        fontFamily: Fonts.faktumBold,
        color: Colors.text,
        fontSize: fontPixel(14)
    },
    signalCard: {
        alignSelf: 'center',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 55,
        borderBottomColor: Colors.text,
        borderBottomWidth: 1,
    },
    signalCardValueWrap: {
        width: '20%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signalCardValue: {

        fontFamily: Fonts.faktumMedium,
        color: Colors.text,
        fontSize: fontPixel(14)
    },
    signalViewBtn: {
        backgroundColor: "#00B2FF",
        paddingHorizontal: pixelSizeHorizontal(8),
        borderRadius: 10,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewText: {
        color: "#fff",
        fontSize: fontPixel(12),

        fontFamily: Fonts.faktumRegular
    },
    paginationContainer: {
        position: 'absolute',
        bottom: 1,
        width: '100%',
        height: heightPixel(50),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    pagingButton: {
        width: widthPixel(55),
        height: 35,
        borderRadius: 5,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: pixelSizeHorizontal(10),
    },
    messageWrap: {
        height: heightPixel(300),
        marginTop: 15,
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    message: {
        textAlign: 'center',
        marginLeft: 8,
        lineHeight: heightPixel(25),
        color: "#fff",
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumBold
    },
    imageWrap: {
        maxHeight: heightPixel(140),
        width: heightPixel(100),
        alignItems: 'center',
        justifyContent: 'center',
    },
    fileBroken: {
        height: "80%",
        width: "100%",
        resizeMode: 'contain'
    },


})

export default SignalSummary;
