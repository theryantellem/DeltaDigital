import React, {useEffect, useState} from 'react';

import {Text, View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import HeaderWithTitle from "../../../components/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {RootStackScreenProps} from "../../../types";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../../../helpers/normalize";
import {Fonts} from "../../../constants/Fonts";
import Colors from "../../../constants/Colors";
import WalletAddressInput from "../../../components/inputs/WalletAddressInput";
import {useFormik} from "formik";
import * as yup from "yup";
import {BarCodeScanner} from "expo-barcode-scanner";
import {Entypo, Ionicons} from "@expo/vector-icons";
import {MyButton} from "../../../components/MyButton";




const formSchema = yup.object().shape({


    walletAddress: yup.string().required('Wallet address is required'),


})



const Withdrawal = ({}:RootStackScreenProps<'Withdrawal'>) => {

    const [validWallet, setValidWallet] = useState<boolean | null>(null);
    const [validWalletCheck, setValidWalletCheck] = useState('');

    const [scanned, setScanned] = useState(false);
    const [scannerView, setScannerView] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const [walletAddress, setWalletAddress] = useState('');

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);


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
            //  network: '',

            walletAddress: '',


        },
        onSubmit: (values) => {
            //navigation.navigate('CryptoWithdrawalDetails')
            const {walletAddress,} = values


        }
    });


    const showScannerView = () => {
        setScannerView(!scannerView);
    };
    const handleBarCodeScanned = ({type, data}: any) => {
        setScanned(true);
        setWalletAddress(data);
        setFieldValue("walletAddress", data);
        setScannerView(false);
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

const proceed = () =>{

}

    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#04074E', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >
                {scannerView && (
                    <View style={styles.container}>
                        <BarCodeScanner

                            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                            style={StyleSheet.absoluteFillObject}
                        />
                        <TouchableOpacity
                            onPress={() => setScannerView(false)}
                            style={styles.scannerView}
                        >
                            <Ionicons name="close" size={24} color="black"/>
                        </TouchableOpacity>
                    </View>
                )}
                {!scannerView && (
                <>

                <HeaderWithTitle title='Withdraw'/>
                <ScrollView style={{
                    width: '100%'
                }} contentContainerStyle={styles.scrollView} scrollEnabled
                            showsVerticalScrollIndicator={false}>

                    <View style={styles.planInfo}>
                        <Text style={styles.planTitle}>
                            Enter Crypto Details
                        </Text>
                        <View style={styles.planMessage}>
                            <Text style={styles.planMessageTxt}>
                                Enter crypto details you want to use for this transaction
                            </Text>
                        </View>
                    </View>


                    <View style={styles.formContainer}>


                        <WalletAddressInput
                            action={showScannerView}
                            placeholder="Scan or paste wallet address"
                            keyboardType={"default"}
                            touched={touched.walletAddress}
                            error={touched.walletAddress && errors.walletAddress || validWalletCheck}

                            onChangeText={(e) => {
                                handleChange('walletAddress')(e);

                            }}
                            onBlur={(e) => {
                                handleBlur('walletAddress')(e);

                            }}
                            value={values.walletAddress}
                            label="Wallet address"/>

                        <View style={styles.operationReminderWrap}>
                            <Text style={styles.operationReminderTitle}>
                                Operation reminder
                            </Text>


                            <View style={[styles.list, {
                                marginTop: 12,
                            }]}>
                                <Entypo name="dot-single" size={24} color={Colors.pendingYellow}/>
                                <Text style={[styles.bodyText, {}]}>
                                    The minimum withdrawal amount for a single
                                    transaction is <Text style={{fontFamily:Fonts.faktumBold}}>10 TRC20 USDT</Text>
                                </Text>
                            </View>


                            <View style={styles.list}>
                                <Entypo name="dot-single" size={24} color={Colors.pendingYellow}/>
                                <Text style={[styles.bodyText, {}]}>

                                    Do not transfer <Text style={{fontFamily:Fonts.faktumBold}}>TRC20 USDT</Text> assets to a non TRC20
                                    USDT addresses otherwise they can not be retrieved.
                                </Text>
                            </View>



                        </View>

                    </View>


                </ScrollView>
                    <MyButton onPress={proceed} style={styles.proceedBtn}>
                        <Text style={styles.btnText}>
                            Proceed
                        </Text>
                    </MyButton>

                </>
                )
                }

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
    formContainer: {

        width: '90%',
        justifyContent: 'space-between',

        alignItems: 'center',
    },
    operationReminderWrap: {
        marginTop: 20,
        width: '100%',
        alignItems: 'flex-start'
    },
    operationReminderTitle: {
        color: Colors.pendingYellow,
        fontFamily: Fonts.faktumMedium,
        fontSize: fontPixel(16),

    },
    list: {
        minHeight:heightPixel(20),
        // flexWrap:'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '90%',
        marginVertical:pixelSizeVertical(10),

    },
    bodyText: {

        lineHeight: heightPixel(20),
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(14),
        color: Colors.text
    },
    proceedBtn: {
        justifyContent: 'center',
        width: widthPixel(250),
        backgroundColor: Colors.primary,
        marginBottom: 20,
    },
    btnText: {
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumSemiBold,
        color: Colors.text
    },
    container: {
        alignItems: "center",
        height: "100%",
        width: "100%",
    },
    scannerView: {
        width: 50,
        marginTop: "40%",
        height: 50,
        backgroundColor: Colors.tintPrimary,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    },

})

export default Withdrawal;
