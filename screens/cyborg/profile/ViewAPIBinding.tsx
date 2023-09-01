import React, {useState} from 'react';

import {Text, View, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import HeaderWithTitle from "../../../components/header/HeaderWithTitle";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {RootStackScreenProps} from "../../../types";
import {fontPixel, heightPixel, pixelSizeHorizontal} from "../../../helpers/normalize";
import {Fonts} from "../../../constants/Fonts";
import Colors from "../../../constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import {truncate, truncateString, useRefreshOnFocus} from "../../../helpers";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {bindAPI, getUser} from "../../../api";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import HorizontalLine from "../../../components/HorizontalLine";
import * as Clipboard from "expo-clipboard";
import {addNotificationItem} from "../../../app/slices/dataSlice";
import ToastAnimated from "../../../components/toast";
import {useFormik} from "formik";
import * as yup from "yup";
import TextInput from "../../../components/inputs/TextInput";
import {MyButton} from "../../../components/MyButton";


const formSchema = yup.object().shape({

    apiKey: yup.string().required('API Key is required'),
    APISecrete: yup.string().required('API Secrete is required'),
  passphrase: yup.string().required('Pass Phrase is required'),

});


const ViewAPIBinding = ({route, navigation}: RootStackScreenProps<'ViewAPIBinding'>) => {

    const dispatch = useAppDispatch()
    const queryClient = useQueryClient()
    const {exchange, apiSecrete, apiKey, exchangeName,isBound} = route.params

    const [copied, setCopied] = useState(false);


    const [bindUnbind, setBindUnbind] = useState('');


    const [userApiKey, setUserApiKey] = useState(apiKey)
    const [focusApiKey, setFocusApiKey] = useState(false)

    const [APISecrete, setAPISecrete] = useState(apiSecrete);
    const [focusSecrete, setFocusSecrete] = useState(false)

    const [passphrase, setPassphrase] = useState('0');
    const [focusPassphrase, setFocusPassphrase] = useState(false)

    const user = useAppSelector(state => state.user)
    const {userData, User_Details} = user
    const {data, isRefetching, refetch,} = useQuery(
        [`user-data`, User_Details.id],
        () => getUser(User_Details.id),
        {})

    const copyToClipboard = async (content: string) => {
        await Clipboard.setStringAsync(content);

        dispatch(addNotificationItem({
            id: Math.random(),
            type: 'info',
            body: "Api Group copied 👍",
        }))

    };


    const {isLoading, mutate} = useMutation(['bindAPI'], bindAPI, {
        onSuccess: async (data) => {
console.log(data)
            if (data.status == 1) {

                navigation.navigate('SuccessScreen', {
                    type: 'success',
                    title: `${data.data}`,
                    message: `${exchangeName} API Updated successfully`
                })

            } else {
                dispatch(addNotificationItem({
                    id: Math.random(),
                    type: 'error',
                    body: data?.data,
                }))
            }


        },
        onSettled: () => {
            queryClient.invalidateQueries(['bindAPI']);
        }
    })

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
            apiKey: apiKey,
            passphrase: '0',
            APISecrete: apiSecrete

        },
        onSubmit: (values) => {
            const {APISecrete, apiKey, passphrase} = values;


            if(bindUnbind == '0') {


                const formData = new FormData()
                formData.append('api_passphrase', passphrase)
                formData.append('api_key', apiKey)
                formData.append('api_secret', APISecrete)
                formData.append('bind',  '1')
                formData.append('exchange', exchange)

                mutate({body: formData, userId: User_Details.id})
            }else{
                const formData = new FormData()
                formData.append('api_passphrase', passphrase)
                formData.append('api_key', apiKey)
                formData.append('api_secret', APISecrete)
                formData.append('bind',  '0' )
                formData.append('exchange', exchange)


               mutate({body: formData, userId: User_Details.id})
            }

        }
    });


useRefreshOnFocus(refetch)
    return (

        <>

            {
                isLoading &&
                <View style={styles.loading}>
                    <ActivityIndicator size='large' color={Colors.purplePrimary}/>
                </View>
            }

        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#04074E', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >


                <HeaderWithTitle title={`${exchangeName} API Binding`}/>
                <KeyboardAwareScrollView style={{
                    width: '100%'
                }} contentContainerStyle={styles.scrollView} scrollEnabled
                                         showsVerticalScrollIndicator={false}>

                    <View style={styles.planInfo}>
                        <Text style={styles.planTitle}>
                            IP Group Binding
                        </Text>
                        <View style={styles.planMessage}>
                            <Text style={styles.planMessageTxt}>
                                for security, binance Exchange recommends binding the server IP address when creating
                                the API.
                                For users who need to bind the IP address, click Edit permissions in the upper right
                                corner
                                after the API is created, and click in the IP address permission column to restrict
                                access to
                                only trusted IPs. (Recommended) option, click the copy button to copy the IP group to
                                the input
                                box and click OK, after adding, click save in the upper right corner.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.copyWrap}>
                        <View>
                            <Text style={styles.walletAddress}>
                                {
                                    truncateString(data.data['User Details'][0]['api group'], 45)
                                }


                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => copyToClipboard(data.data['User Details'][0]['api group'])}>
                            <Ionicons name="ios-copy-outline" size={18}
                                      color={Colors.primary}/>
                        </TouchableOpacity>


                    </View>
                    <HorizontalLine margin={20}/>


                    <View style={styles.authContainer}>

                        <TextInput

                            placeholder="API Key"
                            keyboardType={"default"}
                            touched={touched.apiKey}
                            error={touched.apiKey && errors.apiKey}
                            onFocus={() => setFocusApiKey(true)}
                            onChangeText={(e) => {
                                handleChange('apiKey')(e);
                                setUserApiKey(e);
                            }}
                            onBlur={(e) => {
                                handleBlur('apiKey')(e);
                                setFocusApiKey(false);
                            }}
                            defaultValue={userApiKey}
                            focus={focusApiKey}
                            value={values.apiKey}
                            label="API Key"/>

                        <TextInput

                            placeholder="API Secrete"
                            keyboardType={"default"}
                            touched={touched.APISecrete}
                            error={touched.APISecrete && errors.APISecrete}
                            onFocus={() => setFocusSecrete(true)}
                            onChangeText={(e) => {
                                handleChange('APISecrete')(e);
                                setAPISecrete(e);
                            }}
                            onBlur={(e) => {
                                handleBlur('APISecrete')(e);
                                setFocusSecrete(false);
                            }}
                            defaultValue={APISecrete}
                            focus={focusSecrete}
                            value={values.APISecrete}
                            label="API Secrete"/>

                        {
                            isBound == '0'
                            && exchangeName !== 'Binance' &&
                            <TextInput

                                placeholder="Passphrase"
                                keyboardType={"default"}
                                touched={touched.passphrase}
                                error={touched.passphrase && errors.passphrase}
                                onFocus={() => setFocusPassphrase(true)}
                                onChangeText={(e) => {
                                    handleChange('passphrase')(e);
                                    setPassphrase(e);
                                }}
                                onBlur={(e) => {
                                    handleBlur('passphrase')(e);
                                    setFocusPassphrase(false);
                                }}
                                defaultValue={passphrase}
                                focus={focusPassphrase}
                                value={values.passphrase}
                                label="API Passphrase (Optional)"/>
                        }

                    </View>

                    {
                        isBound == '0'
                        &&
                        <MyButton onPress={() => {
                            setBindUnbind('0')
                            handleSubmit()
                        }} activeOpacity={0.7}
                                  style={[styles.button, {
                                      backgroundColor: !isValid ? Colors.disabled : Colors.purplePrimary
                                  }]} disabled={!isValid}>

                            {
                                isLoading ? <ActivityIndicator color={"#fff"} size='small'/>
                                    :
                                    <Text style={styles.btnText}>
                                        Bind
                                    </Text>
                            }


                        </MyButton>
                    }


                    {
                        isBound == '1'
                        &&

                        <View style={styles.buttonRow}>
                            <MyButton onPress={() => {
                                setBindUnbind('1')
                                handleSubmit()
                            }} activeOpacity={0.7}
                                      style={[styles.smallButton, {
                                          backgroundColor: !isValid ? Colors.disabled : Colors.purplePrimary
                                      }]} disabled={!isValid}>


                                        <Text style={styles.btnText}>
                                            UNBIND
                                        </Text>



                            </MyButton>

                            <MyButton onPress={() => {
                                setBindUnbind('0')
                                handleSubmit()
                            }} activeOpacity={0.7}
                                      style={[styles.smallButton, {
                                          backgroundColor: !isValid ? Colors.disabled : Colors.primary
                                      }]} disabled={!isValid}>


                                        <Text style={styles.btnText}>
                                            REPLACE
                                        </Text>



                            </MyButton>


                        </View>
                    }
                </KeyboardAwareScrollView>

                <ToastAnimated/>
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
    scrollView: {
        width: '100%',
        alignItems: "center"
    },
    planInfo: {
        width: '100%',
        paddingHorizontal: pixelSizeHorizontal(20),
        minHeight: heightPixel(40),
        alignItems: 'flex-start',
        justifyContent: 'flex-start',

    },
    planTitle: {
        color: "#fff",
        fontSize: fontPixel(18),
        fontFamily: Fonts.faktumBold
    },
    planMessage: {

        marginTop: 10,
    },
    planMessageTxt: {
        lineHeight: heightPixel(20),
        color: Colors.tintText,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumRegular
    },
    copyWrap: {
        height: 70,
        width: '90%',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    walletAddress: {
        color: Colors.text,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumSemiBold
    },

    authContainer: {

        justifyContent: 'flex-start',
        width: '90%',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumBold

    },
    button: {
        width: '90%',
        height: heightPixel(64),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        bottom: 0,
    },

    smallButton: {
        width: '45%',
        height: heightPixel(50),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        bottom: 0,
    },

    buttonRow: {
        width: '90%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    loading: {
        flex:1,
        width:'100%',
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex:1,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'rgba(0,0,0,0.3)'
    },
})

export default ViewAPIBinding;
