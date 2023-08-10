import React, {useState} from 'react';

import {Text, View, StyleSheet} from 'react-native';
import HeaderWithTitle from "../../../../../components/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {fontPixel, heightPixel, pixelSizeHorizontal} from "../../../../../helpers/normalize";
import {Fonts} from "../../../../../constants/Fonts";
import Colors from "../../../../../constants/Colors";
import {RootStackScreenProps} from "../../../../../types";
import HorizontalLine from "../../../../../components/HorizontalLine";
import * as yup from "yup";
import {useFormik} from "formik";
import TextInput from "../../../../../components/inputs/TextInput";
import {MyButton} from "../../../../../components/MyButton";
import {updateBotManualConfig} from "../../../../../app/slices/dataSlice";
import {useAppDispatch} from "../../../../../app/hooks";



const formSchema = yup.object().shape({
    initialEntry: yup.string().required('Enter initial entry amount').matches(
        /^[1-9][0-9]*$/,
        "Invalid number type"
    ),
    entriesAfter: yup.string().required('Enter number of entries after').matches(
        /^[1-9][0-9]*$/,
        "Invalid number type"
    ),

})


const EntriesScreen = ({navigation}:RootStackScreenProps<'EntriesScreen'>) => {
    const dispatch = useAppDispatch()

    const [focusInitialEntry, setFocusInitialEntry] = useState(false)
    const [focusEntryAfter, setFocusEntryAfter] = useState(false)

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
            initialEntry: '',
            entriesAfter: '',



        },
        onSubmit: (values) => {
            const {entriesAfter,initialEntry}= values
            dispatch(updateBotManualConfig({
                initialEntryAmount:initialEntry,
                numberOfEntry:entriesAfter
            }))
            navigation.navigate('CustomizeEntries')

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


                    <HeaderWithTitle title='Configure Manually' step currentStep={'2'} totalStep={'3'}/>


                    <View style={styles.planInfo}>
                        <Text style={styles.planTitle}>
                            Tell your Bot number of entries to take per trade
                        </Text>
                        <View style={styles.planMessage}>
                            <Text style={styles.planMessageTxt}>
                                Please provide your initial entry + additional number of entries you would like per trade.
                            </Text>
                        </View>
                    </View>

                    <HorizontalLine margin={40}/>

                    <View style={styles.authContainer}>


                        <TextInput
                            leftIcon={"$"}
                            placeholder="Enter amount"
                            keyboardType={"number-pad"}
                            touched={touched.initialEntry}
                            error={touched.initialEntry && errors.initialEntry}
                            onFocus={() => setFocusInitialEntry(true)}
                            onChangeText={(e) => {
                                handleChange('initialEntry')(e);

                            }}

                            onBlur={(e) => {
                                handleBlur('initialEntry')(e);

                                setFocusInitialEntry(false);
                            }}

                            focus={focusInitialEntry}
                            value={values.initialEntry}
                            label="Initial Entry Amount"/>



                        <TextInput

                            placeholder=""
                            keyboardType={"number-pad"}
                            touched={touched.entriesAfter}
                            error={touched.entriesAfter && errors.entriesAfter}
                            onFocus={() => setFocusEntryAfter(true)}
                            onChangeText={(e) => {
                                handleChange('entriesAfter')(e);

                            }}

                            onBlur={(e) => {
                                handleBlur('entriesAfter')(e);

                                setFocusEntryAfter(false);
                            }}

                            focus={focusEntryAfter}
                            value={values.entriesAfter}
                            label="Number Of Entries After"/>

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
    planInfo: {
        width: '100%',
        paddingHorizontal: pixelSizeHorizontal(20),
        height: heightPixel(90),
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

export default EntriesScreen;
