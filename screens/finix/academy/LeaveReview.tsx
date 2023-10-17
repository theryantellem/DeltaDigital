import React, {useEffect, useState} from 'react';

import {Text, View, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Pressable} from 'react-native';

import {SafeAreaView} from "react-native-safe-area-context";
import Colors from "../../../constants/Colors";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../../../helpers/normalize";
import {Fonts} from "../../../constants/Fonts";
import {RootStackScreenProps, SignalStackScreenProps} from "../../../types";
import {StatusBar} from "expo-status-bar";
import SvgStarComponent from "../../../assets/images/StarSVG";
import Slider from "@react-native-community/slider";
import Animated, {Easing, FadeInLeft, FadeOutLeft, Layout} from 'react-native-reanimated';

import {useFormik} from "formik";
import * as yup from "yup";
import TextInput from "../../../components/inputs/TextInput";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useMutation, useQueryClient} from "@tanstack/react-query";

import {setResponse, unSetResponse} from "../../../app/slices/userSlice";
import {Ionicons} from "@expo/vector-icons";
import {MyButton} from "../../../components/MyButton";
import {postAReview} from "../../../api/finix-api";
import {LinearGradient} from "expo-linear-gradient";
import ToastAnimated from "../../../components/toast";
import {addNotificationItem} from "../../../app/slices/dataSlice";


const formSchema = yup.object().shape({
    text: yup.string().required('Comment is required'),
    //   category: yup.string().required('Category is required').trim('No white spaces'),
    // NFTAccess: yup.string().required('Please provide NFTs required for access'),


});


const LeaveReview = ({navigation, route}: SignalStackScreenProps<'LeaveReview'>) => {

    const {academy_uuid} = route.params

    const queryClient = useQueryClient();
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)
    const {responseState, responseType, responseMessage} = user
    const [star, setStar] = useState(1);


    const starArray = new Array(star).fill(undefined).map((val, idx) => idx)


    const {mutate, isLoading} = useMutation(['leaveAReview'], postAReview, {
        onSuccess: async (data) => {

            if (data.success) {
                dispatch(addNotificationItem({
                    body: data.message,
                    id: Math.random(),
                    type: 'success',
                }))


            } else {

                dispatch(addNotificationItem({
                    body: data.data.errors.academy_uuid.message,
                    id: Math.random(),
                    type: 'error',
                }))

                /*  navigation.navigate('EmailConfirm', {
                      email:contentEmail
                  })*/


            }
        },

        onError: (err) => {
            dispatch(setResponse({
                responseMessage: err.message,
                responseState: true,
                responseType: 'error',
            }))


        },
        onSettled: () => {
            queryClient.invalidateQueries(['leaveAReview']);
        }
    })

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
            text: '',


        },
        onSubmit: (values) => {
            const {text} = values
            const body = JSON.stringify({
                stars: star,
                comment: text,
                academy_uuid
            })

            mutate(body)
        }
    });




    const goBack = () => {
        navigation.goBack()
    }

    return (

        <>


            <SafeAreaView style={styles.safeArea}>
                <ToastAnimated/>
                <StatusBar style="dark"/>
                <View style={styles.topBar}>
                    <TouchableOpacity style={[styles.backBtn, {}]} onPress={goBack}>
                        <Ionicons name="md-chevron-back" color={Colors.textDark} size={heightPixel(24)}/>

                    </TouchableOpacity>

                    <Pressable style={[styles.titleWrap, {}]}>


                        <Text style={styles.title}>
                            Leave a review
                        </Text>

                    </Pressable>
                    <TouchableOpacity style={styles.rightBtn}>


                    </TouchableOpacity>

                </View>


                <KeyboardAwareScrollView style={{width: '100%',}} contentContainerStyle={styles.scrollView}
                                         scrollEnabled
                                         showsVerticalScrollIndicator={false}>


                    <Text style={[styles.question]}>
                        Leave a review for this Academy
                    </Text>

                    <Text style={[styles.starNumber,]}>
                        {star} Star
                    </Text>

                    <View style={styles.starWrap}>

                        {
                            starArray.map((val, idx) => (
                                <Animated.View key={idx.toString()} entering={FadeInLeft} exiting={FadeOutLeft}
                                               layout={Layout.easing(Easing.bounce).delay(20)} style={styles.star}>
                                    <SvgStarComponent/>
                                </Animated.View>
                            ))
                        }


                    </View>


                    <Slider

                        step={1}
                        style={{width: '90%', height: 40}}
                        minimumValue={1}
                        maximumValue={5}
                        value={star}
                        onValueChange={(value) => setStar(value)}
                        minimumTrackTintColor={Colors.primary}
                        maximumTrackTintColor="#000000"
                    />


                    <TextInput
                        isWidth={'90%'}
                        keyboardType={"default"}
                        touched={touched.text}
                        error={touched.text && errors.text}
                        placeholderTextColor={Colors.textDark}
                        inputTextColor={Colors.textDark}
                        onChangeText={(e) => {
                            handleChange('text')(e);

                        }}
                        onBlur={(e) => {
                            handleBlur('text')(e);

                        }}

                        value={values.text}
                        label="" placeholder={"Write comment"}/>

                </KeyboardAwareScrollView>
                <MyButton disabled={isLoading} onPress={() => handleSubmit()} style={[styles.listBodyRight, {
                    backgroundColor: 'transparent'
                }]}>
                    <LinearGradient style={styles.createBtnGradient}
                                    colors={['#8D34F1', '#0075FF']}

                                    start={{x: 0.3, y: 1}}
                                    end={{x: 1, y: 3.3,}}

                        // locations={[0.1, 0.7,]}
                    >
                        {
                            isLoading ? <ActivityIndicator size='small' color="#fff"/> :

                                <Text style={styles.buttonText}>
                                    Submit

                                </Text>
                        }

                    </LinearGradient>
                </MyButton>


            </SafeAreaView>

        </>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#fff",
    },
    topBar: {
        height: heightPixel(80),
        width: '100%',
        paddingHorizontal: pixelSizeHorizontal(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#fff",
        // borderBottomWidth: 1,
    },
    title: {
        textAlign: 'center',
        color: Colors.textDark,
        textTransform: 'capitalize',
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumSemiBold
    },
    titleWrap: {
        width: '52%',

        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },

    rightBtn: {
        width: '20%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    backBtn: {
        width: '20%',
        height: 40,
        borderRadius: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    scrollView: {

        width: '100%',
        alignItems: 'center'
    },


    starNumber: {
        marginVertical: pixelSizeVertical(10),
        color: Colors.light.text,
        fontFamily: Fonts.faktumMedium,
        fontSize: fontPixel(16),
    },
    question: {
        textAlign: 'center',
        width: '65%',
        lineHeight: heightPixel(38),
        marginVertical: pixelSizeVertical(20),
        color: Colors.light.text,
        fontFamily: Fonts.faktumSemiBold,
        fontSize: fontPixel(32),
    },
    starWrap: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        alignItems: 'center',
        height: heightPixel(150),
    },
    star: {
        marginHorizontal: pixelSizeHorizontal(3)
    },
    buttonText: {
        position: 'absolute',
        fontSize: fontPixel(16),
        color: "#fff",
        fontFamily: Fonts.faktumBold
    },
    listBodyRight: {
        borderRadius: 20,
        width: 200,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center'
    },
    createBtnGradient: {
        width: '100%',
        height: '90%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default LeaveReview;
