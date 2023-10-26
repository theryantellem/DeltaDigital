import {View, Text, TouchableOpacity, Touchable, Image, Pressable, ScrollView, ActivityIndicator,StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ResizeMode, Video} from 'expo-av';
import Slider from '@react-native-community/slider';
import {SignalStackScreenProps} from "../../../types";
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import {Ionicons} from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../../../helpers/normalize";
import {convertSecondsToTime} from "../../../helpers";
import {Fonts} from "../../../constants/Fonts";


const ViewVideo = ({route,navigation}: SignalStackScreenProps<'ViewVideo'>) => {

    const {file} = route.params
    //console.log(videoUrl)



    const [isVideoLoading, setIsVideoLoading] = useState(true)
    const [fullScreen, setFullScreen] = useState(false);

    const video = useRef(null);
    const [status, setStatus] = React.useState({});


const goBack = () => {
    navigation.goBack()
}

    //
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="dark"/>
            <View style={styles.topBar}>
                <TouchableOpacity style={[styles.backBtn, {}]} onPress={goBack}>
                    <Ionicons name="md-chevron-back" color={Colors.textDark} size={heightPixel(24)}/>

                </TouchableOpacity>

                <Pressable style={[styles.titleWrap, {}]}>


                    <Text style={styles.title}>

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
                            uri: file,
                        }}



                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        onPlaybackStatusUpdate={status => {
                            setStatus(() => status)
                           // console.log(status)
                        }}

                    />




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
     flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    videoContainer: {
        height:heightPixel(700),
        width: '100%',
        alignItems: 'center',
    },
    videoLoader:{
        position: 'absolute',
        width: '80%',
        alignItems: 'center',

        justifyContent: 'center',
        top:100
    }
})
export default ViewVideo;

