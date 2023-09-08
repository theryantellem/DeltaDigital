import React from 'react';

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../../../helpers/normalize";
import {Ionicons} from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import {useNavigation} from "@react-navigation/native";
import {Fonts} from "../../../constants/Fonts";


interface authProps {
    title?:string,
    screen?:string
    login?:boolean
}

const AuthNavBar = ({title, screen,login}:authProps) => {
    const {goBack,navigate} = useNavigation()

    const goto = () => {
      navigate(screen)
    }
    return (
        <View style={[styles.authNavBar,{

        }]}>
            {
                !login &&  <TouchableOpacity style={styles.backBtn} onPress={goBack}>

                    <Ionicons name="md-chevron-back" color={"#fff"} size={heightPixel(24)} />
                </TouchableOpacity>
            }


            <View style={styles.titleWrap}>
                <TouchableOpacity style={styles.topBtn} onPress={goto}>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                </TouchableOpacity>

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    authNavBar: {
flexDirection:'row',
        width: '100%',
        paddingHorizontal:pixelSizeHorizontal(10),
        height: heightPixel(60),
        alignItems: 'center',
        justifyContent: 'space-between',


    },
    backBtn: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: widthPixel(50),
        height: '100%'
    },
    titleWrap:{
        alignItems:'flex-end',
        resizeMode:"cover",
        justifyContent:'center',
        width:'40%',
        height:'100%'
    },
    title:{
        color:Colors.primary,
        fontSize:fontPixel(18),
        fontFamily:Fonts.faktumSemiBold
    },
    topBtn:{
        alignItems:'flex-end',
        height:heightPixel(40),
        justifyContent:'center',
width:widthPixel(150)
    }
})

export default AuthNavBar;
