import React from 'react';

import {Text, View, StyleSheet, RefreshControl, ScrollView} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import FinixTopBar from "../../../components/signal/FinixTopBar";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import Colors from "../../../constants/Colors";

const HomeSignal = () => {

    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)
    const {User_Details} = user


    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#04074E', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >
                <ScrollView style={{width: '100%',}} contentContainerStyle={styles.scrollView} scrollEnabled
                            showsVerticalScrollIndicator={false}

                >


                    <FinixTopBar
                        profilePhoto={User_Details.image ? User_Details.image : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}
                        userName={User_Details.username}/>









                </ScrollView>


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
paddingHorizontal:20,
        flex: 1,
        width: '100%',
        alignItems: "center"
    },
    scrollView: {
        width: '100%',
        alignItems: "center"
    },
})

export default HomeSignal;
