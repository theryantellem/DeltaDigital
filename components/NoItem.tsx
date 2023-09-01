import React from 'react';

import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {fontPixel, heightPixel, pixelSizeHorizontal} from "../helpers/normalize";
import {Fonts} from "../constants/Fonts";
import Animated, {
    Easing, FadeInDown, FadeOutDown,
    Layout,
} from 'react-native-reanimated';

import {Ionicons} from "@expo/vector-icons";
import Colors from "../constants/Colors";


interface props {
    addButton?: boolean,
    fileBroken?: boolean,
    message: string,
    type?: string
    action?: () => void,
    btnText?: string,

}

const NoItem = ({message, addButton,action,btnText}: props) => {
    return (
        <Animated.View key={message}
                       layout={Layout.easing(Easing.bounce).delay(50)}
                       entering={FadeInDown} exiting={FadeOutDown} style={[styles.noItem, {
            height: addButton ? heightPixel(320) : heightPixel(200),
            justifyContent: addButton ? 'space-evenly' : 'center',
        }]}>
            <View style={styles.imageWrap}>

             <Image source={require('../assets/images/EmptyBox/Pack.png')} style={styles.fileBroken}/>


            </View>

            <View style={styles.messageWrap}>
                <Text style={styles.message}>
                    {message}

                </Text>
            </View>

            {addButton &&
                <TouchableOpacity onPress={action} style={[styles.button, {
                    position: 'relative',
                }]}>
                    <Ionicons name="md-add" size={24} color={Colors.primary}/>
                    <Text style={styles.btnText}>

                        {btnText}
                    </Text>
                </TouchableOpacity>
            }
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    noItem: {
        marginTop:40,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        overflow: 'hidden'
    },
    fileBroken: {
        height: "80%",
        width: "100%",
        resizeMode: 'contain'
    },
    imageWrap: {
        maxHeight: heightPixel(240),
        width: heightPixel(200),
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageWrap: {
        marginTop: 15,
        width: '80%',
        alignItems: 'center'
    },
    message: {
        textAlign: 'center',
        lineHeight: heightPixel(25),
        color: "#6B7280",
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumRegular
    },
    button: {
        width: '90%',
        height: heightPixel(60),
        alignItems: 'center',

        borderRadius: 10,
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
        flexDirection: 'row'
    },
    btnText: {
        marginHorizontal: pixelSizeHorizontal(5),
        color: Colors.primary,
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumMedium
    },
})

export default NoItem;
