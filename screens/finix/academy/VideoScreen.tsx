import React, {useCallback, useEffect, useRef, useState} from 'react';

import {Text, View, StyleSheet, TouchableOpacity, Pressable, ActivityIndicator, AppState} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {Ionicons} from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import {fontPixel, heightPixel, pixelSizeHorizontal} from "../../../helpers/normalize";
import {SafeAreaView} from "react-native-safe-area-context";
import {Fonts} from "../../../constants/Fonts";
import VideoPlayer from "react-native-media-console";
import {SignalStackScreenProps} from "../../../types";

const VideoScreen = ({navigation,route}: SignalStackScreenProps<'VideoScreen'>) => {
    const  {videoTitle,videoUrl} = route.params
    const [fullScreen, setFullScreen] = useState(false);
    const [paused, setPaused] = useState(true)
    const video = useRef(null);
    const goBack = () => {
    setPaused(true)
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

            <View style={[styles.videoContainer]}>
                <VideoPlayer
//isFullscreen

                    toggleResizeModeOnFullscreen
                    onEnterFullscreen={() => setFullScreen(true)}
                    fullscreen={fullScreen}
                    fullscreenAutorotate
                    fullscreenOrientation='all'
                    playWhenInactive={false}
                    playInBackground={false}
                    paused={paused}
                    pictureInPicture
                    containerStyle={styles.video}
                    videoRef={video}
                    source={{uri: videoUrl}}
                    navigator={navigation}

                    showDuration

                    seekColor={Colors.primary}
                />
            </View>
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
        maxHeight: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    videoContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
})

export default VideoScreen;
