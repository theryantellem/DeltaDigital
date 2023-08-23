import React from 'react';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {fontPixel, heightPixel, widthPixel} from "../../helpers/normalize";
import OnboardScreen from "../../components/onBoarding";
import {MyButton} from "../../components/MyButton";
import Colors from "../../constants/Colors";
import {Fonts} from "../../constants/Fonts";
import {RootStackScreenProps} from "../../types";

const OnBoardingScreen = ({skip}: { skip: () => void }) => {

    const loginNow = () => {
/*navigation.navigate('Auth',{
    screen:'SignInScreen'
})*/
        skip()

    }
    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background} colors={["#680051", "#010D36", "#0B0811"]}
                            start={{x: 1.2, y: 0.1}}
                           // locations={[0.1, 0.7, 0.9]}


            >
                <OnboardScreen/>

                <View style={styles.bottom}>
                    <MyButton onPress={skip} style={{
                        justifyContent: 'center',
                        width:'70%',
                        backgroundColor:Colors.primary
                    }}>
                        <Text style={styles.btnText}>Sign in</Text>
                    </MyButton>



                </View>

            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor:"#141621",
         //backgroundColor: "rgba(104, 0, 81, 1)",
        flex: 1,
        width: '100%'
    },
    background: {
        flex: 1,
        width: '100%'
    },
    bottom: {
        height: heightPixel(150),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonSignIn:{
        alignItems:'center',
        justifyContent:'center',

        width:widthPixel(120),
        height:heightPixel(45),
    },
    btnText:{
        color: "#fff",
        fontSize: fontPixel(18),
        fontFamily: Fonts.faktumBold
    }
})
export default OnBoardingScreen;
