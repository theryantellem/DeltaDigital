import React, {useState} from 'react';

import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {RootStackScreenProps} from "../../../../types";
import HeaderWithTitle from "../../../../components/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {fontPixel, heightPixel, pixelSizeVertical} from "../../../../helpers/normalize";
import Colors from "../../../../constants/Colors";
import {Fonts} from "../../../../constants/Fonts";
import SearchInput from "../../../../components/inputs/SearchInput";





const AllStrategy = ({navigation}: RootStackScreenProps<'AllStrategy'>) => {

    const [searchValue, setSearchValue] = useState('');

const view = () => {
  navigation.navigate('ViewStrategy')
}
    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#4E044B', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >


                <HeaderWithTitle title='Copy Strategy'/>




                <View style={styles.scrollView}>
                    <SearchInput

                        placeholder="Search for bot"
                        keyboardType={"number-pad"}

                        onChangeText={(e) => {
                            setSearchValue(e);

                        }}
                        value={searchValue}
                    />

                    <TouchableOpacity onPress={view} style={styles.walletCard} activeOpacity={0.9}>
                        <View style={styles.logoCircle}>

                            <Image style={styles.logo} source={{uri:'https://unsplash-assets.imgix.net/unsplashplus/header-grid-03.jpg?dpr=2&auto=format&fit=crop&w=218&h=218&q=80'}}/>


                        </View>

                        <View style={styles.walletCardBody}>
                            <Text style={styles.cardTitle}>
                          Eric
                            </Text>
                            <Text style={[styles.cardText,{
                                color: Colors.successChart
                            }]}>
                            1400 Followers
                            </Text>
                        </View>
                        <View style={styles.walletCardAmount}>
                            <Text style={[styles.cardTitle, {
                                fontSize: fontPixel(14),
                                color: Colors.pendingYellow
                            }]}>
                                2% Fee
                            </Text>
                        </View>

                    </TouchableOpacity>


                    <TouchableOpacity  style={styles.walletCard} activeOpacity={0.9}>
                        <View style={styles.logoCircle}>
                            <Image style={styles.logo} source={{uri:'https://unsplash-assets.imgix.net/unsplashplus/header-grid-02.jpg?dpr=2&auto=format&fit=crop&w=218&h=218&q=80'}}/>
                        </View>

                        <View style={styles.walletCardBody}>
                            <Text style={styles.cardTitle}>
                                Chawa
                            </Text>
                            <Text style={[styles.cardText,{
                                color: Colors.successChart
                            }]}>
                                400 Followers
                            </Text>
                        </View>
                        <View style={styles.walletCardAmount}>
                            <Text style={[styles.cardTitle, {
                                fontSize: fontPixel(14),
                                color: Colors.pendingYellow
                            }]}>
                                5% Fee
                            </Text>
                        </View>

                    </TouchableOpacity>


                </View>
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
        width: '90%',
        flex: 1,
        //alignItems: "center"
    },
    walletCard: {
        marginVertical:pixelSizeVertical(12),
        width: '100%',
        borderRadius: 10,
        height: heightPixel(90),
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: Colors.borderColor,
        borderWidth: 1,
        //backgroundColor:Colors.secondary,
        padding: 16,
        flexDirection: "row",

    },

    logoCircle: {
        width: 40,
        height: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.secondary
    },
    logo: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        resizeMode: 'cover',

    },
    walletCardBody: {
        width: '55%',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        height: heightPixel(50)

    },
    cardTitle: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(16),
        color: Colors.text,
    },
    cardText: {
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(14),
        color: "#fff",
    },
    walletCardAmount: {
        width: '25%',

        alignItems: 'flex-end',
        justifyContent: 'center',
        height: heightPixel(50)

    },
})

export default AllStrategy;
