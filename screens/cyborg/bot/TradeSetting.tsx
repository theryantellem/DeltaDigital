import React, {useState} from 'react';

import {Text, View, StyleSheet, Switch} from 'react-native';
import HeaderWithTitle from "../../../components/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {KeyboardAwareFlatList, KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {RootStackScreenProps} from "../../../types";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical} from "../../../helpers/normalize";
import {Fonts} from "../../../constants/Fonts";
import Colors from "../../../constants/Colors";
import {useFormik} from "formik";
import * as yup from "yup";
import TextInput from "../../../components/inputs/TextInput";
import Slider from "@react-native-community/slider";
import {MyButton} from "../../../components/MyButton";
import ReviewScreen from "./ReviewScreen";


const SWITCH_TRACK_COLOR = {
    true: Colors.primary,
    false: Colors.success,
};


const formSchema = yup.object().shape({


    amount: yup.string().required('Amount is required').matches(
        /^[1-9][0-9]*$/,
        "Invalid number type"
    ),
    marginLimit: yup.string().required('Margin Limit call is required').matches(
        /^[1-9][0-9]*$/,
        "Invalid number type"
    ),
    takeProfit: yup.string().required('Take Profit is required').matches(
        /^[1-9][0-9]*$/,
        "Invalid number type"
    ),

});


const TradeSetting = ({navigation}: RootStackScreenProps<'TradeSetting'>) => {


    const [amountContent, setAmountContent] = useState('');
    const [focusAmount, setFocusAmount] = useState(false);

    const [takeProfit, setTakeProfit] = useState('');
    const [focusTakeProfit, setFocusTakeProfit] = useState(false);

    const [marginLimitCall, setMarginLimitCall] = useState('');
    const [focusMarginLimitCall, setFocusMarginLimitCall] = useState(false);

    const [value, setValue] = useState(0);

    const [switchToggle, setSwitchToggle] = useState(false);

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
            amount: '',
            marginLimit: '',
            takeProfit: '',


        },
        onSubmit: (values) => {
            const {amount} = values;


            navigation.navigate('ReviewScreen')
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


                <HeaderWithTitle title='Trade setting'/>
                <KeyboardAwareScrollView style={{
                    width: '100%'
                }} contentContainerStyle={styles.scrollView} scrollEnabled
                                         showsVerticalScrollIndicator={false}>

                    <View style={styles.planInfo}>

                        <View style={styles.planMessage}>
                            <Text style={styles.planMessageTxt}>
                                The first buy-in amount is calculated according to the currency pair, principle and
                                trade unit
                            </Text>
                        </View>
                    </View>

                    <View style={styles.authContainer}>

                        <TextInput
                            icon={"BTC"}
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
                            label="First buy in amount"/>


                        <View style={styles.switchWrap}>
                            <Text style={styles.label}>
                                Open position doubled
                            </Text>
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
                        </View>


                        <TextInput

                            placeholder="Margin call limit"
                            keyboardType={"number-pad"}
                            touched={touched.marginLimit}
                            error={touched.marginLimit && errors.marginLimit}
                            onFocus={() => setFocusMarginLimitCall(true)}
                            onChangeText={(e) => {
                                handleChange('marginLimit')(e);
                                setMarginLimitCall(e);
                            }}

                            onBlur={(e) => {
                                handleBlur('marginLimit')(e);

                                setFocusMarginLimitCall(false);
                            }}

                            focus={focusMarginLimitCall}
                            defaultValue={marginLimitCall}
                            value={values.marginLimit}
                            label="Margin call limit"/>


                        <TextInput

                            placeholder="Take profit ratio"
                            keyboardType={"number-pad"}
                            touched={touched.takeProfit}
                            error={touched.takeProfit && errors.takeProfit}
                            onFocus={() => setFocusTakeProfit(true)}
                            onChangeText={(e) => {
                                handleChange('takeProfit')(e);
                                setTakeProfit(e);
                            }}

                            onBlur={(e) => {
                                handleBlur('takeProfit')(e);

                                setFocusTakeProfit(false);
                            }}

                            focus={focusTakeProfit}
                            defaultValue={takeProfit}
                            value={values.takeProfit}
                            label="Whole position take profit ratio"/>


                        <View style={styles.switchWrap}>
                            <Text style={styles.label}>
                                Whole position stop loss {value}
                            </Text>
                            <Slider
                                style={{width: '100%', height: 40}}
                                minimumValue={1}
                                step={1}
                                maximumValue={100}
                                onValueChange={(value)=>setValue(value)}
                                minimumTrackTintColor={Colors.primary}
                                maximumTrackTintColor="#787880"
                            />
                        </View>
                    </View>




                </KeyboardAwareScrollView>

                <MyButton onPress={() => handleSubmit()} disabled={!isValid} style={[styles.button, {
                    backgroundColor: !isValid ? Colors.border : Colors.primary
                }]}>
                    <Text style={styles.buttonTxt}>
                        Continue
                    </Text>
                </MyButton>

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
    planInfo: {
        width: '100%',
        paddingHorizontal: pixelSizeHorizontal(20),
        height: heightPixel(70),
        alignItems: 'flex-start',
        justifyContent: 'flex-start',

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
        marginTop: 20,
        minHeight: heightPixel(300),
        justifyContent: 'flex-start',
        width: '90%',
        alignItems: 'center',
    },
    switchWrap: {
        marginBottom: 25,
        width: '100%',
        height: 65,
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    label: {
        color: Colors.text,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumMedium,
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

export default TradeSetting;
