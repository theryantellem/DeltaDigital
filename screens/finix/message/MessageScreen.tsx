import React, {useState} from 'react';

import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {SignalStackScreenProps} from "../../../types";
import {Ionicons} from "@expo/vector-icons";
import {Fonts} from "../../../constants/Fonts";
import {fontPixel} from "../../../helpers/normalize";
import Colors from "../../../constants/Colors";
import MessagesList from "../../../components/MessagesList";
import {useAppSelector} from "../../../app/hooks";
import HeaderWithTitle from "../../../components/cyborg/header/HeaderWithTitle";


const myMessages = [
    {
        text:"Nos vemos en 15 minutos en Streaming",
        user:'3838a510-2b59-417b-92ef-c89ab5a7d79a',
        _id:'3838a510-2b59-417b-92ef-c89ab5a7d09a',
    }, {
        text:"15 minutos en Streaming",
        user:'3838a510-2b59-417b-92ef-c89ab5a7d79a',
        _id:'3838a510-2b59-417b-92ef-c89ab5a7d70a',
    },
    {
        text:"Nos vemos en 15 minutos en Streaming",
        user:'17409',
        _id:'1838a510-2b59-417b-92ef-c89ab5a7d70a',
    }
]

const MessageScreen = ({navigation} :SignalStackScreenProps<'MessageScreen'>) => {

    const user = useAppSelector(state => state.user)
    const {User_Details} = user

    const [text, setText] = useState('')

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={require('../../../assets/images/signal/streamer_BG.png')}
                             resizeMode={'cover'}
                             style={styles.dashboardImage}>


                <HeaderWithTitle title="Carlos Ardila - Crypto"/>

                <View style={styles.flatList}>


                    <MessagesList _id={User_Details.id} roomID={''} messages={myMessages}/>

                </View>

                <KeyboardAvoidingView

                    style={[styles.root]}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={15}
                >


                    <View style={styles.innerContainer}>
                        <View style={styles.inputAndMicrophone}>
                            {/*  <TouchableOpacity style={styles.rightIconButtonStyle}>
                            <Icon
                                name="paperclip"
                                size={23}
                                color={Colors.tintText}
                            />
                        </TouchableOpacity>*/}
                            <TextInput


                                placeholder={"Type your message here..."}
                                style={styles.input}
                                value={text}

                                placeholderTextColor={Colors.textDark}
                                onChangeText={(text) => setText(text)}
                            />

                            <TouchableOpacity style={styles.rightIconButtonStyle}>

                                <Ionicons name="paper-plane-outline" size={24} color={Colors.textDark}/>
                            </TouchableOpacity>
                        </View>

                    </View>

                </KeyboardAvoidingView>
            </ImageBackground>
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
        paddingHorizontal: 20,
        flex: 1,
        width: '100%',
        alignItems: "center"
    },
    dashboardImage: {
        // paddingHorizontal: pixelSizeHorizontal(20),
        resizeMode: 'cover',
        width: '100%',
        flex:1,
        borderRadius: 30,
        alignItems: 'center',

    },
    flatList: {
        width: '90%',

        flex: 1,


    },
    root: {
        width: '100%',

    },
    innerContainer: {
        paddingHorizontal: 10,
        marginHorizontal: 10,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 10,
    },
    inputAndMicrophone: {
        flexDirection: "row",
        backgroundColor: "#fff",
        flex: 3,
        height: 60,
        marginRight: 10,
        paddingVertical: Platform.OS === "ios" ? 10 : 0,
        borderRadius: 10,
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "space-between",
    },
    input: {
        backgroundColor: "transparent",

        color: Colors.textDark,
        width: "80%",
        fontFamily: Fonts.faktumMedium,
        fontSize: fontPixel(14),
        height: '100%',

        justifyContent: 'center',
        alignSelf: "center",
        alignItems: 'center'
    },
    rightIconButtonStyle: {
        justifyContent: "center",
        alignItems: "center",


    },
})

export default MessageScreen;
