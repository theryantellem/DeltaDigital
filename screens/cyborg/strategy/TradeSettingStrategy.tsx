import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {Text, View, StyleSheet, Switch, TouchableOpacity, ActivityIndicator} from 'react-native';
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
import {Ionicons, MaterialIcons, Octicons} from "@expo/vector-icons";
import SelectInput from "../../../components/inputs/SelectInput";
import {append} from "react-native-svg/lib/typescript/lib/Matrix2D";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {addNotificationItem, clearTradeSetting, updateBot, updateBotSetting} from "../../../app/slices/dataSlice";
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
    /*
        first_position_drop: yup.string()
            .when('strategyPeriod', {
                is: (val: string) => val == 'Cycle',
                then: (schema) => schema.trim().required('Price Drop is required').matches(
                    /^[1-9][0-9]*$/,
                    "Invalid number type"
                ),
                otherwise: (schema) => schema.notRequired(),
            }),*/
    /*highest_price: yup.string()
        .when('strategyPeriod', {
            is: (val: string) => val == 'Cycle',
            then: (schema) => schema.trim().required('Highest price is required').matches(
                /^[1-9][0-9]*$/,
                "Invalid number type"
            ),
            otherwise: (schema) => schema.notRequired(),
        }),*/

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
    whole_ratio: yup.string().required('Whole ratio is required').matches(
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

const TradeSettingStrategy = ({navigation, route}: RootStackScreenProps<'TradeSettingStrategy'>) => {

    const {id, dataLogs} = route.params
    const dispatch = useAppDispatch()
    const queryClient = useQueryClient()
    //console.log(dataLogs['whole position take profit'])

    const dataSlice = useAppSelector(state => state.data)
    const {logTradeSetting} = dataSlice

    const user = useAppSelector(state => state.user)
    const {User_Details} = user

    const [direction, setDirection] = useState('Long');


    const [selected, setSelected] = useState('');
    const [amountContent, setAmountContent] = useState(dataLogs.firstbuyinamount);
    const [focusAmount, setFocusAmount] = useState(false);

    const [takeProfit, setTakeProfit] = useState(dataLogs.take_profit_ratio);
    const [focusTakeProfit, setFocusTakeProfit] = useState(false);

    const [marginLimitCall, setMarginLimitCall] = useState(dataLogs.margin_call_limit);
    const [focusMarginLimitCall, setFocusMarginLimitCall] = useState(false);

    const [whole_stop, setWhole_stop] = useState(dataLogs.stopprice);
    const [focusWhole_stop, setFocusWhole_stop] = useState(false);


    const [whole_ratio, setWhole_ratio] = useState(dataLogs.buyin_callback);
    const [focusWhole_ratio, setFocusWhole_ratio] = useState(false);


    const [whole_position_take_profit_callback, setWhole_position_take_profit_callback] = useState(dataLogs['whole position take profit']);
    const [focusWhole_position_take_profit_callback, setFocusWhole_position_take_profit_callback] = useState(false);


    const [stop_loss, setStop_loss] = useState(dataLogs.stop_loss)
    const [price_above, setPrice_above] = useState(dataLogs.price_above)
    const [re_capital, setRe_capital] = useState(dataLogs.re_capital)
    const [price_below, setPrice_below] = useState(dataLogs.price_below)
    const [closing_price, setClosing_price] = useState(dataLogs.closing_price)
    const [entry_call, setEntry_call] = useState(dataLogs.entry_call)

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


    const {mutate, isLoading, isSuccess, error} = useMutation(['bot-Trade-Setting'], botTradeSetting,

        {

            onSuccess: async (data) => {
                // alert(message)

                if (data.status == 1) {
                    /*  navigation.navigate('BotSuccess', {
                          amount: amountContent,
                          market: dataLogs.Market,
                      })*/
                    dispatch(clearTradeSetting())
                    navigation.navigate('SuccessScreen', {
                        title: 'Successful',
                        message: 'Trading Bot Setting Updated',
                        type: 'success'
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

                console.log(err)
            },
            onSettled: () => {
                queryClient.invalidateQueries(['bot-Trade-Setting']);
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
            amount: amountContent,
            marginLimit: marginLimitCall,
            takeProfit: takeProfit,
            direction: '',
            whole_ratio: whole_ratio,
            highest_price: '',
            first_position_drop: '',
            strategyPeriod: 'Cycle', //One-Shot
            whole_position_stop_loss: whole_stop,
            whole_position_take_profit_callback: whole_position_take_profit_callback,

            stop_loss: stop_loss,
            price_above: price_above,
            price_below: price_below,
            re_capital: re_capital,
            closing_price: closing_price,
            entry_call: entry_call,


        },
        onSubmit: (values) => {
            const {
                direction,
                amount,
                marginLimit,
                takeProfit,
                whole_ratio,
                highest_price,
                first_position_drop,
                strategyPeriod, whole_position_stop_loss,
                whole_position_take_profit_callback,

                stop_loss,
                price_above,
                price_below,
                re_capital,
                closing_price,
                entry_call
            } = values;

            const strategyPeriodShot = strategyPeriod == 'Cycle' ? '0' : '1'
            const strategyPeriodCycle = strategyPeriod == 'Cycle' ? '1' : '0'

            if (logTradeSetting.m_ratio !== '' && logTradeSetting.price_drop !== '') {


                dispatch(updateBot({

                    // first_ratio: first_position_drop,

                    profit_callback: whole_position_take_profit_callback,
                    direction,

                }))

                const formData = new FormData()
                formData.append('firstbuy_amount', amount)
                formData.append('double_position', switchToggle ? '1' : '0',)
                formData.append('margin_limit', marginLimit)
                formData.append('profit_ratio', takeProfit)
                formData.append('whole_ratio', whole_ratio)
                formData.append('whole_stop', whole_position_stop_loss)

                formData.append('first_call', logTradeSetting.price_drop)
                formData.append('first_ratio', logTradeSetting.m_ratio)
                formData.append('cycle', strategyPeriodCycle)
                formData.append('profit_callback', whole_position_take_profit_callback)
                formData.append('one_short', strategyPeriodShot)


                formData.append('trade_type', dataLogs.trade_type)
                formData.append('stop_loss', stop_loss)
                formData.append('price_above', price_above)
                formData.append('capital', re_capital)
                formData.append('closing_price', closing_price)
                formData.append('price_below', price_below)
                formData.append('entry_call', entry_call)
                // formData.append('trade_type', tradeSetting.trade_type)
                formData.append('market', dataLogs.Market)
                formData.append('id', id)

                mutate({body: formData, userId: User_Details.id})

            } else {
                dispatch(addNotificationItem({
                    id: Math.random(),
                    type: 'error',
                    body: 'Margin configuration is missing.'
                }))
            }

        }

    });


    const switchItem = useCallback(async (title: string, id: string) => {
        setSelected(id)
        setStrategyPeriod(title)
        handleClose()
        handleChange('strategyPeriod')(title)
    }, [])

    const switchDir = useCallback(async (title: string) => {
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

    const marginConfig = () => {
        dispatch(updateBot({

            margin_limit: marginLimitCall,
        }))
        navigation.navigate('LogsMarginConfiguration', {
            numrows: parseInt(marginLimitCall),
            price_drop: dataLogs["Price drop"].join('|'),
            m_ratio: dataLogs["Martingale ratio"].join('|')
        })
    }


    useEffect(() => {
        dispatch(updateBotSetting({
            price_drop: dataLogs["Price drop"].join('|'),
            m_ratio: dataLogs["Martingale ratio"].join('|'),

        }))
    }, []);


    const clearData = () => {
        dispatch(clearTradeSetting())
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


                    <HeaderWithTitle title={`Trade setting`} clearData={clearData}/>
                    <KeyboardAwareScrollView style={{
                        width: '100%'
                    }} contentContainerStyle={styles.scrollView} scrollEnabled
                                             showsVerticalScrollIndicator={false}>

                        <View style={styles.planInfo}>

                            <View style={styles.planMessage}>
                                <Text style={styles.planMessageTxt}>
                                    The first buy-in amount is calculated according to the currency pair, principle and
                                    trade unit {dataLogs.Market}
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
                            {
                                marginLimitCall &&

                                <TouchableOpacity style={styles.margingConfig} onPress={marginConfig}>
                                    <Text style={styles.margingConfigText}>
                                        Margin configuration
                                    </Text>

                                    <Octicons name="chevron-right" size={24} color="#fff"/>
                                </TouchableOpacity>

                            }
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

                                placeholder="0"
                                keyboardType={"number-pad"}
                                touched={touched.whole_position_stop_loss}
                                error={touched.whole_position_stop_loss && errors.whole_position_stop_loss}

                                onChangeText={(e) => {
                                    handleChange('whole_position_stop_loss')(e);
                                    setWhole_stop(e)
                                }}
                                onFocus={() => setFocusWhole_stop(true)}

                                onBlur={(e) => {
                                    handleBlur('whole_position_stop_loss')(e);
                                    setFocusWhole_stop(false);

                                }}
                                defaultValue={whole_stop}
                                focus={focusWhole_stop}
                                value={values.whole_position_stop_loss}
                                label="Whole position stop loss"/>


                            <TextInput

                                placeholder="0"
                                keyboardType={"number-pad"}
                                touched={touched.whole_position_take_profit_callback}
                                error={touched.whole_position_take_profit_callback && errors.whole_position_take_profit_callback}
                                onFocus={() => setFocusWhole_position_take_profit_callback(true)}
                                onChangeText={(e) => {
                                    handleChange('whole_position_take_profit_callback')(e);
                                    setWhole_position_take_profit_callback(e);
                                }}

                                onBlur={(e) => {
                                    handleBlur('whole_position_take_profit_callback')(e);
                                    setFocusWhole_position_take_profit_callback(false);
                                }}
                                defaultValue={whole_position_take_profit_callback}
                                focus={focusWhole_position_take_profit_callback}
                                value={values.whole_position_take_profit_callback}
                                label="Whole position take profit callback"/>

                            <TextInput

                                placeholder="0"
                                keyboardType={"number-pad"}
                                touched={touched.whole_ratio}
                                error={touched.whole_ratio && errors.whole_ratio}
                                onFocus={() => setFocusWhole_ratio(true)}
                                onChangeText={(e) => {
                                    handleChange('whole_ratio')(e);
                                    setWhole_ratio(e);
                                }}

                                onBlur={(e) => {
                                    handleBlur('whole_ratio')(e);
                                    setFocusWhole_ratio(false);
                                }}
                                focus={focusWhole_ratio}
                                defaultValue={whole_ratio}
                                value={values.whole_ratio}
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
                                dataLogs.trade_type == '1'
                                &&
                                <TextInput

                                    placeholder="0"
                                    keyboardType={"number-pad"}
                                    touched={touched.stop_loss}
                                    error={touched.stop_loss && errors.stop_loss}

                                    onChangeText={(e) => {
                                        handleChange('stop_loss')(e);
                                        setStop_loss(e);

                                    }}
                                    value={values.stop_loss}
                                    defaultValue={stop_loss}
                                    label="Stop loss"/>


                            }
                            {
                                dataLogs.trade_type == '1'
                                &&
                                <TextInput

                                    placeholder="0"
                                    keyboardType={"number-pad"}
                                    touched={touched.price_above}
                                    error={touched.price_above && errors.price_above}

                                    onChangeText={(e) => {
                                        handleChange('price_above')(e);
                                        setPrice_above(e)
                                    }}
                                    value={values.price_above}
                                    defaultValue={price_above}
                                    label="Price above"/>


                            }
                            {
                                dataLogs.trade_type == '1'
                                &&
                                <TextInput

                                    placeholder="0"
                                    keyboardType={"number-pad"}
                                    touched={touched.price_below}
                                    error={touched.price_below && errors.price_below}

                                    onChangeText={(e) => {
                                        handleChange('price_below')(e);
                                        setPrice_above(price_below)
                                    }}
                                    defaultValue={price_below}
                                    value={values.price_below}
                                    label="Price below"/>


                            }
                            {
                                dataLogs.trade_type == '1'
                                &&
                                <TextInput

                                    placeholder="0"
                                    keyboardType={"number-pad"}
                                    touched={touched.re_capital}
                                    error={touched.re_capital && errors.re_capital}

                                    onChangeText={(e) => {
                                        handleChange('re_capital')(e);
setRe_capital(e)
                                    }}
                                    defaultValue={re_capital}
                                    value={values.re_capital}
                                    label="Capital"/>


                            }

                            {
                                dataLogs.trade_type == '1'
                                &&
                                <TextInput

                                    placeholder="0"
                                    keyboardType={"number-pad"}
                                    touched={touched.closing_price}
                                    error={touched.closing_price && errors.closing_price}

                                    onChangeText={(e) => {
                                        handleChange('closing_price')(e);
setClosing_price(e)
                                    }}
                                    defaultValue={closing_price}
                                    value={values.closing_price}
                                    label="Closing price"/>


                            }
                            {
                                dataLogs.trade_type == '1'
                                &&
                                <TextInput

                                    placeholder="0"
                                    keyboardType={"number-pad"}
                                    touched={touched.entry_call}
                                    error={touched.entry_call && errors.entry_call}

                                    onChangeText={(e) => {
                                        handleChange('entry_call')(e);
setEntry_call(e)
                                    }}
                                    defaultValue={entry_call}
                                    value={values.entry_call}
                                    label="Entry call"/>


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
                                        label="Highest price (optional)"/>


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
                                        label="First position drop (optional)"/>

                                </>

                            }
                        </View>


                    </KeyboardAwareScrollView>

                    <MyButton onPress={() => handleSubmit()} disabled={!isValid} style={[styles.button, {
                        // backgroundColor: !isValid ? Colors.border : Colors.primary
                    }]}>
                        <LinearGradient style={styles.createBtnGradient}
                                        colors={[isValid ? '#e602df' : '#ccc', isValid ? '#4406b0' : Colors.secondary]}

                                        start={{x: 1, y: 0}}
                                        end={{x: 0.1, y: 0.3,}}

                            // locations={[0.1, 0.7,]}
                        >
                            {
                                isLoading && <ActivityIndicator size='small' color={"#fff"}/>
                            }

                            {
                                !isLoading &&

                                <Text style={styles.buttonTxt}>
                                    Update
                                </Text>
                            }

                        </LinearGradient>
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
        width: '90%',
        marginTop: 10,
    },
    planMessageTxt: {
        lineHeight: 20,
        color: Colors.tintText,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumMedium
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


    marginConfigDataText: {

        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumBold,
        color: Colors.text
    },

    addMarginButton: {
        width: 55,
        height: 55,
        borderRadius: 35,
        backgroundColor: Colors.purplePrimary,
        alignItems: 'center',
        justifyContent: 'center',

    },
    btnText: {
        textAlign: 'center',
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumBold,
        color: Colors.text
    },

    margingConfig: {
        width: '100%',
        marginBottom: 25,
        borderRadius: 10,
        height: 55,
        backgroundColor: Colors.secondary,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: pixelSizeHorizontal(20),
    },
    margingConfigText: {

        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumBold,
        color: Colors.text
    }

})

export default TradeSettingStrategy;
