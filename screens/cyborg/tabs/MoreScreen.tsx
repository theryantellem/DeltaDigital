import React, {useCallback, useMemo, useRef} from 'react';

import {Text, View, StyleSheet, Platform, ScrollView, TouchableOpacity} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical} from "../../../helpers/normalize";
import TopBar from "../../../components/header/TopBar";
import {Fonts} from "../../../constants/Fonts";
import Colors from "../../../constants/Colors";
import {AntDesign, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {RootTabScreenProps} from "../../../types";
import BottomSheet, {
    BottomSheetBackdrop, BottomSheetBackdropProps,
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetScrollView
} from "@gorhom/bottom-sheet";
import {
    BottomSheetDefaultBackdropProps
} from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import {Portal} from "@gorhom/portal";


const MoreScreen = ({navigation}: RootTabScreenProps<'MoreScreen'>) => {


    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables


    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present(1);
    }, []);

    const handleClose = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
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

    const navigate = (screen: 'LeaderBoard' | 'NewsScreen') => {
        navigation.navigate(screen)
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


                    <ScrollView style={{width: '100%',}} contentContainerStyle={styles.scrollView} scrollEnabled
                                showsVerticalScrollIndicator={false}>

                        <TopBar
                            profilePhoto={'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'}
                            userName={'Orji'}/>


                        <View style={styles.buttonContainer}>
                            <View style={styles.moreButtonContainer}>
                                <TouchableOpacity onPress={() => navigate('LeaderBoard')} activeOpacity={0.6}
                                                  style={styles.dashButton}>
                                    <View style={styles.dashIcon}>
                                        <Ionicons name="ios-bar-chart-outline" size={20} color="#fff"/>
                                    </View>
                                    <Text style={styles.dashText}>
                                        Leaderboard
                                    </Text>

                                </TouchableOpacity>


                                <TouchableOpacity activeOpacity={0.6} style={styles.dashButton}>
                                    <View style={styles.dashIcon}>
                                        <AntDesign name="profile" size={20} color="#fff"/>
                                    </View>
                                    <Text style={styles.dashText}>
                                        Quantitative
                                    </Text>
                                </TouchableOpacity>


                                <TouchableOpacity onPress={() => navigate('NewsScreen')} activeOpacity={0.6}
                                                  style={styles.dashButton}>
                                    <View style={styles.dashIcon}>
                                        <Ionicons name="card-outline" size={24} color="#fff"/>
                                    </View>
                                    <Text style={styles.dashText}>
                                        News
                                    </Text>
                                </TouchableOpacity>


                            </View>


                            <View style={styles.moreButtonContainer}>


                                <TouchableOpacity onPress={handlePresentModalPress} activeOpacity={0.6}
                                                  style={styles.dashButton}>
                                    <View style={[styles.dashIcon,
                                        {backgroundColor: Colors.secondary}]}>
                                        <AntDesign name="adduser" size={20} color="#fff"/>
                                    </View>
                                    <Text style={styles.dashText}>
                                        Invite
                                    </Text>
                                </TouchableOpacity>


                                <TouchableOpacity activeOpacity={0.6} style={styles.dashButton}>
                                    <View style={styles.dashIcon}>
                                        <MaterialCommunityIcons name="tune-vertical-variant" size={20} color="#fff"/>
                                    </View>
                                    <Text style={styles.dashText}>
                                        Strategy
                                    </Text>

                                </TouchableOpacity>


                                <TouchableOpacity disabled activeOpacity={0.6} style={styles.dashButton}>
                                    <View style={[styles.dashIcon,]}>
                                        <Ionicons name="share-social-outline" size={20} color="#fff"/>
                                    </View>
                                    <Text style={styles.dashText}>
                                        Share
                                    </Text>
                                </TouchableOpacity>


                            </View>


                        </View>


                    </ScrollView>
                </LinearGradient>
            </SafeAreaView>



            <Portal>

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
                                    Invite friend
                                </Text>
                                <TouchableOpacity onPress={handleClose}
                                                  style={[styles.dismiss, {
                                                      backgroundColor: "#11192E"
                                                  }]}>
                                    <Ionicons name="close-sharp" size={20} color={"#fff"}/>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.contentContainer}>

                                <View style={styles.qrBoxWrap}>

                                </View>

                            </View>


                        </BottomSheetScrollView>
                    </BottomSheetModal>

                </BottomSheetModalProvider>
            </Portal>
        </>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        width: '100%',
        backgroundColor: "#141621",
        alignItems: 'center',
        paddingBottom: Platform.OS === 'ios' ? -40 : 0
    },
    scrollView: {

        width: '100%',
        alignItems: 'center'
    },
    background: {
        flex: 1,
        width: '100%',
        paddingHorizontal: pixelSizeHorizontal(20),
    },


    buttonContainer: {
        height: heightPixel(220),

        width: '100%',

        alignItems: 'center',

        justifyContent: 'space-between',
    },
    moreButtonContainer: {
        width: '100%',
        height: heightPixel(120),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    dashButton: {
        width: heightPixel(85),
        height: heightPixel(80),

        alignItems: 'center',
        justifyContent: 'space-between'

    },
    dashIcon: {
        width: 55,
        height: 55,
        backgroundColor: Colors.secondary,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: "center"
    },
    dashText: {
        color: Colors.text,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumRegular
    },
    mainCard: {
        backgroundColor: '#fff',
        marginVertical: pixelSizeVertical(20),
        height: heightPixel(390),
        width: '100%'
    },
    row: {
        paddingHorizontal: pixelSizeHorizontal(15),
        height: heightPixel(65),
        width: '100%',
        alignItems: "center",
        borderBottomColor: "#E5E7EB",
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowHeadIcon: {
        width: '10%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowHead: {
        width: '80%',
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    rowTitle: {
        width: '80%',
        marginLeft: 5,
        fontFamily: Fonts.faktumMedium,
        color: Colors.textDark,
        fontSize: fontPixel(16)
    },
    mainCardTitle: {
        marginLeft: 5,
        fontFamily: Fonts.faktumSemiBold,
        color: Colors.textDark,
        fontSize: fontPixel(16)
    },

    sheetScrollView: {
        width: '100%',
        marginTop: 10,
        backgroundColor: Colors.dark.background,
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

    contentContainer: {
        paddingHorizontal: pixelSizeHorizontal(20),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    qrBoxWrap:{

    }

})

export default MoreScreen;
