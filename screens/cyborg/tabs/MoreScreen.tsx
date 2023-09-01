import React, {useCallback, useMemo, useRef, useState} from 'react';

import {Text, View, StyleSheet, Platform, ScrollView, TouchableOpacity} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical} from "../../../helpers/normalize";
import TopBar from "../../../components/header/TopBar";
import {Fonts} from "../../../constants/Fonts";
import Colors from "../../../constants/Colors";
import {AntDesign, FontAwesome, Fontisto, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
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
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import QRCode from "react-native-qrcode-svg";
import * as Clipboard from "expo-clipboard";
import ToastAnimated from "../../../components/toast";
import {addNotificationItem} from "../../../app/slices/dataSlice";


const MoreScreen = ({navigation}: RootTabScreenProps<'MoreScreen'>) => {

    const dispatch = useAppDispatch()
    const [copied, setCopied] = useState(false);


    const user = useAppSelector(state => state.user)
    const {User_Details} = user


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

    const navigate = (screen: 'LeaderBoard' | 'NewsScreen' | 'ActiveTrades' |'RevenueScreen' | 'AllStrategy' | 'ApiBinding') => {
        navigation.navigate(screen)
    }


    const copyLeftLink = async () => {
        await Clipboard.setStringAsync(`${User_Details['referral left link']}`);
        dispatch(addNotificationItem({
            id: Math.random(),
            type: 'info',
            body: "Left referral link copied 👍",
        }))
        setCopied(true)
    };

    const copyRightLink = async () => {
        await Clipboard.setStringAsync(`${User_Details['referral right link']}`);
        dispatch(addNotificationItem({
            id: Math.random(),
            type: 'info',
            body: "Right referral link copied 👍",
        }))
        setCopied(true)
    };


    return (
        <>

            <SafeAreaView style={styles.safeArea}>
                <LinearGradient style={styles.background}
                                colors={['#4E044B', '#141621',]}

                                start={{x: 2.5, y: 0}}
                                end={{x: 1.5, y: 0.8,}}
                    // locations={[0.1, 0.7,]}
                >
                    <TopBar
                        profilePhoto={User_Details.image ? User_Details.image : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}
                        userName={User_Details.username}/>

                    <ScrollView style={{width: '100%',}} contentContainerStyle={styles.scrollView} scrollEnabled
                                showsVerticalScrollIndicator={false}>




                            <View style={styles.moreButtonContainer}>

                                <TouchableOpacity onPress={() => navigate('LeaderBoard')} activeOpacity={0.6}
                                                  style={styles.dashButton}>
                                    <View style={styles.dashIcon}>
                                        <Ionicons name="ios-bar-chart-outline" size={18} color="#fff"/>
                                    </View>
                                    <Text style={styles.dashText}>
                                        Leaderboard
                                    </Text>

                                </TouchableOpacity>


                                <TouchableOpacity onPress={() => navigate('ActiveTrades')} activeOpacity={0.6}
                                                  style={styles.dashButton}>
                                    <View style={styles.dashIcon}>
                                        <AntDesign name="profile" size={18} color="#fff"/>
                                    </View>
                                    <Text style={styles.dashText}>
                                        Active trades
                                    </Text>
                                </TouchableOpacity>


                                <TouchableOpacity onPress={() => navigate('NewsScreen')} activeOpacity={0.6}
                                                  style={styles.dashButton}>
                                    <View style={styles.dashIcon}>
                                        <Ionicons name="card-outline" size={18} color="#fff"/>
                                    </View>
                                    <Text style={styles.dashText}>
                                        News
                                    </Text>
                                </TouchableOpacity>


                                <TouchableOpacity onPress={handlePresentModalPress} activeOpacity={0.6}
                                                  style={styles.dashButton}>
                                    <View style={[styles.dashIcon,
                                      ]}>
                                        <AntDesign name="adduser" size={18} color="#fff"/>
                                    </View>
                                    <Text style={styles.dashText}>
                                        Invite
                                    </Text>
                                </TouchableOpacity>


                                <TouchableOpacity onPress={() => navigate('AllStrategy')} activeOpacity={0.6}
                                                  style={styles.dashButton}>
                                    <View style={styles.dashIcon}>
                                        <MaterialCommunityIcons name="tune-vertical-variant" size={18} color="#fff"/>
                                    </View>
                                    <Text style={styles.dashText}>
                                        Strategy
                                    </Text>

                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => navigate('ApiBinding')} activeOpacity={0.6}
                                                  style={styles.dashButton}>
                                    <View style={styles.dashIcon}>

                                        <MaterialCommunityIcons name="connection" size={18} color="#fff"/>
                                    </View>
                                    <Text style={styles.dashText}>
                                        API Binding
                                    </Text>

                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => navigate('RevenueScreen')} activeOpacity={0.6}
                                                  style={styles.dashButton}>
                                    <View style={styles.dashIcon}>
                                        <Fontisto name="money-symbol"  size={18} color="#fff" />

                                    </View>
                                    <Text style={styles.dashText}>
                                        Revenue
                                    </Text>

                                </TouchableOpacity>

                                {/*
                                <TouchableOpacity disabled activeOpacity={0.6} style={styles.dashButton}>
                                    <View style={[styles.dashIcon,]}>

                                        <FontAwesome name="diamond" size={20} color="#fff" />
                                    </View>
                                    <Text style={styles.dashText}>
                                        Member center
                                    </Text>
                                </TouchableOpacity>*/}


                            </View>




                    </ScrollView>
                </LinearGradient>
            </SafeAreaView>


            <Portal>
                <ToastAnimated/>
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

                                    <View style={styles.qrCode}>

                                        <QRCode
                                            logo={require('../../../assets/images/logos/cyborlogo.png')}
                                            logoSize={35}
                                            size={120}
                                            value={User_Details['referral left link']}
                                            color={Colors.text}

                                            backgroundColor={Colors.secondary}
                                        />
                                    </View>

                                    <View style={styles.inviteDetails}>

                                        <TouchableOpacity style={styles.copyButtonTitle}>
                                            <Text style={styles.copyTxt}>
                                                Right joining link
                                            </Text>
                                        </TouchableOpacity>

                                        <Text style={styles.linkText}>
                                            Please use the referral link
                                            to add new members to
                                            right position
                                        </Text>

                                        <TouchableOpacity onPress={copyRightLink} activeOpacity={0.7}
                                                          style={styles.copyButton}>
                                            <Text style={styles.copyButtonTxt}>
                                                Copy URL
                                            </Text>
                                            <Ionicons name="md-copy-outline" size={18} color="#fff"/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.qrBoxWrap}>

                                    <View style={styles.qrCode}>

                                        <QRCode
                                            logo={require('../../../assets/images/logos/cyborlogo.png')}
                                            logoSize={35}
                                            size={120}
                                            value={User_Details['referral left link']}
                                            color={Colors.text}

                                            backgroundColor={Colors.secondary}
                                        />
                                    </View>

                                    <View style={styles.inviteDetails}>

                                        <TouchableOpacity style={styles.copyButtonTitle}>
                                            <Text style={styles.copyTxt}>
                                                Left joining link
                                            </Text>
                                        </TouchableOpacity>

                                        <Text style={styles.linkText}>
                                            Please use the referral link
                                            to add new members to
                                            right position
                                        </Text>

                                        <TouchableOpacity onPress={copyLeftLink} activeOpacity={0.7}
                                                          style={styles.copyButton}>
                                            <Text style={styles.copyButtonTxt}>
                                                Copy URL
                                            </Text>
                                            <Ionicons name="md-copy-outline" size={18} color="#fff"/>
                                        </TouchableOpacity>
                                    </View>
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


        width: '100%',

        alignItems: 'center',

        justifyContent: 'space-between',
    },
    moreButtonContainer: {
        width: '100%',


        alignItems: 'flex-start'
    },
    dashButton: {
        marginVertical:pixelSizeVertical(12),
     paddingHorizontal:pixelSizeHorizontal(10),
backgroundColor:Colors.secondary,
        width: '100%',
        borderRadius:40,
        height: heightPixel(80),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'

    },
    dashIcon: {
        marginRight: 8,
        width: 45,
        height: 45,
        backgroundColor: Colors.textDark,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: "center"
    },
    dashText: {
        color: Colors.text,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumMedium
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
        marginTop: 10,
        paddingHorizontal: pixelSizeHorizontal(10),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    qrBoxWrap: {
        marginVertical: pixelSizeVertical(10),
        width: '100%',
        height: heightPixel(180),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    qrCode: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: heightPixel(160),
        height: heightPixel(160),
        borderRadius: 16,
        padding: 10,
        backgroundColor: "#151722",

    },
    inviteDetails: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: heightPixel(180),
        height: '100%',

    },
    copyButtonTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
    },
    copyButton: {
        backgroundColor: Colors.secondary,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#3179FF",
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '90%',
    },
    copyButtonTxt: {
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumMedium,
        color: "#CCCCCC"
    },
    copyTxt: {
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumMedium,
        color: Colors.text,
        alignSelf: 'flex-start'
    },
    linkText: {
        width: '90%',
        lineHeight: heightPixel(18),
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumRegular,
        color: "#cccc"
    }

})

export default MoreScreen;
