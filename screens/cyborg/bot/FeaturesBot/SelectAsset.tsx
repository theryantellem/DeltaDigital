import React, {useCallback, useState} from 'react';

import {Text, View, StyleSheet, Pressable, Image, ActivityIndicator} from 'react-native';
import HeaderWithTitle from "../../../../components/header/HeaderWithTitle";
import SearchInput from "../../../../components/inputs/SearchInput";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {allAssets, binanceTicker, quantitativeStrategies} from "../../../../api";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {FlashList} from "@shopify/flash-list";
import Animated, {Easing, FadeInDown, FadeOutDown, Layout} from "react-native-reanimated";
import {currencyFormatter} from "../../../../helpers";
import {fontPixel, heightPixel, pixelSizeVertical} from "../../../../helpers/normalize";
import Colors from "../../../../constants/Colors";
import {Fonts} from "../../../../constants/Fonts";
import {RootStackScreenProps} from "../../../../types";
import {updateFeatureBotData} from "../../../../app/slices/dataSlice";


interface props {
    continueAsset: (assetName:string,assetSymbol:string) => void,
    item: {
        "id": string,
        "symbol": string,
        "name": string,
        "image": string,
        "current_price": number,
        "market_cap": number,
        "market_cap_rank": number,

    }
}

const AssetCard = ({item, continueAsset}: props) => {


    const user = useAppSelector(state => state.user)
    const {User_Details} = user


    return (
        <Animated.View key={item.id} layout={Layout.easing(Easing.ease)}
                       entering={FadeInDown} exiting={FadeOutDown}>
            <Pressable onPress={()=>continueAsset(item.name,item.symbol)} style={styles.AssetCard}>

                <View style={styles.assetIcon}>
                    <View style={styles.assetCardIcon}>
                        <Image source={{uri: item.image}}
                               style={styles.logo}/>
                    </View>
                </View>

                <View style={styles.coinName}>
                    <Text style={styles.coinSymbol}>
                        {item.name}
                    </Text>
                    <Text style={styles.coinNameText}>
                        {item.symbol}
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
                        {currencyFormatter('en-US', 'USD').format(item.current_price)}
                    </Text>
                    <Text style={styles.coinNameText}>
                        {currencyFormatter('en-US', 'USD').format(item.market_cap)}

                    </Text>
                </View>

            </Pressable>
        </Animated.View>
    )
}


const FeaturesSelectAsset = ({navigation}: RootStackScreenProps<'FeaturesSelectAsset'>) => {

    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)
    const {User_Details} = user
    const [searchValue, setSearchValue] = useState('');


    //  console.log("********************quantitativeStrategies********************")


    const {
        isLoading,
        data,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        refetch
    } = useInfiniteQuery(['assets-tickers'], ({pageParam = 1}) => allAssets.tickers({
            pageParam,
        }),
        {
            getNextPageParam: lastPage => {
                if (lastPage.next !== null) {
                    return lastPage.next;
                }

                return lastPage;
            },

            getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
        })

    const continueAsset = (assetName:string,assetSymbol:string ) => {

            const updatedData = {
                assetName,
                assetSymbol,

            };
            dispatch(updateFeatureBotData(updatedData));

        navigation.navigate('BotDirection')
    }

    const keyExtractor = useCallback((item: {
        id: string;
    }) => item.id, [],);

    const renderItem = useCallback(
        ({item}: any) => <AssetCard continueAsset={continueAsset} item={item}/>,
        [],
    );


    // console.log(data?.pages[0])

    const loadMore = () => {
        if (hasNextPage) {
            fetchNextPage();
        }
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#4E044B', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >


                <HeaderWithTitle title={`Select Assets`} step totalStep={'6'} currentStep={'1'}/>

                <View style={styles.scrollView}>

                    <SearchInput

                        placeholder="Search market pair"
                        keyboardType={"number-pad"}

                        onChangeText={(e) => {
                            setSearchValue(e);

                        }}
                        value={searchValue}
                    />

                    {
                        isLoading && <ActivityIndicator color={Colors.primary} size='small'/>
                    }
                    {
                        !isLoading && data && data?.pages[0] &&


                        <FlashList

                            estimatedItemSize={100}

                            refreshing={isLoading}
                            onRefresh={refetch}
                            scrollEnabled
                            //   contentContainerStyle={styles.flatList}
                            showsVerticalScrollIndicator={false}
                            data={data?.pages[0]}
                            renderItem={renderItem}
                            onEndReached={loadMore}
                            keyExtractor={keyExtractor}
                            onEndReachedThreshold={0.3}
                            ListFooterComponent={isFetchingNextPage ?
                                <ActivityIndicator size="small" color={Colors.primary}/> : null}
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
        justifyContent: 'space-between',
        borderBottomWidth:1,
        borderBottomColor:Colors.borderColor
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
        textTransform:'uppercase',
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
        width: 30,
        height: 30,
        backgroundColor:Colors.borderColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        borderRadius: 20,
        width: '80%',
        height: '80%',
        resizeMode: 'cover',

    },
})

export default FeaturesSelectAsset;
