import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Colors from "../../constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import {fontPixel, heightPixel, pixelSizeHorizontal} from "../../helpers/normalize";
import {Fonts} from "../../constants/Fonts";
import {useNavigation} from "@react-navigation/native";


interface props {
    title?: string,
    subTitle?: string,
    headerAction?:()=>void,
    headerButton?:JSX.Element
}

const HeaderWithTitle = ({title, subTitle,headerButton,headerAction}: props) => {

    const {goBack} = useNavigation()

    return (
        <View style={styles.topBar}>
            <TouchableOpacity style={[styles.backBtn, {
                //backgroundColor: '#030D34',
            }]} onPress={goBack}>
                <Ionicons name="md-chevron-back" color={"#fff"} size={heightPixel(24)}/>
            </TouchableOpacity>

            <View style={styles.titleWrap}>
                <Text style={styles.title}>
                    {title}
                </Text>

            </View>

            <TouchableOpacity onPress={headerAction} style={styles.rightBtn}>
                {headerButton}
            </TouchableOpacity>
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
        // borderBottomColor: "#E5E7EB",
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
        color: "#fff",
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumSemiBold
    },
    titleWrap:{
        width: '35%',
        alignItems:'center',
        justifyContent:'center',
        height:'100%'
    }
})

export default HeaderWithTitle;
