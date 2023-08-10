import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {RootStackScreenProps} from "../../../../../types";
import * as yup from "yup";
import HeaderWithTitle from "../../../../../components/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";



const formSchema = yup.object().shape({
    amount: yup.string().required('Amount is required').matches(
        /^[1-9][0-9]*$/,
        "Invalid number type"
    ),
    strategyPeriod: yup.string().required('Strategy period is required').matches(
        /^[1-9][0-9]*$/,
        "Invalid number type"
    ),

})



const AdditionalSettings = ({navigation}:RootStackScreenProps<'AdditionalSettings'>) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#4E044B', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}


            >
                <KeyboardAwareScrollView style={{
                    width: '100%'
                }} contentContainerStyle={styles.scrollView} scrollEnabled
                                         showsVerticalScrollIndicator={false}>


                    <HeaderWithTitle title='Additional Settings' step currentStep={'3'} totalStep={'4'}/>
                    <View style={styles.authContainer}>



                    </View>






                </KeyboardAwareScrollView>
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

    },
    scrollView: {

        width: '100%',
        alignItems: "center"
    },
    authContainer: {
        marginTop: 30,

        justifyContent: 'space-evenly',
        width: '90%',
        alignItems: 'center',
    },
})

export default AdditionalSettings;
