import React, {useCallback, useState} from 'react';

import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {FontAwesome5, Ionicons, Octicons} from "@expo/vector-icons";
import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../../helpers/normalize";
import {Fonts} from "../../constants/Fonts";
import FastImage from "react-native-fast-image";
import {useAppSelector} from "../../app/hooks";
import Colors from "../../constants/Colors";


interface props {
    profilePhoto?: string,
    userName?: string,
    homeDash?: boolean,
}

const TopBar = ({ profilePhoto, userName,homeDash}: props) => {

    const navigation = useNavigation()


    const user = useAppSelector(state => state.user)
    const {User_Details} = user
    const openNotifications = () => {
       navigation.navigate('NewsScreen')
    }
    const openProfile = () => {
       navigation.navigate('UserAccount')
    }
    const openAssets = () => {
       navigation.navigate('Assets')
    }

    const [greeting, setGreeting] = useState('');
    useFocusEffect(
        useCallback(() => {
            // Do something when the screen is focused
            const hour = new Date().getHours();
            const welcomeTypes = ["Morning",
                "Good Day",
                "Hi",];
            let welcomeText = "";

            if (hour <= 12) welcomeText = welcomeTypes[0];
            else if (hour < 10) welcomeText = welcomeTypes[3];
            else if (hour < 18) welcomeText = welcomeTypes[1];
            else welcomeText = welcomeTypes[2]

            setGreeting(welcomeText)
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );


    return (
        <View style={[styles.topBar,{
            width:homeDash ? '90%' : '100%',
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
                    <Text style={styles.greeting}>
                       {userName}
                    </Text>
                    <Text style={styles.tag}>
                        {User_Details.plan}
                    </Text>
                </View>
            </TouchableOpacity>

            <View style={styles.rightButton}>

                <TouchableOpacity onPress={openNotifications} activeOpacity={0.6} style={styles.topButton}>
                    <Octicons name="bell" size={18} color="#fff"/>

                </TouchableOpacity>

                <TouchableOpacity onPress={openAssets} activeOpacity={0.6} style={styles.topButton}>

                    <Ionicons name="md-wallet-outline" size={20} color={Colors.text} />

                </TouchableOpacity>


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
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(14),
        color: "#fff",
        textTransform:'capitalize'
    },
    tag: {
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(12),
        color: "#D9D9D9",
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
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topButton:{
        width:35,
        height:35,
       // backgroundColor:Colors.text,
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default TopBar;
