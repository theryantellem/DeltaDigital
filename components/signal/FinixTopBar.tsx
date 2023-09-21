import React, {useCallback, useState} from 'react';

import {Text, View, StyleSheet, TouchableOpacity, Image, Platform} from 'react-native';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {FontAwesome5, Ionicons, Octicons} from "@expo/vector-icons";
import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../../helpers/normalize";

import FastImage from "react-native-fast-image";
import {useAppSelector} from "../../app/hooks";
import {Fonts} from "../../constants/Fonts";


interface props {
    profilePhoto?: string,
    userName?: string,
    color?: string,
    homeDash?: boolean,
}

const FinixTopBar = ({profilePhoto, userName, homeDash,color}: props) => {

    const navigation = useNavigation()


    const user = useAppSelector(state => state.user)
    const {User_Details} = user

    const openProfile = () => {

        navigation.navigate('SignalBottomTab',{
            screen:'SignalSettings'
        })
    }
    return (
        <View style={[styles.topBar, {
            width: homeDash ? '90%' : '100%',
        }]}>
            <TouchableOpacity onPress={openProfile} activeOpacity={0.8} style={styles.leftButton}>
                <View style={styles.userImageWrap}>


                    <FastImage
                        style={styles.userImage}
                        source={{
                            uri: profilePhoto ? profilePhoto : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
                            cache: FastImage.cacheControl.web,
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </View>
                <View style={styles.userDetails}>
                    <Text style={[styles.greeting,{
                        color: color ? color : '#131313',
                    }]}>
                        {userName}
                    </Text>
                    {
                        Platform.OS == 'android' &&

                        <Text style={styles.tag}>
                            {User_Details.plan}
                        </Text>
                    }
                </View>
            </TouchableOpacity>

            <View style={styles.rightButton}>


                <Text style={[styles.greeting,{
                    fontFamily: Fonts.faktumMedium,
                    color: color ? color : '#131313',
                    fontSize: fontPixel(24),
                }]}>
                    Finix
                </Text>
                <Image source={require('../../assets/images/logos/finixLogo.png')} style={{
                    width: 30,
                    height: '40%',
                    resizeMode: 'cover'
                }}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    topBar: {

        height: heightPixel(90),

        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    topTabButtons: {
        width: '90%',
        height: heightPixel(60),
        justifyContent: 'flex-start'

    },


    leftButton: {
        width: '70%',
        height: '90%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    userDetails: {
        width: '73%',
        height: '50%',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        marginHorizontal: pixelSizeHorizontal(10)
    },
    greeting: {
        marginRight: 8,
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(14),
        color: "#131313",
        textTransform: 'capitalize'
    },
    tag: {
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(12),
        color: "#131313",
    },

    userImageWrap: {
        width: 42,
        height: 42,
        alignItems: 'center',
        borderRadius: 45,
        overflow: 'hidden'
    },
    userImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'

    },

    tAvatar: {
        borderRadius: 100,
        resizeMode: 'cover',
        width: '100%',
        height: '100%'
    },
    rightButton: {
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
    }
})

export default FinixTopBar;
