import React, {useCallback} from 'react';

import {Text, View, StyleSheet, Image, FlatList, Pressable} from 'react-native';
import HeaderWithTitle from "../../../components/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {RootStackScreenProps} from "../../../types";
import {fontPixel, heightPixel, pixelSizeVertical, widthPixel} from "../../../helpers/normalize";
import Colors from "../../../constants/Colors";
import {Fonts} from "../../../constants/Fonts";
import {LineChart} from 'react-native-wagmi-charts';
import {currencyFormatter} from "../../../helpers";
import Animated, {Easing, FadeInDown, FadeOutDown, Layout} from "react-native-reanimated";


const AssetData = [
    {
        id:'1',
        image:'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png',
        coinName:'Ethereum',
        symbol:'ETH/USDT',
        price:6090,
        balance:'0.9993',
    },{
        id:'2',
        image:'https://cdn-icons-png.flaticon.com/512/5968/5968260.png',
        coinName:'Bitcoin',
        symbol:'BTC/USDT',
        price:26090,
        balance:'1.9993',
    }
]


interface props {
    continueAsset:()=>void,
    item:{
        id:string,
        image:string,
        coinName:string,
        symbol:string,
        price:number,
        balance:string,
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


const AssetCard = ({item,continueAsset}:props) => {
    return (
        <Animated.View key={item.id} layout={Layout.easing(Easing.bounce).delay(100)}
                       entering={FadeInDown.springify()} exiting={FadeOutDown}>
        <Pressable onPress={continueAsset} style={styles.AssetCard}>

            <View style={styles.assetIcon}>
                <View style={styles.assetCardIcon}>
                    <Image source={{uri: item.image}}
                           style={styles.logo}/>
                </View>
            </View>

            <View style={styles.coinName}>
                <Text style={styles.coinSymbol}>
                    {item.symbol}
                </Text>
                <Text style={styles.coinNameText}>
                    {item.coinName}
                </Text>
            </View>

            <View style={styles.assetChart}>
                <LineChart.Provider data={coinData}>
                    <LineChart height={heightPixel(70)} width={widthPixel(90)}>
                        <LineChart.Path color={Colors.successChart}/>
                    </LineChart>
                </LineChart.Provider>
            </View>


            <View style={styles.priceSection}>
                <Text style={styles.coinSymbol}>
                    {currencyFormatter('en-US','USD').format(item.price)}
                </Text>
                <Text style={styles.coinNameText}>
                    {item.balance}
                </Text>
            </View>

        </Pressable>
        </Animated.View>
    )
}

const SelectAsset = ({navigation}: RootStackScreenProps<'SelectAsset'>) => {

const continueAsset = () => {
  navigation.navigate('TradeSetting')
}

    const renderItem = useCallback(
        ({item}: any) => <AssetCard continueAsset={continueAsset} item={item}/>,
        [],
    );


    const keyExtractor = useCallback((item: { id: string; }) => item.id, [],);


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


                    <FlatList
                        style={{width:'100%'}}
                        scrollEnabled
                        onEndReachedThreshold={0.3}
                        showsVerticalScrollIndicator={false}
                        data={AssetData}
                        renderItem={renderItem} keyExtractor={keyExtractor}/>


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
        alignItems: "center"
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
