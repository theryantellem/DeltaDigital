import React from 'react';

import {Text, View, StyleSheet, Platform, ScrollView, TouchableOpacity} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical} from "../../../helpers/normalize";
import TopBar from "../../../components/header/TopBar";
import {Fonts} from "../../../constants/Fonts";
import Colors from "../../../constants/Colors";
import {Ionicons} from "@expo/vector-icons";

const MoreScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#4E044B', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}
            >


                <ScrollView  style={{width: '100%',}} contentContainerStyle={styles.scrollView} scrollEnabled
                             showsVerticalScrollIndicator={false}>

                    <TopBar
                        profilePhoto={'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'}
                        userName={'Orji'}/>



                    <View style={styles.buttonContainer}>
                        <View style={styles.moreButtonContainer}>
                            <TouchableOpacity activeOpacity={0.6} style={styles.dashButton}>
                                <View style={styles.dashIcon}>

                                </View>
                                <Text style={styles.dashText}>
                                    Pay
                                </Text>

                            </TouchableOpacity>


                            <TouchableOpacity activeOpacity={0.6} style={styles.dashButton}>
                                <View style={styles.dashIcon}>

                                </View>
                                <Text style={styles.dashText}>
                                    Spending
                                </Text>
                            </TouchableOpacity>




                            <TouchableOpacity activeOpacity={0.6} style={styles.dashButton}>
                                <View style={styles.dashIcon}>
                                    <Ionicons name="card-outline" size={24} color="#fff"/>
                                </View>
                                <Text style={styles.dashText}>
                                    Cards
                                </Text>
                            </TouchableOpacity>



                        </View>


                        <View style={styles.moreButtonContainer}>


                            <TouchableOpacity  activeOpacity={0.6} style={styles.dashButton}>
                                <View style={[styles.dashIcon,
                                    {backgroundColor: Colors.secondary}]}>

                                </View>
                                <Text style={styles.dashText}>
                                    Save
                                </Text>
                            </TouchableOpacity>


                            <TouchableOpacity activeOpacity={0.6} style={styles.dashButton}>
                                <View style={styles.dashIcon}>

                                </View>
                                <Text style={styles.dashText}>
                                    Budget
                                </Text>

                            </TouchableOpacity>


                            <TouchableOpacity disabled activeOpacity={0.6} style={styles.dashButton}>
                                <View style={[styles.dashIcon,]}>

                                </View>
                                <Text style={styles.dashText}>
                                    Earn
                                </Text>
                            </TouchableOpacity>



                        </View>



                        <View style={styles.moreButtonContainer}>


                            <TouchableOpacity activeOpacity={0.6} style={styles.dashButton}>
                                <View style={[styles.dashIcon]}>
                                    <Ionicons name="md-bar-chart-outline" size={20} color="#fff"/>
                                </View>
                                <Text style={styles.dashText}>
                                    Invest
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity disabled activeOpacity={0.6} style={styles.dashButton}>
                                <View style={[styles.dashIcon,{

                                }]}>

                                </View>
                                <Text style={styles.dashText}>
                                    Loan
                                </Text>
                            </TouchableOpacity>



                            <TouchableOpacity activeOpacity={0.6} style={styles.dashButton}>
                                <View style={[styles.dashIcon,{    }]}>
                                    <Ionicons name="md-bar-chart-outline" size={20} color="#fff"/>
                                </View>
                                <Text style={styles.dashText}>
                                    Invest
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>



                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        width: '100%',
        backgroundColor: "#141621",
        alignItems: 'center',
        paddingBottom: Platform.OS === 'ios' ? -40 : 0
    },
    scrollView: {

        width: '100%',
        alignItems: 'center'
    },
    background: {
        flex: 1,
        width: '100%',
        paddingHorizontal: pixelSizeHorizontal(20),
    },


    buttonContainer: {
        height: heightPixel(220),

        width: '100%',

        alignItems: 'center',

        justifyContent: 'space-between',
    },
    moreButtonContainer: {
        width: '100%',
        height: heightPixel(120),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    dashButton: {
        width: heightPixel(85),
        height: heightPixel(80),

        alignItems: 'center',
        justifyContent: 'space-between'

    },
    dashIcon: {
        width: 55,
        height: 55,
        backgroundColor: Colors.secondary,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: "center"
    },
    dashText: {
        color: Colors.text,
        fontSize: fontPixel(14),
        fontFamily:Fonts.faktumRegular
    },
    mainCard: {
        backgroundColor: '#fff',
        marginVertical: pixelSizeVertical(20),
        height: heightPixel(390),
        width: '100%'
    },
    row: {
        paddingHorizontal: pixelSizeHorizontal(15),
        height: heightPixel(65),
        width: '100%',
        alignItems: "center",
        borderBottomColor: "#E5E7EB",
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowHeadIcon:{
        width: '10%',
        height: '100%',
        alignItems: 'center',
        justifyContent:'center'
    },
    rowHead: {
        width: '80%',
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
        justifyContent:'flex-start'
    },
    rowTitle: {
        width:'80%',
        marginLeft: 5,
        fontFamily: Fonts.faktumMedium,
        color: Colors.textDark,
        fontSize: fontPixel(16)
    },
    mainCardTitle: {
        marginLeft:5,
        fontFamily: Fonts.faktumSemiBold,
        color: Colors.textDark,
        fontSize: fontPixel(16)
    }
})

export default MoreScreen;
