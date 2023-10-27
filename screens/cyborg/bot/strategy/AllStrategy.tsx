import React, {SetStateAction, useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    RefreshControl,
    Pressable, Keyboard, Platform
} from 'react-native';
import {CyborgStackScreenProps, RootStackScreenProps} from "../../../../types";
import HeaderWithTitle from "../../../../components/cyborg/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical} from "../../../../helpers/normalize";
import Colors from "../../../../constants/Colors";
import {Fonts} from "../../../../constants/Fonts";
import SearchInput from "../../../../components/inputs/SearchInput";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {copyTrade, getStrategies, loginUser} from "../../../../api";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {FlashList} from "@shopify/flash-list";
import {useRefreshOnFocus, wait} from "../../../../helpers";
import {Ionicons, Octicons} from "@expo/vector-icons";
import BottomSheet, {BottomSheetBackdrop} from "@gorhom/bottom-sheet";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import BottomSheetTextInput from "../../../../components/inputs/BottomSheetTextInput";
import {useFormik} from "formik";
import * as yup from "yup";
import {
    BottomSheetDefaultBackdropProps
} from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import {MyButton} from "../../../../components/MyButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {letUserIn, setLockUser, setUserLastSession} from "../../../../app/slices/userSlice";
import * as SecureStore from "expo-secure-store";
import * as Haptics from "expo-haptics";
import {addNotificationItem} from "../../../../app/slices/dataSlice";
import ToastAnimated from "../../../../components/toast";
import GradientSegmentControl from "../../../../components/segment-control/GradientSegmentControl";
import SegmentedControl from "../../../../components/segment-control/SegmentContol";
import {IF} from "../../../../helpers/ConditionJsx";


interface props {
    view: (id: string, Market: string) => void,
    item: {
        Market: string,
        icon: string,
        id: string,
        trade_type: string,
        direction: string,
    }
}


const formSchema = yup.object().shape({

    capital: yup.number().required('Capital is required')
        .min(15, 'Amount must be at least $15')
        .required('Amount is required'),


});

const ItemData = ({view, item}: props) => {
    return (
        <TouchableOpacity onPress={() => view(item.id, item.Market)} style={styles.walletCard} activeOpacity={0.9}>
            <View style={styles.logoCircle}>

                <Image style={styles.logo}
                       source={{uri: `https://backend.deltacyborg.pro/Upload/coin/${item.icon}`}}/>


            </View>


            <View style={styles.walletCardBody}>
                <Text style={styles.cardTitle}>
                    {item.Market}
                </Text>


                <View style={[styles.tagWrap, {
                    marginTop: 8,
                }]}>
                    <Text style={[styles.tagText, {
                        color: Colors.pendingYellow
                    }]}>

                        {item?.trade_type == '1' && 'Futures'}
                        {item.trade_type == '0' && 'Spot'}
                    </Text>
                    <Text style={[styles.tagText, {
                        color: Colors.pendingYellow,

                    }]}>

                     {item?.direction}

                    </Text>
                </View>
            </View>
            <View style={styles.walletCardAmount}>
                {/* <Text style={[styles.cardTitle, {
                    fontSize: fontPixel(14),
                    color: Colors.pendingYellow
                }]}>
                    2% Fee
                </Text>*/}

                <Pressable onPress={() => view(item.id, item.Market)} style={styles.copyBot}>
                    <Ionicons name="copy-outline" size={14} color="#fff"/>
                    <Text style={styles.copyRangeText}>
                        Copy Bot
                    </Text>
                </Pressable>
            </View>

        </TouchableOpacity>
    )
}
const AllStrategy = ({navigation}: CyborgStackScreenProps<'AllStrategy'>) => {

    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()

    const [tabIndex, setTabIndex] = useState(0);
    const handleTabsChange = (index: SetStateAction<number>) => {
        setTabIndex(index);
        //  setScreen(index === 0 ? 'Banks' : 'Wallets')
    };

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ['1%', '55%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetRef.current?.snapToIndex(1);
    }, []);


    const handleClose = useCallback(() => {
        Keyboard.dismiss()
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


    const [exchange, setExchange] = useState('1');

    const [market, setMarket] = useState('')
    const [marketId, setMarketId] = useState('')

    const user = useAppSelector(state => state.user)
    const {User_Details} = user
    const [searchValue, setSearchValue] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const [selectedExchange, setSelectedExchange] = useState('1');
    const {
        data,
        isLoading,
        isFetching,
        refetch,
    } = useQuery(['get-strategies', User_Details.id], () => getStrategies(User_Details.id))
    //  console.log(data?.data['copy system'])

    const viewItem = (id: string, Market: string) => {
        bottomSheetRef.current?.snapToIndex(1);

        setMarket(Market)
        setMarketId(id)
        /*navigation.navigate('ViewStrategy',{
            id
        })*/
    }

    const keyExtractor = useCallback((item: { id: string }) => item.id, [],);

    const renderItem = useCallback(({item}: any) => (
        <ItemData item={item} view={viewItem}/>
    ), []);


    const selectExchange = (exchangeId: string, status: '0' | '1', apiKey: string, apiSecrete: string, exchangeName: string) => {

       // setExchange(exchangeId)
        if (status == '1') {

            setSelectedExchange(exchangeId)
        } else {
            handleClose()
            navigation.navigate('ViewAPIBinding', {
                exchangeName,
                exchange: exchangeId,
                apiKey,
                apiSecrete,
                isBound: status
            })

        }


    }
    const {mutate, isLoading: copying, isSuccess, error} = useMutation(['copy-Trade'], copyTrade,

        {

            onSuccess: async (data) => {
                // alert(message)

                if (data.status == 1) {

                    navigation.navigate('SuccessScreen', {
                        title: 'Successful',
                        message: 'Trade copied',
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


            },
            onSettled: () => {
                queryClient.invalidateQueries(['copy-Trade']);
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
            capital: '',


        },
        onSubmit: (values) => {
            const {capital} = values;

            const formData = new FormData()
            formData.append('capital', capital)
            formData.append('exchange', selectedExchange)
            formData.append('id', marketId)
            formData.append('market', market)

            mutate({body: formData, userId: User_Details.id})

            //console.log(formData)
        }
    });


    const Exchanges =  tabIndex === 0 ? [
        {
            id: '1',
            logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
            status: User_Details.coinbaseprobind,
            apiSecrete: User_Details.coinbaseprosecret,
            apiKey: User_Details.coinbaseproapi,
            rank: "3",
            exchange: '3',
            exchangeName: 'Coinbase'
        },
        {
            id: '2',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/1200px-Binance_Logo.svg.png',
            status: User_Details.binancebind,
            apiSecrete: User_Details.binancescret,
            apiKey: User_Details.binanceapi,
            rank: "1",
            exchange: '1',
            exchangeName: 'Binance'
        }, {
            id: '3',
            logo: 'https://static-00.iconduck.com/assets.00/kraken-icon-512x512-icmwhmh8.png',
            status:User_Details.krakenbind,
            apiSecrete: User_Details.krakensecret,
            apiKey: User_Details.krakenapi,
            rank: "1",
            exchange: '4',
            exchangeName: 'Kraken'
        }, {
            id: '4',
            logo: 'https://assets.staticimg.com/cms/media/3gfl2DgVUqjJ8FnkC7QxhvPmXmPgpt42FrAqklVMr.png',
            status: User_Details.kucoinbind,
            apiSecrete: User_Details.kucoinsecret,
            apiKey: User_Details.kucoinapi,
            rank: "1",
            exchange: '2',
            exchangeName: 'Kucoin'
        }
    ] :  [

        {
            id: '2',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/1200px-Binance_Logo.svg.png',
            status: User_Details.binancebind,
            apiSecrete: User_Details.binancescret,
            apiKey: User_Details.binanceapi,
            rank: "1",
            exchange: '1',
            exchangeName: 'Binance'
        },  {
            id: '4',
            logo: 'https://assets.staticimg.com/cms/media/3gfl2DgVUqjJ8FnkC7QxhvPmXmPgpt42FrAqklVMr.png',
            status: User_Details.kucoinbind,
            apiSecrete: User_Details.kucoinsecret,
            apiKey: User_Details.kucoinapi,
            rank: "1",
            exchange: '2',
            exchangeName: 'Kucoin'
        }
    ]


   //console.log("*******************Exchanges*******************")
    //console.log(Exchanges)

    const [filterStrategies, setFilterStrategies] = useState([]);

    useEffect(() => {
        if (!isLoading && data && data?.data['copy system'] && data?.data['copy system'] !== null) {
            const filtered = data?.data['copy system'].filter((strategy: { Market: string | string[]; }) =>
                strategy?.Market?.includes(searchValue.toUpperCase().trim())
            )
            setFilterStrategies(filtered)
        }
    }, [data, searchValue]);

    const refresh = () => {
        setRefreshing(true)
        refetch()
        wait(2000).then(() => setRefreshing(false));
    }


   // console.log(filterStrategies.filter((market:{trade_type:string}) => market.trade_type == '1'))
    useRefreshOnFocus(refetch)
    return (

        <>
            {
                copying &&
                <View style={styles.loading}>
                    <ActivityIndicator size='large' color={Colors.primary}/>
                </View>
            }
            <SafeAreaView style={styles.safeArea}>
                <LinearGradient style={styles.background}
                                colors={['#4E044B', '#141621',]}

                                start={{x: 2.5, y: 0}}
                                end={{x: 1.5, y: 0.8,}}
                    // locations={[0.1, 0.7,]}

                >


                    <HeaderWithTitle title='Copy Strategy'/>
                    {
                        Platform.OS === 'ios' ?

                            <GradientSegmentControl tabs={["Spots", "Futures"]}
                                                    currentIndex={tabIndex}
                                                    onChange={handleTabsChange}
                                                    segmentedControlBackgroundColor={'#7676801F'}
                                                    activeSegmentBackgroundColor={"#fff"}

                                                    textColor={"#fff"}
                                                    paddingVertical={pixelSizeVertical(12)}/>
                            :

                            <SegmentedControl tabs={["Spots", "Futures"]}
                                              currentIndex={tabIndex}
                                              onChange={handleTabsChange}
                                              segmentedControlBackgroundColor={Colors.tintPrimary}
                                              activeSegmentBackgroundColor={Colors.primary}
                                              activeTextColor={Colors.text}
                                              textColor={"#CDD4D7"}
                                              paddingVertical={pixelSizeVertical(16)}/>
                    }


                    <View style={styles.scrollView}>
                        <SearchInput
                            keyboardAppearance={'dark'}
                            placeholder="Search Market"
                            keyboardType={"default"}

                            onChangeText={(e) => {
                                setSearchValue(e);

                            }}
                            value={searchValue}
                        />


                        {
                            isLoading && <ActivityIndicator size='small' color={Colors.primary}/>
                        }

                        <IF condition={tabIndex == 0}>
                            {
                                !isLoading && data &&
                                <FlashList
                                    estimatedItemSize={200}
                                    refreshing={isLoading}


                                    scrollEnabled
                                    showsVerticalScrollIndicator={false}
                                    data={filterStrategies.filter((market:{trade_type:string}) => market.trade_type == '0')}
                                    renderItem={renderItem}
                                    keyExtractor={keyExtractor}
                                    onEndReachedThreshold={0.3}
                                    refreshControl={
                                        <RefreshControl
                                            tintColor={Colors.text}
                                            refreshing={refreshing}
                                            onRefresh={refresh}
                                        />
                                    }


                                />
                            }
                        </IF>

                        <IF condition={tabIndex == 1}>
                            {
                                !isLoading && data &&
                                <FlashList
                                    estimatedItemSize={200}
                                    refreshing={isLoading}


                                    scrollEnabled
                                    showsVerticalScrollIndicator={false}
                                    data={filterStrategies.filter((market:{trade_type:string}) => market.trade_type == '1')}
                                    renderItem={renderItem}
                                    keyExtractor={keyExtractor}
                                    onEndReachedThreshold={0.3}
                                    refreshControl={
                                        <RefreshControl
                                            tintColor={Colors.text}
                                            refreshing={refreshing}
                                            onRefresh={refresh}
                                        />
                                    }


                                />
                            }
                        </IF>



                    </View>
                    <ToastAnimated/>
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
                    <Text style={[styles.sheetTitle, {
                        fontFamily: Fonts.faktumBold,
                        fontSize: fontPixel(14),
                        color: Colors.pendingYellow
                    }]}>
                        {market}
                    </Text>
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


                        keyboardType={"number-pad"}
                        touched={touched.capital}
                        error={touched.capital && errors.capital}
                        keyboardAppearance={'dark'}
                        onChangeText={(e) => {
                            handleChange('capital')(e);

                        }}
                        onBlur={(e) => {
                            handleBlur('capital')(e);

                        }}


                        value={values.capital}
                        label="Capital"
                        placeholder='capital'/>


                    <View style={styles.exchangeList}>
                        {
                            Exchanges.map((({exchange, logo, exchangeName, id, status, apiKey, apiSecrete}) => (
                                <Pressable
                                    onPress={() => selectExchange(exchange, status, apiKey, apiSecrete, exchangeName)}
                                    key={id} style={[styles.exchangeCard, {
                                    borderColor: selectedExchange == exchange ? Colors.purplePrimary : Colors.borderColor
                                }]}>
                                    <View style={styles.logoWrap}>
                                        <Image source={{uri: logo}} style={styles.logo}/>
                                    </View>


                                    <Text style={styles.exchangeCardText}>
                                        {exchangeName}
                                    </Text>

                                    {selectedExchange == exchange &&
                                        <Octicons name="dot-fill" size={14} color={Colors.successChart}/>
                                    }
                                    {selectedExchange !== exchange &&
                                        <Octicons name="dot-fill" size={14} color={Colors.borderColor}/>
                                    }

                                </Pressable>

                            )))
                        }
                    </View>


                    <MyButton onPress={() => handleSubmit()} style={[styles.startBottom, {
                        backgroundColor: !isValid ? Colors.border : Colors.purplePrimary
                    }]}>
                        <Text style={styles.buttonTxt}>
                            Confirm and begin
                        </Text>
                    </MyButton>


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
        width: '90%',
        flex: 1,
        //alignItems: "center"
    },
    walletCard: {
        marginVertical: pixelSizeVertical(12),
        width: '100%',
        borderRadius: 10,
        height: heightPixel(90),
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: Colors.borderColor,
        borderWidth: 1,
        //backgroundColor:Colors.secondary,
        padding: 16,
        flexDirection: "row",

    },

    logoCircle: {
        width: 30,
        height: 30,
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
    tagWrap: {
        backgroundColor: Colors.textDark,
        paddingHorizontal: 10,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    tagText: {
        color: Colors.pendingYellow,
        fontFamily: Fonts.faktumSemiBold,
        fontSize: fontPixel(12),
    },

    walletCardAmount: {
        width: '25%',

        alignItems: 'flex-end',
        justifyContent: 'center',
        height: heightPixel(50)

    },


    copyBot: {
        flexDirection: 'row',
        width: 90,
        height: 30,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: Colors.purplePrimary
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
    startBottom: {
        width: '90%',
        bottom: 0,
        justifyContent: 'center',
    },
    buttonTxt: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(14),
        color: "#fff"
    },
    exchangeList: {

        minHeight: 70,
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: "space-evenly"
    },
    exchangeCard: {
        margin: 10,
        height: 45,
        width: 130,
        borderRadius: 5,
        borderWidth: 1,
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: "space-between",
        flexDirection: 'row'
    },
    logoWrap: {
        width: 20,
        height: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },

    exchangeCardText: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(14),
        color: "#fff"
    },
    loading: {
        flex: 1,
        width: '100%',
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 1,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)'
    }

})

export default AllStrategy;
