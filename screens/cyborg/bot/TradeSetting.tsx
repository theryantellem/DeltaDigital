import React, {useCallback, useMemo, useRef, useState} from 'react';

import {Text, View, StyleSheet, Switch, TouchableOpacity} from 'react-native';
import HeaderWithTitle from "../../../components/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {KeyboardAwareFlatList, KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {RootStackScreenProps} from "../../../types";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical} from "../../../helpers/normalize";
import {Fonts} from "../../../constants/Fonts";
import Colors from "../../../constants/Colors";
import {useFormik} from "formik";
import * as yup from "yup";
import TextInput from "../../../components/inputs/TextInput";
import Slider from "@react-native-community/slider";
import {MyButton} from "../../../components/MyButton";
import ReviewScreen from "./ReviewScreen";
import BottomSheet, {BottomSheetBackdrop, BottomSheetFlatList} from "@gorhom/bottom-sheet";
import {
    BottomSheetDefaultBackdropProps
} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import SelectInput from "../../../components/inputs/SelectInput";
import {append} from "react-native-svg/lib/typescript/lib/Matrix2D";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {addNotificationItem, updateBot} from "../../../app/slices/dataSlice";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {botTradeSetting, copyTrade} from "../../../api";
import * as Haptics from "expo-haptics";


const SWITCH_TRACK_COLOR = {
    true: Colors.primary,
    false: Colors.success,
};


const formSchema = yup.object().shape({


    amount: yup.string().required('Amount is required').matches(
        /^[1-9][0-9]*$/,
        "Invalid number type"
    ),

    strategyPeriod: yup.string().required('Strategy Period is required'),

    first_position_drop: yup.string()
        .when('strategyPeriod', {
            is: (val: string) => val == 'Cycle',
            then: (schema) => schema.trim().required('Price Drop is required').matches(
                /^[1-9][0-9]*$/,
                "Invalid number type"
            ),
            otherwise: (schema) => schema.notRequired(),
        }),
    highest_price: yup.string()
        .when('strategyPeriod', {
            is: (val: string) => val == 'Cycle',
            then: (schema) => schema.trim().required('Highest price is required').matches(
                /^[1-9][0-9]*$/,
                "Invalid number type"
            ),
            otherwise: (schema) => schema.notRequired(),
        }),

    marginLimit: yup.string().required('Margin Limit call is required').matches(
        /^[1-9][0-9]*$/,
        "Invalid number type"
    ),
    takeProfit: yup.string().required('Take Profit is required').matches(
        /^[1-9][0-9]*$/,
        "Invalid number type"
    ),

    whole_position_take_profit_callback: yup.string().required('Whole position take profit callback is required').matches(
        /^[1-9][0-9]*$/,
        "Invalid number type"
    ),
    whole_position_stop_loss: yup.string().required('Whole position stop loss is required').matches(
        /^[1-9][0-9]*$/,
        "Invalid number type"
    ),
    buy_in_callback: yup.string().required('Buy in callback is required').matches(
        /^[1-9][0-9]*$/,
        "Invalid number type"
    ),

});

const StrategyPeriod = [
    {
        title: "Cycle",
        id: '1'
    },
    {
        title: "One-Shot",
        id: '2'
    }
]

const DirectionData = [
    {
        title: "Long",
        id: '1'
    },
    {
        title: "Short",
        id: '2'
    }
]


interface itemProps {
    selected: string,
    item: {
        title: string,
        id: string
    },
    action: (value: string, id: string) => void
}

const SelectValue = ({selected, item, action}: itemProps) => (
    <TouchableOpacity onPress={() => action(item.title, item.id)} style={[styles.selectBtn, {
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

const SelectValueDir = ({selected, item, action}: itemProps) => (
    <TouchableOpacity onPress={() => action(item.title, item.id)} style={[styles.selectBtn, {
        borderBottomColor: Colors.borderColor,
    }]}>

        <View style={styles.item}>
            {
                selected === item.title ? <Ionicons name="ios-checkbox" size={14} color={Colors.primary}/>
                    :
                    <MaterialIcons name="check-box-outline-blank" size={14} color={Colors.tintText}/>
            }


            <Text style={styles.itemText}>
                {item.title}
            </Text>


        </View>
    </TouchableOpacity>
)

const TradeSetting = ({navigation}: RootStackScreenProps<'TradeSetting'>) => {

    const dispatch = useAppDispatch()

    const dataSlice  = useAppSelector(state => state.data)
    const {tradeSetting} = dataSlice

    const [direction, setDirection] = useState('Long');


    const [selected, setSelected] = useState('');
    const [amountContent, setAmountContent] = useState('');
    const [focusAmount, setFocusAmount] = useState(false);

    const [takeProfit, setTakeProfit] = useState('');
    const [focusTakeProfit, setFocusTakeProfit] = useState(false);

    const [marginLimitCall, setMarginLimitCall] = useState('');
    const [focusMarginLimitCall, setFocusMarginLimitCall] = useState(false);

    const [value, setValue] = useState(0);

    const [switchToggle, setSwitchToggle] = useState(false);


    const [strategyPeriod, setStrategyPeriod] = useState('Cycle');

    const snapPoints = useMemo(() => ["1%", "65%", "70%"], []);
    const bankSheetRef = useRef<BottomSheet>(null);
    const keyExtractor = useCallback((item) => item.id, [],);
    const handleSnapPress = useCallback((index: number) => {
        bankSheetRef.current?.snapToIndex(index);
    }, []);
    const handleClose = useCallback(() => {
        bankSheetRef.current?.close();
    }, []);




    const directionSheetRef = useRef<BottomSheet>(null);
    const handleSnapPressDirection = useCallback((index: number) => {
        directionSheetRef.current?.snapToIndex(index);
    }, []);
    const handleCloseDirection = useCallback(() => {
        directionSheetRef.current?.close();
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
            amount: '',
            marginLimit: '',
            takeProfit: '',
            direction:'',
            buy_in_callback: '',
            highest_price: '',
            first_position_drop: '',
            strategyPeriod: 'Cycle', //One-Shot
            whole_position_stop_loss: '',
            whole_position_take_profit_callback: '',


        },
        onSubmit: (values) => {
            const {
                amount,
                marginLimit,
                takeProfit,
                buy_in_callback,
                highest_price,
                first_position_drop,
                strategyPeriod, whole_position_stop_loss,
                whole_position_take_profit_callback
            } = values;

            const strategyPeriodShot = strategyPeriod == 'Cycle' ? '0' : '1'
            const strategyPeriodCycle = strategyPeriod == 'Cycle' ? '1' : '0'



            dispatch(updateBot({
                firstbuy_amount:amount,
                double_position:switchToggle ? '2' : '1',
                margin_limit:marginLimit,
                profit_ratio:whole_position_take_profit_callback,
                whole_ratio:'2',
                whole_stop:whole_position_stop_loss,
                price_drop:first_position_drop,
                first_ratio:3,
                cycle:strategyPeriodCycle,
                profit_callback:whole_position_take_profit_callback,
                one_shot:strategyPeriodShot
            }))
            /*
             id: 19201
             firstbuy_amount: 15
             double_position: 1
             margin_limit: 4
             profit_ratio: 1
             whole_ratio: 0
             first_call: 2|2|4|3
             first_ratio: 2|2|4|4
             second_call: 0
             second_ratio: 0
             third_call: 0
             third_ratio: 0
             forth_call: 0
             forth_ratio: 0
             fifth_call: 0
             fifth_ratio: 0
             profit_callback: 0
             cycle: 1
             one_short: 0
             whole_stop:100
             */
            navigation.navigate('ReviewScreen')

        }
    });


    const switchItem = useCallback(async (title: string, id: string) => {
        setSelected(id)
        setStrategyPeriod(title)
        handleClose()
        handleChange('strategyPeriod')(title)
    }, [])

    const switchDir= useCallback(async (title: string) => {
        setDirection(title)
        handleCloseDirection()
        handleChange('direction')(title)
    }, [])


    const renderItem = useCallback(({item}: any) => (
        <SelectValue selected={selected} item={item} action={switchItem}/>
    ), [selected]);


    const renderItemDir = useCallback(({item}: any) => (
        <SelectValueDir selected={direction} item={item} action={switchDir}/>
    ), [direction]);


    return (
        <>

            <SafeAreaView style={styles.safeArea}>
                <LinearGradient style={styles.background}
                                colors={['#4E044B', '#141621',]}

                                start={{x: 2.5, y: 0}}
                                end={{x: 1.5, y: 0.8,}}
                    // locations={[0.1, 0.7,]}

                >


                    <HeaderWithTitle title='Trade setting'/>
                    <KeyboardAwareScrollView style={{
                        width: '100%'
                    }} contentContainerStyle={styles.scrollView} scrollEnabled
                                             showsVerticalScrollIndicator={false}>

                        <View style={styles.planInfo}>

                            <View style={styles.planMessage}>
                                <Text style={styles.planMessageTxt}>
                                    The first buy-in amount is calculated according to the currency pair, principle and
                                    trade unit
                                </Text>
                            </View>
                        </View>

                        <View style={styles.authContainer}>

                            <TextInput

                                placeholder="Enter amount"
                                keyboardType={"number-pad"}
                                touched={touched.amount}
                                error={touched.amount && errors.amount}
                                onFocus={() => setFocusAmount(true)}
                                onChangeText={(e) => {
                                    handleChange('amount')(e);
                                    setAmountContent(e);
                                }}

                                onBlur={(e) => {
                                    handleBlur('amount')(e);

                                    setFocusAmount(false);
                                }}
                                defaultValue={amountContent}
                                focus={focusAmount}
                                value={values.amount}
                                label="First buy in amount"/>


                            <View style={styles.switchWrap}>
                                <Text style={styles.label}>
                                    Open position doubled
                                </Text>
                                <Switch
                                    style={{}}
                                    trackColor={SWITCH_TRACK_COLOR}
                                    thumbColor={switchToggle ? "#fff" : Colors.secondary}
                                    ios_backgroundColor={Colors.tintSuccess}
                                    onValueChange={(toggled) => {
                                        //setEnableNow(toggled)
                                        setSwitchToggle(toggled)
                                        // toggle(toggled)

                                    }}
                                    value={switchToggle}
                                />
                            </View>


                            <TextInput

                                placeholder="Margin call limit"
                                keyboardType={"number-pad"}
                                touched={touched.marginLimit}
                                error={touched.marginLimit && errors.marginLimit}
                                onFocus={() => setFocusMarginLimitCall(true)}
                                onChangeText={(e) => {
                                    handleChange('marginLimit')(e);
                                    setMarginLimitCall(e);
                                }}

                                onBlur={(e) => {
                                    handleBlur('marginLimit')(e);

                                    setFocusMarginLimitCall(false);
                                }}

                                focus={focusMarginLimitCall}
                                defaultValue={marginLimitCall}
                                value={values.marginLimit}
                                label="Margin call limit"/>


                            <TextInput

                                placeholder="Take profit ratio"
                                keyboardType={"number-pad"}
                                touched={touched.takeProfit}
                                error={touched.takeProfit && errors.takeProfit}
                                onFocus={() => setFocusTakeProfit(true)}
                                onChangeText={(e) => {
                                    handleChange('takeProfit')(e);
                                    setTakeProfit(e);
                                }}

                                onBlur={(e) => {
                                    handleBlur('takeProfit')(e);

                                    setFocusTakeProfit(false);
                                }}

                                focus={focusTakeProfit}
                                defaultValue={takeProfit}
                                value={values.takeProfit}
                                label="Whole position take profit ratio"/>





                            <TextInput

                                placeholder="Stop loss"
                                keyboardType={"number-pad"}
                                touched={touched.whole_position_stop_loss}
                                error={touched.whole_position_stop_loss && errors.whole_position_stop_loss}

                                onChangeText={(e) => {
                                    handleChange('whole_position_stop_loss')(e);

                                }}

                                onBlur={(e) => {
                                    handleBlur('whole_position_stop_loss')(e);


                                }}

                                value={values.whole_position_stop_loss}
                                label="Whole position stop loss"/>


                            <TextInput

                                placeholder="0"
                                keyboardType={"number-pad"}
                                touched={touched.whole_position_take_profit_callback}
                                error={touched.whole_position_take_profit_callback && errors.whole_position_take_profit_callback}

                                onChangeText={(e) => {
                                    handleChange('whole_position_take_profit_callback')(e);
                                    setTakeProfit(e);
                                }}

                                onBlur={(e) => {
                                    handleBlur('whole_position_take_profit_callback')(e);

                                }}

                                value={values.whole_position_take_profit_callback}
                                label="Whole position take profit callback"/>

                            <TextInput

                                placeholder="0"
                                keyboardType={"number-pad"}
                                touched={touched.buy_in_callback}
                                error={touched.buy_in_callback && errors.buy_in_callback}

                                onChangeText={(e) => {
                                    handleChange('buy_in_callback')(e);
                                    setTakeProfit(e);
                                }}

                                onBlur={(e) => {
                                    handleBlur('buy_in_callback')(e);

                                }}

                                value={values.buy_in_callback}
                                label="Buy in callback"/>

                            <SelectInput
                                editable={false}
                                action={() => handleSnapPress(1)}
                                label='Strategy period'
                                autoCapitalize='none'
                                keyboardType='default'
                                returnKeyType='next'
                                returnKeyLabel='next'

                                onChangeText={(e) => {
                                    setStrategyPeriod(e)
                                }}
                                defaultValue={strategyPeriod}
                                icon='chevron-down'
                                value={values.strategyPeriod}
                                Btn={true}
                            />

                            {
                                tradeSetting.trade_type == '1'
                                &&

                            <SelectInput
                                editable={false}
                                action={() => handleSnapPressDirection(1)}
                                label='Direction'
                                autoCapitalize='none'
                                keyboardType='default'
                                returnKeyType='next'
                                returnKeyLabel='next'

                                onChangeText={(e) => {
                                    setDirection(e)
                                }}
                                defaultValue={direction}
                                icon='chevron-down'
                                value={values.direction}
                                Btn={true}
                            />
                            }

                            {
                                strategyPeriod == 'Cycle' &&


                                <>

                                    <TextInput

                                        placeholder="0"
                                        keyboardType={"number-pad"}
                                        touched={touched.highest_price}
                                        error={touched.highest_price && errors.highest_price}

                                        onChangeText={(e) => {
                                            handleChange('highest_price')(e);
                                            setTakeProfit(e);
                                        }}

                                        onBlur={(e) => {
                                            handleBlur('highest_price')(e);

                                        }}

                                        value={values.highest_price}
                                        label="Highest price"/>


                                    <TextInput

                                        placeholder="0"
                                        keyboardType={"number-pad"}
                                        touched={touched.first_position_drop}
                                        error={touched.first_position_drop && errors.first_position_drop}

                                        onChangeText={(e) => {
                                            handleChange('first_position_drop')(e);
                                            setTakeProfit(e);
                                        }}

                                        onBlur={(e) => {
                                            handleBlur('first_position_drop')(e);

                                        }}

                                        value={values.first_position_drop}
                                        label="First position drop"/>

                                </>

                            }
                        </View>


                    </KeyboardAwareScrollView>

                    <MyButton onPress={() => handleSubmit()} disabled={!isValid} style={[styles.button, {
                        backgroundColor: !isValid ? Colors.border : Colors.primary
                    }]}>
                        <Text style={styles.buttonTxt}>
                            Continue
                        </Text>
                    </MyButton>

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


                <BottomSheetFlatList data={StrategyPeriod}
                                     renderItem={renderItem}
                                     keyExtractor={keyExtractor}
                                     contentContainerStyle={styles.flatList}
                                     showsVerticalScrollIndicator={false}/>

            </BottomSheet>




            <BottomSheet

                index={0}
                ref={directionSheetRef}
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
                        Direction
                    </Text>

                    <TouchableOpacity onPress={handleCloseDirection} style={[styles.dismiss, {
                        backgroundColor: Colors.textDark,


                    }]}>
                        <Ionicons name="close-sharp" size={20} color={Colors.text}/>
                    </TouchableOpacity>

                </View>


                <BottomSheetFlatList data={DirectionData}
                                     renderItem={renderItemDir}
                                     keyExtractor={keyExtractor}
                                     contentContainerStyle={styles.flatList}
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
        alignItems: "center"
    },
    scrollView: {
        width: '100%',
        alignItems: "center"
    },
    planInfo: {
        width: '100%',
        paddingHorizontal: pixelSizeHorizontal(20),
        height: heightPixel(70),
        alignItems: 'flex-start',
        justifyContent: 'flex-start',

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
    authContainer: {
        marginTop: 20,
        minHeight: heightPixel(300),
        justifyContent: 'flex-start',
        width: '90%',
        alignItems: 'center',
    },
    switchWrap: {
        marginBottom: 25,
        width: '100%',
        height: 65,
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    label: {
        color: Colors.text,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumMedium,
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
    flatList: {
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
})

export default TradeSetting;
