import React from 'react';

import {Text, View, StyleSheet, Platform} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {fontPixel, heightPixel, pixelSizeHorizontal} from "../../helpers/normalize";
import {RootStackScreenProps} from "../../types";
import HeaderWithTitle from "../../components/header/HeaderWithTitle";
import Colors from "../../constants/Colors";
import {Fonts} from "../../constants/Fonts";
import {Ionicons} from "@expo/vector-icons";
import {useQuery} from "@tanstack/react-query";
import {getUser, getUserNews} from "../../api";
import {useAppSelector} from "../../app/hooks";


const NewsCard = () => {
    return (
        <View style={styles.newsCard}>
            <View style={styles.newsCardIcon}>
                <Ionicons name="gift-outline" size={20} color="#fff" />
            </View>
            <View style={styles.newsCardBody}>
                <View style={styles.cardTop}>
                    <Text style={styles.newsCardTitle}>
                        Welcome to delta digital Cyborg
                    </Text>
                    <Text style={styles.dateText}>
                        Wed, 04 Jan 2023
                    </Text>
                </View>

                <Text style={styles.bodyText}>
                    Apple may automatically adjust prices from time to time in every country or region except your base
                    to account for changes in tax or foreign exchange rates.
                </Text>

            </View>
        </View>
    )
}

const NewsScreen = ({navigation}: RootStackScreenProps<'NewsScreen'>) => {


    const user = useAppSelector(state => state.user)
    const {userData} = user
    const {data, refetch} = useQuery(['user-news'],()=> getUserNews(userData.id))


    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}


                            colors={['#4E044B', '#141621',]}

                            start={{x: 3.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}
            >

                <HeaderWithTitle title={"News"}/>

                <View style={styles.flatList}>
                    <NewsCard/>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        width: '100%',
        backgroundColor: "#141621",
        alignItems: 'center',
    },

    flatList: {
        width: '90%',
        alignItems: 'center',
        flex: 1,


    },
    background: {
        alignItems: 'center',
        flex: 1,
        width: '100%',

    },
    newsCard: {
        width: '100%',
        height: heightPixel(150),
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    newsCardIcon: {
        borderRadius: 40,
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary
    },
    newsCardBody: {
        paddingHorizontal: pixelSizeHorizontal(10),
        height: '90%',
        width: '90%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    cardTop: {
        height: 40,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    dateText: {
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumMedium,
        color: Colors.greyText
    },
    newsCardTitle: {
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumBold,
        color: Colors.text
    },
    bodyText:{
        marginTop:10,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumRegular,
        color: Colors.text
    }
})

export default NewsScreen;
