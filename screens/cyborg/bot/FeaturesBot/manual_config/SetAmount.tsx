import React, {useState} from 'react';

import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import HeaderWithTitle from "../../../../../components/cyborg/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../../../../../helpers/normalize";
import {CyborgStackScreenProps, RootStackScreenProps} from "../../../../../types";
import * as yup from "yup";
import {useFormik} from "formik";
import TextInput from "../../../../../components/inputs/TextInput";
import {Fonts} from "../../../../../constants/Fonts";
import Colors from "../../../../../constants/Colors";
import {MyButton} from "../../../../../components/MyButton";
import {useAppDispatch} from "../../../../../app/hooks";
import {updateBotManualConfig} from "../../../../../app/slices/dataSlice";


const formSchema = yup.object().shape({
    amount: yup.string().required('Amount is required').matches(
        /^[1-9][0-9]*$/,
        "Invalid number type"
    ),
    strategyPeriod: yup.string().required('Strategy period is required').matches(
        /^[1-9][0-9]*$/,
        "Invalid number type"
    ),

})

const SetAmount = ({navigation}: CyborgStackScreenProps<'SetAmount'>) => {


    const dispatch = useAppDispatch()

    const [amountContent, setAmountContent] = useState('100');
    const [focusAmount, setFocusAmount] = useState(false);


    const [focusStrategyPeriod, setFocusStrategyPeriod] = useState(false);

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
            amount: amountContent,
            strategyPeriod: '',


        },
        onSubmit: (values) => {
            const {amount, strategyPeriod} = values

            dispatch(updateBotManualConfig({
                amount,
                strategyPeriod
            }))
            navigation.navigate('EntriesScreen')

        }
    });


    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#4E044B', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}


            >
                <KeyboardAwareScrollView style={{
                    width: '100%'
                }} contentContainerStyle={styles.scrollView} scrollEnabled
                                         showsVerticalScrollIndicator={false}>


                    <HeaderWithTitle title='Configure Manually' step currentStep={'1'} totalStep={'3'}/>


                    <View style={styles.authContainer}>

                        <View style={styles.addFundContainer}>
                            <TouchableOpacity onPress={() => setAmountContent('100')} style={[styles.choicePill, {}]}>
                                <View style={styles.Icon}>
                                    <Image
                                        source={{uri: 'https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663'}}
                                        style={styles.logo}/>
                                </View>

                                <Text style={styles.amount}>
                                    $100
                                </Text>

                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => setAmountContent('500')} style={[styles.choicePill, {}]}>
                                <View style={styles.Icon}>
                                    <Image
                                        source={{uri: 'https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663'}}
                                        style={styles.logo}/>
                                </View>
                                <Text style={styles.amount}>
                                    $500
                                </Text>

                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => setAmountContent('1000')} style={[styles.choicePill, {}]}>
                                <View style={styles.Icon}>
                                    <Image
                                        source={{uri: 'https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663'}}
                                        style={styles.logo}/>
                                </View>
                                <Text style={styles.amount}>
                                    $1000
                                </Text>

                            </TouchableOpacity>


                        </View>


                        <TextInput
                            icon
                            imageUri={'https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663'}
                            placeholder="Enter amount"
                            keyboardType={"number-pad"}
                            touched={touched.amount}
                            error={touched.amount && errors.amount}
                            onFocus={() => setFocusAmount(true)}
                            onChangeText={(e) => {
                                handleChange('amount')(e);
                                setAmountContent(e);
                            }}

                            onBlur={(e) => {
                                handleBlur('amount')(e);

                                setFocusAmount(false);
                            }}
                            defaultValue={amountContent}
                            focus={focusAmount}
                            value={values.amount}
                            label="Amount"/>


                        <TextInput

                            placeholder=""
                            keyboardType={"number-pad"}
                            touched={touched.strategyPeriod}
                            error={touched.strategyPeriod && errors.strategyPeriod}
                            onFocus={() => setFocusStrategyPeriod(true)}
                            onChangeText={(e) => {
                                handleChange('strategyPeriod')(e);

                            }}

                            onBlur={(e) => {
                                handleBlur('strategyPeriod')(e);

                                setFocusStrategyPeriod(false);
                            }}

                            focus={focusStrategyPeriod}
                            value={values.strategyPeriod}
                            label="Strategy Period"/>

                    </View>

                    <MyButton onPress={() => handleSubmit()} disabled={!isValid} style={[styles.button, {
                        backgroundColor: !isValid ? Colors.border : Colors.primary
                    }]}>
                        <Text style={styles.buttonTxt}>
                            Continue
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

    },
    scrollView: {

        width: '100%',
        alignItems: "center"
    },
    authContainer: {
        marginTop: 20,

        justifyContent: 'space-evenly',
        width: '90%',
        alignItems: 'center',
    },
    addFundContainer: {
        width: '100%',
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        height: heightPixel(80),
    },
    addFund: {
        marginTop: 10,
        width: '100%',
        paddingHorizontal: pixelSizeHorizontal(20),
        height: heightPixel(80),
        alignItems: 'flex-start',
        justifyContent: 'center',

    },
    addFundText: {
        width: '70%',
        color: Colors.textDark,
        lineHeight: heightPixel(34),
        fontSize: fontPixel(24),
        fontFamily: Fonts.faktumBold
    },

    choicePill: {
        paddingHorizontal: pixelSizeHorizontal(15),
        borderRadius: 30,
        flexDirection: 'row',
        backgroundColor: Colors.secondary,

        width: 110,
        height: heightPixel(45),
        alignItems: 'center',
        justifyContent: 'center'
    },
    amount: {
        marginLeft: 8,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumSemiBold,
        color: Colors.text
    },
    Icon: {
        // backgroundColor:Colors.purplePrimary,
        borderRadius: 40,
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        borderRadius: 20,
        width: '90%',
        height: '90%',
        resizeMode: 'cover',

    },
    button: {
        width: '90%',
        bottom: 0,
        justifyContent: 'center',
    },
    buttonTxt: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(18),
        color: "#fff"
    },
})

export default SetAmount;
