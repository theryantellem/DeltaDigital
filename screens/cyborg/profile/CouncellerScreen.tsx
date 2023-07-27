import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import HeaderWithTitle from "../../../components/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useQuery} from "@tanstack/react-query";
import {userCounselor} from "../../../api";
import {useAppSelector} from "../../../app/hooks";
import {fontPixel, heightPixel, widthPixel} from "../../../helpers/normalize";
import Colors from "../../../constants/Colors";
import {Fonts} from "../../../constants/Fonts";

const CouncellerScreen = () => {
    const user = useAppSelector(state => state.user)
    const {User_Details} = user
    const {data} = useQuery(['userCounselor'], () => userCounselor(User_Details.id))


    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#04074E', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >


                <HeaderWithTitle title='My Counceller'/>
                <KeyboardAwareScrollView style={{
                    width: '100%'
                }} contentContainerStyle={styles.scrollView} scrollEnabled showsVerticalScrollIndicator={false}>

                    <View style={styles.profileDetails}>
                        <View style={styles.profileImage}>
                            {/*    <Image style={styles.Avatar} resizeMethod="scale"

                               source={{uri: avatar, cache:'force-cache'}}/>*/}


                        </View>
                        <View style={styles.welcomeBack}>
                            <Text style={styles.welcomeBackTxt}>
                                {data.data['My Counselor'][0].name}

                            </Text>
                        </View>
                        <View style={styles.profileName}>
                            <Text style={styles.profileNameTxt}>
                                {data.data['My Counselor'][0].email}

                            </Text>
                        </View>

                    </View>


                </KeyboardAwareScrollView>
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
        marginTop: 30,
        height: heightPixel(250),
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    welcomeBack: {
        height: heightPixel(80),
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    welcomeBackTxt: {
        fontSize: fontPixel(28),
        fontFamily: Fonts.faktumBold,
        color: Colors.text
    },
    profileName: {
        height: heightPixel(30),
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileNameTxt: {
        fontSize: fontPixel(18),
        fontFamily: Fonts.faktumMedium,
        color: Colors.text
    },
    profileImage: {
        width: widthPixel(90),
        height: heightPixel(90),
        backgroundColor: "#E6E9EB",
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default CouncellerScreen;
