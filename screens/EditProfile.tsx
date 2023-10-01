 import React, {useState} from 'react';

import {Text, View, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import HeaderWithTitle from "../components/cyborg/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getUser} from "../api";
import {useAppSelector} from "../app/hooks";
import FastImage from "react-native-fast-image";

import {fontPixel, heightPixel, pixelSizeVertical} from "../helpers/normalize";

import TextInput from "../components/inputs/TextInput";
import {useFormik} from "formik";
import * as yup from "yup";
import Colors from "../constants/Colors";
import dayjs from "dayjs";
import {MyButton} from "../components/MyButton";
import {Fonts} from "../constants/Fonts";
 import * as SecureStore from "expo-secure-store";
 import {logoutUser} from "../app/slices/userSlice";
 import {useDispatch} from "react-redux";


//my counceller
//sub expiry
// UUID


const formSchema = yup.object().shape({

    username: yup.string().required('Username is required'),

});


const EditProfile = () => {

    const queryClient = useQueryClient()
    const dispatch = useDispatch()


    const user = useAppSelector(state => state.user)
    const {User_Details,userData} = user

  //  const {data, refetch} = useQuery(['user-data'], () => getUser(userData.id))

    const [username, setUsername] = useState(userData.username);
    const [focusUsername, setFocusUsername] = useState<boolean>(false);

    const {
        resetForm,
        handleChange, handleSubmit, handleBlur,
        setFieldValue,
        isSubmitting,
        setSubmitting,
        values,
        errors,
        touched,
        isValid
    } = useFormik({
        validationSchema: formSchema,
        initialValues: {

            username: User_Details.username

        },
        onSubmit: (values) => {
            const {username} = values;
            const data = JSON.stringify({

                username,

            })

            const formData = new FormData()
            formData.append('username', username)


        }
    });


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
            <LinearGradient style={styles.background}
                            colors={['#04074E', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >


                <HeaderWithTitle title='Settings'/>
                <KeyboardAwareScrollView style={{
                    width: '100%'
                }} contentContainerStyle={styles.scrollView} scrollEnabled showsVerticalScrollIndicator={false}>


                    <View style={styles.profileDetails}>
                        <View style={styles.profileImage}>

                            <FastImage
                                style={styles.Avatar}
                                source={{
                                    uri: userData.profile_picture ? userData.profile_picture  : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
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
                            touched={touched.username}
                            error={touched.username && errors.username}
                            onFocus={() => setFocusUsername(true)}
                            onChangeText={(e) => {
                                handleChange('username')(e);
                                setUsername(e);
                            }}
                            onBlur={(e) => {
                                handleBlur('username')(e);
                                setFocusUsername(false);
                            }}
                            defaultValue={username}
                            focus={focusUsername}
                            value={values.username}
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

                            onBlur={(e) => {
                                handleBlur('username')(e);
                                setFocusUsername(false);
                            }}

                            defaultValue={userData.email}
                            label="Email"/>

                        <TextInput
                            editable={false}
                            inputBg={Colors.secondary}

                            onFocus={() => setFocusUsername(true)}

                            onBlur={(e) => {
                                handleBlur('username')(e);
                                setFocusUsername(false);
                            }}

                            defaultValue={dayjs.unix(userData.expiry_time).format('ddd, DD MMM YYYY')}
                            label="Expiry"/>

                        <TextInput
                            editable={false}
                            inputBg={Colors.secondary}

                            onFocus={() => setFocusUsername(true)}



                            defaultValue={userData.plan}
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

export default EditProfile;
