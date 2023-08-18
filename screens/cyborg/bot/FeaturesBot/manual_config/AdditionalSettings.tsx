import React, {useCallback, useMemo, useRef, useState} from 'react';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {RootStackScreenProps} from "../../../../../types";
import * as yup from "yup";
import HeaderWithTitle from "../../../../../components/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import BottomSheet, {BottomSheetBackdrop, BottomSheetFlatList} from "@gorhom/bottom-sheet";
import {
    BottomSheetDefaultBackdropProps
} from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import {useFormik} from "formik";
import {updateBotManualConfig} from "../../../../../app/slices/dataSlice";
import TextInput from "../../../../../components/inputs/TextInput";
import SelectInput from "../../../../../components/inputs/SelectInput";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical} from "../../../../../helpers/normalize";
import Colors from "../../../../../constants/Colors";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import {Fonts} from "../../../../../constants/Fonts";
import HorizontalLine from "../../../../../components/HorizontalLine";
import {MyButton} from "../../../../../components/MyButton";
import {useAppDispatch} from "../../../../../app/hooks";
import FinalPreview from "../FinalPreview";


const formSchema = () => yup.object().shape({
    riskPreference: yup.string().required('Risk Preference is required'),
    leverage: yup.string().required('Leverage period is required').matches(
        /^[1-9][0-9]*$/,
        "Invalid number type"
    ),
    tradeExitStrategy: yup.string().required('Trade Exit Strategy is required').matches(
        /^[1-9][0-9]*$/,
        "Invalid number type"
    ),

    tradeEntry: yup.string().required('Trade Entry is required').matches(
        /^[1-9][0-9]*$/,
        "Invalid number type"
    ),
    leastPrice: yup.string().required('This field is required').matches(
        /^[1-9][0-9]*$/,
        "Invalid number type"
    ),


    stopLoss: yup.string()
        .when('riskPreference', {
            is: (val: string) => val == 'Conservative',
            then: (schema) => schema.trim().required('Stop loss is required').matches(
                /^[1-9][0-9]*$/,
                "Invalid number type"
            ),
            otherwise: (schema) => schema.notRequired(),
        })


})


const RiskPreferenceData = [
    {
        title: "Relaxed (no stop loss)",
        value: "Relaxed",
        id: '1'
    },
    {
        title: "Conservative (with stop loss)",
        value: "Conservative",
        id: '2'
    },
]

interface itemProps {
    selected: string,
    item: {
        title: string,
        id: string
        value: string
    },
    action: (value: string, id: string) => void
}


const SelectValue = ({selected, item, action}: itemProps) => (
    <TouchableOpacity onPress={() => action(item.value, item.id)} style={[styles.selectBtn, {
        borderBottomColor: Colors.borderColor,
    }]}>

        <View style={styles.item}>
            {
                selected === item.id ? <Ionicons name="ios-checkbox" size={14} color={Colors.primary}/>
                    :
                    <MaterialIcons name="check-box-outline-blank" size={14} color={Colors.tintText}/>
            }


            <Text style={styles.itemText}>
                {item.title}
            </Text>


        </View>
    </TouchableOpacity>
)


const AdditionalSettings = ({navigation}: RootStackScreenProps<'AdditionalSettings'>) => {

    const dispatch = useAppDispatch()
    const [riskPreference, setRiskPreference] = useState('Conservative')
    const [riskPreferenceId, setRiskPreferenceId] = useState('')

    const [focusLeverage, setFocusLeverage] = useState(false);
    const [focusExitStrategy, setFocusExitStrategy] = useState(false);
    const [focusStopLoss, setFocusStopLoss] = useState(false);

    const snapPoints = useMemo(() => ["1%", "65%", "70%"], []);
    const bankSheetRef = useRef<BottomSheet>(null);
    const keyExtractor = useCallback((item: { id: any; }) => item.id, [],);
    const handleSnapPress = useCallback((index: number) => {
        bankSheetRef.current?.snapToIndex(index);
    }, []);
    const handleClose = useCallback(() => {
        bankSheetRef.current?.close();
    }, []);

    const renderBackdrop = useCallback(
        (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
            <BottomSheetBackdrop
                style={{
                    backgroundColor: 'rgba(25,25,25,0.34)'
                }}
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

            riskPreference: 'Conservative',
            leverage: '',
            tradeExitStrategy: '',
            tradeEntry: '',
            leastPrice: '',
            stopLoss: ''

        },
        onSubmit: (values) => {
            const {riskPreference,
                leverage,
                tradeExitStrategy,
                tradeEntry,
                leastPrice,
                stopLoss} = values

            dispatch(updateBotManualConfig({
                riskPreference,
                leverage,
                tradeExitStrategy,
                tradeEntry,
                leastPrice,
                stopLoss
            }))
             navigation.navigate('FinalPreview')

        }
    });


    const switchItem = useCallback(async (name: string, id: string) => {
        setRiskPreferenceId(id)
        setRiskPreference(name)
        setFieldValue('riskPreference', name)
        handleClose()

    }, [])


    const renderItem = useCallback(({item}: any) => (
        <SelectValue selected={riskPreferenceId} item={item} action={switchItem}/>
    ), [riskPreferenceId]);


    return (
        <>

            <SafeAreaView style={styles.safeArea}>
                <LinearGradient style={styles.background}
                                colors={['#4E044B', '#141621',]}

                                start={{x: 2.5, y: 0}}
                                end={{x: 1.5, y: 0.8,}}
                    // locations={[0.1, 0.7,]}


                >
                    <KeyboardAwareScrollView style={{
                        width: '100%'
                    }} contentContainerStyle={styles.scrollView} scrollEnabled
                                             showsVerticalScrollIndicator={false}>


                        <HeaderWithTitle title='Additional Settings' step currentStep={'3'} totalStep={'4'}/>
                        <View style={styles.authContainer}>


                            <View style={styles.selectView}>
                                <SelectInput
                                    editable={false}
                                    action={() => handleSnapPress(1)}
                                    label='Risk Preference'
                                    error={errors.riskPreference}
                                    autoCapitalize='none'
                                    keyboardType='default'
                                    returnKeyType='next'
                                    returnKeyLabel='next'
                                    placeholder=""
                                    onChangeText={(e) => {
                                        //  setIDType(e)
                                    }}

                                    icon='chevron-down'
                                    defaultValue={riskPreference}
                                    value={values.riskPreference}
                                    Btn={true}
                                />
                            </View>
                            <TextInput

                                placeholder="1"
                                keyboardType={"number-pad"}
                                touched={touched.leverage}
                                error={touched.leverage && errors.leverage}
                                onFocus={() => setFocusLeverage(true)}
                                onChangeText={(e) => {
                                    handleChange('leverage')(e);

                                }}

                                onBlur={(e) => {
                                    handleBlur('leverage')(e);

                                    setFocusLeverage(false);
                                }}

                                focus={focusLeverage}
                                value={values.leverage}
                                label="Leverage"/>


                            <View style={styles.labelWrap}>
                                <Text style={styles.label}>
                                    Trade Exit Strategy
                                </Text>
                            </View>
                            <HorizontalLine margin={5}/>
                            <TextInput

                                placeholder="1"
                                keyboardType={"number-pad"}
                                touched={touched.tradeExitStrategy}
                                error={touched.tradeExitStrategy && errors.tradeExitStrategy}
                                onFocus={() => setFocusExitStrategy(true)}
                                onChangeText={(e) => {
                                    handleChange('tradeExitStrategy')(e);

                                }}

                                onBlur={(e) => {
                                    handleBlur('tradeExitStrategy')(e);

                                    setFocusExitStrategy(false);
                                }}

                                focus={focusExitStrategy}
                                value={values.tradeExitStrategy}
                                label="Exit For Win When You Make(%)"/>
                            {

                                riskPreference === 'Conservative' &&


                                <TextInput

                                    placeholder="+0%"
                                    keyboardType={"number-pad"}
                                    touched={touched.stopLoss}
                                    error={touched.stopLoss && errors.stopLoss}
                                    onFocus={() => setFocusStopLoss(true)}
                                    onChangeText={(e) => {
                                        handleChange('stopLoss')(e);

                                    }}

                                    onBlur={(e) => {
                                        handleBlur('stopLoss')(e);

                                        setFocusStopLoss(false);
                                    }}

                                    focus={focusStopLoss}
                                    value={values.stopLoss}
                                    label="Stop Loss(%)"/>

                            }


                            <View style={styles.labelWrap}>
                                <Text style={styles.label}>
                                    Trade Re-Entry Settings
                                </Text>
                            </View>
                            <HorizontalLine margin={5}/>
                            <TextInput

                                placeholder="1"
                                keyboardType={"number-pad"}
                                touched={touched.tradeEntry}
                                error={touched.tradeEntry && errors.tradeEntry}

                                onChangeText={(e) => {
                                    handleChange('tradeEntry')(e);

                                }}

                                onBlur={(e) => {
                                    handleBlur('tradeEntry')(e);

                                }}


                                value={values.tradeEntry}
                                label="If Price Is Above"/>

                            <TextInput

                                placeholder="1"
                                keyboardType={"number-pad"}
                                touched={touched.leastPrice}
                                error={touched.leastPrice && errors.leastPrice}

                                onChangeText={(e) => {
                                    handleChange('leastPrice')(e);

                                }}

                                onBlur={(e) => {
                                    handleBlur('leastPrice')(e);


                                }}


                                value={values.leastPrice}
                                label="If Price Is Below"/>


                        </View>


                        <MyButton onPress={() => handleSubmit()} disabled={!isValid} style={[styles.button, {
                            backgroundColor: !isValid ? Colors.border : Colors.primary
                        }]}>
                            <Text style={styles.buttonTxt}>
                                Continue
                            </Text>
                        </MyButton>
                    </KeyboardAwareScrollView>
                </LinearGradient>
            </SafeAreaView>


            <BottomSheet

                index={0}
                ref={bankSheetRef}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                backgroundStyle={{
                    backgroundColor: Colors.dark.background,
                }}
                handleIndicatorStyle={{backgroundColor: "#fff"}}
            >
                <View style={styles.sheetHead}>

                    <View style={{
                        width: '5%'
                    }}/>

                    <Text style={styles.sheetTitle}>
                        Strategy period
                    </Text>

                    <TouchableOpacity onPress={handleClose} style={[styles.dismiss, {
                        backgroundColor: Colors.textDark,


                    }]}>
                        <Ionicons name="close-sharp" size={20} color={Colors.text}/>
                    </TouchableOpacity>

                </View>


                <BottomSheetFlatList data={RiskPreferenceData}
                                     renderItem={renderItem}
                                     keyExtractor={keyExtractor}
                                     contentContainerStyle={styles.flatListSheet}
                                     showsVerticalScrollIndicator={false}/>

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

    },
    scrollView: {

        width: '100%',
        alignItems: "center"
    },
    authContainer: {
        marginTop: 30,

        justifyContent: 'space-evenly',
        width: '90%',
        alignItems: 'center',
    },
    selectView: {
        width: '100%',
        height: heightPixel(110),
        marginVertical: pixelSizeHorizontal(10),
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
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.10,
        shadowRadius: 7.22,

        elevation: 3,
    },
    labelWrap: {
        width: '100%',
        alignItems: 'flex-start',
        marginBottom: 5,
    },
    label: {
        color: Colors.text,
        fontSize: fontPixel(18),
        fontFamily: Fonts.faktumBold,
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

})

export default AdditionalSettings;
