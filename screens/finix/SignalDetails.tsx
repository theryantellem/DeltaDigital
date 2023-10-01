import React, {useCallback, useMemo, useRef, useState} from 'react';

import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Platform,
    ImageBackground,
    Pressable
} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import HeaderWithTitle from "../../components/cyborg/header/HeaderWithTitle";
import {SignalStackScreenProps} from "../../types";
import * as Clipboard from "expo-clipboard";
import {Ionicons} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../../helpers/normalize";
import {Fonts} from "../../constants/Fonts";
import {LinearGradient} from 'expo-linear-gradient';
import {addNotificationItem} from "../../app/slices/dataSlice";
import {useAppDispatch} from "../../app/hooks";
import ToastAnimated from "../../components/toast";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetScrollView
} from "@gorhom/bottom-sheet";
import QRCode from "react-native-qrcode-svg";
import {
    BottomSheetDefaultBackdropProps
} from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import FastImage from "react-native-fast-image";
import Pinchable from 'react-native-pinchable';




const SignalDetails = ({navigation, route}: SignalStackScreenProps<'SignalDetails'>) => {

    const dispatch = useAppDispatch()
    const {details} = route.params

    const [itemCopied, setItemCopied] = useState('');


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
    const snapPoints = useMemo(() => ["1%", "90%"], []);


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


    const copyToClipboard = useCallback(async (itemName: string, content: string) => {

        await Clipboard.setStringAsync(content);

        dispatch(addNotificationItem({
            id: Math.random(),
            type: 'success',
            body: `${itemName} Item copied 🫡`,
        }))
        // setCopied(true)
    }, []);


    const viewUser = async (educator: {}) => {

        navigation.navigate('ViewEducator', {
            educator: details.educator
        })
    }

    const viewEducator = () => {
        navigation.navigate('MainSignalNav', {
            screen: 'ViewEducator', params: details
        })


    }


    return (
        <>

            <SafeAreaView style={styles.safeArea}>
                <ImageBackground source={require('../../assets/images/signal/streamer_BG.png')}
                                 resizeMode={'cover'}
                                 style={styles.dashboardImage}>

                    <HeaderWithTitle title="Signal Details"/>
                    <ScrollView style={{
                        width: '100%'
                    }} contentContainerStyle={styles.scrollView} scrollEnabled
                                showsVerticalScrollIndicator={false}
                    >


                        <View style={styles.topReceipt}>


                            <View style={styles.transactionStatusBox}>


                                <View style={styles.innerBoxBody}>
                                    <View style={styles.assetImage}>

                                        <Image
                                            source={{uri: details.asset.image}}
                                            style={styles.assetImageLogo}/>


                                    </View>
                                    <View style={styles.innerBox}>

                                        <View style={styles.statusWrap}>
                                            <Text style={[styles.innerBoxAmount, {
                                                color: "#fff",
                                                textTransform: 'capitalize',
                                                fontSize: fontPixel(14)
                                            }]}>

                                                {details.status}
                                            </Text>
                                        </View>
                                        <Text style={[styles.innerBoxStatus, {
                                            marginVertical:pixelSizeVertical(5),
                                            textTransform: 'uppercase',
                                            fontFamily: Fonts.faktumBold,
                                            fontSize: fontPixel(26)
                                        }]}>


                                            {details.asset.name}

                                        </Text>

                                        <Text style={styles.innerBoxDate}>

                                            Crypto
                                        </Text>
                                    </View>
                                </View>

                                <Pressable onPress={viewEducator} style={styles.leftInfo}>


                                    <View style={styles.userImage}>

                                        <Image source={{uri: details.educator.photo}} style={styles.logo}/>


                                    </View>
                                    <Text style={styles.leftInfoNameText}>
                                         {details.educator.first_name} {details.educator.last_name}
                                    </Text>

                                </Pressable>
                            </View>


                        </View>


                        <View style={styles.bottomReceipt}>

                            <View style={styles.bottomReceiptDetails}>
                                <View style={styles.receiptDetailsRow}>
                                    <Text style={styles.rowKey}>
                                        Asset
                                    </Text>
                                    <Text style={styles.rowValue}>
                                        {details.asset.name}
                                    </Text>

                                </View>

                                <View style={styles.receiptDetailsRow}>
                                    <Text style={styles.rowKey}>
                                        Order type
                                    </Text>
                                    <Text style={[styles.rowValue, {
                                        color: details.order_type == 'buy' ? Colors.successChart : Colors.errorRed,
                                        textTransform: 'capitalize'
                                    }]}>
                                        {details.order_type}
                                    </Text>

                                </View>

                                <View style={styles.receiptDetailsRow}>
                                    <Text style={styles.rowKey}>
                                        Entry price
                                    </Text>

                                    <TouchableOpacity onPress={() => {
                                        // setItemCopied('Entry price')
                                        copyToClipboard('Entry price', details.entry_price.toString())
                                    }} activeOpacity={0.7} style={styles.reference}>
                                        <Text style={[styles.rowValue, {
                                            marginRight: 5,
                                        }]}>
                                            {details.entry_price}
                                        </Text>
                                        <Pressable onPress={() => {
                                            // setItemCopied('Entry price')
                                            copyToClipboard('Entry price', details.entry_price.toString())
                                        }} style={styles.copyBtn}>
                                            <Text style={styles.copyText}>
                                                Copy
                                            </Text>
                                        </Pressable>
                                    </TouchableOpacity>
                                </View>


                                <View style={styles.receiptDetailsRow}>
                                    <Text style={styles.rowKey}>
                                        Stop loss
                                    </Text>

                                    <TouchableOpacity onPress={() => {

                                        copyToClipboard('Stop loss', `${details.stop_loss}`)
                                    }} activeOpacity={0.7} style={styles.reference}>
                                        <Text style={[styles.rowValue, {
                                            marginRight: 5,
                                        }]}>
                                            {details.stop_loss}
                                        </Text>
                                        <Pressable onPress={() => {

                                            copyToClipboard('Stop loss', `${details.stop_loss}`)
                                        }} style={styles.copyBtn}>
                                            <Text style={styles.copyText}>
                                                Copy
                                            </Text>
                                        </Pressable>


                                    </TouchableOpacity>

                                </View>

                                <View style={styles.receiptDetailsRow}>
                                    <Text style={styles.rowKey}>
                                        Target price
                                    </Text>

                                    <TouchableOpacity onPress={() => {
                                        copyToClipboard('Target price', `${details.target_price}`)
                                    }} activeOpacity={0.7} style={styles.reference}>
                                        <Text style={[styles.rowValue, {
                                            marginRight: 5,
                                        }]}>
                                            {details.target_price}
                                        </Text>
                                        <Pressable onPress={() => {
                                            copyToClipboard('Target price', `${details.target_price}`)
                                        }} style={styles.copyBtn}>
                                            <Text style={styles.copyText}>
                                                Copy
                                            </Text>
                                        </Pressable>
                                    </TouchableOpacity>

                                </View>

                                <View style={styles.receiptDetailsRow}>
                                    <Text style={styles.rowKey}>
                                        Market status
                                    </Text>

                                    <View style={styles.reference}>
                                        <Text style={[styles.rowValue, {
                                            textTransform: 'capitalize',
                                            color: details.market_status == 'pending' ? Colors.pendingYellow : Colors.successChart
                                        }]}>
                                            {details.market_status}
                                        </Text>
                                    </View>

                                </View>
                                <View style={styles.note}>
                                    <Text style={styles.noteText}>
                                        <Text style={{fontFamily: Fonts.faktumBold}}>Note -</Text> {details.comment}
                                    </Text>
                                </View>
                            </View>


                            <Pressable onPress={handlePresentModalPress} style={[styles.qrBoxWrap,{
                                top: -60,
                                width: '90%',
                            }]}>
                                <FastImage
                                    style={styles.chart_photo}
                                    source={{
                                        uri: details.chart_photo,
                                        cache: FastImage.cacheControl.web,
                                        priority: FastImage.priority.normal,
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />



                            </Pressable>



                            <View style={styles.imageCover}>

                                <Text style={styles.brandName}>
                                    FINIX
                                </Text>

                                <Image source={require('../../assets/images/logos/finixLogo.png')} style={{
                                    width: 50,
                                    height: '60%',
                                    resizeMode: 'contain'
                                }}/>
                            </View>
                        </View>

                    </ScrollView>
                    <ToastAnimated/>
                </ImageBackground>
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
                                Chart Photo
                            </Text>
                            <TouchableOpacity onPress={handleClose}
                                              style={[styles.dismiss, {
                                                  backgroundColor: "#11192E"
                                              }]}>
                                <Ionicons name="close-sharp" size={20} color={"#fff"}/>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.contentContainer}>


                                <Pinchable style={[styles.qrBoxWrap,{
                                    width:'100%',
                                    height: heightPixel(600),
                                }]}>
                                <FastImage

                                    style={styles.chart_photo}
                                    source={{
                                        uri: details.chart_photo,
                                        cache: FastImage.cacheControl.web,
                                        priority: FastImage.priority.normal,
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                                </Pinchable>






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
    dashboardImage: {
        // paddingHorizontal: pixelSizeHorizontal(20),
        resizeMode: 'cover',
        width: '100%',
        flex: 1,
        borderRadius: 30,
        alignItems: 'center',

    },
    topBar: {
        height: heightPixel(100),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: pixelSizeHorizontal(15)
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: '#fff',

        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: Colors.textDark,
        fontSize: fontPixel(18),
        fontFamily: Fonts.faktumBold
    },
    scrollView: {
        width: '100%',
        alignItems: 'center',

    },
    topReceipt: {
        zIndex: 10,
        // height: heightPixel(440),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: pixelSizeVertical(20)
    },
    bottomReceipt: {


        width: '100%',
        alignItems: 'center',

        justifyContent: 'space-between'
    },
    bottomReceiptDetails: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        top: -40,
        zIndex: 2,
        paddingVertical: pixelSizeVertical(20),
        backgroundColor: "#fff",
        minHeight: heightPixel(330),
        width: '90%',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    receiptDetailsRow: {
        flexDirection: 'row',
        width: "90%",
        paddingHorizontal: pixelSizeHorizontal(40),
        height: 55,
        backgroundColor: "#F1F1F1",
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: "#B6B6B6",
        borderBottomWidth: 1,
    },
    rowValue: {
        color: Colors.textDark,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumMedium
    },
    rowKey: {
        color: Colors.textDark,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumMedium
    },
    buttonWrap: {

        height: 90,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    categoryIcon: {

        width: 50,
        height: 50,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        width: '90%',

        alignItems: 'center',
    },
    nameTxt: {
        color: Colors.textDark,
        fontSize: fontPixel(18),
        fontFamily: Fonts.faktumBold
    },
    type: {
        width: '90%',

        alignItems: 'center',
    },
    typeTxt: {
        color: "#9CA3AF",
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumRegular
    },
    transactionStatusBox: {
        marginTop: 40,
        flexDirection: 'row',
        height: heightPixel(155),
        width: '90%',
        borderRadius: 35,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        zIndex: 10,
    },
    innerBoxBody: {

        flexDirection: 'row',
        width: '70%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    assetImage: {
        marginRight: 10,
        height: 100,
        width: 100,
        borderRadius: 80,

    },
    assetImageLogo: {
        borderRadius: 80,
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },

    leftInfo: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    leftInfoNameText: {
        color: Colors.textDark,
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumRegular
    },
    userImage: {

        height: 75,
        width: 75,
        borderRadius: 11,

        borderColor: "#fff",
        borderWidth: 2,

    },
    innerBox: {

        width: '70%',
        height: '50%',

        alignItems: 'flex-start',
        justifyContent: 'center',

    },
    innerBoxDate: {
        color: Colors.textDark,
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumSemiBold
    },
    innerBoxAmount: {


        color: Colors.textDark,
        fontSize: fontPixel(24),
        fontFamily: Fonts.faktumBold
    },
    statusWrap: {
        textTransform: 'capitalize',
        backgroundColor: "#00B2FF",
        paddingHorizontal: 5,
        alignItems:'center',
        justifyContent:'center',
        height: 25,
        borderRadius: 10,
    },
    innerBoxStatus: {
        color: Colors.textDark,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumMedium
    },
    receiptButton: {
        width: widthPixel(120),
        height: heightPixel(80),
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: "#062638",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },
    receiptButtonTxt: {
        marginTop: 5,

        color: Colors.text,
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumMedium,
        textAlign: 'center'
    },
    reference: {

        width: '45%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    copyBtn: {
        backgroundColor: "#00B2FF",
        paddingHorizontal: pixelSizeHorizontal(8),
        borderRadius: 10,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    copyText: {
        color: "#fff",
        fontSize: fontPixel(12),

        fontFamily: Fonts.faktumRegular
    },
    buttonCategory: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        minWidth: widthPixel(140),
        marginVertical: pixelSizeVertical(20),
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Colors.borderColor
    },
    btnText: {
        color: Colors.secondary,
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumMedium,
    },
    logo: {
        borderRadius: 11,
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    background: {
        paddingHorizontal: 20,
        flex: 1,
        width: '100%',
        alignItems: "center"
    },
    note: {
        minHeight: 50,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    noteText: {
        color: Colors.textDark,
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumMedium,
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
     //   paddingHorizontal: pixelSizeHorizontal(10),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    qrBoxWrap: {

        borderRadius: 34,
        marginVertical: pixelSizeVertical(10),
        width: '100%',
        height: heightPixel(300),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "space-between",

    },
    chart_photo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: 24,
    },
    imageCover: {
        alignSelf: 'center',
        marginBottom: 15,
        height: 65,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    brandName: {
        marginRight: 5,
        fontFamily: Fonts.faktumMedium,
        fontSize: fontPixel(20),
        color: "#fff"
    },
    pinchable: {
        flex: 1,

    },
})

export default SignalDetails;
