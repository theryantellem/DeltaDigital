import React, {useCallback, useState} from 'react';

import {Text, View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import HeaderWithTitle from "../../../components/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import {fontPixel, heightPixel, pixelSizeVertical, widthPixel} from "../../../helpers/normalize";
import Keyboard from "../../../components/KeyBoard";
import Colors from "../../../constants/Colors";
import {Fonts} from "../../../constants/Fonts";
import {MyButton} from "../../../components/MyButton";
import {RootStackScreenProps} from "../../../types";


const WithdrawalAmount = ({navigation}: RootStackScreenProps<'WithdrawalAmount'>) => {


    const [sendAmount, setSendAmount] = useState([]);


    const addInputs = useCallback(async (number: string) => {


        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        // @ts-ignore
        setSendAmount(prevState => [...prevState, number])
    }, [sendAmount])


    const backSpace = useCallback(async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        // const array = [...coinTheValue]; // make a separate copy of the array
        const array = Array.from(sendAmount)
        // @ts-ignore
        const index = array.indexOf(sendAmount)
        if (index !== 1) {
            array.splice(index, 1);
            // @ts-ignore
            setSendAmount(array);
        }
    }, [sendAmount])

    const setMaxBalance = () => {

    }

    const proceed = () => {
        navigation.navigate('Withdrawal',{
            amount:sendAmount.join('')
        })
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#04074E', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >


                <HeaderWithTitle title='Amount'/>
                <ScrollView style={{
                    width: '100%'
                }} contentContainerStyle={styles.scrollView} scrollEnabled
                            showsVerticalScrollIndicator={false}>


                    <View style={styles.amountCanvas}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleDeposit}>
                                Withdraw money
                            </Text>

                        </View>

                        <View style={styles.amountContainer}>
                            <Text style={[styles.amount, {
                                fontSize: sendAmount.length < 5 ? fontPixel(72) : fontPixel(28),
                                color: sendAmount.length < 2 || sendAmount.reduce((partialSum, a) => partialSum + a, 0) == 0 ? Colors.greyText : Colors.text
                            }]}>
                                ${
                                +sendAmount.join('')
                                //currencyFormatter('en-US','USD').format(+sendAmount.join(''))
                            }
                            </Text>
                        </View>

                        <TouchableOpacity onPress={setMaxBalance} activeOpacity={0.6} style={styles.maxBtn}>
                            <Text style={styles.maxTxt}>
                                Max
                            </Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.VirtualKeyboard}>
                        <Keyboard transaction pinNumber={sendAmount} addInputs={addInputs} backSpace={backSpace}/>
                    </View>


                </ScrollView>

                <MyButton onPress={proceed} style={styles.proceedBtn}>
                    <Text style={styles.btnText}>
                        Proceed
                    </Text>
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
    VirtualKeyboard: {
        marginVertical: pixelSizeVertical(10),
        width: '100%',
        bottom: 0,
        //minHeight: heightPixel(320),
        alignItems: 'center',
        justifyContent: 'center'
    },

    amountCanvas: {
        width: '100%',
        alignItems: 'center',
        height: heightPixel(300),
        justifyContent: 'flex-start',
    },
    amount: {
        fontFamily: Fonts.faktumBold
    },
    titleContainer: {
        height: heightPixel(50),
        alignItems: 'center',
        marginVertical: pixelSizeVertical(10),
        justifyContent: 'space-evenly'
    },
    titleDeposit: {
        fontFamily: Fonts.faktumExtraBold,
        fontSize: fontPixel(20),
        color: Colors.text
    },

    amountContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: heightPixel(100),
        marginVertical: pixelSizeVertical(10)
    },
    maxBtn: {
        width: heightPixel(60),
        height: heightPixel(25),
        backgroundColor: "#11192E",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginVertical: pixelSizeVertical(10)
    },
    maxTxt: {
        color: Colors.success,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumSemiBold
    },
    proceedBtn: {
        justifyContent: 'center',
        width: widthPixel(250),
        backgroundColor: Colors.primary,
        marginBottom: 20,
    },
    btnText: {
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumSemiBold,
        color: Colors.text
    }
})

export default WithdrawalAmount;
