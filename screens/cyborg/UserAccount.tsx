import React from 'react';

import {Text, View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import HeaderWithTitle from "../../components/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import FastImage from "react-native-fast-image";
import {Feather, FontAwesome, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons} from '@expo/vector-icons';
import {fontPixel, heightPixel, widthPixel} from "../../helpers/normalize";
import Colors from "../../constants/Colors";
import {Fonts} from "../../constants/Fonts";
import HorizontalLine from "../../components/HorizontalLine";
import {RootStackScreenProps} from "../../types";


const UserAccount = ({navigation}:RootStackScreenProps<'UserAccount'>) => {

    const navigate = (screen:'Assets') => {
        navigation.navigate(screen)
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#4E044B', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >


                <HeaderWithTitle title='Profile'/>
                <ScrollView style={{
                    width: '100%'
                }} contentContainerStyle={styles.scrollView} scrollEnabled
                            showsVerticalScrollIndicator={false}>


                    <View style={styles.profileDetails}>
                        <View style={styles.profileImage}>


                            {


                                <FastImage
                                    style={styles.Avatar}
                                    source={{
                                        uri: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                                        cache: FastImage.cacheControl.web,
                                        priority: FastImage.priority.normal,
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                            }


                        </View>
                        <View style={styles.profileName}>
                            <Text style={styles.profileNameTxt}>
                                Kane samuel
                            </Text>
                        </View>

                        <TouchableOpacity activeOpacity={0.6}
                                          style={styles.editProfile}>
                            <Text style={styles.btnTxt}>
                                Edit profile
                            </Text>
                        </TouchableOpacity>


                        <View style={styles.braceIDContainer}>

                            <View style={styles.linkIcon}>
                                <FontAwesome name="diamond" size={20} color="#2EBD85"/>
                            </View>
                            <View style={styles.centerTextWrap}>
                                <Text style={styles.centerText}>
                                    Delta Digital Plus
                                </Text>
                                <Text style={styles.centerSubText}>
                                    Wed, 12 March 20223
                                </Text>
                            </View>

                            <View style={styles.rightIcon}>
                            </View>
                        </View>


                    </View>
                    <HorizontalLine margin={15}/>


                    <View style={styles.profileButtonContainer}>
                        <TouchableOpacity activeOpacity={0.6} style={styles.profileButton}>

                            <View style={styles.leftContent}>

                                <View style={styles.buttonIcon}>
                                    <Ionicons name="settings-outline" size={20} color={Colors.lightColor}/>
                                </View>
                                <Text style={styles.profileTxt}>
                                    Settings
                                </Text>
                            </View>

                            <Octicons name="chevron-right" size={20} color="#979797"/>


                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.6} style={styles.profileButton}>

                            <View style={styles.leftContent}>

                                <View style={styles.buttonIcon}>
                                    <Ionicons name="sync-sharp" size={20} color={Colors.lightColor}/>

                                </View>
                                <Text style={styles.profileTxt}>
                                    Synchronize strategy
                                </Text>
                            </View>

                            <Octicons name="chevron-right" size={20} color="#979797"/>


                        </TouchableOpacity>


                        <TouchableOpacity activeOpacity={0.6} style={styles.profileButton}>

                            <View style={styles.leftContent}>

                                <View style={styles.buttonIcon}>

                                    <Feather name="dollar-sign" size={20} color={Colors.lightColor}/>
                                </View>
                                <Text style={styles.profileTxt}>
                                    Earning
                                </Text>
                            </View>

                            <Octicons name="chevron-right" size={20} color="#979797"/>


                        </TouchableOpacity>


                        <TouchableOpacity activeOpacity={0.6} style={styles.profileButton}>

                            <View style={styles.leftContent}>

                                <View style={styles.buttonIcon}>
                                    <MaterialCommunityIcons name="connection" size={20} color={Colors.lightColor}/>

                                </View>
                                <Text style={styles.profileTxt}>
                                    Api binding
                                </Text>
                            </View>

                            <Octicons name="chevron-right" size={20} color="#979797"/>


                        </TouchableOpacity>


                        <TouchableOpacity onPress={()=>navigate('Assets')} activeOpacity={0.6} style={styles.profileButton}>

                            <View style={styles.leftContent}>

                                <View style={styles.buttonIcon}>

                                    <Foundation name="bitcoin" size={20} color={Colors.lightColor}/>
                                </View>
                                <Text style={styles.profileTxt}>
                                    Assets
                                </Text>
                            </View>

                            <Octicons name="chevron-right" size={20} color="#979797"/>


                        </TouchableOpacity>


                        <TouchableOpacity activeOpacity={0.6} style={styles.profileButton}>

                            <View style={styles.leftContent}>

                                <View style={styles.buttonIcon}>
                                    <Ionicons name="call-outline" size={20} color={Colors.lightColor}/>

                                </View>
                                <Text style={styles.profileTxt}>
                                    Contact us
                                </Text>
                            </View>

                            <Octicons name="chevron-right" size={20} color="#979797"/>


                        </TouchableOpacity>


   <TouchableOpacity activeOpacity={0.6} style={styles.profileButton}>

                            <View style={styles.leftContent}>

                                <View style={styles.buttonIcon}>
                                    <MaterialIcons name="support-agent" size={20} color={Colors.lightColor} />
                                </View>
                                <Text style={styles.profileTxt}>
                                    My councillor
                                </Text>
                            </View>

                            <Octicons name="chevron-right" size={20} color="#979797"/>


                        </TouchableOpacity>


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

    profileDetails: {
        height: heightPixel(280),
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    profileName: {
        height: heightPixel(30),
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileNameTxt: {
        fontSize: fontPixel(18),
        fontFamily: Fonts.faktumBold,
        color: Colors.text
    },
    profileImage: {
        width: 90,
        height: 90,
        backgroundColor: "#E6E9EB",
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    editProfile: {

        alignItems: 'center',
        justifyContent: 'center'
    },
    btnTxt: {
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumMedium,
        color: Colors.primary
    },

    braceIDContainer: {
        marginTop: 5,
        width: widthPixel(280),
        padding: 15,
        borderRadius: 12,
        backgroundColor: "#1F2937",
        height: heightPixel(60),
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    centerTextWrap: {
        width: '80%',
        alignItems: 'center',

        justifyContent: 'center',

    },
    centerText: {
        color: Colors.text,
        marginBottom: 3,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumBold
    },
    centerSubText: {
        color: Colors.tintText,
        fontSize: fontPixel(10),
        fontFamily: Fonts.faktumRegular
    },
    Avatar: {
        borderRadius: 100,
        resizeMode: 'cover',
        width: '100%',
        height: '100%'
    },
    linkIcon: {

        width: '10%',
        alignItems: "flex-start",
        borderRightColor: Colors.textDark
    },
    rightIcon: {
        width: '10%',
        alignItems: "center",
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    profileButtonContainer: {
        width: '90%',
        alignItems: 'center'
    },
    profileButton: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: heightPixel(65),
        alignItems: 'center',

    },
    leftContent: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: '100%',
        alignItems: 'center',
    },
    buttonIcon: {
        width: 40,
        height: 40,
        borderRadius: 40,
        marginRight: 20,
        backgroundColor: "#1E2333",
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileTxt: {
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumSemiBold,
        color: Colors.text
    },
})

export default UserAccount;
