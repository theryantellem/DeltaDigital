import React, {SetStateAction, useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    RefreshControl,
    ActivityIndicator,
    Pressable, Platform
} from 'react-native';
import {useQuery} from "@tanstack/react-query";
import {binanceTicker, quantitativeStrategies} from "../../../../api";
import {useAppSelector} from "../../../../app/hooks";

import Colors from "../../../../constants/Colors";

import {LinearGradient} from "expo-linear-gradient";
import {Ionicons, MaterialIcons, Octicons} from "@expo/vector-icons";
import {currencyFormatter, invertNumber, wait} from "../../../../helpers";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../../../../helpers/normalize";
import {Fonts} from "../../../../constants/Fonts";
import SearchInput from "../../../../components/inputs/SearchInput";
import BottomSheet, {BottomSheetBackdrop, BottomSheetFlatList} from "@gorhom/bottom-sheet";
import {
    BottomSheetDefaultBackdropProps
} from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import {FlashList} from "@shopify/flash-list";
import dayjs from "dayjs";


import {useNavigation} from "@react-navigation/native";


var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)


const Exchange = [
    {
        title: "Binance",
        id: '1'
    },
    {
        title: "Kucoin",
        id: '2'
    }, {
        title: "Coinbase",
        id: '3'
    }, {
        title: "Kraken",
        id: '4'
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


interface props {
    tickers: [],
    continueAsset: (exchange: string, id: string, market: string,trade_type:string,finalvalue:number) => void,
    item: {
        id: string,
        exchange: string,
        Quantity: string,
        Market: string,
        Avg_Price: string,
        coinName: string,
        symbol: string,
        cycle: string,
        price: number,
        balance: string,
        trade_type: string,
        coin: string,
    }
}

const SelectValue = ({selected, item, action}: itemProps) => (
    <TouchableOpacity onPress={() => action(item.title, item.id)} style={[styles.selectBtn, {
        borderBottomColor: Colors.textDark,
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


const QuantitativeItem = ({item, tickers, continueAsset}: props) => {

    const tickerRes = tickers?.find((ticker: { symbol: string; }) => ticker.symbol == item.Market.replace('/', ''))
    let p2 = parseFloat(item?.Quantity) * parseFloat(tickerRes?.lastPrice);
    let val =  item['Positionamount'] > 0 ?(Number(item['Positionamount']) - (p2)) / Number(item['Positionamount']) : 0;
    let finalvalue = val * 100;
    return (
        <Pressable onPress={() => continueAsset(item.exchange, item.id, item.Market,item.trade_type,finalvalue)} style={styles.quantitativeCard}>

            <View style={styles.leftInfo}>


                <View style={styles.assetIcon}>
                    <View style={styles.assetCardIcon}>
                        <Image source={{uri: `https://backend.deltacyborg.pro/Upload/coin/${item['coin image']}`}}
                               style={styles.logo}/>


                    </View>
                </View>

                <View style={styles.assetName}>


                    <Text style={styles.assetNameText}>
                        {item.coin}
                    </Text>
                    <Text style={[styles.assetInfo]}>
                        Price: <Text style={{color: '#fff', fontFamily: Fonts.faktumBold}}>{
                        tickerRes?.lastPrice ? currencyFormatter('en-US', 'USD').format(tickerRes?.lastPrice) : '0.0'} </Text>
                    </Text>
                    <Text style={styles.assetInfo}>
                        Quantity: <Text
                        style={{
                            color: '#fff',
                            fontFamily: Fonts.faktumBold
                        }}>{parseFloat(item.Positionamount).toFixed(4)}</Text>
                    </Text>
                </View>

            </View>

            <View style={styles.centerInfo}>

                <View style={styles.tagWrap}>
                    <Text style={styles.tagText}>

                        {item?.cycle == '1' && 'Cycle'}
                        {item['One-shot'] == '1' && 'One-shot'}
                    </Text>
                </View>

            </View>

            <View style={styles.rightInfo}>
                <Text style={[styles.cardValue,{
                   // color:finalvalue ? invertNumber(parseFloat(finalvalue)) < 0 ? Colors.errorRed : Colors.successChart : Colors.errorRed
                    color:finalvalue ? invertNumber((finalvalue))   < 0 ?  Colors.errorRed :Colors.successChart : Colors.successChart
                }]}>

                    {finalvalue ? invertNumber(parseFloat(finalvalue)) : '0.00'}%
                </Text>
                <Text style={[styles.cardValue, {
                    color: parseInt(tickerRes?.priceChangePercent) > 0 ? Colors.successChart : Colors.errorRed
                }]}>
                    Chng%: {tickerRes?.priceChangePercent ? parseFloat(tickerRes?.priceChangePercent).toFixed(3) : '0'}
                </Text>
                {/*<Text style={[styles.cardValue,{
                  color: "#ccc"
              }]}>
                  {dayjs.unix(tickerRes.closeTime).format('hh:m A')}
              </Text>*/}
            </View>
        </Pressable>
    )
}


const SpotScreenQuantitative = ({}) => {


    const navigate = useNavigation()
    const [searchValue, setSearchValue] = useState('');
    const [tabExchange, setTabExchange] = useState('1');
    const [selectedExchange, setSelectedExchange] = useState('Binance')

    const [tabIndex, setTabIndex] = useState(0);
    const handleTabsChange = (index: SetStateAction<number>) => {
        setTabIndex(index);
        //  setScreen(index === 0 ? 'Banks' : 'Wallets')
    };



    const user = useAppSelector(state => state.user)
    const {User_Details} = user
    const {
        data,
        isLoading,
        refetch
    } = useQuery(['quantitativeStrategies', User_Details.id], () => quantitativeStrategies(User_Details.id))


    const [refreshing, setRefreshing] = useState(false);

    const {
        data: tickers,
        refetch: fetchTickers,
        isLoading: fetchingTickers
    } = useQuery(['binanceTicker'], binanceTicker)


//   const {data:tickers}= useQuery(['binanceTicker'],binanceTicker)


    const snapPoints = useMemo(() => ["1%", "65%", "70%"], []);
    const bankSheetRef = useRef<BottomSheet>(null);
    const keyExtractorExchange = useCallback((item: { id: any; }) => item.id, [],);
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


    const switchItem = useCallback(async (title: string, id: string) => {
        setTabExchange(id)
        setSelectedExchange(title)
        handleClose()

    }, [])


    const renderItemExchange = useCallback(({item}: any) => (
        <SelectValue selected={tabExchange} item={item} action={switchItem}/>
    ), [tabExchange]);

    const seeLogs = (exchange: string, id: string, market: string,trade_type:string,finalvalue:number) => {
        navigate.navigate('LogScreen', {
            id,
            trade_type,
            market,
            exchange,
            finalvalue,
            screenFrom:'Auto'
        })
    }

    const keyExtractor = useCallback((item: { id: string }) => item.id, [],);


    const renderItem = useCallback(({item}) => (
        <QuantitativeItem tickers={tickers} continueAsset={seeLogs} item={item}/>
    ), [tickers])

    const renderHeader = useCallback(() => (
        <>
            <View style={styles.balanceCanvas}>
                <View style={styles.balanceTop}>

                    <TouchableOpacity onPress={() => handleSnapPress(1)} activeOpacity={0.8}>
                        <LinearGradient style={styles.selectExchangeBtn}
                                        colors={Colors.btnGradient}

                                        start={{x: 1, y: 1}}
                                        end={{x: 0.4, y: 0.5,}}>
                            <Text style={styles.selectBtnText}>
                                {selectedExchange}
                            </Text>

                            <Octicons name="chevron-down" size={20} color="#fff"/>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.balanceTitle}>
                        <Text style={styles.balText}>
                            {selectedExchange} USDT (Spot)
                        </Text>


                    </TouchableOpacity>

                    <View style={styles.balanceGraph}>

                        {
                            selectedExchange == 'Binance' &&

                            <Text
                                style={styles.balance}>

                                {currencyFormatter('en-US', 'USD').format(data?.data?.binance_balance)}
                            </Text>
                        }
                        {
                            selectedExchange == 'Kucoin' &&

                            <Text
                                style={styles.balance}>

                                {currencyFormatter('en-US', 'USD').format(data?.data?.kucoin_balance)}
                            </Text>
                        }
                        {
                            selectedExchange == 'Coinbase' &&

                            <Text
                                style={styles.balance}>

                                {currencyFormatter('en-US', 'USD').format(data?.data?.coinbasepro_balance)}
                            </Text>
                        }

                        {
                            selectedExchange == 'Kraken' &&

                            <Text
                                style={styles.balance}>

                                {currencyFormatter('en-US', 'USD').format(data?.data?.kraken_balance)}

                            </Text>

                        }


                    </View>




                </View>

            </View>


            <SearchInput

                placeholder="Search market e.g BTC/ETH"
                keyboardType={"default"}

                onChangeText={(e) => {
                    setSearchValue(e);

                }}
                value={searchValue}
            />

        </>


    ), [selectedExchange, data])


    const refresh = () => {
        setRefreshing(true)
        refetch()
        wait(2000).then(() => setRefreshing(false));
    }


    const [filterAssets, setFilterAssets] = useState([]);

    useEffect(() => {
        if (!isLoading && data && data?.data['Operation Strategy'] && data?.data['Operation Strategy'] !== null) {
            const filtered = data?.data['Operation Strategy'].filter((item: {
                exchange: string;
            }) => item.exchange == tabExchange)?.filter((assets: { Market: string | string[]; }) =>
                assets?.Market?.includes(searchValue.toUpperCase().trim())
            )
            setFilterAssets(filtered)
        }
    }, [tabExchange, data, searchValue]);


    return (
        <>









                    <View style={styles.flatList}>

                        {
                            isLoading && <ActivityIndicator size='small' color={Colors.primary}/>
                        }

                        {
                            !isLoading && data &&
                            <FlashList
                                estimatedItemSize={200}
                                refreshing={isLoading}
                                ListHeaderComponent={renderHeader}

                                scrollEnabled
                                showsVerticalScrollIndicator={false}
                                data={filterAssets.filter((market:{trade_type:string}) => market.trade_type == '0')}
                                renderItem={renderItem}
                                keyExtractor={keyExtractor}
                                onEndReachedThreshold={0.3}
                                refreshControl={
                                    <RefreshControl
                                        tintColor={Colors.primary}
                                        refreshing={refreshing}
                                        onRefresh={refresh}
                                    />
                                }


                            />
                        }


                    </View>




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


                <BottomSheetFlatList data={Exchange}
                                     renderItem={renderItemExchange}
                                     keyExtractor={keyExtractorExchange}
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
        alignItems: "center"
    },
    flatList: {
        width: '90%',

        flex: 1,


    },

    balanceCanvas: {
        width: '100%',

        height: heightPixel(230),
        alignItems: 'center',
        justifyContent: 'center',

    },
    balanceTop: {

        width: '100%',
        height: '85%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    balanceTitle: {

        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: heightPixel(30),
    },
    balText: {
        fontFamily: Fonts.faktumMedium,
        color: Colors.tintText,
        fontSize: fontPixel(12),
        marginRight: 5,
    },
    balanceGraph: {
        width: '90%',
        height: heightPixel(45),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',

    },
    balance: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(36),
        color: Colors.text
    },
    selectExchangeBtn: {

        width: 120,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    selectBtnText: {
        fontFamily: Fonts.faktumMedium,
        color: Colors.text,
        fontSize: fontPixel(14),
    },
    quantitativeCard: {
        borderRadius: 8,
        paddingVertical: 15,
        paddingRight: 10,
        backgroundColor: "#000",
        marginVertical: pixelSizeVertical(8),
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%',
        height: heightPixel(100),
    },
    leftInfo: {
        width: '42%',

        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    assetIcon: {

        width: 45,
        height: '100%',

        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    assetCardIcon: {
        borderRadius: 40,
        width: 20,
        height: 20,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    logo: {
        borderRadius: 20,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',

    },

    assetName: {
        width: '75%',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        height: '100%'
    },
    centerInfo: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%'
    },
    rightInfo: {
        width: '25%',
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    assetInfo: {
        color: '#ccc',
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumRegular
    },
    assetNameText: {
        color: Colors.text,
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(14),
    },
    cardValue: {
        color: Colors.text,
        fontFamily: Fonts.faktumMedium,
        fontSize: fontPixel(12),
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


    selectBtn: {
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
    walletAddressTxt: {

        color: "#fff",
        fontFamily: Fonts.faktumSemiBold,
        fontSize: fontPixel(16)
    },

})

export default SpotScreenQuantitative;
