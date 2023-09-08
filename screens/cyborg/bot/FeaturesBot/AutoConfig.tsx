import React, {SetStateAction, useState} from 'react';

import {Text, View, StyleSheet, ScrollView, Platform} from 'react-native';
import {CyborgStackScreenProps, RootStackScreenProps} from "../../../../types";
import HeaderWithTitle from "../../../../components/cyborg/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import * as yup from "yup";
import {useFormik} from "formik";
import TextInput from "../../../../components/inputs/TextInput";
import {fontPixel, heightPixel, pixelSizeVertical} from "../../../../helpers/normalize";
import {MyButton} from "../../../../components/MyButton";
import Colors from "../../../../constants/Colors";
import {Fonts} from "../../../../constants/Fonts";
import IOSSegmentContol from "../../../../components/segment-control/IOSSegmentContol";
import SegmentedControl from "../../../../components/segment-control/SegmentContol";
import HorizontalLine from "../../../../components/HorizontalLine";
import {Ionicons} from "@expo/vector-icons";


const formSchema = yup.object().shape({


    botName: yup.string().required('Bot name is required'),
    amountCapital: yup.string().required('Total amount capital').matches(
        /^[1-9][0-9]*$/,
        "Invalid number type"
    ),
    strategyPeriod: yup.string().required('Strategy period is required').matches(
        /^[1-9][0-9]*$/,
        "Invalid number type"
    ),

    botLeverage: yup.string().required('Provide Bot leverage').matches(
        /^[1-9][0-9]*$/,
        "Invalid number type"
    ),
    priceMovement: yup.string().required('Price movement  is required').matches(
        /^[1-9][0-9]*$/,
        "Invalid number type"
    ),
    averageMovement: yup.string().required('Crypto Average movement').matches(
        /^[1-9][0-9]*$/,
        "Invalid number type"
    ),
    takeProfit: yup.string().required('Take profit is required').matches(
        /^[1-9][0-9]*$/,
        "Invalid number type"
    ),

});

const AutoConfig = ({navigation}: CyborgStackScreenProps<'AutoConfig'>) => {


    const [focusBotName, setFocusBotName] = useState(false);
    const [focusAmountCapital, setFocusAmountCapital] = useState(false);
    const [focusStrategyPeriod, setFocusStrategyPeriod] = useState(false);
    const [focusBotLeverage, setFocusBotLeverage] = useState(false);
    const [focusPriceMovement, setFocusPriceMovement] = useState(false);
    const [focusTakeProfit, setFocusTakeProfit] = useState(false);

    const [tabIndex, setTabIndex] = useState(0);
    const handleTabsChange = (index: SetStateAction<number>) => {
        setTabIndex(index);
        //  setScreen(index === 0 ? 'Banks' : 'Wallets')
    };
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
            botName: '',
            amountCapital: '',
            strategyPeriod: '',

            botLeverage: '',
            priceMovement: '',
            averageMovement: '',
            takeProfit: '', //One-Shot


        },
        onSubmit: (values) => {
            const {amountCapital} = values;


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
                <KeyboardAwareScrollView style={{
                    width: '100%'
                }} contentContainerStyle={styles.scrollView} scrollEnabled
                                         showsVerticalScrollIndicator={false}>


                    <HeaderWithTitle title='Bot Configure' step totalStep={'6'} currentStep={'5'}/>


                    <View style={styles.authContainer}>

                        <TextInput

                            placeholder="Bot name"
                            keyboardType={"default"}
                            touched={touched.botName}
                            error={touched.botName && errors.botName}
                            onFocus={() => setFocusBotName(true)}
                            onChangeText={(e) => {
                                handleChange('amount')(e);

                            }}

                            onBlur={(e) => {
                                handleBlur('botName')(e);

                                setFocusBotName(false);
                            }}

                            focus={focusBotName}
                            value={values.botName}
                            label="Bot Name"/>

                        <TextInput
                            icon
                            imageUri={'https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663'}
                            placeholder=""
                            keyboardType={"number-pad"}
                            touched={touched.amountCapital}
                            error={touched.amountCapital && errors.amountCapital}
                            onFocus={() => setFocusAmountCapital(true)}
                            onChangeText={(e) => {
                                handleChange('amountCapital')(e);

                            }}

                            onBlur={(e) => {
                                handleBlur('amountCapital')(e);

                                setFocusAmountCapital(false);
                            }}

                            focus={focusAmountCapital}
                            value={values.amountCapital}
                            label="Total amount of capital"/>


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
                        <TextInput

                            placeholder=""
                            keyboardType={"number-pad"}
                            touched={touched.botLeverage}
                            error={touched.botLeverage && errors.botLeverage}
                            onFocus={() => setFocusBotLeverage(true)}
                            onChangeText={(e) => {
                                handleChange('botLeverage')(e);

                            }}

                            onBlur={(e) => {
                                handleBlur('botLeverage')(e);

                                setFocusBotLeverage(false);
                            }}

                            focus={focusBotLeverage}
                            value={values.botLeverage}
                            label="Bot Leverage"/>



                        {
                            Platform.OS === 'ios' ?

                                <IOSSegmentContol tabs={["Low Risk (ADL)", "Medium Risk (AL)"]}
                                                  currentIndex={tabIndex}
                                                  onChange={handleTabsChange}
                                                  segmentedControlBackgroundColor={Colors.purplePrimary}
                                                  activeSegmentBackgroundColor={"#fff"}
                                                  activeTextColor={Colors.textDark}
                                                  textColor={"#fff"}
                                                  paddingVertical={pixelSizeVertical(12)}/>
                                :

                                <SegmentedControl tabs={["Low Risk (ADL)", "Medium Risk (AL)"]}
                                                  currentIndex={tabIndex}
                                                  onChange={handleTabsChange}
                                                  segmentedControlBackgroundColor={Colors.tintPrimary}
                                                  activeSegmentBackgroundColor={Colors.primary}
                                                  activeTextColor={Colors.textDark}
                                                  textColor={"#CDD4D7"}
                                                  paddingVertical={pixelSizeVertical(16)}/>
                        }
<View style={styles.note}>
    <Ionicons name="ios-information-circle-outline" size={14} color={Colors.success} />
    {
        tabIndex == 0 ?

    <Text style={styles.noteText}>
    Saves more trades when the market is going against you.
  </Text>
            :
            <Text style={styles.noteText}>
                Adds more capital to trade when market is in your favor
            </Text>
    }
</View>
                        <HorizontalLine margin={20}/>

                        <TextInput

                            placeholder=""
                            keyboardType={"number-pad"}
                            touched={touched.priceMovement}
                            error={touched.priceMovement && errors.priceMovement}
                            onFocus={() => setFocusPriceMovement(true)}
                            onChangeText={(e) => {
                                handleChange('priceMovement')(e);

                            }}

                            onBlur={(e) => {
                                handleBlur('priceMovement')(e);

                                setFocusPriceMovement(false);
                            }}

                            focus={focusPriceMovement}
                            value={values.priceMovement}
                            label="Price % Movement you are expecting"/>

                        <TextInput

                            placeholder=""
                            keyboardType={"number-pad"}
                            touched={touched.takeProfit}
                            error={touched.takeProfit && errors.takeProfit}
                            onFocus={() => setFocusTakeProfit(true)}
                            onChangeText={(e) => {
                                handleChange('takeProfit')(e);

                            }}

                            onBlur={(e) => {
                                handleBlur('takeProfit')(e);

                                setFocusTakeProfit(false);
                            }}

                            focus={focusTakeProfit}
                            value={values.takeProfit}
                            label="Take Profit"/>
                    </View>

                    <MyButton onPress={() => handleSubmit()} disabled={!isValid} style={[styles.button, {
                        backgroundColor: !isValid ? Colors.border : Colors.purplePrimary
                    }]}>
                        <Text style={styles.buttonTxt}>
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

    },
    scrollView: {

        width: '100%',
        alignItems: "center"
    },
    authContainer: {
        marginTop: 20,
        minHeight: heightPixel(300),
        justifyContent: 'flex-start',
        width: '90%',
        alignItems: 'center',
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
    note:{
        flexDirection:'row',

        width:'100%',
        alignItems:'center',
        marginVertical:pixelSizeVertical(10),

    },
    noteText:{
marginLeft:5,
        fontFamily: Fonts.faktumMedium,
        fontSize: fontPixel(14),
        color:Colors.success
    }
})

export default AutoConfig;
