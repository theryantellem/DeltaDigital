import React, {useEffect, useRef, useState} from 'react';

import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import * as yup from "yup";

import {useFormik} from "formik";
import {SafeAreaView} from "react-native-safe-area-context";
import AuthNavBar from "../../components/header/AuthNavBar";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import TextInput from "../../components/inputs/TextInput";
import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../../helpers/normalize";
import Colors from "../../constants/Colors";

import {MyButton} from "../../components/MyButton";
import {AuthStackScreenProps, RootStackScreenProps} from "../../types";
import {useMutation, useQueryClient} from "@tanstack/react-query";

import * as Haptics from "expo-haptics";


import {Fonts} from "../../constants/Fonts";
import {LinearGradient} from "expo-linear-gradient";


const formSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email address").required('Email is required'),
});

const ForgotPasswordScreen = ({navigation}: AuthStackScreenProps<'ForgotPasswordScreen'>) => {




    const [focusEmail, setFocusEmail] = useState<boolean>(false);
    const [contentEmail, setContentEmail] = useState<string>('');


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

            email: ''

        },
        onSubmit: (values) => {


        }
    });


    return (
        <>

            <SafeAreaView style={styles.safeArea}>
                <LinearGradient style={styles.background}
                                colors={[ '#680051','#131622',]}
                                start={{ x: 3.0, y: 4.0 }}
                                end={{ x: 1.2, y: 0 }}


                >
                <AuthNavBar/>
                <KeyboardAwareScrollView scrollEnabled
                                         style={{
                                             width: '100%',
                                         }}
                                         showsVerticalScrollIndicator={false}
                                         showsHorizontalScrollIndicator={false}
                                         contentContainerStyle={
                                             styles.container
                                         }>

                    <View style={styles.welcomeTextWrap}>

                        <Text style={styles.titleText}>
                            Forgot Password
                        </Text>

                        <Text style={styles.subText}>
                            Please enter your email address to restore your account
                        </Text>
                    </View>

                    <View style={styles.authContainer}>


                        <TextInput

                            placeholder="Email address"
                            keyboardType={"email-address"}
                            touched={touched.email}
                            error={touched.email && errors.email}
                            onFocus={() => setFocusEmail(true)}
                            onChangeText={(e) => {
                                handleChange('email')(e);
                                setContentEmail(e);
                            }}
                            onBlur={(e) => {
                                handleBlur('email')(e);
                                setFocusEmail(false);
                            }}
                            defaultValue={contentEmail}
                            focus={focusEmail}
                            value={values.email}
                            label="Enter Your email address"/>


                        {/*  <Text onPress={nav}>
                        Verify
                    </Text>*/}


                    </View>


                </KeyboardAwareScrollView>

                <MyButton onPress={() => {
                    handleSubmit()
                }} activeOpacity={0.7}
                          style={[styles.button, {
                              backgroundColor: !isValid ? Colors.disabled : Colors.primary
                          }]} disabled={!isValid}>

                    <Text style={styles.btnText}>
                        Continue
                    </Text>

                </MyButton>
                </LinearGradient>
            </SafeAreaView>
        </>
    );
};


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        width: '100%',
        backgroundColor:"#141621",
        alignItems: 'center',

    },
    background: {
        alignItems: 'center',
        flex: 1,
        width: '100%',
        paddingHorizontal: pixelSizeHorizontal(10),
    },
    container: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,


    },
    welcomeTextWrap: {
        width: '100%',
        height: heightPixel(100),
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    bottom: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: heightPixel(70),
    },
    createAccountText: {
        color: Colors.primary,

        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(16),
    },
    titleText: {
        fontFamily: Fonts.faktumBold,
        color: "#fff",
        fontSize: fontPixel(24)
    },

    subText: {
        marginTop: 5,
        fontFamily: Fonts.faktumRegular,
        color: "#dcc",
        fontSize: fontPixel(16),
        lineHeight: heightPixel(20),
    },
    row: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    authContainer: {

        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },

    checkboxContainer: {
        height: '30%',
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    termsText: {
        height: '100%',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    buttonSignUp: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 10,
        width: widthPixel(292),

        height: heightPixel(56)
    },
    bottomContainer: {
        width: '100%',
        flex: 0.4,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumBold
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
        position: 'absolute',
        bottom: 40,
    },
    inputWrap:
        {
            height: heightPixel(120),
            width: '100%',
            justifyContent: "flex-start",
        },
    label: {
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumMedium,
    },
    errorMessage: {
        position: 'relative',
        right: -10,
        lineHeight: heightPixel(15),
        fontSize: fontPixel(10),
        color: Colors.errorRed,
        textTransform: 'capitalize',
        fontFamily: Fonts.faktumBold
    },
    phoneInput: {
        width: '100%',
        marginTop: 8,
        marginBottom: 10,
        borderRadius: 6,
        borderWidth: 1,
        flexDirection: 'row',
        padding: 5,
        height: heightPixel(56),
        borderColor: Colors.border
    }
})

export default ForgotPasswordScreen;
