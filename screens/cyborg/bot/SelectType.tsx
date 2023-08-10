import React, {useCallback, useMemo, useRef} from 'react';

import {Text, View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {Ionicons} from "@expo/vector-icons";
import {MyButton} from "../../../components/MyButton";
import Colors from "../../../constants/Colors";
import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../../../helpers/normalize";
import {Fonts} from "../../../constants/Fonts";
import HeaderWithTitle from "../../../components/header/HeaderWithTitle";
import {LinearGradient} from "expo-linear-gradient";
import HorizontalLine from "../../../components/HorizontalLine";
import Animated, {Easing, FadeInDown, FadeOutDown, Layout} from 'react-native-reanimated';
import {RootStackScreenProps} from "../../../types";
import AllStrategy from "./strategy/AllStrategy";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetScrollView
} from "@gorhom/bottom-sheet";
import {
    BottomSheetDefaultBackdropProps
} from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";

const SelectType = ({navigation}: RootStackScreenProps<'SelectType'>) => {

    const selectContinue = () => {
        navigation.navigate('SelectExchange')
    }

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables


    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present(1);
    }, []);

    const handleClose = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);



    // variables
    const snapPoints = useMemo(() => ["1%", "50%", "70%"], []);


    const renderBackdrop = useCallback(
        (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={0}
                appearsOnIndex={1}
            />
        ),
        []
    );


    const selectFeaturesContinue = () => {
        handleClose()
        navigation.navigate('FeaturesSelectAsset')
    }
    return (
        <>


            <SafeAreaView style={styles.safeArea}>
                <LinearGradient style={styles.background}
                                colors={['#4E044B', '#141621',]}

                                start={{x: 2.5, y: 0}}
                                end={{x: 1.5, y: 0.8,}}
                    // locations={[0.1, 0.7,]}


                >
                    <ScrollView style={{
                        width: '100%'
                    }} contentContainerStyle={styles.scrollView} scrollEnabled
                                showsVerticalScrollIndicator={false}>


                        <HeaderWithTitle title='Select bot'/>

                        <View style={styles.planInfo}>
                            <Text style={styles.planTitle}>
                                Select Bot
                            </Text>
                            <View style={styles.planMessage}>
                                <Text style={styles.planMessageTxt}>
                                    Your bot trades in both upward and downwards market trends to give profits or stop ;
                                </Text>
                            </View>
                        </View>


                        <HorizontalLine/>
                        <View style={styles.contentMsg}>
                            <Text style={styles.contentMsgTxt}>
                                How would you like to make your Bot?
                            </Text>
                        </View>


                        <Animated.View layout={Layout.easing(Easing.bounce).delay(100)}
                                       entering={FadeInDown.springify()} exiting={FadeOutDown}
                                       style={styles.choiceBoxContainer}>


                            <TouchableOpacity onPress={selectContinue} activeOpacity={0.6} style={[styles.choiceBox, {
                                borderWidth: 1,
                                borderColor: Colors.blue
                            }]}>

                                <View style={styles.choiceBoxTop}>
                                    <View style={styles.choiceBoxIcon}>
                                        <Ionicons name="lock-closed-outline" size={16} color="#fff"/>
                                    </View>


                                </View>

                                <View style={styles.choiceBoxBody}>
                                    <Text style={styles.choiceBoxName}>
                                        Spot
                                    </Text>
                                    <Text style={styles.choiceBoxMessage}>
                                        Slow, steady returns with lower risk
                                    </Text>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={handlePresentModalPress} activeOpacity={0.6}
                                              style={[styles.choiceBox, {}]}>

                                <View style={styles.choiceBoxTop}>
                                    <View style={styles.choiceBoxIcon}>
                                        <Ionicons name="lock-closed-outline" size={16} color="#fff"/>
                                    </View>


                                </View>

                                <View style={styles.choiceBoxBody}>
                                    <Text style={styles.choiceBoxName}>
                                        Futures
                                    </Text>
                                    <Text style={styles.choiceBoxMessage}>
                                        Quick, big returns with higher risk
                                    </Text>
                                </View>
                            </TouchableOpacity>

                        </Animated.View>


                    </ScrollView>
                </LinearGradient>
            </SafeAreaView>

            <BottomSheetModalProvider>


                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    animateOnMount
                    index={1}
                    snapPoints={snapPoints}
                    backdropComponent={renderBackdrop}
                    style={{
                        paddingHorizontal: pixelSizeHorizontal(20)
                    }}
                    backgroundStyle={{
                        backgroundColor: Colors.dark.background,
                    }}
                    handleIndicatorStyle={{backgroundColor: "#fff"}}

                >
                    <BottomSheetScrollView style={styles.sheetScrollView} contentContainerStyle={{
                        width: '100%',
                        alignItems: 'center',
                    }}>


                        <View style={[styles.sheetHead, {
                            height: 40,
                        }]}>


                            <Text style={[styles.sheetTitle, {
                                fontSize: fontPixel(14),
                                color: Colors.text
                            }]}>
                                Risk Notice
                            </Text>
                            <TouchableOpacity onPress={handleClose}
                                              style={[styles.dismiss, {
                                                  backgroundColor: "#11192E"
                                              }]}>
                                <Ionicons name="close-sharp" size={20} color={"#fff"}/>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.warningIcon}>
                            {/* <WarningIcon/>*/}


                            <Text style={[styles.sheetText, {
                                color: Colors.errorRed
                            }]}>
                                All of your margin balance may be liquidated in the event of extreme price movement.
                            </Text>


                            <Text style={styles.warningText}>

                                Futures trading carries a large risk/reward ratio - meaning there is possibility of both
                                significant profits and significant losses.
                                Past winning trades do not guarantee future winning trades.
                            </Text>


                            <View style={styles.buttonWrap}>


                                <MyButton onPress={selectFeaturesContinue} style={[styles.sheetButton, {
                                    backgroundColor: Colors.primary
                                }]}>

                                    <Text style={[styles.btnText, {
                                        color: "#fff"
                                    }]}>
                                        I accept risk
                                    </Text>

                                </MyButton>


                                <MyButton onPress={handleClose} style={[styles.sheetButton, {
                                    borderWidth: 1,
                                    borderColor: Colors.borderColor
                                }]}>


                                    <Text style={[styles.btnText, {
                                        color: Colors.text
                                    }]}>
                                        Cancel
                                    </Text>
                                </MyButton>
                            </View>
                        </View>


                    </BottomSheetScrollView>
                </BottomSheetModal>
            </BottomSheetModalProvider>

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

    },
    topBar: {
        height: heightPixel(100),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: pixelSizeHorizontal(15)
    },

    count: {
        width: widthPixel(60),
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    countText: {

        fontSize: fontPixel(20),
        fontFamily: Fonts.faktumMedium
    },
    title: {
        color: Colors.textDark,
        fontSize: fontPixel(18),
        fontFamily: Fonts.faktumBold
    },
    scrollView: {

        width: '100%',
        alignItems: "center"
    },
    planInfo: {
        width: '100%',
        paddingHorizontal: pixelSizeHorizontal(20),
        height: heightPixel(130),
        alignItems: 'flex-start',
        justifyContent: 'flex-start',

    },
    planTitle: {
        color: "#fff",
        fontSize: fontPixel(24),
        fontFamily: Fonts.faktumBold
    },
    planMessage: {
        width: '80%',
        marginTop: 10,
    },
    planMessageTxt: {

        color: Colors.tintText,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumRegular
    },
    contentMsg: {
        width: '90%',
        height: heightPixel(90),
        alignItems: 'flex-start',
        justifyContent: 'center'

    },
    contentMsgTxt: {
        width: '70%',
        fontFamily: Fonts.faktumSemiBold,
        fontSize: fontPixel(16),
        color: Colors.tintText,
        lineHeight: heightPixel(22),
    },
    choiceBoxContainer: {
        width: '90%',
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: heightPixel(450),
    },
    choiceBox: {
        backgroundColor: Colors.secondary,
        width: widthPixel(180),
        height: heightPixel(200),
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    choiceBoxTop: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: heightPixel(40)
    },
    choiceBoxIcon: {
        width: 30,
        height: 30,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#062638"
    },
    percentage: {
        fontFamily: Fonts.faktumMedium,
        fontSize: fontPixel(14),
        color: Colors.textDark
    },
    choiceBoxBody: {
        width: '100%',
        height: heightPixel(90),
        justifyContent: 'flex-start',
    },
    choiceBoxName: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(16),
        color: Colors.text
    },
    choiceBoxMessage: {
        marginTop: 8,
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(14),
        color: Colors.tintText,
        lineHeight: heightPixel(20)
    },
    button: {
        width: '90%',
        bottom: 0,
        justifyContent: 'center',
    },
    buttonTxt: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(18),
        color: "#fff"
    },
    sheetScrollView: {
        width: '100%',
        marginTop: 10,
        backgroundColor: Colors.dark.background,
    },
    warningIcon: {
        height: heightPixel(380),
        width: '100%',
        alignItems: 'center',
        justifyContent: "space-evenly"
    },
    sheetText: {
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumMedium,
        color: Colors.text
    },
    warningText: {
        textAlign:'center',
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumMedium,
        color: Colors.tintText
    },
    sheetButton: {
        width: '90%',
        alignItems: 'center',
        justifyContent: "center",

    },
    btnText: {
        fontSize: fontPixel(18),
        fontFamily: Fonts.faktumBold,

    },

    sheetHead: {
        // paddingHorizontal: pixelSizeHorizontal(20),
        height: 60,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
    ,
    sheetTitle: {
        fontSize: fontPixel(18),
        fontFamily: Fonts.faktumBold,
        color: Colors.light.text
    },
    dismiss: {
        position: 'absolute',
        right: 10,
        borderRadius: 30,
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonWrap: {
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: heightPixel(130)
    }
})

export default SelectType;
