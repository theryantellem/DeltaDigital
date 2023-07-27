import {Text, TextInputProps, TextInput as RNTextInput, StyleSheet, View, TouchableOpacity, Image} from "react-native";
import React, {FC} from "react";
import Colors from "../../constants/Colors";

import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical} from "../../helpers/normalize";
import {Ionicons} from "@expo/vector-icons";

import {Fonts} from "../../constants/Fonts";
import Animated from "react-native-reanimated";


interface Props extends TextInputProps {
    inputBg?: string,
    placeholder: string;
    error?: string;
    inputHeight?: number;
    borderRadius?: number;
    inputWrapHeight?: number;
    label?: string;
    isWidth?: null | string | number,
    touched?: boolean;
    password?: boolean;
    leftIcon?: boolean | React.ReactNode;
    icon?: boolean | React.ReactNode;
    rightIcon?: boolean | React.ReactNode;
    focus?: boolean;
    rightText?: boolean;
    rightBtnText?: string;
    rightAction?: () => void;
    value: string;
    action?: () => void;
    passState?: boolean
    labelColor?: boolean
}


const BottomSheetInput: FC<Props> = ({
                                         rightIcon,
                                         inputBg,
                                         rightAction,
                                         rightBtnText,
                                         icon,
                                         borderRadius,
                                         inputWrapHeight,
                                         leftIcon,
                                         isWidth,
                                         rightText,
                                         inputHeight,
                                         label,
                                         password,
                                         placeholder,
                                         error,
                                         touched,
                                         focus,
                                         value,
                                         action,
                                         passState,
                                         labelColor,
                                         ...props
                                     }) => {


    let validationColor, validationLabelColor;

    validationColor = !touched ? Colors.border : focus ? Colors.primaryLight : error ? Colors.errorRed : "#fff"
    validationLabelColor = !touched ? Colors.textDark : focus ? Colors.textDark : error ? Colors.errorRed :"#fff"

    return (
        <View style={[styles.inputWrap, {
            height: inputWrapHeight ? inputWrapHeight : heightPixel(115),
            width: isWidth ? isWidth : '100%',
        }]}>
            {
                label && <View style={styles.labelWrap}>
                    <Text style={[
                        {color: "#fff"},
                        styles.label]}>
                        {label}
                    </Text>
                    {
                        rightText && <Text onPress={rightAction} style={[
                            {
                                color:"#fff",
                            },
                            styles.label]}>
                            {rightBtnText}
                        </Text>
                    }


                </View>
            }


            <View style={[styles.inputContainer, {
                borderRadius: borderRadius ? borderRadius : 6,
                borderColor: validationColor,
                backgroundColor: inputBg ? inputBg : 'transparent',
                height: inputHeight ? inputHeight : heightPixel(56),
            }]}>


                {leftIcon &&

                    <View style={styles.leftIcon}>
                        <Text style={styles.signTxt}>
                            {leftIcon}
                        </Text>
                    </View>
                }
                {
                    icon &&
                    <View style={styles.leftIcon}>

                        <View style={styles.Icon}>
                            <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/5968/5968260.png'}} style={styles.logo}/>
                        </View>
                    </View>
                }
                <RNTextInput

                    {...props}
                    placeholder={placeholder}

                    placeholderTextColor={"#9CA3AF"}
                    style={[styles.input, {
                        width: password || leftIcon || rightIcon || icon ? '88%' : '100%',
                        color: '#fff',

                    }]}/>

                {
                    rightIcon && <TouchableOpacity onPress={action} style={styles.passBtn}>

                        {rightIcon}

                    </TouchableOpacity>
                }
                {
                    password
                    &&
                    <TouchableOpacity onPress={action} style={styles.passBtn}>
                        {
                            passState ? <Ionicons name="md-eye" size={18} color="#C4C4C4"/>
                                : <Ionicons name="md-eye-off" size={18} color="#C4C4C4"/>
                        }

                    </TouchableOpacity>

                }
            </View>


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
    inputWrap: {
        width: '100%',
        justifyContent: "flex-start",

    },
    input: {
        fontSize: fontPixel(14),
        paddingHorizontal: pixelSizeHorizontal(16),
        fontFamily: Fonts.faktumSemiBold,
        height: '100%',

    },
    label: {

        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumMedium,
    },
    errorMessage: {
        position: 'relative',
        fontSize: fontPixel(12),
        color: Colors.errorRed,
        textTransform: 'capitalize',
        fontFamily: Fonts.faktumMedium,
    },
    inputContainer: {

        width: '100%',
        marginTop: 8,
        marginBottom: 10,
        borderWidth: 1,
        flexDirection: 'row',


    },
    passBtn: {
        height: '100%',
        width: '10%',
        alignItems: 'center',
        justifyContent: "center"
    },

    labelWrap: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    errorContainer: {

        height: '20%',
        width: '100%',

        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    leftIcon: {
        height: '100%',
        width: '8%',
        alignItems: 'flex-end',
        justifyContent: "center"
    },
    Icon:{
        borderRadius: 40,
        width: 20,
        height: 20,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    logo: {
        borderRadius: 20,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',

    },
    signTxt: {

        fontSize: fontPixel(14),
        color: Colors.text,
        fontFamily: Fonts.faktumBold,

    }

})

export default BottomSheetInput
