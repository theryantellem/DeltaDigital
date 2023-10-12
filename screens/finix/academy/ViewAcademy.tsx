import React, {useEffect} from 'react';

import {Text, View, StyleSheet, Image, ScrollView, Platform, UIManager, TouchableOpacity} from 'react-native';
import HeaderWithTitle from "../../../components/cyborg/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {fontPixel, heightPixel, pixelSizeHorizontal} from "../../../helpers/normalize";
import {Fonts} from "../../../constants/Fonts";
import {AccordionItem, AccordionList} from 'react-native-accordion-list-view';
import Colors from "../../../constants/Colors";
import {Ionicons} from "@expo/vector-icons";


const data = [
    {
        id: 0,
        title: 'Module 1: Primeros Pasos',
        subTitle: 'Here will be de description of the module 1',
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
        id: 1,
        title: 'Lorem Ipsum is simply dummy',
        subTitle: 'Here will be de description of the module 1',
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
        id: 2,
        subTitle: 'Here will be de description of the module 1',
        title: 'Lorem Ipsum is simply dummy',
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
        id: 3,
        subTitle: 'Here will be de description of the module 1',
        title: 'Lorem Ipsum is simply dummy',
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
];
const ViewAcademy = () => {

    useEffect(() => {
        if (Platform.OS === 'android') {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
                UIManager.setLayoutAnimationEnabledExperimental(true);
            }
        }
    }, []);

    const AccordionTitle = ({item}) => {
        return (
            <View style={styles.accordionHead}>
                <Text style={styles.accordionTitle}>{item.title}</Text>
                <Text style={styles.accordionSubTitle}>{item.subTitle}</Text>
            </View>
        )
    }

    const AccordionBody = ({item}) => {
        return (
            <View style={styles.accordionBody}>
                <TouchableOpacity activeOpacity={0.7} style={styles.accordionBodyButton}>
                    <View style={styles.playIcon}>
                        <Ionicons name="play" size={18} color="black"/>
                    </View>
                    <View style={styles.accordionBodyVideo}>
                        <Text style={styles.accordionVideoTitle}>Video 1.1: How to use cyborg</Text>
                        <Text>Description of the video</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.safeArea}>

            <HeaderWithTitle title="Live Stream"/>
            <View style={styles.scrollView}

            >

                <View style={styles.frameImageWrap}>
                    <Image style={styles.frameImage}
                           source={require('../../../assets/images/academy_cover_large.png')}/>

                </View>

                <View style={[styles.chatHeader]}>
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
                <AccordionList
                    data={data}
                    style={{
                        width:'95%'
                    }}
                    customTitle={(item) => <AccordionTitle item={item}/>}
                    customBody={(item) => <AccordionBody item={item}/>}
                    animationDuration={400}
                    defaultOpenIndices={[0, 1]}
                    expandMultiple={true}
                    containerItemStyle={{padding: 2}}
                    pressableProps={{
                        style: ({pressed}) => [
                            {

                                backgroundColor:
                                    pressed && Platform.OS == 'ios'
                                        ? 'rgb(210, 230, 255)'
                                        : 'transparent',
                            },
                        ],
                        android_ripple: {
                            color: 'rgb(210, 230, 255)',
                        },
                    }}
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
        height: 100,
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
    chatBarBody: {
        width: '80%',

        justifyContent: 'center',

    },
    chatBarUsername: {
        fontFamily: Fonts.faktumBold,
        color: '#131313',
        fontSize: fontPixel(16),
    },
    chatBarText: {
        fontFamily: Fonts.faktumRegular,
        color: '#000',
        fontSize: fontPixel(16),
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
    accordionHead: {
        width: '80%',
        height: 60,
        justifyContent: 'center',

    },
    accordionTitle: {
        fontFamily: Fonts.faktumBold,
        color: Colors.textDark,
        fontSize: fontPixel(16),
    },
    accordionSubTitle: {
        fontFamily: Fonts.faktumRegular,
        color: Colors.textDark,
        fontSize: fontPixel(14),
    },
    accordionBody: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: pixelSizeHorizontal(10),
    },
    accordionBodyButton: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    playIcon: {
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.border,
        borderWidth: 3,
        borderRadius: 40,
    },
    accordionBodyVideo:{
        marginLeft:10,
        justifyContent:'space-evenly',
        height:50,
    },
    accordionVideoTitle:{
        fontFamily: Fonts.faktumBold,
        color: "#6C6C6C",
        fontSize: fontPixel(14),
    }


})

export default ViewAcademy;
