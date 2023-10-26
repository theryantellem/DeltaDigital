import React, {useCallback, useEffect, useRef, useState} from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Pressable,
    ActivityIndicator,
    AppState,
    Button,
    Dimensions, ScrollView, Platform
} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {Ionicons} from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import {fontPixel, heightPixel, pixelSizeHorizontal} from "../../../helpers/normalize";
import {SafeAreaView} from "react-native-safe-area-context";
import {Fonts} from "../../../constants/Fonts";
import VideoPlayer from "react-native-media-console";
import {SignalStackScreenProps} from "../../../types";


import {Video, ResizeMode, Audio} from 'expo-av';
import {convertSecondsToTime} from "../../../helpers";
import {useAppDispatch} from "../../../app/hooks";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {enrollModule, updateWatchTime} from "../../../api/finix-api";
import {addNotificationItem} from "../../../app/slices/dataSlice";


if (Platform.OS === "ios") {
    Audio.setAudioModeAsync({playsInSilentModeIOS: true});
}
const VideoScreen = ({navigation, route}: SignalStackScreenProps<'VideoScreen'>) => {

    const dispatch = useAppDispatch()
    const queryClient = useQueryClient()
    const {videoTitle, videoUrl, description, completed, length, caption, posterImage, id} = route.params

    const [isVideoLoading, setIsVideoLoading] = useState(true)
    const [fullScreen, setFullScreen] = useState(false);
    const [paused, setPaused] = useState(true)
    const video = useRef(null);
    const [status, setStatus] = React.useState({});

    const [durationMillis, setDurationMillis] = useState(0)
    const [positionMillis, setPositionMillis] = useState(0);


    const {mutate, isLoading} = useMutation(['updateWatchTime'], updateWatchTime, {
        onSuccess: (data) => {

            if (data.success) {
                // fetchEducators()
                //refetch()

            /*    dispatch(addNotificationItem({
                    id: Math.random(),
                    type: 'success',
                    body: data.message,
                }))*/

                //  refetchFavs()
            } else {

            }

        },
        onSettled: () => {
            queryClient.invalidateQueries(['updateWatchTime']);
        }
    })

    const goBack = () => {

        const body = JSON.stringify({
            watch_time: positionMillis / 1000
        })

        mutate({body, id})
        navigation.goBack()
    }

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (nextAppState.match(/inactive|background/)) {
                setPaused(true); // something like this
            }
        });

        return () => subscription.remove();
    }, []);


    // Set video dimension based on its width, so the video doesn't stretched on any devices.
    // The video dimension ratio is 11 : 9 for width and height
    let videoWidth = Dimensions.get('window').width;


//updateWatchTime
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="dark"/>
            <View style={styles.topBar}>
                <TouchableOpacity style={[styles.backBtn, {}]} onPress={goBack}>
                    <Ionicons name="md-chevron-back" color={Colors.textDark} size={heightPixel(24)}/>

                </TouchableOpacity>

                <Pressable style={[styles.titleWrap, {}]}>


                    <Text style={styles.title}>
                        {videoTitle}
                    </Text>

                </Pressable>
                <TouchableOpacity style={styles.rightBtn}>


                </TouchableOpacity>

            </View>
            {/* {
                isLoading &&

                <View style={styles.scrollView}>
                    <ActivityIndicator color={Colors.primary} size={'large'}/>
                </View>
            }
            */}
            <ScrollView style={{
                width: '100%',
                marginBottom: 50,
            }} contentContainerStyle={styles.scrollView} scrollEnabled
                        showsVerticalScrollIndicator={false}>
                <View style={[styles.videoContainer]}>

                    {
                        isVideoLoading &&
                        <View style={styles.videoLoader}>
                            <ActivityIndicator color={Colors.primary} size={'small'}/>

                        </View>
                    }
                    <Video

                        rate={1.0}

                        //    playsInSilentLockedModeIOS={ true }
                        onLoad={(status) => {
                            // console.log(status)
                            setIsVideoLoading(!status.isLoaded)

                        }}
                        ref={video}
                        style={styles.video}
                        source={{
                            uri: videoUrl,
                        }}

                        // posterSource={{uri:posterImage}}
                        // usePoster

                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        onPlaybackStatusUpdate={status => {
                            setStatus(() => status)
                            // console.log(status.durationMillis)
                            setDurationMillis(status.durationMillis)
                            setPositionMillis(status.positionMillis)
                        }}
                    />

                    <View style={styles.caption}>
                        <Text style={styles.captionText}>
                            {caption}
                        </Text>
                    </View>


                </View>


                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statTitleText}>
                            {completed}
                        </Text>
                        <Text style={styles.statBoxText}>
                            completed
                        </Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={[styles.statTitleText, {}]}>
                            {convertSecondsToTime(length)}
                        </Text>
                        <Text style={styles.statBoxText}>
                            Length
                        </Text>
                    </View>
                </View>

                <View style={styles.descriptionContainer}>
                    <View style={styles.descriptionBox}>
                        <Text style={styles.descriptionTitle}>
                            Description
                        </Text>
                    </View>

                    <View style={styles.descriptionTextWrap}>
                        <Text style={styles.descriptionText}>
                            {description}
                        </Text>
                    </View>

                </View>
            </ScrollView>
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
    scrollView: {
        backgroundColor: "#fff",
        width: '100%',
        alignItems: "center",
        // paddingHorizontal: 20,
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
    video: {
        alignSelf: 'center',
        width: '100%',
        height: heightPixel(500),
        alignItems: 'center',
        justifyContent: 'center',
    },
    videoContainer: {
        height: heightPixel(500),
        width: '100%',
        alignItems: 'center',
    },
    descriptionContainer: {
        width: '100%',
        alignItems: 'flex-start',

    },
    descriptionBox: {
        height: heightPixel(60),
        paddingHorizontal: pixelSizeHorizontal(20),
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        borderBottomColor: Colors.border,
        borderBottomWidth: 0.5,
    },
    descriptionTitle: {
        color: Colors.textDark,
        textTransform: 'capitalize',
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumSemiBold
    },

    descriptionTextWrap: {
        paddingHorizontal: pixelSizeHorizontal(20),
        width: '100%',
        marginTop: 15,
    },
    descriptionText: {
        color: Colors.textDark,
        textTransform: 'capitalize',
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumRegular
    },
    statsContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: "space-evenly",
        flexDirection: 'row',
        height: 80,
        borderBottomColor: Colors.border,
        borderBottomWidth: 0.5,
        paddingHorizontal: pixelSizeHorizontal(20),
    },
    statBox: {

        minWidth: 120,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',

    },
    statTitleText: {
        color: Colors.textDark,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumBold
    },
    statBoxText: {
        color: "#3f3f3f",
        textTransform: 'capitalize',
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumMedium
    },
    caption: {
        position: 'absolute',
        width: '80%',
        alignItems: 'center',
        minHeight: 40,
        justifyContent: 'center',

    },
    captionText: {
        color: Colors.tintText,
        textTransform: 'capitalize',
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumMedium
    },
    videoLoader: {
        position: 'absolute',
        width: '80%',
        alignItems: 'center',

        justifyContent: 'center',
        top: 100
    }


})

export default VideoScreen;
