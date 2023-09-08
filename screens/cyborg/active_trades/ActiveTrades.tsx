import React, {SetStateAction, useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Pressable, Platform
} from 'react-native';

import {useAppSelector} from "../../../app/hooks";
import {CyborgStackScreenProps, RootStackScreenProps} from "../../../types";
import Colors from "../../../constants/Colors";
import HeaderWithTitle from "../../../components/cyborg/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {Ionicons, MaterialIcons, Octicons} from "@expo/vector-icons";
import {currencyFormatter, wait} from "../../../helpers";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../../../helpers/normalize";
import {Fonts} from "../../../constants/Fonts";
import dayjs from "dayjs";

import SegmentedControl from "../../../components/segment-control/SegmentContol";

import GradientSegmentControl from "../../../components/segment-control/GradientSegmentControl";
import SpotScreen from "./SpotScreen";
import {IF} from "../../../helpers/ConditionJsx";
import FuturesScreen from "./FuturesScreen";


var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)





const ActiveTrades = ({navigation}: CyborgStackScreenProps<'ActiveTrades'>) => {



    const [tabIndex, setTabIndex] = useState(0);
    const handleTabsChange = (index: SetStateAction<number>) => {
        setTabIndex(index);
        //  setScreen(index === 0 ? 'Banks' : 'Wallets')
    };













    return (
        <>


            <SafeAreaView style={styles.safeArea}>
                <LinearGradient style={styles.background}
                                colors={Colors.primaryGradient}

                                start={{x: 2.5, y: 0}}
                                end={{x: 1.5, y: 0.8,}}
                    // locations={[0.1, 0.7,]}

                >


                    <HeaderWithTitle title='Active trades'/>

                    {
                        Platform.OS === 'ios' ?

                            <GradientSegmentControl tabs={["Spots", "Futures"]}
                                                    currentIndex={tabIndex}
                                                    onChange={handleTabsChange}
                                                    segmentedControlBackgroundColor={'#7676801F'}
                                                    activeSegmentBackgroundColor={"#fff"}

                                                    textColor={"#fff"}
                                                    paddingVertical={pixelSizeVertical(12)}/>
                            :

                            <SegmentedControl tabs={["Spots", "Futures"]}
                                              currentIndex={tabIndex}
                                              onChange={handleTabsChange}
                                              segmentedControlBackgroundColor={Colors.tintPrimary}
                                              activeSegmentBackgroundColor={Colors.primary}
                                              activeTextColor={Colors.text}
                                              textColor={"#CDD4D7"}
                                              paddingVertical={pixelSizeVertical(16)}/>
                    }

                    <IF condition={tabIndex == 0}>
                        <SpotScreen/>
                    </IF>

                    <IF condition={tabIndex == 1}>
                        <FuturesScreen/>
                    </IF>

                </LinearGradient>
            </SafeAreaView>


        </>
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
    flatList: {
        width: '90%',

        flex: 1,


    },

    balanceCanvas: {
        width: '100%',

        height: heightPixel(230),
        alignItems: 'center',
        justifyContent: 'center',

    },
    balanceTop: {

        width: '100%',
        height: '85%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    balanceTitle: {

        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: heightPixel(30),
    },
    balText: {
        fontFamily: Fonts.faktumMedium,
        color: Colors.tintText,
        fontSize: fontPixel(12),
        marginRight: 5,
    },
    balanceGraph: {
        width: '90%',
        height: heightPixel(45),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',

    },
    balance: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(36),
        color: Colors.text
    },
    selectExchangeBtn: {

        width: 120,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    selectBtnText: {
        fontFamily: Fonts.faktumMedium,
        color: Colors.text,
        fontSize: fontPixel(14),
    },
    quantitativeCard: {
        borderRadius: 8,
        paddingVertical: 15,
        paddingRight: 10,
        backgroundColor: "#000",
        marginVertical: pixelSizeVertical(8),
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%',
        height: heightPixel(100),
    },
    leftInfo: {
        width: '42%',

        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    assetIcon: {

        width: 45,
        height: '100%',

        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    assetCardIcon: {
        borderRadius: 40,
        width: 20,
        height: 20,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    logo: {
        borderRadius: 20,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',

    },

    assetName: {
        width: '75%',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        height: '100%'
    },
    centerInfo: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%'
    },
    rightInfo: {
        width: '25%',
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    assetInfo: {
        color: '#ccc',
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumRegular
    },
    assetNameText: {
        color: Colors.text,
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(14),
    },
    cardValue: {
        color: Colors.text,
        fontFamily: Fonts.faktumMedium,
        fontSize: fontPixel(12),
    },
    tagWrap: {
        backgroundColor: Colors.textDark,
        paddingHorizontal: 10,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    tagText: {
        color: Colors.pendingYellow,
        fontFamily: Fonts.faktumSemiBold,
        fontSize: fontPixel(12),
    },


    selectBtn: {
        borderRadius: 5,
        marginVertical: pixelSizeVertical(10),
        width: '100%',
        height: heightPixel(50),
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,

    },
    itemText: {
        marginLeft: 8,
        fontSize: fontPixel(16),
        textTransform: 'capitalize',
        color: Colors.text,
        fontFamily: Fonts.faktumMedium,
    },
    item: {
        flexDirection: 'row',
        width: '90%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    flatListSheet: {
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    sheetHead: {
        paddingHorizontal: pixelSizeHorizontal(20),

        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    sheetTitle: {
        width: '70%',
        textAlign: 'center',
        fontSize: fontPixel(18),
        fontFamily: Fonts.faktumMedium,
        color: Colors.tintText
    },
    dismiss: {

        borderRadius: 30,
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',

    },
    walletAddressTxt: {

        color: "#fff",
        fontFamily: Fonts.faktumSemiBold,
        fontSize: fontPixel(16)
    },

})

export default ActiveTrades;
