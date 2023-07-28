import React from 'react';

import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {useQuery} from "@tanstack/react-query";
import {activeStrategy, getNewstrategy} from "../../../api";
import {useAppSelector} from "../../../app/hooks";
import HeaderWithTitle from "../../../components/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";

const SyncStrategy = () => {

    const user = useAppSelector(state => state.user)
    const {User_Details} = user
   // const {data:newStrategy,refetch:fetchNewStrategy} = useQuery(['get-new-strategy',User_Details.id],()=>getNewstrategy(User_Details.id))


    return (
        <SafeAreaView style={styles.safeArea}>
        <LinearGradient style={styles.background}
                        colors={['#04074E', '#141621',]}

                        start={{x: 2.5, y: 0}}
                        end={{x: 1.5, y: 0.8,}}
            // locations={[0.1, 0.7,]}

        >


            <HeaderWithTitle title='Strategy'/>
            <ScrollView style={{
                width: '100%'
            }} contentContainerStyle={styles.scrollView} scrollEnabled showsVerticalScrollIndicator={false}>




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

        flex: 1,
        width: '100%',
        alignItems: "center"
    },
    scrollView: {
        width: '100%',
        alignItems: "center"
    },
})

export default SyncStrategy;
