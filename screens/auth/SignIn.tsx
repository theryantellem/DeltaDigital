import React, {useEffect, useRef, useState} from 'react';

import {StyleSheet, Text, Platform, TouchableOpacity, View, ActivityIndicator, Dimensions, Image} from 'react-native';
import {AuthStackScreenProps} from "../../types";
import * as yup from "yup";

import {useFormik} from "formik";
import {SafeAreaView} from "react-native-safe-area-context";

import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import TextInput from "../../components/inputs/TextInput";
import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../../helpers/normalize";
import Colors from "../../constants/Colors";
import {MyButton} from "../../components/MyButton";

import {Fonts} from "../../constants/Fonts";


import * as Haptics from 'expo-haptics';

import * as SecureStore from 'expo-secure-store';
import {LinearGradient} from "expo-linear-gradient";


/*const storeData = async (value: string) => {
    try {
        await AsyncStorage.setItem('@user-phone-number', value)
    } catch (e) {
        // saving error
    }
}*/


const height = Dimensions.get('window').height

const formSchema = yup.object().shape({

    email: yup.string().email("Please enter a valid email address").required('Email is required'),
    /*  password: yup.string().required('Password is required').matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.-:;()_?\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),*/
    password: yup.string().required('Password is required'),

});


const SignInScreen = ({navigation}: AuthStackScreenProps<'SignInScreen'>) => {

    //hide and show password
    const [togglePass, setTogglePass] = useState(true)

    const [email, setEmail] = useState('');
    const [focusEmail, setFocusEmail] = useState<boolean>(false);

    const [focusPassword, setFocusPassword] = useState<boolean>(false);


    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");


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
            password: '2132324',
            email: 'orji@gmail.com'

        },
        onSubmit: (values) => {
            const {email, password} = values;
            const data = JSON.stringify({
                password,
                email,

                /* "phoneNumber": "+2348068989092",
                 "password": "password",
                 "countryCode": "NG"*/
            })


            navigation.navigate('LandingScreen')
        }
    });

    const forgotPassword = () => {
        navigation.navigate('ForgotPasswordScreen')
    }


    return (

        <>


            <SafeAreaView style={styles.safeArea}>
                <LinearGradient style={styles.background}
                                colors={['#680051', '#131622',]}
                                start={{x: 3.0, y: 4.0}}
                                end={{x: 1.2, y: 0}}


                >
                    <Image source={require('../../assets/images/shape-auth.png')} style={styles.imageShape}/>

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
                                Welcome back
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
                                    setEmail(e);
                                }}
                                onBlur={(e) => {
                                    handleBlur('email')(e);
                                    setFocusEmail(false);
                                }}
                                defaultValue={email}
                                focus={focusEmail}
                                value={values.email}
                                label="Enter Your email address"/>


                            <TextInput
                                password
                                action={() => setTogglePass(!togglePass)}
                                passState={togglePass}
                                secureTextEntry={togglePass}
                                placeholder="Password"
                                keyboardType="default"
                                touched={touched.password}
                                error={touched.password && errors.password}
                                onFocus={() => setFocusPassword(true)}
                                onChangeText={(e) => {
                                    handleChange('password')(e);
                                }}
                                onBlur={(e) => {
                                    handleBlur('password')(e);
                                    setFocusPassword(false);
                                }}

                                focus={focusPassword}
                                value={values.password}
                                label="Password"/>


                         {/*   <View style={[styles.terms, {
                                marginTop: errors.password ? 10 : 0
                            }]}>
                                <TouchableOpacity onPress={forgotPassword}>
                                    <Text style={styles.forgotPass}>Forgot password?</Text>
                                </TouchableOpacity>
                            </View>*/}


                        </View>

                        <MyButton onPress={() => {
                            handleSubmit()
                        }} activeOpacity={0.7}
                                  style={[styles.button, {
                                      backgroundColor: !isValid ? Colors.disabled : Colors.primary
                                  }]} disabled={!isValid}>


                            <Text style={styles.btnText}>
                                Sign In
                            </Text>


                        </MyButton>
                    </KeyboardAwareScrollView>
                </LinearGradient>
            </SafeAreaView>
        </>
    );
};


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        width: '100%',
        backgroundColor: "#141621",
        alignItems: 'center',


    },
    background: {
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
    imageShape: {
        position: 'absolute',
        resizeMode: 'cover',
        width: widthPixel(350),
        height: heightPixel(300),
        right: 0,
        top: 0,
    },
    welcomeTextWrap: {
        width: '100%',
        height: heightPixel(150),
        alignItems: 'flex-start',
        justifyContent: 'center',
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
        color: Colors.tintText,
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
        height: heightPixel(300),
        justifyContent: 'flex-start',
        width: '100%',
        alignItems: 'center',
    },
    terms: {
        width: '100%',

        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row'
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
        fontFamily: 'faktum-bold'
    },
    btnText: {
        color: 'white',
        fontSize: fontPixel(18),
        fontFamily: Fonts.faktumBold

    },
    button: {
        width: '100%',
        height: heightPixel(64),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        bottom: 0,
    },
    inputWrap:
        {
            height: heightPixel(120),
            width: '100%',
            justifyContent: "flex-start",
        },
    label: {
        fontSize: fontPixel(16),
        fontFamily: 'faktum-medium',
    },
    errorMessage: {
        position: 'relative',

        lineHeight: heightPixel(15),
        fontSize: fontPixel(12),
        color: Colors.errorRed,
        textTransform: 'capitalize',
        fontFamily: Fonts.faktumSemiBold,
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
    },
    forgotPass: {
        color: "#fff",
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumMedium,
        lineHeight: heightPixel(20)
    }
})

export default SignInScreen;
