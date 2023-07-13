import React from 'react';

import {Text, View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import HeaderWithTitle from "../../../components/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import Colors from "../../../constants/Colors";
import {fontPixel, heightPixel, pixelSizeVertical} from "../../../helpers/normalize";
import {Fonts} from "../../../constants/Fonts";

const ApiBinding = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#04074E', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >


                <HeaderWithTitle title='API Binding'/>
                <ScrollView style={{
                    width: '100%'
                }} contentContainerStyle={styles.scrollView} scrollEnabled
                            showsVerticalScrollIndicator={false}>

                    <View style={styles.content}>
                    <View style={styles.appListCard}>
                        <View style={styles.listTop}>


                            <View style={styles.listTopLeft}>
                                <View style={styles.appIconWrap}>

                                </View>
                                <Text style={[styles.appText, {
                                    color: Colors.text
                                }]}>
                                    Coinbase
                                </Text>
                            </View>
                            <TouchableOpacity  activeOpacity={0.8}
                                              style={styles.connectBtn}>

                                <Text style={[styles.appText, {
                                    color: Colors.primary
                                }]}>
                                    Unbound
                                </Text>


                            </TouchableOpacity>
                        </View>

                    </View>
                    </View>
                </ScrollView>
            </LinearGradient>
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
    background: {

        flex: 1,
        width: '100%',
        alignItems: "center"
    },
    scrollView: {
        width: '100%',
        alignItems: "center"
    },
    appListCard: {

        width: '90%',
        borderBottomColor: Colors.borderColor,
        borderBottomWidth: 1,
        paddingVertical: pixelSizeVertical(12),
        minHeight: heightPixel(60),
        alignItems: 'center'
    },
    listTop: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',

        justifyContent: 'space-between',
        height: heightPixel(60)
    },
    listTopLeft: {
        width: '60%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
    },
    appIconWrap: {
        marginRight: 8,
        width: 40,
        height: 40,
        borderRadius: 60,
        backgroundColor: Colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    appText: {

        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumSemiBold
    },
    listBody: {
        width: '100%',
        paddingVertical: pixelSizeVertical(5)
    },
    listBodyText: {
        color: "#6B7280",
        fontSize: fontPixel(14),

        fontFamily: Fonts.faktumRegular
    },
    content: {

        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default ApiBinding;
