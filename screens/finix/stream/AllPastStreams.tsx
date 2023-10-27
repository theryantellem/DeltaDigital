import React, {SetStateAction, useCallback, useState} from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Pressable,
    ImageBackground,
    FlatList,
    ActivityIndicator, Image, RefreshControl, Platform
} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {AntDesign, Entypo, Ionicons} from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../../../helpers/normalize";
import {SafeAreaView} from "react-native-safe-area-context";
import {Fonts} from "../../../constants/Fonts";
import {useQuery} from "@tanstack/react-query";
import {educatorsLive, pastStreamerVideos} from "../../../api/finix-api";
import {SignalStackScreenProps} from "../../../types";
import FastImage from "react-native-fast-image";
import {useRefreshOnFocus, wait} from "../../../helpers";
import {FlashList} from "@shopify/flash-list";
import GradientSegmentControl from "../../../components/segment-control/GradientSegmentControl";
import SegmentedControl from "../../../components/segment-control/SegmentContol";
import {IF} from "../../../helpers/ConditionJsx";
import HeaderWithTitle from "../../../components/cyborg/header/HeaderWithTitle";



interface streamProps {
    joinLiveStream: (stream_url:string,) => void,
    item: {
        "id": string,
        "first_name": string,
        "last_name": string,
        "photo": string
        "is_live": number,
        "stream_url": string
        "is_favourite": number
    }
}

const ItemStreams = ({joinLiveStream,item}: streamProps) => {


    return (

        <Pressable
onPress={()=>joinLiveStream(item.stream_url)}

                          style={styles.streamCardPast}>

            {
                item.thumbnail ?

                    <FastImage

                    style={styles.streamImage}
                source={{
                uri: item.thumbnail,

                cache: FastImage.cacheControl.web,
                priority: FastImage.priority.normal,

            }}
                resizeMode={FastImage.resizeMode.cover}
                />
                :
                    <Image style={styles.streamImage}
                           source={require('../../../assets/images/streamIMG.png')}/>

            }
            <View style={styles.streamerInfo}>
                <Text style={styles.streamerInfoText}>
                    {item.first_name} {item.last_name}
                    {
                        item.is_favourite === 1 &&

                    <AntDesign name="heart" size={20} color={Colors.primary} />
                    }
                </Text>
            </View>


        </Pressable>
    )
}



const AllPastStreams = ({navigation,route}: SignalStackScreenProps<'AllPastStreams'>) => {


    const {educatorId} = route.params



    const [refreshing, setRefreshing] = useState(false);

    const [tabIndex, setTabIndex] = useState(0);
    const handleTabsChange = (index: SetStateAction<number>) => {
        setTabIndex(index);
        //  setScreen(index === 0 ? 'Banks' : 'Wallets')
    };

    const {
        data: pastStreams,
        isLoading: loadingPastStreams,
        refetch: refetchStreams
    } = useQuery(['list-past-Streamer-Videos',educatorId], () => pastStreamerVideos(educatorId))

//console.log(pastStreams)


    const keyExtractor = useCallback((item: { id: any; }) => item.id, [],)


    const joinLiveStream = (educatorId: string, last_name: string, stream_url: string, photo: string, first_name: string) => {
        navigation.navigate('LiveStream',

            {
                last_name, stream_url, photo, first_name, educatorId

            })
    }
    const viewVideo = (file: string) => {
        navigation.navigate('ViewVideo', {
            file
        })
    }


    const renderItemStreams = useCallback(
        ({item}) => <ItemStreams item={item} joinLiveStream={viewVideo}/>,
        [],
    );

    const goBack = () => {
navigation.goBack()
    }

    const refresh = () => {
        setRefreshing(true)
        refetchStreams()
        wait(2000).then(() => setRefreshing(false));
    }
    useRefreshOnFocus(refetchStreams)


    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="dark"/>
            <ImageBackground source={require('../../../assets/images/signal/streamer_BG.png')}
                             resizeMode={'cover'}
                             style={styles.dashboardImage}>


                <HeaderWithTitle title="Past streams"/>
                <View style={styles.flatList}>

                    {
                        Platform.OS === 'ios' ?

                            <GradientSegmentControl tabs={["All", "Favorites"]}
                                                    currentIndex={tabIndex}
                                                    onChange={handleTabsChange}
                                                    segmentedControlBackgroundColor={'#7676801F'}
                                                    activeSegmentBackgroundColor={"#fff"}

                                                    textColor={"#fff"}
                                                    paddingVertical={pixelSizeVertical(12)}/>
                            :

                            <SegmentedControl tabs={["All", "Favorites"]}
                                              currentIndex={tabIndex}
                                              onChange={handleTabsChange}
                                              segmentedControlBackgroundColor={Colors.tintPrimary}
                                              activeSegmentBackgroundColor={Colors.primary}
                                              activeTextColor={Colors.text}
                                              textColor={"#CDD4D7"}
                                              paddingVertical={pixelSizeVertical(16)}/>
                    }

                    <IF condition={tabIndex ==0}>


                    {
                    !loadingPastStreams && pastStreams &&

                    <FlashList
                        data={pastStreams?.data}

                        keyExtractor={keyExtractor}

                        refreshing={loadingPastStreams}



                        showsVerticalScrollIndicator={false}

                        estimatedItemSize={187}
                        onEndReachedThreshold={0.3}
                        refreshControl={
                            <RefreshControl
                                tintColor={Colors.text}
                                refreshing={refreshing}
                                onRefresh={refresh}
                            />
                        }
                        renderItem={renderItemStreams}
                    />
                }
                    </IF>


                    <IF condition={tabIndex ==1}>


                    {
                    !loadingPastStreams && pastStreams &&

                    <FlashList
                        data={pastStreams?.data.filter(stream =>stream.is_favourite == 1)}

                        keyExtractor={keyExtractor}

                        refreshing={loadingPastStreams}


                        estimatedItemSize={187}
                        showsVerticalScrollIndicator={false}

                        onEndReachedThreshold={0.3}
                        refreshControl={
                            <RefreshControl
                                tintColor={Colors.text}
                                refreshing={refreshing}
                                onRefresh={refresh}
                            />
                        }
                        renderItem={renderItemStreams}
                    />
                }
                    </IF>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#fff",
    },
    dashboardImage: {
        // paddingHorizontal: pixelSizeHorizontal(20),
        resizeMode: 'cover',
        width: '100%',
        flex: 1,
        borderRadius: 30,
        alignItems: 'center',

    },
    topBar: {
        height: heightPixel(80),
        width: '100%',
        paddingHorizontal: pixelSizeHorizontal(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: "#E5E7EB",
        // borderBottomWidth: 1,
    },
    title: {
        textAlign: 'center',
        color: Colors.textDark,
        textTransform: 'capitalize',
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumSemiBold
    },
    titleWrap: {
        width: '52%',

        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },

    rightBtn: {
        width: '20%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    backBtn: {
        width: '20%',
        height: 40,
        borderRadius: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
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


    streamImage: {
        height: '100%',
        width: '100%',
        borderRadius: 14,

        resizeMode: 'cover'
    },
    streamCardPast: {

        width: '100%',
        marginVertical:pixelSizeVertical(8),
        height: heightPixel(180),
        borderRadius: 14,
        alignItems: "center",
        justifyContent: 'center',
        overflow: 'hidden'
    },
    flatList: {
        width: '90%',

        flex: 1,


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
})

export default AllPastStreams;
