import React, {SetStateAction, useCallback, useEffect, useState} from 'react';

import {
    Text,
    View,
    StyleSheet,
    RefreshControl,
    ScrollView,
    Platform,
    ActivityIndicator,
    FlatList,
    Dimensions, TouchableOpacity, Image, ImageBackground
} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import FinixTopBar from "../../../components/signal/FinixTopBar";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import Colors from "../../../constants/Colors";
import GradientSegmentControl from "../../../components/segment-control/GradientSegmentControl";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../../../helpers/normalize";
import SegmentedControl from "../../../components/segment-control/SegmentContol";
import HomeSegmentedTabs from "../../../components/signal/HomeSegmentTabs";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {getEducators, getEducatorsFollowing, getSignals, getSignalsTest} from "../../../api/finix-api";
import {useRefreshOnFocus, wait} from "../../../helpers";
import {Fonts} from "../../../constants/Fonts";
import {IF} from "../../../helpers/ConditionJsx";
import {AntDesign, Entypo, FontAwesome, Ionicons} from "@expo/vector-icons";
import HorizontalLine from "../../../components/HorizontalLine";
import {SignalRootTabScreenProps} from "../../../types";
import FastImage from "react-native-fast-image";
import dayjs from "dayjs";


const FakeStreams = [
    {
        id: '1',

    }, {
        id: '2',

    },
    {
        id: '3',

    },
]

const width = Dimensions.get('window').width

interface props {
    viewEducator: (details: {}) => void,
    item: {

        "created_at": string,
        "educator": {
            "email": string,
            "first_name": string,
            "id": string,
            "last_name": string,
            "photo": string,
            "total_followers": number,
        },
        "id": string,
    }
}


interface PropsSignal {

    viewSignal: (signal: {
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
        "status": string
    }) => void
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
        "status": string,
        is_updated: number,
    }
}
interface streamProps {
    joinLiveStream:()=>void
}
interface prosAcademy {
    viewAcademy:()=>void
}

const ItemSignal = ({item, viewSignal, viewSignalImage}: PropsSignal) => {

    const viewItemSignal = (signal) => {
        if (item.category.type == 'news') {
            viewSignalImage(signal)

        } else {
            viewSignal(signal)
        }
    }


    return (

        <TouchableOpacity onPress={() => viewItemSignal(item)} activeOpacity={0.8} style={styles.loanAppCard}>
            {
                item.is_updated == 1 &&
                <View style={styles.signalTag}>

                    <Text style={[styles.liveText, {}]}>
                        1
                    </Text>
                </View>
            }
            {
                item.category.type == 'news' ?
                    <>

                        <View style={styles.chart_photoImageWrap}>


                            <FastImage

                                style={styles.chart_photoImage}
                                source={{
                                    uri: item.chart_photo,
                                    cache: FastImage.cacheControl.web,
                                    priority: FastImage.priority.normal,

                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </View>


                        <Text style={styles.educatorName}>
                            {item.educator.last_name} {item.educator.first_name}
                        </Text>


                    </>

                    :
                    <>
                        <View style={styles.topCard}>
                            <View style={styles.IconImageWrap}>
                                <Image style={styles.IconImage}
                                       source={{uri: item.asset.image}}/>


                            </View>

                            <View>
                                <Text style={styles.assetText}>
                                    {item.asset.name}
                                </Text>
                                <Text style={[styles.assetText, {
                                    fontFamily: Fonts.faktumRegular
                                }]}>
                                    {item.category.name}
                                </Text>
                            </View>

                        </View>

                        <View style={styles.bottomCard}>

                            <View style={styles.bottomCardRow}>
                                <Text style={styles.bottomCardText}>
                                    Order type
                                </Text>
                                <Text style={styles.bottomCardSubText}>
                                    {item.order_type}
                                </Text>

                            </View>
                            <View style={styles.bottomCardRow}>
                                <Text style={styles.bottomCardText}>
                                    Status
                                </Text>
                                <Text style={[styles.bottomCardSubText, {
                                    color: Colors.pendingYellow
                                }]}>
                                    {item.status}
                                </Text>

                            </View>
                            <View style={styles.bottomCardRow}>
                                <Text style={styles.bottomCardText}>
                                    Target price
                                </Text>
                                <Text style={styles.bottomCardSubText}>
                                    {item.target_price}
                                </Text>

                            </View>
                            <Text style={styles.educatorName}>
                                {item.educator.last_name} {item.educator.first_name}
                            </Text>


                        </View>
                    </>
            }


        </TouchableOpacity>
    )
}

const ItemStreams = ({joinLiveStream}:streamProps) => {


    return (

        <TouchableOpacity onPress={joinLiveStream} activeOpacity={0.8} style={styles.streamCard}>
            <View style={styles.streamLiveTag}>
                <Entypo name="dot-single" size={24} color={"#fff"} />
                <Text style={[styles.liveText, {}]}>
                   Live
                </Text>
            </View>

            <Image style={styles.streamImage}
                   source={require('../../../assets/images/streamIMG.png')}/>

        </TouchableOpacity>
    )
}


const ItemAcademy = ({viewAcademy}:prosAcademy) => {


    return (

        <TouchableOpacity onPress={viewAcademy} activeOpacity={0.8} style={styles.academyCard}>

            <View style={styles.academyCardImageWrap}>
                <Image style={styles.academyCardImage}
                       source={require('../../../assets/images/academy_cover.png')}/>
            </View>
            <View style={styles.academyCardBody}>
                <Text style={styles.academyTitle}>
                    Cyborg Academy
                </Text>
                <View style={styles.description}>
                    <Text style={styles.descriptionText}>
                        Description
                    </Text>
                </View>

                <Text style={styles.statusText}>
                    Course Status - 10% completed
                </Text>
            </View>


        </TouchableOpacity>
    )
}


const EducatorItem = ({item, viewEducator}: props) => {

    return (
        <TouchableOpacity activeOpacity={0.8} disabled={!item.educator} onPress={() => viewEducator(item)}
                          style={styles.educatorSmallCard}>
            {/*     <View style={styles.liveTag}>

                <Text style={[styles.liveText, {}]}>
                    1
                </Text>
            </View>*/}
            <View style={styles.educatorSmallCardImage}>

                <FastImage

                    style={styles.tAvatar}
                    source={{
                        uri: item?.educator?.photo,
                        cache: FastImage.cacheControl.web,
                        priority: FastImage.priority.normal,

                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />

            </View>

            <View style={styles.educatorNameWrap}>
                <Text style={styles.educatorName}>
                    {item?.educator?.first_name} {item?.educator?.last_name}
                </Text>
            </View>

        </TouchableOpacity>

    )
}
const HomeSignal = ({navigation}: SignalRootTabScreenProps<'SignalHome'>) => {

    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)
    const {User_Details, userData} = user

    const [refreshing, setRefreshing] = useState(false);


    const {
        data: myEducators,
        isLoading,
        refetch: fetchFollowing
    } = useQuery([`getEducatorsFollowing`], getEducatorsFollowing)


   const {
        data: signals,
        isLoading: loadingSignals,
        refetch: refetchSignals
    } = useQuery(['get-user-Signals'], getSignals)


    /*useEffect(() => {
        getSignalsTest().then(res =>{
            console.log("__---__--_____-")
                console.log(res)
                console.log("__---__--_____-")
        }

        ).catch(err => console.log(err))
    }, []);*/


    const viewEducator = (details: {}) => {
        navigation.navigate('MainSignalNav', {
            screen: 'ViewEducator', params: details
        })

    }


    const viewSignalImage = (details) => {
        navigation.navigate('MainSignalNav', {
            screen: 'SignalImageDetails', params: {details}

        })
    }

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
        "status": string
    }) => {

        navigation.navigate('MainSignalNav', {
            screen: 'SignalDetails', params: {details: details}

        })
    }

    const joinLiveStream = () =>{
        navigation.navigate('MainSignalNav',{
            screen:'LiveStream'
        })
    }
    const viewAcademy = () =>{
        navigation.navigate('MainSignalNav',{
            screen:'ViewAcademy'
        })
    }

    const keyExtractor = useCallback((item: { id: any; }) => item.id, [],)

    const renderItem = useCallback(
        ({item}) => <EducatorItem item={item} viewEducator={viewEducator}/>,
        [],
    );

    const renderItemSignal = useCallback(
        ({item}) => <ItemSignal viewSignalImage={viewSignalImage} item={item} viewSignal={viewSignal}/>,
        [],
    );
    const renderItemStreams = useCallback(
        ({item}) => <ItemStreams joinLiveStream={joinLiveStream}/>,
        [],
    );
    const renderItemAcademy = useCallback(
        ({item}) => <ItemAcademy viewAcademy={viewAcademy}/>,
        [],
    );


    const seeSignalSummary = () => {
        navigation.navigate('MainSignalNav', {
            screen: 'SignalSummary'
        })
    }

    const addFollowing = () => {

        navigation.navigate('MainSignalNav', {
            screen: 'StreamersList'
        })
    }

    const refresh = () => {
        setRefreshing(true)
        fetchFollowing()
        refetchSignals()
        wait(2000).then(() => setRefreshing(false));
    }


    useRefreshOnFocus(fetchFollowing)
    useRefreshOnFocus(refetchSignals)


    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={require('../../../assets/images/signal/signal_BG.png')}
                             resizeMode={'cover'}
                             style={styles.dashboardImage}>
                <ScrollView style={{width: '100%',}} contentContainerStyle={styles.scrollView} scrollEnabled
                            showsVerticalScrollIndicator={false}

                            refreshControl={<RefreshControl tintColor={Colors.primary} refreshing={refreshing}
                                                            onRefresh={refresh}/>}>


                    <FinixTopBar
                        profilePhoto={User_Details.image ? User_Details.image : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}
                        userName={User_Details.username}/>


                    <ImageBackground source={require('../../../assets/images/signal/educator_BG.png')}
                                     style={styles.segmentBody}>

                        <View style={styles.ActivityCardTop}>
                            <Text style={[styles.listTitle, {}]}>
                                Following
                            </Text>
                            <TouchableOpacity onPress={addFollowing} activeOpacity={0.7} style={styles.seeAll}>
                                <FontAwesome name="plus-circle" size={24} color="#fff"/>

                            </TouchableOpacity>
                        </View>

                        {!isLoading && myEducators && myEducators?.data?.length < 1 &&
                            <View style={styles.messageWrap}>
                                <Ionicons name="ios-information-circle" size={24} color={Colors.text}/>
                                <Text style={styles.message}>
                                    Click the plus button to follow an educator!

                                </Text>
                            </View>
                        }

                        {
                            isLoading && <ActivityIndicator color={Colors.primary} size='small'/>
                        }


                        {
                            !isLoading && myEducators && myEducators?.data?.length > 0 &&
                            <FlatList
                                data={myEducators?.data.slice(0, 12)}
                                keyExtractor={keyExtractor}
                                horizontal
                                pagingEnabled
                                scrollEnabled
                                snapToAlignment="center"
                                scrollEventThrottle={16}
                                decelerationRate={"fast"}
                                showsHorizontalScrollIndicator={false}
                                renderItem={renderItem}
                            />
                        }
                    </ImageBackground>


                    <ImageBackground resizeMethod={"scale"}
                                     source={require('../../../assets/images/signal/educator_BG.png')}
                                     style={[styles.segmentBody, {
                                         height: 250,
                                         marginTop: 20,
                                     }]}>

                        <View style={styles.ActivityCardTop}>
                            <Text style={[styles.listTitle, {}]}>
                                Signals
                            </Text>
                            <TouchableOpacity onPress={seeSignalSummary} activeOpacity={0.7} style={styles.seeAll}>
                                <FontAwesome name="plus-circle" size={24} color="#fff"/>

                            </TouchableOpacity>
                        </View>

                        {!loadingSignals && signals && signals?.data?.length < 1 &&
                            <View style={styles.messageWrap}>


                                <View style={styles.imageWrap}>

                                    <Image source={require('../../../assets/images/EmptyBox/empty_state.png')}
                                           style={styles.fileBroken}/>


                                </View>


                                <Text style={styles.message}>
                                    Follow an educator and receive signals!

                                </Text>
                            </View>
                        }
                        {
                            loadingSignals && <ActivityIndicator color={Colors.primary} size='small'/>
                        }
                        {
                            !loadingSignals && signals && signals?.data?.length > 0 &&
                            <FlatList
                                data={signals?.data.slice(0, 12)}
                                keyExtractor={keyExtractor}
                                horizontal
                                pagingEnabled
                                scrollEnabled
                                snapToAlignment="center"
                                scrollEventThrottle={16}
                                decelerationRate={"fast"}
                                showsHorizontalScrollIndicator={false}
                                renderItem={renderItemSignal}
                            />
                        }
                    </ImageBackground>

                    <View style={styles.liveStreamingSection}>
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>
                                Live Streaming
                            </Text>
                        </View>
                        <View style={styles.liveStreaming}>

                            <FlatList
                                data={FakeStreams}
                                keyExtractor={keyExtractor}
                                horizontal
                                pagingEnabled
                                scrollEnabled
                                snapToAlignment="center"
                                scrollEventThrottle={16}
                                decelerationRate={"fast"}
                                showsHorizontalScrollIndicator={false}
                                renderItem={renderItemStreams}
                            />

                        </View>


                    </View>

                    <View style={styles.academySection}>
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>
                                Academy
                            </Text>
                        </View>
                        <View style={styles.academyCardSlide}>

                            <FlatList
                                data={FakeStreams}
                                keyExtractor={keyExtractor}
                                horizontal
                                pagingEnabled
                                scrollEnabled
                                snapToAlignment="center"
                                scrollEventThrottle={16}
                                decelerationRate={"fast"}
                                showsHorizontalScrollIndicator={false}
                                renderItem={renderItemAcademy}
                            />

                        </View>


                    </View>


                </ScrollView>
            </ImageBackground>


            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.6} style={[styles.topButton, {
                //  backgroundColor:Colors.primary
            }]}>
                <LinearGradient style={styles.innerBtn}
                                start={{x: 1.5, y: 1}}
                                end={{x: 0.5, y: 1.1,}}

                                colors={['#4E044B', Colors.purplePrimary,]}>


                    <AntDesign name="back" size={24} color="#fff"/>
                </LinearGradient>
            </TouchableOpacity>
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
        paddingHorizontal: 20,
        flex: 1,
        width: '100%',
        alignItems: "center"
    },
    scrollView: {
        width: '100%',
        alignItems: "center",
        paddingHorizontal: 20,
    },

    topTabButtons: {
        width: '90%',
        height: heightPixel(60),
        justifyContent: 'flex-start'

    },
    educatorSmallCard: {
        width: 85,
        minHeight: 100,

        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    educatorSmallCardImage: {
        width: 45,
        height: 45,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff"
    },
    tAvatar: {
        resizeMode: 'cover',
        height: '100%',
        width: '100%',
        borderRadius: 10,
    },
    liveTag: {
        right: 10,
        top: 0,
        zIndex: 1,
        height: 18,
        width: 18,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        position: "absolute",

        borderRadius: 10,
        backgroundColor: Colors.primary
    },
    signalTag: {
        right: 10,
        top: 0,
        zIndex: 1,
        height: 18,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        position: "absolute",

        borderRadius: 5,
        backgroundColor: Colors.primary
    },
    liveText: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(12),
        color: Colors.text
    },
    educatorNameWrap: {
        width: '90%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    educatorName: {
        marginTop: 8,
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(12),
        textAlign: 'center',
        color: Colors.text
    },
    segmentBody: {

        width: width - 40,
        alignItems: 'flex-start',
        height: 150,
        resizeMode: 'cover',
        overflow: 'hidden',
        borderRadius: 30,
        justifyContent: 'flex-start',
        paddingVertical: pixelSizeHorizontal(10),
        // marginBottom: 20
    },
    ActivityCardTop: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        height: heightPixel(40),
    },
    listTitle: {
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumRegular,
        color: Colors.text
    },
    tintText: {
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumRegular,
        color: Colors.tintText
    },
    seeAll: {
        flexDirection: 'row',
        alignItems: 'center'
    },


    loanAppCard: {
        marginHorizontal: pixelSizeHorizontal(12),
        width: widthPixel(170),
        height: heightPixel(180),
        borderRadius: 18,
        backgroundColor: "rgba(255,255,255,0.16)",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: pixelSizeHorizontal(15),

    },
    topCard: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%',

    },
    listIcon: {
        height: 25,
        width: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    IconImageWrap: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    IconImage: {
        height: '100%',
        width: '100%',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    chart_photoImageWrap: {
        width: widthPixel(150),
        height: heightPixel(140),
        alignItems: 'center',
        justifyContent: 'center'
    },
    chart_photoImage: {
        height: '100%',
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    assetText: {
        color: Colors.text,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumBold
    },
    bottomCard: {
        height: 90,

        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',

    },
    bottomCardRow: {
        width: '100%',
        height: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bottomCardText: {
        color: Colors.text,
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumSemiBold
    },
    bottomCardSubText: {
        textTransform: 'capitalize',
        color: Colors.success,
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumBold
    },
    dashboardImage: {
        // paddingHorizontal: pixelSizeHorizontal(20),
        resizeMode: 'cover',
        width: '100%',
        flex: 1,
        borderRadius: 30,
        alignItems: 'center',

    },
    boxWrap: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    messageWrap: {
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
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumBold
    },
    topButton: {
        position: 'absolute',
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        borderRadius: 60,
        bottom: 45,
        right: 30,
    },
    innerBtn: {
        borderRadius: 60,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
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
    liveStreamingSection: {
        marginTop: 15,
        width: '100%',
        height: heightPixel(250),

        alignItems: 'center',

    },
    sectionTitle: {
        width: '90%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    sectionTitleText: {
        color: Colors.textDark,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumBold
    },
    liveStreaming: {
        width: '100%',
        height: heightPixel(200),
    },

    streamCard: {
        marginHorizontal: 10,
        width: widthPixel(300),
        height: heightPixel(180),
        borderRadius: 14,
        alignItems: "center",
        justifyContent: 'center',
        overflow: 'hidden'
    },
    streamLiveTag:{
        zIndex:1,
      position:'absolute',
      left:15,
      top:5,
        flexDirection:'row',

      paddingHorizontal:pixelSizeHorizontal(5),
      alignItems:'center',
      justifyContent:'center',
      borderRadius:5,
        minHeight:20,
        backgroundColor:Colors.errorRed
    },
    streamImage: {
        height: '100%',
        width: '100%',
        borderRadius: 14,

        resizeMode: 'cover'
    },

    academySection: {
        marginTop: 15,
        width: '100%',
        height: heightPixel(350),

        alignItems: 'center',
    },
    academyCardSlide: {
        width: '100%',
        height: heightPixel(320),
    },
    academyCard: {
        marginHorizontal: pixelSizeHorizontal(10),
        width: widthPixel(230),
        height: heightPixel(300),
        borderRadius: 14,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 14,
    },
    academyCardImageWrap: {
        width: '100%',
        height: heightPixel(135),
        borderRadius: 14,

        resizeMode: 'cover'
    },
    academyCardImage: {
        height: '100%',
        width: '100%',
        borderRadius: 14,

        resizeMode: 'cover'
    },
    academyCardBody: {
        marginTop: 8,
        alignItems: 'flex-start',
        width: '100%'
    },
    description: {
        marginTop: 8,
        alignItems: 'flex-start',
        width: '100%',
        minHeight: 60,
    },
    descriptionText: {
        color: Colors.textDark,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumRegular
    },
    statusText: {
        color: Colors.lightColor,
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumRegular
    },
    academyTitle: {
        color: Colors.textDark,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumBold
    }


})

export default HomeSignal;
