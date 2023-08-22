import React, {useState} from 'react';

import {Text, View, StyleSheet, ScrollView, TouchableOpacity, Switch} from 'react-native';
import HeaderWithTitle from "../../../components/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {RootStackScreenProps} from "../../../types";
import {Feather, FontAwesome, Ionicons, Octicons} from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import {fontPixel, heightPixel} from "../../../helpers/normalize";
import {Fonts} from "../../../constants/Fonts";
import FaceId from "../../../assets/svgs/FaceId";



const SWITCH_TRACK_COLOR = {
    true: Colors.primary,
    false: Colors.success,
};



const SettingsScreen = ({navigation}: RootStackScreenProps<'SettingsScreen'>) => {

    const [switchToggle, setSwitchToggle] = useState(false);

    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#04074E', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >


                <HeaderWithTitle title='Settings'/>
                <ScrollView style={{
                    width: '100%'
                }} contentContainerStyle={styles.scrollView} scrollEnabled showsVerticalScrollIndicator={false}>


                    <View style={styles.content}>

                 {/*   <TouchableOpacity activeOpacity={0.6} style={styles.profileButton}>

                        <View style={styles.leftContent}>

                            <View style={styles.buttonIcon}>
                                <Ionicons name="lock-closed-outline" size={20} color={Colors.lightColor} />

                            </View>
                            <Text style={styles.profileTxt}>
                                Update password
                            </Text>
                        </View>

                        <Octicons name="chevron-right" size={20} color="#979797"/>


                    </TouchableOpacity>*/}


                        <TouchableOpacity activeOpacity={0.6} style={styles.profileButton}>

                        <View style={styles.leftContent}>

                            <View style={styles.buttonIcon}>
                              <FaceId color={Colors.lightColor}/>

                            </View>
                            <Text style={styles.profileTxt}>
                            Biometrics
                            </Text>
                        </View>
                            <Switch
                                style={{}}
                                trackColor={SWITCH_TRACK_COLOR}
                                thumbColor={switchToggle ? "#fff" : Colors.secondary}
                                ios_backgroundColor={Colors.tintSuccess}
                                onValueChange={(toggled) => {
                                    //setEnableNow(toggled)
                                    setSwitchToggle(toggled)
                                    // toggle(toggled)

                                }}
                                value={switchToggle}
                            />


                    </TouchableOpacity>



                        <TouchableOpacity activeOpacity={0.6} style={styles.profileButton}>

                            <View style={styles.leftContent}>

                                <View style={styles.buttonIcon}>
                                    <Ionicons name="md-shield-outline" size={20} color={Colors.lightColor} />
                                </View>
                                <Text style={styles.profileTxt}>
                                    2FA
                                </Text>
                            </View>

                            <Octicons name="chevron-right" size={20} color="#979797"/>


                        </TouchableOpacity>



                        <TouchableOpacity activeOpacity={0.6} style={styles.profileButton}>

                            <View style={styles.leftContent}>

                                <View style={styles.buttonIcon}>
                                    <FontAwesome name="language" size={20} color={Colors.lightColor} />

                                </View>
                                <Text style={styles.profileTxt}>
                                    Language
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

    content: {

        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default SettingsScreen;
