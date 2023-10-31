import React, {useEffect, useRef, useState} from 'react';

import {
    Text,
    View,
    StyleSheet,
    RefreshControl,
    ScrollView,
    ImageBackground,
    Image,
    TouchableOpacity, Pressable, Platform, TextInput, ActivityIndicator, KeyboardAvoidingView, Keyboard
} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import Colors from "../../../constants/Colors";
import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../../../helpers/normalize";

import {Fonts} from "../../../constants/Fonts";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";
import {SignalStackScreenProps} from "../../../types";
import {Audio, AVPlaybackStatusSuccess, ResizeMode, Video} from "expo-av";

import {StatusBar} from "expo-status-bar";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";


// At the top where our imports are...
import VideoPlayer from 'react-native-media-console';
import {
    Pusher,
    PusherMember,
    PusherChannel,
    PusherEvent, PusherAuthorizerResult,
} from '@pusher/pusher-websocket-react-native';
import {addSingleMessage} from "../../../app/slices/dataSlice";
import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getAlMessage, getLiveMessage, sendMessage, sendMessageLive, userJoinLive} from "../../../api/finix-api";
import LiveMessages from "./LiveMessages";
import {useRefreshOnFocus} from "../../../helpers";


const WatchLiveStream = ({navigation, route}: SignalStackScreenProps<'WatchLiveStream'>) => {


    const videoRef = useRef(null);

    const queryClient = useQueryClient()
    const pusher = Pusher.getInstance();
    const {stream_url, photo, last_name, first_name, educatorId, schedule} = route.params
    const [text, setText] = useState('')
    const [isVideoLoading, setIsVideoLoading] = useState(false);
    const [status, setStatus] = React.useState({});
    const {data: userJoin, refetch: joinLive, isLoading: loadingJoined} = useQuery(['userJoinLive', schedule?.id], () => userJoinLive(schedule?.id))

    const [fullScreen, setFullScreen] = useState(false);

    const {

        data,
        error,
        isRefetching,
        isFetching,
        isLoading,
        refetch,
        isFetchingNextPage,
        isFetchingPreviousPage,
        fetchNextPage,

        fetchPreviousPage,
        isError,
        hasNextPage,
        hasPreviousPage,
    } = useInfiniteQuery(
        [`all-live-messages`, educatorId], async ({pageParam = 1}) => getLiveMessage.messages({
            pageParam,
            id: educatorId
        }),
        {
            refetchInterval: 1000,
            refetchOnMount: true,
            getNextPageParam: lastPage => {
                if (lastPage.next !== null) {
                    return lastPage.next;
                }

                return lastPage;
            },
            getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,

        },
    )
    const {isLoading: isSending, mutate} = useMutation(['sendMessage-live'], sendMessageLive, {
        onSuccess: (data) => {
            Keyboard.dismiss()
            if (data.success) {
                setText('')
                refetch()
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries(['sendMessage-live']);
        }

    })


    const handleNewMessage = (message: string) => {

        const body = JSON.stringify({
            message
        })
        mutate({body, id: educatorId})

    }

    const goBack = () => {
        navigation.goBack()
    }

    useRefreshOnFocus(refetch)
    // useRefreshOnFocus(joinLive)
//console.log(stream_url)
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="dark"/>
            <View style={styles.topBar}>
                <TouchableOpacity style={[styles.backBtn, {}]} onPress={goBack}>
                    <Ionicons name="md-chevron-back" color={Colors.textDark} size={heightPixel(24)}/>

                </TouchableOpacity>

                <Pressable style={[styles.titleWrap, {}]}>


                    <Text style={styles.title}>
                        {first_name} - Live
                    </Text>

                </Pressable>
                <TouchableOpacity style={styles.rightBtn}>


                </TouchableOpacity>

            </View>


            <View style={styles.frameImageWrap}>


                {Platform.OS == 'android' &&
                    <VideoPlayer
                        isFullscreen={fullScreen}
                        toggleResizeModeOnFullscreen
                        onEnterFullscreen={() => setFullScreen(true)}
                        fullscreen={fullScreen}
                        fullscreenAutorotate
                        fullscreenOrientation='all'
                        pictureInPicture
                        containerStyle={styles.frameImage}
                        videoRef={videoRef}

                        source={{uri: stream_url}}
                        navigator={navigation}
                        showDuration

                        seekColor={Colors.primary}
                    />

                }


                {
                    Platform.OS == 'ios' &&


                    <Video
                        rate={1.0}
                        isMuted={false}
                        volume={1.0}

                        onLoad={(status) => {

                            setIsVideoLoading(!status.isLoaded)
                        }}
                        ref={videoRef}
                        style={styles.frameImage}
                        source={{
                            uri: stream_url,
                            type: 'm3u8',
                            overrideFileExtensionAndroid: 'm3u8'

                        }}

                        posterSource={{uri: photo}}
                        // usePoster
                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        shouldPlay


                        //onPlaybackStatusUpdate={(status: AVPlaybackStatusSuccess) => setStatus(() => { return { isPlaying: status.isPlaying } })}
                        onError={(err) => console.error("Playback error", err)}
                    />
                }


                {
                    userJoin &&

                    <View style={styles.streamerInfo}>
                        <FontAwesome5 name="users" size={16} color="#fff"/>
                        <Text style={styles.streamerInfoText}>
                            {userJoin?.viewers}
                        </Text>
                    </View>
                }
            </View>

            <View style={[styles.chatHeader, {height: 100,}]}>
                {/* <View style={styles.chatBar}>
                            <Text style={styles.barTitle}> CHAT
                            </Text>

                            <View style={styles.rightChatBar}>


                                <Text style={[styles.logoName, {}]}>
                                    Finix
                                </Text>
                                <View style={styles.logoWrap}>
                                    <Image source={require('../../../assets/images/logos/finixLogo.png')}
                                           style={styles.logoImage}/>
                                </View>

                            </View>
                        </View>*/}

                <View style={styles.chatBar}>

                    <View style={styles.chatBarInfo}>
                        <View style={styles.chatBarInfoImageWrap}>
                            <Image
                                source={{uri: photo ? photo : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8LAAN2VZp-LTwmGGioHuiQz4CdF3M239RgLxzQaqwCg&s'}}
                                style={styles.educatorImage}/>

                        </View>

                        <View style={styles.chatBarBody}>
                            <Text style={styles.chatBarUsername}>
                                {first_name} {last_name}
                            </Text>
                            <Text style={styles.chatBarText}>
                                {schedule?.name}
                            </Text>
                            <Text style={styles.chatBarText}>
                                {schedule?.category?.name}
                            </Text>

                        </View>
                    </View>

                </View>

            </View>

            <View style={styles.flatList}>
                {
                    !isLoading && data && data?.pages[0]?.data &&

                    <LiveMessages messages={data?.pages[0]?.data.reverse()}/>
                }
            </View>

            <KeyboardAvoidingView
                //behavior="position"
                behavior={"padding"}
                keyboardVerticalOffset={30}
                style={{width: '100%',}} contentContainerStyle={styles.scrollView}


            >
                <View style={styles.innerContainer}>
                    <View style={styles.inputAndMicrophone}>

                        <TextInput


                            placeholder={"Send a message"}
                            style={styles.input}
                            value={text}

                            placeholderTextColor={Colors.textDark}
                            onChangeText={(text) => setText(text)}
                        />


                        {
                            isSending && <ActivityIndicator size='small' color={Colors.primary}/>
                        }
                        {
                            !isSending &&

                            <TouchableOpacity onPress={() => handleNewMessage(text)}
                                              style={styles.rightIconButtonStyle}>

                                <Ionicons name="paper-plane-outline" size={24} color={Colors.textDark}/>
                            </TouchableOpacity>
                        }

                    </View>

                </View>
            </KeyboardAvoidingView>

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
    topBar: {
        height: heightPixel(80),
        width: '100%',
        paddingHorizontal: pixelSizeHorizontal(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#fff",
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
    background: {

        //  paddingHorizontal: 20,
        flex: 1,
        width: '100%',
        alignItems: "center"
    },
    scrollView: {
        backgroundColor: "#fff",
        width: '100%',
        alignItems: "center",
        // paddingHorizontal: 20,
    },
    dashboardImage: {
        // paddingHorizontal: pixelSizeHorizontal(20),
        resizeMode: 'cover',
        width: '100%',
        flex: 1,
        borderRadius: 30,
        alignItems: 'center',

    },
    frameImageWrap: {
        width: '100%',
        height: heightPixel(230),
        alignItems: 'center',
        justifyContent: 'center'
    },

    frameImage: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
    chatHeader: {
        backgroundColor: "#fff",
        width: '100%',
        height: 50,
        borderBottomWidth: 0.5,
        borderBottomColor: "#606060",
        justifyContent: 'center',
        alignItems: 'center',
    },

    chatBar: {
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '80%',
        flexDirection: 'row'
    },
    chatBarInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%'
    },
    chatBarInfoImageWrap: {
        width: 50,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#eee",
        marginRight: 8,
    },
    educatorImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        overflow: 'hidden'
    },
    chatBarBody: {},
    chatBarUsername: {
        fontFamily: Fonts.faktumBold,
        color: '#131313',
        fontSize: fontPixel(16),
    },
    chatBarText: {
        fontFamily: Fonts.faktumRegular,
        color: '#000',
        fontSize: fontPixel(14),
    },
    chatBarInfoImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        alignItems: 'center',

    },
    barTitle: {
        fontFamily: Fonts.faktumBold,
        color: '#131313',
        fontSize: fontPixel(16),
    },
    rightChatBar: {
        width: widthPixel(75),
        height: '90%',

        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    topButton: {
        width: 35,
        height: 35,
        // backgroundColor:Colors.text,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoWrap: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },

    logoImage:
        {
            width: '100%',
            height: '100%',
            resizeMode: 'contain'
        },
    logoName: {
        fontFamily: Fonts.faktumMedium,
        color: '#131313',
        fontSize: fontPixel(18),
    },
    innerContainer: {

        paddingHorizontal: 10,
        marginHorizontal: 10,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 10,
    },
    inputAndMicrophone: {
        flexDirection: "row",
        backgroundColor: "#D9D9D9",
        flex: 3,
        height: 60,
        marginRight: 10,
        paddingVertical: Platform.OS === "ios" ? 10 : 0,
        borderRadius: 10,
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "space-between",
    },
    input: {
        backgroundColor: "transparent",

        color: Colors.textDark,
        width: "80%",
        fontFamily: Fonts.faktumMedium,
        fontSize: fontPixel(14),
        height: '100%',

        justifyContent: 'center',
        alignSelf: "center",
        alignItems: 'center'
    },
    rightIconButtonStyle: {
        justifyContent: "center",
        alignItems: "center",


    }, flatList: {
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
        flexDirection: "row",
        alignItems: 'center',
        minWidth: 50,

        paddingHorizontal: pixelSizeHorizontal(8),
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
    },
    streamerInfoText: {
        marginLeft: 5,
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(14),
        color: Colors.text
    },
    video: {
        alignSelf: 'center',
        width: '100%',
        maxHeight: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default WatchLiveStream;
