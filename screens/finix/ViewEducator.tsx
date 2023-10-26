import React, {SetStateAction, useCallback, useEffect, useState} from 'react';

import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Pressable,
    ActivityIndicator, FlatList, Image, Dimensions, Platform
} from 'react-native';
import FastImage from "react-native-fast-image";
import {SafeAreaView} from "react-native-safe-area-context";
import {Entypo, FontAwesome, Ionicons, SimpleLineIcons} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import {LinearGradient} from 'expo-linear-gradient';
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../../helpers/normalize";
import {Fonts} from "../../constants/Fonts";
import {SignalRootTabScreenProps, SignalStackScreenProps} from "../../types";
import {MyButton} from "../../components/MyButton";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    educatorsLive,
    getEducator,
    getEducatorSignals,
    getSignals,
    listAcademy, pastStreamerVideos,
    unFollowEducator
} from "../../api/finix-api";
import {addNotificationItem} from "../../app/slices/dataSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import GradientSegmentControl from "../../components/segment-control/GradientSegmentControl";
import SegmentedControl from "../../components/segment-control/SegmentContol";
import NoItem from "../../components/NoItem";
import {IF} from "../../helpers/ConditionJsx";
import HorizontalScrollMenu from "../../components/HorizontalScrollMenu";

import {truncate, useRefreshOnFocus} from "../../helpers";


const Courses = []


const width = Dimensions.get('window').width


interface prosAcademy {
    item: {
        "id": string,
        "name": string,
        "thumbnail": string,
        "description": string,
        "caption": string,
        "completed": string,
        "educator": {
            "id": string,
            "first_name": string,
            "last_name": string,
            "email": string,
            "photo": string,
            "total_followers": number,
            "categories": []
        }
    }
    viewAcademy: (id: string) => void
}

interface Props {
    viewSignalImage: (item: {}) => void,
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
    }
}

interface streamProps {
    viewVideo: (file: string,) => void,
    item: {
        "id": string,
        "file": string,
        "thumbnail": string,
    }
}


const ItemPastStreams = ({viewVideo, item}: streamProps) => {


    return (

        <TouchableOpacity
            onPress={() => viewVideo(item.file)}
            activeOpacity={0.8} style={styles.pastStreamCard}>

            {
                item.thumbnail ?

                    <Image style={styles.streamImage}
                           source={{uri: item.thumbnail}}/>
                    :
                    <Image style={styles.streamImage}
                           source={require('../../assets/images/streamIMG.png')}/>
            }
        </TouchableOpacity>
    )
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

        <TouchableOpacity onPress={() => viewItemSignal(item)} activeOpacity={0.8} style={styles.loanAppCard}>
            {item.category.type == 'news' &&
                <>

                    <View style={styles.chart_photoImageWrap}>
                        <Image style={styles.chart_photoImage}
                               source={{uri: item.chart_photo}}/>


                    </View>


                    <Text style={[styles.assetText, {
                        fontFamily: Fonts.faktumBold
                    }]}>
                        {item.category.name}
                    </Text>


                </>
            }

            {item.category.type !== 'news' &&


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
                            <Text style={styles.bottomCardSubText}>
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
                            {item.educator.first_name} {item.educator.last_name}
                        </Text>


                    </View>
                </>
            }

        </TouchableOpacity>
    )
}


const ItemAcademy = ({viewAcademy, item}: prosAcademy) => {


    return (

        <TouchableOpacity onPress={() => viewAcademy(item.id)} activeOpacity={0.8} style={styles.academyCard}>

            <View style={styles.academyCardImageWrap}>

                <FastImage

                    style={styles.academyCardImage}
                    source={{
                        uri: item.thumbnail,

                        cache: FastImage.cacheControl.web,
                        priority: FastImage.priority.normal,

                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </View>
            <View style={styles.academyCardBody}>
                <Text style={styles.academyTitle}>
                    {item.name}
                </Text>
                <View style={styles.description}>
                    <Text style={styles.descriptionText}>
                        {truncate(item.description, 80)}
                    </Text>
                </View>

                <Text style={styles.statusText}>
                    Course Status - {item.completed} completed
                </Text>
            </View>


        </TouchableOpacity>
    )
}

const ViewEducator = ({navigation, route}: SignalStackScreenProps<'ViewEducator'>) => {

    const {educator} = route.params

    const user = useAppSelector(state => state.user)
    const {userData} = user

    const dispatch = useAppDispatch()
    const queryClient = useQueryClient()

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
        "asset": string,
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

        navigation.navigate('SignalDetails', {
            details: details

        })
    }

    const {mutate: unFollowNow, isLoading: unFollowing} = useMutation(['unFollowEducator'], unFollowEducator, {
        onSuccess: (data) => {

            if (data.success) {
                // fetchEducators()
                //refetch()
                navigation.replace('SignalBottomTab')
                dispatch(addNotificationItem({
                    id: Math.random(),
                    type: 'success',
                    body: data.message,
                }))

                //  refetchFavs()
            } else {

            }

        },
        onSettled: () => {
            queryClient.invalidateQueries(['unFollowEducator']);
        }
    })


    //  const {data: signals, isLoading: loadingSignals, refetch: refetchSignals} = useQuery(['getSignals'], getSignals)


    const {
        data: educatorDetails,
        isLoading: loadingEducator,
        refetch: refetchEducator
    } = useQuery(['get-educator-details', educator.id], () => getEducator(educator.id))

    const {
        data: educatorSignals,
        isLoading: loadingSignals,
        refetch: refetchSignals
    } = useQuery(['get-educator-signals', educator.id], () => getEducatorSignals(educator.id))


    const {
        data: pastStreams,
        isLoading: loadingPastStreams,
        refetch: refetchStreams
    } = useQuery(['list-past-Streamer-Videos',educator.id], () => pastStreamerVideos(educator.id))


    //  console.log(pastStreams.data)
    const {
        data: liveEducators,
        isLoading: loadingLive,
        refetch: fetchLive
    } = useQuery([`educators-Live`], educatorsLive)


    const {
        data: academy,
        isLoading: loadingAcademy,
        refetch: refetchAcademy
    } = useQuery(['list-Academy'], listAcademy)


    const [tabIndex, setTabIndex] = useState<string>(!loadingEducator && educatorDetails?.data?.categories[0].category.id);
    const [filterCategory, setFilterCategory] = useState(!loadingEducator && educatorDetails?.data?.categories[0].category.name);


    useEffect(() => {
        if (!loadingEducator) {
            setFilterCategory(educatorDetails?.data?.categories[0].category.name)
        }

    }, [educatorDetails])
    const viewSignalImage = (details) => {
        navigation.navigate('MainSignalNav', {
            screen: 'SignalImageDetails', params: {details}

        })
    }

    useEffect(() => {
        setTabIndex(educatorDetails?.data?.categories[0].category.id)
    }, [educatorDetails]);

    const viewAcademy = (id: string) => {
        navigation.navigate('ViewAcademy', {
            id
        })
    }
    const viewVideo = (file: string) => {
        navigation.navigate('ViewVideo', {
            file
        })
    }
//console.log(educatorSignals)

    const keyExtractor = useCallback((item: { id: any; }) => item.id, [],)

    const renderItemSignal = useCallback(
        ({item}) => <ItemSignal item={item} viewSignal={viewSignal} viewSignalImage={viewSignalImage}/>,
        [],
    );
    const renderItemAcademy = useCallback(
        ({item}) => <ItemAcademy item={item} viewAcademy={viewAcademy}/>,
        [],
    );
    const renderItemPastStreams = useCallback(
        ({item}) => <ItemPastStreams item={item} viewVideo={viewVideo}/>,
        [],
    );

    const seeAllPastStreams = () => {
        navigation.navigate('AllPastStreams',{
            educatorId:educator.id
        })
    }
    const joinLiveStream = (educatorId: string, last_name: string, stream_url: string, photo: string, first_name: string) => {
        navigation.navigate('LiveStream', {

            last_name, stream_url, photo, first_name, educatorId

        })
    }
    const goBackNow = () => {
        navigation.goBack()
    }


    const startMessage = () => {
        navigation.navigate('MessageScreen', {
            educator
        })
    }

    const unFollowEducatorNow = () => {

        const body = JSON.stringify({
            educator: educator.id
        })
        unFollowNow(body)
    }

    const viewMore = () => {
        navigation.navigate('EducatorSignalSummary', {
            educator: educator.id,
            educatorName: educator.first_name
        })
    }


    useRefreshOnFocus(refetchEducator)
    useRefreshOnFocus(refetchSignals)
    useRefreshOnFocus(refetchAcademy)

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={require('../../assets/images/signal/signal_BG.png')}
                             resizeMode={'cover'}
                             style={styles.dashboardImage}>
                <ScrollView style={{
                    width: '100%'
                }} contentContainerStyle={styles.scrollView} scrollEnabled
                            showsVerticalScrollIndicator={false}
                >

                    <ImageBackground style={styles.bannerTop}
                                     source={require('../../assets/images/signal/finix_banner_BG.png')}>


                        <View style={styles.topBar}>
                            <TouchableOpacity onPress={goBackNow} style={[styles.backBtn, {}]}>
                                <Ionicons name="md-chevron-back" color={Colors.text} size={heightPixel(24)}/>
                            </TouchableOpacity>

                            <View>
                                {/* <Text style={styles.title}>
                        Edit profile
                    </Text>*/}

                            </View>

                            <View style={styles.backBtn}>


                            </View>
                        </View>


                        <View style={styles.favList}>
                            <View style={[styles.listIcon, {
                                backgroundColor: Colors.text,
                            }]}>


                                <FastImage
                                    style={styles.tAvatar}
                                    source={{
                                        cache: FastImage.cacheControl.web,
                                        uri: educator.photo,
                                        priority: FastImage.priority.normal,
                                    }}

                                    resizeMode={FastImage.resizeMode.cover}
                                />


                            </View>
                            <View
                                style={styles.listBody}>
                                <Text style={styles.bodyTitle}>
                                    {educator.first_name} {educator.last_name}
                                </Text>
                                <View style={styles.listBottom}>


                                    <Text style={styles.bodySubText}>
                                        {educator.total_followers} <Text
                                        style={{fontFamily: Fonts.faktumRegular}}>followers </Text>
                                    </Text>

                                </View>

                            </View>

                            {
                                !unFollowing &&

                                <MyButton disabled={unFollowing} onPress={unFollowEducatorNow}
                                          style={[styles.listBodyRight, {
                                              backgroundColor: 'transparent'
                                          }]}>
                                    <LinearGradient style={styles.createBtnGradient}
                                                    colors={['#8D34F1', '#0075FF']}

                                                    start={{x: 0.3, y: 1}}
                                                    end={{x: 1, y: 3.3,}}

                                        // locations={[0.1, 0.7,]}
                                    >
                                        <Text style={styles.buttonTxt}>
                                            Following
                                        </Text>

                                    </LinearGradient>
                                </MyButton>
                            }
                            {
                                unFollowing && <ActivityIndicator size='small' color={Colors.text}/>
                            }


                        </View>
                    </ImageBackground>


                    {
                        loadingEducator && <ActivityIndicator color={Colors.primary} size={'small'}/>
                    }

                    {
                        !loadingEducator &&

                        <View style={styles.segmentWrap}>
                            <HorizontalScrollMenu

                                /*   items={[

                                       {
                                           id: "0",
                                           name: "Forex",
                                       },
                                       {
                                           id: "1",
                                           name: 'Crypto',
                                       },


                                   ]}*/

                                items={educatorDetails?.data?.categories.map(({_id, category, symbol}: {
                                    _id: string,
                                    category: { name: string, id: string },
                                    symbol: string
                                }) => ({
                                    id: category.id,
                                    name: category.name
                                }))}

                                containerStyle={{width: '110%',}}
                                textStyle={{
                                    fontSize: fontPixel(12),
                                    textAlign: 'center',
                                    color: Colors.textDark,
                                    fontFamily: Fonts.faktumSemiBold
                                }}
                                activeTextStyle={{
                                    fontFamily: Fonts.faktumBold,
                                    fontSize: fontPixel(12),
                                    color: Colors.primary
                                }}
                                activeButtonStyle={{
                                    //borderBottomColor: Colors.primary,
                                    // borderBottomWidth: 1,
                                }}
                                contentContainerStyle={{
                                    justifyContent: 'center'
                                }}

                                activeColor={Colors.text}
                                activeBackgroundColor={Colors.purplePrimary}
                                buttonStyle={styles.tabButtonStyle}
                                onPress={(e: { id: React.SetStateAction<string>; name: string }) => {
                                    setTabIndex(e.id)
                                    setFilterCategory(e.name)
                                }}
                                selected={tabIndex}
                            />
                        </View>
                    }

                    {
                        !loadingLive && liveEducators && liveEducators?.data.find((educator: {
                            id: any;
                        }) => educator.id === educatorDetails?.data?.id)
                        &&
                        <TouchableOpacity
                            onPress={() => joinLiveStream(
                                liveEducators?.data.find((educator: {
                                    id: any;
                                }) => educator.id === educatorDetails?.data?.id).id,
                                liveEducators?.data.find((educator: {
                                    id: any;
                                }) => educator.id === educatorDetails?.data?.id).last_name,
                                liveEducators?.data.find((educator: {
                                    id: any;
                                }) => educator.id === educatorDetails?.data?.id).stream_url,
                                liveEducators?.data.find((educator: {
                                    id: any;
                                }) => educator.id === educatorDetails?.data?.id).photo,
                                liveEducators?.data.find((educator: {
                                    id: any;
                                }) => educator.id === educatorDetails?.data?.id).first_name)}
                            activeOpacity={0.8} style={styles.streamCard}>
                            <View style={styles.streamLiveTag}>
                                <Entypo name="dot-single" size={24} color={"#fff"}/>


                                <Text style={[styles.liveText, {}]}>
                                    Live
                                </Text>

                            </View>

                            <FastImage

                                style={styles.streamImage}
                                source={{
                                    uri: liveEducators?.data.find((educator: {
                                        id: any;
                                    }) => educator.id === educatorDetails?.data?.id)?.thumbnail,

                                    cache: FastImage.cacheControl.web,
                                    priority: FastImage.priority.normal,

                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />

                            <View style={styles.streamerInfo}>
                                <Text style={styles.streamerInfoText}>
                                    {educator.first_name} {educator.last_name}
                                </Text>
                            </View>

                        </TouchableOpacity>
                    }
                    <Pressable onPress={startMessage}>
                        <ImageBackground resizeMethod={"scale"}
                                         source={require('../../assets/images/signal/educator_BG.png')}
                                         style={[styles.segmentBody, {
                                             height: 50,
                                             marginTop: 20,
                                         }]}>

                            <View style={styles.ActivityCardTop}>
                                <Text style={[styles.listTitle, {
                                    fontFamily: Fonts.faktumBold
                                }]}>
                                    Messages
                                </Text>

                            </View>

                            <View>

                            </View>

                        </ImageBackground>
                    </Pressable>


                    <ImageBackground resizeMethod={"scale"}
                                     source={require('../../assets/images/signal/educator_BG.png')}
                                     style={[styles.segmentBody, {
                                         height: 250,
                                         marginTop: 20,
                                     }]}>

                        <View style={styles.ActivityCardTop}>
                            <Text style={[styles.listTitle, {}]}>
                                Signals
                            </Text>
                            <TouchableOpacity onPress={viewMore} activeOpacity={0.7} style={styles.seeAll}>
                                <FontAwesome name="plus-circle" size={24} color="#fff"/>

                            </TouchableOpacity>
                        </View>

                        {!loadingSignals && educatorSignals && educatorSignals?.data.filter((signals: {
                                category: { name: any; };
                            }) => signals.category.name == filterCategory)?.length < 1 &&
                            <View style={styles.messageWrap}>
                                <View style={styles.imageWrap}>

                                    <Image source={require('../../assets/images/EmptyBox/empty_state.png')}
                                           style={styles.fileBroken}/>


                                </View>
                                <Text style={styles.message}>
                                    No {filterCategory} signal from this educator!

                                </Text>
                            </View>
                        }
                        {
                            loadingSignals && <ActivityIndicator color={Colors.primary} size='small'/>
                        }
                        {
                            !loadingSignals && educatorSignals && educatorSignals?.data?.length > 0 &&
                            <FlatList
                                data={educatorSignals?.data.slice(0, 10).filter((signals: {
                                    category: { name: any; };
                                }) => signals.category.name == filterCategory)}
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





                    <View style={styles.academySection}>
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>
                                Academy
                            </Text>

                            {/*   <TouchableOpacity  activeOpacity={0.7} style={styles.seeAll}>
                                <FontAwesome name="plus-circle" size={24} color={Colors.purplePrimary}/>

                            </TouchableOpacity>*/}
                        </View>


                        <View style={styles.academyCardSlide}>
                            {!loadingAcademy && academy && academy?.data?.length < 1 &&
                                <View style={styles.messageWrap}>


                                    <View style={styles.imageWrap}>

                                        <Image source={require('../../assets/images/EmptyBox/empty_state.png')}
                                               style={styles.fileBroken}/>


                                    </View>


                                    <Text style={styles.message}>
                                        This streamer has no academy

                                    </Text>
                                </View>
                            }
                            {
                                loadingAcademy && <ActivityIndicator color={Colors.primary} size='small'/>
                            }
                            {
                                !loadingAcademy && academy &&

                                <FlatList
                                    data={academy?.data.filter(acade => acade.educator.id === educatorDetails?.data?.id)}
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
                            }
                        </View>


                    </View>

                    <View style={styles.academySection}>
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>
                                Past streams
                            </Text>

                            <TouchableOpacity onPress={seeAllPastStreams} activeOpacity={0.7} style={styles.seeAll}>
                                <FontAwesome name="plus-circle" size={24} color={Colors.purplePrimary}/>

                            </TouchableOpacity>
                        </View>

                        {
                            !loadingAcademy && academy &&

                            <FlatList
                                data={pastStreams?.data.slice(0, 8)}
                                keyExtractor={keyExtractor}
                                horizontal
                                pagingEnabled
                                scrollEnabled
                                snapToAlignment="center"
                                scrollEventThrottle={16}
                                decelerationRate={"fast"}
                                showsHorizontalScrollIndicator={false}
                                renderItem={renderItemPastStreams}
                            />
                        }


                    </View>


                </ScrollView>
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
        alignItems: 'center',

    },
    dashboardImage: {
        // paddingHorizontal: pixelSizeHorizontal(20),
        resizeMode: 'cover',
        width: '100%',
        flex: 1,
        borderRadius: 30,
        alignItems: 'center',

    },
    background: {

        flex: 1,
        width: '100%',
        alignItems: "center"
    },
    topBar: {
        height: heightPixel(80),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: pixelSizeHorizontal(15)
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 40,


        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: Colors.textDark,
        fontSize: fontPixel(18),
        fontFamily: Fonts.faktumBold
    },
    bannerTop: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: heightPixel(200),
    },
    boxWrap: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    favList: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        height: heightPixel(90),

    },

    listIcon: {
        width: 55,
        height: 55,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tAvatar: {

        borderRadius: 10,
        resizeMode: 'cover',
        width: '100%',
        height: '100%'
    },
    listBody: {
        width: '50%',
        height: '50%',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },


    createBtnGradient: {
        width: '100%',
        height: '65%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTxt: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(12),
        color: "#fff"
    },
    listBodyRight: {
        borderRadius: 20,
        width: 100,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    followText: {
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumBold,
        color: Colors.text
    },
    bodyTitle: {
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumBold,
        color: Colors.text
    },
    bodySubText: {
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumMedium,
        color: Colors.tintText
    },
    listBottom: {
        width: '100%',
        height: '40%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    fakeTabWrapper: {
        flexDirection: 'row',
        marginTop: 15,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 40,
    },
    tabButton: {
        width: widthPixel(70),
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabButtonText: {
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumBold,
        color: "#9D9D9D"
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
        fontSize: fontPixel(14),
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
    chart_photoImageWrap: {
        width: widthPixel(160),
        height: heightPixel(160),
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
    tabButtonStyle: {
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 5,
        marginHorizontal: pixelSizeHorizontal(5)


    },
    segmentWrap: {
        height: heightPixel(70),
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row'
    },
    pastStreamCard: {
        marginHorizontal: 10,
        width: widthPixel(180),
        height: heightPixel(100),
        borderRadius: 14,
        alignItems: "center",
        justifyContent: 'center',
        overflow: 'hidden'
    },
    streamCard: {
        marginHorizontal: 10,
        width: '90%',
        height: heightPixel(180),
        borderRadius: 14,
        alignItems: "center",
        justifyContent: 'center',
        overflow: 'hidden'
    },
    streamLiveTag: {
        zIndex: 1,
        position: 'absolute',
        left: 15,
        top: 5,
        flexDirection: 'row',

        paddingHorizontal: pixelSizeHorizontal(5),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        minHeight: 20,
        backgroundColor: Colors.errorRed
    },
    streamImage: {
        height: '100%',
        width: '100%',
        borderRadius: 14,

        resizeMode: 'cover'
    },
    liveText: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(12),
        color: Colors.text
    },
    streamerInfo: {
        zIndex: 1,
        position: 'absolute',
        left: 15,
        bottom: 15,
        height: 35,
        borderRadius: 5,
        width: '90%',
        paddingHorizontal: pixelSizeHorizontal(10),
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
    },
    streamerInfoText: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(14),
        color: Colors.text
    },

    academySection: {
        marginTop: 15,
        width: '100%',
        height: heightPixel(350),

        alignItems: 'center',
    },
    sectionTitle: {
        width: '90%',
        height: 60,
        flexDirection: 'row',

        justifyContent: 'space-between',
        alignItems: 'center'
    },
    sectionTitleText: {
        color: Colors.textDark,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumBold
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
        fontSize: fontPixel(12),
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

export default ViewEducator;
