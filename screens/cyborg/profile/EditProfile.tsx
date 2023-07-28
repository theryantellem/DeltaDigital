import React, {useState} from 'react';

import {Text, View, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import HeaderWithTitle from "../../../components/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useQuery} from "@tanstack/react-query";
import {getUser} from "../../../api";
import {useAppSelector} from "../../../app/hooks";
import FastImage from "react-native-fast-image";

import {fontPixel, heightPixel} from "../../../helpers/normalize";

import TextInput from "../../../components/inputs/TextInput";
import {useFormik} from "formik";
import * as yup from "yup";
import Colors from "../../../constants/Colors";
import dayjs from "dayjs";
import {MyButton} from "../../../components/MyButton";
import {Fonts} from "../../../constants/Fonts";


//my counceller
//sub expiry
// UUID


const formSchema = yup.object().shape({

    username: yup.string().required('Username is required'),

});


const EditProfile = () => {



    const user = useAppSelector(state => state.user)
    const {User_Details} = user
    const {data, refetch} = useQuery(['user-data'], () => getUser(User_Details.id))

    const [username, setUsername] = useState(User_Details.username);
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
                                handleBlur('username')(e);
                                setFocusUsername(false);
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

defaultValue={User_Details.Email}
                            label="Email"/>

                        <TextInput
                            editable={false}
                            inputBg={Colors.secondary}

                            onFocus={() => setFocusUsername(true)}

                            onBlur={(e) => {
                                handleBlur('username')(e);
                                setFocusUsername(false);
                            }}

defaultValue={dayjs.unix(User_Details.expires).format('ddd, DD MMM YYYY')}
                            label="Subscription Expiry"/>


                    </View>

                    <MyButton onPress={() => {
                        handleSubmit()
                    }} activeOpacity={0.7}
                              style={[styles.button, {
                                  backgroundColor: !isValid ? Colors.disabled : Colors.primary
                              }]} disabled={!isValid}>


                                <Text style={styles.btnText}>
                                 Submit
                                </Text>



                    </MyButton>
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
})

export default EditProfile;
