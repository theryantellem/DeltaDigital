import React, {useState} from 'react';

import {Text, View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import HeaderWithTitle from "../../../../components/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {botTradeSetting, twoFactorAuth} from "../../../../api";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {
    fontPixel,
    heightPixel,
    pixelSizeHorizontal,
    pixelSizeVertical,
    widthPixel
} from "../../../../helpers/normalize";
import Colors from "../../../../constants/Colors";
import {Fonts} from "../../../../constants/Fonts";
import QRCode from "react-native-qrcode-svg";
import HorizontalLine from "../../../../components/HorizontalLine";
import {Entypo} from "@expo/vector-icons";
import {MyButton} from "../../../../components/MyButton";
import TextInput from "../../../../components/inputs/TextInput";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {addNotificationItem, clearTradeSetting} from "../../../../app/slices/dataSlice";
import * as Haptics from "expo-haptics";
import {RootStackScreenProps} from "../../../../types";
import {useRefreshOnFocus} from "../../../../helpers";

const TwoFactorAuth = ({navigation}: RootStackScreenProps<'TwoFactorAuth'>) => {


    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()

    const user = useAppSelector(state => state.user)
    const {User_Details} = user

    const [authCode, setAuthCode] = useState('');

    const body = new FormData()
    body.append('secret', 'TYGYEISKSSJSMPM')
    body.append('type', 'view')
    body.append('ga', '123456')
    body.append('ga_login', '1')
    body.append('ga_transfer', '0');

    const {data, refetch, isLoading} = useQuery(['twoFactorAuth', User_Details.id], () => twoFactorAuth({userId: User_Details.id, body}))
//console.log(data)
//console.log(data.qrCodeUrl)

    const {mutate, isLoading: adding, isSuccess, error} = useMutation(['two-Factor-Auth'], twoFactorAuth,

        {

            onSuccess: async (data) => {
                // alert(message)

                if (data.status == 1) {


                    navigation.navigate('SuccessScreen', {
                        title: 'Successful',
                        message: '2 Factor authentication updated!',
                        type: 'success'
                    })


                } else {
                    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
                    dispatch(addNotificationItem({
                        id: Math.random(),
                        type: 'error',
                        body: data.data,
                    }))

                }
            },

            onError: (err) => {

                console.log(err)
            },
            onSettled: () => {
                queryClient.invalidateQueries(['two-Factor-Auth']);
            }

        })

    const setAuth = () => {
        if (authCode !== '') {


            const body = new FormData()
            body.append('secret', data?.secret)
            body.append('type', 'add')
            body.append('ga', authCode)
            body.append('ga_login', '1')
            body.append('ga_transfer', '0');
            mutate({body, userId: User_Details.id})
        } else {
            dispatch(addNotificationItem({
                id: Math.random(),
                type: 'error',
                body: '2FA Auth code is required!',
            }))
        }
    }

    const deleteAuth = () => {
        if (authCode !== '') {


            const body = new FormData()
            body.append('secret', 'TYGYEISKSSJSMPM')
            body.append('type', 'delete')
            body.append('ga', authCode)
            body.append('ga_login', '1')
            body.append('ga_transfer', '0');
            mutate({body, userId: User_Details.id})
        }else{
            dispatch(addNotificationItem({
                id: Math.random(),
                type: 'error',
                body: '2FA Auth code is required!',
            }))
        }
    }

    useRefreshOnFocus(refetch)
    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#04074E', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}
            >

                <HeaderWithTitle title='Set your Google 2FA'/>
                <KeyboardAwareScrollView style={{
                    width: '100%'
                }} contentContainerStyle={styles.scrollView} scrollEnabled
                                         showsVerticalScrollIndicator={false}>

                    {
                        !isLoading && data && data?.status == '1' &&

                        <>

                            <View style={styles.assetBox}>


                                <Text style={styles.coinName}>
                                    {data?.secret}
                                </Text>


                            </View>
                            <Text style={styles.coinName}>
                                OR
                            </Text>

                            <View style={styles.qrCode}>


                                <QRCode
                                    logo={require('../../../../assets/images/cyborg-logo.png')}
                                    logoSize={35}
                                    size={200}
                                    value={data?.qrCodeUrl}
                                    color={Colors.text}

                                    backgroundColor={Colors.secondary}
                                />


                            </View>

                            <HorizontalLine margin={10}/>


                            <TextInput
                                isWidth={'90%'}
                                placeholder="0"
                                keyboardType={"number-pad"}


                                onChangeText={(e) => {
                                    setAuthCode(e);
                                }}


                                value={authCode}
                                label="2FA Code"/>


                            <View style={styles.operationReminderWrap}>
                                <Text style={styles.operationReminderTitle}>
                                    Operation reminder
                                </Text>


                                <View style={[styles.list, {
                                    marginTop: 12,
                                }]}>
                                    <Entypo name="dot-single" size={20} color={Colors.pendingYellow}/>
                                    <Text style={[styles.bodyText, {}]}>
                                        Once the 2FA is set, you need to enter 2FA everytime you log into the system
                                    </Text>
                                </View>


                                <View style={styles.list}>
                                    <Entypo name="dot-single" size={20} color={Colors.pendingYellow}/>
                                    <Text style={[styles.bodyText, {}]}>
                                        Enter the secret or scan the QR code to add the 2FA to the authenticator
                                    </Text>
                                </View>


                                <View style={styles.list}>
                                    <Entypo name="dot-single" size={20} color={Colors.pendingYellow}/>
                                    <Text style={[styles.bodyText, {}]}>
                                        Enter the 2FA code generated in the authenticator
                                    </Text>
                                </View>
                            </View>

                        </>
                    }



     {
                        !isLoading && data && data?.status == '0' &&

                        <>






                            <HorizontalLine margin={10}/>


                            <TextInput
                                isWidth={'90%'}
                                placeholder="0"
                                keyboardType={"number-pad"}


                                onChangeText={(e) => {
                                    setAuthCode(e);
                                }}


                                value={authCode}
                                label="2FA Code"/>


                            <View style={styles.operationReminderWrap}>
                                <Text style={styles.operationReminderTitle}>
                                    Operation reminder
                                </Text>


                                <View style={[styles.list, {
                                    marginTop: 12,
                                }]}>
                                    <Entypo name="dot-single" size={20} color={Colors.pendingYellow}/>
                                    <Text style={[styles.bodyText, {}]}>
                               2 FA is enabled on this account and required for login
                                    </Text>
                                </View>






                            </View>

                        </>
                    }


                </KeyboardAwareScrollView>
                {data?.status == '1' &&
                    <MyButton onPress={setAuth} style={[styles.button, {
                        // backgroundColor: !isValid ? Colors.border : Colors.primary
                    }]}>
                        <LinearGradient style={styles.createBtnGradient}
                                        colors={['#e602df', '#4406b0']}

                                        start={{x: 1, y: 0}}
                                        end={{x: 0.1, y: 0.3,}}

                            // locations={[0.1, 0.7,]}
                        >
                            {
                                adding && <ActivityIndicator size='small' color={"#fff"}/>
                            }
                            {
                                !adding &&
                                <Text style={styles.buttonTxt}>
                                    SET 2FA
                                </Text>
                            }

                        </LinearGradient>
                    </MyButton>
                }
                {data?.status == '0' &&
                    <MyButton onPress={deleteAuth} style={[styles.button, {
                        // backgroundColor: !isValid ? Colors.border : Colors.primary
                    }]}>
                        <LinearGradient style={styles.createBtnGradient}
                                        colors={['#e602df', '#4406b0']}

                                        start={{x: 1, y: 0}}
                                        end={{x: 0.1, y: 0.3,}}

                            // locations={[0.1, 0.7,]}
                        >
                            {
                                adding && <ActivityIndicator size='small' color={"#fff"}/>
                            }
                            {
                                !adding &&
                                <Text style={styles.buttonTxt}>
                                    DELETE 2FA
                                </Text>
                            }

                        </LinearGradient>
                    </MyButton>
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
    assetBox: {

        borderRadius: 12,

        height: heightPixel(50),
        alignItems: 'center',

        flexDirection: 'row',
        justifyContent: 'center',

    },

    coinName: {
        color: Colors.text,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumBold
    },
    qrCode: {
        marginVertical: pixelSizeHorizontal(20),
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: heightPixel(250),
        height: heightPixel(250),
        borderRadius: 16,
        padding: 10,
        backgroundColor: Colors.secondary,

    },
    operationReminderWrap: {
        marginTop: 20,
        width: '90%',
        alignItems: 'flex-start'
    },
    operationReminderTitle: {
        color: Colors.pendingYellow,
        fontFamily: Fonts.faktumMedium,
        fontSize: fontPixel(16),

    },
    list: {
        minHeight: heightPixel(20),
        // flexWrap:'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '90%',
        marginVertical: pixelSizeVertical(10),

    },
    bodyText: {

        lineHeight: heightPixel(20),
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(14),
        color: Colors.text
    },
    button: {
        width: '90%',
        bottom: 0,
        justifyContent: 'center',
    },
    createBtnGradient: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTxt: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(18),
        color: "#fff"
    },
})

export default TwoFactorAuth;
