import React from 'react';

import {Text, View, StyleSheet, ScrollView, TouchableOpacity, ImageBackground} from 'react-native';
import FastImage from "react-native-fast-image";
import {SafeAreaView} from "react-native-safe-area-context";
import {Ionicons, SimpleLineIcons} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { LinearGradient } from 'expo-linear-gradient';
import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../../helpers/normalize";
import {Fonts} from "../../constants/Fonts";
import {SignalRootTabScreenProps, SignalStackScreenProps} from "../../types";
import {MyButton} from "../../components/MyButton";

const ViewEducator = ({navigation,route}:SignalStackScreenProps<'ViewEducator'>) => {

    const {educator} = route.params

    const goBackNow = () => {
        navigation.goBack()
    }
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

            <ImageBackground style={styles.bannerTop} source={require('../../assets/images/signal/streamer_BG.png')}>


            <View style={styles.topBar}>
                <TouchableOpacity onPress={goBackNow} style={[styles.backBtn, {

                }]} >
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



                <View  style={styles.favList}>
                    <View style={[styles.listIcon, {
                        //  backgroundColor: Colors.secondary,
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
                                {educator.total_followers} <Text style={{fontFamily:Fonts.faktumRegular}}>followers </Text>
                            </Text>

                        </View>

                    </View>


                    <MyButton  style={[styles.listBodyRight, {
                        // backgroundColor: !isValid ? Colors.border : Colors.primary
                    }]}>
                        <LinearGradient style={styles.createBtnGradient}
                                        colors={['#8D34F1' ,  '#0075FF' ]}

                                        start={{x: 0.3, y: 1}}
                                        end={{x: 1, y: 3.3,}}

                            // locations={[0.1, 0.7,]}
                        >
                            <Text style={styles.buttonTxt}>
                                Following
                            </Text>

                        </LinearGradient>
                    </MyButton>



                </View>
            </ImageBackground>






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
        flex:1,
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
    bannerTop:{
        width:'100%',
        alignItems:'center',
        justifyContent:'flex-start',
        height:heightPixel(200),
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
        borderRadius:10,
        width: 100,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    followText:{
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
        color:Colors.tintText
    },
    listBottom: {
        width: '100%',
        height: '40%',
        flexDirection: 'row',
        alignItems: 'center',
    },



})

export default ViewEducator;
