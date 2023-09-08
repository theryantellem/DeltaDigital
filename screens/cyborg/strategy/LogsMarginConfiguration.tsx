import React, {useEffect, useState} from 'react';

import {Text, View, StyleSheet} from 'react-native';
import HeaderWithTitle from "../../../components/cyborg/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import TextInput from "../../../components/inputs/TextInput";
import {Fonts} from "../../../constants/Fonts";
import {fontPixel, heightPixel} from "../../../helpers/normalize";
import Colors from "../../../constants/Colors";
import {CyborgStackScreenProps, RootStackScreenProps} from "../../../types";
import {MyButton} from "../../../components/MyButton";
import {Octicons} from "@expo/vector-icons";
import {addNotificationItem, updateBot, updateBotSetting} from "../../../app/slices/dataSlice";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";


const LogsMarginConfiguration = ({route, navigation}: CyborgStackScreenProps<'LogsMarginConfiguration'>) => {
    const {numrows,m_ratio,price_drop} = route.params



    const dispatch = useAppDispatch()
    const [numRows, setNumRows] = useState(numrows); // Default to 4 rows

    const [inputFields, setInputFields] = useState(Array.from({length: numRows}, () => ({mtRatio: '', priceDrop: ''})));


    // Function to handle changing the number of rows
    const handleNumRowsChange = (value: string) => {
        const newNumRows = parseInt(value, 10) || 0; // Convert to integer, default to 0 if not a valid number
        setNumRows(newNumRows);

        // Adjust the input fields array based on the new number of rows
        setInputFields((prevInputFields) => {
            const newInputFields = [...prevInputFields];
            while (newInputFields.length < newNumRows) {
                newInputFields.push({mtRatio: '', priceDrop: ''});
            }
            while (newInputFields.length > newNumRows) {
                newInputFields.pop();
            }
            return newInputFields;
        });
    };

    // Function to update input values
    const handleInputChange = (index, name, value) => {
        const newInputFields = [...inputFields];
        newInputFields[index][name] = value;
        setInputFields(newInputFields);
    };


    const validateFields = () => {
        for (let i = 0; i < numRows; i++) {
            if (!inputFields[i].mtRatio.trim() || !inputFields[i].priceDrop.trim()) {
                dispatch(addNotificationItem({
                    id: Math.random(),
                    type: 'error',
                    body: 'Please fill in all Margin Ratio and Price Drop fields.'
                }))
                //  Alert.alert('Validation Error', 'Please fill in all Margin Ratio and Price Drop fields.');
                return false;
            }
        }
        return true;
    };

    // Function to handle form submission
    const handleSubmit = () => {
        if (validateFields()) {
            // Proceed with the submission or any other action
            // ...
            // Alert.alert('Success', 'Form submitted successfully.');

            const mtRatioString = inputFields.map((item) => item.mtRatio).join("|");

// Merge "priceDrop" values into a single string
            const priceDropString = inputFields.map((item) => item.priceDrop).join("|");

            dispatch(updateBotSetting({
                price_drop: priceDropString,
                m_ratio: mtRatioString,

            }))
            navigation.goBack()
        }
    };

    // Function to split and fill input fields from strings
    const fillFromStrings = (mtRatioString: string, priceDropString: string) => {
        const mtRatioArray = mtRatioString.split('|');
        const priceDropArray = priceDropString.split('|');

        setInputFields((prevInputFields) => {
            const newInputFields = [...prevInputFields];
            for (let i = 0; i < numRows; i++) {
                newInputFields[i].mtRatio = mtRatioArray[i] || '';
                newInputFields[i].priceDrop = priceDropArray[i] || '';
            }
            return newInputFields;
        });
    };

    // Example values as strings separated by "|"
    const exampleMtRatioString = m_ratio;
    const examplePriceDropString = price_drop;

    // Fill input fields with example values
    useEffect(() => {
        fillFromStrings(exampleMtRatioString, examplePriceDropString);
    }, []);




    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#4E044B', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >


                <HeaderWithTitle title='Margin Configuration'/>
                <KeyboardAwareScrollView style={{
                    width: '100%'
                }} contentContainerStyle={styles.scrollView} scrollEnabled
                                         showsVerticalScrollIndicator={false}>

                    <View style={styles.authContainer}>

                        {inputFields.map((field, index) => (

                            <View style={styles.marginConfig} key={index}>

                                <TextInput
                                    isWidth={"46%"}
                                    // touched={touched.firstname}
                                    //  error={touched.firstname && errors.firstname}
                                    keyboardType={"default"}
                                    label={`Margin call drop ${index + 1} *`}
                                    value={field.mtRatio}
                                    defaultValue={field.mtRatio}
                                    onChangeText={(value) => handleInputChange(index, 'mtRatio', value)}


                                />


                                <TextInput
                                    isWidth={"46%"}
                                    // touched={touched.lastname}
                                    //  error={touched.lastname && errors.lastname}
                                    keyboardType={"default"}
                                    label={`Multiple buy in ratio ${index + 1} *`}

                                    value={field.priceDrop}
                                    defaultValue={field.priceDrop}
                                    onChangeText={(value) => handleInputChange(index, 'priceDrop', value)}
                                />
                                {/*
    <TouchableOpacity
        onPress={() => handleRemoveField(index)}
              style={styles.addMarginButton}>
        <Text style={[styles.btnText, {
            color: "#fff"
        }]}>
            Remove
        </Text>
    </TouchableOpacity>*/}


                            </View>


                        ))}


                    </View>


                </KeyboardAwareScrollView>

                <MyButton onPress={() => handleSubmit()} style={[styles.button, {
                    // backgroundColor: !isValid ? Colors.border : Colors.primary
                }]}>
                    <LinearGradient style={styles.createBtnGradient}
                                    colors={['#e602df', '#4406b0']}

                                    start={{x: 1, y: 0}}
                                    end={{x: 0.1, y: 0.3,}}

                        // locations={[0.1, 0.7,]}
                    >
                        <Octicons name="chevron-left" size={24} color="#fff"/>
                        <Text style={styles.buttonTxt}>
                            Continue
                        </Text>

                    </LinearGradient>
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
    marginConfigWrap: {
        width: '90%',
        alignItems: 'center',
        height: heightPixel(180),
        justifyContent: 'space-evenly',
        marginBottom: 25,
    },
    marginConfigData: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        height: heightPixel(60),
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderColor
    },
    marginConfig: {
        width: '100%',
        height: heightPixel(100),
        flexDirection: 'row',

        alignItems: 'center',
        justifyContent: 'space-between',

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
    createBtnGradient: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonTxt: {
        marginLeft: 20,
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(18),
        color: "#fff"
    },

})

export default LogsMarginConfiguration;
