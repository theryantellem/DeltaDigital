import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Pressable} from 'react-native';
import Colors from "../../../constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../../../helpers/normalize";
import {Fonts} from "../../../constants/Fonts";
import {useNavigation} from "@react-navigation/native";


interface props {
    title?: string,
    subTitle?: string,
    headerAction?: () => void,
    headerButton?: JSX.Element,
    step?: boolean,
    currentStep?: string,
    clearData?: () => void,
    totalStep?: string,
    logAction?: () => void,

    isButton?: boolean
    logScreen?: boolean
    goBackLog?: () => void,
}

const HeaderWithTitle = ({title, clearData,logScreen, goBackLog,logAction, isButton, subTitle, headerButton, headerAction, step, currentStep, totalStep}: props) => {

    const {goBack} = useNavigation()
    const goBackNav = () => {
     /*   if (clearData) {
            clearData()
        }*/
        if(logScreen){
            if (goBackLog) {
                goBackLog()
            }
        }else(
            goBack()
        )


    }

    const seeLogs = () => {
        if (logAction) {
            logAction()
        }
    }
    return (
        <View style={styles.topBar}>
            <TouchableOpacity style={[styles.backBtn, {
                //backgroundColor: '#030D34',
            }]} onPress={goBackNav}>
                <Ionicons name="md-chevron-back" color={"#fff"} size={heightPixel(24)}/>

            </TouchableOpacity>

            <Pressable onPress={seeLogs} style={[styles.titleWrap, {}]}>
                <View style={[
                    isButton && {
                    height:'55%',
                        justifyContent:'center',
                        borderRadius:5,
                        backgroundColor: Colors.secondary,
                        paddingHorizontal: pixelSizeHorizontal(10),

                    }

                ]}>


                    <Text style={styles.title}>
                        {title}
                    </Text>
                </View>
            </Pressable>
            {
                !step &&

                <TouchableOpacity onPress={headerAction} style={styles.rightBtn}>
                    {headerButton}
                </TouchableOpacity>
            }
            {
                step &&
                <TouchableOpacity style={styles.count}>

                    <Text style={[styles.countText, {
                        color: Colors.text,
                    }]}>
                        {currentStep}/<Text style={{
                        color: currentStep == totalStep ? "#fff" : "#a7a7a7"
                    }}>{totalStep}</Text>
                    </Text>
                </TouchableOpacity>
            }
        </View>
    );

}

const styles = StyleSheet.create({
    topBar: {
        height: heightPixel(80),
        width: '100%',
        paddingHorizontal: pixelSizeHorizontal(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: "#E5E7EB",
        // borderBottomWidth: 1,
    },
    backBtn: {
        width: '20%',
        height: 40,
        borderRadius: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    rightBtn: {
        width: '20%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    title: {
        textAlign:'center',
        color: "#fff",
        textTransform:'capitalize',
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumSemiBold
    },
    titleWrap: {
        width: '52%',

        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    count: {
        width: '20%',
        height: 40,
        paddingHorizontal: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    countText: {

        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumMedium
    },
})

export default HeaderWithTitle;
