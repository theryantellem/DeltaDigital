import React from 'react';

import {Text, View, StyleSheet, Image, ImageBackground, ScrollView} from 'react-native';
import HeaderWithTitle from "../../components/cyborg/header/HeaderWithTitle";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical} from "../../helpers/normalize";
import {Fonts} from "../../constants/Fonts";
import {SafeAreaView} from "react-native-safe-area-context";
import FastImage from "react-native-fast-image";
import {SignalStackScreenProps} from "../../types";
import {useAppDispatch} from "../../app/hooks";
import Colors from "../../constants/Colors";
import Pinchable from "react-native-pinchable";
import dayjs from "dayjs";

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const SignalImageDetails = ({navigation, route}:SignalStackScreenProps<'SignalImageDetails'>) => {
    const dispatch = useAppDispatch()
    const {details} = route.params

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={require('../../assets/images/signal/streamer_BG.png')}
                             resizeMode={'cover'}
                             style={styles.dashboardImage}>

                <HeaderWithTitle title="Signal Details"/>
                <ScrollView style={{
                    width: '100%'
                }} contentContainerStyle={styles.scrollView} scrollEnabled
                            showsVerticalScrollIndicator={false}
                >

<View style={styles.containerWrap}>
                    <View style={[styles.category,{
                        backgroundColor:Colors.primary,
                    }]}>
                        <Text style={styles.categoryText}>
                            {details.category.name}
                        </Text>
                    </View>

    <View style={[styles.category,{
        marginLeft:5,
      //  backgroundColor: Colors.purplePrimary
    }]}>
                        <Text style={[styles.categoryText,{

                        }]}>

                            {
                                dayjs(details.created_at).fromNow()
                            }
                        </Text>
                    </View>
</View>

                        <Pinchable style={styles.qrBoxWrap}>
                        <FastImage
                            style={styles.chart_photo}
                            source={{
                                uri: details.chart_photo,
                                cache: FastImage.cacheControl.web,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        </Pinchable>




                    <View style={styles.note}>
                        <Text style={styles.noteText}>
                            <Text style={{fontFamily: Fonts.faktumBold}}>Note -</Text> {details.comment}
                        </Text>
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
    dashboardImage: {
        // paddingHorizontal: pixelSizeHorizontal(20),
        resizeMode: 'cover',
        width: '100%',
        flex: 1,
        borderRadius: 30,
        alignItems: 'center',

    },
    scrollView: {
        width: '100%',
        alignItems: 'center',

    },
    qrBoxWrap: {

        marginVertical: pixelSizeVertical(10),
        width: '90%',
        height: heightPixel(400),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "space-between",


    },
    chart_photo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',

    },
    imageCover: {
        alignSelf: 'center',
        marginBottom: 15,
        height: 65,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    note: {
        minHeight: 50,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    noteText: {
        color: Colors.text,
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumMedium,
    },
    pinchable: {
        flex: 1,

    },
    containerWrap:{
        width:'90%',

        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start'
    },
    category:{
        minWidth:70,
        paddingHorizontal:pixelSizeHorizontal(5),
        height:25,
        borderRadius:8,

        alignSelf:'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryText:{
        color: Colors.text,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumSemiBold,
    }
})

export default SignalImageDetails;
