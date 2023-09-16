import React, {useState} from 'react';

import {Text, View, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import HeaderWithTitle from "../../../components/cyborg/header/HeaderWithTitle";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import FastImage from "react-native-fast-image";
import TextInput from "../../../components/inputs/TextInput";
import Colors from "../../../constants/Colors";
import dayjs from "dayjs";
import {useAppSelector} from "../../../app/hooks";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getUser} from "../../../api";
import {useFormik} from "formik";
import {fontPixel, heightPixel, pixelSizeVertical} from "../../../helpers/normalize";
import {Fonts} from "../../../constants/Fonts";
import * as SecureStore from "expo-secure-store";
import {logoutUser} from "../../../app/slices/userSlice";
import {useDispatch} from "react-redux";

const SignalSettings = () => {

    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    const user = useAppSelector(state => state.user)
    const {User_Details} = user

    const {data, refetch} = useQuery(['user-data'], () => getUser(User_Details.id))

    const [username, setUsername] = useState(User_Details.username);
    const [focusUsername, setFocusUsername] = useState<boolean>(false);

    const logout = async () => {
        // setLoggingOut(true)
        await queryClient.invalidateQueries()

        await SecureStore.setItemAsync('delta-signal-token', '')
        dispatch(logoutUser())
        //  dispatch( setLockUser({lockUser: false}))
        // setUserLastSession({cleanLastActive: ''})
        //await queryClient.removeQueries()

    }

    return (
        <SafeAreaView style={styles.safeArea}>



                <ImageBackground source={require('../../../assets/images/signal/streamer_BG.png')}
                                 resizeMode={'cover'}
                                 style={styles.background}>


                <HeaderWithTitle title='Settings'/>
                <KeyboardAwareScrollView style={{
                    width: '100%'
                }} contentContainerStyle={styles.scrollView} scrollEnabled showsVerticalScrollIndicator={false}>


                    <View style={styles.profileDetails}>
                        <View style={styles.profileImage}>

                            <FastImage
                                style={styles.Avatar}
                                source={{
                                    uri: User_Details.image ? User_Details.image : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
                                    cache: FastImage.cacheControl.web,
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />


                        </View>

                    </View>
                    <View style={styles.authContainer}>

                        <TextInput
                            editable={false}
                            inputBg={Colors.secondary}
                            placeholder="Username"
                            keyboardType={"default"}

                            onFocus={() => setFocusUsername(true)}

                            defaultValue={username}
                            focus={focusUsername}

                            label="Nickname"/>

                        <TextInput
                            editable={false}
                            inputBg={Colors.secondary}
                            defaultValue={User_Details.id}
                            onFocus={() => setFocusUsername(true)}

                            onBlur={(e) => {

                            }}

                            label="UUID / Customer ID"/>

                        <TextInput
                            editable={false}
                            inputBg={Colors.secondary}

                            onFocus={() => setFocusUsername(true)}


                            defaultValue={User_Details.Email}
                            label="Email"/>

                        <TextInput
                            editable={false}
                            inputBg={Colors.secondary}

                            onFocus={() => setFocusUsername(true)}


                            defaultValue={dayjs.unix(User_Details.expires).format('ddd, DD MMM YYYY')}
                            label="Expiry"/>

                        <TextInput
                            editable={false}
                            inputBg={Colors.secondary}

                            onFocus={() => setFocusUsername(true)}


                            defaultValue={User_Details.plan}
                            label="Title"/>


                    </View>

                    {/*   <MyButton onPress={() => {
                        handleSubmit()
                    }} activeOpacity={0.7}
                              style={[styles.button, {
                                  backgroundColor: !isValid ? Colors.disabled : Colors.primary
                              }]} disabled={!isValid}>


                                <Text style={styles.btnText}>
                                 Submit
                                </Text>



                    </MyButton>*/}

                    <TouchableOpacity onPress={logout}>
                        <Text style={styles.logoutText}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>


            </ImageBackground>
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
        height: heightPixel(180),
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },

    Avatar: {
        borderRadius: 100,
        resizeMode: 'cover',
        width: '100%',
        height: '100%'
    },
    profileImage: {
        width: 90,
        height: 90,
        backgroundColor: "#E6E9EB",
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    authContainer: {
        minHeight: heightPixel(300),
        justifyContent: 'flex-start',
        width: '90%',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: fontPixel(18),
        fontFamily: Fonts.faktumBold

    },
    button: {
        width: '90%',
        height: heightPixel(64),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        bottom: 0,
    },
    logoutText: {
        marginVertical:pixelSizeVertical(20),
        color: Colors.errorRed,
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumSemiBold,

    }
})

export default SignalSettings;
