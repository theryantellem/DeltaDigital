import React, {useCallback, useState} from 'react';

import {Text, View, StyleSheet, ActivityIndicator, Pressable, ImageBackground, Platform, Alert} from 'react-native';
import HeaderWithTitle from "../../../../components/cyborg/header/HeaderWithTitle";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import * as yup from "yup";
import {useFormik} from "formik";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {Fonts} from "../../../../constants/Fonts";
import Colors from "../../../../constants/Colors";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical} from "../../../../helpers/normalize";
import TextArea from "../../../../components/inputs/TextArea";
import TextInput from "../../../../components/inputs/TextInput";
import {sendTicketFeedback, startStopBot} from "../../../../api";
import * as Haptics from "expo-haptics";
import {addNotificationItem} from "../../../../app/slices/dataSlice";
import {CyborgStackScreenProps, RootStackScreenProps} from "../../../../types";
import {MyButton} from "../../../../components/MyButton";
import {IF} from "../../../../helpers/ConditionJsx";
import * as ImagePicker from "expo-image-picker";

import * as FileSystem from "expo-file-system";
import {isLessThanTheMB} from "../../../../helpers";
import ToastAnimated from "../../../../components/toast";





const getFileInfo = async (fileURI: string) => {
    const fileInfo = await FileSystem.getInfoAsync(fileURI, {
        size: true,

    })

    return fileInfo

}



const formSchema = yup.object().shape({


    subject: yup.string().required('Ticket subject is required'),
    message: yup.string().required('Please tell us more'),
    // priority: yup.string().required('Ticket priority is required'),
    image_paper: yup.string().required('Image is required')
})
const CreateTicket = ({navigation}:CyborgStackScreenProps<'CreateTicket'>) => {

    const dispatch = useAppDispatch()
    const queryClient = useQueryClient()
    const [image_id, setImage_id] = useState('');
    const [imageUri, setImageUri] = useState('');
    const dataSlice = useAppSelector(state => state.data)
    const user = useAppSelector(state => state.user)
    const {responseMessage, responseState, responseType,User_Details} = user
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);



    const [contentSubject, setContentSubject] = useState('');
    const [focusSubject, setFocusSubject] = useState(false);

    const [message, setMessage] = useState('');
    const [focusMessage, setFocusMessage] = useState(false);





    const requestPermission = useCallback(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const libraryResponse =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                const photoResponse = await ImagePicker.requestCameraPermissionsAsync();

                if (
                    libraryResponse.status !== "granted" ||
                    photoResponse.status !== "granted"
                ) {

                    Alert.alert("Sorry, we need camera roll permissions to make this work!");
                }
            }
        })();
    }, []);




    const selectImagePaper = async () => {
        // requestPermission()
        // No permissions request is necessary for launching the image library
        // requestPermission()
        // No permissions request is necessary for launching the image library

        requestPermission();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 0,
            base64: true,
        });


        if (!result.canceled) {
            const fileInfo = await getFileInfo(result?.assets[0]?.uri)
            const isLessThan = isLessThanTheMB(fileInfo.size, 18)
            if (!isLessThan) {
                dispatch(addNotificationItem({
                    id: Math.random(),
                    type: 'error',
                    body:'Image file too large, must be less than 4MB 🤨',
                }))

            } else {

                setImage_id("data:image/jpeg;base64," + result?.assets[0].base64);
                setImageUri(result?.assets[0].uri);
                setFieldValue('image_paper',result?.assets[0].uri);

            }
        }
    };

    const {
        mutate,
        isLoading
    } = useMutation(['send-Ticket-Feedback'], sendTicketFeedback,

        {

            onSuccess: async (data) => {
                // alert(message)
console.log(data)
                if (data.status == 1) {

                    navigation.navigate('SuccessScreen', {
                        title: 'Successful',
                        message: `Feedback sent`,
                        type: 'success',

                    })


                } else {
                    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
                    dispatch(addNotificationItem({
                        id: Math.random(),
                        type: 'error',
                        body: data.error,
                    }))

                }
            },

            onError: (err) => {


            },
            onSettled: () => {
                queryClient.invalidateQueries(['send-Ticket-Feedback']);
            }

        })

    const {
        setFieldValue,
        handleChange, handleSubmit, handleBlur,
        values,
        errors,
        touched,
        isValid
    } = useFormik({
        validationSchema: formSchema,
        initialValues: {
            subject: "",
            message: "",
            image_paper: "",



        },
        onSubmit: (values) => {
            const {subject,message,image_paper} = values
            let type =  imageUri?.substring(image_id.lastIndexOf(".") + 1);
            let fileName = imageUri.split('/').pop()

            const formdata = new FormData()
            formdata.append('content', message)
            formdata.append('title', subject)
            formdata.append('upload', {uri: imageUri, name: fileName, type: `image/${type}`} as any)
            mutate({body:formdata,userId:User_Details.id})

        }
    });



    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#04074E', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >


                <HeaderWithTitle title='Create ticket'
                                 />
                <KeyboardAwareScrollView style={{
                    width: '100%'
                }} contentContainerStyle={styles.scrollView} scrollEnabled showsVerticalScrollIndicator={false}>



                    <View style={styles.welcomeTextWrap}>

                        <Text style={styles.titleText}>
                            Open a ticket
                        </Text>

                        <Text style={styles.subText}>
                          Write your complaint / Feedback here
                        </Text>
                    </View>


                    <View style={styles.authContainer}>

                        <TextInput
                            placeholder="EX: Can't login"
                            keyboardType={"default"}
                            touched={touched.subject}
                            error={touched.subject && errors.subject}
                            onFocus={() => setFocusSubject(true)}
                            onChangeText={(e) => {
                                handleChange('subject')(e);
                                setContentSubject(e);
                            }}

                            onBlur={(e) => {
                                handleBlur('subject')(e);

                                setFocusSubject(false);
                            }}

                            defaultValue={contentSubject}
                            focus={focusSubject}
                            value={values.subject}
                            label="Your ticket title"/>


                        <TextArea
                            keyboardType={"default"}
                            touched={touched.message}
                            error={touched.message && errors.message}
                            onBlur={(e) => {
                                handleBlur('Message')(e);

                                setFocusMessage(false);
                            }}
                            focus={focusMessage}

                            onChangeText={(e) => {
                                handleChange('message')(e);
                                setMessage(e);
                            }}
                            label="Tell us more"
                            placeholder={'Message'} value={values.message}/>



                        <Pressable onPress={selectImagePaper} style={[styles.uploadBox, {

                            borderColor:Colors.borderColor,
                            backgroundColor: Colors.secondary
                        }]}>
                            {
                                values.image_paper !== '' &&
                                <ImageBackground resizeMode='center' source={{uri: values.image_paper}} style={{
                                    height: '100%',

                                    width: '100%',
                                }}/>
                            }
                            <IF condition={values.image_paper == ''}>




                                            <MaterialIcons name="photo-camera" size={34} color={Colors.primary}/>

                                            <Text style={[styles.uploadText, {
                                                marginTop: 5,
                                                color: Colors.tintText
                                            }]}>
                                                Upload Image
                                            </Text>


                            </IF>
                        </Pressable>


                    </View>
<ToastAnimated/>
                </KeyboardAwareScrollView>

                <MyButton onPress={() => handleSubmit()} disabled={!isValid} style={[styles.button, {

                }]}>
                    <LinearGradient style={styles.createBtnGradient}
                                    colors={['#e602df', '#4406b0']}

                                    start={{x: 1, y: 0}}
                                    end={{x: 0.1, y: 0.3,}}

                        // locations={[0.1, 0.7,]}
                    >
                    {
                        isLoading ? <ActivityIndicator size='small' color={"#fff"}/> :

                    <Text style={styles.buttonTxt}>
                        Submit
                    </Text>
                    }
                    </LinearGradient>
                </MyButton>
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
    title: {
        color: Colors.textDark,
        fontSize: fontPixel(18),
        fontFamily: Fonts.faktumBold
    },

    authContainer: {

        width: '90%',
        justifyContent: 'space-between',

        alignItems: 'center',
    },
    welcomeTextWrap: {
        paddingHorizontal: pixelSizeHorizontal(20),
        width: '100%',
        height: heightPixel(100),
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    titleText: {
        fontFamily: Fonts.faktumBold,
        color: Colors.text,
        fontSize: fontPixel(18)
    },

    subText: {
        marginTop: 5,
        fontFamily: Fonts.faktumRegular,
        color: Colors.text,
        fontSize: fontPixel(14),
        lineHeight: heightPixel(22),
    },
    button: {
        width: '80%',
        bottom: 15,
        height: heightPixel(64),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    createBtnGradient:{
        width:'100%',height:'100%', borderRadius:10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTxt: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(18),
        color: "#fff"
    },
    uploadBox: {
        marginVertical: pixelSizeVertical(20),
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'dashed',
        borderRadius: 10,
        paddingHorizontal: pixelSizeHorizontal(10),
        width: '100%',
        height: heightPixel(140)
    },
    uploadText: {
        lineHeight: heightPixel(20),
        textAlign: 'center',
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumRegular
    },

})

export default CreateTicket;
