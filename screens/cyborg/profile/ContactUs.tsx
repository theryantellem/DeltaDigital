import React from 'react';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import HeaderWithTitle from "../../../components/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Feather, Ionicons} from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import {fontPixel, heightPixel, pixelSizeHorizontal} from "../../../helpers/normalize";
import {Fonts} from "../../../constants/Fonts";
import {RootStackScreenProps} from "../../../types";

const ContactUs = ({navigation}: RootStackScreenProps<'ContactUs'>) => {

    const feedbacks = () => {
        navigation.navigate('FeedbackRecord')
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#04074E', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >


                <HeaderWithTitle title='My Counceller' headerAction={feedbacks}
                                 headerButton={<Ionicons name="ios-document-text-outline" size={24} color="#fff"/>}/>
                <KeyboardAwareScrollView style={{
                    width: '100%'
                }} contentContainerStyle={styles.scrollView} scrollEnabled showsVerticalScrollIndicator={false}>

                    <View style={styles.helpRowsContainer}>


                        <TouchableOpacity activeOpacity={0.8} style={[styles.helpRows, {
                            borderBottomWidth: 1,
                            borderBottomColor: Colors.borderColor,
                        }]}>

                            <View style={styles.textWrap}>
                                <Text style={styles.rowText}>
                                    Trading problem
                                </Text>
                            </View>
                            <Feather name="chevron-right" size={24} color={"#ccc"}/>

                        </TouchableOpacity>


                        <TouchableOpacity activeOpacity={0.7}
                                          style={[styles.helpRows, {
                                              borderBottomWidth: 1,
                                              borderBottomColor: Colors.borderColor,
                                          }]}>


                            <View style={styles.textWrap}>
                                <Text style={styles.rowText}>
                                    Account problem
                                </Text>
                            </View>
                            <Feather name="chevron-right" size={24} color="#ccc"/>

                        </TouchableOpacity>


                        <TouchableOpacity activeOpacity={0.7}
                                          style={[styles.helpRows, {
                                              borderBottomWidth: 1,
                                              borderBottomColor: Colors.borderColor,
                                          }]}>


                            <View style={styles.textWrap}>
                                <Text style={styles.rowText}>
                                    Money flow problem
                                </Text>
                            </View>
                            <Feather name="chevron-right" size={24} color="#ccc"/>

                        </TouchableOpacity>


                        <TouchableOpacity activeOpacity={0.7}
                                          style={[styles.helpRows, {
                                              borderBottomWidth: 1,
                                              borderBottomColor: Colors.borderColor,
                                          }]}>


                            <View style={styles.textWrap}>
                                <Text style={styles.rowText}>
                                    API Binding problem
                                </Text>
                            </View>
                            <Feather name="chevron-right" size={24} color="#ccc"/>

                        </TouchableOpacity>


                        <TouchableOpacity activeOpacity={0.7}
                                          style={[styles.helpRows, {
                                              borderBottomWidth: 1,
                                              borderBottomColor: Colors.borderColor,
                                          }]}>


                            <View style={styles.textWrap}>
                                <Text style={styles.rowText}>
                                    Bug problem
                                </Text>
                            </View>
                            <Feather name="chevron-right" size={24} color="#ccc"/>

                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.7}
                                          style={[styles.helpRows, {
                                              borderBottomWidth: 1,
                                              borderBottomColor: Colors.borderColor,
                                          }]}>


                            <View style={styles.textWrap}>
                                <Text style={styles.rowText}>
                                    Other
                                </Text>
                            </View>
                            <Feather name="chevron-right" size={24} color="#ccc"/>

                        </TouchableOpacity>


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
    helpRowsContainer: {
        marginTop: 20,
        height: heightPixel(250),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    helpRows: {
        height: heightPixel(70),
        width: '100%',
        paddingHorizontal: pixelSizeHorizontal(20),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    textWrap: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100%'
    },
    rowText: {
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumMedium,
        color: Colors.text
    }

})

export default ContactUs;
