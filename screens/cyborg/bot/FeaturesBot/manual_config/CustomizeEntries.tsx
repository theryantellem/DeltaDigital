import React, {useEffect, useState} from 'react';

import {Text, View, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import HeaderWithTitle from "../../../../../components/cyborg/header/HeaderWithTitle";
import HorizontalLine from "../../../../../components/HorizontalLine";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {fontPixel, heightPixel, pixelSizeHorizontal} from "../../../../../helpers/normalize";
import {Fonts} from "../../../../../constants/Fonts";
import Colors from "../../../../../constants/Colors";
import {CyborgStackScreenProps, RootStackScreenProps} from "../../../../../types";
import TextInput from "../../../../../components/inputs/TextInput";
import {Ionicons} from "@expo/vector-icons";
import {currencyFormatter} from "../../../../../helpers";
import {MyButton} from "../../../../../components/MyButton";
import {useAppSelector} from "../../../../../app/hooks";

const CustomizeEntries = ({navigation}: CyborgStackScreenProps<'CustomizeEntries'>) => {


    const dataSlice = useAppSelector(state => state.data)
    const {featureBotManualConfig} = dataSlice

    const [inputValue, setInputValue] = useState('1');
    const [inputFields, setInputFields] = useState([]);

    const [isValid, setIsValid] = useState(true);

    const handleGenerateFields = () => {
        const count = parseInt(featureBotManualConfig.numberOfEntry, 10);
        const fields = [];

        for (let i = 0; i < count; i++) {
            fields.push({price: '', ratio: ''});
        }

        setInputFields(fields);
    };


    useEffect(() => {
        const allInputsFilled = inputFields.every(
            (field) => field.price.trim() !== '' && field.ratio.trim() !== ''
        );

        if (!allInputsFilled) {
            setIsValid(false)
            return;
        }
        setIsValid(true)
    }, [inputFields]);

    const handleSaveData = () => {
       /* const allInputsFilled = inputFields.every(
            (field) => field.price.trim() !== '' && field.ratio.trim() !== ''
        );

        if (!allInputsFilled) {
            setIsValid(false)
            console.log('Incomplete Data', 'Please fill in all input fields.');
            return;
        }
        setIsValid(true)

        // Handle saving the data
        // For now, just log the data to the console
        console.log('Saved Data:', inputFields);*/

        navigation.navigate('AdditionalSettings')
    };

    useEffect(() => {
        handleGenerateFields()
    }, [])


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


                    <HeaderWithTitle title='Configure Manually' step currentStep={'2'} totalStep={'4'}/>


                    <View style={styles.planInfo}>
                        <Text style={styles.planTitle}>
                            Tell your Bot number of entries to take per trade
                        </Text>
                        <View style={styles.planMessage}>
                            <Text style={styles.planMessageTxt}>
                                Please provide your initial entry + additional number of entries you would like per
                                trade.
                            </Text>
                        </View>
                    </View>

                    <HorizontalLine margin={40}/>


                    <View style={styles.balanceTop}>

                        <TouchableOpacity style={styles.balanceTitle}>
                            <Text style={styles.balText}>
                                Available
                            </Text>


                        </TouchableOpacity>

                        <View style={styles.balanceGraph}>

                            <Text
                                style={styles.balance}>

                                {currencyFormatter('en-US', 'USD').format(4242)}
                            </Text>

                        </View>

                    </View>


                    <View style={styles.details}>
                        <View style={styles.rows}>
                            <Text style={styles.rowTitle}>
                                Initial Entry Amount
                            </Text>
                            <Text style={styles.rowNumber}>
                                ${featureBotManualConfig.initialEntryAmount}
                            </Text>
                        </View>
                        <View style={styles.myBorderTwo}/>

                        <View style={styles.rows}>
                            <Text style={styles.rowTitle}>
                                Number Of Entry After
                            </Text>
                            <Text style={styles.rowNumber}>
                                {featureBotManualConfig.numberOfEntry}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.authContainer}>


                        {inputFields.map((field, index) => (
                            <View key={index} style={styles.fieldRowContainer}>
                                <TextInput
                                    isWidth={'45%'}
                                    label={`Entry #${index + 1} Price Raise`}
                                    placeholder="Price"
                                    value={field.price}
                                    onChangeText={(text) => {
                                        const newFields = [...inputFields];
                                        newFields[index].price = text;
                                        setInputFields(newFields);
                                    }}
                                />
                                <TextInput
                                    isWidth={'45%'}
                                    label="Bot Ratio"
                                    placeholder="Ratio"
                                    value={field.ratio}
                                    onChangeText={(text) => {
                                        const newFields = [...inputFields];
                                        newFields[index].ratio = text;
                                        setInputFields(newFields);
                                    }}
                                />
                            </View>
                        ))}


                    </View>

                    <MyButton onPress={() => handleSaveData()} style={[styles.button, {
                        // backgroundColor: !isValid ? Colors.border : Colors.primary
                        backgroundColor: Colors.primary
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
        marginTop: 30,

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
    details: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: heightPixel(130),
        width: '90%',
        marginBottom: Platform.OS == 'android' ? 20 : 0,
        borderRadius: 12,
        borderColor: Colors.borderColor,
        borderWidth: 0.5,
        backgroundColor: Colors.secondary,
        shadowColor: "#212121",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.120,
        shadowRadius: 7.22,

        elevation: 3,
    },
    rows: {
        padding: 15,
        height: '40%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    rowTitle: {
        fontFamily: Fonts.faktumMedium,
        color: Colors.text,
        fontSize: fontPixel(14)
    },
    rowNumber: {
        fontFamily: Fonts.faktumMedium,
        color: Colors.tintText,
        fontSize: fontPixel(14)
    },
    myBorderTwo: {
        width: '100%',
        borderWidth: 0.5,
        borderColor: Colors.borderColor,
    },
    fieldRowContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row'
    },
    balanceTop: {
        width: '100%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    balanceTitle: {

        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: heightPixel(30),
    },
    balText: {
        fontFamily: Fonts.faktumMedium,
        color: Colors.tintText,
        fontSize: fontPixel(12),
        marginRight: 5,
    },
    balanceGraph: {
        width: '90%',
        height: heightPixel(45),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',

    },
    balance: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(26),
        color: Colors.successChart
    },
})

export default CustomizeEntries;
