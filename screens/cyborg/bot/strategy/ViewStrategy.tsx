import React, {useCallback, useMemo, useRef} from 'react';

import {Text, View, StyleSheet, ScrollView, TouchableOpacity, Image, Pressable} from 'react-native';
import HeaderWithTitle from "../../../../components/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {RootStackScreenProps} from "../../../../types";
import {
    fontPixel,
    heightPixel,
    pixelSizeHorizontal,
    pixelSizeVertical,
    widthPixel
} from "../../../../helpers/normalize";
import Colors from "../../../../constants/Colors";
import {Fonts} from "../../../../constants/Fonts";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import BottomSheet, {BottomSheetBackdrop} from "@gorhom/bottom-sheet";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {
    BottomSheetDefaultBackdropProps
} from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import {useFormik} from "formik";
import * as yup from "yup";
import BottomSheetTextInput from "../../../../components/inputs/BottomSheetTextInput";





const formSchema = yup.object().shape({

    capital: yup.string().required('Capital is required'),

    exchange: yup.string().required('Exchange is required'),

});
const ViewStrategy = ({navigation}: RootStackScreenProps<'ViewStrategy'>) => {



    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ['1%', '50%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetRef.current?.snapToIndex(1);
    }, []);

    const handleClose = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);


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


    const {
        resetForm,
        handleChange, handleSubmit, handleBlur,
        setFieldValue,
        isSubmitting,
        setSubmitting,
        values,
        errors,
        touched,
        isValid
    } = useFormik({
        validationSchema: formSchema,
        initialValues: {
            capital: '',
            exchange: ''

        },
        onSubmit: (values) => {
            const {exchange, capital} = values;






        }
    });

    return (
        <>

        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#04074E', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >


                <HeaderWithTitle title='Assets'/>
                <ScrollView style={{
                    width: '100%'
                }} contentContainerStyle={styles.scrollView} scrollEnabled
                            showsVerticalScrollIndicator={false}>


                    <View style={styles.topSummary}>
                        <View style={styles.bankIcon}>
                            <Image style={styles.logo}
                                   source={{uri: 'https://unsplash-assets.imgix.net/unsplashplus/header-grid-03.jpg?dpr=2&auto=format&fit=crop&w=218&h=218&q=80'}}/>

                        </View>


                        <View style={styles.amountContainer}>
                            <Text style={styles.msg}>
                                Please proceed to your banking app

                            </Text>
                            <Text style={[styles.amount, {}]}>

                                +242.43%

                            </Text>
                            <Text style={styles.subTitleDeposit}>
                                All interest earned on all above account types, referral commissions, bonuses and
                                winnings are paid to your account. There is however, no interest in this account.
                            </Text>
                        </View>

                    </View>


                    <View style={styles.stats}>
                        <View style={styles.statsBtn}>
                            <View style={[styles.statIcon, {
                                backgroundColor: "#D5EED6",
                            }]}>
                                <Ionicons name="ios-clipboard-outline" size={20} color="#2DA833"/>
                            </View>

                            <View style={styles.statsBtnBody}>

                                <Text style={styles.statsBtnTitle}>
                                    Copying fee
                                </Text>
                                <Text style={styles.statsBtnNumber}>
                                    42%
                                </Text>

                            </View>
                        </View>

                        <View style={styles.statsBtn}>
                            <View style={[styles.statIcon, {
                                backgroundColor: "#FEE2E2",
                            }]}>
                                <Ionicons name="people-outline" size={20} color="#EF4444"/>
                            </View>

                            <View style={styles.statsBtnBody}>
                                <Text style={styles.statsBtnTitle}>
                                    Followers
                                </Text>
                                <Text style={styles.statsBtnNumber}>
                                    242

                                </Text>
                            </View>

                        </View>
                    </View>


                    <View style={styles.appCardTop}>
                        <Text style={styles.listTitle}>
                            Bots available for copying
                        </Text>
                        <TouchableOpacity style={styles.seeAll} activeOpacity={0.6}>
                            <MaterialIcons name="sort" size={24} color="#fff"/>

                        </TouchableOpacity>
                    </View>


                    <TouchableOpacity style={styles.walletCard} activeOpacity={0.9}>
                        <View style={styles.cardTop}>
                            <View style={styles.logoCircle}>

                                <Image style={styles.logo}
                                       source={{uri: 'https://pbs.twimg.com/profile_images/1554101736297611268/wqZ_6hqI_400x400.jpg'}}/>


                            </View>

                            <View style={styles.walletCardBody}>
                                <Text style={styles.cardTitle}>
                                    Axe Short Bot
                                </Text>
                                <Text style={[styles.cardText, {
                                    color: Colors.tintText
                                }]}>
                                    Spot
                                </Text>
                            </View>
                            <View style={styles.walletCardAmount}>
                                <Text style={[styles.cardTitle, {
                                    fontSize: fontPixel(14),
                                    color: Colors.successChart
                                }]}>
                                    +2% Fee
                                </Text>
                            </View>
                        </View>

                        <View style={styles.cardFooter}>
                            <Text style={styles.copyRangeText}>
                                Capital Range: $100-$4000
                            </Text>

                            <Pressable onPress={handlePresentModalPress} style={styles.copyBot}>
                                <Ionicons name="copy-outline" size={14} color="#fff"/>
                                <Text style={styles.copyRangeText}>
                                    Copy Bot
                                </Text>
                            </Pressable>
                        </View>
                    </TouchableOpacity>


                </ScrollView>
            </LinearGradient>
        </SafeAreaView>


            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                keyboardBehavior="interactive"
                backdropComponent={renderBackdrop}
                style={{
                    paddingHorizontal: pixelSizeHorizontal(20)
                }}
                backgroundStyle={{
                    backgroundColor: Colors.dark.background,
                }}
                handleIndicatorStyle={{backgroundColor: "#fff"}}
            >
                <KeyboardAwareScrollView style={styles.sheetScrollView} contentContainerStyle={{
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
                        Enter setting to continue
                        </Text>
                        <TouchableOpacity onPress={handleClose}
                                          style={[styles.dismiss, {
                                              backgroundColor: "#11192E"
                                          }]}>
                            <Ionicons name="close-sharp" size={20} color={"#fff"}/>
                        </TouchableOpacity>
                    </View>


                    <BottomSheetTextInput


                                          keyboardType={"default"}
                                          touched={touched.capital}
                                          error={touched.capital && errors.capital}

                                          onChangeText={(e) => {
                                              handleChange('capital')(e);

                                          }}
                                          onBlur={(e) => {
                                              handleBlur('capital')(e);

                                          }}


                                          value={values.capital}
                                          label="Capital"
                     placeholder='capital'/>


                    <View style={styles.bottomRow}>


                        <TouchableOpacity style={styles.startBottom}>
                            <Text>

                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text>

                            </Text>
                        </TouchableOpacity>

                    </View>


                </KeyboardAwareScrollView>

            </BottomSheet>

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
    scrollView: {
        width: '100%',
        alignItems: "center"
    },

    topSummary: {
        width: '90%',
        alignItems: 'center',
        height: heightPixel(300),
        justifyContent: 'space-evenly',
    },
    bankIcon: {
        width: 70,
        height: 70,
        borderRadius: 70,
        backgroundColor: Colors.lightGrey,
        alignItems: 'center',
        justifyContent: 'center',
    },
    amountContainer: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        minHeight: heightPixel(140),
        marginVertical: pixelSizeVertical(10)
    },
    amount: {
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(26),
        color: Colors.success
    },
    subTitleDeposit: {
        marginTop: 10,
        textAlign: 'center',
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(16),
        color: Colors.text
    },
    message: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    msg: {
        fontFamily: Fonts.faktumMedium,
        fontSize: fontPixel(14),
        color: Colors.pendingYellow,
        textAlign: 'center',
        lineHeight: heightPixel(25)
    },
    stats: {
        width: '100%',
        alignItems: 'center',
        height: heightPixel(90),
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    statsBtn: {
        width: widthPixel(175),
        height: heightPixel(82),
        backgroundColor: Colors.secondary,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    statIcon: {
        width: 40,
        height: 40,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    statsBtnBody: {

        width: '50%',
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly'
    },
    statsBtnTitle: {
        color: Colors.tintText,
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(14)
    },
    statsBtnNumber: {
        color: Colors.text,
        fontFamily: Fonts.faktumSemiBold,
        fontSize: fontPixel(16)
    },
    appCardTop: {
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        height: heightPixel(40),

    },
    listTitle: {
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumBold,
        color: Colors.text
    },
    seeAll: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    walletCard: {
        justifyContent: 'space-evenly',
        marginVertical: pixelSizeVertical(12),
        width: '90%',
        borderRadius: 10,
        height: heightPixel(130),
        alignItems: 'center',

        borderColor: Colors.borderColor,
        borderWidth: 1,
        //backgroundColor:Colors.secondary,
    },
    cardTop: {
        padding: 16,
        height: 70,
        width: '100%',
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-between',
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
        fontSize: fontPixel(14),
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
    cardFooter: {
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderTopColor: Colors.borderColor,
        borderTopWidth: 1,
    },
    copyBot: {
        flexDirection: 'row',
        width: 90,
        height: 30,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: Colors.primary
    },
    copyRangeText: {
        fontFamily: Fonts.faktumSemiBold,
        fontSize: fontPixel(12),
        color: Colors.text,
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
    bottomRow:{
        width:'100%',
        height:heightPixel(50),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"space-between",

    }
})

export default ViewStrategy;
