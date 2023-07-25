import React from 'react';

import {Text, View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import HeaderWithTitle from "../../../components/header/HeaderWithTitle";
import {LinearGradient} from "expo-linear-gradient";
import {SafeAreaView} from "react-native-safe-area-context";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../../../helpers/normalize";
import {Fonts} from "../../../constants/Fonts";
import Colors from "../../../constants/Colors";
import {useFormik} from "formik";
import * as yup from "yup";
import TextInput from "../../../components/inputs/TextInput";
import HorizontalLine from "../../../components/HorizontalLine";
import {Entypo} from "@expo/vector-icons";
import {MyButton} from "../../../components/MyButton";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {getUser, transferAsset} from "../../../api";
import {setAuthenticated, updateUserDetails} from "../../../app/slices/userSlice";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {addNotificationItem} from "../../../app/slices/dataSlice";
import {RootStackScreenProps} from "../../../types";
import ToastAnimated from "../../../components/toast";


const formSchema = yup.object().shape({


    amount: yup.number().required('Amount is required'),


})

const TransferScreen = ({navigation}: RootStackScreenProps<'TransferScreen'>) => {

    const dispatch = useAppDispatch()
    const queryClient = useQueryClient()

    const user = useAppSelector(state => state.user)
    const {userData, User_Details} = user

    const {mutate, isLoading} = useMutation(['transferAsset'], transferAsset, {
        onSuccess: async (data) => {

            if (data.status == 1) {

                navigation.navigate('SuccessScreen', {
                    type: 'success',
                    title: 'Transfer successful',
                    message: data.message
                })

            } else {
                dispatch(addNotificationItem({
                    id: Math.random(),
                    type: 'error',
                    body:data?.data,
                }))
            }


        },
        onSettled: () => {
            queryClient.invalidateQueries(['transferAsset']);
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
            //  network: '',

            amount: '',


        },
        onSubmit: (values) => {
            //navigation.navigate('CryptoWithdrawalDetails')
            const {amount} = values

            const formData = new FormData()
            formData.append('amount', amount)
            mutate({body: formData, userId: User_Details.id})
        }
    });


    return (
        <>


            <SafeAreaView style={styles.safeArea}>

                <LinearGradient style={styles.background}
                                colors={['#04074E', '#141621',]}

                                start={{x: 2.5, y: 0}}
                                end={{x: 1.5, y: 0.8,}}
                    // locations={[0.1, 0.7,]}

                >


                    <HeaderWithTitle title='Transfer'/>
                    <ScrollView style={{
                        width: '100%'
                    }} contentContainerStyle={styles.scrollView} scrollEnabled
                                showsVerticalScrollIndicator={false}>
                        <View style={styles.planInfo}>
                            <Text style={styles.planTitle}>
                                Transfer Details
                            </Text>
                            <View style={styles.planMessage}>
                                <Text style={styles.planMessageTxt}>
                                    Transfer from available assets to Total fee assets
                                </Text>
                            </View>
                        </View>

                        <View style={styles.authContainer}>

                            <TextInput

                                placeholder="Quantity"
                                keyboardType={"number-pad"}
                                touched={touched.amount}
                                error={touched.amount && errors.amount}
                                onChangeText={(e) => {
                                    handleChange('amount')(e);

                                }}

                                onBlur={(e) => {
                                    handleBlur('amount')(e);

                                }}

                                value={values.amount}
                                label="Quantity"/>


                        </View>


                        <View style={styles.topWrap}>
                            <Text style={styles.DetailsTitle}>
                                Transaction Details
                            </Text>


                            <View style={styles.details}>
                                <View style={styles.rowDetails}>
                                    <Text style={styles.amountText}>
                                        Available
                                    </Text>
                                    <Text style={styles.amountText}>
                                        3030 USDT
                                    </Text>
                                </View>

                                <HorizontalLine/>

                                <View style={styles.rowDetails}>
                                    <Text style={styles.amountText}>
                                        Transfer fee
                                    </Text>
                                    <Text style={styles.amountText}>
                                        0.00
                                    </Text>
                                </View>
                            </View>
                        </View>


                        <View style={styles.operationReminderWrap}>
                            <Text style={styles.operationReminderTitle}>
                                Operation reminder
                            </Text>


                            <View style={[styles.list, {
                                marginTop: 12,
                            }]}>
                                <Entypo name="dot-single" size={24} color={Colors.pendingYellow}/>
                                <Text style={[styles.bodyText, {}]}>
                                    All funds send to Total Fee Asset can not be moved
                                    on the future, this wallet is only cyborg performance
                                    fees purpose
                                </Text>
                            </View>


                            <View style={styles.list}>
                                <Entypo name="dot-single" size={24} color={Colors.pendingYellow}/>
                                <Text style={[styles.bodyText, {}]}>

                                    Please deposit funds that are dedicated only for
                                    Cyborg fees
                                </Text>
                            </View>


                        </View>


                    </ScrollView>
                    <MyButton disabled={!isValid} onPress={() => handleSubmit()} style={styles.proceedBtn}>
                        {
                            isLoading ? <ActivityIndicator color="#fff" size='small'/>
                                :

                                <Text style={styles.btnText}>
                                    Transfer
                                </Text>
                        }
                    </MyButton>


                </LinearGradient>


            </SafeAreaView>

            <ToastAnimated/>
        </>
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
    planInfo: {
        width: '100%',
        paddingHorizontal: pixelSizeHorizontal(20),
        height: heightPixel(130),
        alignItems: 'flex-start',
        justifyContent: 'flex-start',

    },
    planTitle: {
        color: "#fff",
        fontSize: fontPixel(24),
        fontFamily: Fonts.faktumBold
    },
    planMessage: {
        width: '80%',
        marginTop: 10,
    },
    planMessageTxt: {

        color: Colors.tintText,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumRegular
    },
    authContainer: {

        minHeight: heightPixel(150),
        justifyContent: 'flex-start',
        width: '90%',
        alignItems: 'center',
    },

    topWrap: {
        width: '80%',
        alignItems: 'center',

        justifyContent: 'space-between',
        height: heightPixel(140)
    },
    DetailsTitle: {
        fontFamily: Fonts.faktumSemiBold,
        fontSize: fontPixel(18),
        color: Colors.text
    },
    details: {
        width: '90%',
        alignItems: 'center',
        height: 85,
        justifyContent: 'space-between',
    },
    rowDetails: {
        width: '100%',
        flexDirection: 'row',
        height: 35,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    amountText: {
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(14),
        color: Colors.text
    },
    operationReminderWrap: {
        marginTop: 50,
        width: '90%',
        alignItems: 'flex-start'
    },
    operationReminderTitle: {
        color: Colors.pendingYellow,
        fontFamily: Fonts.faktumMedium,
        fontSize: fontPixel(16),

    },
    list: {
        minHeight: heightPixel(20),
        // flexWrap:'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '90%',
        marginVertical: pixelSizeVertical(10),

    },
    bodyText: {

        lineHeight: heightPixel(20),
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(14),
        color: Colors.text
    },
    proceedBtn: {
        justifyContent: 'center',
        width: widthPixel(300),
        backgroundColor: Colors.primary,
        marginBottom: 20,
    },
    btnText: {
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumSemiBold,
        color: Colors.text
    },
})

export default TransferScreen;
