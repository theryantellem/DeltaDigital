//for custom text input here
import {StyleSheet, Text, TextInput as RNTextInput, TextInputProps, TouchableOpacity, View} from "react-native";
import React, {FC} from "react";
import {Ionicons} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import {fontPixel, heightPixel} from "../../helpers/normalize";
import {Fonts} from "../../constants/Fonts";
import Animated from "react-native-reanimated";


interface Props extends TextInputProps {
    placeholder?: string;
    error?: string;
    label: string;
    touched?: boolean;
    password?: boolean;
    value: string;
    icon?: any;
    text?: string;
    Btn: boolean;
    action?: any;
}


//this is custom text input to allow use mimic a select picker

const SelectInput = ({
                         label,
                         password,
                         placeholder,
                         error,
                         touched,
                         value,
                         action,
                         text,
                         icon, Btn,
                         ...props
                     }: Props) => {


    let validationColor;

    validationColor = !touched ? Colors.borderColor : error ? Colors.errorRed : Colors.borderColor

    return (
        <View style={{
            width: '100%',
            height: heightPixel(120),

            justifyContent: 'center',

        }}>
            {
                label && <View style={styles.labelWrap}>
                    <Text style={[
                        {color: Colors.text},
                        styles.label]}>
                        {label}
                    </Text>


                </View>
            }
            <TouchableOpacity onPress={action} style={[styles.inputWrap, {borderColor: validationColor,}]}>

                <RNTextInput
                    onPressIn={action}
                    {...props}
                    placeholder={placeholder}
                    placeholderTextColor="#6D6D6D"
                    style={[styles.input, {
                        //  backgroundColor:  'rgba(151, 151, 151, 0.25)',
                        color: Colors.text,

                    }]}/>
                {
                    Btn
                    &&
                    <TouchableOpacity onPress={action} style={styles.btn}>
                        {
                            icon &&

                            <Ionicons name={icon} size={20}
                                      color={Colors.text}/>
                        }
                        {
                            text && <Text style={{
                                color: Colors.text,
                                fontSize: fontPixel(14),
                                fontFamily: Fonts.faktumBold,
                            }}>{text}</Text>
                        }

                    </TouchableOpacity>

                }
            </TouchableOpacity>


            <View style={styles.errorContainer}>

                {error && <Animated.Text
                    style={[styles.errorMessage, {
                        //left:isWidth ? 2 : 0,
                    }]}>
                    {error}
                </Animated.Text>
                }

            </View>

        </View>

    )
}


const styles = StyleSheet.create({
    //inputs
    input: {
        fontSize: fontPixel(16),
        lineHeight: heightPixel(20),
        padding: 10,
        width:'90%',
        fontFamily:Fonts.faktumSemiBold,
        height:'90%',
        textTransform: 'capitalize'
    },
    label: {
        //marginLeft: 10,
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumMedium,
    },
    errorMessage: {
        position: 'relative',

        lineHeight: heightPixel(15),
        fontSize: fontPixel(12),
        color: Colors.errorRed,
        textTransform: 'capitalize',
        fontFamily: Fonts.faktumMedium,
    },
    inputWrap: {
        width: '100%',
        height: heightPixel(56),
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 6,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    btn: {
        height: '100%',
        width: '10%',
        alignItems: 'flex-start',
        justifyContent: "center"
    },
    errorContainer: {
        height:'20%',
        width:'100%',
        paddingBottom: 10,
        justifyContent: 'space-between',
        flexDirection:'row',
    },
    labelWrap: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
})

export default SelectInput
