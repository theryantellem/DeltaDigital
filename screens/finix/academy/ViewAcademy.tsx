import React from 'react';

import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import HeaderWithTitle from "../../../components/cyborg/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {heightPixel} from "../../../helpers/normalize";

const ViewAcademy = () => {
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
})

export default ViewAcademy;
