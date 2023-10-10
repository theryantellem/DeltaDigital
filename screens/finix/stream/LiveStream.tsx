import React from 'react';

import {Text, View, StyleSheet, RefreshControl, ScrollView, ImageBackground, Image} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import Colors from "../../../constants/Colors";
import {fontPixel, heightPixel, widthPixel} from "../../../helpers/normalize";
import HeaderWithTitle from "../../../components/cyborg/header/HeaderWithTitle";
import {Fonts} from "../../../constants/Fonts";

const LiveStream = () => {
    return (
        <SafeAreaView style={styles.safeArea}>

            <HeaderWithTitle title="Live Stream"/>
            <ScrollView style={{width: '100%',}} contentContainerStyle={styles.scrollView} scrollEnabled
                        showsVerticalScrollIndicator={false}

            >

                <View style={styles.frameImageWrap}>
                    <Image style={styles.frameImage}
                           source={require('../../../assets/images/big_live_image.png')}/>

                </View>

                <View style={[styles.chatHeader, {
                    height: 100,
                }]}>
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

                            </View>

                            <View style={styles.chatBarBody}>
                                <Text style={styles.chatBarUsername}>
                                    Carlos Ardila
                                </Text>
                                <Text style={styles.chatBarText}>
                                    Name of the class
                                </Text>
                                <Text style={styles.chatBarText}>
                                    Category
                                </Text>
                            </View>
                        </View>

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
    chatBarInfo:{
       flexDirection:'row',
       alignItems:'center',
       justifyContent:'flex-start',
       width:'100%',
       height:'100%'
    },
    chatBarInfoImageWrap:{
        width:50,
        height:50,
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"#eee",
        marginRight:8,
    },
    chatBarBody:{

    },
    chatBarUsername:{
        fontFamily: Fonts.faktumBold,
        color: '#131313',
        fontSize: fontPixel(16),
    },
    chatBarText:{
        fontFamily: Fonts.faktumRegular,
        color: '#000',
        fontSize: fontPixel(16),
    },
    chatBarInfoImage:{
        width: '100%',
        height: '100%',
        resizeMode:'cover',
        alignItems:'center',

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
    }

})

export default LiveStream;
