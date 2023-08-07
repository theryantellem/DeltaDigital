import {Text, TextInputProps, TextInput as RNTextInput, StyleSheet, View, TouchableOpacity} from "react-native";
import React, {FC} from "react";
import Colors from "../../constants/Colors";

import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical} from "../../helpers/normalize";
import {Ionicons} from "@expo/vector-icons";

import {Fonts} from "../../constants/Fonts";
import Animated, {FadeInDown, FadeOutDown} from "react-native-reanimated";
import {useAppSelector} from "../../app/hooks";


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


const SearchInput: FC<Props> = ({
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



    return (



        <View style={[styles.inputContainer, {

            backgroundColor: Colors.secondary,
            height: inputHeight ? inputHeight : heightPixel(55),
            width:'100%',
        }]}>
                <View style={styles.leftIcon}>
                    <Ionicons name="ios-search-outline" size={20} color="#fff" />
                </View>

            <RNTextInput

                {...props}
                placeholder={placeholder}
                keyboardAppearance={'dark'}
                placeholderTextColor={"#9CA3AF"}
                style={[styles.input, {
                    width:  '90%',
                    color: '#fff',

                }]}/>

        </View>






    )
}

const styles = StyleSheet.create({
    inputWrap: {
        width: '100%',
        justifyContent: "center",

    },
    input: {
        fontSize: fontPixel(14),
        paddingHorizontal: pixelSizeHorizontal(16),
        fontFamily: Fonts.faktumMedium,
        height: '100%',

    },
    label: {
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumMedium,
    },
    errorMessage: {
        position: 'relative',


        fontSize: fontPixel(12),
        color: Colors.errorRed,
        textTransform: 'capitalize',
        fontFamily: Fonts.faktumSemiBold,
    },
    inputContainer: {
        borderRadius:  10,
       // borderColor:Colors.borderColor,
        alignItems:'center',
        justifyContent:'center',
        marginTop: 8,
        marginBottom: 10,
      //  borderWidth: 1,
        flexDirection: 'row',


    },
    passBtn: {
        height: '100%',
        width: '8%',
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
    signTxt: {

        fontSize: fontPixel(14),
        color: Colors.light.text,
        fontFamily: Fonts.faktumBold,

    }

})

export default SearchInput
