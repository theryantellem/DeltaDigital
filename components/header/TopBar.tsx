import React, {useCallback, useState} from 'react';

import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {Octicons} from "@expo/vector-icons";
import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../../helpers/normalize";
import {Fonts} from "../../constants/Fonts";


interface props {
    profilePhoto?: string,
    userName?: string,
}

const TopBar = ({ profilePhoto, userName}: props) => {

    const navigation = useNavigation()

    const openNotifications = () => {
       navigation.navigate('NewsScreen')
    }
    const openProfile = () => {
       navigation.navigate('Account')
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
        <View style={styles.topBar}>
            <TouchableOpacity onPress={openProfile} activeOpacity={0.8} style={styles.leftButton}>
                <View style={styles.userImageWrap}>

                    <Image
                        source={{uri: !profilePhoto ? 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' : profilePhoto}}
                        style={styles.userImage}/>
                </View>
                <View style={styles.userDetails}>
                    <Text style={styles.greeting}>
                        {greeting} {userName}
                    </Text>
                    <Text style={styles.tag}>
                        Welcome back
                    </Text>
                </View>
            </TouchableOpacity>

            <View style={styles.rightButton}>
                <TouchableOpacity onPress={openNotifications} activeOpacity={0.6}>
                    <Octicons name="bell" size={20} color="#fff"/>


                </TouchableOpacity>


            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    topBar: {
        width: '100%',
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
        width: widthPixel(50),
        height: '90%',

        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
})

export default TopBar;
