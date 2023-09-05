import React, {useCallback, useState} from 'react';

import {Text, View, StyleSheet, Image, FlatList, Pressable, RefreshControl, ActivityIndicator} from 'react-native';
import HeaderWithTitle from "../../../components/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {RootStackScreenProps} from "../../../types";
import {fontPixel, heightPixel, pixelSizeVertical, widthPixel} from "../../../helpers/normalize";
import Colors from "../../../constants/Colors";
import {Fonts} from "../../../constants/Fonts";
import {LineChart} from 'react-native-wagmi-charts';
import {currencyFormatter, titleCase, useRefreshOnFocus, wait} from "../../../helpers";
import Animated, {Easing, FadeInDown, FadeOutDown, Layout} from "react-native-reanimated";
import {binanceTicker, getUser, quantitativeStrategies} from "../../../api";
import {useQuery} from "@tanstack/react-query";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {FlashList} from "@shopify/flash-list";
import TextInput from "../../../components/inputs/TextInput";
import SearchInput from "../../../components/inputs/SearchInput";
import {updateBot} from "../../../app/slices/dataSlice";


interface props {
    tickers: [],
    continueAsset: (market:string,id:string) => void,
    item: {
        id: string,
        Quantity: string,

        Market: string,
        Avg_Price:string,
        coinName: string,
        symbol: string,
        price: number,
        balance: string,
        coin: string,
    }
}

const coinData = [
    {
        timestamp: 1605945400000,
        value: 19585.15,
    }, {
        timestamp: 1615945400000,
        value: 4433575.25,
    }, {
        timestamp: 1625945400000,
        value: 9833575.25,
    }, {
        timestamp: 1645945400000,
        value: 133575.25,
    }, {
        timestamp: 1624945400000,
        value: 553575.25,
    }, {
        timestamp: 1635145400000,
        value: 233370.25,
    }, {
        timestamp: 1642595400000,
        value: 739571.25,
    }, {
        timestamp: 1655945400000,
        value: 833575.25,
    },
    {
        timestamp: 1665946300000,
        value: 23433545.25,
    },

    {
        timestamp: 1685948100000,
        value: 33215.25,
    },
    {
        timestamp: 1665946300000,
        value: 23433545.25,
    },
];


const AssetCard = ({item, continueAsset,tickers}: props) => {


    const user = useAppSelector(state => state.user)
    const {User_Details} = user
    const tickerRes = tickers?.find((ticker: { symbol: string; }) => ticker.symbol == item.Market.replace('/', ''))

    return (
        <Animated.View key={item.id} layout={Layout.easing(Easing.ease)}
                       entering={FadeInDown} exiting={FadeOutDown}>
            <Pressable onPress={()=>continueAsset(item.Market, item.id)} style={styles.AssetCard}>

                <View style={styles.assetIcon}>
                    <View style={styles.assetCardIcon}>
                        <Image source={{uri:`https://backend.deltacyborg.pro/Upload/coin/${item['coin image']}`}}
                               style={styles.logo}/>
                    </View>
                </View>

                <View style={styles.coinName}>
                    <Text style={styles.coinSymbol}>
                        {item.coin}
                    </Text>

                </View>

                <View style={styles.assetChart}>
                   {/* <LineChart.Provider data={coinData}>
                        <LineChart height={heightPixel(70)} width={widthPixel(90)}>
                            <LineChart.Path color={Colors.successChart}/>
                        </LineChart>
                    </LineChart.Provider>*/}
                </View>


                <View style={styles.priceSection}>
                    <Text style={styles.coinSymbol}>
                        <Text style={{color: '#fff', fontFamily: Fonts.faktumBold}}>{
                            tickerRes?.lastPrice ? currencyFormatter('en-US', 'USD').format(tickerRes?.lastPrice) : '0.0'} </Text>

                    </Text>

                </View>

            </Pressable>
        </Animated.View>
    )
}

const SelectAsset = ({navigation,route}: RootStackScreenProps<'SelectAsset'>) => {
    const dispatch = useAppDispatch()
    const {exchange} = route.params
    const user = useAppSelector(state => state.user)
    const {User_Details} = user
    const dataSlice = useAppSelector(state => state.data)
    const {tradeSetting} = dataSlice
    const [refreshing, setRefreshing] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const continueAsset = (market:string,id:string) => {
        navigation.navigate('TradeSetting')
        dispatch(updateBot({
            market,
            id
        }))
    }


    const {
        data: tickers,
        refetch: fetchTickers,
        isLoading: fetchingTickers
    } = useQuery(['binanceTicker'], binanceTicker)

    const renderItem = useCallback(
        ({item}: any) => <AssetCard tickers={tickers} continueAsset={continueAsset} item={item}/>,
        [tickers],
    );


    const keyExtractor = useCallback((item: {
        id: string;
    }) => item.id, [],);

    const {data, refetch,isLoading} = useQuery([`quantitativeStrategies`,User_Details.id], () => quantitativeStrategies(User_Details.id))
  // console.log("********************quantitativeStrategies********************")



    // console.log(data.data['Operation Strategy'])
    const refresh = () => {
        setRefreshing(true)
       refetch()
        wait(2000).then(() => setRefreshing(false));
    }

    let filterAssets: readonly any[] | null | undefined = []
    if (!isLoading && data && data.data['Operation Strategy']) {
        filterAssets = data.data['Operation Strategy'].filter((item: { exchange: string; }) => item.exchange == exchange)?.filter((assets: { Market: string | string[]; }) =>
            assets?.Market?.includes(searchValue.toUpperCase().trim())
        )
    }

    useRefreshOnFocus(fetchTickers)

    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#4E044B', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >


                <HeaderWithTitle title='Assets'/>

                <View style={styles.scrollView}>

                    <SearchInput

                        placeholder="Search market pair"
                        keyboardType={"default"}

                        onChangeText={(e) => {
                            setSearchValue(e);

                        }}
                        value={searchValue}
                        />
                    {
                        isLoading && <ActivityIndicator size='small' color={Colors.primary}/>
                    }

                    {
                        !isLoading && data &&

                    <FlashList
                       // style={{width: '100%'}}
                        scrollEnabled
                        estimatedItemSize={200}
                        onEndReachedThreshold={0.3}
                        showsVerticalScrollIndicator={false}
                        data={filterAssets.filter((market:{trade_type:string}) => market.trade_type == tradeSetting.trade_type)}
                        renderItem={renderItem} keyExtractor={keyExtractor}

                        refreshControl={
                            <RefreshControl
                                tintColor={Colors.text}
                                refreshing={refreshing}
                                onRefresh={refresh}
                            />
                        }
                    />
                    }

                </View>


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
        width: '90%',
        flex: 1,
        //alignItems: "center"
    },
    AssetCard: {
        width: '100%',
        height: heightPixel(80),
        marginVertical: pixelSizeVertical(10),
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    assetIcon: {
        width: 40,
        height: '70%',

        alignItems: 'center',
        justifyContent: 'center'
    },
    coinName: {
        width: '30%',

        height: '80%',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly'
    },
    coinSymbol: {
        color: Colors.text,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumSemiBold
    },
    coinNameText: {
        color: Colors.greyText,
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumMedium
    },
    assetChart: {

        width: '25%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    priceSection: {

        width: '30%',
        height: '80%',
        alignItems: 'flex-end',
        justifyContent: 'space-evenly'
    },
    assetCardIcon: {
        borderRadius: 40,
        width: 25,
        height: 25,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    logo: {
        borderRadius: 20,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',

    },

})

export default SelectAsset;
